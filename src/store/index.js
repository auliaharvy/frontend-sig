import Vue from 'vue'
import Vuex from 'vuex'

import lang from './lang.js';
import auth from './auth.js';
import user from './user.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        lang,
        auth,
        user,
    },
  })
export default store