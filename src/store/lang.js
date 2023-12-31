import Vue from 'vue'
import Vuex from 'vuex'
import en from "@/locales/en.json"
import id from "@/locales/id.json"

Vue.use(Vuex)

const state = {
  language: localStorage.getItem('language') || 'id',
  locale: {},
  options: [ 
    { value: 'id', text: 'INDONESIA' },
    { value: 'en', text: 'ENGLISH' }
  ],
  selectedLanguageOption: localStorage.getItem('language') || 'id'
};

const mutations = {
  SET_LANGUAGE(state, language) {
    Vue.set(state, 'language', language);
    state.locale = require(`../locales/${language}.json`);
    localStorage.setItem('language', language);
  },
  SET_SELECTED_LANGUAGE_OPTION(state, languageOption) {
    Vue.set(state, 'selectedLanguageOption', languageOption);
  }
};

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setSelectedLanguageOption({ commit }, languageOption) {
    commit('SET_SELECTED_LANGUAGE_OPTION', languageOption);
  }
};

export default {
  namespaced : true,
  state,
  mutations,
  actions
};
