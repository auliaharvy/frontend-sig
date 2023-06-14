import apiClient from '../api.js'

const state = () => ({
    loading: false,
    totalPallets: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    palletConditionAlls: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    palletConditionTransporters: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    palletConditionCompany: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    palletConditionWarehouse: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    palletConditionTransporter: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    detailPools: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    detailWarehouse: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    detailTransporter: [], //STATE UNTUK MENAMPUNG DATA TOTAL PALLET
    idConditionCompany: 4,

})

const mutations = {
    isLoading (state) {
        state.loading = true
    },
    doneLoading (state) {
        state.loading = false
    },
    //MUTATIONS UNTUK ASSIGN DATA CUSTOMER KE DALAM STATE CUSTOMER
    ASSIGN_TOTAL(state, payload) {
        state.totalPallets = payload;
    },
    ASSIGN_CONDITION_ALL(state, payload) {
        state.palletConditionAlls = payload;
    },
    ASSIGN_CONDITION_COMPANY(state, payload) {
        state.palletConditionCompany = payload;
    },
    ASSIGN_CONDITION_TRANSPORTERS(state, payload) {
        state.palletConditionTransporters = payload;
    },
    ASSIGN_CONDITION_WAREHOUSE(state, payload) {
        state.palletConditionWarehouse = payload;
    },
    ASSIGN_CONDITION_TRANSPORTER(state, payload) {
        state.palletConditionTransporter = payload;
    },
    ASSIGN_DETAIL_POOL(state, payload) {
        state.detailPools = payload;
    },
    ASSIGN_DETAIL_WAREHOUSE(state, payload) {
        state.detailWarehouse = payload;
    },
    ASSIGN_DETAIL_TRANSPORTER(state, payload) {
        state.detailTransporter = payload;
    },
}

const actions = {
    getTotalPallets({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/total-pallet`)
            .then((response) => {
                console.log(response);
                commit('ASSIGN_TOTAL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getConditionAlls({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition?type=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_ALL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getConditionTransporters({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition?type=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_TRANSPORTERS', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getConditionCompany({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_COMPANY', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getConditionWarehouse({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_WAREHOUSE', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getConditionTransporter({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_TRANSPORTER', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getDetailPools({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Pool Pallet`)
            .then((response) => {
                commit('ASSIGN_DETAIL_POOL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getDetailWarehouse({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Warehouse`)
            .then((response) => {
                commit('ASSIGN_DETAIL_WAREHOUSE', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    getDetailTransporter({ commit }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Transporter`)
            .then((response) => {
                commit('ASSIGN_DETAIL_TRANSPORTER', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
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
