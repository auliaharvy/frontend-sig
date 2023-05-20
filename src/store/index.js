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
import truck from "./truck";
import palletTransfer from "./pallet-transfer";
import sjpStatus from "./sjp-status";
import changeQuota from "./change-quota";
import damagedPallet from "./damaged-pallet";
import repairedPallet from "./repaired-pallet";
import newPallet from "./new-pallet";
import palletRealization from "./pallet-realization";
import claimPallet from "./claim-pallet";

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
    truck,
    palletTransfer,
    sjpStatus,
    changeQuota,
    damagedPallet,
    repairedPallet,
    newPallet,
    palletRealization,
    claimPallet
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
