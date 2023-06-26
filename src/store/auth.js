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
      localStorage.setItem('userData', null)
      localStorage.setItem('roles', null)
      commit('isLoading')
      commit('SET_TOKEN', null, { root: true })
      // commit('RESET_USER', { root: true })
      // commit('SET_USER_AUTH', null, { root: true })
      return new Promise((resolve, reject) => {
        apiClient.post('/users/login', payload)
          .then((response) => {
              if (response.data.status == 'success') {
                  const data = response.data.data;
                  localStorage.setItem('token', data.token);
                  var base64Url = data.token.split('.')[1];
                  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
                  var jsonUser = JSON.parse(jsonPayload)
                  localStorage.setItem('userData', jsonPayload);
                  commit('SET_USER_DATA', jsonUser, { root: true })
                  commit('SET_USER_AUTH', jsonUser, { root: true })
                  commit('SET_ROLE', jsonUser.data.role[0], { root: true })
                  commit('SET_TOKEN', response.data.data, { root: true })
              } else {
                  commit('SET_ERRORS', { invalid: 'Wrong Email/Password' }, { root: true })
              }
              resolve(response.data)
          })
          .catch((error) => {
            console.log(error);
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
      commit('RESET_USER')
      localStorage.removeItem('token'); // tambahkan ini untuk menghapus token dari localStorage
      localStorage.removeItem('userData'); // tambahkan ini untuk menghapus token dari localStorage
    },
  };

export default {
    namespaced : true,
    state,
    mutations,
    actions
  };