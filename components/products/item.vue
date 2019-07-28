
<template>
  <dl class="s-item">
    <dt>
      <img
        src="meta.img"
        alt="上新图片"
      >
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path: 'detail', query: {keyword: meta.name, type: meta.module}}">
          {{ meta.name }}
        </nuxt-link>
      </h3>
      <a-rate
        v-model="meta.rate"
        disabled
      />
      <span v-if="meta.rate > 4" class="s-item-comment">很好</span>
      <span v-else-if="meta.rate > 3" class="s-item-comment">一般</span>
      <span v-else class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-price">￥{{ meta.price }}起</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li> -->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>
<script>
export default {
  data() {
    return {
      meta: {
        type: Array,
        default() {
          return []
        }
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
.m-product-categroy{
    padding: 15px 20px 0;
    background: #FFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
  .classic{
    display: flex;
    padding-bottom: 10px;
    >dt{
      width: 80px;
      &:nth-child(2){
        border-radius: 100px;
        background: #13D1BE;
        color: #FFF;
        height: 22px;
        line-height: 22px;
        width: 40px;
        box-sizing: border-box;
        margin-right: 40px;
        text-align: center;
      }
    }
    &:nth-child(1){
      dd{
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
