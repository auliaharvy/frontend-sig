import Vuex from "vuex";
import axios from "axios";

const API_ENDPOINT = "http://localhost:3000/users/login";

const state = {
  token: localStorage.getItem('token') || null, // tambahkan ini untuk mengambil token dari local storage saat inisiasi state
  isLoggedIn: false
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', response.data.token);
 // tambahkan ini untuk menyimpan token ke local storage saat mutasi
  },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
};

const actions = {
  login({ commit }, user) {
    return axios
      .post(API_ENDPOINT, user)
      .then(response => {
        const token = response.data.token;
        console.log(token)
        commit("setToken", token);
        commit("setLoggedIn", true);
        localStorage.setItem("token", token);
        console.log(localStorage.getItem('token'))
        return token;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});