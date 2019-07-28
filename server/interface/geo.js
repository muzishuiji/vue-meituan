
import Router from 'koa-router'
import Province from '../dbs/modules/province'
import City from '../dbs/modules/city'
import Menu from '../dbs/modules/menu'
import axios from './utils/axios'

const router = new Router({
  prefix: '/geo'
})

const sign = 'AJskjfsdjfkjEakj19992sfS'

// 注册
router.get('/getPosition', async (ctx) => {
  await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  ctx.body = {
    province: '浙江省',
    city: '杭州市'
  }
})

router.get('/province', async (ctx) => {
  const province = await Province.find()
  ctx.body = {
    province: province.map((item) => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})
router.get('/province/:id', async (ctx) => {
  const city = await City.findOne({ id: ctx.params.id })

  ctx.body = {
    code: 0,
    city: city.value.map((item) => {
      return { province: item.province, id: item.id, name: item.name }
    })
  }
})

router.get('/city', async (ctx) => {
  let city = []
  const result = await City.find()
  result.forEach((item) => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map((item) => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})

router.get('/hotCity', async (ctx) => {
  const list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  const result = await City.find()
  let nList = []
  result.forEach((item) => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  })
  ctx.body = {
    hots: nList
  }
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu || []
  }
})

export default router
