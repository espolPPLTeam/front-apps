<template>
  <v-app id="app">
    <navbar></navbar>
    <v-content class="pt-0">
      <router-view></router-view>
    </v-content>
    <!-- Footer -->
    <v-footer id="footer" app color="white" class="hidden-sm-and-up" v-if="loggedIn">
      <v-bottom-nav absolute :value="true" :active.sync="e3" color="white">
        <v-badge v-model="preguntaNueva" color="red darken-1" overlap>
          <v-icon color="white" slot="badge">!</v-icon>
          <v-btn flat color="teal" router :to="'/'">
            <span class="mt-1">Preguntas</span>
            <v-icon>fas fa-question</v-icon>
          </v-btn>
        </v-badge>
        <v-badge v-model="respuestaNueva" color="red darken-1" overlap>
          <v-icon color="white" slot="badge">!</v-icon>
          <v-btn flat color="teal" router :to="'/respuestas'">
            <span>Respuestas</span>
            <v-icon>question_answer</v-icon>
          </v-btn>
        </v-badge>
        <v-btn flat color="teal" router :to="'/historial'">
          <span>Historial</span>
          <v-icon>calendar_today</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  created () {
    this.$store.commit('sockets/setSocket', this.$socket)
    const token = localStorage.getItem('x-access-token')
    if (token !== null && token !== undefined && token !== '') {
      this.$store.commit('setHeaders', token)
      this.$store.commit('setLoggedIn', true)
      this.$store.dispatch('getUsuario')
      // this.$store.dispatch('lecciones/getLecciones')
      // this.$store.dispatch('getMaterias')
      // this.$store.dispatch('getCapitulos')
    } else {
      console.log('No tiene token')
      localStorage.removeItem('x-access-token')
      this.$store.commit('setHeaders', null)
      this.$store.commit('setLoggedIn', false)
      this.$router.push('/')
    }
  },
  mounted () {
    const token = localStorage.getItem('x-access-token')
    if (token !== null && token !== undefined && token !== '') {
      this.$store.dispatch('getUsuario')
    }
  },
  computed: {
    preguntaNueva () {
      return this.$store.getters.preguntaNueva
    },
    respuestaNueva () {
      return this.$store.getters.respuestaNueva
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  data () {
    return {
      e3: 1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.continue {
  background-color: #007d46 !important;
  color: white !important;
}
.application--wrap nav, #btnMenuDesktop, .application .theme--dark.list, .theme--dark .list {
  background-color: #001c43 !important;
}

.text-container{
  word-wrap: break-word !important;
}
.caption{
  color: grey;
}
p{
  text-align: justify;
}
button:focus{
  background-color: black !important;
}
.titulo-toolbar{
  font-size: large;
}
.subtitulo-toolbar{
  font-size: smaller;
  color: #cccdce;
}
.list__tile__sub-title {
  font-size: 0.7em !important;
}
.badge .btn {
  height: 100%;
}
.badge .badge__badge{
  margin-top: 5%;
  margin-right: 40%;
}
.bottom-nav .badge{
  width: 100%;
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .texto-pregunta, .texto-respuesta {
    font-size: 2em;
  }
}
</style>
