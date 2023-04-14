import Vue from 'vue'
import Vuex from 'vuex'
import en from "@/locales/en.json"
import id from "@/locales/id.json"

Vue.use(Vuex)

const state = {
  language: localStorage.getItem('language') || 'id',
  locale: {},
  languageOptions: [ // Menyimpan pilihan bahasa dalam array
    { value: 'id', label: 'Indonesia' },
    { value: 'en', label: 'English' }
  ],
  selectedLanguageOption: localStorage.getItem('language') || 'id' // Menyimpan selected item pilihan bahasa
};

const mutations = {
  SET_LANGUAGE(state, language) {
    Vue.set(state, 'language', language); // Menggunakan Vue.set atau $set untuk mengamati perubahan pada state
    state.locale = require(`../locales/${language}.json`);
    localStorage.setItem('language', language);
  },
  SET_SELECTED_LANGUAGE_OPTION(state, languageOption) {
    Vue.set(state, 'selectedLanguageOption', languageOption); // Menggunakan Vue.set atau $set untuk mengamati perubahan pada state
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

export default new Vuex.Store({
  state,
  mutations,
  actions
});
