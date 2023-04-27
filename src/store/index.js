import Vue from 'vue'
import Vuex from 'vuex'

import lang from './lang.js';
import auth from './auth.js';
import user from './user.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        lang,
        auth,
        user,
    },
    state: {
      token: localStorage.getItem('token'),
      errors: []
  },
  getters: {
      isAuth: state => {
          return state.token != "null" && state.token != null
      }
  },
  mutations: {
      SET_TOKEN(state, payload) {
          state.token = payload
      },
      SET_ERRORS(state, payload) {
          state.errors = payload
      },
      CLEAR_ERRORS(state) {
          state.errors = []
      }
  },
  })
export default store