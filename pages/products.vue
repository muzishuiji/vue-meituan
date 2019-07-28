<template>
  <a-row class="page-product">
    <a-col :span="19">
      <crumbs :keyword="keyword" />
      <category :types="types" :areas="areas" />
      <list :list="list" />
    </a-col>
    <a-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      />
    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'
import Crumbs from '@/components/products/crumbs'
import Category from '@/components/products/categroy'
import List from '@/components/products/list'
import Amap from '@/components/public/map'
export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  data() {
    return {
      keyword: '',
      types: [],
      areas: [],
      list: [],
      point: []
    }
  },
  async asyncData(ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    const { status, data: { count, pois } } = await axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    const { status: status2, data: { areas, types } } = await axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    if (status === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => {
          return {
            types: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
