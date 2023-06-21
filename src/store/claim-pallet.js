import apiClient from '../api.js'

const state = () => ({
    loading: false,
    claimPallets: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    claimPallet: {
      id: '',
      id_company_distributor: '',
      id_company_departure: '',
      id_user_manager: '',
      id_user_distributor: '',
      status: '',
      reason_manager: '',
      reason_distributor: '',
      ber_pallet: '',
      missing_pallet: '',
      total_price: '',
      created_at: '',
      updated_at: '',
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
        state.claimPallets = payload;
    },
    ASSIGN_DATA_EXPORT(state, payload) {
      state.exportData = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.claimPallet = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.claimPallet = {
          id: '',
          id_company_distributor: '',
          id_user_manager: '',
          id_user_distributor: '',
          status: '',
          reason_manager: '',
          reason_distributor: '',
          ber_pallet: '',
          missing_pallet: '',
          total_price: '',
          created_at: '',
          updated_at: '',
        }
    }
}

const actions = {
    getClaimPallets({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/claim-pallets?page=${state.page}&q=${search}`)
            .then((response) => {
              console.log(response);
              const roleSet = JSON.parse(localStorage.getItem("role"));
              if(roleSet.role_name == 'Supervisor' || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data);
              } else {
                const result = {
                  data: response.data.data.filter(val => val.company_name == roleSet.company_name),
                };  
                commit('ASSIGN_DATA', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data);
              }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportClaimPallets({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/claim-pallets/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitClaimPallet({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/claim-pallets`, state.claimPallet)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getClaimPallets').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                } else {
                    commit('SET_ERRORS', error.response.data.error, { root: true })
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getClaimPalletDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/claim-pallets/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updateClaimPallet({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/claim-pallets/${state.claimPallet.id}`, state.claimPallet)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getClaimPallets").then(() => {
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

    deleteClaimPallet({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/claim-pallets/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getClaimPallets").then(() => {
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
