<template>
  <v-form ref="form">
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('organisasi.nama')"
          :items="organizations"
          :rules="idRules"
          outlined
          v-model="company.id_organization"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-autocomplete
          :label="$t('perusahaan.tipe')"
          :items="company_types.data"
          :rules="idRules"
          outlined
          v-model="company.id_company_type"
          item-text="name"
          item-value="id"
          required
          clearable
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="company.name"
          :label="$t('perusahaan.nama')"
          outlined
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="company.code"
          :label="$t('perusahaan.nomor')"
          outlined
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          v-model="company.address"
          :label="$t('perusahaan.alamat')"
          outlined
          :rules="nameRules"
          required
        ></v-textarea>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="company.city"
          :label="$t('perusahaan.kota')"
          outlined
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="company.phone"
          :label="$t('perusahaan.hp')"
          outlined
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="company.email"
          :label="$t('perusahaan.email')"
          outlined
          :rules="emailRules"
          required
        ></v-text-field>
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
  name: "FormOrganization",
  data: () => ({
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    nameRules: [
      v => !!v || 'this field is required',
      v => (v && v.length >= 3) || 'must be greater than 3 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
  }),
  created() {
    this.getOrganization(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
    this.getCompanyTypes(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("organization", {
      organizations: (state) => state.organizations, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("companyType", {
      company_types: (state) => state.company_types, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("company", {
      company: (state) => state.company, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("company", ["CLEAR_FORM"]),
    ...mapActions("company", ["submitCompany"]),
    ...mapActions("organization", ["getOrganization"]),
    ...mapActions("companyType", ["getCompanyTypes"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$swal({
                icon: 'success',
                title: 'Success',
              });
        this.submitCompany(this.company).then(() => {
          this.$router.push({ name: "company" });
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
