import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import likes from './modules/likes'
import store from 'store'
import http from '@/api/http'

Vue.use(Vuex)
const TOKEN_NAME = process.env.VUE_APP_TOKEN_NAME
export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME),
    userInfo: {},
    chatItemList:[],
    loginUsers:[]
  },
  getters: {
    userInfo (state) {
      if (state.token) {
        return state.userInfo
      }
    }
  },
  mutations: {
    SET_TOKEN (state) {
      state.token = store.get(TOKEN_NAME)
    },
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    },
    DELETE_TOKEN(state){
      state.token = ''
      store.remove(TOKEN_NAME)
    }
  },
  actions: {
    async login ({ dispatch, commit }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')
    },
    async logout ({ commit }) {
      commit('DELETE_TOKEN')
    },
    async getUserInfo ({ commit ,state}) {
      try {
        let userInfo = await http({ type: 'getUserInfo'})
        state.loginUsers.push(userInfo._id)
        commit('SET_USERINFO', userInfo)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
    modal,likes
  }
})
