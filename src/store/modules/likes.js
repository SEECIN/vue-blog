import store from 'store'
import Vue from 'vue'
const LIKES_NAME = process.env.VUE_APP_LIKES_NAME
export default {
  namespaced: true,
  state: {
    likes: store.get(LIKES_NAME)
  },
  getters: {
    hadLike: state => (aid) => {
      return !!(state.likes?.includes(aid))
    }
  },
  mutations: {
    CHANGE_LIKES (state) {
      state.likes = store.get(LIKES_NAME)
    }
  },
  actions: {
    pushLikes ({ commit }, payload) {
      let { aid } = payload
      if (aid) {
        let localLikes = store.get(LIKES_NAME) || []
        let idx = localLikes.indexOf(aid)
        if (idx === -1) {
          localLikes.push(aid)
        }
        store.set(LIKES_NAME, localLikes)
        commit('CHANGE_LIKES')
      }
    },
    pullLikes ({ commit }, payload) {
      let { aid } = payload
      if (aid) {
        let localLikes = store.get(LIKES_NAME) || []
        let idx = localLikes.indexOf(aid)
        if (idx !== -1) {
          localLikes.splice(idx, 1)
        }
        store.set(LIKES_NAME, localLikes)
        commit('CHANGE_LIKES')
      }
    },
    async updateLikes ({ state }, { aid }) {
      console.log(state);
      await Vue.prototype.$api({ type: 'articleLikes', data: { id: aid } })
    }

  },
  modules: {
  }
}