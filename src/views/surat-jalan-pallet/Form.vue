<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="sjp.truck_number"
          :label="$t('sjp.truck')"
          :rules="noTruckRules"
          required
          append-icon="mdi-reload"
          @click:append="getDataDo"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.no_do"
          :label="$t('sjp.noDo')"
          :rules="noTruckRules"
          required
        ></v-text-field>
      </v-row>

      <!-- <v-row no-gutters>
          <v-autocomplete
            :label="$t('sjp.destination')"
            :items="companies.data"
            :rules="idRules"
            dense
            solo
            v-model="sjp.id_destination_company"
            item-text="name"
            item-value="id"
            required
            clearable
          >
          </v-autocomplete>
        </v-row> -->
      <v-row no-gutters>
        <v-text-field
          v-model="sjp.destination"
          :label="$t('sjp.destination')"
          :rules="idRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.transporter"
          :label="$t('sjp.transporter')"
          :rules="idRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.driver"
          :label="$t('sjp.driver')"
          :rules="idRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.pallet_quantity"
          :label="$t('sjp.palletQuantity')"
          :rules="idRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-menu
          v-model="departureForm"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="sjp.departure_time"
              clearable
              :label="$t('sjp.depart')"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="sjp.departure_time"
            @change="etaForm = false"
          ></v-date-picker>
        </v-menu>
      </v-row>

      <v-row no-gutters>
        <v-menu
          v-model="etaForm"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="sjp.eta"
              clearable
              :label="$t('sjp.eta')"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="sjp.eta"
            @change="etaForm = false"
          ></v-date-picker>
        </v-menu>
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
  name: "FormOrganization",
  data: () => ({
    etaForm: false,
    departureForm: false,
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
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjp", {
      sjp: (state) => state.sjp, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjp", ["CLEAR_FORM"]),
    ...mapActions("sjp", ["submitSjp"]),
    ...mapActions("company", ["getCompanies"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.submitSjp(this.sjp).then((response) => {
          console.log(response);
            this.CLEAR_FORM();
            this.$router.push({ name: "sjp" });
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
    getDataDo() {
      if (!this.sjp.truck_number) {
        this.$swal({
          title: "Truck Number Empty",
          text: "Please Fill Truck Number",
          type: "danger",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
        });
      } else {
        this.loading = true;
        this.sjp.departure_time = new Date().toISOString().slice(0, 10);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.sjp.eta = tomorrow.toISOString().slice(0, 10);
        this.sjp.destination = "PT ABC edt";
        this.sjp.transporter = "PT GHIF";
        this.sjp.driver = "Budi";
        this.sjp.id_destination_company = 10;
        this.sjp.id_transporter_company = 10;
        this.sjp.id_truck = 4;
        this.sjp.id_driver = 3;
        this.sjp.no_do = "DO-202305-0010";
        this.sjp.tonnage = 100;
        this.sjp.packaging = 60;
        this.sjp.product_quantity = 80;
        this.sjp.pallet_quantity = 12;
        this.loading = false;
      }
    },
  },
  timeLoad() {
    this.sjp.departureTime = new Date().toISOString().slice(0, 10);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.sjp.eta = tomorrow.toISOString().slice(0, 10);
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
