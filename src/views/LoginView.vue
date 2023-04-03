<template>
  <v-app class="body">  
    <v-container>
      <v-layout wrap style="margin-top: 100px;">
        <v-flex sm14 md10 offset-md1>
          <v-card style="height: 466px; border-radius: 20px;">
            <v-col md="12">
              <v-row>
                <v-col md="7" class="login">
                  <!-- <v-img src="../assets/login.png"
                         max-height="10000"
                         max-width="10000"
                  ></v-img> -->
                </v-col>
                <v-col md="5">
                    <v-img src="../assets/logo-sig.png"
                           max-height="200"
                           max-width="500"
                    ></v-img>
                    <v-card-title>Masuk ke Pallet Management System
                    </v-card-title>
                    <v-form v-model="valid">
                      <v-card-text>
                          <v-text-field :rules="userRules" label="Username" prepend-icon="mdi-account-circle" v-model="user.username" />
                          <v-text-field :rules="pwRules" label="Password" :type="showPassword ? 'text' : 'password'"
                          prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleIcon" v-model="user.password" />
                      </v-card-text>
                      <v-card-actions>
                        <v-btn block color="success" @click="handleLogin" :disabled="!valid">Masuk</v-btn>
                      </v-card-actions>
                    </v-form>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'LoginView',
  data(){
    return{
      showPassword : false,
      user: {
        username:'',
        password:'',
      },
      userRules: [
        v => v != '' || 'Username is Required'
      ],
      pwRules: [
        v => v != '' || 'Password is Required'
      ],
      valid: false
    }
  },
  methods:{
    handleIcon(){
      this.showPassword = !this.showPassword
      },
      handleLogin () {
        console.log(this.user)
        this.user = {
          username:'',
          password:''
        }
      }
  }
}
</script>

<style scoped>
.card-radius {
  border-radius:20px;
}
.body {
  background: #c60a01;
}
.login {
  background: url('/src/assets/login.png') no-repeat center center fixed !important;
}
</style>