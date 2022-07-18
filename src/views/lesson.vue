<template>
  <div class="lesson">
    <v-container style="max-width:990px">
        <headernav />
      <v-layout wrap class="pt-12 d-flex align-start">
<v-flex xs12 md8 class="d-flex align-center ">
      <v-layout wrap>

      <v-flex xs12>
        <v-card color="grey lighten-5" style="border-radius:5px"  class=" pa-4 mb-8">
         <keep-alive>
          <v-layout>
            <v-avatar>
              <v-img :src="img"></v-img>
            </v-avatar>
            <v-flex  class=" align-center px-3" xs12>
<div class="d-flex justify-space-between">
    <p class="grey--text text--darken-3 text-capitalize font-weight-bold">{{lesson.description}} </p>
    <p style="font-size:10px">{{lesson.created_at | myDate}}</p>
</div>
             <div class="d-flex justify-space-between">
<p class=" grey--text">{{lesson.user.faculty}} - <span class=" grey--text text--darken-2 font-weight-medium">{{lesson.user.department}}</span></p>
<p v-if="lesson.tutor !== null"  style="color:#0b3054" class="mb-0  font-weight-medium">Tutor - {{lesson.tutor.name}}</p>
<p v-else style="color:#0b3054" class="mb-0  font-weight-medium">N{{lesson.incentive | price}}</p>
                  </div> 
            </v-flex>
          </v-layout>       
            </keep-alive>
            <div class="d-flex justify-end">
<v-btn v-if="lesson.tutor == null "  @click="addTutor()" color="#0b3054" class="white--text font-weight-bold" dark>Tutor this student</v-btn>
            </div>
        </v-card>
      </v-flex>
      </v-layout>
</v-flex>
<v-flex :class="$vuetify.breakpoint.smAndUp? 'pl-4': ''" xs12 md4>
<adcard /></v-flex>
      </v-layout>


    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
const headernav = () => import("../components/headernav.vue");
const adcard = () => import("../components/adcard.vue");

export default {
  name: 'lesson',
    components: {
    headernav,
    adcard,
    },
  data: () => ({
      
    img: "https://res.cloudinary.com/base-uni/image/upload/v1658076824/alpha_connect/GWC_ALt_logo_1_zkglzr.png"
  }),
  mounted(){
      if (!this.lesson.id) {
        //   this.getLesson()
      }
  },
    computed:{
    token(){
      return this.$store.getters.getToken
    },
    user(){
      return this.$store.getters.getUser
    },
        lesson: {
      get() {
        return this.$store.getters.getLesson;
      },
      set(val) {
        this.$store.dispatch("setLesson", val);
      }
    },
        lessons: {
      get() {
        return this.$store.getters.getLessons;
      },
      set(val) {
        this.$store.dispatch("setLessons", val);
      }
    },
  },
  methods:{
      addTutor(){
          if (this.token) {
              
          
          axios.post('/lesson/add_tutor',{
              id: this.$route.params.id,
              tutor_id: this.user.id,
          }).then(()=>{
              alert('You have chosen to tutor this student')
          })
          }else{
              this.$router.push('/signup')
          }

      },
      getLesson() {
          axios.get('/lesson/get_lesson?id='+this.$route.params.id)
      }
  }
}
</script>
