<template>
  <div>
    <div class="operate-bar">
      <i class="icon iconfont iconguanbi close" @click="goBack($router)"></i>
    </div>
    <nuxt-child
      :mobile="info.mobile"
      :email="info.email"
      :code="info.code"
      :password="info.password"
      @emailFinish="emailFinish"
      @mobileFinish="mobileFinish"
      @compareCode="compareCode"
      @newPasswordFinish="newPasswordFinish"
      @newPasswordFinishCN="newPasswordFinishCN"
    />
  </div>
</template>

<script>
export default {
  middleware: 'replaceWhenTokenCanUse',
  layout: 'login',
  head() {
    return {
      title: `BBD&Co.`
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.forget.basic,
      info: {
        mobile:'',
        email: '',
        code: '',
        password: '',
        password_repetition: '',
        pictureCode: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    mobileFinish(res) {
      // console.log('mobileFinish===>',mobile)
      const _this = this

      const info = JSON.parse(JSON.stringify(_this.info))
      info.mobile = res.mobile
      info.code = res.code
      info.pictureCode = res.pictureCode
      _this.info = info

      if (!info.mobile) {
        _this.$toast(_this.lang['mobile-null'])
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(info.mobile))) {
        _this.$toast(_this.lang['mobile-error'])
        return
      }

      if(!info.code){
        _this.$toast(_this.lang['code'])
        return
      }

      if(info.code != info.pictureCode){
        _this.$toast(_this.lang['codeError'])
        return
      }

      _this.$router.push({
        name: 'forget-new-password'
      })
    },
    emailFinish(res) {
      // console.log('emailFinish===>', email)
      const _this = this
      const info = JSON.parse(JSON.stringify(_this.info))
      info.email = res.email
      info.code = res.code
      info.pictureCode = res.pictureCode
      _this.info = info

      if (!info.email) {
        _this.$toast(_this.lang['email-null'])
        return
      }
      if (!_this.$helpers.trueEmail(info.email)) {
        _this.$toast(_this.lang['email-error'])
        return
      }

      if(!info.code){
        _this.$toast(_this.lang['code'])
        return
      }

      if(info.code != info.pictureCode){
        _this.$toast(_this.lang['codeError'])
        return
      }

      _this.$router.push({
        name: 'forget-new-password'
      })
    },
    compareCode(data = {}) {
      // const _this = this
      // const info = JSON.parse(JSON.stringify(_this.info))
      // info.code = data.code || ''
      // this.info = info

      // if (!info.code) {
      //   _this.$toast(_this.lang['code-null'])
      //   return
      // }
      
      // _this
      //   .$axios({
      //     method: 'post',
      //     url: `/wap/user/compareCode`,
      //     params: {
      //       email: info.email,
      //       code: info.code
      //     }
      //   })
      //   .then(data => {
      //     console.log(data)
      //     _this.$router.push({
      //       name: 'forget-new-password'
      //     })
      //   })
      //   .catch(err => {
      //     _this.$toast(err.message)
      //   })
    },
    newPasswordFinishCN(data = '') {
      const _this = this
      const info = JSON.parse(JSON.stringify(_this.info))
      info.code = data.code || ''
      info.password = data.password || ''
      info.password_repetition = data.password_repetition || ''
      _this.info = info

      if (!info.code) {
        _this.$toast(_this.lang['code-null'])
        return
      }

      if (!info.password) {
        _this.$toast(_this.lang['password-null'])
        return
      }
      if (info.password !== info.password_repetition) {
        _this.$toast(_this.lang['password-not-same'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/mobile-up-pwd`,
          data: info
        })
        .then(data => {
          // console.log(data)
          _this.$router.push({
            name: 'forget-success'
          })
        })
        .catch(err => {
          _this.$toast(err.message)
        })
    },
    newPasswordFinish(data = '') {
      const _this = this
      const info = JSON.parse(JSON.stringify(_this.info))
      info.code = data.code || ''
      info.password = data.password || ''
      info.password_repetition = data.password_repetition || ''
      _this.info = info

      if (!info.code) {
        _this.$toast(_this.lang['code-null'])
        // console.log(1111)
        return
      }

      if (!info.password) {
        _this.$toast(_this.lang['password-null'])
        return
      }
      if (info.password !== info.password_repetition) {
        _this.$toast(_this.lang['password-not-same'])
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/web/site/email-up-pwd`,
          data:info
        })
        .then(res => {
          // console.log(res)
          _this.$router.push({
            name: 'forget-success'
          })
        })
        .catch(err => {
          _this.$toast(err.message)
        })
    }
  }
}
</script>

<style scoped>
.operate-bar {
  height: 17px;
  text-align: right;
  margin-bottom: 64px;
}
.operate-bar .close {
  font-size: 17px;
  color: #333333;
}
</style>
