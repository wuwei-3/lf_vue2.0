import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import Login from '../views/login/index.vue'
import EggHome from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home',
        name: 'eggHome',
        component: EggHome,
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
