import apiClient from '../api.js'

const state = () => ({
    loading: false,
    sjpStatuss: [], //STATE UNTUK MENAMPUNG DATA SJPS

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    sjpStatus: {
      id: '',
      id_sjp: '',
      id_departure_company: '',
      id_destination_company: '',
      id_transporter_company: '',
      id_user_sender: '',
      id_user_receiver: '',
      trx_number: '',
      sjp_number: '',
      status: '',
      is_sendback: '',
      sending_driver_approval: '',
      receiving_driver_approval: '',
      departure_company: '',
      destination_company: '',
      transporter_company: '',
      sender_name: '',
      receiver_name: '',
      note: '',
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
        state.sjpStatuss = payload;
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.sjpStatus = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.sjpStatus = {
          id: '',
          id_sjp: '',
          id_user_sender: '',
          id_user_receiver: '',
          trx_number: '',
          sjp_number: '',
          status: '',
          is_sendback: '',
          sending_driver_approval: '',
          receiving_driver_approval: '',
          departure_company: '',
          destination_company: '',
          transporter_company: '',
          sender_name: '',
          receiver_name: '',
          note: '',
          created_at: '',
          updated_at: '',
        }
    }
}

const actions = {
    getSjpStatuss({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/sjp-statuss?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    submitSjpStatus({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/sjp-statuss`, state.sjpStatus)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getSjpStatuss').then(() => {
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
