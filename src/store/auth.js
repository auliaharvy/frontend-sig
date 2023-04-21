import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    error: state => state.error
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.error = null
    },
    auth_error(state, error) {
      state.status = 'error'
      state.error = error
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = {}
      state.error = null
    }
  },

  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios
          .post('http://localhost:3000/users/login', user)
          .then(response => {
            const token = response.data.token
            const user = jwt_decode(token)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token, user })
            resolve(response)
          })
          .catch(error => {
            commit('auth_error', error.response.data)
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },

    logout({ commit }) {
      return new Promise(resolve => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
}