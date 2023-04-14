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
    name: 'dashboardview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dasbor-organisasi/DashboardView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/data-transaksi/TestView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
