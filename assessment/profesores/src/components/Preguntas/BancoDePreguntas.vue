<template>
  <v-container white mx-0 px-0>
    <v-card-title class="justify-center" >
      <span class="display-1 espol text-xs-center pb-5">Banco de Preguntas</span>
    </v-card-title>
    <v-layout row wrap>
      <v-flex  d-flex xs4>
        <v-select
          :items="materias"
          v-model="materiaSelected"
          class="input-group--focused pr-2 pl-2"
          label="Materia"
          item-value="id"
          item-text="nombre"
        ></v-select>
      </v-flex>
      <v-flex  d-flex xs5>
        <v-select
          :items="capitulosFiltrados"
          v-model="capituloSelected"
          class="input-group--focused pr-2 pl-2"
          label="Capítulo"
          item-value="id"
          item-text="nombre"
        ></v-select>
      </v-flex>
      <v-flex  d-flex xs3>
        <v-select
          :items="tipospregunta"
          v-model="tipoSelected"
          class="input-group--focused pr-2 pl-2"
          label="Tipo de pregunta"
          item-value="id"
          item-text="nombre"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-container fluid style="min-height: 0;" grid-list-lg v-if="seccionesFiltradas.length > 0">
      <v-layout row wrap>
        <v-flex xs12 md10 offset-md1>
          <v-card @click.native="goToSeccion(seccion)" v-for="seccion in seccionesFiltradas" :key="seccion.id" class="mt-1 px-3 pb-1 elevation-24 pointer">
            <v-card-actions>
              <span>{{ seccion.nombre }}</span>
              <span>{{ seccion.descripcion }}</span>
              <v-spacer></v-spacer>
              <!--<v-btn icon @click.native="capitulo.showCap = !capitulo.showCap">
                <v-icon>{{ capitulo.showCap ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>-->
            </v-card-actions>
            <!--<v-slide-y-transition>
              <v-card-text  v-show="capitulo.showCap">
                <v-card v-for="pregunta in preguntasSelect" v-if="pregunta.capitulo._id === capitulo._id" :key="preguntas.indexOf(pregunta)" class="mt-2 px-5 elevation-10" ripple :to= '"/preguntas/"+ pregunta._id'>
                  <v-card-title primary-title class="mb-0 pb-0">
                    <div class="headline">{{pregunta.nombre}}</div>
                  </v-card-title>
                  <v-card-text  class="mt-0 pt-0">
                    <div class="caption">Creador: {{ pregunta.creador.nombres }} {{ pregunta.creador.apellidos }}</div>
                    <div class="caption">Fecha de creación: {{ pregunta.createdAt | formatoCreatedAt }}</div>
                  </v-card-text>
                  <v-card-media class="preview">
                    <div v-html="pregunta.descripcion"></div>
                  </v-card-media>
                  <v-card-actions v-if="pregunta.subpreguntas.length > 0">
                    <p class="blue--text text--darken-2 caption">Esta pregunta tiene subpreguntas</p>
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card>
              </v-card-text>
            </v-slide-y-transition>-->

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container >
</template>

<script>
  export default {
    mounted () {
      this.getSecciones()
    },
    data: () => ({
      loading: false,
      materiaSelected: '',
      tipoSelected: '',
      capituloSelected: '',
      error: null,
      tipospregunta: [
        {
          id: 'tutorial',
          nombre: 'Tutorial'
        },
        {
          id: 'laboratorio',
          nombre: 'Laboratorio'
        }
      ],
      capitulosFiltrados: [],
      seccionesFiltradas: [],
      preguntas: []
    }),
    computed: {
      materias () {
        return this.$store.getters.materias
      },
      capitulos () {
        return this.$store.getters.capitulos
      },
      secciones () {
        return this.$store.getters['preguntas/secciones']
      }
    },
    watch: {
      materiaSelected (value) {
        if (value) {
          this.filtrarSecciones(value, this.tipoSelected, this.capituloSelected)
          this.filtrarCapitulos(value)
        }
      },
      tipoSelected (value) {
        if (value) {
          this.filtrarSecciones(this.materiaSelected, value, this.capituloSelected)
        }
      },
      capituloSelected (value) {
        if (value) {
          this.filtrarSecciones(this.materiaSelected, this.tipoSelected, value)
        }
      }
    },
    methods: {
      getSecciones () {
        this.$store.dispatch('preguntas/getSecciones')
      },
      filtrarCapitulos (materia) {
        this.capitulosFiltrados = this.capitulos.filter((capitulo) => capitulo.materia === materia)
      },
      filtrarSecciones (materia, tipo, capitulo) {
        console.log(materia, tipo, capitulo)
        this.seccionesFiltradas = this.secciones.filter((seccion) => {
          if (materia !== '' && tipo !== '' && capitulo !== '') {
            return seccion.capitulo.materia === materia && seccion.tipo === tipo && seccion.capitulo.id === capitulo
          } else if (materia !== '' && tipo !== '') {
            return seccion.capitulo.materia === materia && seccion.tipo === tipo
          } else if (materia !== '' && capitulo !== '') {
            return seccion.capitulo.materia === materia && seccion.capitulo.id === capitulo
          } else if (tipo !== '' && capitulo !== '') {
            return seccion.tipo === tipo && seccion.capitulo.id === capitulo
          } else if (materia !== '') {
            return seccion.capitulo.materia === materia
          } else if (tipo !== '') {
            return seccion.tipo === tipo
          } else if (capitulo !== '') { // Esto nunca va a pasar pero bueno...
            return seccion.capitulo.id === capitulo
          } else {
            return seccion
          }
        })
        this.seccionesFiltradas.sort((a, b) => {
          return b.createdAt - a.createdAt
        })
      },
      formatFecha (fecha) {
        return Date(fecha)
      },
      goToSeccion (seccion) {
        this.$store.commit('preguntas/setSeccionActual', seccion)
        this.$router.push(`/preguntas/${seccion.id}`)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card{
    width: 100% !important;
  }
  .preview{
    max-height: 100px !important;
  }
  .pointer {
    cursor: pointer;
  }
</style>
