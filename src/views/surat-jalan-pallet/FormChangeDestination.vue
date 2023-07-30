<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="sjp.trxNumber"
          :label="$t('sjp.trxNumber')"
          outlined
          disabled
          :rules="noTruckRules"
          required
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-model="sjp.transporter"
          :label="$t('sjp.transporter')"
          outlined
          disabled
          :rules="noTruckRules"
          required
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-if="sjp.trxStatus == 1 || sjp.trxStatus == 0"
          v-model="sjp.destination"
          :label="$t('sjp.originDest')"
          :rules="idRules"
          disabled
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-else
          v-model="sjp.departure"
          :label="$t('sjp.originDest')"
          :rules="idRules"
          disabled
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
          <v-autocomplete
            :label="$t('sjp.newDest')"
            :items="companiesDestination.data"
            :rules="idRules"
            outlined
            v-model="sjp.id_new_destination_company"
            item-text="name"
            item-value="id"
            required
            clearable
          />
        </v-row>

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn color="success" class="mt-4" block @click="validate">
              {{ $t("form.submit") }}
            </v-btn>

            <!-- <v-btn color="error" class="mt-4" block @click="reset">
              {{ $t("form.reset") }}
            </v-btn> -->
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
    this.getCompaniesDestination();
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjp", {
      sjp: (state) => state.sjp, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesDestination: (state) => state.companiesDestination, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjp", ["CLEAR_FORM"]),
    ...mapActions("sjp", ["updateSjp"]),
    ...mapActions("dropdown", ["getCompaniesDestination"]),
    ...mapActions("company", ["getCompanies"]),
    validate() {
      this.sjp.change_type = 'change_destination';
      const valid = this.$refs.form.validate();
      if (valid) {
        this.updateSjp(this.sjp).then((response) => {
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
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
