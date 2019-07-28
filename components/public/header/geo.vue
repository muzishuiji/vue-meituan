<template>
  <div class="m-geo">
    <a-icon type="environment" /> {{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
      切换城市
    </nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
    .ant-layout-header {
        background: #ffffff;
    }
</style>
