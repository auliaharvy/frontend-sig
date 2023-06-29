import apiClient from '../api.js'

const state = () => ({
    loading: false,
    transporterAdjusments: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    transporterAdjusment: {
      id: '',
      id_company: '',
      id_company_transporter: '',
      id_user_reporter: '',
      is_from_pool: '',
      good_pallet: '',
      tbr_pallet: '',
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
        state.transporterAdjusments = payload;
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
        state.transporterAdjusment = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.transporterAdjusment = {
          id: '',
          id_company: '',
          id_company_transporter: '',
          id_user_reporter: '',
          is_from_pool: '',
          good_pallet: '',
          tbr_pallet: '',
          note: '',
          created_by: '',
          updated_by: '',
          created_at: '',
          updated_at: '',
        }
    }
}

const actions = {
    getTransporterAdjusments({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/transporter-adjusments?page=${state.page}&q=${search}`)
            .then((response) => {
              console.log(response);
              const roleSet = JSON.parse(localStorage.getItem("role"));
              if(roleSet.role_name == 'Supervisor' || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
              } else {
                const result = {
                  data: response.data.data.filter(val => val.id_company == roleSet.company_id || val.id_company_transporter == roleSet.company_id ),
                };  
                commit('ASSIGN_DATA', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
              }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportTransporterAdjusments({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/transporter-adjusments/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitTransporterAdjusment({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/transporter-adjusments`, state.transporterAdjusment)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getTransporterAdjusments').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                    alert(error.response.data);
                } else {
                    commit('SET_ERRORS', error.response.data.error, { root: true })
                    alert(error.response.data);
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getSewaPalletDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/sewa-pallets/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updateSewaPallet({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/sewa-pallets/${state.sewaPallet.id}`, state.sewaPallet)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getSewaPallets").then(() => {
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

    deleteSewaPallet({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/sewa-pallets/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getSewaPallets").then(() => {
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
