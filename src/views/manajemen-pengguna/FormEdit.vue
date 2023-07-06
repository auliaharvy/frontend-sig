<template>
  <v-form ref="form">
    <v-container>
      <v-row no-gutters>
        <v-text-field
          v-model="user.username"
          :label="$t('manajemenpengguna.username')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="user.fullname"
          :label="$t('manajemenpengguna.namalengkap')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="user.email"
          :label="$t('manajemenpengguna.email')"
          :rules="emailRules"
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="user.password"
          :label="$t('login.katasandi')"
          required
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="user.passwordConfirm"
          :label="$t('login.katasandi')"
          :rules="confirmPasswordRules"
          required
          :type="showPasswordConfirm ? 'text' : 'password'"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
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
  name: "FormEditUser",
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
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
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("user", {
      user: (state) => state.user, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    confirmPasswordRules() {
      const rules = [(this.user.password === this.user.passwordConfirm) || "Password must match."];
      return rules;
    },
  },
  methods: {
    ...mapMutations("user", ["CLEAR_FORM"]),
    ...mapActions("user", ["updateUser"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.updateUser(this.user).then(() => {
          this.$router.push({ name: "user" });
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
