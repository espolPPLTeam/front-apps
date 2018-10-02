import Vue from 'vue'
export default {
  setLoading (state, payload) {
    state.loading = payload
  },
  setLecciones (state, payload) {
    state.lecciones = payload
  },
  setPreguntas (state, payload) {
    state.preguntas = payload
  },
  addLeccion (state, payload) {
    state.lecciones.push(payload)
  },
  setLeccionCalificar (state, payload) {
    state.leccionCalificar = payload
  },

  setError (state, error) {
    state.error = error
  },
  setMaterias (state, materias) {
    state.materias = materias
  },
  setCapitulos (state, capitulos) {
    state.capitulos = capitulos
  },
  setHeaders (state, token) {
    Vue.http.headers.common['x-access-token'] = token
  },
  setLoggedIn (state, payload) {
    state.loggedIn = payload
  },
  setUsuario (state, payload) {
    state.usuario = payload
  }
}
