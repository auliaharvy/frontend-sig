<template>
  <v-app id="inspire" class="body">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card v-if="$vuetify.breakpoint.mdAndUp" class="login" style="border-radius: 20px;">
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
                  >Masuk ke Pallet Management System
                </v-card-title>
                <v-form v-model="valid" style="margin-top: -20px">
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
                    label="Ingat Saya"
                    class="mt-n1"
                    color="blue"
                    style="margin-left: 18px"
                  >
                  </v-checkbox>
                  <v-card-actions>
                    <v-btn
                      v-for="login in logins"
                      router
                      :to="login.route"
                      block
                      color="success"
                      @click="handleLogin"
                      :disabled="!valid"
                      >Masuk</v-btn
                    >
                  </v-card-actions>
                  <p class=" ">Lupa kata sandi?</p>
                </v-form>
              </v-card>
            </v-card>
              <v-card v-else
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
                  >Masuk ke Pallet Management System
                </v-card-title>
                <v-form v-model="valid" style="margin-top: -20px">
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
                    label="Ingat Saya"
                    class="mt-n1"
                    color="blue"
                    style="margin-left: 18px"
                  >
                  </v-checkbox>
                  <v-card-actions>
                    <v-btn
                      v-for="login in logins"
                      router
                      :to="login.route"
                      block
                      color="success"
                      @click="handleLogin"
                      :disabled="!valid"
                      >Masuk</v-btn
                    >
                  </v-card-actions>
                  <p class=" ">Lupa kata sandi?</p>
                </v-form>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: "LoginView",
  data() {
    return {
      showPassword: false,
      user: {
        username: "",
        password: "",
      },
      userRules: [(v) => v != "" || "Username is Required"],
      pwRules: [(v) => v != "" || "Password is Required"],
      valid: false,
      logins: [{ route: "/dashboard" }],
    };
  },
  methods: {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      console.log(this.user);
      this.user = {
        username: "",
        password: "",
      };
      router.push({ path: "/dashboard" });
    },
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