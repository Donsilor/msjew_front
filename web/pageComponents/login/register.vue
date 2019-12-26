<template>
  <div>
    <div v-if="language === 'zh_CN'" class="register-item">
      <div class="">
        <!-- 姓名 -->
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model="name"
              type="text"
              v-bind:class="{active:isActivename}"
              :placeholder="$t(`${lang}.name`)"
            />
          </div>
          <div class="error-tip">
            {{ $t(`${lang}.surnameTips`) }}
          </div>
        </div>
      </div>
      <!-- 手机号 -->
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="mobile"
            type="text"
            v-bind:class="{active:isActivemobile}"
            :placeholder="$t(`${lang}.mailbox`)"
          />
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.phoneTips`) }}
        </div>
      </div>
      <!-- 输入验证码 -->
      <div class="relative margin-bottom-20">
        <div class="row-flex">
          <div class="register-input margin-right-20">
            <input
              v-model="code"
              v-bind:class="{active:isActivecode}"
              type="text"
              :placeholder="$t(`${lang}.VerificationCode`)"
            />
          </div>
          <div class="send-email-code">
            <!-- <send-email-code :email="info.email"></send-email-code> -->
            <button  :class="['getCode', className]" :disabled="waiting" @click="sendPhoneCode">
              {{ waitingText }}
            </button>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.codeTips`) }}
        </div>
      </div>
      <!-- 设置密码 -->
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="password"
            v-bind:class="{active:isActivepwd}"
            class="padding-right-30"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t(`${lang}.pwdType`)"
          />
          <div class="password-eye" @click="changeRegisterPasswordStatus">
            <i v-show="!showPassword" class="iconfont iconcloes"></i>
            <i v-show="showPassword" class="iconfont iconopen"></i>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.passwordTips`) }}
        </div>
      </div>
      <!-- 确认密码 -->
      <div class="relative margin-bottom-40">
        <div class="register-input">
          <input
            v-model=" password_repetition"
            v-bind:class="{active:isActiverepwd}"
            class="padding-right-30"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t(`${lang}.repwdType`)"
          />
          <div class="password-eye" @click="changeRegisterPasswordStatus">
            <i v-show="!showPassword" class="iconfont iconcloes"></i>
            <i v-show="showPassword" class="iconfont iconopen"></i>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.passwordTips`) }}
        </div>
      </div>
      <div
        class="agreement row-flex align-item-start justify-center margin-bottom-10"
      >
        <el-checkbox v-model="agreement"></el-checkbox>
        <p class="agreement-content">
          {{ $t(`${lang}.checked`) }}
          <!-- <nuxt-link :to="{ path: '/policies/terms-and-conditions' }">
           {{ $t(`${lang}.rule`) }}
          </nuxt-link> -->
          <!-- <a href="/policies/terms-and-conditions" target="_blank">{{ $t(`${lang}.rule`) }}</a> -->
          <a href="/policies/terms-and-conditions" target="_blank">
            {{ $t(`${lang}.rule`) }}
          </a>
        </p>
      </div>
      <div class="margin-bottom-29">
        <button v-loading="requesting" class="submit" @click="registerCN">
          {{ $t(`${lang}.registration`) }}
        </button>
      </div>
    </div>
    <!-- 英文和繁体 -->
    <div v-else class="register-item">
      <div class="row-flex">
        <div class="relative margin-right-20 margin-bottom-20">
          <div class="register-input">
            <input
              v-model="firstname"
              type="text"
              :placeholder="$t(`${lang}.surname`)"
            />
          </div>
          <div class="error-tip">
            {{ $t(`${lang}.surnameTips`) }}
          </div>
        </div>
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model="lastname"
              type="text"
              :placeholder="$t(`${lang}.name`)"
            />
          </div>
          <div class="error-tip">
            {{ $t(`${lang}.nameTips`) }}
          </div>
        </div>
      </div>
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="email"
            type="text"
            :placeholder="$t(`${lang}.email`)"
          />
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.mailTips`) }}
        </div>
      </div>
      <div class="relative margin-bottom-20">
        <div class="row-flex">
          <div class="register-input margin-right-20">
            <input
              v-model="code"
              type="text"
              :placeholder="$t(`${lang}.code`)"
            />
          </div>
          <div class="send-email-code">
            <!-- <send-email-code :email="info.email"></send-email-code> -->
            <button  :class="['getCode', className]" :disabled="waiting" @click="sendCode">
              {{ waitingText }}
            </button>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.codeTips`) }}
        </div>
      </div>
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="password"
            class="padding-right-30"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t(`${lang}.password`)"
          />
          <div class="password-eye" @click="changeRegisterPasswordStatus">
            <i v-show="!showPassword" class="iconfont iconcloes"></i>
            <i v-show="showPassword" class="iconfont iconopen"></i>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.passwordTips`) }}
        </div>
      </div>
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="password_repetition"
            class="padding-right-30"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t(`${lang}.password`)"
          />
          <div class="password-eye" @click="changeRegisterPasswordStatus">
            <i v-show="!showPassword" class="iconfont iconcloes"></i>
            <i v-show="showPassword" class="iconfont iconopen"></i>
          </div>
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.passwordTips`) }}
        </div>
      </div>
      <div
        class="agreement row-flex align-item-start justify-center margin-bottom-10"
      >
        <el-checkbox v-model="agreement"></el-checkbox>
        <p class="agreement-content">
          {{ $t(`${lang}.checked`) }}
          <nuxt-link :to="{ path: '/policies/terms-and-conditions' }">
            {{ $t(`${lang}.rule`) }}
          </nuxt-link>
        </p>
      </div>
      <div class="margin-bottom-29">
        <button v-loading="requesting" class="submit" @click="register">
          {{ $t(`${lang}.registration`) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
import qs from "qs";
const lang = 'login'
const langcode = 'components.sendEmailCode'
const defaultTime = 5
export default {
  mixins: [Input],
  props: {
    className: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    type: {
      type: String,
      required: false,
      default: 'send',
      validator(value) {
        return ['send', 'reset'].includes(value)
      }
    }
  },
  data() {
    return {
      lang,
      langcode,
      waitingTime: defaultTime,
      waiting: false,
      waitingText: this.$t(`${langcode}.sendCode`),
      firstname: '',
      lastname: '',
      name: '',
      mobile: '',
      email: '',
      code: '',
      password: '',
      showPassword: true,
      password_repetition:'',
      agreement: true,
      requesting: false,
      language: '',
      isActivename:false,
      isActivemobile:false,
      isActivecode:false,
      isActivepwd:false,
      isActiverepwd:false
    }
  },
  computed: {},
  mounted() {
    this.language = this.getCookie('language')
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    // 查询cookie
    getCookie(cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    changeRegisterPasswordStatus() {
      const info = JSON.parse(JSON.stringify(this.info))
      info.showPassword = !info.showPassword
      this.info = info
    },
    // 简体中文注册
    registerCN() {
      const _this = this
      // _this.$router.replace({
      //   path: '/login',
      //   query: {
      //     type: 'login'
      //   }
      // })
      if (!_this.name) {
        _this.isActivename=true;
      }
      if (!_this.mobile) {
        _this.$errorMessage(_this.$t(`${lang}.mailTips`))
      }
      if (!_this.code) {
        _this.$errorMessage(_this.$t(`${lang}.codeTips`))
      }
      if (!_this.password) {
        _this.$errorMessage(_this.$t(`${lang}.pwdType`))
      }
       if (!_this.password_repetition) {
        _this.$errorMessage(_this.$t(`${lang}.pwdType`))
      }
      _this.requesting = true
      this.$axios({
          method: 'post',
          url: '/web/site/mobile-register',
          data: {
            'mobile':_this.mobile,
            'code':_this.code,
            'password':_this.password,
            'password_repetition':_this.password_repetition
          }
        })
        .then(res => {
          console.log('dddd',res)
          if(res.code==200){
            _this.requesting = false
            _this.$successMessage(_this.$t(`${lang}.registrySuccessful`))
            _this.$router.replace({
              path: '/index',
              query: {
                type: 'register'
              }
            })
          }
        })
        .catch(err => {
          console.log("请求",err)
          _this.requesting = false
          _this.$errorMessage(err.message)
        })
    },
    register() {
      const _this = this
      _this.$router.replace({
        path: '/login',
        query: {
          type: 'login'
        }
      })
      // if (!_this.firstname) {
      //   _this.$errorMessage(_this.$t(`${lang}.surnameTips`))
      // }
      // if (!_this.lastname) {
      //   _this.$errorMessage(_this.$t(`${lang}.nameTips`))
      // }
      // if (!_this.$helpers.trueEmail(_this.email)) {
      //   _this.$errorMessage(_this.$t(`${lang}.mailTips`))
      // }
      // if (!_this.code) {
      //   _this.$errorMessage(_this.$t(`${lang}.codeTips`))
      // }
      // if (!_this.password) {
      //   _this.$errorMessage(_this.$t(`${lang}.pwdType`))
      // }
      //  if (!_this.password_repetition) {
      //   _this.$errorMessage(_this.$t(`${lang}.pwdType`))
      // }
      _this.requesting = true
      this.$axios({
          method: 'post',
          url: '/web/site/email-register',
          data: {
            'firstname':_this.firstname,
            'lastname':_this.lastname,
            'email': _this.email,
            'code':_this.code,
            'password':_this.password,
            'password_repetition':_this.password_repetition
          }
        })
        .then(res => {
          console.log('dddd',res)
          // if(data.code===422){
          //   _this.$message.err(data.message);
          // }
          _this.requesting = false
          _this.$successMessage(_this.$t(`${lang}.registrySuccessful`))
          _this.$router.replace({
            path: '/index',
            query: {
              type: 'register'
            }
          })
        })
        .catch(err => {
          console.log("请求",err)
          _this.requesting = false
          _this.$errorMessage(err.message)
        })
    },
     // 倒计时
    countDown() {
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.setWait()
          _this.waitingText = _this.$t(`${langcode}.sendCode`)
          _this.waitingTime = defaultTime
        } else {
          _this.waitingText = `${_this.$t(`${langcode}.hadSend`)}(${
            _this.waitingTime
          }s)`
          _this.waitingTime--
        }
      }, 1000)
    },

     // 设置为倒计时状态
    setWait() {
      if (this.waiting) {
        this.waiting = false
      } else {
        this.waiting = true
        this.countDown()
      }
    },
    // 发送邮箱验证码
    sendCode() {
      const _this = this
      console.log("sss",_this.email)
      if (_this.email.length === 0) {
        this.$errorMessage(_this.$t(`${langcode}.inputEmail`))
        return
      }
      if (_this.waiting) {
        this.$errorMessage(_this.$t(`${langcode}.pleaseWait`))
        return
      }
      _this.setWait()
       this.$axios({
        method: "post",
        url: '/web/site/email-code',
        data:{
          'email': _this.email,
          'usage': 'register'
        }
      }).then(res => {
        console.log("ssss",res)
        _this.code=res.code
        _this.sendReturn(res)
      }).catch(err => {
        _this.resetCountDown()
        _this.$ConfirmBox({
          title: _this.$t(`${langcode}.error`),
          message: `${err.message}`
        })
      })
      // Helpers.requestServer(options)
    },
    // 发送手机验证码
    sendPhoneCode() {
      const _this = this
      console.log("sss",_this.mobile)
      if (_this.mobile.length === 0) {
        this.$errorMessage(_this.$t(`${langcode}.inputPhone`))
        return
      }
      if (_this.waiting) {
        this.$errorMessage(_this.$t(`${langcode}.pleaseWait`))
        return
      }
      _this.setWait()
       this.$axios({
        method: "post",
        url: '/web/site/sms-code',
        data:{
          'mobile': _this.mobile,
          'usage': 'register'
        }
      }).then(res => {
        console.log("ssss",res)
        if (res.code==200){
          _this.code=res.data.code
          _this.sendReturn(res)
        } else {
          throw new Error (res.message)
        }   
      }).catch(err => {
        _this.resetCountDown()
         _this.$errorMessage(err.message)
        _this.$ConfirmBox({
          title: _this.$t(`${langcode}.error`),
          message: `${err.message}`
        })
      })
      // Helpers.requestServer(options)
    },
    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
    }
  }
}
</script>

