<template>
  <div class="m-header">
    <a-row>
      <a-col>
        <top-bar />
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <search-bar />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TopBar from './topbar'
import SearchBar from './searchbar'
export default {
  components: {
    TopBar,
    SearchBar
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
 @import "~assets/css/public/header/index.scss";
</style>
