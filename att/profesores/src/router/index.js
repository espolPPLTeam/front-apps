import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Preguntas from '@/components/Preguntas'
import Respuestas from '@/components/Respuestas'
import Historial from '@/components/Historial'

// import AuthGuard from './auth-guard'

Vue.use(Router)

let routes = [
  {
    path: '/respuestas',
    name: 'Respuestas',
    component: Respuestas
    // beforeEnter: AuthGuard
  },
  {
    path: '/historial',
    name: 'Historial',
    component: Historial
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
    path: '/preguntas',
    name: 'Preguntas',
    component: Preguntas
    // beforeEnter: AuthGuard
  })
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {
  routes.push({
    path: '/',
    name: 'preguntas',
    component: Preguntas
    // beforeEnter: AuthGuard
  },
  {
    path: '/preguntas',
    name: 'preguntas',
    component: Preguntas
    // beforeEnter: AuthGuard
  })
}

export default new Router({
  routes
  //  mode: 'history'
})
