<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sewaPallet.company')"
          :items="companiesDistributor.data"
          :rules="idRules"
          outlined
          v-model="sewaPallet.id_company_distributor"
          item-text="name"
          item-value="id"
          @change="setPallet"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.good_pallet"
          :label="$t('pallet.good')"
          type="number"
          outlined
          @change="totalPrice"
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.tbr_pallet"
          :label="$t('pallet.tbr')"
          type="number"
          outlined
          @change="totalPrice"
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.ber_pallet"
          :label="$t('pallet.ber')"
          type="number"
          outlined
          @change="totalPrice"
          readonly
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sewaPallet.missing_pallet"
          :label="$t('pallet.missing')"
          type="number"
          outlined
          @change="totalPrice"
          readonly
        ></v-text-field>
      </v-row>

      <vuetify-money
        v-model="price"
        :label="$t('sewaPallet.price')"
        outlined
        :rules="idRules"
        :options="options"
        @change="totalPrice"
      />

      <vuetify-money
        v-model="sewaPallet.total"
        :label="$t('sewaPallet.totalPrice')"
        outlined
        :options="options"
        readonly
      />

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
  name: "FormAddSewaPallet",
  data: () => ({
    price: 0,
    options: {
      prefix:"Rp",
      precision: 0
    },
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
    this.getCompaniesDistributor(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  watch: {
    price() {
      this.sewaPallet.price = this.price;
      this.totalPrice()
    }
  },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sewaPallet", {
      sewaPallet: (state) => state.sewaPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesDistributor: (state) => state.companiesDistributor, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sewaPallet", ["CLEAR_FORM"]),
    ...mapActions("sewaPallet", ["submitSewaPallet"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesDistributor"]),
    setPallet() {
      this.sewaPallet.good_pallet = this.companiesDistributor.data.find(x => x.id === this.sewaPallet.id_company_distributor).good_pallet;
      this.sewaPallet.tbr_pallet = this.companiesDistributor.data.find(x => x.id === this.sewaPallet.id_company_distributor).tbr_pallet;
      this.sewaPallet.ber_pallet = this.companiesDistributor.data.find(x => x.id === this.sewaPallet.id_company_distributor).ber_pallet;
      this.sewaPallet.missing_pallet = this.companiesDistributor.data.find(x => x.id === this.sewaPallet.id_company_distributor).missing_pallet;
      // console.log(this.companies)
    },
    totalPrice() {
      const totalPallet = parseInt(this.sewaPallet.good_pallet) + parseInt(this.sewaPallet.tbr_pallet) + parseInt(this.sewaPallet.ber_pallet) + parseInt(this.sewaPallet.missing_pallet);
      this.sewaPallet.total = this.sewaPallet.price * totalPallet;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.sewaPallet.status = 0;
        this.sewaPallet.created_by = this.roleSet.user_id;
        this.sewaPallet.updated_by = this.roleSet.user_id;
        this.submitSewaPallet(this.sewaPallet).then((response) => {
            this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "sewa-pallet" });
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
