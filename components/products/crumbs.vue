<template>
  <div class="m-crumbs">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item href="/">
        {{ $store.state.geo.position.city.replace('市','') }}美团
      </a-breadcrumb-item>
      <a-breadcrumb-item href="/">
        {{ $store.state.geo.position.city.replace('市','') }}{{ decodeURIComponent(keyword) }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
}
</script>
