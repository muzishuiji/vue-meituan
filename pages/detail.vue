<template>
  <div class="page-detail">
    <a-row>
      <a-col :span="24">
        <crumbs
          :keyword="keyword"
          :type="type"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <summa :meta="product" />
      </a-col>
    </a-row>
    <a-row class="m-title">
      <a-col :span="24">
        <h3>商家团购及优惠</h3>
      </a-col>
    </a-row>
    <a-row v-if="canOrder">
      <a-col :span="24">
        <list
          v-if="login"
          :list="list"
        />
        <div
          v-else
          class="deal-need-login"
        >
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看"
          >
          <span>请登录后查看详细团购优惠</span>
          <a-button
            type="primary"
          >
            <a href="/login">立即登录</a>
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components: {
    Crumbs,
    Summa,
    List
  },
  computed: {
    canOrder: function () {
      return this.list.filter(item => item.photos.length).length
    }
  },
  async asyncData(ctx) {
    const { keyword, type } = ctx.query
    const { status, data: { product, more: list, login } } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      return {
        keyword: '生日蛋糕',
        product,
        type: '美食',
        list,
        login
      }
    } else {
      return {
        keyword: '生日蛋糕',
        product: {},
        type: '美食',
        list: [],
        login: false
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
