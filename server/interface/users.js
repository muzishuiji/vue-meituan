import Router from 'koa-router'
import Redis from 'koa-redis'
import NodeMailer from 'nodemailer'
import User from '../dbs/modules/users'
import Email from '../dbs/config'
import passport from './utils/passport'
import axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

// 注册
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  if (code) {
    // 从redis去获取,和传过来的code比较
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (+new Date() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 验证用户名和密码
  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户已注册'
    }
    return
  }
  const nuser = await User.create({
    username,
    password,
    email
  })
  if (nuser) {
    const res = await axios.post('/users/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录
router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: 0,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登陆成功'
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: -1,
        msg: info
      }
      return false
    }
  })(ctx, next)
})

// 验证码
router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && +new Date() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁,一分钟内一次'
    }
    return false
  }
  const transporter = NodeMailer.createTransport({
    host: Email.smtp.host,
    pass: Email.smtp.pass,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  const mailOptions = {
    from: '认证邮件: <' + Email.smtp.user + '>',
    to: ko.email,
    subject: '美团网注册码',
    html: '你在美团网注册,你的邀请码是' + ko.code
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送,请注意查收'
  }
  return true
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户名
router.get('/getUser', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      code: 0,
      user: username,
      email
    }
  } else {
    ctx.body = {
      code: -1,
      user: '',
      email: ''
    }
  }
})

export default router
