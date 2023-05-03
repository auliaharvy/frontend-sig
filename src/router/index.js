import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'loginview',
    component: LoginView
  },
  {
    path: '/',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/dasbor-organisasi/IndexView.vue')
  },
  {
    path: '/data-transaksi',
    name: 'data-transaksi',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/data-transaksi/IndexView.vue')
  },
  {
    path: '/peran-dan-izin',
    name: 'peran-dan-izin',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/peran-dan-izin/IndexView.vue')
  },
  {
    path: '/kendaraan',
    name: 'kendaraan',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/kendaraan/IndexView.vue')
  },
  {
    path: '/klaim-pallet',
    name: 'klaim-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/klaim-pallet/IndexView.vue')
  },

  // Users
  {
    path: '/user',
    component: () => import('../views/manajemen-pengguna/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'user',
            component: () => import('../views/manajemen-pengguna/IndexView.vue'),
            meta: { title: 'Manage User' }
        },
        {
            path: 'add',
            name: 'user.add',
            component: () => import('../views/manajemen-pengguna/AddView.vue'),
            meta: { title: 'Add New User' }
        },
        {
            path: 'edit/:id',
            name: 'user.edit',
            component: () => import('../views/manajemen-pengguna/EditView.vue'),
            meta: { title: 'Edit User' }
        },
    ]
  },
  // {
  //   path: '/manajemen-pengguna',
  //   name: 'manajemen-pengguna',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/manajemen-pengguna/IndexView.vue')
  // },
  {
    path: '/tambah-pengguna',
    name: 'tambah-pengguna',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/manajemen-pengguna/AddView.vue')
  },{
    path: '/edit-pengguna',
    name: 'edit-pengguna',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/manajemen-pengguna/EditView.vue')
  },

  // Perusahaan / Company
  {
    path: '/company',
    component: () => import('../views/manajemen-perusahaan/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'company',
            component: () => import('../views/manajemen-perusahaan/IndexView.vue'),
            meta: { title: 'Manage Company' }
        },
        {
            path: 'add',
            name: 'company.add',
            component: () => import('../views/manajemen-perusahaan/AddView.vue'),
            meta: { title: 'Add New Company' }
        },
        {
          path: 'edit/:id',
          name: 'company.edit',
          component: () => import('../views/manajemen-perusahaan/EditView.vue'),
          meta: { title: 'Edit Company' }
      },
    ]
  },
  // {
  //   path: '/manajemen-perusahaan',
  //   name: 'manajemen-perusahaan',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/manajemen-perusahaan/IndexView.vue')
  // },
  // {
  //   path: '/tambah-perusahaan',
  //   name: 'tambah-perusahaan',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/manajemen-perusahaan/AddView.vue')
  // },


  {
    path: '/mutasi-pallet',
    name: 'mutasi-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/mutasi-pallet/IndexView.vue')
  },
  
  {
    path: '/pallet-baru',
    name: 'pallet-baru',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pallet-baru/IndexView.vue')
  },
  {
    path: '/pallet-diperbaiki',
    name: 'pallet-diperbaiki',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pallet-diperbaiki/IndexView.vue')
  },
  {
    path: '/pallet-rusak',
    name: 'pallet-rusak',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pallet-rusak/IndexView.vue')
  },

  // Driver
  {
    path: '/drivers',
    component: () => import('../views/pengendara/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'drivers',
            component: () => import('../views/pengendara/IndexView.vue'),
            meta: { title: 'Manage Pengendara' }
        },
        {
            path: 'add',
            name: 'drivers.add',
            component: () => import('../views/pengendara/AddView.vue'),
            meta: { title: 'Add New Pengendara' }
        },
        {
          path: 'edit/:id',
          name: 'drivers.edit',
          component: () => import('../views/pengendara/EditView.vue'),
          meta: { title: 'Edit Pengendara' }
        },
    ]
  },
  // {
  //   path: '/pengendara',
  //   name: 'pengendara',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/pengendara/IndexView.vue')
  // },
  {
    path: '/penyesuaian-ekspeditur',
    name: 'penyesuaian-ekspeditur',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/penyesuaian-ekspeditur/IndexView.vue')
  },
  {
    path: '/penyewaan-pallet',
    name: 'penyewaan-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/penyewaan-pallet/IndexView.vue')
  },
  {
    path: '/pergerakan-pallet',
    name: 'pergerakan-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pergerakan-pallet/IndexView.vue')
  },
  {
    path: '/perubahan-kuota-pallet',
    name: 'perubahan-kuota-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/perubahan-kuota-pallet/IndexView.vue')
  },
  {
    path: '/semua-transaksi',
    name: 'semua-transaksi',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/semua-transaksi/IndexView.vue')
  },
  {
    path: '/sjp-status',
    name: 'sjp-status',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/sjp-status/IndexView.vue')
  },
  {
    path: '/sjp',
    component: () => import('../views/surat-jalan-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'sjp',
            component: () => import('../views/surat-jalan-pallet/IndexView.vue'),
            meta: { title: 'Manage SJP' }
        },
        {
            path: 'add',
            name: 'sjp.add',
            component: () => import('../views/surat-jalan-pallet/AddView.vue'),
            meta: { title: 'Add New SJP' }
        },
    ]
  },
  {
    path: '/surat-jalan-pallet',
    name: 'surat-jalan-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/surat-jalan-pallet/IndexView.vue')
  },

  // Organization
  {
    path: '/organization',
    component: () => import('../views/organisasi/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'organization',
            component: () => import('../views/organisasi/IndexView.vue'),
            meta: { title: 'Manage Organization' }
        },
        {
            path: 'add',
            name: 'organization.add',
            component: () => import('../views/organisasi/AddView.vue'),
            meta: { title: 'Add New Organization' }
        },
        {
          path: 'edit/:id',
          name: 'organization.edit',
          component: () => import('../views/organisasi/EditView.vue'),
          meta: { title: 'Edit Organization' }
        },
    ]
  },

  // Roles
  {
    path: '/roles',
    component: () => import('../views/roles/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'roles',
            component: () => import('../views/roles/IndexView.vue'),
            meta: { title: 'Manage Organization' }
        },
        {
            path: 'add',
            name: 'roles.add',
            component: () => import('../views/roles/AddView.vue'),
            meta: { title: 'Add New Organization' }
        },
        {
          path: 'edit/:id',
          name: 'roles.edit',
          component: () => import('../views/roles/EditView.vue'),
          meta: { title: 'Edit Organization' }
      },
    ]
  },

  // Permission
  {
    path: '/permissions',
    component: () => import('../views/permissions/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'permissions',
            component: () => import('../views/permissions/IndexView.vue'),
            meta: { title: 'Manage Organization' }
        },
        {
            path: 'add',
            name: 'permissions.add',
            component: () => import('../views/permissions/AddView.vue'),
            meta: { title: 'Add New Organization' }
        },
        {
          path: 'edit/:id',
          name: 'roles.edit',
          component: () => import('../views/permissions/EditView.vue'),
          meta: { title: 'Edit Organization' }
      },
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'loginview' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
