import apiClient from '../api.js'

const state = () => ({
    loading: false,
    companiesDeparture: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
    companiesTransporter: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
    companiesDestination: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
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
    ASSIGN_DATA_DEPARTURE(state, payload) {
        state.companiesDeparture = payload
    },
    ASSIGN_DATA_DESTINATION(state, payload) {
        state.companiesDestination = payload
    },
    ASSIGN_DATA_TRANSPORTER(state, payload) {
        state.companiesTransporter = payload
    },
}

const actions = {
    getCompaniesDeparture({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/companies?page=${state.page}&q=${search}`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                  const result = {
                    data: response.data.data.filter(val => val.id == roleSet.company_id),
                  };  
                  commit('ASSIGN_DATA_DEPARTURE', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                  resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getCompaniesDestination({ commit, state }, payload) {
      commit('isLoading')
      let search = typeof payload != 'undefined' ? payload:''
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/companies?page=${state.page}&q=${search}`)
          .then((response) => {
              const roleSet = JSON.parse(localStorage.getItem("role"));
                const result = {
                  data: response.data.data.filter(val => val.id != roleSet.company_id && val.name_company_type != 'Transporter'),
                };  
                commit('ASSIGN_DATA_DESTINATION', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
          }).finally(() => {
              commit('doneLoading')
          })
      })
    },

    getCompaniesTransporter({ commit, state }, payload) {
      commit('isLoading')
      let search = typeof payload != 'undefined' ? payload:''
      return new Promise((resolve, reject) => {
          //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
          apiClient.get(`/companies?page=${state.page}&q=${search}`)
          .then((response) => {
              const roleSet = JSON.parse(localStorage.getItem("role"));
                const result = {
                  data: response.data.data.filter(val => val.name_company_type == 'Transporter'),
                };  
                commit('ASSIGN_DATA_TRANSPORTER', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
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
