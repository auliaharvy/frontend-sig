<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.departure')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_company_departure"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.destination')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="palletTransfer.id_company_destination"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.transporter')"
          :items="companies.data"
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
          :items="trucks.data"
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
          :items="drivers.data"
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
          :rules="idRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="palletTransfer.tbr_pallet"
          :label="$t('pallet.tbr')"
          :rules="idRules"
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
  name: "FormPalletTransfer",
  data: () => ({
    loading: false,
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
    this.getTrucks(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getDrivers(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
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
    ...mapState("driver", {
      drivers: (state) => state.drivers, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("palletTransfer", {
      palletTransfer: (state) => state.palletTransfer, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("palletTransfer", ["CLEAR_FORM"]),
    ...mapActions("palletTransfer", ["submitPalletTransfer"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("truck", ["getTrucks"]),
    ...mapActions("driver", ["getDrivers"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.palletTransfer.status = 0;
        this.palletTransfer.ber_pallet = 0;
        this.palletTransfer.missing_pallet = 0;
        console.log(this.roleSet);
        this.palletTransfer.id_company_departure = this.roleSet.company_id;
        this.palletTransfer.created_by = this.roleSet.user_id;
        this.palletTransfer.updated_by = this.roleSet.user_id;
        this.submitPalletTransfer(this.palletTransfer).then((response) => {
          console.log(response);
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
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
