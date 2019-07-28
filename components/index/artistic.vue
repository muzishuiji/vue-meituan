<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
      >
        全部
      </dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食"
      >
        约会聚餐
      </dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
      >
        丽人SPA
      </dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
      >
        电影演出
      </dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游"
      >
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
      >
        <a-card
          :body-style="{ padding: '0px' }"
          shadow="never"
        >
          <img
            :src="item.img"
            class="image"
          >
          <ul class="cbody">
            <li class="title">
              {{ item.title }}
            </li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥<em>{{ item.price }}</em><span>/起</span>
            </li>
          </ul>
        </a-card>
      </li>
    </ul>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      kind: 'all',
      cur: [],
      list: {
        all: [
          {
            title: '纯味烘焙开心手工蛋糕（西湖文化广场店）',
            img: 'https://p1.meituan.net/deal/d336b9908512a579d6b817db454ad6d11197469.jpg@368w_208h_1e_1c',
            pos: '西湖文化广场',
            price: '158'
          },
          {
            title: '储缘蛋糕（新塘街店）',
            img: 'https://p0.meituan.net/bbia/4476c225f6e072204042288f83e512c353303.jpg@368w_208h_1e_1c',
            pos: '城厢',
            price: '39'
          },
          {
            title: '纳德食尚自助餐厅',
            img: 'https://p0.meituan.net/msmerchant/ef194649d015b998f876221038ad77722355786.jpg@368w_208h_1e_1c',
            pos: '武林广场',
            price: '1040'
          },
          {
            title: '兔兔家私房千层雪蛋糕（半道红店）',
            img: 'https://p0.meituan.net/msmerchant/2b090f7f904b863f93de393c51168f1b596886.jpg@368w_208h_1e_1c',
            pos: '武林广场',
            price: '99'
          },
          {
            title: '必胜客（武林路店）',
            img: 'https://p1.meituan.net/msmerchant/bfe262afe900dc84e2de9902d1eb8e222117414.jpg@368w_208h_1e_1c',
            pos: '武林夜市',
            price: '88'
          },
          {
            title: '幸福西饼生日蛋糕（金惠路店）',
            img: 'https://p1.meituan.net/scarlett/7b5f675c70e84c66907759c9a559e5c8112620.jpg@368w_208h_1e_1c',
            pos: '加州阳光',
            price: '178'
          }
        ],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  methods: {
    over: async function (e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      // 事件委托
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        const keyword = dom.getAttribute('keyword')
        const { status, data: { count, pois } } = await axios.get('/search/resultsByKeywords', {
          params: {
            keyword,
            city: this.$store.state.geo.position.city
          }
        })
        if (status === 200 && count > 0) {
          const r = pois.filter(item => item.photos.length).map((item) => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost || '暂无',
              img: item.photos[0].url,
              url: '//abc.com'
            }
          })
          this.list[this.kind] = r.slice(0, 9)
        } else {
          this.list[this.kind] = []
        }
      }
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
