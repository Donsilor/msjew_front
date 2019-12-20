<template>
  <div class="register-item">
    <div class="row-flex">
      <div class="relative margin-right-20 margin-bottom-20">
        <div class="register-input">
          <input
            v-model="info.surname"
            type="text"
            :placeholder="$t(`${lang}.surname`)"
          />
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.surnameTips`) }}
        </div>
      </div>
      <div class="relative margin-bottom-20">
        <div class="register-input">
          <input
            v-model="info.name"
            type="text"
            :placeholder="$t(`${lang}.name`)"
          />
        </div>
        <div class="error-tip">
          {{ $t(`${lang}.nameTips`) }}
        </div>
      </div>
    </div>
    <div class="relative margin-bottom-20">
      <div class="register-input">
        <input
          v-model="info.email"
          type="text"
          :placeholder="$t(`${lang}.email`)"
        />
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.mailTips`) }}
      </div>
    </div>
    <div class="relative margin-bottom-20">
      <div class="row-flex">
        <div class="register-input margin-right-20">
          <input
            v-model="info.code"
            type="text"
            :placeholder="$t(`${lang}.code`)"
          />
        </div>
        <div class="send-email-code">
          <send-email-code :email="info.email"></send-email-code>
        </div>
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.codeTips`) }}
      </div>
    </div>
    <div class="relative margin-bottom-40">
      <div class="register-input">
        <input
          v-model="info.password"
          class="padding-right-30"
          :type="info.showPassword ? 'text' : 'password'"
          :placeholder="$t(`${lang}.password`)"
        />
        <div class="password-eye" @click="changeRegisterPasswordStatus">
          <i v-show="!info.showPassword" class="iconfont iconcloes"></i>
          <i v-show="info.showPassword" class="iconfont iconopen"></i>
        </div>
      </div>
      <div class="error-tip">
        {{ $t(`${lang}.passwordTips`) }}
      </div>
    </div>
    <div
      class="agreement row-flex align-item-start justify-center margin-bottom-10"
    >
      <el-checkbox v-model="info.agreement"></el-checkbox>
      <p class="agreement-content">
        {{ $t(`${lang}.checked`) }}
        <nuxt-link :to="{ path: '/policies/terms-and-conditions' }">
          {{ $t(`${lang}.rule`) }}
        </nuxt-link>
      </p>
    </div>
    <div class="margin-bottom-29">
      <button v-loading="requesting" class="submit" @click="register">
        {{ $t(`${lang}.registration`) }}
      </button>
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
        surname: '',
        name: '',
        email: '',
        code: '',
        password: '',
        showPassword: false,
        agreement: false
      },
      requesting: false
    }
  },
  computed: {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    changeRegisterPasswordStatus() {
      const info = JSON.parse(JSON.stringify(this.info))
      info.showPassword = !info.showPassword
      this.info = info
    },
    register() {
      const _this = this
      _this.$router.replace({
        path: '/login',
        query: {
          type: 'login'
        }
      })
      // if (!_this.info.surname) {
      //   _this.$errorMessage(_this.$t(`${lang}.surnameTips`))
      // }
      // if (!_this.info.name) {
      //   _this.$errorMessage(_this.$t(`${lang}.nameTips`))
      // }
      // if (!_this.$helpers.trueEmail(_this.info.email)) {
      //   _this.$errorMessage(_this.$t(`${lang}.mailTips`))
      // }
      // if (!_this.info.code) {
      //   _this.$errorMessage(_this.$t(`${lang}.codeTips`))
      // }
      // if (!_this.info.password) {
      //   _this.$errorMessage(_this.$t(`${lang}.pwdType`))
      // }
      // _this.requesting = true
      // _this
      //   .$axios({
      //     method: 'post',
      //     url: `/web/user/signup`,
      //     params: _this.info
      //   })
      //   .then(data => {
      //     console.log(data)
      //     _this.requesting = false
      //     _this.$successMessage(_this.$t(`${lang}.registrySuccessful`))
      //     _this.$router.replace({
      //       path: '/index',
      //       query: {
      //         type: 'register'
      //       }
      //     })
      //   })
      //   .catch(err => {
      //     console.error(err)
      //     _this.requesting = false
      //     _this.$errorMessage(err.message)
      //   })
    }
  }
}
</script>

<style lang="less" scoped>
.margin-bottom-29 {
  margin-bottom: 29px;
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

.register-item {
  height: 425px;
  padding-top: 20px;
  padding-bottom: 23px;

  .register-input {
    position: relative;

    & {
      input {
        width: 100%;
        height: 33px;
        line-height: 33px;
        border-bottom: 1px solid #999999;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }

  .error {
    .register-input {
      input {
        border-bottom: 1px solid #f29b87;
      }
    }
    .error-tip {
      display: initial;
    }
  }

  .send-email-code {
    width: 130px;
    height: 33px;
  }

  .password-eye {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);

    .iconfont {
      font-size: 20px;
      color: #d2d2d2;
    }
  }

  .agreement {
    .agreement-content {
      margin-left: 13px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      text-align: left;

      a {
        margin-left: 5px;
        color: #8b766c;
        cursor: pointer;
      }
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
}
</style>
