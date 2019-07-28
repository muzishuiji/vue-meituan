<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{ name }} <a-icon type="caret-right" /></dt>
      <dd>
        <h3>{{ name }}</h3>
        <span
          v-for="(itme, idx) in list"
          :key="idx"
        >
          {{ item }}
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
