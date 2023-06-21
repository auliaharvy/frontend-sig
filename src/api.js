import axios from 'axios'
import store from './store/index.js'


const API_URL = 'http://localhot:3000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const role = JSON.parse(localStorage.getItem("role"));
    const user = JSON.parse(localStorage.getItem("userData"));
    if (token) config.headers.authorization = token;
    if (role) config.headers.companyId = role.company_id;
    if (role) config.headers.companyName = role.company_name;
    if (role) config.headers.role = role.role_name;
    if (user) config.headers.userId = user.data.id;
    if (user) config.headers.userName = user.data.username;
    return config;
},
function (error) {
    return Promise.reject (error);
}
);

export default apiClient