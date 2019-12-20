<template>
  <button :class="['getCode', className]" :disabled="waiting" @click="sendCode">
    {{ waitingText }}
  </button>
</template>
<style scoped>
.getCode {
  width: 100%;
  height: 100%;

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
</style>
<script>
const lang = 'components.sendEmailCode'
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
        return ['send', 'reset'].includes(value)
      }
    }
  },
  data() {
    return {
      lang,
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.$t(`${lang}.sendCode`)
    }
  },
  computed: {
    url() {
      return this.type === 'send'
        ? '/web/user/sendCode'
        : '/web/user/resetEmail'
    },
    method() {
      return this.type === 'send' ? 'get' : 'post'
    }
  },
  watch: {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  beforeDestroy() {},
  methods: {
    // 发送验证码
    sendCode() {
      const _this = this

      if (_this.email.length === 0) {
        this.$errorMessage(_this.$t(`${lang}.inputEmail`))
        return
      }
      if (_this.waiting) {
        this.$errorMessage(_this.$t(`${lang}.pleaseWait`))
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
            title: _this.$t(`${lang}.error`),
            message: `${err.message}`
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
          _this.waitingText = _this.$t(`${lang}.sendCode`)
          _this.waitingTime = defaultTime
        } else {
          _this.waitingText = `${_this.$t(`${lang}.hadSend`)}(${
            _this.waitingTime
          }s)`
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
