import Vue from 'vue'

const state = {
  secciones: [],
  seccionNueva: {
    nombre: '',
    tipo: '',
    descripcion: '',
    creador: {},
    capitulo: '',
    preguntas: []
  },
  seccionActual: null
}

const getters = {
  secciones (state) {
    return state.secciones
  },
  seccionNueva (state) {
    return state.seccionNueva
  },
  // Utilizado para poder vincular el wysiwyg
  preguntasSeccionNueva (state) {
    return state.seccionNueva.preguntas
  },
  seccionActual (state) {
    return state.seccionActual
  }
}

const mutations = {
  setSecciones (state, secciones) {
    state.secciones = secciones
  },
  anadirPreguntaLaboratorio (state, pregunta) {
    state.seccionNueva.preguntas = [pregunta]
  },
  anadirPreguntaTutorial (state, pregunta) {
    state.seccionNueva.preguntas.push(pregunta)
  },
  setSeccionActual (state, seccion) {
    for (let i = 0; i < seccion.preguntas.length; i++) {
      Vue.set(seccion.preguntas[i], 'show', false)
    }
    state.seccionActual = seccion
  }
}

const actions = {
  getSecciones ({ commit }) {
    Vue.http.get('/api/ppl/secciones')
      .then((res) => {
        commit('setSecciones', res.body.datos)
      }, (err) => {
        console.log(err)
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
