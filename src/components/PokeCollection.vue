<script>
import PokeService from '@/services/poke.srv'
import Vue from 'vue'
import _ from 'lodash'
Vue.use(require('vue-moment'));

export default {
  data() {
    return {
      pokeStats: {
        items: []
      },
      sort_options: [
        'Name A-Z',
        'Name Z-A',
        'Rank Lowest to Highest',
        'Rank Hightest to Lowest',
        'Time Created Oldest to Newest',
        'Time Created Newest to Oldest',
      ],
      default_sort: 'Name A-Z',
      querytext: '',
      page: 1,
      pagination: {
        itemsPerPage: 10,
        totalItems: 0,
        currentPage: 1,
        pages: 0
      }
    }
  },
  watch: {
    // whenever question changes, this function will run
    '$route' (to, from) {
      console.log(to)
      this.page = this.$route.params.page || 1;
      this.pagination.currentPage = parseInt(this.page);
      this.getAll(parseInt(this.page))
      // react to route changes...
    }
  },
  mounted() {
    this.loadPage();
  },

  methods: {
    loadPage(page) {
      this.page = this.$route.params.page || 1;
      this.pagination.currentPage = parseInt(this.page);
      PokeService.getCount().then((total) => {
        this.pagination.totalItems = total;
        this.pagination.pages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage)
        this.getAll(parseInt(this.page))
      })
    },

    getAll(page) {
      if (page === 1) {
        return PokeService.getAll().then((data) => {
          this.pokeStats.items = data
        })
      }

      return this.getPage(page)
    },

    goToPage(page) {
      this.$router.push({
        name: 'PokeCollection',
        params: {
          page: page
        }
      })
    },

    getPage(page) {
      PokeService.getAll('name', page).then((data) => {
        let count = this.pagination.itemsPerPage;
        if (page * this.pagination.itemsPerPage > this.pagination.totalItems) {
          count = this.pagination.totalItems - ((page - 1) * this.pagination.itemsPerPage)
        }
        Vue.set(this.pokeStats, 'items', _.takeRight(data, count))
      })
    },

    remove(key) {
      PokeService.removeStatByKey(key).then(() => {
        this.loadPage();
      })
    },

    filterPokemons(query) {
        if (query.length >= 3) {
          PokeService.filterStatsByQueryText(query).then(() => {

          })
          return
        }

        if (query.length === 0) {
          this.loadPage()
        }
    },

    search() {
      _.debounce(() => {
        console.log('inde', this.querytext);
        if (this.querytext) {
          this.filterPokemons(this.querytext);
        }
      }, 1000)()
    }
  }
}
</script>
<template>
<v-container fluid>
  <v-slide-y-transition mode="out-in">
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Pokemon Stats
                    <router-link :to="{ name: 'PokeCollectionAdd'}" tag="button">
                      <v-icon class="white--text">add_box</v-icon>
                    </router-link>
                  </div>
                  <span>I won the pokes after i won the battle</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-toolbar dense xs12>
              <v-text-field hide-details prepend-icon="search" v-model="querytext" single-line class="white--text" v-on:input="search"></v-text-field>

              <v-spacer></v-spacer>
              <v-combobox v-model="default_sort" :items="sort_options" label="Sort By"></v-combobox>
            </v-toolbar>
          </v-flex>

          <v-flex xs12 v-for="(stat, index) in pokeStats.items" :key="stat.key">
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
                      <div>Evolves From: {{stat.evolves_from}}</div>
                      <div>Type: {{stat.type}}</div>
                      <div>Weakness: {{stat.weakness}}</div>
                      <div>Likes: {{stat.likes}}</div>
                      <div>Dislikes: {{stat.dislikes}}</div>
                      <div>Gender: {{stat.gender}}</div>
                      <div>Ball: {{stat.ball}}</div>
                      <div>Collected at {{ stat.time_added | moment("dddd, MMMM Do YYYY")}}</div>
                      <div>
                        <router-link :to="{ name: 'PokeCollectionEditor', params: { key: stat.key, page: pagination.currentPage}}" tag="button">
                          <v-icon size="20" light color="white">edit</v-icon>
                        </router-link>
                        <v-icon size="20" light color="white" @click="remove(stat.key)">delete_forever</v-icon>
                      </div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
            <v-divider></v-divider>

          </v-flex>

          <v-flex xs8>
            <v-card>
              <v-card-text>
                <v-pagination v-model="pagination.currentPage" :length="pagination.pages" @input='goToPage'></v-pagination>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
