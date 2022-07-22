<template>
  <div class="home">
    <v-container style="max-width:990px">
    
      <headernav />
      <v-layout wrap class="pt-12 d-flex align-start">
<v-flex xs12 md8 class="d-flex align-center ">
      <v-layout wrap>
<v-flex xs12 sm7>
    <v-textarea v-model="description" dense placeholder="Describe your area of interest" auto-grow filled row-height="36" rows="3"></v-textarea>
</v-flex>
<v-flex
     :class="$vuetify.breakpoint.smAndUp? 'pl-2': ''"
 xs12 sm5 class=" pb-0 align-center">
    <v-text-field hide-details v-model="incentive" prepend-inner-icon="mdi-currency-ngn"
      placeholder="Tutor Incentive" filled></v-text-field>
      <v-layout>
<v-flex xs6 style="overflow:hidden">
    <v-text-field type="date" hide-details v-model="date" 
      placeholder="Date" label="Date" filled></v-text-field>
</v-flex>
<v-flex xs6 style="overflow:hidden">
    <v-text-field type="time" hide-details v-model="time" 
      placeholder="Time" label="Time" filled></v-text-field>
</v-flex>
      </v-layout>
</v-flex>
    <v-text-field hide-details v-model="venue"
      placeholder="Venue" filled></v-text-field>
    <v-btn block color="#0b3054" :loading="loading" @click="create()" dark x-large  class="font-weight-bold my-6 text-capitalize my-2" >submit</v-btn>
      <v-flex xs12>
        <v-card :disabled="loading" color="grey lighten-5" @click="openLesson(n)" style="border-radius:5px"  hover v-for="(n,i) in lessons" class=" pa-3 mb-8" :key="i">
         <keep-alive>
          <v-layout>
            <v-avatar>
              <v-img :src="img2"></v-img>
            </v-avatar>
            <v-flex  class=" align-center px-3" xs12>
<div class="d-flex justify-space-between">
    <p class="grey--text text--darken-3 text-capitalize font-weight-bold">{{n.description | description}} </p>
    <p style="font-size:10px" class="text-right">{{n.created_at| myDate}}</p>
</div>
             <div class="d-flex justify-space-between">
<p class="mb-0 grey--text">{{n.user.faculty}} - <span class=" grey--text text--darken-2 font-weight-medium">{{n.user.department}} - {{n.user.level}}lvl</span></p>

<p v-if="n.tutor !== null"  style="color:#0b3054" class="mb-0 text-right font-weight-medium">Tutor - {{n.tutor.name}}</p>
<p v-else style="color:#0b3054" class="mb-0 text-right font-weight-medium">N{{n.incentive | price}}</p>
               </div> 
               <p class="overline mt-4 mb-0"><span v-if="n.date">Date - {{n.date}}</span><span v-if="n.time"> | Time - {{n.time}}</span><span v-if="n.venue"> | Venue - {{n.venue}}</span></p>
            </v-flex>
          </v-layout>        
           </keep-alive>
        </v-card>
      </v-flex>
      </v-layout>
</v-flex>
<v-flex :class="$vuetify.breakpoint.smAndUp? 'pl-4': ''" xs12 md4>
<adcard />
</v-flex>
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
  name: 'Home',
     components: {
    headernav,
    adcard,
    },
  data: () => ({
    loading:false,
    incentive: '',
    description: '',
    time: '',
    date: '',
    venue: '',
    img2: "https://res.cloudinary.com/base-uni/image/upload/v1658076722/alpha_connect/C7E03945-30FB-49E5-90AF-FE6D67322900_kegufu.png",
  }),
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
  mounted(){
this.getLessons()
  },
  methods:{
    getLessons(){
      axios.get('lesson').then((res)=>{
  this.lessons = res.data.lessons
})
    },
    openLesson(x){
this.lesson = x
this.$router.push('lesson/'+x.id)

},
    create(){
      if (this.token) {
      this.loading = true
      axios.post('lesson/create', {
        description: this.description,
        incentive: this.incentive,
        venue: this.venue,
        time: this.time,
        date: this.date,
        user_id: this.user.id
      }).then(()=>{
      this.loading = false
        alert('Your Submission was successful')
        this.getLessons()
        this.description = ''
        this.incentive = ''
      }).catch(()=>{
        alert('An error occured')
        this.loading = false
      })
      }else{
        this.$router.push('/signup')
      }
    }
  }
}
</script>
