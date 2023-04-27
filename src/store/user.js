import axios from 'axios';
import Vuex from 'vuex';

const state = {
  users: [],
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  fetchUsers({ commit }) {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const users = response.data.map(user => {
          return {
            name: user.fullname,
            username: user.username,
            email: user.email,
          };
        });
        commit('setUsers', users);
      })
      .catch(error => console.error(error));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};