<template>
  <div class="slide">
    <a-carousel arrows autoplay>
      <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon :name="props" type="left-circle" />
      </div>
      <div
        slot="nextArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon :name="props" type="right-circle" />
      </div>
      <div
        v-for="item in list"
        :key="item.img"
      >
        <img :src="item.img" alt="">
      </div>
    </a-carousel>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [{
        url: '#abc',
        img: 'http://p0.meituan.net/codeman/00c8bc1c25fbcc6d0651b29a2057a8c1560658.png'
      }, {
        url: '#bsbsb',
        img: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
      }, {
        url: '#sjfkajfj',
        img: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
      }, {
        url: '#sjfkajfja',
        img: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg'
      }, {
        url: '#kjljj',
        img: 'http://p1.meituan.net/codeman/bb0abb3435a60c44d87e90ed4237b61039329.jpg'
      }]
    }
  }
}
</script>
<style lang="scss">
    .ant-carousel /deep/ .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: transparent;
        opacity: 0.7;
    }
    .ant-carousel /deep/ .custom-slick-arrow:before {
        display: none;
    }
    .ant-carousel /deep/ .custom-slick-arrow:hover {
        opacity: 0.9;
    }
    .ant-carousel /deep/ .slick-slide  img {
        width: 100%;height: 240px;
    }
</style>
