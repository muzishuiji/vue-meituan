<template>
  <div class="page-changeCity">
    <a-row>
      <a-col :span="24">
        <iSelect />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <hot />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <categroy />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Categroy from '@/components/changeCity/categroy.vue'
export default {
  components: {
    iSelect,
    Hot,
    Categroy
  }
}
</script>

<style lang="css">
</style>
