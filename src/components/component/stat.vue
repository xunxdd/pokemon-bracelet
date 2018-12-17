<script>
import PokeService from '@/services/poke.srv'
import vueConfirmDialog from '@/components/common/Confirm';
import Vue from 'vue'

Vue.use(require('vue-moment'));

export default {
  props: {
    stat: Object
  },
  components: {
    'vue-confirm-dialog': vueConfirmDialog,
  },
  data: () => ({}),
  methods: {
    remove(key) {
      this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {
        this.removeStat(key);
      })
    },
    removeStat(key) {
      PokeService.removeStatByKey(key).then(() => {
        this.$router.push({
          name: 'PokeCollection',
          params: {
            page: 1
          }
        })
      })
    }
  }
}
</script>

<template>
<v-card color="cyan darken-2" class="white--text">


  <v-layout>
    <v-flex xs4>
      <v-img v-if="stat.image" :src="stat.image" height="150px" contain></v-img>

      <div v-if="!stat.image" height="150px" class="text-xs-center">
        <v-img src="https://s3.us-east-2.amazonaws.com/pokemon-bracelet/unknown.png" height="140px" contain></v-img>
        No Poke image here. <br> So just me
      </div>
    </v-flex>
    <v-flex xs8>
      <v-card-title primary-title>
        <div>
          <div class="headline">
            <span v-if="stat.decorator">({{stat.decorator}}) </span>{{stat.name}}
          </div>
          <div>Rank: {{stat.rank}}</div>
          <div>Evolves From: {{stat.evolves_from}}</div>
          <div>Type: {{stat.type}}</div>
          <div>Weakness: {{stat.weakness}}</div>
          <div>Likes: {{stat.likes}}</div>
          <div>Dislikes: {{stat.dislikes}}</div>
          <div>Gender: {{stat.gender}}</div>
          <div>Ball: {{stat.ball}}</div>
          <div>Collected at {{ stat.time_added | moment("dddd, MMMM Do YYYY")}}</div>
          <div>
            <vue-confirm-dialog ref="confirm"></vue-confirm-dialog>
            <router-link :to="{ name: 'PokeCollectionEditor', params: { key: stat.key}}" tag="button">
              <v-icon size="20" light color="white">edit</v-icon>
            </router-link>
            <span class="p-2"></span>
            <v-icon size="20" light color="white" @click="remove(stat.key)">delete_forever</v-icon>
          </div>
        </div>
      </v-card-title>
    </v-flex>

  </v-layout>
</v-card>
</template>
