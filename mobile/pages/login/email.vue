<template>
  <div>
    <section>
      <div class="title-bar">
        <span class="title">
          {{ lang['login'] }}
        </span>

        <span  class="register" @click="toRegister">
          {{ lang['no-account'] }}
        </span>
      </div>
      <div class="line-box input-line">
        <div v-if="loginType == 1">
          <bdd-input v-model.trim="loginInfo.username" :placeholder="lang['email']" @blur="inputKey('username')" :maxl="maxlength" @input="keydown('60')"></bdd-input>
          <div :class="[
            'error-message',
            { active: !trueUsername && hadInput('username') }
          ]">
            {{ lang['email-error'] }}
          </div>
        </div>
        <div class="email-val-box" v-else>
          <!-- <div class="area-code">{{ lang['area-code'] }} +86<i class="iconfont iconxiala"></i></div> -->
          <bdd-input v-model.trim="loginInfo.username" :placeholder="lang['phone']" @blur="inputKey('username')" :maxl="maxlength" @input="keydown('11')"></bdd-input>
          <div :class="[
            'error-message',
            { active: !trueUsernameM && hadInput('username') }
          ]">
            <div v-if="!trueUsername && hadInput('username')">
              {{ lang['phone-error'] }}
            </div>
          </div>
        </div>
      </div>
      <div class="line-box input-line">
        <bdd-input v-model.trim="loginInfo.password" :placeholder="lang['password']" :type="'password'" @blur="inputKey('password')" :maxl="maxlength" @input="keydown('30')"></bdd-input>
        <div :class="[
          'error-message',
          { active: !truePassword && hadInput('password') }
        ]">
          {{ lang['password-error'] }}
        </div>
      </div>
      <div class="line-box input-line">
        <div class="code">
          <bdd-input v-model="code" :placeholder="lang['Code']" @blur="inputKey('code')" :maxl="maxlength" @input="keydown('15','code')"></bdd-input>
          <div class="code-picture" @click="refreshCode">
            <picture-verification-code ref="picture-verification-code" :identify-code="pictureCode"></picture-verification-code>
          </div>
        </div>
        <div :class="[
          'error-message',
          { active: ! trueCode && hadInput('code') }
        ]">
          {{ lang['code-error'] }}
        </div>
      </div>

      <div class="line-box button-line" v-if="loginType == 2">
        <button class="full-btn login zh" @click="loginCN">
          <span class="btn-message">{{ lang['login-now'] }}</span>
        </button>
      </div>
       <div class="line-box button-line" v-else>
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

  </div>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  layout: 'login',
  mixins: [Input],
  data () {
    return {
      url:this.$route.query.url,
      lang: this.LANGUAGE.login.email,
      loginInfo: {
        username: '',
        password: '',
      },
      code: '',
      pictureCode: '',
      verifyStatus: 1, // 控制滑动验证是否显示
      sliderVerify: false, // 滑动验证是否完成
      errorKeys: [],
      language: '',
      loginType: '',
      registerType:1,
      maxlength: '30'
    }
  },
  computed: {
    needSliderVerify () {
      return this.verifyStatus === 2
    },
    trueUsername () {
      return this.$helpers && this.$helpers.trueEmail(this.loginInfo.username)
    },
    trueUsernameM () {
      return this.loginInfo.username && (/^1[3456789]\d{9}$/.test(this.loginInfo.username))
    },
    truePassword () {
      return this.loginInfo.password && this.loginInfo.password.length > 5
    },
    trueCode () {
      return this.code && this.code == this.pictureCode
    }
  },
  mounted () {
    this.refreshCode()
    this.loginType=localStorage.getItem('loginType')
    this.language = this.$store.state.language;

    const _this = this
    _this.$nextTick(() => {
      // _this.getVerifyStatus()
    })
    this.loginType = localStorage.getItem('loginType')
  },
  methods: {
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
    },
    toRegister () {
      this.$router.push({
        name: 'register'
      })
    },

    toForget () {
      this.$router.push({
        name: 'forget'
      })
    },
    loginCN () {
      const _this = this
      if (_this.needSliderVerify && !_this.sliderVerify) {
        _this.$toast.show(_this.lang['slider-verify'])
        return
      }
      if (!this.trueUsernameM) {
          _this.$toast.show(_this.lang['phone-error'])
        return
      }
      if (!_this.truePassword) {
        _this.$toast.show(_this.lang['input-password'])
        return
      }
      if (!_this.code) {
        _this.$toast.show(_this.lang['input-code'])
        return
      }
      if (_this.code !== _this.pictureCode) {
        _this.$toast.show(_this.lang['codeError'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/login`,
          data: _this.loginInfo
        })
        .then(res => {
          // console.log('data=======>', data)
          if (!res.access_token) {
            throw new Error(_this.lang['login-error'])
          }
          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("accessToken", res.access_token);
          let nowDate = parseInt((new Date()).getTime() / 1000)
          localStorage.setItem("refreshTime", nowDate);

          _this.$store.commit('setToken', res.access_token)
          _this.$store.commit('setUserInfo', res.member);
          _this.$toast.show(_this.lang['login-success'])
          _this.$store.dispatch('synchronizeCart')
          // _this.$store.dispatch('synchronizeCart')
          // const lastUrl = _this.$store.state.lastUrl
          const lastUrl=localStorage.getItem("url")
          // _this.$store.commit('setLastUrl', '')
          console.log("order-lastUrL",lastUrl)
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
          // _this.getVerifyStatus()
        })
    },
    login () {
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
      if (!_this.code) {
        _this.$toast.show(_this.lang['input-code'])
        return
      }
      if (_this.code !== _this.pictureCode) {
        _this.$toast.show(_this.lang['codeError'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/login`,
          data: _this.loginInfo
        })
        .then(res => {
          console.log('data=======>', res.access_token)


          if (!res.access_token) {
            throw new Error(_this.lang['login-error'])
          }

          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("accessToken", res.access_token);
          let nowDate = parseInt((new Date()).getTime() / 1000)
          localStorage.setItem("refreshTime", nowDate);

          _this.$store.commit('setToken', res.access_token)
          _this.$toast.show(_this.lang['login-success'])
          _this.$store.commit('setUserInfo', res.member);
          // const lastUrl = _this.$store.state.lastUrl
          const lastUrl=localStorage.getItem("url")
           _this.$store.dispatch('synchronizeCart')
          // _this.$store.commit('setLastUrl', '')
          console.log("order-lastUrL",lastUrl)
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
          // _this.getVerifyStatus()
        })
    },
    keydown(k, j){
      this.maxlength = k;

      if(j && j == 'code'){
        // var reg = /^\d$/;
        // if(!reg.test(this.code.slice(-1))){
          // this.code = this.code.slice(0, -1)
        // }
      }
    }

  }
}
</script>

<style scoped>
.code-picture {
  width: 109px;
  height: 40px;
}
.code{
  display: flex;
  justify-content: space-between;
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
  min-height: 8px;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  color: rgba(237, 73, 73, 1);
  opacity: 0;
  padding-top: 4px;
}
.error-message.active {
  min-height: 21px;
  line-height: 20px;
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

/* .email-val-box{
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
} */
</style>
