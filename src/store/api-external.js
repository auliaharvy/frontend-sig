import apiClient from '../api.js'
import axios from 'axios'

const state = () => ({
    loading: false,
    dataTruck: [], //STATE UNTUK MENAMPUNG DATA SJPS
    dataDo: [],
    paramTruck: {
      token: "4565b5695f91cf522515f9a6b1ddd631",
      org: "7900",
      plant: "79B1"
    },
    paramDo: {
      token: "7OJ4T9GOWQ",
      X_TGL1: "2022-12-08",
      X_TGL2: "2022-12-20",
      X_WERKS: "79B1",
      X_VKORG: "7900",
      X_NOPOLISI: "A9003X",
      X_LINE_SO: "000000",
      X_SO: "X"
    },

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
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
    ASSIGN_TRUCK(state, payload) {
        state.dataTruck = payload;
    },
    ASSIGN_DO(state, payload) {
        state.dataDo = payload;
    },
}

const actions = {
    getDataTruck({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.post(`/api-external/truck`, state.paramTruck)
            .then((response) => {
                commit('ASSIGN_TRUCK', response.data.detailData) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getDataDo({ commit, state }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.post(`/api-external/do`, state.paramDo)
          .then((response) => {
              console.log(response)
              commit('ASSIGN_DO', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
              resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },

    getDataDoDirect({ commit, state }, payload) {
      commit('isLoading')
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          axios({
            method: 'POST',
            url: 'http://10.15.5.150/dev/sd/sdonline/service/get_realisasi.php',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
            },
            data: {
              token: "7OJ4T9GOWQ",
              X_TGL1: "2022-12-08",
              X_TGL2: "2022-12-20",
              X_WERKS: "79B1",
              X_VKORG: "7900",
              X_NOPOLISI: "A9003X",
              X_LINE_SO: "000000",
              X_SO: "X"
            },
          }).then((response) => {
            console.log(response)
            // commit('ASSIGN_DO', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
            // resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          });
          
      })
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
