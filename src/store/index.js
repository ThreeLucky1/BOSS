import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    manage: true
  },
  mutations: {
    setManage(state, payload) {
      state.manage = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
