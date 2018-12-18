<script>
import vueConfirmDialog from '@/components/common/Confirm';
import BraceletSrv from '@/services/bracelet.srv'
import Vue from 'vue'
import {
  RefNames
} from '../services/firebase.srv'

export default {
  components: {
    'vue-confirm-dialog': vueConfirmDialog,
  },
  data() {
    return {
      bracelet: {
        items: []
      }
    }
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      BraceletSrv.getAll(RefNames.braceletholds, 'name').then((data) => {
        Vue.set(this.bracelet, 'items', data)
      });
    },

    remove(key) {
      this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {
        this.removeStat(key);
      })
    },

    removeStat(key) {
      BraceletSrv.removeStatByKey(RefNames.braceletholds, key).then(() => {
        this.loadItems();
      })
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
                  <div class="headline">Bracelet can hold ...
                    <router-link :to="{ path: '/braceletcanhold-editor/new'}" tag="button">
                      <v-icon class="white--text">add_box</v-icon>
                    </router-link>
                  </div>
                  <span>Bracelet has magic and can hold the following ...</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <vue-confirm-dialog ref="confirm"></vue-confirm-dialog>
          <v-list v-if="bracelet.items.length>0">
            <v-list-tile  v-for="(item, index) in bracelet.items" :key="item.key" avatar @click="">
              <v-list-tile-action>
                <img v-if="index % 2 === 0" src="static/icons/icons8-open-pokeball-48.png" height="25" />
                <img v-if="index % 2 === 1" src="static/icons/icons8-bracelet-48.png" height="35" />
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  <div>{{item.name}}</div>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div>
                    <router-link :to="{ name: 'BraceletCanHoldEditor', params: { key: item.key}}" tag="button">
                      <v-icon size="15" light color="gray">edit</v-icon>
                    </router-link>
                    <span class="p-2"></span>
                    <v-icon size="15" light color="gray" @click="remove(item.key)">delete_forever</v-icon>
                  </div>
                </v-list-tile-sub-title>

              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
