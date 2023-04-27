import apiClient from "../api.js";

const state = {
    token: null,
  };
const mutations = {
    setToken(state, token) {
      state.token = token;
    },
  };
const actions = {
    async login({ commit }, user) {
      try {
        const response = await apiClient.post('/users/login', user);
        const token = response.data.token;
        console.log(setToken);
        commit('setToken', token);
        localStorage.setItem('token', token); // tambahkan ini untuk menyimpan token pada localStorage
        return token;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      commit('setToken', null);
      localStorage.removeItem('token'); // tambahkan ini untuk menghapus token dari localStorage
    },
  };

export default {
    namespaced : true,
    state,
    mutations,
    actions
  };