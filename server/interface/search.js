import Router from 'koa-router'
import Poi from '../dbs/modules/poi'
const router = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  try {
    const top = await Poi.find({
      name: ctx.query.input,
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map((item) => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})
router.get('/hotPlace', async (ctx) => {
  // const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    const result = await Poi.find({
      type: ctx.query.type || '丽人'
    }).limit(10)
    ctx.body = {
      code: 0,
      result: result.map((item) => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  await setTimeout(() => {
    ctx.body = {
      count: 0,
      pois: []
    }
  }, 100)
})

const product = {
  photos: [
    {
      url: 'http://p0.meituan.net/scarlett/dd40062805e73a876692b9589339b1c6223571.png@600w_600h_1l',
      title: '图片1'
    },
    {
      url: 'http://p0.meituan.net/mogu/a66fdf98f1678a4fe53fc2abbccd096b71477.jpg@600w_600h_1l',
      title: '图片2'
    }
  ],
  name: '杭州浪浪浪水公园',
  biz_ext: {
    ticket_ordering: 10,
    cost: 100,
    rating: 4.0,
    localCost: 280,
    location: [30.164936, 120.274957],
    address: '萧山区新螺路新塘街道塘里陈社区农商银行斜对面',
    tel: '18758065329'
  },
  deadline: '2019-08-25'
}
const more = [
  {
    photos: [
      {
        url: 'http://p0.meituan.net/208.126/deal/5d940d170d9cbb3b0b81968832311cd6408362.jpg@100w_100h_1e_1c',
        title: '图片1'
      }
    ],
    name: '<span>水果缤纷8英寸蛋糕--领先推出蛋糕店送货上门贴心服务的理念,同城3公里可免费配送到家!1个，约8英寸，圆型</span>',
    biz_ext: {
      ticket_ordering: 10,
      cost: 79,
      localCost: 96
    },
    deadline: '2019-08-25'
  },
  {
    photos: [
      {
        url: 'http://p1.meituan.net/208.126/deal/55f1e3dc9d25cb14d36eeb0db0d2418998477.jpg@100w_100h_1e_1c',
        title: '图片2'
      }
    ],
    name: '12英寸彩虹生日蛋糕--领先推出蛋糕店送货上门贴心服务的理念,同城3公里可免费配送到家!1个，约12英寸，圆型',
    biz_ext: {
      ticket_ordering: 20,
      cost: 155,
      localCost: 176
    },
    deadline: '2019-08-25'
  },
  {
    photos: [
      {
        url: 'http://p0.meituan.net/208.126/deal/987ecd1b0a15a17a83fb37d1d379451082343.jpg@100w_100h_1e_1c',
        title: '图片3'
      }
    ],
    name: '8英寸欧式水果生日蛋糕--领先推出蛋糕店送货上门贴心服务的理念,同城3公里可免费配送到家！1个，约8英寸，圆型',
    biz_ext: {
      ticket_ordering: 30,
      cost: 89.9,
      localCost: 156
    },
    deadline: '2019-08-29'
  },
  {
    photos: [
      {
        url: 'http://p0.meituan.net/208.126/deal/982ee1de2310335949d27c5aeec2336140331.jpg@100w_100h_1e_1c',
        title: '图片4'
      }
    ],
    name: '杭州浪浪浪水公园',
    biz_ext: {
      ticket_ordering: 40,
      cost: 99,
      localCost: 136
    },
    deadline: '2019-08-30'
  },
  {
    photos: [
      {
        url: 'http://p0.meituan.net/208.126/deal/37a1465fa80770e8e19d940ed1cf6a92108374.jpg@100w_100h_1e_1c',
        title: '图片5'
      }
    ],
    name: '10英寸乳脂水果蛋糕--领先推出蛋糕店送货上门贴心服务的理念,同城3公里可免费配送到家。1个，约10英寸，圆型',
    biz_ext: {
      ticket_ordering: 50,
      cost: 127,
      localCost: 158
    },
    deadline: '2019-08-31'
  }
]
router.get('/products', async (ctx) => {
  await setTimeout(() => {
    ctx.body = {
      product: product || {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }, 100)
})

export default router
