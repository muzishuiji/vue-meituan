import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Order from '../dbs/modules/order'
import Cart from '../dbs/modules/cart'

const router = new Router({ prefix: '/order' })

router.post('/createOrder', async (ctx) => {
  const { id, price, count } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const findCart = await Cart.findOne({ cardNo: id })
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    })
    try {
      const result = await order.save()
      if (result) {
        await findCart.remove()
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1
      }
    }
  }
})

router.post('/getOrder', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    try {
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

export default router
