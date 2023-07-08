<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('claimPallet.company')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="claimPallet.id_company_distributor"
          readonly
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <!-- <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.price"
          :label="$t('claimPallet.price')"
          :rules="idRules"
          type="number"
          outlined
        ></v-text-field>
      </v-row> -->

      <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.ber_pallet"
          :label="$t('pallet.ber')"
          type="number"
          outlined
          @change="totalPrice"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.missing_pallet"
          :label="$t('pallet.missing')"
          type="number"
          outlined
          @change="totalPrice"
        ></v-text-field>
      </v-row>

      <vuetify-money
          v-model="claimPallet.price"
          :rules="idRules"
          :label="$t('sewaPallet.price')"
          outlined
          @change="totalPrice"
          :options="options"
        />
        
      <vuetify-money
          v-model="claimPallet.total_price"
          :label="$t('claimPallet.totalPrice')"
          :rules="idRules"
          readonly
          outlined
          :options="options"
        />

      <!-- <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.total_price"
          :label="$t('claimPallet.totalPrice')"
          :rules="idRules"
          type="number"
          readonly
          outlined
        ></v-text-field>
      </v-row> -->

      <!-- <v-row no-gutters>
        <v-textarea
          v-model="claimPallet.note"
          :label="$t('claimPallet.reasonManager')"
          outlined
        ></v-textarea>
      </v-row> -->

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn color="success" class="mt-4" block @click="validate">
              {{ $t("form.submit") }}
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
        id: 1,
        name: 'Approve'
      },
      {
        id: 2,
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
    this.getCompanies(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesAll();
  },
  // price() {
  //     this.claimPallet.price = this.price;
  //     this.totalPrice()
  //   },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("claimPallet", {
      claimPallet: (state) => state.claimPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("claimPallet", ["CLEAR_FORM"]),
    ...mapActions("claimPallet", ["updateClaimPallet"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        // this.claimPallet.id_user_manager = this.roleSet.user_id;
        this.claimPallet.status = '0';
        this.claimPallet.update_type = 'edit_data';
        this.claimPallet.updated_by = this.roleSet.user_id;
        this.updateClaimPallet(this.claimPallet).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "claim-pallet" });
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
    totalPrice() {
      console.log(this.claimPallet.ber_pallet)
      const totalPallet = parseInt(this.claimPallet.ber_pallet) + parseInt(this.claimPallet.missing_pallet);
      console.log(totalPallet)
      this.claimPallet.total_price = this.claimPallet.price * totalPallet;
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
