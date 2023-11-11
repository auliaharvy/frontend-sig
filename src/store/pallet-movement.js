import apiClient from '../api.js'

const state = () => ({
    loading: false,
    palletMovements: [], //STATE UNTUK MENAMPUNG DATA SJPS

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
        state.palletMovements = payload;
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
}

const actions = {
    getPalletMovements({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/pallet-movements?page=${state.page}&q=${search}`)
            .then((response) => {
                const roleSet = JSON.parse(localStorage.getItem("role"));
                if( roleSet.role_name == 'Superuser') {
                    commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(response.data)
                  } else {
                    const result = {
                      data: response.data.data.filter(val => val.departure == roleSet.company_name || val.destination == roleSet.company_name || val.transporter == roleSet.company_name),
                    };  
                    commit('ASSIGN_DATA', result.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                    resolve(response.data)
                  } 
                // commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                // resolve(response.data)
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
