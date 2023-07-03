<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('claimPallet.company')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="claimPallet.id_company_distributor"
          item-text="name"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.ber_pallet"
          :rules="palletRules"
          :label="$t('pallet.ber')"
          type="number"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="claimPallet.missing_pallet"
          :rules="palletRules"
          :label="$t('pallet.missing')"
          type="number"
          outlined
        ></v-text-field>
      </v-row>

        <vuetify-money
          v-model="price"
          :rules="idRules"
          :label="$t('sewaPallet.price')"
          outlined
          :options="options"
        />
        
      <vuetify-money
          v-model="claimPallet.total"
          :label="$t('sewaPallet.totalPrice')"
          :rules="idRules"
          readonly
          outlined
          :options="options"
        />

      <v-row no-gutters>
        <v-file-input
          v-model="claimPallet.photo"
          :rules="imageRules"
          accept="image/png, image/jpeg"
          outlined
          @change="uploadImage"
          :label="$t('sjpStatus.approval')"
          id="fileName"
        ></v-file-input>
        <div style="width: 100%; padding-bottom: 35px;">
          <small>Max File : 2.5 MB | Tipe file : image/png, image/jpeg  </small>
        </div>
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
  name: "FormAddClaimPallet",
  data: () => ({
    price: 0,
    options: {
      prefix:"Rp",
      precision: 0
    },
    imageRules: [
      (v) => !v || v.size < 2000000 || "Avatar size should be less than 2 MB!",
      (v) => !v || ['image/png','image/jpeg','image/jpg'].includes(v.type) || "Only jpg/jpeg and png files are allowed!"
    ],
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
  watch: {
    price() {
      this.claimPallet.price = this.price;
      this.totalPrice()
    }
  },
  created() {
    this.getCompanies(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesAll();
    },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("claimPallet", {
      claimPallet: (state) => state.claimPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("claimPallet", ["CLEAR_FORM"]),
    ...mapActions("claimPallet", ["submitClaimPallet"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    locationToImage(name) {
      console.log(name);
      window.location.href = name;
    },
    totalPrice() {
      console.log(this.claimPallet.ber_pallet)
      const totalPallet = parseInt(this.claimPallet.ber_pallet) + parseInt(this.claimPallet.missing_pallet);
      console.log(totalPallet)
      this.claimPallet.total = this.claimPallet.price * totalPallet;
      console.log(this.claimPallet.total)
    },
    uploadImage(e) {
      console.log(e);
      const selectedFile = e;
      this.claimPallet.photo = selectedFile;
      console.log(this.claimPallet.photo);
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.claimPallet.status = 0;
        this.claimPallet.created_by = this.roleSet.user_id;
        this.claimPallet.updated_by = this.roleSet.user_id;

        let form = new FormData();
        form.append('id_company_distributor', this.claimPallet.id_company_distributor);
        form.append('price', this.claimPallet.price);
        form.append('ber_pallet', this.claimPallet.ber_pallet);
        form.append('missing_pallet', this.claimPallet.missing_pallet);
        form.append('photo', this.claimPallet.photo);
        form.append('created_by', this.claimPallet.created_by);
        form.append('updated_by', this.claimPallet.updated_by);
        form.append('status', this.claimPallet.status);

        this.submitClaimPallet(form).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "claim-pallet" });
          // else {
          //   if (this.errors) {
          //     this.$swal({
          //       icon: 'error',
          //       title: 'error.status',
          //       text: this.errors,
          //     });
          //   }
          // }
        }).catch((error) => {
          console.log(error);
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
