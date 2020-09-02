<template>
<div>
  <section v-if="language==='zh_CN'">
    <div class="line-box input-line">
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

    <div class="line-box">
      <button class="full-btn to-next" @click="toNext">
        <span class="btn-message">
          {{ lang['next'] }}
        </span>
      </button>
    </div>
  </section>
  <section v-else>
    <div class="title-bar">
      <span class="title">
        {{ lang['forget'] }}
      </span>
    </div>

    <div class="line-box info-box">
      <div class="forget-info">
        {{ lang['had-send-email'] }}
      </div>
      <div class="forget-info">
        {{ email }}
      </div>
      <div class="forget-info">
        {{ lang['check-it'] }}
      </div>
    </div>

    <div class="line-box input-line">
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
        <!-- <send-email-code :email="email" :type="'reset'"></send-email-code> -->
      </div>
      <div
        :class="['error-message', { active: !trueCode && hadInput('code') }]"
      >
        {{ errorMessage }}
      </div>
    </div>

    <div class="line-box">
      <button class="full-btn to-next" @click="toNext">
        <span class="btn-message">
          {{ lang['next'] }}
        </span>
      </button>
    </div>
  </section>
</div>
</template>

<script>
import Input from '@/mixins/input.js'
const defaultTime = 60
export default {
  mixins: [Input],
  props: {
    email: {
      type: String,
      required: false,
      default: ''
    },
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
        return ['send', 'reset'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.forget['verify-code'],
      code: '',
      language:'',
      langs: this.LANGUAGE.components.sendEmailCode,
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.LANGUAGE.components.sendEmailCode.sendCode
    }
  },
  computed: {
    trueCode() {
      return !!this.code
    },
    errorMessage() {
      return this.code && this.trueCode ? '' : this.lang['code-null']
    }
  },
  mounted() {
    this.language = this.$store.state.language
  },
  methods: {
    toNext() {
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('compareCode', {
        code: this.code
      })
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
        url: "/web/site/email-code",
        data: {
          'email': _this.email,
          'usage': 'up-pwd'
        }
      })
        .then(data => {
          // console.log(data)
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

.forget-info {
  color: rgba(147, 116, 102, 1);
  line-height: 16px;
  text-align: left;
}
.forget-info:nth-of-type(1) {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 9px;
}
.forget-info:nth-of-type(2) {
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  color: rgba(147, 116, 102, 1);
  margin-bottom: 10px;
}
.forget-info:nth-of-type(3) {
  font-size: 12px;
  font-weight: 400;
  color: rgba(147, 116, 102, 1);
}
.send-code {
  position: absolute;
  top: 4px;
  right: 6px;
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
</style>
