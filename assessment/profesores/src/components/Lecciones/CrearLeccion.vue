<style scoped>
  #time {
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>
<template>
  <main>
    <v-card>
      <v-card-title>
        <h1 class="mx-auto display-1">Crear Lección</h1>
      </v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs grow centered v-model="tab">
          <v-tab :href="'#tab-general'">General</v-tab>
          <v-tab :href="'#tab-preguntas'" :disabled="disabledPreguntas">Preguntas</v-tab>
          <v-tab :href="'#tab-resumen'">Resumen</v-tab>
        </v-tabs>
      </v-card-text>
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item id="tab-general">
            <v-form>
              <v-container grid-list-xl fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="leccion.nombre" label="Nombre de la lección" placeholder="Ej: Cap. 11 Campo Magnético" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="materias" item-text="nombre" item-value="id" label="Materia" required v-model="materiaSelected"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="paralelosMostrar" label="Paralelo" v-model="leccion.paralelo" item-value="_id" item-text="nombreParalelo" required></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-dialog ref="dialogFecha" v-model="dialogFecha" :return-value.sync="leccion.fechaInicio" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="leccion.fechaInicio" label="Fecha de inicio"  readonly required></v-text-field>
                      <v-date-picker v-model="leccion.fechaInicio" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dialogFecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogFecha.save(leccion.fechaInicio)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="tipos" item-value="id" item-text="nombre" label="Tipo de lección" v-model="leccion.tipo" required></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-tab-item>
          <v-tab-item id="tab-preguntas">
            <v-layout row wrap>
              <v-flex  d-flex xs3>
                <v-select :items="materias" item-value="id" item-text="nombre" v-model="materiaSelected" class="input-group--focused pr-2 pl-2" label="Materia" disabled></v-select>
              </v-flex>
              <v-flex  d-flex xs6>
                <v-select :items="capitulosFiltrados" item-value="id" item-text="nombre" v-model="leccion.capitulo" class="input-group--focused pr-2 pl-2" label="Capítulo"></v-select>
              </v-flex>
              <v-flex  d-flex xs3>
                <v-select :items="tipos" item-value="id" item-text="nombre" v-model="leccion.tipo" class="input-group--focused pr-2 pl-2" label="Tipo de pregunta" disabled></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="seccionesFiltradas.length > 0 && leccion.capitulo !== ''">
              <v-flex xs12>
                <v-list>
                  <v-list-tile v-for="seccion in seccionesFiltradas" :key="seccion.id" class="pt-4" style="border-bottom: 1px solid #d3dbdb" avatar>
                    <v-checkbox v-if="seccion.tipo === 'tutorial'" v-model="leccion.secciones" :label="seccion.nombre" :value="seccion.id"></v-checkbox>
                    <v-checkbox v-else v-model="leccion.secciones" :label="seccion.preguntas[0].nombre" :value="seccion.id"></v-checkbox>
                    <v-list-tile-action>
                      <span class="caption">{{ getTiempoEstimadoSeccion(seccion) }} minutos</span>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
            <div id="time" class="pa-2">
              <v-icon>timer</v-icon>
              {{ leccion.tiempoEstimado }} minutos
            </div>
          </v-tab-item>
          <v-tab-item id="tab-resumen">
            <v-card>
              <v-card-title primary-title>
                <h3 class="title mx-auto">{{ leccion.nombre }}</h3>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon>school</v-icon>
                        {{ leccion.nombreMateria }} P{{ leccion.nombreParalelo }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon>timer</v-icon>
                        {{ leccion.tiempoEstimado }} minutos
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon>event</v-icon>
                        {{ leccion.fechaInicio | formatoCreatedAt }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon>grade</v-icon>
                        {{ leccion.puntaje }} puntos
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-icon>subject</v-icon>
                        {{ leccion.tipo }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-list>
              </v-card-text>
              <v-card-text>
                <h3 class="title" style="text-align: center;">Preguntas escogidas</h3>
                <v-list two-line>
                  <template v-for="seccion in seccionesSelAux" v-if="seccionesSelAux.length > 0 && leccion.capitulo !== ''">
                    <v-list-tile avatar :key="seccion.id">
                      <v-list-tile-content>
                        <v-list-tile-title v-if="leccion.tipo === 'tutorial'">
                          {{ seccion.nombre }}
                        </v-list-tile-title>
                        <v-list-tile-title v-else>
                          {{ seccion.preguntas[0].nombre }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                          {{ seccion.capitulo.nombre }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-list-tile-action-text>
                          {{ getTiempoEstimadoSeccion(seccion) }} minutos
                        </v-list-tile-action-text>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </template>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat class="indigo darken-5 white--text" @click.native="crearLeccion" :disabled="disabledPreguntas || leccion.secciones.length === 0">
                  Crear
                  <v-icon right>send</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-dialog v-model="successDialog" persistent max-width="290">
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mx-auto">Lección creada!</h3>
        </v-card-title>
        <v-card-text>Se añadió el registro a la base de datos correctamente.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="green darken-1" to="/lecciones/">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="error.activo" persistent max-width="290">
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mx-auto">Error</h3>
        </v-card-title>
        <v-card-text>{{ error.mensaje }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="green darken-1" @click.native="error.activo = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>
<script>
  export default {
    mounted () {
      this.getSecciones()
    },
    data () {
      return {
        tab: 'tab-general', // tab-general | tab-preguntas | tab-resumen
        dialogFecha: false,
        successDialog: false,
        materiaSelected: '',
        leccion: {
          nombre: '',
          capitulo: '',
          secciones: [],
          creador: '',
          tiempoEstimadoEnMinutos: 0,
          puntaje: 0,
          tipo: '', // tutorial | laboratorio
          paralelo: '',
          fechaInicio: ''
        },
        tipos: [
          {
            id: 'laboratorio',
            nombre: 'Laboratorio'
          },
          {
            id: 'tutorial',
            nombre: 'Tutorial'
          }
        ],
        capitulosFiltrados: [], // Capítulos filtrados que se muestran en el select
        paralelosMostrar: [], // Paralelos filtrados que se muestran en el select
        seccionesFiltradas: [], // Secciones filtradas que se muestran en la lista
        seccionesSelAux: [], // Array que contiene todo el json de preguntas seleccionadas
        error: {
          activo: false,
          mensaje: ''
        }
      }
    },
    computed: {
      materias () {
        return this.$store.getters.materias
      },
      paralelos () {
        return this.$store.getters.paralelos
      },
      capitulos () {
        return this.$store.getters.capitulos
      },
      secciones () {
        return this.$store.getters['preguntas/secciones']
      },
      tipoLeccion () {
        return this.leccion.tipo
      },
      capituloLeccion () {
        return this.leccion.capitulo
      },
      seccionesSel () {
        return this.leccion.secciones
      },
      disabledPreguntas () {
        return this.isEmpty(this.leccion.nombre) || this.isEmpty(this.leccion.paralelo) || this.isEmpty(this.leccion.fechaInicio) || this.isEmpty(this.leccion.tipo)
      },
      usuario () {
        return this.$store.getters.usuario
      }
    },
    watch: {
      materiaSelected (value) {
        if (value) {
          this.leccion.tipo = '' // Para que se encere el array de preguntas y se muestren las de esa materia
          this.leccion.secciones = [] // No se puede crear una lección con secciones de diferentes materias. Cada vez que cambie la materia se encera el array de secciones seleccionadas
          this.seccionesSelAux = [] // Por la misma razón se encera este array
          this.paralelosMostrar = this.paralelos.filter((paralelo) => {
            return paralelo.materia === value
          })
          this.filtrarSecciones(value, this.leccion.tipo, this.leccion.capitulo)
          this.filtrarCapitulos(value)
        }
      },
      tipoLeccion (value) {
        if (value) {
          this.leccion.secciones = [] // No se puede crear una lección con secciones de diferentes tipos. Cada vez que cambie el tipo se encera el array de secciones seleccionadas
          this.seccionesSelAux = [] // Por la misma razón se encera este array
          this.filtrarSecciones(this.materiaSelected, value, this.leccion.capitulo)
        }
      },
      capituloLeccion (value) {
        if (value) {
          this.leccion.secciones = [] // No se puede crear una lección con secciones de diferentes capítulos. Cada vez que cambie el capítulo se encera el array de secciones seleccionadas
          this.seccionesSelAux = [] // Por la misma razón se encera este array
          this.filtrarSecciones(this.materiaSelected, this.leccion.tipo, value)
        }
      },
      seccionesSel (value) {
        this.leccion.tiempoEstimadoEnMinutos = this.calcularTiempoEstimado(value)
        this.leccion.puntaje = this.calcularPuntaje(value)
        this.seccionesSelAux = []
        for (let i = 0; i < value.length; i++) {
          this.seccionesSelAux.push(this.seccionesFiltradas.find(x => {
            return x.id === value[i]
          }))
        }
      }
    },
    methods: {
      isEmpty (field) {
        return field === '' || field === null || field === undefined
      },
      calcularTiempoEstimado (idSecciones) {
        let tiempo = 0
        for (let i = 0; i < idSecciones.length; i++) {
          let seccion = this.seccionesFiltradas.find((x) => {
            return x.id === idSecciones[i]
          })
          if (seccion) {
            tiempo += this.getTiempoEstimadoSeccion(seccion)
          }
        }
        return tiempo
      },
      calcularPuntaje (idSecciones) {
        let puntaje = 0
        for (let i = 0; i < idSecciones.length; i++) {
          let seccion = this.seccionesFiltradas.find((x) => {
            return x.id === idSecciones[i]
          })
          if (seccion) {
            puntaje += this.getPuntajeSeccion(seccion)
          }
        }
        return puntaje
      },
      crearLeccion () {
        this.leccion.creador = this.usuario._id
        this.$store.dispatch('lecciones/postLeccion', this.leccion)
          .then((res) => {
            if (res.body.estado) {
              this.successDialog = true
            } else {
              this.error.activo = true
              this.error.mensaje = res.body.mensaje[0]
            }
          })
          .catch((err) => {
            this.error.activo = true
            this.error.mensaje = err.body.mensaje[0]
          })
      },
      getSecciones () {
        this.$store.dispatch('preguntas/getSecciones')
      },
      filtrarSecciones (materia, tipo, capitulo) {
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
      filtrarCapitulos (materia) {
        this.capitulosFiltrados = this.capitulos.filter((capitulo) => capitulo.materia === materia)
      },
      getTiempoEstimadoSeccion (seccion) {
        let tiempo = 0
        for (let i = 0; i < seccion.preguntas.length; i++) {
          tiempo += parseInt(seccion.preguntas[i].tiempoEstimado)
        }
        return tiempo
      },
      getPuntajeSeccion (seccion) {
        let puntaje = 0
        for (let i = 0; i < seccion.preguntas.length; i++) {
          puntaje += parseInt(seccion.preguntas[i].puntaje)
        }
        return puntaje
      }
    }
  }
</script>
