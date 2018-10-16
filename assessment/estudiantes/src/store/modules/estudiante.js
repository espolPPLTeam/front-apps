const EstudianteModule = {
  namespaced: true,
  state: {
    nombres: '',
    apellidos: '',
    correo: '',
    id: '',
    grupoId: '',
    paraleloId: ''
  },
  mutations: {
    SET_ESTUDIANTE (state, payload) {
      state.nombres = payload.nombres
      state.apellidos = payload.apellidos
      state.correo = payload.email
      state.id = payload._id
    },
    // FIXME: cambiar cuando el estudiante tenga varios paralelos
    SET_GRUPO (state, payload) {
      state.grupoId = payload.grupos[0]
    },
    // FIXME: cambiar cuando el estudiante tenga varios paralelos
    SET_PARALELO (state, payload) {
      state.paraleloId = payload.paralelos[0]
    }
  },
  getters: {
    nombres (state) {
      return state.nombres
    },
    correo (state) {
      return state.correo
    },
    iniciales (state) {
      return `${state.nombres.charAt(0)}${state.apellidos.charAt(0)}`
    },
    id (state) {
      return state.id
    },
    grupo (state) {
      return state.grupoId
    },
    paralelo (state) {
      return state.paraleloId
    }
  }
}

export default EstudianteModule
