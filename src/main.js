import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import helper from './helper'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VuetifyMoney from "vuetify-money";
import Permissions from './mixins/permission.js'
import VueMoment from 'vue-moment'
import { mapGetters, mapState } from 'vuex'
import excel from 'vue-excel-export'

Vue.use(VueMoment);
Vue.mixin(Permissions)
Vue.use(excel)
Vue.use(VuetifyMoney);
Vue.use(VueSweetalert2);
Vue.component('loading-overlay', Loading);

Vue.config.productionTip = false

new Vue({
  router,
  helper,
  store,
  vuetify,
  i18n,
  axios,
  components: {
      App
  },
  render: h => h(App),
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['token']),
    ...mapState(['userData']),
    ...mapState(['roleSet']),
  },
}).$mount('#app')
