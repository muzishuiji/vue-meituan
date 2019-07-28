<template>
  <div class="m-life">
    <a-row>
      <a-col :span="14">
        <slider />
      </a-col>
      <a-col :span="4">
        <div class="m-life-pic" />
      </a-col>
      <a-col :span="6">
        <div class="m-life-login">
          <h4>
            <img
              src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg"
              alt=""
            >
          </h4>
          <p class="m-life-login-name">
            Hi！你好
          </p>
          <p>
            <nuxt-link to="/register">
              <a-button>
                注册
              </a-button>
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/login">
              <a-button>
                立即登录
              </a-button>
            </nuxt-link>
          </p>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="7">
        <div class="m-life-hotel" />
      </a-col>
      <a-col :span="7">
        <div class="m-life-music" />
      </a-col>
      <a-col :span="4">
        <div class="m-life-coop" />
      </a-col>
      <a-col :span="6">
        <div class="m-life-downapp">
          <img
            src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"
            alt="下载APP"
          >
          <p>美团APP手机版</p>
          <h4><span class="red">1元起</span><em class="gary">吃喝玩乐</em></h4>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Slider from './slider.vue'
export default {
  components: {
    Slider
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/life.scss";
</style>
