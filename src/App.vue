<template>
  <v-app id="inspire">

    <v-navigation-drawer
            v-model="drawer"
            fixed
            app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="Agent">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Agent Wallboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/Closers">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Closer Commissions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>ADL</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>

        <router-view/>


      </v-container>
    </v-content>

    <app-footer></app-footer>

  </v-app>
</template>

<script>
  import appFooter from './components/footer/Footer'

  export default {
    data: () => ({
      drawer: false
    }),

    props: {
      source: String
    },
    components: {
      appFooter,
    }
  }
</script>
