<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('changeQuota.trxNumber')"
          :items="changeQuotas"
          :rules="idRules"
          outlined
          readonly
          v-model="newPallet.id_trx_change_quota"
          item-text="trx_number"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('newPallet.compRequester')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          readonly
          v-model="newPallet.id_company_requester"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('newPallet.compSupplier')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="newPallet.id_company_workshop"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>
      

      <v-row no-gutters>
        <v-text-field
          v-model="newPallet.qty_request_pallet"
          :label="$t('newPallet.palletAdd')"
          :rules="idRules"
          readonly
          outlined
        ></v-text-field>
      </v-row>


      <v-row no-gutters>
        <v-textarea
          v-model="newPallet.reason"
          :label="$t('changeQuota.reason')"
          outlined
          readonly
        ></v-textarea>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="newPallet.note"
          :label="$t('changeQuota.note')"
          outlined
          readonly
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
  name: "FormAddNewPallet",
  data: () => ({
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    noTruckRules: [
      (v) => !!v || "this field is required",
      (v) => (v && v.length >= 3) || "must be greater than 3 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
  }),
  created() {
    this.getCompaniesAll(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getChangeQuotas(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["setRole"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("changeQuota", {
      changeQuotas: (state) => state.changeQuotas, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("newPallet", {
      newPallet: (state) => state.newPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("newPallet", ["CLEAR_FORM"]),
    ...mapActions("changeQuota", ["getChangeQuotas"]),
    ...mapActions("newPallet", ["submitNewPallet"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var roleData = JSON.parse(localStorage.getItem("role"))
        this.newPallet.status = '0';
        this.newPallet.qty_ready_pallet = '0';
        this.newPallet.created_by =  roleData.user_id;
        this.newPallet.updated_by = roleData.user_id;
        this.submitNewPallet(this.newPallet).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "new-pallet" });
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
