import axios from 'axios'

const state = {
  user: null,
  isAuthenticated: false,
  loginError: null,
}

const getters = {
  getUser: (state) => state.user,
  getIsAuthenticated: (state) => state.isAuthenticated,
  getLoginError: (state) => state.loginError,
}

const actions= {
    async login({ commit }, user) {
      try {
        const response = await api.post('/users/login', user);
        const data = response.data;
        commit('SET_USER', data);
      } catch (error) {
        const errorMessage = error.response.data.message;
        commit('SET_ERROR', errorMessage);
      }
    }
  }

const mutations = {
  setUser: (state, user) => (state.user = user),
  setIsAuthenticated: (state, isAuthenticated) =>
    (state.isAuthenticated = isAuthenticated),
  setLoginError: (state, error) => (state.loginError = error),
}

export default {
  state,
  getters,
  actions,
  mutations,
}