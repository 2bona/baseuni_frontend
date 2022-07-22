<template>
  <div class="mycourses">
    <v-container style="max-width:990px">
           <headernav />

      <v-layout wrap class="pt-12 d-flex align-start">
<v-flex xs12 md8 class="d-flex align-center ">
      <v-layout wrap>
<p class=" grey--text " style="font-size:20px">My Lessons</p>
      <v-flex xs12>
        <v-card :disabled="loading" style="border-radius:10px"  v-for="(n, i) in my_lessons" class=" pa-4 mb-8" :key="i">
         <keep-alive>

          <v-layout>
            <v-avatar>
              <v-img :src="img"></v-img>
            </v-avatar>
            <v-flex  class=" align-center px-3" xs12>
<div class="d-flex justify-space-between">
    <p class="grey--text text--darken-3 text-capitalize font-weight-bold">{{n.description}} </p>
    <p style="font-size:10px">{{n.created_at | myDate}}</p>
</div>
             <div class="d-flex justify-space-between">
               <v-btn small  :disabled="loading" depressed @click="deleteLesson(n.id)"><v-icon color="red">mdi-trash-can</v-icon></v-btn>
<p class="mb-0 grey--text text--darken-1 font-weight-medium">N{{n.incentive | price}}</p>
<p v-if="n.tutor !== null"  style="color:#0b3054" class="mb-0  font-weight-medium">Tutor - {{n.tutor.name}}</p>
               </div> 
                              <p class="overline mt-4 mb-0"><span v-if="n.date">Date - {{n.date}}</span><span v-if="n.time"> | Time - {{n.time}}</span><span v-if="n.venue"> | Venue - {{n.venue}}</span></p>

            </v-flex>
          </v-layout>         </keep-alive>

        </v-card>
        <p v-if="!my_lessons.length && !loading">No Lessons Yet</p>
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
import axios from "axios";
const headernav = () => import("../components/headernav.vue");
const adcard = () => import("../components/adcard.vue");

// @ is an alias to /src

export default {
  name: 'mycourses',
   components: {
    headernav,
    adcard,
    },
  data: () => ({
    loading:false,
    img: "https://res.cloudinary.com/base-uni/image/upload/v1658076824/alpha_connect/GWC_ALt_logo_1_zkglzr.png"
  }),
     computed:{
    lesson(){
      return this.$store.getters.getLesson
    },
        my_lessons: {
      get() {
        return this.$store.getters.getMyLessons;
      },
      set(val) {
        this.$store.dispatch("setMyLessons", val);
      }
    },
     },
     mounted(){
       this.getmylessons()
     },
  methods:{
    deleteLesson(x){
      this.loading = true
      axios.get('lesson/delete?id='+x).then(()=>{
        this.getmylessons()
      alert('Lesson has been deleted');
      this.loading = false
      })
    },
    getmylessons(){
      this.loading = true
      axios.get('lesson/my_lessons').then((res)=>{
        this.my_lessons = res.data.lessons
      this.loading = false
       })
    }
  }
}
</script>
