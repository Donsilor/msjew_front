<template>
  <button :class="['getCode', className]" :disabled="waiting" @click="sendCode">
    {{ waitingText }}
  </button>
</template>
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
</style>
<script>
const defaultTime = 60

export default {
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
      lang: this.LANGUAGE.components.sendEmailCode,
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.LANGUAGE.components.sendEmailCode.sendCode
    }
  },
  computed: {
    url() {
      return this.type === 'send'
        ? '/wap/user/sendCode'
        : '/wap/user/resetEmail'
    },
    method() {
      return this.type === 'send' ? 'get' : 'post'
    }
  },
  watch: {},
  mounted() {
    const _this = this
    _this.$nextTick(function() {})
  },
  beforeDestroy() {},
  methods: {
    // 发送验证码
    sendCode() {
      const _this = this

      if (_this.email.length === 0) {
        this.$toast(_this.lang.inputEmail)
        return
      }
      if (_this.waiting) {
        this.$toast(_this.lang.pleaseWait)
        return
      }

      _this.setWait()
      this.$axios({
        method: _this.method,
        url: _this.url,
        params: {
          email: _this.email
        }
      })
        .then(data => {
          console.log(data)
          _this.sendReturn(data)
        })
        .catch(err => {
          _this.resetCountDown()
          _this.$ConfirmBox({
            title: _this.lang.error,
            message: `${err.message}`
            // message: `${_this.lang.sendCodeError}，${err.message}`
          })
        })

      // Helpers.requestServer(options)
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

    // 倒计时
    countDown() {
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.setWait()
          _this.waitingText = _this.lang.sendCode
          _this.waitingTime = defaultTime
        } else {
          _this.waitingText = `${_this.lang.hadSend}(${_this.waitingTime}s)`
          _this.waitingTime--
        }
      }, 1000)
    },

    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
    },

    // 发送验证码成功后的事件
    sendReturn(data) {
      this.$emit('send', data)
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>
