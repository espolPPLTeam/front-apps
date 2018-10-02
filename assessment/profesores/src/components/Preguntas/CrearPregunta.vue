<template>
  <main>
    <v-card>
      <v-form v-model="formValid">
        <v-container grid-list-xl fluid>
          <v-layout row wrap>
            <v-flex xs4>
              <v-select :items="materias" item-text="nombre" item-value="id" label="Materia" v-model="materiaSelected"></v-select>
            </v-flex>
            <v-flex xs5>
              <v-select :items="capitulosMostrar" item-text="nombre" item-value="id" label="Capítulo" v-model="seccion.capitulo" :disabled="capitulosDisabled"></v-select>
            </v-flex>
            <v-flex xs3>
              <v-select :items="tipos" item-text="text" item-value="value" v-model="seccion.tipo" label="Tipo de pregunta" :disabled="tiposDisabled"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if="seccion.tipo === 'laboratorio'">
            <v-flex xs12>
              <crear-pregunta v-on:disable-crear="onDisableCrear" v-on:enable-crear="onEnableCrear" :tipoSeccion="'laboratorio'"></crear-pregunta>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if="seccion.tipo === 'tutorial'">
            <v-flex xs12>
              <v-text-field v-model="seccion.nombre" label="Nombre de la sección" placeholder="Sección #1: Campo eléctrico básico"></v-text-field>
            </v-flex>
            <v-flex xs 12>
              <label class="title">Descripción de la sección</label>
              <vue-editor v-model="seccion.descripcion"></vue-editor>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if="seccion.tipo === 'tutorial'" class="mt-5">
            <v-divider class="mt-3 mr-2"></v-divider>
            <h3 class="headline">Preguntas</h3>
            <v-divider class="mt-3 ml-2"></v-divider>
            <v-flex xs12 v-for="n in numPreguntas" :key="n">
              <crear-pregunta v-on:disable-crear="onDisableCrear" v-on:enable-crear="onEnableCrear" :tipoSeccion="'tutorial'" :key="'tut-pregunta-' + n"></crear-pregunta>
              <v-divider></v-divider>
            </v-flex>
            <section class="mx-auto text-xs-center">
              <v-btn class="red white--text" icon @click="anadirPregunta">
                <v-icon>add</v-icon>
              </v-btn>
            </section>
          </v-layout>
          <v-layout row wrap v-if="seccion.tipo !== ''">
            <v-flex xs12 class="text-xs-center">
              <v-btn @click="crearPregunta" :disabled="crearDisabled">Crear Pregunta</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
    <v-dialog v-model="dialogSuccess" width="500">
      <v-card>
        <v-card-text>Pregunta creada correctamente</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat router :to="'/preguntas'">Regresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        numPreguntas: 1,
        dialogSuccess: false,
        formValid: false,
        crearDisabled: true,
        tipos: [
          {
            value: 'laboratorio',
            text: 'Laboratorio'
          },
          {
            value: 'tutorial',
            text: 'Tutorial'
          }
        ],
        materiaSelected: '',
        capitulosMostrar: [],
        seccion: {
          nombre: '',
          tipo: '',
          descripcion: '',
          creador: '',
          capitulo: '',
          preguntas: []
        }
      }
    },
    computed: {
      capitulosDisabled () {
        return this.materiaSelected === ''
      },
      tiposDisabled () {
        return this.seccion.capitulo === ''
      },
      materias () {
        return this.$store.getters.materias
      },
      capitulos () {
        return this.$store.getters.capitulos
      },
      preguntasSeccion () {
        return this.$store.getters['preguntas/preguntasSeccionNueva']
      },
      usuario () {
        return this.$store.getters.usuario
      }
    },
    watch: {
      // Filtra los capítulos a mostrar por materia seleccionada
      materiaSelected (value) {
        if (value) {
          this.capitulosMostrar = this.capitulos.filter((capitulo) => {
            return capitulo.materia === value
          })
        } else {
          this.seccion.tipo = ''
        }
      }
    },
    methods: {
      onDisableCrear () {
        this.crearDisabled = true
      },
      onEnableCrear () {
        this.crearDisabled = false
      },
      getNombreSeccion (capituloId, materiaId) {
        let nombreCapitulo = this.capitulosMostrar.find((capitulo) => {
          return capitulo.id === capituloId
        }).nombre
        let nombreMateria = this.materias.find((materia) => {
          return materia.id === materiaId
        }).nombre
        return `Laboratorio-${nombreMateria}-${nombreCapitulo}`
      },
      crearPregunta () {
        this.seccion.creador = this.usuario._id
        this.seccion.preguntas = this.preguntasSeccion
        if (this.seccion.tipo === 'laboratorio') {
          this.seccion.nombre = this.getNombreSeccion(this.seccion.capitulo, this.materiaSelected)
          this.seccion.descripcion = 'Esta sección es de un laboratorio...'
        }
        this.$http.post('/api/ppl/secciones/bulkCreate', this.seccion)
          .then((res) => {
            console.log(res)
            this.dialogSuccess = true
          }, (err) => {
            console.log(err)
          })
      },
      anadirPregunta () {
        this.numPreguntas ++
      }
    }
  }
</script>

<style scoped>

</style>
