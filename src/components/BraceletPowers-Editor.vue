<script>
import BraceletSrv from '@/services/bracelet.srv'
import {
  RefNames
} from '../services/firebase.srv'

const RefName = RefNames.braceletpowers;
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    key: '',
    stat_props: {
      name: '',
    },
  }),

  mounted() {
    const params = this.$route.params;
    this.key = params.key;
    if (this.isNew()) {
      return;
    }
    BraceletSrv.getStatByKey(RefName, this.key).then((data) => {
      this.stat_props = data;
    });
  },
  methods: {
    isNew() {
      return !this.key || this.key === 'new';
    },

    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          return
        }

        if (!this.isNew()) {
          BraceletSrv.updateStatByKey(RefName, this.key, this.stat_props);
          return this.goBackToBracelet(this.key)
        }
        this.stat_props.time_added = Date.now()
        BraceletSrv.save(RefName, this.stat_props)
          .then((newstat) => {
            this.goBackToBracelet(newstat.key)
          })
          .catch(error => {
            console.log(error)
          })
      });
    },

    goBackToBracelet(key) {
      return this.$router.push({
        name: 'BraceletPowers'
      });
    },

    cancel() {
      this.$router.go(-1);
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
              <v-card-title primary-title>
                <div>
                  <div class="headline">Add / Edit : Bracelet Powers</div>
                  <span>Say Something here, Yung</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <v-card class="grey--text">
              <form>
                <v-text-field v-validate="'required|max:100'" name='name' v-model="stat_props.name" :counter="100" :error-messages="errors.collect('name')" label="Name" data-vv-name="name" required>
                </v-text-field>

                <v-btn @click="submit">Submit</v-btn>
                <v-btn @click="cancel">Cancel</v-btn>
              </form>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

  </v-slide-y-transition>
</v-container>
</template>
