<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <a-rate
        v-model="rate"
        disabled
      />
      <span>{{ Number(meta.biz_ext.rating) }}分</span>
      <span>人均￥{{ Number(meta.biz_ext.cost) }}</span>
      <ul>
        <li @click="openMap(meta.location)">
          地址：{{ meta.address }}
        </li>
        <li>电话：{{ meta.tel }}</li>
      </ul>
    </dt>
    <dd>
      <a-carousel
        autoplay
        style="height: 214px;"
      >
        <div
          v-for="(item,idx) in meta.photos"
          :key="idx"
        >
          <h3>
            <img
              :src="item.url"
              alt="item.title"
              width="100%"
              height="100%"
            >
          </h3>
        </div>
      </a-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300)
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.biz_ext.rating)
    }
  },
  methods: {
    openMap: function (location) {

    }
  }
}
</script>
