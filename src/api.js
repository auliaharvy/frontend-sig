import Vue from 'vue';
import Axios from 'axios';

// Atur konfigurasi CORS untuk Axios
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
Axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

// Set Axios sebagai properti global Vue
Vue.prototype.$http = Axios;

// Instansiasi Vue dan montirkan aplikasi Vue.js
new Vue({
  el: '#app',
  // ...
});