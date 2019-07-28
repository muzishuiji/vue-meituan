<template>
  <div class="page-order">
    <a-row>
      <a-col
        :span="8"
      />
      <a-col
        :span="16"
      >
        <list :list="cur" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from 'axios'
import List from '@/components/order/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      cur: [],
      list: []
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach((item) => {
        total += item.price * item.count
      })
      return total
    }
  },
  async asyncData(ctx) {
    const { status, data: { code, list } } = await axios.post('/order/getOrder', {
      id: ctx.query.id
    })
    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].length.url : 'http://p0.meituan.net/mogu/a66fdf98f1678a4fe53fc2abbccd096b71477.jpg@600w_600h_1l',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          }
        }),
        cur: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].length.url : 'http://p0.meituan.net/mogu/a66fdf98f1678a4fe53fc2abbccd096b71477.jpg@600w_600h_1l',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          }
        })
      }
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/order/index.scss";
</style>
