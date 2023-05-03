import apiClient from "../api.js";

const state = {
    loading: false,
  };
const mutations = {
    isLoading (state) {
      state.loading = true
    },
    doneLoading (state) {
        state.loading = false
    },
  };
const actions = {
    async submit({ commit }, payload) {
      localStorage.setItem('token', null)
      commit('isLoading')
      commit('SET_TOKEN', null, { root: true })
      return new Promise((resolve, reject) => {
        apiClient.post('/users/login', payload)
          .then((response) => {
              if (response.data.status == 'success') {
                  const data = response.data.data;
                  localStorage.setItem('token', data.token)
                  commit('SET_TOKEN', response.data.data, { root: true })
              } else {
                  commit('SET_ERRORS', { invalid: 'Wrong Email/Password' }, { root: true })
              }
              resolve(response.data)
          })
          .catch((error) => {
              if (error.response.status == 422) {
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
              } 
          })
          .finally(() => {
              commit('doneLoading')
          })
      })
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