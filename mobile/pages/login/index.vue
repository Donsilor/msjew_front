<template>
<div>
  <!-- <div v-if="language === 'zh_CN'"> -->
  <!--  <section>
      <div class="title-bar">
        <span class="title">
          {{ lang['login'] }}
        </span>
        <span class="register" @click="toRegister">
          {{ lang['no-account'] }}
        </span>
      </div>
      <div class="line-box">
        <button class="full-btn phone" @click="toEmailLogin">
          <img src="/email.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['email-login'] }}
          </span>
        </button>
      </div> -->

      <!--    <div class="tip">-->
      <!--      <span class="tip-message">-->
      <!--        {{ lang['oauth-login'] }}-->
      <!--      </span>-->
      <!--    </div>-->
      <!-- <div class="line-box">
        <button class="full-btn facebook" @click="oauthLogin('facebook')">
          <img src="/facebook.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['facebook-login'] }}
          </span>
        </button>
      </div>
      <div class="line-box">
        <button class="full-btn google" @click="oauthLogin('google')">
          <img src="/google.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['google-login'] }}&nbsp;&nbsp;&nbsp;
          </span>
        </button>
      </div> -->
    <!-- </section> -->
  <!-- </div> -->
  <div>
    <section>
      <div class="title-bar">
        <span class="title">
          {{ lang['login'] }}
        </span>
        <!-- <span class="register" @click="toRegister">
          {{ lang['no-account'] }}
        </span> -->
      </div>
      <div class="line-box">
        <button class="full-btn phone" @click="toPhoneLogoin">
          <img src="../../static/login/shoujihao.png" class="btn-icon" />
          <span class="btn-message">
            {{ lang['phone-login'] }}&nbsp;&nbsp;&nbsp;
          </span>
        </button>
      </div>
      
      <div class="line-box">
        <button class="full-btn email" @click="toEmailLogin">
          <img src="/email.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['email-login'] }}
          </span>
        </button>
      </div>

      <!--    <div class="tip">-->
      <!--      <span class="tip-message">-->
      <!--        {{ lang['oauth-login'] }}-->
      <!--      </span>-->
      <!--    </div>-->
      <!-- <div class="line-box">
        <button class="full-btn facebook" @click="oauthLogin('facebook')">
          <img src="/facebook.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['facebook-login'] }}
          </span>
        </button>
      </div>
      <div class="line-box">
        <button class="full-btn google" @click="oauthLogin('google')">
          <img src="/google.svg" class="btn-icon" />
          <span class="btn-message">
            {{ lang['google-login'] }}&nbsp;&nbsp;&nbsp;
          </span>
        </button>
      </div> -->

      
    </section>
  </div>
</div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      lang: this.LANGUAGE.login.index,
      language:''
    }
  },
  mounted(){
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
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    toEmailLogin() {
      localStorage.setItem('loginType','1')
      this.$router.push({
        name: 'login-email'
      })
    },
    toPhoneLogoin(){
      localStorage.setItem('loginType','2')
      this.$router.push({
        name: 'login-email'
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

<style scoped>
.title-bar {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  margin-bottom: 25px;
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

</style>
