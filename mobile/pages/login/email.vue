<template>
  <section>
    <div class="title-bar">
      <span class="title">
        {{ lang['login'] }}
      </span>
      <span class="register" @click="toRegister">
        {{ lang['no-account'] }}
      </span>
    </div>
    <div class="line-box input-line">
      <bdd-input
        v-model="loginInfo.account"
        :placeholder="lang['email']"
        @blur="inputKey('account')"
      ></bdd-input>
      <div
        :class="[
          'error-message',
          { active: !trueUsername && hadInput('account') }
        ]"
      >
        {{ lang['email-error'] }}
      </div>
    </div>
    <div class="line-box input-line">
      <bdd-input
        v-model="loginInfo.password"
        :placeholder="lang['password']"
        :type="'password'"
        @blur="inputKey('password')"
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

    <div v-show="needSliderVerify" class="line-box verify-line">
      <slider-verify
        ref="slider-verify"
        @finish="sliderVerifyFinish"
      ></slider-verify>
      <div
        :class="[
          'error-message',
          { active: needSliderVerify && !sliderVerify }
        ]"
      >
        {{ lang['slider-verify-first'] }}
      </div>
    </div>

    <div class="line-box button-line">
      <button class="full-btn login" @click="login">
        <span class="btn-message">{{ lang['login-now'] }}</span>
      </button>
    </div>
    <div class="line-box button-line">
      <button class="full-btn forget" @click="toForget">
        <span class="btn-message">
          {{ lang['forget'] }}
        </span>
      </button>
    </div>
  </section>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  layout: 'login',
  mixins: [Input],
  data() {
    return {
      lang: this.LANGUAGE.login.email,
      loginInfo: {
        account: '',
        password: ''
      },
      verifyStatus: 1, // 控制滑动验证是否显示
      sliderVerify: false, // 滑动验证是否完成
      errorKeys: []
    }
  },
  computed: {
    needSliderVerify() {
      return this.verifyStatus === 2
    },
    trueUsername() {
      return this.$helpers && this.$helpers.trueEmail(this.loginInfo.account)
    },
    truePassword() {
      return this.loginInfo.password && this.loginInfo.password.length > 5
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getVerifyStatus()
    })
  },
  methods: {
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    toForget() {
      this.$router.push({
        name: 'forget'
      })
    },
    getVerifyStatus() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/login/getIdentifyCodeStatus`
        })
        .then(data => {
          _this.verifyStatus = data
          _this.resetSliderVerify()
        })
        .catch(err => {
          _this.$toast.show(err.message)
        })
    },
    sliderVerifyFinish() {
      console.log('验证完成')
      this.sliderVerify = true
    },
    resetSliderVerify() {
      this.sliderVerify = false
      this.$refs['slider-verify'].reset()
    },
    login() {
      const _this = this
      if (_this.needSliderVerify && !_this.sliderVerify) {
        _this.$toast.show(_this.lang['slider-verify'])
        return
      }
      if (!this.trueUsername) {
        _this.$toast.show(_this.lang['email-error'])
        return
      }
      if (!_this.truePassword) {
        _this.$toast.show(_this.lang['input-password'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/wap/login/submitLogin`,
          params: Object.assign(_this.loginInfo, {
            social: 'account'
          })
        })
        .then(data => {
          console.log('data=======>', data)
          if (!data.token) {
            throw new Error(_this.lang['login-error'])
          }
          _this.$store.commit('setToken', data.token)
          _this.$toast.show(_this.lang['login-success'])

          const lastUrl = _this.$store.state.lastUrl
          _this.$store.commit('setLastUrl', '')
          setTimeout(() => {
            if (lastUrl) {
              _this.$router.replace({
                path: lastUrl
              })
            } else {
              _this.$router.replace({
                name: 'index'
              })
            }
          }, 2000)
        })
        .catch(err => {
          console.error(err)
          _this.$toast.show(err.message)
          _this.getVerifyStatus()
        })
    }
  }
}
</script>

<style scoped>
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
.title-bar .register {
  font-size: 14px;
  color: #666666;
}
.input-line {
  margin-bottom: 8px;
}
/*.input-line:nth-of-type(3) {*/
/*  margin-bottom: 28px;*/
/*}*/
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
.button-line {
  margin-bottom: 18px;
}
.full-btn.login {
  font-size: 16px;
  color: #ffffff;
  background-color: #f29b87;
}
.language-zh_TW .full-btn.login {
  /*letter-spacing: 16px;*/
}
.full-btn.forget {
  font-size: 14px;
  color: #666666;
  background-color: rgba(247, 247, 247, 1);
  border: 1px solid rgba(221, 221, 221, 1); /*no*/
}

.verify-line {
  margin-bottom: 18px;
}
</style>
