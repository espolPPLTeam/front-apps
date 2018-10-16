import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const Estudiantes = resolve => {
  require.ensure(['./components/Estudiantes/Estudiantes.vue'], () => {
    resolve(require('./components/Estudiantes/Estudiantes.vue'))
  }, 'profesor')
}

const Materias = resolve => {
  require.ensure(['./components/Materias/Materias.vue'], () => {
    resolve(require('./components/Materias/Materias.vue'))
  }, 'profesor')
}

const Paralelos = resolve => {
  require.ensure(['./components/Paralelos/Paralelos.vue'], () => {
    resolve(require('./components/Paralelos/Paralelos.vue'))
  }, 'profesor')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: Estudiantes
    },
    {
      path: '/materias',
      name: 'materias',
      component: Materias
    },
    {
      path: '/paralelos',
      name: 'paralelos',
      component: Paralelos
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
