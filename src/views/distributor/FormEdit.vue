<template>
  <v-form ref="form">
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="distributor.code"
          outlined
          label="Code"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-model="distributor.name"
          outlined
          label="Name"
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
  name: "FormDistributor",
  data: () => ({
    nameRules: [
      (value) => {
        if (value?.length > 3) return true;

        return "First name must be at least 3 characters.";
      },
    ],
  }),
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("distributor", {
      distributor: (state) => state.distributor, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("distributor", ["CLEAR_FORM"]),
    ...mapActions("distributor", ["updateDistributor"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid){
        this.updateDistributor(this.distributor).then(() => {
          this.$router.push({ name: "distributor" });
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
