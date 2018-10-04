import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VDataTable,
  VProgressLinear,
  VCard,
  VDivider,
  VTextField,
  VAlert,
  VSelect
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VDataTable,
    VProgressLinear,
    VCard,
    VDivider,
    VTextField,
    VAlert,
    VSelect
  },
  iconfont: 'md',
  theme: {
    primary: '#001C43', // azul
    secondary: '#F5b400', // amarillo
    accent: '#8c9eff',
    error: '#b71c1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
