<style scoped>
  .card-materia {
    min-height: 100px;
    border-radius: 25px;
  }
  .card-materia .texto {
    margin-top: 0px !important;
  }
</style>
<template>
  <v-container flex fill-height grid-list-md text-xs-center>
    <navbar></navbar>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm5 class="text-xs-center">
        <v-card raised hover class="card-materia" @click.native="assessment">
          <v-card-title>
            <v-icon class="text-xs-center mx-auto" large>assessment</v-icon>            
          </v-card-title>
          <v-card-text class="texto">
            <h3>PPL-Assessment</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 class="text-xs-center">
        <v-card raised hover class="card-materia" @click.native="att">
          <v-card-title>
            <v-icon class="text-xs-center mx-auto" large>question_answer</v-icon>            
          </v-card-title>
          <v-card-text class="texto">
            <h3>Ask the Teacher (ATT)</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 class="text-xs-center">
        <v-card raised hover class="card-materia" >
          <v-card-title>
            <v-icon class="text-xs-center mx-auto" large>chrome_reader_mode</v-icon>            
          </v-card-title>
          <v-card-text class="texto">
            <h3>Reading-Assessment</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 class="text-xs-center">
        <v-card raised hover class="card-materia" >
          <v-card-title>
            <v-icon class="text-xs-center mx-auto" large>group</v-icon>            
          </v-card-title>
          <v-card-text class="texto">
            <h3>PPL</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  var jwtDecode = require('jwt-decode')
  export default {
    methods: {
      att () {
        let token = localStorage.getItem('x-access-token')
        var decoded = jwtDecode(token)
        console.log(decoded)
        if (decoded.tipo === 'estudiante') {
          window.location.replace('/att/estudiantes')
        } else {
          window.location.replace('/att/profesores')
        }
      },
      assessment () {
        // window.location.replace('/assessment/profesores')
      }
    }
  }
</script>