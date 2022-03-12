import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import Login from '../views/login/index.vue'
import EggHome from '../views/home/index.vue'
import Members from '../views/members/index.vue'
import Commodits from '../views/commodits/index.vue'
import Setting from '../views/setting/index.vue'
import Records from '../views/records/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: "/home",
    component: Home,
    children: [
      {
        path: '/home',
        name: 'eggHome',
        component: EggHome,
      },
      {
        path: '/members',
        name: 'members',
        component: Members,
      },
      {
        path: '/commodits',
        name: 'commodits',
        component: Commodits,
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting,
      },
      {
        path: '/records',
        name: 'records',
        component: Records,
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
