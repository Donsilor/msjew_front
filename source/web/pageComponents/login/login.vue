<template>
  <div class="login-item">
    <div class="relative margin-bottom-20">
      <div class="login-input icon-input">
        <span class="icon">
          <img src="/login/mail.png" />
        </span>
        <input
          v-model="info.account"
          type="text"
          :placeholder="$t(`${lang}.mailbox`)"
        />
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.mailTips`) }}
      </div>
    </div>
    <div class="relative margin-bottom-20">
      <div class="login-input icon-input">
        <span class="icon">
          <img src="/login/lock.png" />
        </span>
        <input
          v-model="info.password"
          type="password"
          :placeholder="$t(`${lang}.password`)"
        />
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.passwordTips`) }}
      </div>
    </div>
    <div class="forget margin-bottom-10">
      <nuxt-link :to="{ path: '/reset-password' }">
        {{ $t(`${lang}.forget`) }}
      </nuxt-link>
    </div>
    <div class="relative margin-bottom-30">
      <div class="row-flex align-item-stretch">
        <div class="login-input verification-code-input">
          <input
            v-model="info.code"
            type="text"
            :placeholder="$t(`${lang}.code`)"
            @keydown.enter="login"
          />
        </div>
        <div class="code-picture" @click="refreshCode">
          <picture-verification-code
            ref="picture-verification-code"
            :identify-code="info.pictureCode"
          ></picture-verification-code>
        </div>
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.codeTips`) }}
      </div>
    </div>
    <div class="margin-bottom-29">
      <button v-loading="requesting" class="submit" @click="login">
        {{ $t(`${lang}.login`) }}
      </button>
    </div>
    <div class="gap-line margin-bottom-28">
      <span>{{ $t(`${lang}.logins`) }}</span>
    </div>
    <div class="row-flex justify-center">
      <img src="/login/facebook.png" class="oauth-type" />
      <img src="/login/google.png" class="oauth-type" />
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
const lang = 'login'
export default {
  mixins: [Input],
  data() {
    return {
      lang,
      info: {
        account: '',
        password: '',
        code: '',
        pictureCode: ''
      },
      requesting: false
    }
  },
  computed: {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.refreshCode()
    })
  },
  methods: {
    // 生成驗證碼
    refreshCode() {
      const info = JSON.parse(JSON.stringify(this.info))
      const result = []
      const library = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      this.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        result.push(library[Math.floor(Math.random() * 9)])
      }
      info.pictureCode = result.join('')
      this.info = info
    },
    // 登录
    login() {
      const _this = this
      if (_this.info.code !== _this.info.pictureCode) {
        _this.$errorMessage(_this.$t(`${lang}.codeTips`))
        return
      }
      _this.requesting = true
      _this
        .$axios({
          method: 'post',
          url: `/web/login/submitLogin`,
          params: Object.assign(_this.info, {
            social: 'account'
          })
        })
        .then(data => {
          console.log(data)
          _this.requesting = false
          console.log('data=======>', data)
          if (!data.token) {
            throw new Error(_this.lang['login-error'])
          }
          _this.$store.commit('setToken', data.token)
          _this.$store.dispatch('getUserInfo')

          const lastUrl = _this.$store.state.lastUrl
          _this.$store.commit('setLastUrl', '')
          setTimeout(() => {
            if (lastUrl) {
              _this.$router.replace({
                path: lastUrl
              })
            } else {
              _this.$router.replace({
                path: '/'
              })
            }
          }, 0)
        })
        .catch(err => {
          console.error(err)
          _this.requesting = false
          _this.refreshCode()
          _this.$errorMessage(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.margin-bottom-29 {
  margin-bottom: 29px;
}
.margin-bottom-28 {
  margin-bottom: 28px;
}
.error-tip {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 4px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: rgba(242, 155, 135, 1);
  display: none;
}

.login-item {
  height: 425px;
  padding-top: 20px;
  padding-bottom: 23px;

  .login-input {
    position: relative;

    & {
      input {
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }

    &.icon-input {
      .icon {
        position: absolute;
        top: 50%;
        left: 23px;
        transform: translate(-50%, -50%);
        font-size: 0;
        line-height: 0;

        img {
          width: 16px;
        }
      }

      input {
        padding: 0 20px 0 45px;
      }
    }
  }

  .error {
    .login-input {
      input {
        border: 1px solid #f29b87;
      }
    }
    .error-tip {
      display: initial;
    }
  }

  .verification-code-input {
    flex-grow: 1;
    flex-shrink: 1;
    width: 140px;
    margin-right: 10px;
  }

  .code-picture {
    width: 109px;
    height: 48px;
  }

  .forget {
    margin-top: -6px;
    text-align: right;

    a {
      font-size: 12px;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(153, 153, 153, 1);
    }
  }

  .submit {
    width: 100%;
    height: 48px;
    background: #ffffff;
    border: 1px solid #8b766c;
    font-size: 14px;
    font-weight: 400;
    color: #8b766c;
  }

  .gap-line {
    height: 8px;
    text-align: center;
    border-bottom: 1px solid #ececec;

    span {
      display: inline-block;
      margin: auto;
      padding: 0 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(168, 143, 130, 1);
      background-color: #ffffff;
    }
  }

  .oauth-type {
    width: 35px;
    margin: 0 15px;
  }
}
</style>
