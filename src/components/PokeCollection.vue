<script>
import PokeService from '@/services/poke.srv'
import PokeStat from '@/components/component/stat'
import Vue from 'vue'
import _ from 'lodash'

export default {
  data() {
    return {
      pokeStats: {
        items: []
      },
      sort_options: [{
          value: 'name',
          label: 'Name'
        },
        {
          value: 'rank',
          label: 'Rank'
        },
        {
          value: 'time_created',
          label: 'Time Created'
        }
      ],
      default_sort: 'Name',
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
  components: {
    'poke-stat': PokeStat
  },
  computed: {
    search_disabled: function() {
      return this.querytext.length === 0;
    }
  },

  watch: {
    // whenever question changes, this function will run
    '$route' (to, from) {
      console.log(to)
      this.page = this.$route.params.page || 1;
      this.pagination.currentPage = parseInt(this.page);
      this.getAll(parseInt(this.page))
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

    getPage(page, sortBy = 'name') {
      PokeService.getAll(sortBy, page).then((data) => {
        let count = this.pagination.itemsPerPage;
        if (page * this.pagination.itemsPerPage > this.pagination.totalItems) {
          count = this.pagination.totalItems - ((page - 1) * this.pagination.itemsPerPage)
        }
        Vue.set(this.pokeStats, 'items', _.takeRight(data, count))
      })
    },

    onSortChange(sortBy) {
      this.getPage(1, sortBy.value)
    },

    onKeyUp(event) {
      if (event.key === 'Enter' && this.querytext) {
        this.$router.push({
          name: 'PokeCollectionFiltered',
          params: {
            query: this.querytext
          }
        })
      }
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
              <v-flex xs6>
                <v-text-field placeholder="Add search text to start search" hide-details v-model="querytext"
                v-on:keyup="onKeyUp"
                single-line class="white--text"></v-text-field>
              </v-flex>
              <v-flex xs1>
                <router-link v-if="querytext" :to="{ name: 'PokeCollectionFiltered', params: {query: querytext} }" tag="button" :disabled="search_disabled">
                  <v-icon :disabled="search_disabled">search</v-icon>
                </router-link>
              </v-flex>
              <v-spacer></v-spacer>
              <v-combobox v-model="default_sort" :items="sort_options" item-text="label" return-object label="Sort By" @change="onSortChange(default_sort)"></v-combobox>
            </v-toolbar>
          </v-flex>
          <v-flex xs12>

          </v-flex>
          <v-flex xs12 v-for="(stat, index) in pokeStats.items" :key="stat.key">
            <poke-stat :stat="stat"></poke-stat>
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
