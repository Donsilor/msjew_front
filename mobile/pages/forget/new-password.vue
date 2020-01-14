<template>
  <section>
    <div class="title-bar">
      <span class="title">
        {{ lang['reset-password'] }}
      </span>
    </div>

    <div v-if="language==='zh_CN'" class="line-box input-line">
      <bdd-input
        v-model="code"
        :placeholder="lang['code']"
        :padding="'0 30% 0 3%'"
        @input="inputKey('code')"
      ></bdd-input>
      <div class="send-code">
        <button :class="['getCode', className]" :disabled="waiting" @click="sendMobileCode">
          {{ waitingText }}
        </button>
      </div>
      <div
        :class="['error-message', { active: !trueCode && hadInput('code') }]"
      >
        {{ errorMessage }}
      </div>
    </div>

    <div v-else class="line-box input-line">
      <bdd-input
        v-model="code"
        :placeholder="lang['code']"
        :padding="'0 30% 0 3%'"
        @input="inputKey('code')"
      ></bdd-input>
      <div class="send-code">
        <button :class="['getCode', className]" :disabled="waiting" @click="sendEmailCode">
          {{ waitingText }}
        </button>
      </div>
      <div
        :class="['error-message', { active: !trueCode && hadInput('code') }]"
      >
        {{ errorMessage }}
      </div>
    </div>

    <div class="line-box input-line">
      <bdd-input
        v-model="password"
        :placeholder="lang['input-new-password']"
        @input="inputKey('password')"
      ></bdd-input>
      <div
        :class="[
          'error-message',
          { active: !truePassword && hadInput('password') }
        ]"
      >
        {{ lang['password-error'] }}
      </div>
    </div>
    <div class="line-box input-line">
      <bdd-input
        v-model="password_repetition"
        :placeholder="lang['confirm-password']"
        @input="inputKey('password_repetition')"
      ></bdd-input>
      <div
        :class="[
          'error-message',
          { active: !samePassword && hadInput('password_repetition') }
        ]"
      >
        {{ lang['password-not-same'] }}
      </div>
    </div>

    <div class="message">
      {{ lang['password-claim'] }}
    </div>

    <div class="line-box">
      <button class="full-btn to-next" @click="toNext">
        <span class="btn-message">
          {{ lang['next'] }}
        </span>
      </button>
    </div>
  </section>
</template>

<script>
import Input from '@/mixins/input.js'
const defaultTime = 60
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
    email: {
      type: String,
      required: true,
      default: ''
    },
    mobile: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'send',
      validator(value) {
        return ['send', 'reset'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      langs: this.LANGUAGE.components.sendEmailCode,
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.LANGUAGE.components.sendEmailCode.sendCode,
      lang: this.LANGUAGE.forget['new-password'],
      code:'',
      password: '',
      password_repetition: '',
      language:''
    }
  },
  computed: {
    truePassword() {
      return this.password
    },
    samePassword() {
      return this.password === this.password_repetition
    },
    trueCode() {
      return !!this.code
    },
    errorMessage() {
      return this.code && this.trueCode ? '' : this.lang['code-null']
    }
  },
  mounted() {
    this.language = this.getCookie('language')
   
    const _this = this
    _this.$nextTick(() => {
      // if (!_this.email || !_this.mobile) {
      //   _this.$router.replace({
      //     name: 'forget'
      //   })
      // }
    })
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
    toNext() {
      if (!this.trueCode) {
        this.$toast(this.lang['password-error'])
        return
      }
      if (!this.truePassword) {
        this.$toast(this.lang['password-error'])
        return
      }
      if (!this.samePassword) {
        this.$toast(this.lang['password-not-same'])
        return
      }
      if(this.language==='zh_CN'){
        this.emitEventCN()
      }else{
        this.emitEvent()
      }
    },
    
    // 倒计时
    countDown() {
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.setWait()
          _this.waitingText = _this.langs.sendCode
          _this.waitingTime = defaultTime
        } else {
          _this.waitingText = `${_this.langs.hadSend}(${_this.waitingTime}s)`
          _this.waitingTime--
        }
      }, 1000)
    },
    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
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
     // 发送手机验证码
    sendMobileCode(){
      this.hadSendCode = true
      const _this = this
       _this.setWait()
      this.$axios({
        method: "post",
        url: "/web/site/sms-code",
        data: {
          'mobile': _this.mobile,
          'usage': 'up-pwd'
        }
      })
        .then(data => {
          console.log(data)
          // _this.sendReturn(data)
        })
        .catch(err => {
          _this.resetCountDown()
          _this.$ConfirmBox({
            title: _this.lang.error,
            message: `${err.message}`
            // message: `${_this.lang.sendCodeError}，${err.message}`
          })
        })

    },
     // 发送手机验证码
    sendEmailCode(){
      this.hadSendCode = true
      const _this = this
       _this.setWait()
      this.$axios({
        method: "post",
        url: "/site/email-code",
        data: {
          'email': _this.email,
          'usage': 'up-pwd'
        }
      })
        .then(data => {
          console.log(data)
          // _this.sendReturn(data)
        })
        .catch(err => {
          _this.resetCountDown()
          _this.$ConfirmBox({
            title: _this.lang.error,
            message: `${err.message}`
            // message: `${_this.lang.sendCodeError}，${err.message}`
          })
        })

    },
    emitEvent() {
      this.$emit('newPasswordFinish', {
        password: this.password,
        password_repetition: this.password_repetition,
        code:this.code
      })
    },
    emitEventCN() {
      this.$emit('newPasswordFinishCN', {
        password: this.password,
        password_repetition: this.password_repetition,
        code:this.code
      })
    },
  }
}
</script>

<style scoped>
.getCode {
  width: 90px;
  height: 32px;

  text-align: center;
  background: rgba(125, 174, 120, 1);
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.send-code {
  position: absolute;
  top: 4px;
  right: 6px;
}
.getCode:disabled {
  background-color: #999999;
}
.title-bar {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title-bar .title {
  font-size: 20px;
  color: #333333;
}
.line-box {
  position: relative;
  margin-bottom: 25px;
}
.info-box {
  margin-bottom: 20px;
}
.line-box {
   position: relative;
  margin-bottom: 12px;
}
.full-btn.to-next {
  font-size: 16px;
  color: #ffffff;
  background-color: #f29b87;
}
.error-message {
  height: 8px;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  color: rgba(237, 73, 73, 1);
  opacity: 0;
}
.error-message.active {
  height: 21px;
  line-height: 28px;
  opacity: 1;
}
.message {
  margin-bottom: 36px;
  padding: 14px;
  text-align: left;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(147, 116, 102, 1);
  background: rgba(247, 244, 241, 1);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
