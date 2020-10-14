<template>
  <div class="container">
    <div class="login-page1" v-if="loginStep == 1">
      <div class="operate-bar">
        <i class="icon iconfont iconguanbi close" @click="closePop"></i>
      </div>

      <section>
        <div class="title-bar">
          <span class="title">
            {{ lang['login'] }}
          </span>
        </div>

        <div class="line-box">
          <button class="full-btn phone" @click="toNextStep(2)">
            <img src="../../static/login/shoujihao.png" class="btn-icon" />
            <span class="btn-message">
              {{ lang['phone-login'] }}&nbsp;&nbsp;&nbsp;
            </span>
          </button>
        </div>

        <div class="line-box">
          <button class="full-btn email" @click="toNextStep(1)">
            <img src="/email.svg" class="btn-icon" />
            <span class="btn-message">
              {{ lang['email-login'] }}
            </span>
          </button>
        </div>   
      </section>
    </div>

    <div class="login-page2" v-if="loginStep == 2">
      <div class="operate-bar">
        <i class="icon iconfont iconguanbi close" @click="closePop"></i>
      </div>

      <section>
        <div class="title-bar">
          <span class="title">
            {{ lang2['login'] }}
          </span>
          <span  class="register" @click="toRegister">
            {{ lang2['no-account'] }}
          </span>
        </div>
      
        <div class="line-box input-line">
          <div v-if="loginType == 1">
            <bdd-input v-model.trim="loginInfo.username" :placeholder="lang2['email']" @blur="inputKey('username')" :maxl="maxlength" @input="keydown('60')"></bdd-input>
            <div :class="['error-message',{ active: !trueUsername && hadInput('username') }]">
              {{ lang2['email-error'] }}
            </div>
          </div>

          <div class="email-val-box" v-else>
            <bdd-input v-model.trim="loginInfo.username" :placeholder="lang2['phone']" @blur="inputKey('username')" :maxl="maxlength" @input="keydown('11')"></bdd-input>
            <div :class="['error-message',{ active: !trueUsernameM && hadInput('username') }]">
              <div v-if="!trueUsername && hadInput('username')">
                {{ lang2['phone-error'] }}
              </div>
            </div>
          </div>
        </div>

        <div class="line-box input-line">
          <bdd-input v-model.trim="loginInfo.password" :placeholder="lang2['password']" :type="'password'" @blur="inputKey('password')" :maxl="maxlength" @input="keydown('30')"></bdd-input>
          <div :class="['error-message',{ active: !truePassword && hadInput('password') }]">
            {{ lang2['password-error'] }}
          </div>
        </div>

        <div class="line-box input-line">
          <div class="code">
            <bdd-input v-model="code" :placeholder="lang2['Code']" @blur="inputKey('code')" :maxl="maxlength" @input="keydown('15','code')"></bdd-input>
            <div class="code-picture" @click="refreshCode">
              <picture-verification-code ref="picture-verification-code" :identify-code="pictureCode"></picture-verification-code>
            </div>
          </div>
          <div :class="['error-message',{ active: ! trueCode && hadInput('code') }]">
            {{ lang2['code-error'] }}
          </div>
        </div>

        
        <div class="line-box button-line" v-if="loginType == 1">
          <button class="full-btn login" @click="login">
            <span class="btn-message">{{ lang2['login-now'] }}</span>
          </button>
        </div>
        <div class="line-box button-line" v-else>
          <button class="full-btn login zh" @click="loginCN">
            <span class="btn-message">{{ lang2['login-now'] }}</span>
          </button>
        </div>
        <div class="line-box button-line">
          <button class="full-btn forget" @click="toForget">
            <span class="btn-message">
              {{ lang2['forget'] }}
            </span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  mixins: [Input],
  data() {
    return {
      lang: this.LANGUAGE.login.index,
      lang2: this.LANGUAGE.login.email,
      language:'',
      loginInfo: {
        username: '',
        password: '',
      },
      code: '',
      pictureCode: '',
      language: '',
      maxlength: '30',
      loginStep: 1,
      loginType: 1,
      url: ''
    }
  },
  computed: {
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
    this.language = this.$store.state.language

    let oldurl=window.location.pathname
    let params=window.location.search
    //如果是订单确认页面，返回到购物车
    if((/^\/cart\/sureOrder/).test(oldurl)){
        oldurl = '/cart'
        params = ''
    }

    this.url=oldurl+params
    localStorage.setItem('url', this.url)
  },
  methods: {
    // 关闭弹窗
    closePop() {
      this.$emit('closePop', true)
    },
    // 登录下一步
    toNextStep(k) {
      localStorage.setItem('loginType',k)
      this.loginType = k
      this.loginStep = 2
    },
    // 生成驗證碼
    refreshCode () {
      const result = []
      const library = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      this.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        result.push(library[Math.floor(Math.random() * 9)])
      }
      this.pictureCode = result.join('')
    },
    // 注册
    toRegister () {
      this.$router.push({
        name: 'register'
      })
    },
    // 忘记密码
    toForget () {
      this.$router.push({
        name: 'forget'
      })
    },
    // 手机登录
    loginCN () {
      const _this = this
      if (!this.trueUsernameM) {
          _this.$toast.show(_this.lang2['phone-error'])
        return
      }
      if (!_this.truePassword) {
        _this.$toast.show(_this.lang2['input-password'])
        return
      }
      if (!_this.code) {
        _this.$toast.show(_this.lang2['input-code'])
        return
      }
      if (_this.code !== _this.pictureCode) {
        _this.$toast.show(_this.lang2['codeTips'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/login`,
          data: _this.loginInfo
        })
        .then(res => {
          if (!res.access_token) {
            throw new Error(_this.lang2['login-error'])
          }
          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("accessToken", res.access_token);
          let nowDate = parseInt((new Date()).getTime() / 1000)
          localStorage.setItem("refreshTime", nowDate);

          _this.$store.commit('setToken', res.access_token)
          _this.$store.commit('setUserInfo', res.member)
          _this.closePop()
          _this.$toast.show(_this.lang2['login-success'])
          _this.$store.dispatch('synchronizeCart')

          setTimeout(() => {
            if(this.url){
              if((/^\/cart\/sureOrder/).test(window.location.pathname)){
                _this.$router.replace({
                  path: this.url
                })
              }else{
                location.reload()
                return
              }
            }else{
              _this.$router.replace({
                path: '/'
              })
            }
          }, 1000)
        })
        .catch(err => {
          console.error(err)
          _this.$toast.show(err.message)
        })
    },
    login () {
      const _this = this
      if (!this.trueUsername) {
        _this.$toast.show(_this.lang2['email-error'])
        return
      }
      if (!_this.truePassword) {
        _this.$toast.show(_this.lang2['input-password'])
        return
      }
      if (!_this.code) {
        _this.$toast.show(_this.lang2['input-code'])
        return
      }
      if (_this.code !== _this.pictureCode) {
        _this.$toast.show(_this.lang2['codeTips'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/login`,
          data: _this.loginInfo
        })
        .then(res => {
          if (!res.access_token) {
            throw new Error(_this.lang2['login-error'])
          }

          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("accessToken", res.access_token);
          let nowDate = parseInt((new Date()).getTime() / 1000)
          localStorage.setItem("refreshTime", nowDate);

          _this.$store.commit('setToken', res.access_token)
          _this.$store.commit('setUserInfo', res.member);
          _this.closePop()
          _this.$toast.show(_this.lang2['login-success'])
          _this.$store.dispatch('synchronizeCart')

          setTimeout(() => {
            if(this.url){
              if((/^\/cart\/sureOrder/).test(window.location.pathname)){
                _this.$router.replace({
                  path: this.url
                })
              }else{
                location.reload()
                return
              }
            }else{
              _this.$router.replace({
                path: '/'
              })
            }
          }, 1000)
        })
        .catch(err => {
          console.error(err)
          _this.$toast.show(err.message)
        })
    },
    keydown(k, j){
      this.maxlength = k;
    }

  }
}
</script>

