<template>
  <div class="page-cart">
    <a-row>
      <a-col
        v-if="cart.length"
        :span="24"
        class="m-cart"
      >
        <list :cart-data="cart" />
        <p>应付金额: <em class="money">￥{{ total }}</em></p>
        <div class="post">
          <a-button
            type="primary"
            @click="submit"
          >
            提交订单
          </a-button>
        </div>
      </a-col>
      <a-col
        v-else
        class="empty"
      >
        购物车为空
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from 'axios'
import List from '@/components/cart/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      cart: []
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach((item) => {
        total += item.price * item.count
      })
      return total
    }
  },
  async asyncData(ctx) {
    const { status, data: { code, data: { name, price } } } = await axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    if (status === 200 && code === 0 && name) {
      return {
        cart: [{
          name,
          price,
          count: 1
        }],
        cartNo: ctx.query.id
      }
    }
  },
  methods: {
    // 下单
    submit: async function () {
      const { status, data: { code, id } } = await axios.post('/order/createOrder', {
        count: this.cart[0].count,
        price: this.cart[0].price,
        id: this.cartNo
      })
      if (status === 200 && code === 0) {
        this.$alert(`恭喜您，已成功下单，订单号:${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: (action) => {
            location.href = '/order'
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
