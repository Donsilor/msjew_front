<template>
  <div>
    <div class="operate-bar">
      <i class="icon iconfont iconguanbi close" @click="goBack($router)"></i>
    </div>
    <section class="page-content">
      <div class="title-bar">
        <span class="title" style="opacity: 0">{{ lang.oauthRegister }}</span>
        <span class="login" @click="toLogin">{{ lang.hadRegister }}></span>
      </div>

      <div class="oauth">
        <div class="line-box">
          <button class="full-btn facebook" @click="oauthLogin('facebook')">
            <img src="/facebook.svg" class="btn-icon" />
            <span class="btn-message">{{ lang.facebook }}</span>
          </button>
        </div>
        <div class="line-box">
          <button class="full-btn google" @click="oauthLogin('google')">
            <img src="/google.svg" class="btn-icon" />
            <span class="btn-message">{{ lang.google }}&nbsp;&nbsp;&nbsp;</span>
          </button>
        </div>
      </div>

      <div class="info">
        <div class="title">{{ lang.inputInfo }}</div>

        <div class="line-box input-line">
          <bdd-input
            v-model="info.name"
            :placeholder="`*${lang.name}`"
            :padding="'0 3% 0 3%'"
            @blur="inputKey('name')"
          ></bdd-input>
          <div
            :class="[
              'error-message',
              { active: hadInput('name') && !info.name }
            ]"
          >
            {{ lang.nameError }}
          </div>
        </div>
        <div class="line-box input-line">
          <bdd-input
            v-model="info.surname"
            :placeholder="`*${lang.surname}`"
            :padding="'0 3% 0 3%'"
            @blur="inputKey('surname')"
          ></bdd-input>
          <div
            :class="[
              'error-message',
              { active: hadInput('surname') && !info.surname }
            ]"
          >
            {{ lang.surnameError }}
          </div>
        </div>
        <div class="line-box input-line">
          <bdd-input
            v-model="info.email"
            :placeholder="`*${lang.email}`"
            :padding="'0 3% 0 3%'"
            @blur="inputKey('email')"
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

        <div class="line-box input-line">
          <div v-show="showCodeMessage" class="message">
            {{ lang.inputUnder }} {{ info.email }} {{ lang.theEmailCode }}
          </div>
          <div style="position: relative;">
            <bdd-input
              v-model="info.code"
              :placeholder="`*${lang.code}`"
              :padding="'0 30% 0 3%'"
              @blur="inputKey('code')"
            ></bdd-input>
            <div class="send-code">
              <send-email-code
                :email="info.email"
                @send="sendCode"
              ></send-email-code>
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
        </div>

        <div class="line-box input-line">
          <bdd-input
            v-model="info.password"
            :type="'password'"
            :placeholder="`*${lang.password}`"
            :padding="'0 3% 0 3%'"
            @blur="inputKey('password')"
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

      <div class="line-box">
        <button class="full-btn to-register" @click="register">
          <span class="btn-message">{{ lang.register }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  middleware: 'replaceWhenTokenCanUse',
  layout: 'no-bar',
  mixins: [Input],
  props: {},
  data() {
    return {
      lang: this.LANGUAGE.register,
      info: {
        email: '',
        password: '',
        surname: '', // 姓氏
        name: '', // 名
        code: ''
      },
      hadSendCode: false,
      agree: true
    }
  },
  computed: {
    trueName() {
      return this.info.name
    },
    trueSurname() {
      return this.info.surname
    },
    trueEmail() {
      return this.$helpers && this.$helpers.trueEmail(this.info.email)
    },
    trueCode() {
      return ['', null].indexOf(this.info.code) === -1
    },
    truePassword() {
      return this.info.password && this.info.password.length > 5
    },
    showCodeMessage() {
      return this.hadSendCode && this.hadInput('email') && this.trueEmail
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    toLogin() {
      this.$router.replace({
        name: 'login'
      })
    },
    sendCode() {
      this.hadSendCode = true
    },
    agreeIt() {
      this.agree = !this.agree
    },
    register() {
      const _this = this
      if (!_this.trueName) {
        _this.$toast(_this.lang.inputName)
        return
      }
      if (!_this.trueSurname) {
        _this.$toast(_this.lang.inputSurname)
        return
      }
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
          url: `/wap/user/signup`,
          params: this.info
        })
        .then(data => {
          _this.$toast.show(_this.lang.registerSuccess)
          setTimeout(() => {
            _this.$router.push({
              name: 'login-email'
            })
          }, 2000)
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
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
