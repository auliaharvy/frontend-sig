import apiClient from "../api.js";

const state = () => ({
    loading: false,
    roles: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    role: {
        id: '',
        name: '',
    },
    page: 1
})

const mutations = {
    isLoading (state) {
        state.loading = true
    },
    doneLoading (state) {
        state.loading = false
    },
    //MUTATIONS UNTUK ASSIGN DATA CUSTOMER KE DALAM STATE CUSTOMER
    ASSIGN_DATA(state, payload) {
        state.roles = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.role = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.role = {
            id: '',
            name: '',
        }
    }
}

const actions = {
    getRoles({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA CUSTOMER  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/roles?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getRoleDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/roles/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

    submitRole({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/roles`, state.role)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getRoles').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    updateRole({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/roles/${state.role.id}`, state.role)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getRoles").then(() => {
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

      deleteRole({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/roles/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getRoles").then(() => {
                resolve(response.data.data);
              });
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
