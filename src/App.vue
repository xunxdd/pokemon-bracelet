<template>
<v-app>
  <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in items" :key="i" @click="" :to="item.route" :params="item.params">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app :clipped-left="clipped">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src="/static/bracelet.png" height="85" class="m-2" />
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>

  </v-toolbar>
  <v-content>
    <router-view/>
  </v-content>

  <v-footer :fixed="fixed" dark app height="auto">
    <v-card class="flex" tile>
      <v-card-title class="white">

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
          <img :src=" 'static/icons/' + icon" height="36" />
        </v-btn>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-center">
        &copy; — <strong>Yung Rodriguez and Annya Kong Only</strong>
      </v-card-actions>
    </v-card>
    <span> </span>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
          icon: 'bubble_chart',
          title: 'Bracelet',
          route: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'My Pokemons',
          route: '/Poke/1',
        },
        {
          icon: 'bubble_chart',
          title: 'Poke Moves',
          route: '/Moves'
        },
        {
          icon: 'bubble_chart',
          title: 'Bracelet Powers',
          route: 'braceletpowers'
        },
        {
          icon: 'bubble_chart',
          title: 'Bracelet Can Hold ...',
          route: 'BraceletCanHold'
        },
        {
          icon: 'bubble_chart',
          title: 'My Wish List',
          route: 'WishList'
        }
      ],
      icons: [
        'icons8-pokecoin-48.png',
        'icons8-pokemon-48.png',
        'camera-pokemon.png',
        'icons8-charmander-48.png',
        'icons8-lure-module-48.png',
        'icons8-pokeball-40.png',
        'icons8-zubat-48.png',
        'icons8-weedle-48.png',
        'icons8-eevee-48.png',
        'icons8-bellsprout-48.png',
        'icons8-bracelet-48.png',
        'icons8-jigglypuff-48.png',
        'icons8-caterpie-48.png',
        'icons8-abra-48.png',
        'icons8-bullbasaur-48.png',
        'icons8-rattata-48.png',
        'icons8-psyduck-48.png',
        'icons8-snorlax-48.png',
        'icons8-squirtle-48.png',
        'icons8-open-pokeball-48.png',
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Bracelet'
    }
  },
  name: 'App'
}
</script>
