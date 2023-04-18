import Vue from 'vue'
import Vuex from 'vuex'

import lang from './lang.js'
import login from './login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        lang,
        login,
    },
  })
export default store