<style lang="less" scoped>
.active{
  border-bottom: 1px solid #F3A18E!important;
}
.getCode {
  width: 100%;
  height: 34px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(168, 143, 130, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 4px;
  box-sizing: border-box;
}

.getCode:disabled {
  background-color: #999999;
}
.margin-bottom-29 {
  margin-bottom: 29px;
}
.error-tip {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 4px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: rgba(242, 155, 135, 1);
  display: none;
}

.register-item {
  height: 425px;
  padding-top: 20px;
  padding-bottom: 23px;

  .register-input {
    position: relative;

    & {
      input {
        width: 100%;
        height: 33px;
        line-height: 33px;
        border-bottom: 1px solid #999999;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }

  .error {
    .register-input {
      input {
        border-bottom: 1px solid #f29b87;
      }
    }
    .error-tip {
      display: initial;
    }
  }

  .send-email-code {
    width: 130px;
    height: 33px;
  }

  .password-eye {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);

    .iconfont {
      font-size: 20px;
      color: #d2d2d2;
    }
  }

  .agreement {
    .agreement-content {
      margin-left: 13px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      text-align: left;

      a {
        margin-left: 5px;
        color: #8b766c;
        cursor: pointer;
      }
    }
  }

  .submit {
    width: 100%;
    height: 48px;
    background: #ffffff;
    border: 1px solid #8b766c;
    font-size: 14px;
    font-weight: 400;
    color: #8b766c;
  }
}
</style>
