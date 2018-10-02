import Vue from 'vue'

const state = {
  lecciones: [],
  leccionCalificar: null
}
const getters = {
  lecciones (state) {
    return state.lecciones
  }
}
const mutations = {
  setLecciones (state, lecciones) {
    state.lecciones = lecciones
  },
  addLeccion (state, leccion) {
    state.lecciones.unshift(leccion)
  }
}
const actions = {
  getLecciones ({commit}) {
    Vue.http.get('/api/ppl/lecciones')
      .then((res) => {
        commit('setLecciones', res.body.datos)
      }, (err) => {
        commit('setError', err, { root: true })
      })
  },
  postLeccion ({ commit, rootState }, payload) {
    return Vue.http.post('/api/ppl/lecciones', payload)
      .then((res) => {
        Vue.set(payload, 'id', res.body.datos.id)
        Vue.set(payload, 'createdAt', res.body.datos.createdAt)
        commit('addLeccion', res.body.datos)
        return Promise.resolve(true)
      }, (err) => {
        commit('setError', err, { root: true })
        return Promise.reject(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
