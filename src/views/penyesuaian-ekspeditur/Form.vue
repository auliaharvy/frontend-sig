<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('transporterAdjusment.transporter')"
          :items="companiesTransporter.data"
          :rules="idRules"
          outlined
          v-model="transporterAdjusment.id_company_transporter"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('transporterAdjusment.company')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="transporterAdjusment.id_company"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('transporterAdjusment.status')"
          :items="items"
          :rules="idRules"
          outlined
          v-model="transporterAdjusment.is_from_pool"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="transporterAdjusment.good_pallet"
          :label="$t('pallet.good')"
          :rules="palletRules"
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="transporterAdjusment.tbr_pallet"
          :label="$t('pallet.tbr')"
          :rules="palletRules"
          type="number"
          outlined
        ></v-text-field>
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
  name: "FormAddTransporterAdjusment",
  data: () => ({
    items: [
      {
        id: '0',
        name: 'From Transporter'
      },
      {
        id: '1',
        name: 'From Pool'
      }
    ],
    palletRules: [
      (v) => v > -1 || "cannot input - number",
    ],
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
    this.getCompanies(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesTransporter(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesAll(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["setRole"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("transporterAdjusment", {
      transporterAdjusment: (state) => state.transporterAdjusment, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesTransporter: (state) => state.companiesTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("transporterAdjusment", ["CLEAR_FORM"]),
    ...mapActions("transporterAdjusment", ["submitTransporterAdjusment"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesTransporter", "getCompaniesAll"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var roleData = JSON.parse(localStorage.getItem("role"))
        this.transporterAdjusment.id_user_reporter = roleData.user_id;
        this.transporterAdjusment.created_by = roleData.user_id;
        this.transporterAdjusment.updated_by = roleData.user_id;
        this.submitTransporterAdjusment(this.transporterAdjusment).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "transporter-adjusment" });
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
