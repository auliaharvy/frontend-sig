<template>
  <v-app class="body">
    <v-container>
      <v-layout wrap style="margin-top: 100px">
        <v-flex sm14 md10 offset-md1>
          <v-col
            v-if="$vuetify.breakpoint.lg"
            md="12"
            align="center"
            justify="center"
          >
            <v-card style="height: 466px; border-radius: 20px" class="login">
              <v-card
                style="height: 466px; margin-left: 600px"
                max-width="400"
                justify="center"
                align="center"
              >
                <v-img
                  src="../assets/logo-sig.png"
                  max-heigth="200"
                  max-width="400"
                  style="margin-top: -40px"
                ></v-img>
                <v-card-title
                  style="font-size: 15px; margin-top: -20px; margin-left: 25px"
                >
                  {{ $t("login.judul") }}
                </v-card-title>
                <LocaleSwitcher />
                <v-form v-model="valid" style="margin-top: -20px" @submit.prevent="login" @keyup.enter.native="login">
                  <v-card-text>
                    <v-text-field
                      :rules="userRules"
                      label="Username"
                      prepend-icon="mdi-account-circle"
                      v-model="user.username"
                    />
                    <v-text-field
                      :rules="pwRules"
                      label="Password"
                      :type="showPassword ? 'text' : 'password'"
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="handleIcon"
                      v-model="user.password"
                    />
                  </v-card-text>
                  <v-checkbox
                    :label="$t('login.ingat')"
                    class="mt-n1"
                    color="blue"
                    style="margin-left: 18px"
                  >
                  </v-checkbox>
                  <v-card-actions>
                    <v-btn
                      block
                      color="success"
                      :disabled="isDisabled"
                      @click="login"
                      >{{ $t("login.masuk") }}</v-btn
                    >
                  </v-card-actions>
                  <p class=" ">{{ $t("login.lupa") }}</p>
                </v-form>
              </v-card>
            </v-card>
          </v-col>
          <v-col
            v-else-if="$vuetify.breakpoint.md"
            md="12"
            align="center"
            justify="center"
          >
            <v-card style="height: 466px; border-radius: 20px" class="login">
              <v-card
                style="height: 466px; margin-left: 310px"
                max-width="400"
                justify="center"
                align="center"
              >
                <v-img
                  src="../assets/logo-sig.png"
                  max-heigth="170"
                  max-width="340"
                  style="margin-top: -40px"
                ></v-img>
                <v-card-title
                  style="font-size: 15px; margin-top: -20px; margin-left: 50px"
                  >{{ $t("login.judul") }}
                </v-card-title>
                <LocaleSwitcher />
                <v-form v-model="valid" style="margin-top: -20px" @submit.prevent="login" @keyup.enter.native="login">
                  <v-card-text>
                    <v-text-field
                      :rules="userRules"
                      :label="$t('login.namapengguna')"
                      prepend-icon="mdi-account-circle"
                      v-model="user.username"
                    />
                    <v-text-field
                      :rules="pwRules"
                      :label="$t('login.katasandi')"
                      :type="showPassword ? 'text' : 'password'"
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="handleIcon"
                      v-model="user.password"
                    />
                  </v-card-text>
                  <v-checkbox
                    :label="$t('login.ingat')"
                    class="mt-n1"
                    color="blue"
                    style="margin-left: 18px"
                  >
                  </v-checkbox>
                  <v-card-actions>
                    <v-btn
                      block
                      color="success"
                      :disabled="isDisabled"
                      @click="login"
                      >{{ $t("login.masuk") }}</v-btn>
                  </v-card-actions>
                  <p class=" ">{{ $t("login.lupa") }}</p>
                </v-form>
              </v-card>
            </v-card>
          </v-col>
          <v-col v-else cols="12" justify="center" align="center">
            <v-card
              style="height: 480px; border-radius: 20px; margin-top: 60px"
              max-width="400"
            >
              <v-img
                src="../assets/logo-sig.png"
                max-heigth="170"
                max-width="340"
                style="margin-top: -60px"
              ></v-img>
              <v-card-title
                style="font-size: 13px; margin-top: -20px; margin-left: 75px"
                >{{ $t("login.judul") }}
              </v-card-title>
              <LocaleSwitcher />
              <v-form v-model="valid" @submit.prevent="login" @keyup.enter.native="login">
                <v-card-text>
                  <v-text-field
                    :rules="userRules"
                    :label="$t('login.namapengguna')"
                    prepend-icon="mdi-account-circle"
                    v-model="user.username"
                  />
                  <v-text-field
                    :rules="pwRules"
                    :label="$t('login.katasandi')"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="handleIcon"
                    v-model="user.password"
                  />
                </v-card-text>
                <v-checkbox
                  :label="$t('login.ingat')"
                  class="mt-n1"
                  color="blue"
                  style="margin-left: 17px"
                >
                </v-checkbox>
                <v-card-actions>
                  <v-btn
                    block
                    color="success"
                    :disabled="isDisabled"
                    @click="login"
                  >{{ $t("login.masuk") }}</v-btn
                  >
                </v-card-actions>
                <p class=" ">{{ $t("login.lupa") }}</p>
              </v-form>
            </v-card>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import vueaxios from "axios";
import axios from "axios";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import LocaleSwitcher from "../components/LocaleSwitcher.vue";
export default {
  name: "LoginView",
  data() 
  {
    return {
      showPassword: false,
      user: {
        username: "",
        password: "",
      },
      userRules: [(v) => v != "" || "Username is Required"],
      pwRules: [(v) => v != "" || "Password is Required"],
      valid: false,
    };
  },
  methods: 
  {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
    login() {
      axios.post('https://localhost:3000/api/users/login', this.user)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          console.log('Login berhasil');
          this.$router.push({ path: "/dashboard" });
        } else {
          console.error('Login gagal: ' + response.data.message);
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan saat mengirim permintaan: ' + error.message);
      });
    }
  },
  computed: {
      isDisabled() {
        return !this.valid;
      }
  },
  components: {
    LocaleSwitcher,
  },
};
</script>

<style scoped>
.v-text-field {
  width: 450px;
  height: 50px;
}
.card-radius {
  border-radius: 20px;
}
.body {
  background: url("/src/assets/bg-login.jpeg") center fixed !important;
}
.login {
  background: url("/src/assets/login.png") no-repeat center center fixed !important;
}
</style>