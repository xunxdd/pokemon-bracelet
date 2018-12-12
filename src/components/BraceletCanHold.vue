<template>
<v-container fluid>
  <v-slide-y-transition mode="out-in">

    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-list>
            <v-subheader>Bracelet can hold ...</v-subheader>
         <v-list-tile
           v-for="item in items"
           :key="item.title"
           avatar
           @click=""
         >
           <v-list-tile-action>
             <v-icon v-if="item.icon" color="pink">star</v-icon>
           </v-list-tile-action>

           <v-list-tile-content>
             <v-list-tile-title v-text="item.title"></v-list-tile-title>
           </v-list-tile-content>

         </v-list-tile>
       </v-list>
        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { icon: true, title: 'Z-crystals', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { title: 'Pokeballs (Infinite)', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Something', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Silvally Discs', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ]
      }
    }
  }
</script>
