<template>
  <div class="container">
    page is search
    <ul>
      <li v-for="(item, index) in $store.state.city.list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  },
  // 这个方法允许在服务器render之前请求异步数据,context整个vue实例
  async asyncData(context) {
    const { list } = await context.$axios.$get('/city/list')
    if (list && list.length > 0) {
      return { list: list }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
  .container {
    color: #ffffff;
    .less {
      color: #000;
    }
  }
</style>
