<script>
import PokeService from '@/services/poke.srv'
import PokeStat from '@/components/component/stat'

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
      default_sort: {
        value: 'name',
        label: 'Name'
      },
      querytext: '',
    }
  },
  components: {
    'poke-stat': PokeStat
  },
  mounted() {
    this.querytext = this.$route.params.query;
    this.loadFilteredResults('name', this.querytext);
  },

  methods: {
    loadFilteredResults(orderBy = 'name', querytext) {
      PokeService.getSearchResults(orderBy, querytext)
        .then((items) => {
          this.pokeStats.items = items;
        })
    },

    remove(key) {
      PokeService.removeStatByKey(key).then(() => {
        this.loadPage();
      })
    },

    filterPokemons(query) {
      if (query.length > 0) {
        return this.loadFilteredResults(query);
      }

      return this.goBackToPokeStats();
    },

    goBackToPokeStats() {
      return this.$router.push({
        name: 'PokeCollection',
        params: {
          page: 1
        }
      });
    },

    onSortChange(sortBy) {
      this.loadFilteredResults(sortBy.value, this.querytext)
    },

    onKeyUp(event, sortBy, querytext) {
      if (!querytext) {
        return this.goBackToPokeStats();
      }

      if (event.key === 'Enter') {
        this.loadFilteredResults(sortBy.value, querytext)
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
                  <div class="headline">Pokemon Stats Search Results
                  </div>
                  <span>I won the pokes after i won the battle</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-toolbar dense xs12>
              <v-flex xs7>
                <v-text-field hide-details v-model="querytext" single-line class="white--text" v-on:keyup="onKeyUp($event, default_sort, querytext)"></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-icon @click="filterPokemons(querytext)">search</v-icon>
              </v-flex>
              <v-spacer></v-spacer>
              <v-combobox v-model="default_sort" :items="sort_options" item-text="label" return-object label="Sort By" @change="onSortChange(default_sort)"></v-combobox>
            </v-toolbar>
          </v-flex>
          <v-flex xs12 v-if="pokeStats.items.length === 0">
            Sorry, no poke stats can be found for your search of <b>{{this.querytext}}</b>;
          </v-flex>
          <v-flex xs12 v-for="(stat, index) in pokeStats.items" :key="stat.key">
            <poke-stat :stat="stat"></poke-stat>
            <v-divider></v-divider>

          </v-flex>

        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
