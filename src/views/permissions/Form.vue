<template>
  <v-form ref="form">
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="permission.name"
          outlined
          label="Name"
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
  name: "FormPermission",
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
    ...mapState("permission", {
      permission: (state) => state.permission, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("permission", ["CLEAR_FORM"]),
    ...mapActions("permission", ["submitPermission"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid){
        this.submitPermission(this.role).then(() => {
          this.$router.push({ name: "permissions" });
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
