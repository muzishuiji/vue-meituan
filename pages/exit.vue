<template>
  <div class="" />
</template>
<script>
import axios from 'axios'
export default {
  layout: 'empty',
  middleware: async (ctx) => {
    const { status, data } = await axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
