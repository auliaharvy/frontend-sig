<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('berMissingPallet.company')"
          :items="companies"
          :rules="idRules"
          outlined
          v-model="berMissingPallet.id_company"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          label="Tipe Transaksi"
          :items="transactionTypeData"
          :rules="idRules"
          outlined
          v-model="berMissingPallet.transaction_type"
          item-text="text"
          item-value="value"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="berMissingPallet.qty_good_pallet"
          :label="$t('pallet.good')"
          :rules="palletRules"
          outlined
          type="number"
          @change="totalPallet"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="berMissingPallet.qty_tbr_pallet"
          :label="$t('pallet.tbr')"
          :rules="palletRules"
          outlined
          type="number"
          @change="totalPallet"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="berMissingPallet.qty_ber_missing_pallet"
          label="Jumlah Pallet BER / Hilang"
          :rules="palletRules"
          outlined
          type="number"
          disabled
        ></v-text-field>
      </v-row>


      <v-row no-gutters>
        <v-textarea
          v-model="berMissingPallet.note"
          :label="$t('berMissingPallet.note')"
          outlined
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
  name: "FormAddChangeQuota",
  data: () => ({
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
    transactionTypeData: [
        { value: "0", text: "Pallet BER" },
        { value: "1", text: "Pallet Hilang" },
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
    ...mapState("berMissingPallet", {
      berMissingPallet: (state) => state.berMissingPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("berMissingPallet", ["CLEAR_FORM"]),
    ...mapActions("berMissingPallet", ["submitberMissingPallet"]),
    ...mapActions("company", ["getCompanies"]),
    totalPallet() {
      this.berMissingPallet.qty_ber_missing_pallet = parseInt(this.berMissingPallet.qty_good_pallet) + parseInt(this.berMissingPallet.qty_tbr_pallet);
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.berMissingPallet.id_user_reporter = this.roleSet.user_id;
        this.berMissingPallet.created_by = this.roleSet.user_id;
        this.berMissingPallet.updated_by = this.roleSet.user_id;
        this.submitberMissingPallet(this.berMissingPallet).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "ber-missing-pallet" });
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
