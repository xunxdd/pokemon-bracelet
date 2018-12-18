<script>
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: ''
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
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="/static/images/register-bg.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Welcome</h3>
            <div>Yay, I am so happy you want to play. I am going to speak pokese now</div>
          </div>
        </v-card-title>
        <v-card-text class="m-3">
          <v-text-field  class="m-3" v-model="user.name" label="User Name" placeholder="Username or email"></v-text-field>
          <v-text-field v-model="user.email" label="Email" placeholder="Email" type="email"></v-text-field>
          <v-text-field  class="m-3" v-model="user.name" label="User Name or Email" placeholder="Username or email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="pink">Take me in</v-btn>

        </v-card-actions>
        <v-btn flat color="grey" @click="" to="/login">Already a bracelet fan? Just let me in</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</v-card>

</v-slide-y-transition>
</v-container>
</template>
