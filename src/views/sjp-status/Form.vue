<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="sjpStatus.sjp_number"
          :label="$t('sjpStatus.sjpNumber')"
          :rules="idRules"
          outlined
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.departure')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_departure_company"
          item-text="name"
          item-value="id"
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
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('palletTransfer.transporter')"
          :items="companies.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_transporter_company"
          item-text="name"
          item-value="id"
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjpStatus.good_pallet"
          :label="$t('pallet.good')"
          :rules="palletRules"
          outlined
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-file-input
          v-model="sjpStatus.sending_driver_approval"
          outlined
          :label="$t('sjpStatus.approval')"
        ></v-file-input>
        <small></small>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="sjpStatus.note"
          :label="$t('palletTransfer.note')"
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
  name: "FormAddSJPStatus",
  data: () => ({
    loading: false,
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
  },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjpStatus", ["CLEAR_FORM"]),
    ...mapActions("sjpStatus", ["submitSjpStatus"]),
    ...mapActions("company", ["getCompanies"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.sjpStatus.is_sendback = 0;
        this.sjpStatus.status = 0;
        this.sjpStatus.id_user_sender = this.roleSet.user_id;
        this.sjpStatus.sjp_status = "send";
        this.submitSjpStatus(this.sjpStatus).then((response) => {
          console.log(response);
            this.CLEAR_FORM();
            this.$router.push({ name: "sjp-status" });
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
      this.sjpStatus.sending_driver_approval = '';
      this.sjpStatus.note = '';
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
