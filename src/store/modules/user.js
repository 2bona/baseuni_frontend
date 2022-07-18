/* eslint-disable no-unused-vars */
// import store from "../../store"
import router from "../../router"
const axios = require("axios")

export const user = {
  state: {
      token: '',
      user: {},
      lessons:[],
      my_lessons:[],
      lesson:{}
  },
  actions: {
    setToken({ commit, state, dispatch }, data) {
        commit('setToken', data)
    },
    setLessons({ commit, state, dispatch }, data) {
        commit('setLessons', data)
    },
    setLesson({ commit, state, dispatch }, data) {
        commit('setLesson', data)
    },
    setMyLessons({ commit, state, dispatch }, data) {
        commit('setMyLessons', data)
    },
    setUser({commit}, data){
        commit('setUser', data)
    },
    logout({commit}, data){
        delete axios.defaults.headers.common["Authorization"]
        commit("setUser", {})
        commit("setToken", null)
        router.push("/")
    }
  
  },
  mutations: {
      setToken(state, data){
          state.token = data
      },
      setLessons(state, data){
          state.lessons = data
      },
      setLesson(state, data){
          state.lesson = data
      },
      setMyLessons(state, data){
          state.my_lessons = data
      },
      setUser(state, data){
          state.user = data
      },
  },
  getters: {
      getToken(state){
          return state.token
      },
      getLessons(state){
          return state.lessons
      },
      getLesson(state){
          return state.lesson
      },
      getMyLessons(state){
          return state.my_lessons
      },
      getUser(state){
          return state.user
      }
  }
}

