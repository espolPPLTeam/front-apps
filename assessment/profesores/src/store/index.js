import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import sockets from './modules/sockets'
import leccionRealTime from './modules/leccionRealTime'
import preguntas from './modules/preguntas'
import lecciones from './modules/lecciones'
import grupos from './modules/grupos'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  modules: {
    sockets,
    leccionRealTime,
    preguntas,
    lecciones,
    grupos
  },
  state: {
    usuario: null,
    materias: [],
    capitulos: [],
    error: null,
    loading: false,
    loggedIn: false
  },
  getters,
  actions,
  mutations
})
