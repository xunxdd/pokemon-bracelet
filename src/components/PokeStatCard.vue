<script>
import PokeService from '@/services/poke.srv'
import vueConfirmDialog from '@/components/common/Confirm';
import Vue from 'vue'
Vue.use(require('vue-moment'));

export default {
  data: () => ({
    key: '',
    stat: {
      name: '',
      decorator: '',
      evolves_from: '',
      evolves_into: '',
      weakness: '',
      type: '',
      likes: '',
      dislikes: '',
      gender: '',
      ball: '',
      image: '',
      rank: 0
    },
  }),
  components: {
    'vue-confirm-dialog': vueConfirmDialog,
  },
  mounted() {
    const params = this.$route.params;
    this.key = params.key;
    if (!this.key) {
      return;
    }
    PokeService.getStatByKey(this.key).then((data) => {
      this.stat = data;
    });
  },
  methods: {
    goBackToPokePage() {
      return this.$router.push({
        name: 'PokeCollection',
        params: {
          page: 1
        }
      });
    },

    edit() {
      this.goBackToPokePage()
    },

    remove(key) {
      this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {
        this.removeStat(key);
      })
    },

    removeStat(key) {
      PokeService.removeStatByKey(key).then(() => {
        this.goBackToPokePage()
      })
    }

  }
}
</script>

<template>
<v-container fluid>
  <v-slide-y-transition mode="out-in">

    <v-card>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-img v-if="stat.image" :src="stat.image" contain height="300" class="text-xs-center"></v-img>

              <div v-if="!stat.image" class="text-xs-center">
                <v-img src="https://s3.us-east-2.amazonaws.com/pokemon-bracelet/unknown.png" height="300" contain></v-img>
                No Poke image here. <br> So just me
              </div>


              <v-card-title>
                <div class="headline">
                  <span v-if="stat.decorator">({{stat.decorator}}) </span>{{stat.name}}
                </div>
              </v-card-title>
              <v-card-text>
                <p>Rank: {{stat.rank}}</p>
                <p>Evolves From: {{stat.evolves_from}}</p>
                <p>Evolves Into: {{stat.evolves_into}}</p>
                <p>Type: {{stat.type}}</p>
                <p>Weakness: {{stat.weakness}}</p>
                <p>Likes: {{stat.likes}}</p>
                <p>Dislikes: {{stat.dislikes}}</p>
                <p>Gender: {{stat.gender}}</p>
                <p>Ball: {{stat.ball}}</p>
                <p>Collected at {{ stat.time_added | moment("dddd, MMMM Do YYYY hh:mm")}}</p>
                <p v-if="stat.time_edited">Edited at {{ stat.time_edited | moment("dddd, MMMM Do YYYY hh:mm")}}</p>
              </v-card-text>
              <v-divider light></v-divider>
              <v-card-actions class="pa-2">

                <router-link :to="{ name: 'PokeCollectionEditor', params: {key: key} }" tag="button" >
                  <v-icon flat color="white">edit</v-icon>
                </router-link>
                <vue-confirm-dialog ref="confirm"></vue-confirm-dialog>
                <div class="pa-3"></div>
                <v-icon flat color="white" @click="remove(key)" class="m-2">delete_forever</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
