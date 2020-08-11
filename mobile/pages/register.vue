<template>
  <div>
    <div class="operate-bar">
      <i class="icon iconfont iconguanbi close" @click="goBack($router)"></i>
    </div>

    <div >
      <section  class="page-content">
        <div class="title-bar">
          <span class="title" style="opacity: 0">{{ lang.oauthRegister }}</span>
          <span class="login" @click="toLogin">{{ lang.hadRegister }}></span>
        </div>

        <div class="info">
          <!-- 名称 -->
          <div class="line-box input-line">
            <bdd-input
              v-model="info.name"
              :placeholder="`${lang.name}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('name')"
              @keydown="keydown('30')"
              :maxl="maxlength"
            ></bdd-input>
            <!-- <div
              :class="[
                'error-message',
                { active: hadInput('name') && !info.name }
              ]"
            >
              {{ lang.nameError }}
            </div> -->
          </div>
          <!-- 姓氏 -->
          <div class="line-box input-line">
            <bdd-input
              v-model="info.surname"
              :placeholder="`${lang.surname}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('surname')"
              :maxl="maxlength"
              @keydown="keydown('30')"
            ></bdd-input>
            <!-- <div
              :class="[
                'error-message',
                { active: hadInput('surname') && !info.surname }
              ]"
            >
              {{ lang.surnameError }}
            </div> -->
          </div>
          <!-- 手机号 -->
          <div class="line-box input-line mobile email-val-box" v-if="loginType == 2 ">
            <div class="area-code">{{ lang['area-code'] }} +86<i class="iconfont iconxiala"></i></div>
            <bdd-input
              v-model.trim="info.mobile"
              :placeholder="`${lang.mobile}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('mobile')"
              :maxl="maxlength"
              @keydown="keydown('11')"
            ></bdd-input>
            <div
              :class="[
                'error-message',
                { active: hadInput('mobile') && !trueMobile }
              ]"
            >
              <div v-if="hadInput('mobile') && !trueMobile">
                {{ lang.phoneError }}
              </div>
            </div>
          </div>
          <!-- 邮箱 -->
          <div class="line-box input-line email" v-else>
            <bdd-input
              v-model.trim="info.email"
              :placeholder="`*${lang.email}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('email')"
              :maxl="maxlength"
              @keydown="keydown('60')"
            ></bdd-input>
            <div
              :class="[
                'error-message',
                { active: hadInput('email') && !trueEmail }
              ]"
            >
              {{ lang.emailError }}
            </div>
          </div>

          <!-- 图片验证码 -->
          <div class="line-box input-line">
            <div class="code">
              <bdd-input v-model="code" :placeholder="lang['Code']" @focus="ifShowErr = false" @blur="inputImgKey" :maxl="maxlength" @input="keydown('4','code')"></bdd-input>
              <div class="code-picture" @click="refreshCode">
                <picture-verification-code ref="picture-verification-code" :identify-code="pictureCode"></picture-verification-code>
              </div>
            </div>
            <div :class="[
              'error-message',
              { active: ifShowErr }
            ]">
              {{ lang['code-error'] }}
            </div>
          </div>

          <!-- 手机验证码 -->
          <div class="line-box input-line" v-if="loginType == 2">
            <div v-show="showCodeMessageM" class="message">
              {{ lang.inputUnder }} {{ info.mobile }} {{ lang.thePhoneCode }}
            </div>
            <div style="position: relative;">
              <bdd-input
                v-model="info.code"
                :placeholder="`${lang.code}`"
                :padding="'0 30% 0 3%'"
                @blur="inputKey('code')"
                :maxl="maxlength"
                @keydown="keydown('15')"
              ></bdd-input>
              <div class="send-code">
                <!-- <send-email-code
                  :email="info.email"
                  @send="sendCode"
                ></send-email-code> -->
                <button :class="['getCode', className]" :disabled="waiting" @click="sendMbileCode">
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
              {{ lang['code-error'] }}
            </div>
          </div>

          <!-- 邮件验证码 -->
          <div class="line-box input-line" v-else>
            <div v-show="showCodeMessageE" class="message">
              {{ lang.inputUnder }} {{ info.email }} {{ lang.theEmailCode }}
            </div>
            <div style="position: relative;">
              <bdd-input
                v-model="info.code"
                :placeholder="`*${lang.code}`"
                :padding="'0 30% 0 3%'"
                @blur="inputKey('code')"
                :maxl="maxCode"
                @keydown="keydown('15')"
              ></bdd-input>
              <div class="send-code">
                <button :class="['getCode', className]" :disabled="waiting" @click="sendEmailCode">
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
              {{ lang['code-error'] }}
            </div>
          </div>


          <!-- 设置密码 -->
          <div class="line-box input-line">
            <bdd-input
              v-model.trim="info.password"
              :type="'password'"
              :placeholder="`${lang.password}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('password')"
              :maxl="maxlength"
              @keydown="keydown('60')"
            ></bdd-input>
            <div
              :class="[
                'error-message',
                { active: hadInput('password') && !truePassword }
              ]"
            >
              {{ lang.passwordError }}
            </div>
          </div>
          <!-- 确认密码 -->
          <div class="line-box input-line">
            <bdd-input
              v-model.trim="info.password_repetition"
              :type="'password'"
              :placeholder="`${lang.repassword}`"
              :padding="'0 3% 0 3%'"
              @blur="inputKey('repassword')"
              :maxl="maxlength"
              @keydown="keydown('60')"
            ></bdd-input>
            <div
              :class="[
                'error-message',
                { active: hadInput('repassword') && !trueRepassword }
              ]"
            >
              {{ lang.repasswordError }}
            </div>
          </div>
        </div>

        <div class="protocol">
          <span class="checked-box" @click="agreeIt">
            <i :class="['iconfont', 'icongou', { agree: agree }]"></i>
          </span>
          <div class="protocol-info">
            {{ lang.agree }}
            <nuxt-link to="/help-pages/clause">{{ lang.bddClause }}</nuxt-link>
          </div>
        </div>

        <div class="line-box mobile" v-if="loginType == 2">
          <button class="full-btn to-register" @click="registerCN">
            <span class="btn-message">{{ lang.register }}</span>
          </button>
        </div>
        <div class="line-box email" v-else>
          <button class="full-btn to-register" @click="register">
            <span class="btn-message">{{ lang.register }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
const defaultTime = 60
export default {
  middleware: 'replaceWhenTokenCanUse',
  layout: 'no-bar',
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
      url:this.$route.query.url,
      lang: this.LANGUAGE.register,
      langcode:this.LANGUAGE.components.sendEmailCode,
      info: {
        email: '',
        mobile:'',
        password: '',
        password_repetition: '',
        surname: '', // 姓氏
        name: '', // 名
        code: '',
      },
      hadSendCode: false,
      agree: true,
      language:'',
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.LANGUAGE.components.sendEmailCode.sendCode,
      loginType: '',
      maxlength: '30',
      maxCode: '5',
      pictureCode: '',
      code: '',
      ifShowErr: false
    }
  },
  computed: {
    // trueName() {
    //   return this.info.name
    // },
    // trueSurname() {
    //   return this.info.surname
    // },
    trueEmail() {
      return this.$helpers && this.$helpers.trueEmail(this.info.email)
    },
    trueMobile() {
      return this.info.mobile && (/^1[3456789]\d{9}$/.test(this.info.mobile))
    },
    trueCode() {
      return ['', null].indexOf(this.info.code) === -1
    },
    truePassword() {
      return this.info.password && this.info.password.length > 5
    },
    showCodeMessageE() {
      return this.hadSendCode && this.hadInput('email') && this.trueEmail
    },
    showCodeMessageM() {
      return this.hadSendCode && this.hadInput('mobile') && this.trueMobile
    },
    trueRepassword(){
      return this.info.password_repetition && this.info.password==this.info.password_repetition
    }
  },
  mounted() {
    this.loginType=localStorage.getItem('loginType')
    this.language = this.$store.state.language;

    const _this = this
    _this.$nextTick(() => {
      _this.refreshCode()
    })
  },
  methods: {
    toLogin() {
      this.$router.replace({
        name: 'login'
      })
    },
    // 发送手机验证码
    sendMbileCode(){
      const _this = this
      if(!this.info.mobile){
        _this.$toast.show(_this.lang['inputPhone'])
        return
      }

      if(!_this.trueMobile){
        _this.$toast.show(_this.lang['phoneError'])
        return
      }

      if(!this.code){
        _this.$toast.show(_this.lang['inputCode'])
        return
      }

      if(this.code != this.pictureCode){
        _this.$toast.show(_this.lang['codeError'])
        return
      }

      this.hadSendCode = true
      _this.setWait()
      this.$axios({
        method: "post",
        url: "/web/site/sms-code",
        data: {
          'mobile': _this.info.mobile,
          'usage': 'register'
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
    // 发送邮箱验证码
    sendEmailCode() {
      const _this = this
      if(!this.info.email){
        _this.$toast.show(_this.lang['inputEmail'])
        return
      }

      if(!_this.trueEmail){
        _this.$toast.show(_this.lang['emailError'])
        return
      }

      if(!this.code){
        _this.$toast.show(_this.lang['inputCode'])
        return
      }

      if(this.code != this.pictureCode){
        _this.$toast.show(_this.lang['codeError'])
        return
      }

      this.hadSendCode = true
      _this.setWait()
       this.$axios({
        method: "post",
        url: '/web/site/email-code',
        data:{
          'email': _this.info.email,
          'usage': 'register'
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
    // 倒计时
    countDown() {
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.setWait()
          _this.waitingText = _this.langcode.sendCode
          _this.waitingTime = defaultTime
        } else {
          _this.waitingText = `${_this.langcode.hadSend}(${_this.waitingTime}s)`
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
    sendCode() {
      this.hadSendCode = true
    },
    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
    },
    agreeIt() {
      this.agree = !this.agree
    },
    registerCN() {
      const _this = this

      if (!_this.trueMobile) {
        _this.$toast(_this.lang.phoneError)
        return
      }
      if (!_this.trueCode) {
        _this.$toast(_this.lang.inputCode)
        return
      }
      if (!_this.truePassword) {
        _this.$toast(_this.lang.passwordError)
        return
      }
      if (!_this.agree) {
        _this.$toast(_this.lang.tickTheBDDTerms)
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/mobile-register`,
          data: this.info
        })
        .then(data => {
          _this.$toast.show(_this.lang.registerSuccess)
          _this.$store.commit('setToken', data.access_token)
          _this.$store.commit('setUserInfo', data.member);
          const lastUrl=localStorage.getItem("url")
          // _this.$store.commit('setLastUrl', '')
           _this.$store.dispatch('synchronizeCart')
          // console.log("order-lastUrL",lastUrl)
          fbq('track', 'CompleteRegistration');
          setTimeout(() => {
            if (lastUrl) {
              _this.$router.replace({
                path: lastUrl
              })
            } else {
              _this.$router.replace({
                name: 'login-email'
              })
            }
          }, 2000)
          // setTimeout(() => {
          //   _this.$router.push({
          //     name: 'login-email'
          //   })
          // }, 2000)
        })
        .catch(err => {
          _this.$toast.show(err.message)
        })
    },
    // 生成驗證碼
    refreshCode () {
      // const info = JSON.parse(JSON.stringify(this.info))
      const result = []
      const library = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      this.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        result.push(library[Math.floor(Math.random() * 9)])
      }
      this.pictureCode = result.join('')
      // this.info = info
    },
    register() {
      const _this = this
      // if (!_this.trueName) {
      //   _this.$toast(_this.lang.inputName)
      //   return
      // }
      // if (!_this.trueSurname) {
      //   _this.$toast(_this.lang.inputSurname)
      //   return
      // }
      if (!_this.trueEmail) {
        _this.$toast(_this.lang.emailError)
        return
      }
      if (!_this.trueCode) {
        _this.$toast(_this.lang.inputCode)
        return
      }
      if (!_this.truePassword) {
        _this.$toast(_this.lang.passwordError)
        return
      }
      if (!_this.agree) {
        _this.$toast(_this.lang.tickTheBDDTerms)
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/email-register`,
          data: this.info
        })
        .then(res => {
          // console.log("11111",res)
          _this.$toast.show(_this.lang.registerSuccess)
          _this.$store.commit('setToken', res.access_token)
          _this.$store.commit('setUserInfo', res.member);
           _this.$store.dispatch('synchronizeCart')
          const lastUrl=localStorage.getItem("url")
          // _this.$store.commit('setLastUrl', '')
          // console.log("order-lastUrL",lastUrl)
          fbq('track', 'CompleteRegistration');
          setTimeout(() => {
            if (lastUrl) {
              _this.$router.replace({
                path: lastUrl
              })
            } else {
              _this.$router.replace({
                name: 'login-email'
              })
            }
          }, 2000)
          // setTimeout(() => {
          //   _this.$router.push({
          //     name: 'login-email'
          //   })
          // }, 2000)
        })
        .catch(err => {
          _this.$toast.show(err.message)
        })
    },
    oauthLogin(type = '') {
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: `/wap/login/submitLogin`,
          params: {
            social: type
          }
        })
        .then(data => {
          if (!data.redirectUrl) {
            _this.$toast.show('redirectUrl is null')
            return
          }
          location.href = data.redirectUrl
        })
        .catch(err => {
          _this.$toast.show(err.message)
        })
    },
    keydown(k){
      this.maxlength = k;
    },
    inputImgKey() {
      this.ifShowErr = this.code ? false : true
    }
  }
}
</script>

<style lang="less" scoped>
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
.operate-bar {
  padding: 21px 20px 0 20px;
  height: 17px;
  text-align: right;
  margin-bottom: 37px;
}
.operate-bar .close {
  font-size: 17px;
  color: #333333;
}

.page-content {
  padding: 0 20px;
  box-sizing: border-box;
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
.title-bar .login {
  font-size: 14px;
  color: #666666;
}

/*通用样式*/
.line-box {
  position: relative;
  margin-bottom: 20px;
}
.input-line {
  margin-bottom: 8px;

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
    min-height: 8px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    color: rgba(237, 73, 73, 1);
    opacity: 0;
    padding-top: 4px;
  }
  .error-message.active {
    min-height: 20px;
    line-height: 20px;
    opacity: 1;
  }
}

/*授权登录*/
.oauth {
  margin-bottom: 5px;

  .full-btn.facebook {
    font-size: 14px;
    color: #ffffff;
    background-color: #3b5998;
  }
  .full-btn.facebook img {
    width: 18px;
    margin-right: 20px;
  }
  .full-btn.google {
    font-size: 14px;
    color: #333333;
    background-color: #f8f8f8;
    border: 1px solid rgba(170, 170, 170, 1);
  }
  .full-btn.google img {
    width: 16px;
    margin-right: 20px;
  }
}

.info {
  .title {
    margin-bottom: 18px;
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: left;
  }
  .send-code {
    position: absolute;
    top: 4px;
    right: 6px;
  }
}
.protocol {
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;

  .checked-box {
    flex-grow: 0;
    flex-shrink: 0;

    margin-right: 4px;
    width: 14px;
    height: 14px;
    line-height: 11px;
    border-radius: 2px;
    border: 1px solid rgba(199, 183, 183, 1);
    background: linear-gradient(
      0deg,
      rgba(244, 244, 244, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    box-sizing: border-box;

    .iconfont {
      font-size: 9px;
      color: #c7b7b7;
      opacity: 0;
    }
    .iconfont.agree {
      opacity: 1;
    }
  }
  .protocol-info {
    line-height: 14px;
    font-size: 11px;
    font-weight: 300;
    color: #666666;
    text-align: left;

    a {
      color: #aa8a7b;
    }
  }
}
.full-btn.to-register {
  /*letter-spacing: 16px;*/
  font-size: 16px;
  color: #ffffff;
  background-color: #f29b87;
}

.email-val-box{
  position: relative;
}
.area-code{
  position: absolute;
  width: 32%;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba(187, 187, 187, 1);
  color: #777;
  background-color: #f9f9f9;
}
.email-val-box .input-box{
  width: 65%;
  margin-left: 35%;
}
.area-code .iconxiala{
  margin: 6px 0 0 8%;
  font-size: 14px;
}

.code-picture {
  width: 109px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
  }
}
.code {
  display: flex;
  justify-content: space-between;
}
</style>
