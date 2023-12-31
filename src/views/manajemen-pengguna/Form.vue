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
          :rules="passwordRules"
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
  name: "FormUser",
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
    passwordRules: [
      (value) => {
        if (value) return true;

        return "This field is required";
      },
      (value) => {
        if (value.length >= 8) return true;

        return "Password must be at least 8 characters long";
      },
      (value) => {
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) return true;

        return "Password must contain both uppercase and lowercase letters";
      },
      (value) => {
        if (/[0-9]/.test(value)) return true;

        return "Password must contain at least one number";
      },
      (value) => {
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return true;

        return "Password must contain at least one special character";
      },
      // Optional: Disallow common passwords
      (value) => {
        const commonPasswords = ["password", "123456", "qwerty", /* ... */];
        if (!commonPasswords.includes(value.toLowerCase())) return true;

        return "Password is too common. Please choose a more unique password.";
      }
    ],
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
    ...mapActions("user", ["submitUsers"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.submitUsers(this.user).then(() => {
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
