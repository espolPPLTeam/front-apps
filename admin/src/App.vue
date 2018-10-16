<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav" app>
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar  dark class="secondary" app>
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
        </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">PPL ADMIN</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        
      </v-toolbar-items>
      
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      sideNav: false,
      menuItems: [
        {icon: 'school', title: 'Profesores', link: '/profesores'},
        {icon: 'group', title: 'Estudiantes', link: '/estudiantes'},
        {icon: 'library_books', title: 'Materias', link: '/materias'},
        {icon: 'class', title: 'Paralelos', link: '/paralelos'},
        {icon: 'exit_to_app', title: 'Salir', link: '/'}
      ]
    }
  }
}
</script>
