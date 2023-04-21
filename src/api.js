import axios from 'axios'

const API_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` // tambahkan ini untuk mengambil token dari local storage dan menambahkannya ke header pada setiap request
  }
})

export default {
  login(credentials) {
    return apiClient.post('/users/login', credentials)
  },
  // tambahkan fungsi lainnya di sini jika ada
}