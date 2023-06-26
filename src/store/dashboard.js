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
    doLoading ({ commit }) {
        commit('isLoading')
    },
    stopLoading ({ commit }) {
        commit('doneLoading')
    },
    getTotalPallets({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/total-pallet`)
            .then((response) => {
                commit('ASSIGN_TOTAL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getConditionAlls({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition?type=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_ALL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getConditionTransporters({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition?type=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_TRANSPORTERS', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getConditionCompany({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_COMPANY', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getConditionWarehouse({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_WAREHOUSE', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getConditionTransporter({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/pallet-condition-company?id=${payload}`)
            .then((response) => {
                commit('ASSIGN_CONDITION_TRANSPORTER', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            }).finally(() => {
            })
        })
    },
    getDetailPools({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Pool Pallet`)
            .then((response) => {
                console.log(response)
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if(roleSet.role_name == "Supervisor" || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                    commit('ASSIGN_DETAIL_POOL', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(response.data)
                } else {
                    const result = {
                        data: response.data.data.filter(val => val.id == roleSet.company_id)
                    };  
                  commit('ASSIGN_DETAIL_POOL', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(result)
                } 
            }).finally(() => {
            })
        })
    },
    getDetailWarehouse({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Warehouse`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if(roleSet.role_name == "Supervisor" || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                    commit('ASSIGN_DETAIL_WAREHOUSE', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(response.data)
                } else {
                    const result = {
                        data: response.data.data.filter(val => val.id == roleSet.company_id)
                    };  
                  commit('ASSIGN_DETAIL_WAREHOUSE', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(result)
                } 
            }).finally(() => {
            })
        })
    },
    getDetailTransporter({ commit }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/dashboards/detail-pallet?type=Transporter`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if(roleSet.role_name == "Supervisor" || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                    commit('ASSIGN_DETAIL_TRANSPORTER', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(response.data)
                } else {
                    const result = {
                        data: response.data.data.filter(val => val.id == roleSet.company_id)
                    };  
                  commit('ASSIGN_DETAIL_TRANSPORTER', result) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(result)
                } 
            }).finally(() => {
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
