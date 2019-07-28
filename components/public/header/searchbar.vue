<template>
  <div class="search-panel">
    <a-row class="m-header-searchbar">
      <a-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"
        >
      </a-col>
      <a-col :span="15" class="center">
        <div class="wrapper">
          <a-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @change="input"
          />
          <a-button type="primary" class="wl-button--primary" icon="search" />
          <dl
            v-if="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd
              v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList"
          >
            <dd
              v-for="(item,idx) in searchList"
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout"
            >
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie"
            >
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel"
            >
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment"
            >
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business"
            >
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </a-col>
      <a-col
        :span="6"
        class="right"
      >
        <ul class="security">
          <li>
            <i class="refund" /><p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" /><p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" /><p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  components: {
  },
  data() {
    return {
      search: '',
      isFocus: false,
      searchList: []
    }
  },
  computed: {
    isHotPlace: function () {
      return this.isFocus && !this.search
    },
    isSearchList: function () {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    input: _.debounce(async function () {
      const city = this.$store.state.geo.position.city.replace('市', '')
      this.searchList = []
      const { status, data: { top } } = await axios.get('/serach/top', {
        params: {
          input: this.search,
          city
        }
      })
      if (status === 200) {
        this.searchList = top.slice(0, 10)
      }
    }, 300)
  }
}
</script>
<style lang="scss">
.ant-layout-header {
  line-height: inherit;
}
</style>
