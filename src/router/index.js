import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginview',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dasbor-organisasi/IndexView.vue')
  },
  {
    path: '/data-transaksi',
    name: 'data-transaksi',
    component: () => import('../views/data-transaksi/IndexView.vue')
  },
  {
    path: '/peran-dan-izin',
    name: 'peran-dan-izin',
    component: () => import('../views/peran-dan-izin/IndexView.vue')
  },
  {
    path: '/kendaraan',
    name: 'kendaraan',
    component: () => import('../views/kendaraan/IndexView.vue')
  },
  {
    path: '/klaim-pallet',
    name: 'klaim-pallet',
    component: () => import('../views/klaim-pallet/IndexView.vue')
  },
  {
    path: '/manajemen-pengguna',
    name: 'manajemen-pengguna',
    component: () => import('../views/manajemen-pengguna/IndexView.vue')
  },
  {
    path: '/tambah-pengguna',
    name: 'tambah-pengguna',
    component: () => import('../views/manajemen-pengguna/AddView.vue')
  },{
    path: '/edit-pengguna',
    name: 'edit-pengguna',
    component: () => import('../views/manajemen-pengguna/EditView.vue')
  },
  {
    path: '/manajemen-perusahaan',
    name: 'manajemen-perusahaan',
    component: () => import('../views/manajemen-perusahaan/IndexView.vue')
  },
  {
    path: '/mutasi-pallet',
    name: 'mutasi-pallet',
    component: () => import('../views/mutasi-pallet/IndexView.vue')
  },
  {
    path: '/organisasi',
    name: 'organisasi',
    component: () => import('../views/organisasi/IndexView.vue')
  },
  {
    path: '/tambah-organisasi',
    name: 'tambah-organisasi',
    component: () => import('../views/organisasi/AddView.vue')
  },{
    path: '/edit-organisasi',
    name: 'edit-organisasi',
    component: () => import('../views/organisasi/EditView.vue')
  },
  {
    path: '/pallet-baru',
    name: 'pallet-baru',
    component: () => import('../views/pallet-baru/IndexView.vue')
  },
  {
    path: '/pallet-diperbaiki',
    name: 'pallet-diperbaiki',
    component: () => import('../views/pallet-diperbaiki/IndexView.vue')
  },
  {
    path: '/pallet-rusak',
    name: 'pallet-rusak',
    component: () => import('../views/pallet-rusak/IndexView.vue')
  },
  {
    path: '/pengendara',
    name: 'pengendara',
    component: () => import('../views/pengendara/IndexView.vue')
  },
  {
    path: '/penyesuaian-ekspeditur',
    name: 'penyesuaian-ekspeditur',
    component: () => import('../views/penyesuaian-ekspeditur/IndexView.vue')
  },
  {
    path: '/penyewaan-pallet',
    name: 'penyewaan-pallet',
    component: () => import('../views/penyewaan-pallet/IndexView.vue')
  },
  {
    path: '/pergerakan-pallet',
    name: 'pergerakan-pallet',
    component: () => import('../views/pergerakan-pallet/IndexView.vue')
  },
  {
    path: '/perubahan-kuota-pallet',
    name: 'perubahan-kuota-pallet',
    component: () => import('../views/perubahan-kuota-pallet/IndexView.vue')
  },
  {
    path: '/semua-transaksi',
    name: 'semua-transaksi',
    component: () => import('../views/semua-transaksi/IndexView.vue')
  },
  {
    path: '/sjp-status',
    name: 'sjp-status',
    component: () => import('../views/sjp-status/IndexView.vue')
  },
  {
    path: '/surat-jalan-pallet',
    name: 'surat-jalan-pallet',
    component: () => import('../views/surat-jalan-pallet/IndexView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
