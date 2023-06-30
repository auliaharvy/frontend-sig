<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sewaPallet.company')"
          :items="companiesDistributor.data"
          :rules="idRules"
          outlined
          v-model="sewaPallet.id_company_distributor"
          readonly
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.good_pallet"
          :label="$t('pallet.good')"
          readonly
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.tbr_pallet"
          :label="$t('pallet.tbr')"
          readonly
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.ber_pallet"
          :label="$t('pallet.ber')"
          readonly
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.missing_pallet"
          :label="$t('pallet.missing')"
          readonly
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <vuetify-money
        v-model="sewaPallet.price"
        :label="$t('sewaPallet.price')"
        outlined
        readonly
        :options="options"
      />

      <vuetify-money
        v-model="sewaPallet.total_price"
        :label="$t('sewaPallet.totalPrice')"
        outlined
        readonly
        :options="options"
      />

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sewaPallet.approvalDistributor')"
          :items="itemApproval"
          :rules="idRules"
          outlined
          v-model="sewaPallet.status"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="sewaPallet.reason_distributor"
          :label="$t('sewaPallet.reasonDist')"
          outlined
        ></v-textarea>
      </v-row>

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn color="success" class="mt-4" block @click="validate">
              {{ $t("form.submit") }}
            </v-btn>

            <v-btn color="error" class="mt-4" block @click="reset">
              {{ $t("form.reset") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "FormApprovalChangePallet",
  data: () => ({
    options: {
      prefix:"Rp",
      precision: 0
    },
    itemApproval: [
      {
        id: 3,
        name: 'Approve'
      },
      {
        id: 4,
        name: 'Reject'
      }
    ],
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
  }),
  created() {
    this.getCompaniesDistributor(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("dropdown", {
      companiesDistributor: (state) => state.companiesDistributor, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sewaPallet", {
      sewaPallet: (state) => state.sewaPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sewaPallet", ["CLEAR_FORM"]),
    ...mapActions("sewaPallet", ["updateSewaPallet"]),
    ...mapActions("dropdown", ["getCompaniesDistributor"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.sewaPallet.id_user_distributor = this.roleSet.user_id;
        this.sewaPallet.update_type = 'approval_distributor';
        this.sewaPallet.updated_by = this.roleSet.user_id;
        this.updateSewaPallet(this.sewaPallet).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "sewa-pallet" });
          // else {
          //   if (this.errors) {
          //     this.$swal({
          //       icon: 'error',
          //       title: 'error.status',
          //       text: this.errors,
          //     });
          //   }
          // }
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
