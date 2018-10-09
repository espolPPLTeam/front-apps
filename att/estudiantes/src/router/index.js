import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Preguntar from '@/components/Preguntar'
import Responder from '@/components/Responder'

// import AuthGuard from './auth-guard'

Vue.use(Router)

let routes = [
  {
    path: '/responder',
    name: 'Responder',
    component: Responder
    // beforeEnter: AuthGuard
  }
]

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/preguntar',
    name: 'Preguntar',
    component: Preguntar
    // beforeEnter: AuthGuard
  })
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {
  routes.push({
    path: '/preguntar',
    name: 'Preguntar',
    component: Preguntar
    // beforeEnter: AuthGuard
  },
  {
    path: '/',
    name: 'Preguntar',
    component: Preguntar
    // beforeEnter: AuthGuard
  })
}

export default new Router({
  routes
})
