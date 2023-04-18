import axios from 'axios'

const API_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  login(credentials) {
    return apiClient.post('/users/login', credentials)
  }
  // tambahkan fungsi lainnya di sini jika ada
}