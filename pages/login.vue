<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        >
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">
          <i />{{ error }}
        </h4>
        <p><span>账号登录</span></p>
        <a-input v-model="username" prefix-icon="profile" />
        <a-input
          v-model="password"
          prefix-icon="password"
          type="password"
        />
        <div class="foot">
          <a-checkbox v-model="checked">
            7天内自动登录
          </a-checkbox>
          <b>忘记密码？</b>
        </div>
        <a-button
          class="btn-login"
          type="primary"
          size="small"
          @click="login"
        >
          登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  layout: 'empty',
  methods: {
    login: function () {
      axios.post('/users/signin', {
        username: window.encodeURIComponent(this.username),
        password: CryptoJS.MD5(this.password).toString()
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            location.href = '/'
          } else {
            self.error = data.msg
          }
        } else {
          self.error = `服务器出错`
        }
      })
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>
