import apiClient from '../api.js'

const state = () => ({
    loading: false,
    companies: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS

    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    company: {
        id_organization: '',
        id_company_type: '',
        name: '',
        code: '',
        address: '',
        city: "",
        phone: "",
        email: "",
        palletQuantity: [],
        tag: "POOL PALLET",
        createdBy: 3,
        updatedBy: 3,
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
        state.companies = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.company = payload;
        state.company.createdBy = 3;
        state.company.updatedBy = 3;
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.company = {
            id_organization: '',
            id_company_type: '',
            name: '',
            code: '',
            address: '',
            city: "",
            phone: "",
            email: "",
            tag: "POOL PALLET",
            palletQuantity: [],
            createdBy: 3,
            updatedBy: 3,
        }
    }
}

const actions = {
    getCompanies({ commit, state }, payload) {
        commit('isLoading')
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA COMPANY  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            apiClient.get(`/companies?page=${state.page}&q=${search}`)
            .then((response) => {
              console.log(response.data)
              const roleSet = JSON.parse(localStorage.getItem("role"));
              if(roleSet.role_name == 'Supervisor' || roleSet.role_name == 'Manager' || roleSet.role_name == 'Superuser') {
                commit('ASSIGN_DATA', response.data.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
              } else {
                const result = {
                  data: response.data.data.filter(val => val.id == roleSet.company_id),
                };  
                commit('ASSIGN_DATA', result.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
              } 
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    getCompanyDetail({ commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .get(`/companies/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              commit("ASSIGN_FORM", response.data.data[0]); //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
              resolve(response.data.data[0]);
            })
            .finally(() => {
              commit("doneLoading");
            });
        });
      },

    submitCompany({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            apiClient.post(`/companies`, state.company)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getCompanies').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                  alert(error.response.data.errors[0]);
                  commit('SET_ERRORS', error.response.data.errors, { root: true })
                } else if (error.response.status == 400) {
                  if(error.response.data.error) {
                    alert(error.response.data.error);
                  } else if (error.response.data.message) {
                    alert(error.response.data.message);
                  } else {
                    alert(error.response.data);
                  }
                }
                else {
                  alert(error.response.data.message);
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },

    updateCompany({ dispatch, commit, state }) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
          apiClient
            .patch(`/companies/${state.company.id}`, state.company)
            .then((response) => {
              //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
              dispatch("getCompanies").then(() => {
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

      deleteCompany({ dispatch, commit }, payload) {
        commit("isLoading");
        return new Promise((resolve, reject) => {
          apiClient
            .delete(`/companies/${payload}`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
              dispatch("getCompanies").then(() => {
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
