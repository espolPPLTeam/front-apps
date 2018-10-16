<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary-espol" style="border-bottom: 2px solid #F5b400">
            <v-toolbar-title class="mx-auto">Peer Project Learning</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-3">
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="Correo" type="text" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password" v-model="password" :rules="[rules.required]"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-auto pb-3" style="justify-content: center;">
            <v-container grid-list-xl fluid>
              <v-layout wrap class="text-xs-center">
                <v-flex xs12>
                  <v-btn class="primary-espol" :loading="loading" :disabled="disabled" @click.native="login">Iniciar sesión</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog.active" width="500">
        <v-card class="text-xs-center">
          <v-card-text class="headline">{{ dialog.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="dialog.active = false">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import router from '../router'
export default {
  data () {
    return {
      email: 'joeedrod@gmail.com',
      password: '123456',
      loading: false,
      rules: {
        required: (value) => !!value || 'Este campo es obligatorio.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        }
      },
      dialog: {
        active: false,
        text: ''
      }
    }
  },
  computed: {
    disabled () {
      return this.email === '' || this.email === undefined || !this.email || this.password === '' || this.password === undefined || !this.password || this.loading
    }
  },
  methods: {
    login () {
      this.loading = true
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('Loggearse', payload)
        .then(() => {
          this.loading = false
          router.push('lecciones')
          // this.$store.dispatch('getUsuario')
        })
        .catch((errMessage) => {
          this.loading = false
          this.dialogError(errMessage)
        })
    },
    dialogSuccess () {
      this.dialog.active = true
      this.dialog.text = 'Exito'
    },
    dialogError (text) {
      this.dialog.active = true
      this.dialog.text = text
    }
  }
}
</script>
<style scoped>
  button {
    width: 150px !important;
  }
  .btn-registrar {
    background-color: white !important;
    color: #001C43 !important;
  }
</style>
<!-- <template>
  <v-form v-model="valid" ref="form" lazy-validation action="/api/session/login">
    <v-text-field
      label="Correo"
      v-model="correo"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
  data: () => ({
    valid: true,
    correo: 'walava@espol.edu.ec'
  }),
  methods: {
    submit () {
      if (this.$refs.form) {
        axios.post('/api/session/login/dev', {
          correo: this.$data.correo
        }).then((resp) => {
          if (resp.data.tipo === 'estudiante') {
            router.push('lecciones')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
 -->
