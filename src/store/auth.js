import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials);
        const token = response.data.token;
        commit('setToken', token);
        return token;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      commit('setToken', null);
    },
  },
};