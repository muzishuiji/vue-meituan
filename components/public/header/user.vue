<template>
  <div class="m-user">
    <div v-if="user">
      欢迎您, <span class="username">{{ user }}</span>
      <nuxt-link to="/exit">
        退出
      </nuxt-link>
    </div>
    <div v-else>
      <nuxt-link class="login" to="/login">
        立即登录
      </nuxt-link>
      <span>|</span>
      <nuxt-link class="register" to="/register">
        注册
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: ''
    }
  },
  async mounted() {
    await axios.get('/users/getUser').then(({ status
      , data: { user } }) => {
      if (status === 200) {
        this.user = decodeURIComponent(user)
      }
    })
  },
  methods: {

  }
}
</script>
<style lang="scss">
</style>
