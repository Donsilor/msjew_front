<template>
  <div>
    <!-- 手机注册 -->
    <div v-if="loginType == 1" class="register-item">
      <form onsubmit="return change()" id="myForm" method="POST" class="form-horizontal" role="form">
		<div style="position: fixed;z-index: -999;">
			<input type="text" name="hidden1" id="text" value="123">
			<input type="password" name="hidden1" id="password" value="456">
		</div>

        <div class="row-flex">
          <div class="relative margin-bottom-20 margin-right-20" >
            <div class="register-input">
              <input
                v-model="lastname"
                @input="lastName"
                @focus="focusEvent"
                @blur="blurEvent"
                v-bind:class="{active:isActivelast}"
                type="text"
                :placeholder="$t(`${lang}.surname`)"
                maxlength="30"
				autocomplete="off"
              />
            </div>
            <div v-show="lastnameShow"  class="error-tip">
              {{ $t(`${lang}.nameTips`) }}
            </div>
          </div>

          <div class="relative  margin-bottom-20">
            <div class="register-input">
              <input
                v-model="firstname"
                @input="firstName"
                @focus="focusEvents"
                @blur="blurEvents"
                v-bind:class="{active:isActivefisrt}"
                type="text"
                :placeholder="$t(`${lang}.nameTips`)"
                maxlength="30"
				autocomplete="off"
              />
            </div>
            <div v-show="firstnameShow" class="error-tip">
              {{ $t(`${lang}.surnameTips`) }}
            </div>
          </div>

          <!-- 姓名 -->
          <!-- <div class="relative margin-bottom-20">
            <div class="register-input">
              <input
                v-model="firstname"
                type="text"
                @focus="focusEvent1"
                @blur="blurEvent1"
                v-bind:class="{active:isActivename}"
                :placeholder="$t(`${lang}.name`)"
              />
            </div>
            <div v-show="nameShow" class="error-tip">
              {{ $t(`${lang}.surnameTips`) }}
            </div>
          </div> -->
        </div>
        <!-- 手机号 -->
        <div class="relative margin-bottom-20">
          <div class="register-input email-val-box">
            <div class="area-code">{{ $t(`${lang}.China`) }} +86<i class="iconfont iconxiala"></i></div>
            <input
              v-model.trim="mobile"
              type="text"
			  @focus="focusEvent2"
              @blur="verifyMobile"
              v-bind:class="{active:isActivemobile}"
              :placeholder="$t(`${lang}.phoneBox`)"
              maxlength="11"
			  autocomplete="off"
            />
          </div>
          <div v-show="mobileShow" class="error-tip">
            {{ $t(`${lang}.phoneTips`) }}
          </div>
        </div>
        <!-- 输入验证码 -->
        <div class="relative margin-bottom-20">
          <div class="row-flex">
            <div class="register-input margin-right-20">
              <input
                v-model="code"
                readonly onfocus="this.removeAttribute('readonly');"
                @focus="focusEvent3"
                @blur="blurEvent3"
                v-bind:class="{active:isActivecode}"
                type="text"
                :placeholder="$t(`${lang}.code`)"
                maxlength="15"
                @input="inputCode"
				autocomplete="off"
              />
            </div>
            <div class="send-email-code">
              <!-- <send-email-code :email="info.email"></send-email-code> -->
              <button  :class="['getCode', className]" type="button" :disabled="waiting" @click="sendPhoneCode">
                {{ waitingText }}
              </button>
            </div>
          </div>
          <div v-show="codeShow" class="error-tip">
            {{ $t(`${lang}.codeTips`) }}
          </div>
        </div>
        <!-- 设置密码 -->
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model.trim="password"
              readonly onfocus="this.removeAttribute('readonly');"
              @focus="focusEvent4"
              @blur="blurEvent4"
              v-bind:class="{active:isActivepwd}"
              class="padding-right-30"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t(`${lang}.pwdType`)"
              maxlength="30"
			  autocomplete="off"
            />
            <div class="password-eye" @click="changeRegisterPasswordStatus">
              <i v-show="!showPassword" class="iconfont iconcloes"></i>
              <i v-show="showPassword" class="iconfont iconopen"></i>
            </div>
          </div>
          <div v-show="pwdShow" class="error-tip">
            {{ $t(`${lang}.passwordTips`) }}
          </div>
        </div>
        <!-- 确认密码 -->
        <div class="relative margin-bottom-40">
          <div class="register-input">
            <input
              v-model.trim=" password_repetition"
              readonly onfocus="this.removeAttribute('readonly');"
              v-bind:class="{active:isActiverepwd}"
              @focus="focusEvent5"
              @blur="verifyPasswordRepetition"
              class="padding-right-30"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t(`${lang}.repassword`)"
              maxlength="30"
			  autocomplete="off"
            />
            <div class="password-eye" @click="changeRegisterPasswordStatus">
              <i v-show="!showPassword" class="iconfont iconcloes"></i>
              <i v-show="showPassword" class="iconfont iconopen"></i>
            </div>
          </div>
          <div v-show="repwdShow" class="error-tip">
            {{ $t(`${lang}.passwordTips`) }}
          </div>
        </div>
        <div class="agreement row-flex align-item-start justify-center margin-bottom-10" >
          <el-checkbox v-model="agreement"></el-checkbox>
          <p class="agreement-content">
            {{ $t(`${lang}.checked`) }}
            <nuxt-link :to="{ path: '/policies/terms-and-conditions' }" target="_blank">
            {{ $t(`${lang}.rule`) }}
            </nuxt-link>
            <!-- <a href="/policies/terms-and-conditions" target="_blank">{{ $t(`${lang}.rule`) }}</a> -->
            <!-- <a href="/policies/terms-and-conditions" target="_blank">
              {{ $t(`${lang}.rule`) }}
            </a> -->
          </p>
        </div>
        <div class="margin-bottom-29">
          <button v-loading="requesting" type="button" class="submit" @click="register">
            {{ $t(`${lang}.registration`) }}
          </button>
        </div>
      </form>
    </div>
    <!-- 邮箱注册 -->
    <div v-if="loginType == 2" class="register-item">
      <form>
		<div style="position: fixed;z-index: -999;">
			<input type="text" name="hidden1" id="text" value="123">
			<input type="password" name="hidden1" id="password" value="456">
		</div>
		
        <div class="row-flex">
          <div class="relative margin-right-20 margin-bottom-20">
            <div class="register-input">
              <input
                v-model="firstname"
                @input="firstName"
                @focus="focusEvents"
                @blur="blurEvents"
                v-bind:class="{active:isActivefisrt}"
                type="text"
                :placeholder="$t(`${lang}.name`)"
                maxlength="30"
              />
            </div>
            <div v-show="firstnameShow" class="error-tip">
              {{ $t(`${lang}.surnameTips`) }}
            </div>
          </div>
          <div class="relative margin-bottom-20">
            <div class="register-input">
              <input
                v-model="lastname"
                @input="lastName"
                @focus="focusEvent"
                @blur="blurEvent"
                v-bind:class="{active:isActivelast}"
                type="text"
                :placeholder="$t(`${lang}.surname`)"
                maxlength="30"
              />
            </div>
            <div v-show="lastnameShow" class="error-tip">
              {{ $t(`${lang}.nameTips`) }}
            </div>
          </div>
        </div>
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model.trim="email"

              @input="inputEvent2"
              @focus="focusEvent2"
              @blur="blurEvent2"
              type="text"
              v-bind:class="{active:isActivemail}"
              :placeholder="$t(`${lang}.email`)"
              maxlength="60"
            />
          </div>
          <div v-show="emailShow" class="error-tip">
            {{ $t(`${lang}.mailTips`) }}
          </div>
        </div>
        <div class="relative margin-bottom-20">
          <div class="row-flex">
            <div class="register-input margin-right-20">
              <input
                v-model="code"
                readonly onfocus="this.removeAttribute('readonly');"
                @input="inputCode"
                @focus="focusEvent3"
                @blur="blurEvent3"
                v-bind:class="{active:isActivecode}"
                type="text"
                :placeholder="$t(`${lang}.code`)"
                maxlength="15"
              />
            </div>
            <div class="send-email-code">
              <!-- <send-email-code :email="info.email"></send-email-code> -->
              <button  :class="['getCode', className]" type="button" :disabled="waiting" @click="sendCode">
                {{ waitingText }}
              </button>
            </div>
          </div>
          <div v-show="codeShow" class="error-tip">
            {{ $t(`${lang}.codeTips`) }}
          </div>
        </div>
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model.trim="password"
              readonly onfocus="this.removeAttribute('readonly');"
              @focus="focusEvent4"
              @blur="blurEvent4"
              v-bind:class="{active:isActivepwd}"
              class="padding-right-30"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t(`${lang}.password`)"
              maxlength="30"
            />
            <div class="password-eye" @click="changeRegisterPasswordStatus">
              <i v-show="!showPassword" class="iconfont iconcloes"></i>
              <i v-show="showPassword" class="iconfont iconopen"></i>
            </div>
          </div>
          <div v-show="pwdShow" class="error-tip">
            {{ $t(`${lang}.passwordTips`) }}
          </div>
        </div>
        <div class="relative margin-bottom-20">
          <div class="register-input">
            <input
              v-model.trim="password_repetition"

              @focus="focusEvent5"
              @blur="verifyPasswordRepetition"
              v-bind:class="{active:isActiverepwd}"
              class="padding-right-30"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t(`${lang}.repassword`)"
              maxlength="30"
            />
            <div class="password-eye" @click="changeRegisterPasswordStatus">
              <i v-show="!showPassword" class="iconfont iconcloes"></i>
              <i v-show="showPassword" class="iconfont iconopen"></i>
            </div>
          </div>
          <div v-show="repwdShow" class="error-tip">
            {{ $t(`${lang}.repassword`) }}
          </div>
        </div>
        <div class="agreement row-flex align-item-start justify-center margin-bottom-10">
          <el-checkbox v-model="agreement"></el-checkbox>
          <p class="agreement-content">
            {{ $t(`${lang}.checked`) }}
            <nuxt-link :to="{ path: '/policies/terms-and-conditions' }">
              {{ $t(`${lang}.rule`) }}
            </nuxt-link>
          </p>
        </div>
        <div class="margin-bottom-29">
          <button v-loading="requesting" type="button" class="submit" @click="register">
            {{ $t(`${lang}.registration`) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
import qs from "qs";
const lang = 'login'
const langcode = 'components.sendEmailCode'
const defaultTime = 60
export default {
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
      url:this.$route.query.url,
      loginType:this.$route.query.loginType,
      lang,
      langcode,
      waitingTime: defaultTime,
      waiting: false,
      waitingText: this.$t(`${langcode}.sendCode`),
      firstname: '',
      lastname: '',
      name: '',
      mobile: '',
      email: '',
      code: '',
      password: '',
      showPassword: false,
      password_repetition:'',
      agreement: true,
      requesting: false,
      isActivename:false,
      isActivefisrt:false,
      isActivelast:false,
      isActivemobile:false,
      isActivemail:false,
      isActivecode:false,
      isActivepwd:false,
      isActiverepwd:false,
      nameShow:false,
      mobileShow:false,
      emailShow:false,
      codeShow:false,
      pwdShow:false,
      repwdShow:false,
      firstnameShow: false,
      lastnameShow: false
    }
  },
  watch:{
    email(){
      // if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)){
      //   this.emailShow=true
      // }else{
      //   this.emailShow=false
      //   this.isActivemail=false
      // }
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
	verifyMobile(){
		if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
		  this.mobileShow=true
		}else{
		  this.mobileShow=false
		  this.isActivemobile=false
		}
	},
	verifyPasswordRepetition(){
	  if(this.password_repetition!=this.password){
	    this.repwdShow=true
	  }else{
	    this.isActiverepwd=false
	    this.repwdShow=false
	  }
	},
    change() {
      //动作：阻止表单数据提交
      return false;
    },
    // 姓
    blurEvents(){
      this.isActivefisrt=false
    },
    // 名
    blurEvent(){
      this.isActivelast=false
    },
    // 姓名
    blurEvent1(){
      this.isActivename=false;
    },
    // 手机号/邮箱
    blurEvent2(){
      this.isActivemobile=false
      this.isActivemail=false
    },
    // 验证码
    blurEvent3(){
      this.isActivecode=false
      this.codeShow=false
    },
    // 密码
    blurEvent4(){
      this.isActivepwd=false
      this.pwdShow=false
    },
    // 确认密码
    blurEvent5(){
      this.isActiverepwd=false
    },
    // 姓
    focusEvents(){
      // console.log("aa")
      this.isActivefisrt=true
    },
    // 名
    focusEvent(){
      this.isActivelast=true
    },
    // 姓名
    focusEvent1(){
      this.isActivename=true;
    },
    // 手机号/邮箱
    focusEvent2(){
	  this.mobileShow=false
      this.isActivemobile=true
      this.isActivemail=true
    },
    // 验证码
    focusEvent3(){
      this.isActivecode=true
    },
    // 密码
    focusEvent4(){
      this.isActivepwd=true
    },
    // 确认密码
    focusEvent5(){
	  this.repwdShow=false
      this.isActiverepwd=true
    },
    // 点击图标切换密码类型
    changeRegisterPasswordStatus() {
      // const info = JSON.parse(JSON.stringify(this.info))
      this.showPassword = !this.showPassword
      // this.info = info
    },
    // 输入框
    input(){
      // if (!(/^1[3456789]\d{9}$/.test(this.mobile))){
      //   this.isActivemobile=true;
      //   this.mobileShow=true;
      // }else if (!this.code){
      //   this.isActivemobile=false;
      //   this.mobileShow=false;
      //   this.isActivecode=true;
      //   this.codeShow=true;
      // }else if (!this.password){
      //   this.isActivecode=false;
      //   this.codeShow=false;
      //   this.isActivepwd=true;
      //   this.pwdShow=true;
      // }else if (!this.password_repetition) {
      //   this.isActiverepwd=true;
      //   this.repwdShow=true;
      //   this.isActivepwd=false;
      //   this.pwdShow=false;
      // }else if(this.password !==this.password_repetition){
      //   this.isActiverepwd=true;
      //   this.repwdShow=true;
      // }else{
      //   this.isActiverepwd=false;
      //   this.repwdShow=false;
      // }

    },
    register() {
      if(this.loginType == 1){
        // 手机注册
        const _this = this
        if(!_this.agreement) {
          _this.$errorMessage(_this.$t(`${lang}.agreePlease`))
          return
        }
        if(_this.mobile==''){
          _this.mobileShow=true
          return
        }else if(!_this.code && !_this.password && !_this.password_repetition){
          _this.isActivemobile=false;
          _this.mobileShow=false;
          _this.isActivecode=true;
          _this.codeShow=true;
          _this.isActivepwd=true;
          _this.pwdShow=true;
          _this.isActiverepwd=true;
          _this.repwdShow=true;
          return
        }
        // _this.requesting = true
        this.$axios({
            method: 'post',
            url: '/web/site/mobile-register',
            data: {
              'mobile':_this.mobile,
              'firstname':_this.firstname,
              'lastname':_this.lastname,
              'code':_this.code,
              'password':_this.password,
              'password_repetition':_this.password_repetition
            }
          })
          .then(res => {
            const data = res.data
            _this.requesting = false
            _this.$successMessage(_this.$t(`${lang}.registrySuccessful`))

            localStorage.setItem('refreshToken',data.refresh_token);
            localStorage.setItem('accessToken',data.access_token);
            _this.$store.commit('setToken', data.access_token)
            _this.$store.commit('setUserInfo',data.member)
              // const lastUrl = _this.$store.state.lastUrl
              const lastUrl=localStorage.getItem("url")
            _this.$store.dispatch('synchronizeCart')
            // const lastUrl = _this.$store.state.lastUrl
            // _this.$store.commit('setLastUrl', '')

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
            // console.log("请求",err)
            _this.requesting = false
            _this.$errorMessage(err.message)
            return
          })
      }else{
        // 邮箱注册
        const _this = this
         if(!_this.agreement) {
          _this.$errorMessage(_this.$t(`${lang}.agreePlease`))
          return
        }
        if(_this.email==''){
          _this.emailShow=true
          return false;
        }else if(!_this.code && !_this.password && !_this.password_repetition){
          _this.isActivemail = false;
          _this.emailShow=false;
          _this.isActivecode=true;
          _this.codeShow=true;
          _this.isActivepwd=true;
          _this.pwdShow=true;
          _this.isActiverepwd=true;
          _this.repwdShow=true;
          return
        }
        this.$axios({
            method: 'post',
            url: '/web/site/email-register',
            data: {
              'firstname':_this.firstname,
              'lastname':_this.lastname,
              'email': _this.email,
              'code':_this.code,
              'password':_this.password,
              'password_repetition':_this.password_repetition
            }
          })
          .then(res => {
            const data = res.data

            _this.requesting = false
            _this.$successMessage(_this.$t(`${lang}.registrySuccessful`))

            localStorage.setItem('refreshToken',data.refresh_token);
            localStorage.setItem('accessToken',data.access_token);
            _this.$store.commit('setToken', data.access_token)
            _this.$store.commit('setUserInfo',data.member)
            // const lastUrl = _this.$store.state.lastUrl
            // _this.$store.commit('setLastUrl', '')
              // const lastUrl = _this.$store.state.lastUrl
              const lastUrl=localStorage.getItem("url")
            _this.$store.dispatch('synchronizeCart')
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
            // console.log("请求",err)
            _this.requesting = false
            _this.$errorMessage(err.message)
          })
      }
    },
    // 倒计时
    countDown() {
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

    // 设置为倒计时状态
    setWait() {
      if (this.waiting) {
        this.waiting = false
      } else {
        this.waiting = true
        this.countDown()
      }
    },

    // 发送邮箱验证码
    sendCode() {
      const _this = this
      if (_this.email.length === 0) {
        _this.emailShow=true
        return
      }
      // if (_this.waiting) {
      //   this.$errorMessage(_this.$t(`${langcode}.pleaseWait`))
      //   return
      // }
      _this.setWait()
       this.$axios({
        method: "post",
        url: '/web/site/email-code',
        data:{
          'email': _this.email,
          'usage': 'register'
        }
      }).then(res => {
        // console.log("邮箱验证码",res)
        if (res.code==200){
           _this.$successMessage(_this.$t(`${langcode}.hadSend`))
          // _this.code=res.data.code
        }else {
          throw new Error (res.message)
        }
        // _this.sendReturn(res)
      }).catch(err => {
        _this.resetCountDown()
        _this.$errorMessage(err.message)
        // _this.$ConfirmBox({
        //   title: _this.$t(`${langcode}.error`),
        //   message: `${err.message}`
        // })
      })
      // Helpers.requestServer(options)
    },
    // 发送手机验证码
    sendPhoneCode() {
      const _this = this
      if (_this.mobile.length === 0) {
        _this.mobileShow=true
        return
      }else{
        _this.setWait()
      }
      // if (_this.waiting) {
      //   this.$errorMessage(_this.$t(`${langcode}.pleaseWait`))
      //   return
      // }

       this.$axios({
        method: "post",
        url: '/web/site/sms-code',
        data:{
          'mobile': _this.mobile,
          'usage': 'register'
        }
      }).then(res => {
        // console.log("手机验证码",res)
        if (res.code==200){
          _this.$successMessage(_this.$t(`${langcode}.hadSend`))
          // _this.code=res.data.code
           _this.isActivecode=false;
          _this.codeShow=false;
          // _this.sendReturn(res)
        } else {
          throw new Error (res.message)
        }
      }).catch(err => {
        _this.resetCountDown()
         _this.$errorMessage(err.message)
        _this.$ConfirmBox({
          title: _this.$t(`${langcode}.error`),
          message: `${err.message}`
        })
      })
      // Helpers.requestServer(options)
    },
    // 重置倒计时
    resetCountDown() {
      this.waitingTime = 0
    },
    inputEvent2(){
      // var that = this;
      // if(this.email.length == 60){
      //   that.emailShow = true;
      // }else{
      //   this.emailShow = false;
      // }
    },
    firstName(){
      if(this.firstname.length == 30){
        this.firstnameShow = true;
      }else{
        this.firstnameShow = false;
      }
    },
    lastName(){
      if(this.lastname.length == 30){
        this.lastnameShow = true;
      }else{
        this.lastnameShow = false;
      }
    },
    inputCode(){
      if(this.code.length == 15){
        this.codeShow = true;
      }else{
        this.codeShow = false;
      }
    }

  }
}
</script>

<style lang="less" scoped>
input::placeholder{
  color:#C0C4CC;
}
.active{
  border-bottom: 1px solid #F3A18E!important;
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
  // display: none;
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

.email-val-box{
  position: relative;
}
.area-code{
  position: absolute;
  width: 32%;
  height: 100%;
  border: 1px solid rgba(187, 187, 187, 1);
  color: #777;
  background-color: #f9f9f9;
  box-sizing: border-box;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.email-val-box input{
  width: 63% !important;
  margin-left: 37%;
}
.area-code .iconxiala{
  margin: 2px 0 0 8%;
  font-size: 14px;
}
</style>
