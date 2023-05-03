import Vue from "vue";
import Vuex from "vuex";
// import store from '../store';

import lang from "./lang.js";
import auth from "./auth.js";
import user from "./user.js";
import organization from "./organization.js";
import company from "./company.js";
import companyType from "./company-type.js";
import sjp from "./sjp.js";
import role from "./role.js";
import permission from "./permission";
import driver from "./driver";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    lang,
    auth,
    user,
    organization,
    company,
    companyType,
    sjp,
    role,
    permission,
    driver,
  },
  state: {
    token: localStorage.getItem("token"),
    errors: [],
  },
  getters: {
    isAuth: (state) => {
      return state.token != "null" && state.token != null;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
});
export default store;
