<template>
  <main>
    <v-form v-model="formValid">
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex xs12 sm8>
            <v-text-field v-model="pregunta.nombre" :counter="50" label="Nombre de la pregunta" placeholder="Pregunta #1" required :rules="[rules.required]" :disabled="formDisabled"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-select :items="tipos" item-value="value" item-text="text" label="Tipo de pregunta" v-model="pregunta.tipo" :rules="[rules.required]" :disabled="formDisabled"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <vue-editor v-model="pregunta.descripcion" :disabled="formDisabled" useCustomImageHandler @imageAdded="onImageAdded"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field min="0" max="100" v-model="pregunta.puntaje" suffix="pts." type="number" :rules="[rules.required, rules.minPts]" :disabled="formDisabled"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field min="0" max="60" v-model="pregunta.tiempoEstimado" suffix="min." type="number" :rules="[rules.required, rules.minTime, rules.maxTime]" :disabled="formDisabled"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs3>
            <v-btn v-if="!formDisabled" @click="confirmar" :disabled="!formValid">Confirmar</v-btn>
            <v-btn v-else @click="editar">Editar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </main>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    props: ['tipoSeccion'],
    mounted () {
      this.$emit('disable-crear', true)
    },
    data () {
      return {
        formValid: false,
        formDisabled: false,
        editorInstance: null,
        tipos: [
          {
            value: 'justificacion',
            text: 'Justificación'
          },
          {
            value: 'v/f',
            text: 'Verdadero/Falso'
          },
          {
            value: 'opcion',
            text: 'Opción múltiple'
          }
        ],
        rules: {
          required: (value) => !!value || 'Este campo es obligatorio.',
          minTime: (value) => {
            return value > 0 || 'El tiempo debe ser positivo.'
          },
          maxTime: (value) => {
            return value < 60 || 'El tiempo de una pregunta debe ser menor a 1h.'
          },
          minPts: (value) => {
            return value > 0 || 'El puntaje de una pregunta debe ser positivo.'
          }
        },
        pregunta: {
          nombre: '',
          descripcion: '',
          tipo: '',
          puntaje: 0,
          tiempoEstimado: 0,
          creador: ''
        }
      }
    },
    computed: {
      usuario () {
        return this.$store.getters.usuario
      }
    },
    methods: {
      confirmar () {
        this.pregunta.creador = this.usuario._id
        if (this.tipoSeccion === 'laboratorio') {
          this.$store.commit('preguntas/anadirPreguntaLaboratorio', this.pregunta)
        } else if (this.tipoSeccion === 'tutorial') {
          this.$store.commit('preguntas/anadirPreguntaTutorial', this.pregunta)
        }
        this.formDisabled = true
        this.$emit('enable-crear', true)
      },
      editar () {
        this.formDisabled = false
        this.$emit('disable-crear', true)
      },
      onImageAdded (file, Editor, cursorLocation, resetUploader) {

      }
    }
  }
</script>

<style scoped>

</style>
