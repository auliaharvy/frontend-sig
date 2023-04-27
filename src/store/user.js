import axios from 'axios'
import Vuex from 'vuex'

export const state = {
  token: null
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post('http://localhost:3000/users/login', { username, password })
      const token = response.data.token

      // Simpan token pada Vuex state
      commit('SET_TOKEN', token)

      // Simpan token pada local storage
      localStorage.setItem('token', token)

      // Redirect ke halaman dashboard
      this.$router.push('/dashboard')
    } catch (error) {
      // Tangani error
    }
  },

  logout({ commit }) {
    // Hapus token dari Vuex state dan local storage
    commit('SET_TOKEN', null)
    localStorage.removeItem('token')

    // Redirect ke halaman login
    this.$router.push('/login')
  }
};
export default new Vuex.Store({
  namespaced:true,
  state,
  mutations,
  actions
});
