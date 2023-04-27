import axios from 'axios'
import store from './store/index.js'


const API_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  function (config) {
    const token = store.state.auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
},
function (error) {
    return Promise.reject (error);
}
);

export default apiClient