<template>
  <main>
    <v-layout row wrap>
      <v-flex xs4>
        <v-select :items='paralelos' item-value='_id' item-text='nombreCompleto' v-model='paraleloSelected' label='Paralelo'></v-select>
      </v-flex>
      <v-flex xs4 offset-xs4>
        <v-btn @click='anadirGrupo' :disabled="paraleloSelected === ''">Añadir grupo</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-start justify-center>
      <v-flex xs4 class='elevation-1 pa-3'>
        <v-list two-line>
          <v-subheader>
            Estudiantes sin grupo
          </v-subheader>
          <draggable v-model='estudiantesSinGrupo' :options='{group:"people"}' :move='anadirEstudianteAGrupo' style='min-height: 10px'>
            <template v-for='estudiante in estudiantesSinGrupo'>
              <v-list-tile :key='estudiante._id' avatar @click="">
                <!--<v-list-tile-avatar>
                  <img :src='estudiante.avatar'>
                </v-list-tile-avatar>-->
                <v-list-tile-content>
                  <v-list-tile-title v-html='estudiante.nombres + " " + estudiante.apellidos'></v-list-tile-title>
                  <v-list-tile-sub-title v-html='estudiante.email'></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </draggable>
        </v-list>
      </v-flex>
      <v-flex xs8 class='elevation-1 pa-3'>
        <v-layout row wrap>
          <v-flex xs4 v-for='grupo in grupos' :key='grupo._id'>
            <v-list two-line>
              <v-subheader class='text-xs-center mx-auto'>
                <h3>{{ grupo.nombre }}</h3>
                <v-btn icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-subheader>
              <draggable :id='grupo._id' v-model='grupo.estudiantes' :options='{group:"people"}' :move='anadirEstudianteAGrupo' style='min-height: 10px;'>
                <template v-for='estudiante in grupo.estudiantes'>
                  <v-list-tile :key='estudiante.id' avatar>
                    <!--<v-list-tile-avatar>
                      <img :src='estudiante.avatar'>
                    </v-list-tile-avatar>-->
                    <v-list-tile-content>
                      <v-list-tile-title v-html='estudiante.nombres + " " + estudiante.apellidos'></v-list-tile-title>
                      <v-list-tile-sub-title v-html='estudiante.email'></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </draggable>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </main>

</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable
    },
    data () {
      return {
        paraleloSelected: '',
        estudiantesSinGrupo: [],
        grupos: []
      }
    },
    computed: {
      paralelos () {
        return this.$store.getters.paralelos
      }
    },
    watch: {
      paraleloSelected (value) {
        if (value) {
          this.getEstudiantesParalelo(value)
        }
      }
    },
    methods: {
      anadirEstudianteAGrupo (evt) {
        let idEstudiante = evt.draggedContext.element._id
        let idGrupo = evt.to.id
        let payload = {
          idEstudiante,
          idParalelo: this.paraleloSelected
        }
        const url = `/api/ppl/grupos/${idGrupo}/estudiante`
        this.$http.put(url, payload)
          .then((res) => {
            console.log(res)
          }, (err) => {
            console.log(err)
          })
      },
      anadirGrupo () {
        let numero = this.grupos.length + 1
        let grupo = {
          nombre: `Grupo #${numero}`,
          paralelo: this.paraleloSelected
        }
        this.$store.dispatch('grupos/postGrupo', grupo)
          .then((res) => {
            grupo.id = res.body.datos._id
            grupo.estudiantes = []
            this.grupos.push(grupo)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getEstudiantesParalelo (idParalelo) {
        this.$http.get(`/api/ppl/paralelos/${idParalelo}/estudiantes`)
          .then((res) => {
            this.estudiantesSinGrupo = res.body.datos.estudiantesSinGrupo
            this.grupos = res.body.datos.grupos
          }, (err) => {
            console.log(err)
          })
      },
      postGrupo (grupo) {
        let estudiantes = grupo.estudiantes.map((estudiante) => estudiante.id)
        let payload = {
          nombre: grupo.nombre,
          paralelo: this.paraleloSelected,
          estudiantes
        }
        this.$http.post('/api/ppl/grupos/bulkCreate', payload)
          .then((res) => {
            console.log(res)
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>
