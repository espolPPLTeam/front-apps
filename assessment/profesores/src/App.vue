<template>
  <v-app>
    <navbar v-if="usuario"></navbar>
    <v-content id="content">
      <v-container fluid fill-height id="container">
        <v-layout align-center justify-center wrap row id="layout">
          <v-flex xs12 sm10 class="flex">
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  computed: {
    usuario () {
      return this.$store.getters.usuario
    }
  },
  created () {
    const token = localStorage.getItem('x-access-token')
    if (token !== null && token !== undefined && token !== '') {
      this.$store.commit('setHeaders', token)
      this.$store.commit('setLoggedIn', true)
      this.$store.dispatch('getUsuario')
      this.$store.dispatch('lecciones/getLecciones')
      this.$store.dispatch('getMaterias')
      this.$store.dispatch('getCapitulos')
    } else {
      console.log('No tiene token')
      localStorage.removeItem('x-access-token')
      this.$store.commit('setHeaders', null)
      this.$store.commit('setLoggedIn', false)
      this.$router.push('/login')
    }
  },
  data () {
    return {}
  },
  name: 'App'
}
</script>
<style>
  #content {
    background-color: #d3dbdb !important;
  }
  .indigo.darken-5 {
    background-color: #001a43 !important;
  }
  h1, h2, h3, h4, h5 {
    color: #001a43 !important;
    font-family: Heuristica-Regular !important;
  }
</style>
