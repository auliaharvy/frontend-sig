import apiClient from "../api.js";

const state = () => ({
  loading: false,
  users: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
  roles: [],
  permissions: [],
  role_permission: [],

  //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
  user: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
  },
  page: 1,
});

const mutations = {
  isLoading(state) {
    state.loading = true;
  },
  doneLoading(state) {
    state.loading = false;
  },
  //MUTATIONS UNTUK ASSIGN DATA CUSTOMER KE DALAM STATE CUSTOMER
  ASSIGN_DATA(state, payload) {
    state.users = payload;
  },
  //MENGUBAH STATE PAGE
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  //MENGUBAH STATE CUSTOMER
  ASSIGN_FORM(state, payload) {
    state.user = payload;
  },
  //RESET STATE CUSTOMER
  CLEAR_FORM(state) {
    state.user = {
      id: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
    };
  },
  ASSIGN_ROLES(state, payload) {
    state.roles = payload;
  },
  ASSIGN_PERMISSION(state, payload) {
    state.permissions = payload;
  },
  ASSIGN_ROLE_PERMISSION(state, payload) {
    state.role_permission = payload;
  },
  CLEAR_ROLE_PERMISSION(state, payload) {
    state.role_permission = [];
  },
};

const actions = {
  getUsers({ commit, state }, payload) {
    commit("isLoading");
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve, reject) => {
      //REQUEST DATA USER  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
      apiClient
        .get(`/users?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_DATA", response.data.data); //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
          resolve(response.data.data);
        })
        .finally(() => {
          commit("doneLoading");
        });
    });
  },
  getUserDetail({ commit }, payload) {
    commit("isLoading");
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/users/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
        .then((response) => {
          commit("ASSIGN_FORM", response.data.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
          resolve(response.data.data.data[0]);
        })
        .finally(() => {
          commit("doneLoading");
        });
    });
  },
  submitUsers({ dispatch, commit, state }) {
    commit("isLoading");
    return new Promise((resolve, reject) => {
      //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
      apiClient
        .post(`/users/register`, state.user)
        .then((response) => {
          //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
          dispatch("getUsers").then(() => {
            resolve(response.data.data);
          });
        })
        .catch((error) => {
          //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        })
        .finally(() => {
          commit("doneLoading");
        });
    });
  },
  updateUser({ dispatch, commit, state }) {
    commit("isLoading");
    return new Promise((resolve, reject) => {
      //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
      apiClient
        .patch(`/users/${state.user.id}`, state.user)
        .then((response) => {
          //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
          dispatch("getUsers").then(() => {
            resolve(response.data.data);
          });
        })
        .catch((error) => {
          //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        })
        .finally(() => {
          commit("doneLoading");
        });
    });
  },

  deleteUser({ dispatch, commit }, payload) {
    commit("isLoading");
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/users/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
        .then((response) => {
          dispatch("getUsers").then(() => {
            resolve(response.data.data);
          });
        })
        .finally(() => {
          commit("doneLoading");
        });
    });
  },

  getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      apiClient.get(`/roles`).then((response) => {
        commit("ASSIGN_ROLES", response.data.data.data);
        resolve(response.data.data);
      });
    });
  },
  getAllPermission({ commit }) {
    return new Promise((resolve, reject) => {
      apiClient.get(`/permissions`).then((response) => {
        commit("ASSIGN_PERMISSION", response.data.data.data);
        resolve(response.data);
      });
    });
  },

  setRoleUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("CLEAR_ERRORS", "", { root: true });
      apiClient
        .post(`/userhasrole`, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
