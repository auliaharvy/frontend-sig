import apiClient from '../api.js'
import role from './role.js'

const state = () => ({
    loading: false,
    newPallets: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    newPallet: {
      id: '',
      id_trx_change_quota: '',
      id_company_workshop: '',
      trx_number: '',
      qty_request_pallet: '',
      qty_ready_pallet: '',
      status: '',
      no_change_quota: '',
      created_by: '',
      updated_by: '',
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
        state.newPallets = payload;
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
        state.newPallet = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.newPallet = {
          id: '',
          id_trx_change_quota: '',
          id_company_workshop: '',
          trx_number: '',
          qty_request_pallet: '',
          qty_ready_pallet: '',
          status: '',
          no_change_quota: '',
          created_by: '',
          updated_by: '',
          created_at: '',
          updated_at: '',
        }
    }
}

const actions = {
    getNewPallets({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/new-pallets?page=${state.page}&q=${search}`)
            .then((response) => {
              console.log(response);
              const roleSet = JSON.parse(localStorage.getItem("role"));
                if( roleSet.role_name == 'Superuser') {
                  commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
                } else {
                  const result = {
                    data: response.data.data.filter(val => val.company_requester == roleSet.company_name || val.company_workshop == roleSet.company_name),
                  };  
                  commit('ASSIGN_DATA', result.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
                } 
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportNewPallets({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/new-pallets/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitNewPallet({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/new-pallets`, state.newPallet)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getNewPallets').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                  alert(error.response.data.errors[0]);
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
                } else if (error.response.status == 400) {
                  if(error.response.data.error) {
                    alert(error.response.data.error);
                  } else if (error.response.data.message) {
                    alert(error.response.data.message);
                  } else {
                    alert(error.response.data);
                  }
                }
                else {
                  alert(error.response.data.message);
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getNewPalletDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/new-pallets/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updateChangeQuota({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/change-quotas/${state.changeQuota.id}`, state.changeQuota)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getChangeQuotas").then(() => {
                resolve(response.data.data);
              });
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
              alert(error.response.data);
              if (error.response.status == 422) {
                commit("SET_ERRORS", error.response.data.errors, { root: true });
              }
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

    deleteChangeQuota({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/change-quotas/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getChangeQuotas").then(() => {
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
