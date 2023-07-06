<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('changeQuota.compRequester')"
          :items="companiesDeparture.data"
          :rules="idRules"
          outlined
          v-model="changeQuota.id_company_requester"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('changeQuota.type')"
          :items="itemsType"
          outlined
          v-model="changeQuota.type"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="changeQuota.quantity"
          :label="$t('changeQuota.requestedQuantity')"
          :rules="palletRules"
          outlined
        ></v-text-field>
      </v-row>


      <v-row no-gutters>
        <v-textarea
          v-model="changeQuota.reason"
          :label="$t('changeQuota.reason')"
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
  name: "FormAddChangeQuota",
  data: () => ({
    itemsType: [
      {
        id: '0',
        name: "Penambahan"
      },
      {
        id: '1',
        name: "Pengurangan"
      },
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
    this.getCompaniesDeparture(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState["roleSet"],
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("changeQuota", {
      changeQuota: (state) => state.changeQuota, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesDeparture: (state) => state.companiesDeparture, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("changeQuota", ["CLEAR_FORM"]),
    ...mapActions("changeQuota", ["submitChangeQuota"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesDeparture"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.changeQuota.type == 0) {
          var roleData = JSON.parse(localStorage.getItem("role"))
          this.changeQuota.status = 0;
          this.changeQuota.id_requester = roleData.user_id;
          this.changeQuota.created_by = roleData.user_id;
          this.changeQuota.updated_by = roleData.user_id;
          this.submitChangeQuota(this.changeQuota).then((response) => {
            this.$swal({
                  icon: 'success',
                  title: 'Success',
                });
              this.CLEAR_FORM();
              this.$router.push({ name: "change-quota" });
          });
        } else {
          const quotaCompany = this.companiesDeparture.data.find(x => x.id === this.changeQuota.id_company_requester).quota;
          if (this.changeQuota.quantity > quotaCompany) {
            alert('Approved quantity cannot greater than request quantity')

          } else {
            var roleData = JSON.parse(localStorage.getItem("role"))
            this.changeQuota.status = 0;
            this.changeQuota.id_requester = roleData.user_id;
            this.changeQuota.created_by = roleData.user_id;
            this.changeQuota.updated_by = roleData.user_id;
            this.submitChangeQuota(this.changeQuota).then((response) => {
              this.$swal({
                    icon: 'success',
                    title: 'Success',
                  });
                this.CLEAR_FORM();
                this.$router.push({ name: "change-quota" });
            });
          }
        }
        
        
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
