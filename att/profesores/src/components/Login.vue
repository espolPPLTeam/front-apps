<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
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
export default {
  data () {
    return {
      email: 'fpinela@espol.edu.ec',
      password: 'posi',
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
      this.$store.dispatch('login', payload)
        .then((datos) => {
          this.loading = false
          this.$store.dispatch('getUsuario')
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
  <v-container>
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm9 offset-sm1>
        <v-alert type="error" dismissible v-model="alert" @input="onClose">
          {{ error.mensaje }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm9 offset-sm1>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field prepend-icon="person" label="Usuario" name="usuario" id="usuario" type="text" v-model="usuario" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field prepend-icon="lock" label="Contraseña" name="contrasenna" id="contrasenna" type="password" v-model="contrasenna" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn
                  type="submit"
                  class="right red white--text"
                  :disabled="!habilitado"
                  :loading="loading">
                    Login
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    habilitado () {
      return this.usuario !== '' && this.usuario !== undefined && this.contrasenna !== '' && this.contrasenna !== undefined && !this.loading
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      usuario: '',
      contrasenna: '',
      alert: true
    }
  },
  methods: {
    login () {
      const data = {
        usuario: this.usuario,
        contrasenna: this.contrasenna
      }
      this.$store.dispatch('login', data)
    },
    onClose () {
      this.$store.commit('setError', null)
    }
  }
}
</script>
 -->
