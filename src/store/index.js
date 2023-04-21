import Vue from 'vue'
import Vuex from 'vuex'

import lang from './lang.js'
import auth from "./auth";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        lang,
        auth,
    },
  })
export default store