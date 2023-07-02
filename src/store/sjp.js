import apiClient from '../api.js'

const state = () => ({
    loading: false,
    sjps: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],
    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    sjp: {
        id_departure_company: '',
        id_destination_company: '',
        destination: '',
        id_transporter_company: '',
        transporter: '',
        is_multiple: '0',
        id_truck: '',
        truck_number: '',
        id_driver: '',
        driver: '',
        no_do: "",
        tonnage: "",
        packaging: "",
        eta: '',
        departure_time: '',
        product_quantity: '',
        pallet_quantity: '',
        created_by: '',
        updated_by: '',
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
        state.sjps = payload
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
        state.sjp = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.sjp = {
            id_departure_company: '',
            id_destination_company: '',
            destination: '',
            id_transporter_company: '',
            transporter: '',
            is_multiple: '0',
            id_truck: '',
            truck_number: '',
            id_driver: '',
            driver: '',
            no_do: "",
            tonnage: "",
            packaging: "",
            eta: '',
            departure_time: '',
            product_quantity: '',
            pallet_quantity: '',
            created_by: '',
            updated_by: '',
        }
    }
}

const actions = {
    getSjps({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/sjps?page=${state.page}&q=${search}`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if(roleSet.role_name == "Supervisor" || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                  commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
                } else {
                  const result = {
                    data: response.data.data.filter(val => val.idDeparture == roleSet.company_id || val.idDestination == roleSet.company_id || val.idTransporter == roleSet.company_id)
                  };  
                  commit('ASSIGN_DATA', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(result)
                } 
            }).catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
              if (error.response.status == 422) {
                alert(error.response.data.errors[0]);
                commit('SET_ERRORS', error.response.data.errors, { root: true })
              } else {
                alert(error.response.data.message);
              }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportDataSjps({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/sjps/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).catch((error) => {
            //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
            if (error.response.status == 422) {
              alert(error.response.data.errors[0]);
              commit('SET_ERRORS', error.response.data.errors, { root: true })
            } else {
              alert(error.response.data.message);
            }
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitSjp({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/sjps`, state.sjp)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getSjps').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                  alert(error.response.data.errors[0]);
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
              } else {
                alert(error.response.data.message);
              }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getSjpDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/sjps/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
              if (error.response.status == 422) {
                alert(error.response.data.errors[0]);
                commit('SET_ERRORS', error.response.data.errors, { root: true })
              } else {
                alert(error.response.data.message);
              }
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updateSjp({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/sjps/${state.sjp.id}`, state.sjp)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getSjps").then(() => {
                resolve(response.data.data);
              });
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
              alert(error.response.data.message);
              if (error.response.status == 422) {
                commit("SET_ERRORS", error.response.data.errors, { root: true });
              } else {
                alert(error.response.data.message);
              }
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

    deleteSjp({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/sjps/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getSjps").then(() => {
                resolve(response.data.data);
              });
            })
            .catch((error) => {
              //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
              alert(error.response.data.message);
              if (error.response.status == 422) {
                commit("SET_ERRORS", error.response.data.errors, { root: true });
              } else {
                alert(error.response.data.message);
              }
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
