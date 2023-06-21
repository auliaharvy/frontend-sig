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
import sewaPallet from "./sewa-pallet";
import transporterAdjusment from "./transporter-adjusment";
import palletMovement from "./pallet-movement";
import dashboard from "./dashboard";
import apiExternal from "./api-external";
import allTransaction from "./all-transaction";
import dropdown from "./dropdown";

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
    claimPallet,
    sewaPallet,
    transporterAdjusment,
    palletMovement,
    dashboard,
    apiExternal,
    allTransaction,
    dropdown
  },
  state: {
    token: localStorage.getItem("token"),
    userData: JSON.parse(localStorage.getItem("userData")),
    userAuthenticated: JSON.parse(localStorage.getItem("userData")),
    errors: [],
    roles: [],
    roleSet: JSON.parse(localStorage.getItem("role")),
    permissions: JSON.parse(localStorage.getItem("permissions")),
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
    SET_USER_DATA(state, payload) {
      state.userData = payload;
      state.userData.roleSet = payload.data.role[0];
      state.userData.role = payload.data.role[0].role_name;
      state.userData.company = payload.data.role[0].company_name;
    },
    SET_USER_ROLE(state, payload) {
      state.roleSet = payload;
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    },
    RESET_USER(state) {
      state.userAuthenticated = {};
      state.userData = {};
      state.roleSet = {};
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
});
export default store;