<style lang="less" scoped>
  .container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 24;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .login-page1{
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 40px);
    height: 230px;
    background-color: #fff;
    border-radius: 6px;

    .operate-bar {
      height: 40px;
      text-align: right;
      line-height: 40px;
    }
    .operate-bar .close {
      font-size: 17px;
      color: #333333;
      margin-right: 15px;
    }

    .title-bar {
      margin-top: -6px;
      margin-bottom: 20px;
      text-align: center;
    }
    .title-bar .title {
      font-size: 18px;
      color: #333333;
    }
    .title-bar .register {
      font-size: 14px;
      color: #666666;
    }
    .line-box {
      width: 80%;
      margin: 0 auto 25px;
    }
    .full-btn.email {
      font-size: 16px;
      color: #ffffff;
      background-color: #f29b87;
    }
    .full-btn.email img {
      width: 18px;
      margin-right: 10px;
    }
    .full-btn.phone {
      font-size: 16px;
      color: #ffffff;
      /* background-color: #a24612; */
      background-color: #a8cdb6;
      letter-spacing: 1px;
    }
    .full-btn.phone img {
      width: 18px;
      margin: 0 8px 0 6px;
    }
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
      border: 1px solid rgba(170, 170, 170, 1); /*no*/
    }
    .full-btn.google img {
      width: 16px;
      margin-right: 20px;
    }

    .tip {
      height: 9px;
      text-align: center;
      border-bottom: 1px solid #dddddd; /*no*/
      margin-bottom: 32px;
    }
    .tip-message {
      font-size: 13px;
      color: #999999;
      padding: 0 29px;
      background-color: #ffffff;
    }
  }

  

  .login-page2{
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 40px);
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;

    .operate-bar {
      height: 40px;
      text-align: right;
      line-height: 40px;
      margin-bottom: 30px;
    }
    .operate-bar .close {
      font-size: 17px;
      color: #333333;
    }

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

    .full-btn.forget {
      font-size: 14px;
      color: #666666;
      background-color: rgba(247, 247, 247, 1);
      border: 1px solid rgba(221, 221, 221, 1); /*no*/
    }

    .verify-line {
      margin-bottom: 18px;
    }
  }

  
</style>
