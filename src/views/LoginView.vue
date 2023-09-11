<template>
  <v-app class="body">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-layout wrap style="margin-top: 100px">
        <v-flex sm14 md10 offset-md1>
          <v-col
            v-if="$vuetify.breakpoint.lg"
            md="12"
            align="center"
            justify="center"
          >
            <v-card style="height: 500px; border-radius: 20px" class="login">
              <v-card
                style="height: 500px; margin-left: 600px"
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
                <div style="color:#f74328; "><small>{{ errors.invalid }}</small></div>
                <v-form
                  v-model="valid"
                  style="margin-top: -20px"
                  @submit.prevent="postLogin"
                  @keyup.enter.native="postLogin"
                >
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
                  <!-- <v-radio-group style="margin-left: 18px" v-model="isSso" row>
                    <v-radio
                      label="Login SSO"
                      :value="0"
                    ></v-radio>
                    <v-radio
                        label="Login Manual"
                        :value="1"
                    ></v-radio>
                  </v-radio-group> -->
                  <v-card-actions>
                    <v-btn block type="submit" :disabled="!valid" class="red darken-1">{{
                      $t("login.masuk")
                    }}</v-btn>
                  </v-card-actions>
                <!-- <p class=" ">{{ $t("login.lupa") }}</p> -->
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
                <v-form
                  v-model="valid"
                  style="margin-top: -20px"
                  @submit.prevent="postLogin"
                  @keyup.enter.native="postLogin"
                >
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
                  <!-- <v-radio-group style="margin-left: 18px" v-model="isSso" row>
                    <v-radio
                      label="Login SSO"
                      :value="0"
                    ></v-radio>
                    <v-radio
                        label="Login Manual"
                        :value="1"
                    ></v-radio>
                  </v-radio-group> -->
                  <v-card-actions>
                    <v-btn block type="submit" class="red darken-1">{{ $t("login.masuk") }}</v-btn>
                  </v-card-actions>
                <!-- <p class=" ">{{ $t("login.lupa") }}</p> -->
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
              <v-form
                v-model="valid"
                @submit.prevent="postLogin"
                @keyup.enter.native="postLogin"
              >
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
                <!-- <v-radio-group style="margin-left: 18px" v-model="isSso" row>
                    <v-radio
                      label="Login SSO"
                      :value="0"
                    ></v-radio>
                    <v-radio
                        label="Login Manual"
                        :value="1"
                    ></v-radio>
                  </v-radio-group> -->
                <v-card-actions>
                  <v-btn
                    block
                    class="red darken-1"
                    :disabled="!valid"
                    type="submit"
                    >{{ $t("login.masuk") }}</v-btn
                  >
                </v-card-actions>
                <!-- <p class=" ">{{ $t("login.lupa") }}</p> -->
              </v-form>
            </v-card>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import LocaleSwitcher from "../components/LocaleSwitcher.vue";
export default {
  name: "LoginView",
  data() {
    return {
      isSso: 1,
      user: {
        username: "",
        password: "",
      },
      showPassword: false,
      valid: false,
      userRules: [(v) => !!v || this.$t("login.validasinamapengguna")],
      pwRules: [(v) => !!v || this.$t("login.validasikatasandi")],
      responseMessage: "",
    };
  },
  created() {
    if (this.isAuth) {
      this.$router.push({ to: "/dashboard" });
    }
  },
  computed: {
    ...mapGetters(["isAuth"]),
    ...mapState(["errors"]),
    ...mapState("auth", {
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      errorLogin: (state) => state.errorLogin, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      errorMessage: (state) => state.errorMessage, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("auth", ["submit", "submitSso"]),
    ...mapMutations("auth", ["CLEAR_ERROR_LOGIN"]),
    ...mapActions("user", ["getUserLogin"]),
    ...mapMutations(["CLEAR_ERRORS"]),
    async postLogin() {
      if(this.isSso == 1) {
        await this.submit(this.user).then(() => {
          if (this.isAuth) {
            this.CLEAR_ERRORS();
            this.$router.push({ name: "dashboard" }).then(() => { window.location.reload() });
          }
        });
      } else {
        await this.submitSso(this.user).then(() => {
          if (this.isAuth) {
            this.CLEAR_ERRORS();
            this.$router.push({ name: "dashboard" }).then(() => { window.location.reload() });
          }
        });
      }
    },
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
    forgetPassword() {
      this.$swal({
                icon: 'success',
                title: 'Success',
              });
    },
    
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
