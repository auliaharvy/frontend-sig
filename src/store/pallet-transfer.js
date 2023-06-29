import apiClient from '../api.js'

const state = () => ({
    loading: false,
    palletTransfers: [], //STATE UNTUK MENAMPUNG DATA SJPS
    exportData: [],

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    palletTransfer: {
      id: '',
      id_company_departure: 4,
      id_company_destination: '',
      id_company_transporter: '',
      id_truck: '',
      id_driver: '',
      id_user_checker_sender: '',
      second_driver: '',
      trx_code: '',
      status: '',
      departure_company: '',
      destination_company: '',
      transporter_company: '',
      license_plate: '',
      good_pallet: 0,
      tbr_pallet: 0,
      ber_pallet: 0,
      missing_pallet: 0,
      palletQuantity: [
        {
          kondisi_pallet: "TBR Pallet",
          "quantity": 0
        },
        {
          kondisi_pallet: "BER Pallet",
            "quantity": 0
        },
        {
          kondisi_pallet: "Missing Pallet",
            "quantity": 0
        },
        {
          kondisi_pallet: "Good Pallet",
            "quantity": 0
        }
      ],
      driver_name: '',
      sender_name: '',
      created_at: '',
      updated_at: '',
      created_by: 3,
      updated_by: 3,
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
        state.palletTransfers = payload;
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
        state.palletTransfer = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.palletTransfer = {
          id: '',
          id_company_departure: '',
          id_company_destination: '',
          id_company_transporter: '',
          id_truck: '',
          id_driver: '',
          id_user_checker_sender: '',
          second_driver: '',
          trx_code: '',
          status: '',
          departure_company: '',
          destination_company: '',
          transporter_company: '',
          license_plate: '',
          good_pallet: 0,
          tbr_pallet: 0,
          ber_pallet: 0,
          missing_pallet: 0,
          palletQuantity: [
            {
              kondisi_pallet: "TBR Pallet",
              "quantity": 0
            },
            {
              kondisi_pallet: "BER Pallet",
                "quantity": 0
            },
            {
              kondisi_pallet: "Missing Pallet",
                "quantity": 0
            },
            {
              kondisi_pallet: "Good Pallet",
                "quantity": 0
            }
          ],
          driver_name: '',
          sender_name: '',
          created_at: '',
          updated_at: '',
          created_by: '',
          updated_by: '',
        }
    }
}

const actions = {
    getPalletTransfers({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/pallet-transfers?page=${state.page}&q=${search}`)
            .then((response) => {
              console.log(response);
              const roleSet = JSON.parse(localStorage.getItem("role"));
              if(roleSet.role_name == 'Supervisor' || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data);
              } else {
                const result = {
                  data: response.data.data.filter(val => val.id_company_departure == roleSet.company_id || val.id_company_destination == roleSet.company_id || val.id_company_transporter == roleSet.company_id)
                };
                commit('ASSIGN_DATA', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data);
              }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getExportPalletTransfers({ commit }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/pallet-transfers/export?from=${payload[0]}&to=${payload[1]}`)
          .then((response) => {
              commit('ASSIGN_DATA_EXPORT', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },
    submitPalletTransfer({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/pallet-transfers`, state.palletTransfer)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getPalletTransfers').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                alert(error.response.data);
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

    getPalletTransferDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/pallet-transfers/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              const data = response.data.data[0].palletQuantity;
              const goodPallet = data.find(x => x.kondisi_pallet === 'Good Pallet').quantity;
              const tbrPallet = data.find(x => x.kondisi_pallet === 'TBR Pallet').quantity;
              response.data.data[0].good_pallet = goodPallet; 
              response.data.data[0].tbr_pallet = tbrPallet; 
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

      updatePalletTransfer({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/pallet-transfers/${state.palletTransfer.id}`, state.palletTransfer)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getPalletTransfers").then(() => {
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

    deletePalletTransfer({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/pallet-transfers/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getPalletTransfers").then(() => {
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
