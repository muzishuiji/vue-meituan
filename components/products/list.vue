<template>
  <div class="m-product-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.active ? 's-nav-active' : '']"
        @click="navSelect(item)"
      >
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <item
        v-for="(item, idx) in list"
        :key="idx"
        :meta="item"
      />
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import Item from '@/components/products/item'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  async asyncData({ app }) {
    const { data } = await axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function (item) {
      item.acitve = true
    }
  }
}
</script>
