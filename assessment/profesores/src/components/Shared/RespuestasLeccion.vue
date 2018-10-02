<template>
  <main>
    <header>
      <v-tabs fixed-tabs grow v-model="tabPregunta">
        <v-tab v-for="pregunta in preguntas" :key="'tab-' + pregunta._id" :href="'#pregunta-' + pregunta._id" ripple>Sección #{{ pregunta.orden }}</v-tab>
      </v-tabs>
    </header>
    <main>
      <v-tabs-items v-model="tabPregunta">
        <v-tab-item v-for="pregunta in preguntas" :id="'pregunta-' + pregunta._id" :key="'pregunta-' + pregunta._id">
          <v-card v-for="(respuesta, index) in pregunta.respuestas" :key="index">
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </main>
  </main>
</template>

<script>
  export default {
    data () {
      return {
        tabPregunta: ''
      }
    },
    computed: {
      preguntas () {
        return this.$store.getters['leccionRealTime/preguntas']
      }
    }
  }
</script>

<style scoped>

</style>
