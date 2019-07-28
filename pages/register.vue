<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"
        />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <a-button
              type="primary"
              size="small"
            >登录</a-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <a-form
        ref="ruleForm"
        :form="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <a-form-item
          label="昵称"
          prop="name"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{
                  required: true, message: '请输入昵称',
                }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          prop="email"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: '请输入合法的邮箱',
                }, {
                  required: true, message: '请输入邮箱'
                }]
              }
            ]"
          />
          <a-button
            size="small"
            @click="sendMsg"
          >
            发送验证码
          </a-button>
          <span class="status">{{ statusMsg }}</span>
        </a-form-item>
        <a-form-item
          label="验证码"
          prop="code"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'code',
              {
                rules: [{required: true, message: '请输入验证码'}]
              }
            ]"
            maxlength="4"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          prop="pwd"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'pwd',
              {
                rules: [{
                  required: true, message: '请输入密码',
                }, {
                  validator: validateToNextPassword,
                }],
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          prop="cpwd"
          v-bind="formItemLayout"
        >
          <a-input
            v-decorator="[
              'cpwd',
              {
                rules: [{
                  required: true, message: '请输入确认密码',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item class="aaa" label=" " v-bind="formItemLayout">
          <a-button
            type="primary"
            @click="register"
          >
            同意以下协议并注册
          </a-button>
          <div class="error">
            {{ error }}
          </div>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank"
          >《美团网用户协议》</a>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'
export default {
  layout: 'empty',
  data() {
    return {
      statusMsg: '',
      error: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    sendMsg: function () {
      const form = this.form
      if (form.getFieldValue('name') && form.getFieldValue('email')) {
        axios.post('/users/verify', {
          username: encodeURIComponent(form.getFieldValue('name')),
          email: form.getFieldValue('email')
        }).then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) {
            const count = 60
            this.statusMsg = `验证码已发送,剩余${count}秒`
            this.timerid = setInterval(() => {
              this.statusMsg = `验证码已发送,剩余${count}秒`
              if (count === 0) {
                clearInterval(this.timerid)
              }
            }, 1000)
          } else {
            this.statusMsg = data.msg
          }
        })
      }
    },
    register: function () {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
        axios.post('/users/signup', {
          username: window.encodeURIComponent(fieldsValue.name),
          password: CryptoJS.MD5(fieldsValue.pwd).toString(),
          email: fieldsValue.email,
          code: fieldsValue.code
        }).then(({
          status,
          data
        }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              this.$router.push('/login')
            } else {
              this.error = data.msg
            }
          } else {
            this.error = `服务器出错，错误码:${status}`
          }
          setTimeout(function () {
            this.error = ''
          }, 1500)
        })
      })
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('pwd')) {
        callback('两次输入密码不一致')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['cpwd'], { force: true })
      }
      callback()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
.aaa /deep/ .ant-form-item-label label {
    color: #ffffff;
}
</style>
