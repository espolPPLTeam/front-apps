import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    estudiantes: [
      {
        value: false,
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      },
      {
        value: false,
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%'
      },
      {
        value: false,
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%'
      },
      {
        value: false,
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%'
      },
      {
        value: false,
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
      },
      {
        value: false,
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%'
      }
    ],
    materias: [
      {
        cod: '1234FGG',
        nombre: 'Fisica A',
        n_prof: 2,
        n_est: 45
      }
    ],
    paralelos: [
      {
        paral: '121C',
        materia: 'Fisica B',
        anio: 2018,
        termino: 2,
        n_prof: 1,
        n_est: 30,
        n_grup: 9
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    estudiantes (state) {
      return state.estudiantes
    },
    materias (state) {
      return state.materias
    },
    paralelos (state) {
      return state.paralelos
    }
  }
})
