<template>
  <div class="m-order">
    <ul>
      <li v-if="cur.length">
        <a-row
          v-if="(item, idx) in cur"
        >
          <a-col :span="4">
            <img :src="item.img" alt="">
          </a-col>
          <a-col :span="10">
            <h4>{{ item.name }}</h4>
            <p>数量: {{ item.count }}</p>
          </a-col>
          <a-col :span="4">
            总价: $ {{ item.total }}
          </a-col>
          <a-col :span="6">
            {{ item.statusTxt }}
          </a-col>
        </a-row>
      </li>
      <li
        v-else
        class="empty"
      >
        没有订单
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    cur: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
