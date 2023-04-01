<template>
  <v-app class="body">
   <v-container>
    <v-card tile elevation="10" class="card-radius" justify="center" align="center">
      <v-card-title>Login
      </v-card-title>
      <v-form v-model="valid">
      <v-card-text>
          <v-text-field :rules="userRules" label="Username" prepend-icon="mdi-account-circle" v-model="user.username" />
          <v-text-field :rules="pwRules" label="Password" :type="showPassword ? 'text' : 'password'"
           prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleIcon" v-model="user.password" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="handleLogin" :disabled="!valid">Login</v-btn>
        <v-btn color="info">Register</v-btn>
      </v-card-actions>
    </v-form>

    </v-card>
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