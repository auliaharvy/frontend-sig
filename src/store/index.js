import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode';


import lang from './lang.js'
import auth from "./auth";

Vue.use(Vuex)

const TOKEN_KEY = 'my-app-token';

const store = new Vuex.Store({
    modules: {
        lang,
        auth,
    },
    state: {
      token: null,
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
        localStorage.setItem(TOKEN_KEY, encrypt(token));
      },
      clearToken(state) {
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
      },
    },
    actions: {
      login({ commit }, { username, password }) {
        // code untuk melakukan request login ke server
        // setelah berhasil login, panggil mutation setToken dengan token yang diterima dari server
        const token = 'token-dari-server';
        commit('setToken', token);
      },
      logout({ commit }) {
        // code untuk melakukan request logout ke server
        // setelah berhasil logout, panggil mutation clearToken
        commit('clearToken');
      },
      initialize({ commit }) {
        // cek apakah ada token yang tersimpan pada local storage
        const encryptedToken = localStorage.getItem(TOKEN_KEY);
        if (encryptedToken) {
          const token = decrypt(encryptedToken);
          const decodedToken = jwtDecode(token);
          const expirationDate = new Date(decodedToken.exp * 1000);
          if (expirationDate > new Date()) {
            // token masih valid, panggil mutation setToken
            commit('setToken', token);
          } else {
            // token sudah expired, panggil mutation clearToken
            commit('clearToken');
          }
        }
      },
    },
  })
  function encrypt(token) {
    // code untuk mengenkripsi token
    return token;
  }
  
  // fungsi untuk mendekripsi token
  function decrypt(encryptedToken) {
    // code untuk mendekripsi token
    return encryptedToken;
  }
export default store