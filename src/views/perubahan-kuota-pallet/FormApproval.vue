<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('changeQuota.compRequester')"
          :items="companiesAll.data"
          :rules="idRules"
          outlined
          v-model="changeQuota.id_company_requester"
          readonly
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
          readonly
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
          :rules="idRules"
          readonly
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="changeQuota.approved_quantity"
          :label="$t('changeQuota.approvedQuantity')"
          :rules="palletRules"
          outlined
        ></v-text-field>
      </v-row>


      <v-row no-gutters>
        <v-textarea
          v-model="changeQuota.reason"
          readonly
          :label="$t('changeQuota.reason')"
          outlined
        ></v-textarea>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="changeQuota.note"
          :label="$t('changeQuota.note')"
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
  name: "FormApproveChangeQuota",
  data: () => ({
    itemsType: [
      {
        id: 0,
        name: "Penambahan"
      },
      {
        id: 1,
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
  }),
  created() {
    this.getCompanies(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.getCompaniesAll(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("changeQuota", {
      changeQuota: (state) => state.changeQuota, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("changeQuota", ["CLEAR_FORM"]),
    ...mapActions("changeQuota", ["updateChangeQuota"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    validate() {
      if (this.changeQuota.approved_quantity > this.changeQuota.quantity) {
        alert('Approved quantity cannot greater than request quantity')
      } else {
        const valid = this.$refs.form.validate();
      if (valid) {
        var roleData = JSON.parse(localStorage.getItem("role"))
        this.changeQuota.status = 1;
        this.changeQuota.id_approver = roleData.user_id;
        // this.changeQuota.created_by = roleData.user_id;
        this.changeQuota.updated_by = roleData.user_id;
        this.updateChangeQuota(this.changeQuota).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "change-quota" });
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
      }
      
    },
    reset() {
      this.changeQuota.approved_quantity = 0;
      this.changeQuota.note = '';
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
