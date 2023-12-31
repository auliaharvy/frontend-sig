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
      localStorage.setItem('role', null)
      localStorage.setItem('permission', null)
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
                  console.log(data.data);
                  var jsonUser = data;
                  if (jsonUser.data.role.length == 0) {
                    alert('User does not have role, please contact administrator');
                  } else {
                    jsonUser.data.role.forEach((element, index) => {
                      element['index'] = index + 1;
                    });
                    localStorage.setItem('userData', JSON.stringify(jsonUser));
                    localStorage.setItem('role', JSON.stringify(jsonUser.data.role[0]));
                    localStorage.setItem('permission', JSON.stringify(jsonUser.data.role[0].permissions));
                    commit('SET_USER_DATA', jsonUser, { root: true })
                    // commit('SET_USER_AUTH', jsonUser, { root: true })
                    commit('SET_USER_ROLE', jsonUser.data.role[0], { root: true })
                    commit('SET_TOKEN', response.data.data, { root: true })
                    resolve(response.data)
                  }
              } else {
                  alert('Wrong Email/Password');
                  commit('SET_ERRORS', { invalid: 'Wrong Email/Password' }, { root: true })
              }
          })
          .catch((error) => {
              if (error.response.status == 422) {
                  alert(error.response.data.errors[0]);
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
              } else {
                alert(error.response.data.message);
              }
          })
          .finally(() => {
              commit('doneLoading')
          })
      })
    },
    async submitSso({ commit }, payload) {
      localStorage.setItem('token', null)
      localStorage.setItem('userData', null)
      localStorage.setItem('role', null)
      localStorage.setItem('permission', null)
      commit('isLoading')
      commit('SET_TOKEN', null, { root: true })
      // commit('RESET_USER', { root: true })
      // commit('SET_USER_AUTH', null, { root: true })
      return new Promise((resolve, reject) => {
        apiClient.post('/api-external/login-sso', payload)
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
                  if (jsonUser.data.role.length == 0) {
                    alert('User does not have role, please contact administrator');
                  } else {
                    jsonUser.data.role.forEach((element, index) => {
                      element['index'] = index + 1;
                    });
                    localStorage.setItem('userData', jsonPayload);
                    localStorage.setItem('role', JSON.stringify(jsonUser.data.role[0]));
                    localStorage.setItem('permission', JSON.stringify(jsonUser.data.role[0].permissions));
                    commit('SET_USER_DATA', jsonUser, { root: true })
                    // commit('SET_USER_AUTH', jsonUser, { root: true })
                    commit('SET_USER_ROLE', jsonUser.data.role[0], { root: true })
                    commit('SET_TOKEN', response.data.data, { root: true })
                    resolve(response.data)
                  }
              } else {
                  alert('Wrong Email/Password');
                  commit('SET_ERRORS', { invalid: 'Wrong Email/Password' }, { root: true })
              }
          })
          .catch((error) => {
              if (error.response.status == 422) {
                  alert(error.response.data.errors[0]);
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
              } else {
                alert(error.response.data.message);
              }
          })
          .finally(() => {
              commit('doneLoading')
          })
      })
    },
    async logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("role");
      commit('setToken', null);
      commit('RESET_USER');
    },
    async setRole({ commit }, payload) {
      localStorage.setItem('role', null)
      localStorage.setItem('permission', null)
      commit('isLoading')
      commit('SET_USER_ROLE', payload, { root: true })
      localStorage.setItem('role', JSON.stringify(payload));
      localStorage.setItem('permission', JSON.stringify(payload.permissions));
    },
  };

export default {
    namespaced : true,
    state,
    mutations,
    actions
  };