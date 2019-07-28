<template>
  <a-layout class="layout-default">
    <a-layout-header style="height: 197px;">
      <my-header />
    </a-layout-header>
    <a-layout-content>
      <nuxt />
    </a-layout-content>
    <a-layout-footer>
      <my-footer />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import MyHeader from '../components/public/header/index'
import MyFooter from '../components/public/footer/index'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
<style lang="scss">
  .ant-layout-footer {
    padding: 0
  }
</style>
