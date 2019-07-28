<template>
  <a-row class="m-header m-header-topbar">
    <a-col :span="5">
      <header-geo />
    </a-col>
    <a-col :span="5">
      <header-user />
    </a-col>
    <a-col :span="14">
      <header-nav />
    </a-col>
  </a-row>
</template>

<script>
import HeaderGeo from './geo'
import HeaderUser from './user'
import HeaderNav from './nav'
export default {
  components: {
    HeaderGeo,
    HeaderUser,
    HeaderNav
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header/index.scss";
</style>
