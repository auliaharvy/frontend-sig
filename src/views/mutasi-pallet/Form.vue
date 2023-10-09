<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.departure')"
          :items="companiesDeparture.data"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_company_departure"
          :item-text="item => `${item.code} - ${item.name}`"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.destination')"
          :items="companiesDestination.data"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_company_destination"
          :item-text="item => `${item.code} - ${item.name}`"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.transporter')"
          :items="companiesTransporter.data"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_company_transporter"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.truck')"
          :items="trucks"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_truck"
          item-text="license_plate"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.driver')"
          :items="drivers"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_driver"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="palletTransfer.good_pallet"
          :label="$t('pallet.good')"
          :rules="palletRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="palletTransfer.tbr_pallet"
          :label="$t('pallet.tbr')"
          :rules="palletRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="palletTransfer.reason"
          :label="$t('palletTransfer.reason')"
          :rules="idRules"
          outlined
          required
        ></v-textarea>
      </v-row>

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn class="mt-4 red darken-1 text-white" block @click="validate">
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
  name: "FormPalletTransfer",
  data: () => ({
    roleUser: {},
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    palletRules: [
      (v) => v > -1 || "cannot input - number",
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
    this.getTrucks(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getDrivers(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesDeparture().then((response) => {
      this.palletTransfer.id_company_departure = this.roleSet.company_id;
    });
    this.getCompaniesDestination(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesTransporter(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getUserRole(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("truck", {
      trucks: (state) => state.trucks, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesDeparture: (state) => state.companiesDeparture, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      companiesTransporter: (state) => state.companiesTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      companiesDestination: (state) => state.companiesDestination, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("driver", {
      drivers: (state) => state.drivers, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("palletTransfer", {
      palletTransfer: (state) => state.palletTransfer, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("palletTransfer", ["CLEAR_FORM"]),
    ...mapActions("palletTransfer", ["submitPalletTransfer"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesDeparture", "getCompaniesDestination", "getCompaniesTransporter"]),
    ...mapActions("truck", ["getTrucks"]),
    ...mapActions("driver", ["getDrivers"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.palletTransfer.status = 0;
        this.palletTransfer.ber_pallet = 0;
        this.palletTransfer.missing_pallet = 0;
        // this.palletTransfer.id_company_departure = this.roleSet.company_id;
        this.palletTransfer.created_by = this.roleUser.user_id;
        this.palletTransfer.updated_by = this.roleUser.user_id;
        this.submitPalletTransfer(this.palletTransfer).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "pallet-transfer" });
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
    getUserRole() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
      console.log(this.roleUser)
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
