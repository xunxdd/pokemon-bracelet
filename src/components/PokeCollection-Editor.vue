<script>
import PokeService from '@/services/poke.srv'
import FileInput from '@/components/common/FileInput'
import FileUploadSrv from '@/services/fileupload.srv'

const awsBucket = 'https://s3.us-east-2.amazonaws.com/pokemon-bracelet/'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    'file-input': FileInput
  },
  data: () => ({
    key: '',
    page: 1,
    stat_props: {
      name: '',
      decorator: '',
      evolves_from: '',
      weakness: '',
      type: '',
      likes: '',
      dislikes: '',
      gender: '',
      ball: '',
      image: '',
    },
    genders: [{
        value: 'Female',
        label: 'Female'
      },
      {
        value: 'Male',
        label: 'Male'
      }
    ],
  }),

  mounted() {
    const params = this.$route.params;
    this.key = params.key;
    this.page = params.page || 1;
    if (!this.key) {
      return;
    }
    PokeService.getStatByKey(this.key).then((data) => {
      this.stat_props = data;
      console.log(this.stat_props)
    });
  },
  methods: {
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          return
        }

        if (this.key) {
          PokeService.updateStatByKey(this.key, this.stat_props);
          return this.goBackToPokePage()
        }

        PokeService.save(this.stat_props)
          .then(() => {
            console.log('saved')
            this.goBackToPokePage()
          })
          .catch(error => {
            console.log(error)
          })
      });
    },

    goBackToPokePage() {
      return this.$router.push({
        name: 'PokeCollection',
        params: {
          page: this.page || 1
        }
      });
    },

    cancel() {
      this.goBackToPokePage()
    },

    fileSelectedFunc(file, filename) {
      if (!file) {
        return
      }
      FileUploadSrv.sendFileData(file)
        .then((response) => {
          this.stat_props.image = `${awsBucket}${filename}`
        })
        .catch((error) => {
          console.log(error)
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
              <v-card-title primary-title>
                <div>
                  <div class="headline">Add A New Pokemon</div>
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
                <v-text-field v-model="stat_props.decorator" label="Breed (like Shiny or region. )" data-vv-name="breed"></v-text-field>
                <v-text-field v-model="stat_props.evolves_from" label="Evolves From" data-vv-name="evolves_from"></v-text-field>
                <v-text-field v-model="stat_props.type" label="Types" data-vv-name="type"></v-text-field>
                <v-text-field v-model="stat_props.weakness" label="Weaknesses" data-vv-name="weakness"></v-text-field>
                <v-text-field v-model="stat_props.likes" label="Likes" data-vv-name="likes"></v-text-field>
                <v-text-field v-model="stat_props.dislikes" label="Dislikes" data-vv-name="dislikes"></v-text-field>
                <!--
                  <v-text-field v-model="stat_props.image" label="Image" data-vv-name="image" hidden></v-text-field>
                -->
                <file-input title="Browse" allowedFileTypes=".jpg, .jpeg, .png" :selectedCallback="fileSelectedFunc">
                </file-input>
                <img :src="stat_props.image" v-if="stat_props.image" height="200" />
                <v-radio-group v-model="stat_props.gender" :row="true">
                  Gender:
                  <v-radio v-for="gender in genders" :key="gender.value" :label="gender.label" :value="gender.value"></v-radio>
                </v-radio-group>
                <v-text-field v-model="stat_props.ball" label="Poke ball"></v-text-field>
                <v-text-field type="number" v-model="stat_props.rank" label="Poke Rank"></v-text-field>

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
