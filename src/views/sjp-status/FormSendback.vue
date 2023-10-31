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
          :label="$t('sjpStatus.sendbackTo')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="sjpStatus.id_departure_company"
          item-text="name"
          item-value="id"
          readonly
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('sjpStatus.sendbackFrom')"
          :items="companiesAll.data"
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
          :items="companiesAll.data"
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
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="tbrPallet"
          :label="$t('pallet.tbr')"
          :rules="palletRules"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
          <!-- v-model="sjpStatus.sending_driver_approval" -->
        <v-file-input
          v-model="sjpStatus.sending_driver_approval"
          accept="image/png, image/jpeg"
          outlined
          @change="uploadImage"
          :label="$t('sjpStatus.approval')"
        ></v-file-input>
        <div style="width: 100%; padding-bottom: 35px;">
          <small>Max File : 2.5 MB | Tipe file : image/png, image/jpeg  </small>
        </div>
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
            <v-btn class="mt-4 red darken-1 text-white" block @click="validate">
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
  name: "FormAddSJPStatus",
  data: () => ({
    roleUser: {},
    tbrPallet: 0,
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    imageRules: [
      (v) => ['image/png','image/jpeg','image/jpg'].includes(v.type) || "Only jpg/jpeg and png files are allowed!"
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
    this.getRoleSet();
    this.getCompaniesAll(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  watch: {
    tbrPallet() {
      this.sjpStatus.tbr_pallet = this.tbrPallet;
      this.sjpStatus.good_pallet =
        this.sjpStatus.send_good_pallet - this.tbrPallet;
    },
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjpStatus", ["CLEAR_FORM"]),
    ...mapActions("sjpStatus", ["submitSjpStatus"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    uploadImage(e) {
      const selectedFile = e;
      this.sjpStatus.sending_driver_approval = selectedFile;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.sjpStatus.is_sendback = 1;
        this.sjpStatus.status = 0;
        this.sjpStatus.id_user_sender = this.roleUser.user_id;
        this.sjpStatus.sjp_status = "sendback";
        let form = new FormData();
        form.append('id_sjp', this.sjpStatus.id_sjp);
        form.append('sjp_number', this.sjpStatus.sjp_number);
        form.append('id_departure_company', this.sjpStatus.id_departure_company);
        form.append('id_destination_company', this.sjpStatus.id_destination_company);
        form.append('id_transporter_company', this.sjpStatus.id_transporter_company);
        form.append('good_pallet', this.sjpStatus.good_pallet);
        form.append('tbr_pallet', this.sjpStatus.tbr_pallet);
        form.append('ber_pallet', '0');
        form.append('missing_pallet', '0');
        form.append('sending_driver_approval', this.sjpStatus.sending_driver_approval);
        // form.append('receiving_driver_approval', this.sjpStatus.sending_driver_approval);
        form.append('note',this.sjpStatus.note);
        form.append('is_sendback',this.sjpStatus.is_sendback);
        form.append('status',this.sjpStatus.status);
        form.append('id_user_sender',this.sjpStatus.id_user_sender);
        form.append('updated_by',this.sjpStatus.updated_by);
        form.append('created_by',this.sjpStatus.created_by);
        form.append('sjp_status',this.sjpStatus.sjp_status);
        this.submitSjpStatus(form).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
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
      this.tbrPallet = 0;
      this.sjpStatus.receiving_driver_approval = '';
      this.sjpStatus.note = '';
    },
    getRoleSet() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
