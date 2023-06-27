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
    component: () => import('../views/dasbor/IndexView.vue')
  },
  {
    path: '/data-transaksi',
    component: () => import('../views/semua-transaksi/index.vue'),
    name: 'data-transaksi',
    meta: {
      requiresAuth: true
    },
    children: [
      {
          path: '',
          name: 'all-transaction.data',
          component: () => import('../views/semua-transaksi/IndexView.vue'),
          meta: { title: 'All transaction' }
      },
    ]
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


  // {
  //   path: '/mutasi-pallet',
  //   name: 'mutasi-pallet',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/mutasi-pallet/IndexView.vue')
  // },
  
  {
    path: '/pallet-baru',
    name: 'pallet-baru',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pallet-baru/IndexView.vue')
  },

  // Repaired Pallet
  {
    path: '/repaired-pallet',
    component: () => import('../views/pallet-diperbaiki/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'repaired-pallet',
            component: () => import('../views/pallet-diperbaiki/IndexView.vue'),
            meta: { title: 'Manage Repaired Pallet' }
        },
        {
            path: 'add',
            name: 'repaired-pallet.add',
            component: () => import('../views/pallet-diperbaiki/AddView.vue'),
            meta: { title: 'Add Repaired Pallet' }
        },
        // {
        //   path: 'edit/:id',
        //   name: 'company.edit',
        //   component: () => import('../views/manajemen-perusahaan/EditView.vue'),
        //   meta: { title: 'Edit Company' }
        // },
    ]
  },
  // {
  //   path: '/pallet-diperbaiki',
  //   name: 'pallet-diperbaiki',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/pallet-diperbaiki/IndexView.vue')
  // },

  // Damaged Pallet
  {
    path: '/damaged-pallet',
    component: () => import('../views/pallet-rusak/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'damaged-pallet',
            component: () => import('../views/pallet-rusak/IndexView.vue'),
            meta: { title: 'Manage Damaged Pallet' }
        },
        {
            path: 'add',
            name: 'damaged-pallet.add',
            component: () => import('../views/pallet-rusak/AddView.vue'),
            meta: { title: 'Add Damaged Pallet' }
        },
        // {
        //   path: 'edit/:id',
        //   name: 'company.edit',
        //   component: () => import('../views/manajemen-perusahaan/EditView.vue'),
        //   meta: { title: 'Edit Company' }
        // },
    ]
  },
  // {
  //   path: '/pallet-rusak',
  //   name: 'pallet-rusak',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/pallet-rusak/IndexView.vue')
  // },

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

  // Trucks
  {
    path: '/trucks',
    component: () => import('../views/kendaraan/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'trucks',
            component: () => import('../views/kendaraan/IndexView.vue'),
            meta: { title: 'Manage Truck' }
        },
        {
            path: 'add',
            name: 'trucks.add',
            component: () => import('../views/kendaraan/AddView.vue'),
            meta: { title: 'Add New Truck' }
        },
        {
          path: 'edit/:id',
          name: 'trucks.edit',
          component: () => import('../views/kendaraan/EditView.vue'),
          meta: { title: 'Edit Truck' }
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
  // {
  //   path: '/penyewaan-pallet',
  //   name: 'penyewaan-pallet',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/penyewaan-pallet/IndexView.vue')
  // },
  {
    path: '/pergerakan-pallet',
    name: 'pergerakan-pallet',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/pergerakan-pallet/IndexView.vue')
  },
  // {
  //   path: '/perubahan-kuota-pallet',
  //   name: 'perubahan-kuota-pallet',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/perubahan-kuota-pallet/IndexView.vue')
  // },
  // {
  //   path: '/semua-transaksi',
  //   name: 'semua-transaksi',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   children: [
  //     {
  //         path: '',
  //         name: 'sjp',
  //         component: () => import('../views/semua-transaksi/IndexView.vue'),
  //         meta: { title: 'Manage SJP' }
  //     },
  //   ]
  // },
  // {
  //   path: '/sjp-status',
  //   name: 'sjp-status',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('../views/sjp-status/IndexView.vue')
  // },

  // SJP
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
        {
          path: 'change-destination/:id',
          name: 'sjp.change-destination',
          component: () => import('../views/surat-jalan-pallet/EditDestinationView.vue'),
          meta: { title: 'Change Destination SJP' }
        },
        {
          path: 'change-truck/:id',
          name: 'sjp.change-truck',
          component: () => import('../views/surat-jalan-pallet/EditTruckView.vue'),
          meta: { title: 'Change Truck SJP' }
        },
    ]
  },

  // SJP Status
  {
    path: '/sjp-status',
    component: () => import('../views/sjp-status/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'sjp-status',
            component: () => import('../views/sjp-status/IndexView.vue'),
            meta: { title: 'Manage SJP Status' }
        },
        {
            path: 'add/:id',
            name: 'sjp-status.add',
            component: () => import('../views/sjp-status/AddView.vue'),
            meta: { title: 'Add New SJP Status' }
        },
        {
          path: 'receive/:id',
          name: 'sjp-status.receive',
          component: () => import('../views/sjp-status/ReceiveView.vue'),
          meta: { title: 'Receive SJP Status' }
        },
        {
          path: 'sendback/:id',
          name: 'sjp-status.sendback',
          component: () => import('../views/sjp-status/SendbackView.vue'),
          meta: { title: 'Sendback SJP Status' }
        },
        {
          path: 'view/:id',
          name: 'sjp-status.view',
          component: () => import('../views/sjp-status/PrintView.vue'),
          meta: { title: 'Print SJP Status' }
        },
    ]
  },

  // Change Quota
  {
    path: '/change-quota',
    component: () => import('../views/perubahan-kuota-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'change-quota',
            component: () => import('../views/perubahan-kuota-pallet/IndexView.vue'),
            meta: { title: 'Manage Change Quota' }
        },
        {
            path: 'add',
            name: 'change-quota.add',
            component: () => import('../views/perubahan-kuota-pallet/AddView.vue'),
            meta: { title: 'Add New Change Quota' }
        },
        {
          path: 'approval/:id',
          name: 'change-quota.aprroval',
          component: () => import('../views/perubahan-kuota-pallet/ApprovalView.vue'),
          meta: { title: 'Approval Change Quota' }
        },
        // {
        //   path: 'send/:id',
        //   name: 'pallet-transfer.send',
        //   component: () => import('../views/mutasi-pallet/SendView.vue'),
        //   meta: { title: 'Send Pallet Transfer' }
        // },
        // {
        //   path: 'receive/:id',
        //   name: 'pallet-transfer.receive',
        //   component: () => import('../views/mutasi-pallet/ReceiveView.vue'),
        //   meta: { title: 'Receive Pallet Transfer' }
        // },
    ]
  },

  // New Pallet
  {
    path: '/new-pallet',
    component: () => import('../views/pallet-baru/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'new-pallet',
            component: () => import('../views/pallet-baru/IndexView.vue'),
            meta: { title: 'Manage New Pallet' }
        },
        {
            path: 'add/:id',
            name: 'new-pallet.add',
            component: () => import('../views/pallet-baru/AddView.vue'),
            meta: { title: 'Add New pallet' }
        },
        // {
        //   path: 'aprroval/:id',
        //   name: 'pallet-transfer.aprroval',
        //   component: () => import('../views/mutasi-pallet/ApprovalView.vue'),
        //   meta: { title: 'Approval Pallet Transfer' }
        // },
        // {
        //   path: 'send/:id',
        //   name: 'pallet-transfer.send',
        //   component: () => import('../views/mutasi-pallet/SendView.vue'),
        //   meta: { title: 'Send Pallet Transfer' }
        // },
        // {
        //   path: 'receive/:id',
        //   name: 'pallet-transfer.receive',
        //   component: () => import('../views/mutasi-pallet/ReceiveView.vue'),
        //   meta: { title: 'Receive Pallet Transfer' }
        // },
    ]
  },
  // New Pallet
  {
    path: '/pallet-realization',
    component: () => import('../views/realisasi-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'pallet-realization',
            component: () => import('../views/realisasi-pallet/IndexView.vue'),
            meta: { title: 'Manage Pallet Realization' }
        },
        {
            path: 'add/:id',
            name: 'pallet-realization.add',
            component: () => import('../views/realisasi-pallet/AddView.vue'),
            meta: { title: 'Add Pallet Realization' }
        },
        // {
        //   path: 'aprroval/:id',
        //   name: 'pallet-transfer.aprroval',
        //   component: () => import('../views/mutasi-pallet/ApprovalView.vue'),
        //   meta: { title: 'Approval Pallet Transfer' }
        // },
        // {
        //   path: 'send/:id',
        //   name: 'pallet-transfer.send',
        //   component: () => import('../views/mutasi-pallet/SendView.vue'),
        //   meta: { title: 'Send Pallet Transfer' }
        // },
        // {
        //   path: 'receive/:id',
        //   name: 'pallet-transfer.receive',
        //   component: () => import('../views/mutasi-pallet/ReceiveView.vue'),
        //   meta: { title: 'Receive Pallet Transfer' }
        // },
    ]
  },

  // Klaim Pallet
  {
    path: '/claim-pallet',
    component: () => import('../views/klaim-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'claim-pallet',
            component: () => import('../views/klaim-pallet/IndexView.vue'),
            meta: { title: 'Manage Claim Pallet' }
        },
        {
            path: 'add',
            name: 'claim-pallet.add',
            component: () => import('../views/klaim-pallet/AddView.vue'),
            meta: { title: 'Add New Claim Pallet' }
        },
        {
          path: 'approval-manager/:id',
          name: 'claim-pallet.approval-manager',
          component: () => import('../views/klaim-pallet/ApprovalView.vue'),
          meta: { title: 'Approval Claim Pallet' }
        },
        
        {
          path: 'approval-distributor/:id',
          name: 'claim-pallet.approval-distributor',
          component: () => import('../views/klaim-pallet/ApprovalViewDist.vue'),
          meta: { title: 'Approval Claim Pallet' }
        },
        {
          path: 'view/:id',
          name: 'claim-pallet.view',
          component: () => import('../views/klaim-pallet/PrintView.vue'),
          meta: { title: 'Claim Pallet Print' }
        },
       
    ]
  },

  // Transporter Adjustment
  {
    path: '/transporter-adjusment',
    component: () => import('../views/penyesuaian-ekspeditur/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'transporter-adjusment',
            component: () => import('../views/penyesuaian-ekspeditur/IndexView.vue'),
            meta: { title: 'Manage Transporter Adjusment' }
        },
        {
            path: 'add',
            name: 'transporter-adjusment.add',
            component: () => import('../views/penyesuaian-ekspeditur/AddView.vue'),
            meta: { title: 'Add New Transporter Adjusment' }
        },
        // {
        //   path: 'approval-manager/:id',
        //   name: 'sewa-pallet.approval-manager',
        //   component: () => import('../views/penyewaan-pallet/ApprovalView.vue'),
        //   meta: { title: 'Approval Sewa Pallet' }
        // },
        
        // {
        //   path: 'approval-distributor/:id',
        //   name: 'sewa-pallet.approval-distributor',
        //   component: () => import('../views/penyewaan-pallet/ApprovalViewDist.vue'),
        //   meta: { title: 'Approval Sewa Pallet' }
        // },
        
    ]
  },

  // Klaim Pallet
  {
    path: '/sewa-pallet',
    component: () => import('../views/penyewaan-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'sewa-pallet',
            component: () => import('../views/penyewaan-pallet/IndexView.vue'),
            meta: { title: 'Manage Sewa Pallet' }
        },
        {
            path: 'add',
            name: 'sewa-pallet.add',
            component: () => import('../views/penyewaan-pallet/AddView.vue'),
            meta: { title: 'Add New Sewa Pallet' }
        },
        {
          path: 'approval-manager/:id',
          name: 'sewa-pallet.approval-manager',
          component: () => import('../views/penyewaan-pallet/ApprovalView.vue'),
          meta: { title: 'Approval Sewa Pallet' }
        },
        
        {
          path: 'approval-distributor/:id',
          name: 'sewa-pallet.approval-distributor',
          component: () => import('../views/penyewaan-pallet/ApprovalViewDist.vue'),
          meta: { title: 'Approval Sewa Pallet' }
        },
        
    ]
  },


  // Pallet Transfer
  {
    path: '/pallet-transfer',
    component: () => import('../views/mutasi-pallet/index.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'pallet-transfer',
            component: () => import('../views/mutasi-pallet/IndexView.vue'),
            meta: { title: 'Manage Pallet Transfer' }
        },
        {
            path: 'add',
            name: 'pallet-transfer.add',
            component: () => import('../views/mutasi-pallet/AddView.vue'),
            meta: { title: 'Add New Pallet Transfer' }
        },
        {
          path: 'approval/:id',
          name: 'pallet-transfer.aprroval',
          component: () => import('../views/mutasi-pallet/ApprovalView.vue'),
          meta: { title: 'Approval Pallet Transfer' }
        },
        {
          path: 'send/:id',
          name: 'pallet-transfer.send',
          component: () => import('../views/mutasi-pallet/SendView.vue'),
          meta: { title: 'Send Pallet Transfer' }
        },
        {
          path: 'receive/:id',
          name: 'pallet-transfer.receive',
          component: () => import('../views/mutasi-pallet/ReceiveView.vue'),
          meta: { title: 'Receive Pallet Transfer' }
        },
    ]
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
          name: 'permissions.edit',
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
