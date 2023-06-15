import apiClient from '../api.js'

const state = () => ({
    loading: false,
    allTransactions: [], //STATE UNTUK MENAMPUNG DATA SJPS
    dateRange: [], //STATE UNTUK MENAMPUNG DATA SJPS

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
        state.allTransactions = payload;
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
}

const actions = {
    getAllTransactions({ commit, state }, payload) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/all-transactions?from=${payload[0]}&to=${payload[1]}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
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
