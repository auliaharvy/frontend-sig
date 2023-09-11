<template>
  <v-form ref="form">
    <v-container>
      <v-row no-gutters>
        <!-- <v-autocomplete
            :label="$t('perusahaan.perusahaan')"
            :items="companiesAll.data"
            :rules="idRules"
            outlined
            v-model="truck.id_company"
            item-text="name"
            item-value="id"
            required
            clearable
          >
        </v-autocomplete> -->
        <v-text-field
          v-model="truck.transporter_code"
          outlined
          :label="$t('trucks.transporter_code')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="truck.license_plate"
          outlined
          :label="$t('trucks.no')"
          :rules="nameRules"
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
  name: "FormRole",
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
    this.getCompaniesAll(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("truck", {
      truck: (state) => state.truck, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("permission", ["CLEAR_FORM"]),
    ...mapActions("truck", ["updateTruck"]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid){
        this.updateTruck(this.role).then(() => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
          this.$router.push({ name: "trucks" });
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
