<template>
  <v-form ref="form">
    <v-container>
      <!-- <v-row no-gutters>
        <v-autocomplete
            :label="$t('perusahaan.perusahaan')"
            :items="companies.data"
            :rules="idRules"
            outlined
            v-model="driver.id_company"
            item-text="name"
            item-value="id"
            required
            clearable
          >
        </v-autocomplete>
      </v-row> -->

      <v-row no-gutters>
        <v-text-field
          v-model="driver.name"
          outlined
          :label="$t('driver.nama')"
          :rules="nameRules"
          required
        ></v-text-field>
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
  name: "FormDriver",
  data: () => ({
    nameRules: [
      (value) => {
        if (value?.length > 3) return true;

        return "First name must be at least 3 characters.";
      },
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
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("driver", {
      driver: (state) => state.driver, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("driver", ["CLEAR_FORM"]),
    ...mapActions("driver", ["submitDriver"]),
    ...mapActions("company", ["getCompanies"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid){
        this.submitDriver(this.role).then(() => {
          this.$router.push({ name: "drivers" });
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
