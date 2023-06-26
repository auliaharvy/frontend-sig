<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.departure')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_departure_company"
          item-text="name"
          item-value="id"
          required
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.destination')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_destination_company"
          item-text="name"
          item-value="id"
          required
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.transporter')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_transporter_company"
          item-text="name"
          item-value="id"
          required
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.truck')"
          :items="trucks.data"
          outlined
          v-model="sjpStatus.id_truck"
          item-text="license_plate"
          item-value="id"
          required
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.driver')"
          :items="drivers.data"
          outlined
          v-model="sjpStatus.id_driver"
          item-text="name"
          item-value="id"
          required
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjpStatus.good_pallet"
          :label="$t('pallet.good')"
          :rules="palletRules"
          type="number"
          outlined
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="tbrPallet"
          :label="$t('pallet.tbr')"
          :rules="palletRules"
          outlined
          type="number"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-file-input
          v-model="sjpStatus.receiving_driver_approval"
          outlined
          :label="$t('sjpStatus.approval')"
        ></v-file-input>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="sjpStatus.note"
          :label="$t('sjpStatus.note')"
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
  name: "FormReceiveSjp",
  data: () => ({
    tbrPallet: 0,
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
  },
  watch: {
    tbrPallet() {
      this.sjpStatus.tbr_pallet = this.tbrPallet;
      this.sjpStatus.good_pallet =
        this.sjpStatus.send_good_pallet - this.tbrPallet;
    },
  },
  computed: {
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("truck", {
      trucks: (state) => state.trucks, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("driver", {
      drivers: (state) => state.drivers, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjpStatus", ["CLEAR_FORM", "clearError"]),
    ...mapActions("sjpStatus", [
      "updateSjpStatus",
      "getSjpStatusDetail",
      "submitSjpStatus",
    ]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("truck", ["getTrucks"]),
    ...mapActions("driver", ["getDrivers"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var checkContent =
          "<div><strong><span>" +
          "<p> | Send Good Pallet : <b>" +
          this.sjpStatus.send_good_pallet +
          " </b> | Receive Good Pallet : <b> " +
          this.sjpStatus.good_pallet +
          " </b> | </p>" +
          // "<p> | Send Filled Pallet : <b>" + sendData.filled_pallet + " </b> | Receive Filled Pallet : <b> " + data.filled_pallet + " </b> | </p>" +
          "<p> | Send TBR Pallet : <b> " +
          this.sjpStatus.send_tbr_pallet +
          " </b> | Receive TBR Pallet : <b> " +
          this.sjpStatus.tbr_pallet +
          " </b> | </p>" +
          "<p> | Send BER Pallet : <b> " +
          this.sjpStatus.send_ber_pallet +
          " </b> | Receive BER Pallet : <b> " +
          this.sjpStatus.ber_pallet +
          " </b> | </p>" +
          "<p> | Send Missing Pallet : <b> " +
          this.sjpStatus.send_missing_pallet +
          " </b> | Receive Missing Pallet : <b> " +
          this.sjpStatus.missing_pallet +
          " </b> | </p>" +
          "</span> </strong></div>";

        this.$swal({
          title: "Receive " + this.sjpStatus.sjp_number,
          text: "...<div>" + checkContent + "</div>...",
          html: "...<div>" + checkContent + "</div>...",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Receive!",
        }).then((result) => {
          if (result.value) {
            if (this.sjpStatus.is_sendback == 0) {
              this.sjpStatus.sjp_status = "receive";
              this.sjpStatus.status = 1;
              this.sjpStatus.id_user_receiver = 1;
              this.updateSjpStatus(this.sjpStatus).then((response) => {
                this.CLEAR_FORM();
                this.sendbackCheck();
              });
            } else {
              this.sjpStatus.sjp_status = "receive_sendback";
              this.sjpStatus.status = 1;
              this.sjpStatus.id_user_receiver = 1;
              this.updateSjpStatus(this.sjpStatus).then((response) => {
                this.CLEAR_FORM();
                this.$router.push({ name: "sjp-status" });
              });
            }
          }
        });
      }
    },
    sendbackCheck() {
      this.getSjpStatusDetail(this.sjpStatus.id).then(() => {
        // this.sjpStatus.sjp_number = this.sjp.sjp_number;
        // this.sjpStatus.id_sjp = this.$route.params.id;
        // this.sjpStatus.id_departure_company = this.sjp.idDeparture;
        // this.sjpStatus.id_destination_company = this.sjp.idDestination;
        // this.sjpStatus.id_transporter_company = this.sjp.idTransporter;
        // this.sjpStatus.good_pallet = this.sjp.palletQuantity;
        // this.sjpStatus.tbr_pallet = 0;
        // this.sjpStatus.ber_pallet = 0;
        // this.sjpStatus.missing_pallet = 0;
        var checkContent =
          "<div><strong><span>Did you want Sendback?" +
          "<p> Good Pallet : <b>" +
          this.sjpStatus.good_pallet +
          "<p> TBR Pallet : <b> " +
          this.sjpStatus.tbr_pallet +
          "<p> BER Pallet : <b> " +
          this.sjpStatus.ber_pallet +
          "<p> Missing Pallet : <b> " +
          this.sjpStatus.tbr_pallet +
          "</span> </strong></div>";

        this.$swal({
          title: "Sendback " + this.sjpStatus.sjp_number,
          text: "...<div>" + checkContent + "</div>...",
          html: "...<div>" + checkContent + "</div>...",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sendback!",
          cancelButtonText: "No!",
        }).then((result) => {
          if (result.value) {
            this.autoSendback(); //JIKA SETUJU MAKA PERMINTAAN SENDBACK AKAN DI EKSEKUSI
          } else {
            this.$router.push({
              name: "sjp-status.sendback",
              params: { id: this.sjpStatus.id },
            });
          }
        });
      });
    },
    autoSendback() {
      this.sjpStatus.is_sendback = 1;
      this.sjpStatus.sjp_status = "sendback";
      this.sjpStatus.status = 0;
      this.sjpStatus.id_user_sender = 3;
      this.submitSjpStatus(this.sjpStatus).then((response) => {
        this.CLEAR_FORM();
        this.$router.push({ name: "sjp-status" });
      });
    },
    reset() {
      this.tbrPallet = 0;
      this.sjpStatus.receiving_driver_approval = '';
      this.sjpStatus.note = '';
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
