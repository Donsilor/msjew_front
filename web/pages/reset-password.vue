<template>
  <div>
    <!-- 手机方式找回密码 -->
    <div v-if="resetType == 1" class="page">
      <div style="height: 0;">
        <input type="text" name="hidden1" style="width:0; height:0;">
        <input type="password" name="hidden1" style="width:0; height:0;">
      </div>
      <div class="content">
        <ul class="schedule">
          <li
            v-for="(item, index) in schedule2"
            :key="index"
            :class="[
              'item',
              { pass: item.key < activeScheduleKey },
              { active: activeScheduleKey === item.key }
            ]"
          >
            <span class="item-number">{{ item.key }}</span>
            <div class="item-name">
              {{ item.name }}
            </div>
          </li>
        </ul>
        <ul class="schedule-content">
          <li class="item item-1" :style="scheduleContentStyle">
            <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
            <div class="item-content">
              <!-- <h2 class="tip">{{ $t(`${lang}.phone`) }}</h2> -->
              <div class="relative input-line">
                <div>
                  <input
                    v-model="mobile"
                    class="bottom-border-input"
                    :placeholder="$t(`${lang}.schedule1-phone`)"
                    @keydown.enter="changeSchedule2(2)"
                    autocomplete="off"
                  />
                </div>
                <div v-show="phonetip" class="error-tip">
                  {{ $t(`${lang}.schedule1-phonetips`) }}
                </div>
              </div>
              <!-- <div class="relative margin-bottom-20 code margin-top-30">
                <div class="row-flex code-main">
                  <div class="register-input margin-right-20">
                    <input
                      v-model="code"
                      type="text"
                      :placeholder="$t(`${lang}.schedule1-code`)"
                    />
                  </div>
                  <div class="send-email-code">
                    <button  :class="['getCode', className]" :disabled="waiting" @click="sendPhoneCode">
                      {{ waitingText }}
                    </button>
                  </div>
                </div>
                <div v-show="codetip" class="error-tip">
                  {{ $t(`${lang}.schedule2-codetips`) }}
                </div>
              </div> -->
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="changeSchedule2(2)"
                >
                  {{ $t(`${lang}.next`) }}
                </button>
              </div>
            </div>
          </li>
          <li class="item item-3" :style="scheduleContentStyle">
            <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
            <div class="relative margin-bottom-20 code margin-top-30">
              <div class="row-flex code-main">
                <div class="register-input ">
                  <input
                    v-model="code"
                    type="text"
                    :placeholder="$t(`${lang}.schedule1-code`)"
                    autocomplete="off"
                  />
                </div>
                <div class="send-email-code">
                  <button  :class="['getCode', className]" :disabled="waiting" @click="sendPhoneCode">
                    {{ waitingText }}
                  </button>
                </div>
              </div>
              <div v-show="codetip" class="error-tip">
                {{ $t(`${lang}.schedule2-codetips`) }}
              </div>
            </div>
            <div class="item-content">
              <div class="input-line relative">
                <input
                  v-model="password"
                  class="bottom-border-input pwdinput"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t(`${lang}.newPassword`)"
                  @keydown.enter="changeSchedule2(3)"
                  autocomplete="off"
                />
                <div class="password-eye" @click="changeRegisterPasswordStatus">
                  <i v-show="!showPassword" class="iconfont iconcloes"></i>
                  <i v-show="showPassword" class="iconfont iconopen"></i>
                </div>
                <div class="pwd-error-tip">
                  {{ $t(`${lang}.newPassword`) }}
                </div>
              </div>
              <div class="input-line relative">
                <input
                  v-model="password_repetition"
                  :type="showPassword ? 'text' : 'password'"
                  class="bottom-border-input pwdinput"
                  :placeholder="$t(`${lang}.confirmPassword`)"
                  @keydown.enter="changeSchedule2(3)"
                  autocomplete="off"
                />
                <div class="password-eye" @click="changeRegisterPasswordStatus">
                  <i v-show="!showPassword" class="iconfont iconcloes"></i>
                  <i v-show="showPassword" class="iconfont iconopen"></i>
                </div>
                <div class="pwd-error-tip">
                  {{ $t(`${lang}.confirmPassword`) }}
                </div>
              </div>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="changeSchedule2(3)"
                >
                  {{ $t(`${lang}.reset`) }}
                </button>
              </div>
            </div>
          </li>
          <li class="item item-4" :style="scheduleContentStyle">
            <div class="item-content">
              <h2 class="tip">{{ $t(`${lang}.hadReset`) }}</h2>
              <h3 class="sub-tip">
                {{ $t(`${lang}.waitTimes`, { second: waitSecond }) }}
              </h3>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="toLogin"
                >
                  {{ $t(`${lang}.loginNow`) }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 邮箱方式找回密码 -->
    <div v-if="resetType == 2" class="page">
      <div style="height: 0;">
        <input type="text" name="hidden1" style="width:0; height:0;">
        <input type="password" name="hidden1" style="width:0; height:0;">
      </div>
      <div class="content">
        <ul class="schedule">
          <li
            v-for="(item, index) in schedule"
            :key="index"
            :class="[
              'item',
              { pass: item.key < activeScheduleKey },
              { active: activeScheduleKey === item.key }
            ]"
          >
            <span class="item-number">{{ item.key }}</span>
            <div class="item-name">
              {{ item.name }}
            </div>
          </li>
        </ul>
        <ul class="schedule-content">
          <li class="item item-1" :style="scheduleContentStyle">
            <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
            <div class="item-content">
              <h2 class="tip">{{ $t(`${lang}.address`) }}</h2>
              <div class="input-line">
                <input
                  v-model="info.email"
                  class="bottom-border-input"
                  @keydown.enter="changeSchedule(2)"
                  autocomplete="off"
                />
              </div>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="changeSchedule(2)"
                >
                  {{ $t(`${lang}.next`) }}
                </button>
              </div>
            </div>
          </li>
          <li class="item item-2" :style="scheduleContentStyle">
            <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
            <div class="item-content">
              <div class="item-icon">
                <img src="/reset-password/email.png" />
              </div>
              <h2 class="tip">
                {{ $t(`${lang}.hadSendEmailCode1`) }}
                <span>{{ info.email }}</span>
                {{ $t(`${lang}.hadSendEmailCode2`) }}
              </h2>
              <div class="wrong-email">
                <span>{{ $t(`${lang}.wrongEmail`) }}</span>
                <span class="rewrite" @click="changeSchedule(1)">
                  {{ $t(`${lang}.changeEmail`) }}
                </span>
              </div>
              <div class="input-line">
                <input
                  v-model="info.code"
                  class="bottom-border-input"
                  :placeholder="$t(`${lang}.inputEmailCode`)"
                  autocomplete="off"
                />
              </div>
              <div class="input-line">
                <input
                  v-model="info.password"
                  class="bottom-border-input"
                  :placeholder="$t(`${lang}.newPassword`)"
                  @keydown.enter="changeSchedule(3)"
                  autocomplete="off"
                />
              </div>
              <div class="input-line">
                <input
                  v-model="info.password_repetition"
                  class="bottom-border-input"
                  :placeholder="$t(`${lang}.confirmPassword`)"
                  @keydown.enter="changeSchedule(3)"
                  autocomplete="off"
                />
              </div>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="changeSchedule(3)"
                >
                  {{ $t(`${lang}.submit`) }}
                </button>
              </div>
            </div>
          </li>
          <!-- <li class="item item-3" :style="scheduleContentStyle">
            <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
            <div class="item-content">
              <h2 class="tip">
                {{ $t(`${lang}.newPassword`) }}
              </h2>
              <h3 class="sub-tip">
                {{ $t(`${lang}.newPasswordTip`) }}
              </h3>
              <div class="wrong-email">
                <span>{{ $t(`${lang}.wrongEmail`) }}</span>
                <span class="rewrite" @click="changeSchedule(1)">
                  {{ $t(`${lang}.changeEmail`) }}
                </span>
              </div>
              <div class="input-line">
                <input
                  v-model="info.password"
                  class="bottom-border-input"
                  :placeholder="$t(`${lang}.newPassword`)"
                  @keydown.enter="changeSchedule(3)"
                />
              </div>
              <div class="input-line">
                <input
                  v-model="info.password_repetition"
                  class="bottom-border-input"
                  :placeholder="$t(`${lang}.confirmPassword`)"
                  @keydown.enter="changeSchedule(3)"
                />
              </div>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="changeSchedule(3)"
                >
                  {{ $t(`${lang}.reset`) }}
                </button>
              </div>
            </div>
          </li> -->
          <li class="item item-4" :style="scheduleContentStyle">
            <div class="item-content">
              <h2 class="tip">{{ $t(`${lang}.hadReset`) }}</h2>
              <h3 class="sub-tip">
                {{ $t(`${lang}.waitTimes`, { second: waitSecond }) }}
              </h3>
              <div class="button-group">
                <button
                  v-loading="ajaxLoading"
                  class="submit-button"
                  @click="toLogin"
                >
                  {{ $t(`${lang}.loginNow`) }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
const lang = 'resetPassword'
const langcode = 'components.sendEmailCode'
const defaultTime = 60
export default {
  components: {},
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
        return ['send', 'reset'].includes(value)
      }
    }
  },
  data() {
    return {
      waiting: false,
      waitingTime: defaultTime,
      waitingText: this.$t(`${langcode}.sendCode`),
      phonetip:false,
      codetip:false,
      pwdtips:true,
      repwdtips:true,
      active: 0,
      lang,
      langcode,
      waitSecond: 10,
      waitTimeout: null,
      activeScheduleKey: 1,
      schedule: [
        {
          key: 1,
          name: this.$t(`${lang}.schedule1`)
        },
        {
          key: 2,
          name: this.$t(`${lang}.schedule3`)
        },
        {
          key: 3,
          name: this.$t(`${lang}.schedule4`)
        }
      ],
      schedule2: [
        {
          key: 1,
          name: this.$t(`${lang}.schedule2`)
        },
        {
          key: 2,
          name: this.$t(`${lang}.schedule3`)
        },
        {
          key: 3,
          name: this.$t(`${lang}.schedule4`)
        }
      ],
      info: {
        email: '',
        code: '',
        password: '',
        password_repetition: '',
      },
      mobile:'',
      code: '',
      password: '',
      password_repetition: '',
      showPassword: false,
      ajaxLoading: false,
      language: '',
      resetType: 2
    }
  },
  watch:{
    // mobile(){
    //   if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
    //     this.phonetip=true
    //   }else{
    //     this.phonetip=false
    //   }
    // }
  },
  computed: {
    scheduleContentStyle() {
      return {
        transform: `translate(-${(this.activeScheduleKey - 1) * 100}%, 0)`
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  mounted() {
    // console.log("语言",this.$store.state.language)
    this.language = this.getCookie('language')
    const _this = this
    _this.$nextTick(() => {})

    var type = this.$route.query.type;
    if(type){
      this.resetType = type;
    }
  },
  methods: {
    // 点击图标切换密码格式
    changeRegisterPasswordStatus() {
      // const info = JSON.parse(JSON.stringify(this.info))
      this.showPassword = !this.showPassword
      // this.info = info
    },
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
    // 倒计时
    countDown() {
      console.log(this.waitingTime)
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.setWait()
          _this.waitingText = _this.$t(`${langcode}.sendCode`)
          _this.waitingTime = defaultTime
        } else {

          _this.waitingText = `${_this.$t(`${langcode}.hadSend`)}(${
            _this.waitingTime
          }s)`
          _this.waitingTime--
        }
      }, 1000)
    },
    // countDown10() {
    //   console.log(this.waitSecond)
    //   const _this = this
    //   const countDownStart = setInterval(function() {
    //     if (_this.waitSecond === 0) {
    //       clearInterval(countDownStart)
    //       _this.setWait()
    //       _this.waitSecond = 10
    //     } else {
    //       _this.waitSecond--
    //     }
    //   }, 1000)
    // },
     // 设置为倒计时状态
    setWait() {
      if (this.waiting) {
        this.waiting = false
      } else {
        this.waiting = true
        this.countDown()
      }
    },
    // 发送手机验证码
    sendPhoneCode() {
      const _this = this
      return new Promise((resolve, reject) => {
        _this.setWait()
        _this
        .$axios({
            method: 'post',
            url: '/web/site/sms-code',
            data: {
              'mobile': _this.mobile,
              'usage': 'up-pwd'
            }
          })
          .then(res => {
            resolve(res)
            if(res.code==200){
              // _this.$successMessage("发送成功")
              // _this.requesting = false
            }
          })
          .catch(err => {
             reject(err)
             _this.resetCountDown()
            _this.requesting = false
            // _this.$errorMessage(err.message)
          })
      })
      // Helpers.requestServer(options)
    },
    // 发送邮箱验证码
    // sendCode() {
      //   const _this = this
      //   return new Promise((resolve, reject) => {
      //     _this
      //       .$axios({
      //         method: 'post',
      //         url: '/web/site/email-code',
      //         data: {
      //           'email': _this.info.email,
      //           'usage': 'up-pwd'
      //         }
      //       })
      //       .then(res => {
      //         console.log("啦啦啦",res)
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
    // },
    sendCode() {
        const _this = this
        return new Promise((resolve, reject) => {
         _this
        .$axios({
            method: 'post',
            url: '/web/site/email-code',
            data:{
              'email': _this.info.email,
              'usage': 'up-pwd'
            }
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
             reject(err)
            _this.requesting = false
            // _this.$errorMessage(err.message)
          })
        })
    },
    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
    },
    mobiletip(){
      if(this.mobile==''){
        throw new Error (this.$t(`${lang}.emptyMobile`))
      }
      if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
        throw new Error (this.$t(`${lang}.mobileTips`))
      }

    },
    emialtip(){
      if (this.info.email=='') {
        throw new Error (this.$t(`${lang}.emptyEmail`))
      }
      if (!((/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.info.email))) {
        throw new Error (this.$t(`${lang}.emailTips`))
      }
    },
    // 繁体和英文步骤条
    async changeSchedule(key) {
      const _this = this
      const nextScheduleKey = key
      _this.ajaxLoading = true
      switch (key) {
        case 1:
          const info = JSON.parse(JSON.stringify(_this.info))
          // info.email = ''
          info.code = ''
          info.password = ''
          info.confirmdPassword = ''
          _this.info = info
          break
        case 2:
          try {
            await _this.emialtip()
            await _this.sendCode()
          } catch (e) {
            _this.$errorMessage(e.message)
            _this.ajaxLoading = false
            return false
          }
          break
        case 3:
          try {
            await _this.resetEmailPassword()
          } catch (e) {
            _this.$errorMessage(e.message)
            _this.ajaxLoading = false
            return
          }
          _this.waitTimeout=setInterval(() => {
            _this.waitSecond--;
            if(_this.waitSecond<=0){
              clearInterval(_this.waitTimeout);
              _this.toLogin()
              _this.waitSecond=10
            }
          },1000);
          // _this.waitTimeout = setTimeout(() => {
          //   _this.waitSecond--
          //   if(_this.waitSecond<=0){
          //     clearTimeout(_this.waitTimeout)
          //     _this.toLogin()
          //   }
          // },1000)
          break
        default:
          _this.ajaxLoading = false
          return
      }
      _this.ajaxLoading = false
      _this.activeScheduleKey = nextScheduleKey
    },
    // 中文
    // async changeSchedule2(key) {
      //   const _this = this
      //   const nextScheduleKey = key
      //   _this.ajaxLoading = true
      //   switch (key) {
      //     case 1:

      //       break
      //     case 2:
      //       try {
      //         await _this.sendPhoneCode()
      //       } catch (e) {
      //         _this.$errorMessage(e.message)
      //         _this.ajaxLoading = false
      //         return
      //       }
      //       break
      //     case 3:
      //       try {
      //         await _this.resetMobilePassword()
      //       } catch (e) {
      //         _this.$errorMessage(e.message)
      //         _this.ajaxLoading = false
      //         return
      //       }
      //       _this.waitTimeout = setTimeout(() => {
      //         clearTimeout(_this.waitTimeout)
      //         _this.toLogin()
      //       }, _this.waitSecond * 1000)
      //       break
      //     default:
      //       _this.ajaxLoading = false
      //       return
      //   }
      //   _this.ajaxLoading = false
      //   _this.activeScheduleKey = nextScheduleKey
    // },
    // 中文步骤条
    async changeSchedule2(key) {
        const _this = this
        const nextScheduleKey = key
        _this.ajaxLoading = true
        switch (key) {
          case 1:
            break;
          case 2:
            try {
              await _this.mobiletip()
              await _this.sendPhoneCode()
            } catch (e) {
              _this.$errorMessage(e.message)
              _this.ajaxLoading = false
              return false
            }
            break
          case 3:
            try {
              await _this.resetMobilePassword()
            } catch (e) {
              _this.$errorMessage(e.message)
              _this.ajaxLoading = false
              return
            }
            _this.waitTimeout=setInterval(() => {
              _this.waitSecond--;
              if(_this.waitSecond<=0){
                clearInterval(_this.waitTimeout);
                _this.toLogin()
                _this.waitSecond=10
              }
            },1000);
            // _this.waitTimeout = setTimeout(() => {
            //   _this.waitSecond--
            //   clearTimeout(_this.waitTimeout)
            //   _this.toLogin()
            // }, _this.waitSecond * 1000)
            break
          default:
            _this.ajaxLoading = false
            return
        }
        _this.ajaxLoading = false
       _this.activeScheduleKey = nextScheduleKey
    },
    // 验证验证码
    //  compareMobileCode() {
      //     const _this = this
      //     return new Promise((resolve, reject) => {
      //       if (!_this.code) {
      //         reject(new Error(_this.$t(`${lang}.inputEmailCode`)))
      //       }

      //       _this
      //         .$axios({
      //           method: 'post',
      //           url: '/web/user/compareCode',
      //           params: {
      //             email: _this.mobile,
      //             code: _this.code
      //           }
      //         })
      //         .then(res => {
      //           console.log(data)
      //           resolve(data)
      //         })
      //         .catch(err => {
      //           reject(err)
      //         })
      //     })
    //   },
    // compareCode() {
      //   const _this = this
      //   return new Promise((resolve, reject) => {
      //     if (!_this.info.code) {
      //       reject(new Error(_this.$t(`${lang}.inputEmailCode`)))
      //     }

      //     _this
      //       .$axios({
      //         method: 'post',
      //         url: '/web/user/compareCode',
      //         params: {
      //           email: _this.info.email,
      //           code: _this.info.code
      //         }
      //       })
      //       .then(data => {
      //         console.log(data)
      //         resolve(data)
      //       })
      //       .catch(err => {
      //         reject(err)
      //       })
      //   })
      // },
    // 重置号码密码
    resetMobilePassword() {
      const _this = this
      return new Promise((resolve, reject) => {
        if (!_this.code) {
          reject(new Error(_this.$t(`${lang}.schedule2-codetips`)))
        }
        if (!_this.password) {
          reject(new Error(_this.$t(`${lang}.newPassword`)))
        }
        if (!_this.password_repetition) {
          reject(new Error(_this.$t(`${lang}.confirmPassword`)))
        }

        this.$axios({
            method: 'post',
            url: '/web/site/mobile-up-pwd',
            data:{
              "mobile":_this.mobile,
              "code":_this.code,
              "password":_this.password,
              "password_repetition":_this.password_repetition
            }
          })
          .then(res => {
            // if(res.code==200){
              console.log("重置手机密码",res)
              resolve(res)
            // }else {
            //   throw new Error (res.message)
            // }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 重置邮箱密码
    resetEmailPassword() {
      const _this = this
      return new Promise((resolve, reject) => {
        if (!_this.info.code) {
          reject(new Error(_this.$t(`${lang}.schedule2-codetips`)))
        }
        if (!_this.info.password) {
          reject(new Error(_this.$t(`${lang}.newPassword`)))
        }
        if (!_this.info.password_repetition) {
          reject(new Error(_this.$t(`${lang}.confirmPassword`)))
        }

        this.$axios({
            method: 'post',
            url: 'web/site/email-up-pwd',
            data:{
              "email":_this.info.email,
              "code":_this.info.code,
              "password":_this.info.password,
              "password_repetition":_this.info.password_repetition
            }
          })
          .then(res => {
            // if(res.code==200){
              // console.log("重置邮箱密码",res)
              resolve(res)
            // } else {
            //   throw new Error (res.message)
            // }
          })
          .catch(err => {
            reject(err)
            // _this.$errorMessage(err.message)
          })
      })
    },
    numCount(){
      const _this = this
      _this.waitTimeout = setTimeout(() => {
        _this.waitSecond--
        if(_this.waitSecond<=0){
          clearTimeout(_this.waitTimeout)
          _this.toLogin()
        }
      },1000)
    },
    toLogin() {
      const _this = this
      _this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="less">
input::placeholder{
  color:#C0C4CC!important;
}
input{
  color: #999999;
}
.getCode {
  width: 100%;
  height: 34px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(168, 143, 130, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 4px;
  box-sizing: border-box;
}

.getCode:disabled {
  // background-color: #999999;
}
.bottom-border-input {
  height: 37px;
  border-bottom: 1px solid #999999;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-align: left;

  &::-webkit-input-placeholder {
    color: #999999;
  }
}

.button-group {
  text-align: center;
  padding-top: 44px;
}
.submit-button {
  width: 400px;
  height: 48px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(168, 143, 130, 1);
}

.page {
  position: relative;
  width: 100%;
  background-image: url('/login/necklace.png'), url('/login/bg.png');
  background-size: 100% 100%;

  .content {
    position: relative;
    width: 1280px;
    margin: auto;
    padding: 50px 0;
    box-sizing: border-box;

    .schedule {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        position: relative;
        width: 394px;
        height: 168px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        transition: all 0.2s linear;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-number {
          margin-bottom: 20px;
          width: 58px;
          height: 58px;
          line-height: 58px;
          font-size: 30px;
          font-family: twCenMT;
          color: rgba(255, 255, 255, 1);
          background: rgba(230, 230, 230, 1);
          border-radius: 50%;
          text-align: center;
        }

        .item-name {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          text-align: center;
        }

        &.pass,
        &.active {
          border: 1px solid rgba(185, 127, 139, 1);
          box-shadow: 0px 5px 0px 0px rgba(238, 187, 194, 0.35);

          .item-number {
            background-color: #ddb0aa;
          }

          .item-name {
            color: #b18f8b;
          }
        }

        &.active {
          :before {
            content: ' ';
            position: absolute;
            top: 100%;
            left: 50%;
            transform-origin: left top;
            transform: translate(-50%, 0) rotateZ(-45deg);
            background-color: rgba(185, 127, 139, 1);
            width: 10px;
            height: 10px;
          }

          :after {
            content: ' ';
            position: absolute;
            top: 100%;
            left: 50%;
            transform-origin: left top;
            transform: translate(-50%, -2px) rotateZ(-45deg);
            background-color: #ffffff;
            width: 10px;
            height: 10px;
          }
        }
      }
    }

    .schedule-content {
      width: 100%;

      list-style: none;
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;

      .item {
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        height: 520px;
        padding: 50px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.9);
        transition: all 0.2s linear;

        .item-title {
          height: 20px;
          border-left: 1px solid #333333;
          padding-left: 27px;
          line-height: 20px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(168, 143, 130, 1);
          box-sizing: border-box;
        }

        &.item-1 {
          .item-content {
            padding-top: 80px;

            .tip {
              margin-bottom: 23px;
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              text-align: center;
            }
            .input-line {
              text-align: center;

              input {
                width: 400px;
              }
            }
          }
        }

        &.item-2 {
          .item-content {
            text-align: center;
            padding-top: 30px;

            .item-icon {
              margin-bottom: 30px;
              font-size: 0;
              line-height: 0;

              img {
                width: 62px;
              }
            }

            .tip {
              width: 60%;
              margin: 0 auto 20px auto;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;

              span {
                margin: 0 10px;
                color: #a88f82;
              }
            }

            .wrong-email {
              width: 370px;
              margin: 0 auto 30px auto;
              display: flex;
              align-items: center;
              justify-content: space-between;

              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);

              .rewrite {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                text-decoration: underline;
                color: rgba(168, 143, 130, 1);
              }
            }

            .input-line {
              width: 370px;
              margin: 0 auto;

              input {
                width: 100%;
                text-align: center;
              }
            }
          }
        }

        &.item-3 {
          .item-content {
            width: 400px;
            margin: auto;
            text-align: left;
            // padding-top: 30px;

            .tip {
              margin: 0 auto 20px auto;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;

              span {
                margin: 0 10px;
                color: #a88f82;
              }
            }

            .sub-tip {
              margin-bottom: 28px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(205, 188, 169, 1);
              line-height: 18px;
            }

            .wrong-email {
              margin: 0 auto 30px auto;
              display: flex;
              align-items: center;
              justify-content: space-between;

              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);

              .rewrite {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                text-decoration: underline;
                color: rgba(168, 143, 130, 1);
              }
            }

            .input-line {
              margin: 0 auto;

              input {
                width: 100%;
                text-align: center;
              }
            }
          }
        }

        &.item-4 {
          .item-content {
            padding-top: 100px;

            .tip {
              margin-bottom: 23px;
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              text-align: center;
            }

            .sub-tip {
              margin-bottom: 28px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(205, 188, 169, 1);
              line-height: 18px;
              text-align: center;
            }

            .button-group {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
  .step-content {
    width: 30%;
    margin: 0 auto;
  }
  // 新加
  .code-size {
    padding: 0 10px;
  }
  .error-tip {
    position: absolute;
    top: 100%;
    left: 33%;
    padding-top: 4px;
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    color: rgba(242, 155, 135, 1);
    // display: none;
  }
  .code {
    text-align: center;
    .register-input {
      position: relative;

      & {
        input {
          width: 280px;
          height: 33px;
          line-height: 33px;
          border-bottom: 1px solid #999999;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 400;
          color: #999999;
          margin-right: 26px
        }
      }
    }
    .getCode {
      padding: 10px 10px;
    }
  }
  .code-main {
    justify-content: center;
  }
  .password-eye {
    position: absolute;
    top: 45%;
    right: 5px;
    transform: translate(0, -50%);

    .iconfont {
      font-size: 20px;
      color: #d2d2d2;
    }
  }
}
.pwdinput{
  text-align: left !important;
  margin-bottom: 20px!important;
}
.pwd-error-tip{
  position: absolute;
  top: 65%;
  left: 0%;
  padding-top: 4px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: rgba(242, 155, 135, 1);
  display: none;
}
</style>
