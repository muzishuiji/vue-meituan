import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import navbar from './modules/navbar'
import geo from './modules/geo'
import home from './modules/home'
Vue.use(Vuex)
export default () => new Vuex.Store({
  modules: {
    city,
    navbar,
    geo,
    home
  },
  mutations: {},
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      const {
        data: {
          province,
          city
        }
      } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', { city, province })
      const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])
      const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status3 === 200 ? result : [])
    }
  }
})
