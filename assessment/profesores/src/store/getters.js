import Vue from 'vue'
export default {
  error (state) {
    return state.error
  },
  loading (state) {
    return state.loading
  },
  lecciones (state) {
    return state.lecciones
  },
  preguntas (state) {
    return state.preguntas
  },
  leccion (state) {
    return (id) => state.lecciones.find((leccion) => {
      if (leccion._id === id) {
        leccion.fechaInicio = leccion.fechaInicio.split('T')[0]
        return leccion
      }
    })
  },
  leccionCalificar (state) {
    return state.leccionCalificar
  },
  // Le devuelvo solo las materias en las que el usuario está registrado
  materias (state) {
    let materias = []
    if (state.usuario) {
      for (let i = 0; i < state.materias.length; i++) {
        let materiaActual = state.materias[i]
        for (let j = 0; j < state.usuario.paralelos.length; j++) {
          let paraleloActual = state.usuario.paralelos[j]
          if (materiaActual.id === paraleloActual.materia) {
            materias.push(materiaActual)
          }
        }
      }
    } else {
      materias = state.materias
    }
    return materias
  },
  paralelos (state) {
    if (!state.usuario) {
      return []
    }
    for (let i = 0; i < state.usuario.paralelos.length; i++) {
      let actual = state.usuario.paralelos[i]
      let nombreCompleto = `${actual.nombreMateria} P${actual.nombreParalelo}`
      Vue.set(state.usuario.paralelos[i], 'nombreCompleto', nombreCompleto)
    }
    return state.usuario.paralelos
  },
  capitulos (state) {
    return state.capitulos
  },
  loggedIn (state) {
    return state.loggedIn
  },
  usuario (state) {
    return state.usuario
  }
}
