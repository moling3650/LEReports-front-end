import Vue from 'vue'
import Vuex from 'vuex'
import reports from '@/store/modules/reports'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    reports
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
