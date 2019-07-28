<template>
  <div class="page-index">
    <a-row>
      <a-col :span="5">
        <emenu />
      </a-col>
      <a-col :span="19">
        <life />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <artistic />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Emenu from '../components/index/menu.vue'
import Life from '../components/index/life.vue'
import Artistic from '@/components/index/artistic.vue'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
 @import "~assets/css/index/index.scss";
</style>
