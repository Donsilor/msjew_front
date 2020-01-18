<template>
  <section>
    <div class="title-bar">
      <span class="title">{{ lang.forget }}</span>
    </div>
    <!-- 中文简体 -->
    <!-- <div v-if="language==='zh_CN'"> -->
      <!-- <div class="line-box input-line">
        <bdd-input
          v-model="mobile"
          :placeholder="lang.mobile"
          @blur="inputKey('mobile')"
        ></bdd-input>
        <div
          :class="['error-message', { active: !trueMobile && hadInput('mobile') }]"
        >
          {{ lang['email-error'] }}
        </div>
      </div>

      <div class="line-box input-line">
        <div v-show="showCodeMessage" class="message">
          {{ lang.inputUnder }} {{ mobile }} {{ lang.theEmailCode }}
        </div>
        <div style="position: relative;">
          <bdd-input
            v-model="code"
            :placeholder="`${lang.code}`"
            :padding="'0 30% 0 3%'"
            @blur="inputKey('code')"
          ></bdd-input>
          <div class="send-code">

            <button :class="['getCode', className]" :disabled="waiting" @click="sendMobileCode">
              {{ waitingText }}
            </button>
          </div>
        </div>
        <div
          :class="[
            'error-message',
            { active: hadInput('code') && !trueCode }
          ]"
        >
          {{ lang.codeError }}
        </div>
      </div> -->
      <div class="line-box input-line" v-if="loginType == 2">
        <bdd-input
          v-model="mobile"
          :placeholder="lang.mobile"
          @blur="inputKey('mobile')"
        ></bdd-input>
        <div
          :class="['error-message', { active: !trueMobile && hadInput('mobile') }]"
        >
          {{ lang['mobile-error'] }}
        </div>
      </div>

      <div class="line-box input-line" v-else>
        <bdd-input
          v-model="email"
          :placeholder="lang.email"
          @blur="inputKey('email')"
        ></bdd-input>
        <div
          :class="['error-message', { active: !trueEmail && hadInput('email') }]"
        >
          {{ lang['email-error'] }}
        </div>
      </div>

      <div class="line-box" v-if="loginType == 2">
        <button class="full-btn to-next" @click="toNextCN">
          <span class="btn-message">{{ lang.next }}</span>
        </button>
      </div>
    <!-- </div> -->
    <!-- 繁体 -->
    <!-- <div v-else > -->
      <div class="line-box" v-else>
        <button class="full-btn to-next" @click="toNext">
          <span class="btn-message">{{ lang.next }}</span>
        </button>
      </div>
    <!-- </div> -->

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
      lang: this.LANGUAGE.forget.index,
      langcode:this.LANGUAGE.components.sendEmailCode.sendCode,
      email: '',
      mobile:'',
      code:'',
      language:'',
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.LANGUAGE.components.sendEmailCode.sendCode,
      loginType:''
    }
  },
  computed: {
    trueEmail() {
      return this.$helpers && this.$helpers.trueEmail(this.email)
    },
    trueMobile() {
      return this.mobile && (/^1[3456789]\d{9}$/.test(this.mobile))
    },
    trueCode() {
      return ['', null].indexOf(this.code) === -1
    },
    showCodeMessage() {
      return this.hadSendCode && this.hadInput('mobile') && this.trueMobile
    },
  },
  mounted(){
    this.loginType=localStorage.getItem('loginType')
    this.language = this.getCookie('language')
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

    // 设置为倒计时状态
    setWait() {
      if (this.waiting) {
        this.waiting = false
      } else {
        this.waiting = true
        this.countDown()
      }
    },
    toNextCN() {
      this.emitEvent2()
    },
    toNext() {
      // this.$router.push({
      //   name: 'new-password'
      // })
      // if (!this.email) {
      //   this.$toast('郵箱不能为空')
      //   return
      // }
      // if (!this.trueEmail) {
      //   this.$toast('郵箱格式錯誤')
      //   return
      // }
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('emailFinish', this.email)
      // console.log('emitEvent')
      // if(this.language==='zh_CN'){
      //   this.$emit('mobileFinish',this.mobile)
      // }else{
      //   this.$emit('emailFinish', this.email)
      // }
    },
    emitEvent2() {
      console.log('emitEvent2')
      this.$emit('mobileFinish',this.mobile)
    }
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
 .send-code {
    position: absolute;
    top: 4px;
    right: 6px;
  }
.line-box {
  margin-bottom: 25px;
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
.line-box {
  position: relative;
  margin-bottom: 20px;
}
.message {
    position: relative;
    margin-bottom: 16px;
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

  .message:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 10%;
    border-top: 11px solid rgba(247, 244, 241, 1);
    border-bottom: 0 solid transparent;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
  .error-message {
    height: 8px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    color: rgba(237, 73, 73, 1);
    opacity: 0;
  }
  .error-message.active {
    height: 20px;
    line-height: 26px;
    opacity: 1;
  }
</style>
