import Vue from 'vue'
import router from '../router'

export default {
  getLecciones ({commit}) {
    commit('setError', null)
    commit('setLoading', true)
    Vue.http.get('/api/lecciones')
      .then((response) => {
        commit('setLoading', false)
        if (response.body.estado) {
          commit('setLecciones', response.body.datos)
        } else {
          commit('setError', response.body)
        }
      }, (err) => {
        commit('setLoading', false)
        commit('setError', err)
      })
  },

  getMaterias ({ commit, state }) {
    Vue.http.get('/api/ppl/materias')
      .then((res) => {
        commit('setMaterias', res.body.datos)
      }, (err) => {
        commit('setError', err)
      })
  },
  getCapitulos ({ commit }) {
    Vue.http.get('/api/ppl/capitulos')
      .then((res) => {
        commit('setCapitulos', res.body.datos)
      }, (err) => {
        commit('setError', err)
      })
  },
  login ({ commit }, payload) {
    const url = '/api/login/session'
    return Vue.http.post(url, { email: payload.email, password: payload.password })
      .then((resp) => {
        commit('setHeaders', resp.body.datos)
        localStorage.setItem('x-access-token', resp.body.datos)
        localStorage.setItem('email', this.email)
        return Promise.resolve(true)
      }, (err) => {
        Promise.reject(err.body.message)
      })
  },
  getUsuario ({ commit, dispatch }) {
    Vue.http.get('/api/login/session')
      .then((res) => {
        commit('setUsuario', res.body.datos)
        dispatch('getMaterias')
        dispatch('getCapitulos')
        dispatch('lecciones/getLecciones')
        router.push('/')
      }, (err) => {
        commit('setError', err)
      })
  },
  logout ({ commit }) {
    localStorage.removeItem('x-access-token')
    commit('setHeaders', null)
    commit('setLoggedIn', false)
    commit('setUsuario', null)
    router.push('/')
  }
}
