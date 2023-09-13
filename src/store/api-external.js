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
      token: "LITPX1VEQE",
      X_TGL1: "2023-09-01",
      X_TGL2: "2023-09-30",
      X_NOPOLISI: "",
      X_WERKS: "79B1",
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
      for (var i = 0; i < payload.length; i++) {
        state.dataDo.push(payload[i]);
      } 
    },
    CHANGE_DO_PARAMETER(state, payload) {
      state.paramDo.X_VKORG = payload
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
          commit('CHANGE_DO_PARAMETER', '7900')
          apiClient.post(`/api-external/do`, state.paramDo)
          .then((response) => {
              if(response.data instanceof Array) {
                commit('ASSIGN_DO', response.data)
              }
              commit('CHANGE_DO_PARAMETER', '7000')
              apiClient.post(`/api-external/do`, state.paramDo).then((response) => {
                if(response.data instanceof Array) {
                  commit('ASSIGN_DO', response.data)
                }
                commit('CHANGE_DO_PARAMETER', '5000')
                apiClient.post(`/api-external/do`, state.paramDo).then((response) => {
                  if(response.data instanceof Array) {
                    commit('ASSIGN_DO', response.data)
                  }
              })
                resolve(response.data)
            })
            resolve(state.dataDo)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
