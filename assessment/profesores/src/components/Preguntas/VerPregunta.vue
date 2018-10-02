<template>
  <v-card v-if="seccion">
    <v-card-title class="white justify-center">
      <span v-if="seccion.tipo === 'tutorial'" class="headline white--text espol">{{ seccion.nombre }}</span>
      <span v-else class="headline white--text espol">{{ seccion.preguntas[0].nombre }}</span>
    </v-card-title>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6 >
        <v-list>
          <v-list-tile>
            <v-list-tile-action class="icons">
              <v-tooltip bottom>
                <v-icon slot="activator" class=mr-2>assignment_ind</v-icon>
                <span>Creador</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ seccion.creador.nombres }} {{ seccion.creador.apellidos }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex d-flex xs6 sm4 md4 offset-md2 offset-xs0>
        <v-list >
          <v-list-tile>
            <v-list-tile-action class="icons">
              <v-tooltip bottom>
                <v-icon slot="activator" class=mr-2>school</v-icon>
                <span>Tipo de Lección</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ seccion.tipo }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex d-flex xs6 sm4 md2 offset-md4 offset-sm2>
        <v-list>
          <v-list-tile>
            <v-list-tile-action class="icons">
              <v-tooltip bottom>
                <v-icon slot="activator" class=mr-2>star</v-icon>
                <span>Puntaje</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ seccion.puntaje }} Puntos</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex d-flex xs6 sm4 md4>
        <v-list>
          <v-list-tile>
            <v-list-tile-action class="icons">
              <v-tooltip bottom>
                <v-icon slot="activator" class=mr-2>access_time</v-icon>
                <span>Tiempo Estimado</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ seccion.tiempoEstimado }} Minutos</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex d-flex xs6 sm4 md4 offset-md4 offset-sm2>
        <v-list >
          <v-list-tile>
            <v-list-tile-action class="icons">
              <v-tooltip bottom>
                <v-icon slot="activator" class=mr-2>calendar_today</v-icon>
                <span>Fecha de Creación</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{seccion.createdAt | formatoCreatedAt}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card-actions v-if="seccion.tipo === 'tutorial'">
      <v-tooltip bottom>
        <v-icon slot="activator" class=ml-2>assignment</v-icon>
        <span>Descripción</span>
      </v-tooltip>
      <v-subheader  class=px-2>Descripción</v-subheader>
    </v-card-actions>
    <v-card-text v-if="seccion.tipo === tutorial" class="px-5" v-html="seccion.descripcion"></v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="seccion.tipo === 'tutorial'" v-for="(pregunta, index) in seccion.preguntas" :key="pregunta.id">
      <v-card-actions>
        <v-subheader>Pregunta #{{ index + 1 }}</v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="pregunta.show = !pregunta.show">
          <v-icon>{{ pregunta.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="pregunta.show" class="px-5">
          <p v-html="pregunta.descripcion"></p>
          <span class="right pl-3">Tiempo: {{ pregunta.tiempoEstimado }}</span>
          <span class="right">Puntaje: {{ pregunta.puntaje }}</span>
        </v-card-text>
      </v-slide-y-transition>
      <v-divider class="mt-4"></v-divider>
    </v-card-text>
    <v-card-text v-else class="pa-5">
      <p v-html="seccion.preguntas[0].descripcion"></p>
      <span class="right pl-3">Tiempo: {{ seccion.preguntas[0].tiempoEstimado }}</span>
      <span class="right">Puntaje: {{ seccion.preguntas[0].puntaje }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    mounted () {
      // this.getPregunta(this.$route.params.id)
    },
    data: () => ({
      loading: false,
      error: null,
      pregunta: null
    }),
    computed: {
      seccion () {
        return this.$store.getters['preguntas/seccionActual']
      }
    },
    methods: {
      getPregunta (id) {
        this.loading = true
        this.$http.get(`/api/preguntas/${id}`)
          .then((response) => {
            console.log(response)
            this.loading = false
            if (response.body.estado) {
              this.pregunta = response.body.datos
              if (this.pregunta.hasOwnProperty('subpreguntas') && this.pregunta.subpreguntas.length > 0) {
                for (let i = 0; i < this.pregunta.subpreguntas.length; i++) {
                  this.$set(this.pregunta.subpreguntas[i], 'show', false)
                }
              }
            } else {
              this.error = response.body
            }
          }, (err) => {
            this.loading = false
            this.error = err
          })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .espol{
    color: #001C43 !important;
  }
  p img {
    max-width: -webkit-fill-available !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }

  div.list__tile__action.icons{

    min-width: 24px !important;

  }

</style>

