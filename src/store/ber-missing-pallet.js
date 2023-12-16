import apiClient from '../api.js'

const state = () => ({
    loading: false,
    berMissingPallets: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    berMissingPallet: {
      id: '',
      trx_number: '',
      id_company: '',
      id_user_reporter: '',
      qty_good_pallet: 0,
      qty_tbr_pallet: 0,
      qty_ber_missing_pallet: 0,
      transaction_type: '0',
      note: '',
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
        state.berMissingPallets = payload;
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
        state.berMissingPallet = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.berMissingPallet = {
          id: '',
          trx_number: '',
          id_company: '',
          id_user_reporter: '',
          qty_good_pallet: 0,
          qty_tbr_pallet: 0,
          qty_ber_missing_pallet: 0,
          transaction_type: '0',
          note: '',
          created_by: '',
          updated_by: '',
          created_at: '',
          updated_at: '',
        }
    }
}

const actions = {
    getberMissingPallets({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/ber-missing-pallets?page=${state.page}&q=${search}`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if( roleSet.role_name == 'Superuser') {
                  commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
                } else {
                  const result = {
                    data: response.data.data.filter(val => val.id_company == roleSet.company_id || val.id_user_reporter == roleSet.company_id),
                  };  
                  commit('ASSIGN_DATA', result.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
                } 
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportberMissingPallets({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/ber-missing-pallets/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitberMissingPallet({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/ber-missing-pallets`, state.berMissingPallet)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getberMissingPallets').then(() => {
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

    getberMissingPalletDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/change-quotas/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updateberMissingPallet({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/change-quotas/${state.berMissingPallet.id}`, state.berMissingPallet)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getberMissingPallets").then(() => {
                resolve(response.data.data);
              });
            })
            .catch((error) => {
              alert(error.response.data);
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

    deleteberMissingPallet({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/change-quotas/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getberMissingPallets").then(() => {
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
