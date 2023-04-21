import Vuex from "vuex";
import axios from "axios";

const API_ENDPOINT = "http://localhost:3000/users/login";

const state = {
    token: localStorage.getItem('token') || null, 
    isLoggedIn: false,
    responseMessage: null // tambahkan properti untuk menyimpan response message
  };
  
  const mutations = {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setResponseMessage(state, message) { // tambahkan mutation untuk mengubah response message
      state.responseMessage = message;
    }
  };
  
  const actions = {
    login({ commit }, user) {
      return axios
        .post(API_ENDPOINT, user)
        .then(response => {
          const token = response.data.token;
          commit("setToken", token);
          commit("setLoggedIn", true);
          localStorage.setItem("token", token);
          commit("setResponseMessage", "Login berhasil"); // set response message pada commit mutasi
          return token;
        })
        .catch(error => {
          console.error(error);
          commit("setResponseMessage", "Login gagal"); // set response message pada commit mutasi jika login gagal
          throw error;
        });
    }
  };
  

export default new Vuex.Store({
  state,
  mutations,
  actions
});