<template>
  <div class="d-flex align-center justify-space-between">
    <p @click="$router.push('/')" class="font-weight-bold mb-0" style="font-size: 20px">Alpha Connect</p>
    <v-btn v-if="token" to="/mylessons" depressed> my lessons </v-btn>

    <v-avatar @click="$router.push('/profile')" size="60" class="">
      <v-img :src="img2"></v-img>
    </v-avatar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "headernav",
 
  data: () => ({
      img2:'https://res.cloudinary.com/base-uni/image/upload/v1658076722/alpha_connect/C7E03945-30FB-49E5-90AF-FE6D67322900_kegufu.png'
  }),
     computed:{
    token(){
      return this.$store.getters.getToken
    },
     }
};
</script>
