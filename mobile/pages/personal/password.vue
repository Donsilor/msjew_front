<template>
  <div class="password">
    <Header :title="lang.header" />
    <div class="content">
      <div class="title">{{ lang.title }}</div>
      <div class="input-mod">
        <bdd-input
          v-model="password1"
          :placeholder="lang.password1"
          @input="checkpassword(1)"
          :maxl="maxlength"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: !truePassword1 }]">
        {{ lang.tips1 }}
      </div>
      <div class="input-mod">
        <bdd-input
          v-model="password2"
          :placeholder="lang.password2"
          :type="'password'"
          @input="checkpassword(2)"
          :maxl="maxlength"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: !truePassword2 }]">
        {{ lang.tips2 }}
      </div>
      <div class="input-mod">
        <bdd-input
          v-model="password3"
          :placeholder="lang.password3"
          :type="'password'"
          @input="checkpassword(3)"
          :maxl="maxlength"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: !truePassword3 }]">
        {{ lang.tips3 }}
      </div>
      <div class="btn-common btn-pink btn" @click="submit">
        {{ lang.submit }}
      </div>
      <div class="tips">
        <p>{{ lang.p1 }}</p>
        <p>{{ lang.p2 }}</p>
        <p>{{ lang.p3 }}</p>
        <p>{{ lang.p4 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import { RegPassword } from '../../assets/js/require-lee'
export default {
  name: 'Password',
  layout: 'no-bar',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.password,
      password1: '',
      password2: '',
      password3: '',
      truePassword1: true,
      truePassword2: true,
      truePassword3: true,
      allTrue: false,
      maxlength: '30'
    }
  },
  methods: {
    checkpassword(type) {
      this.allTrue = false
      this.truePassword1 = true
      this.truePassword2 = true
      this.truePassword3 = true
      if (type === 1 || type === 0) {
        console.log(type, '000')
        if (this.password1 === '') {
          this.truePassword1 = false
          return
        }
      }
      if (type === 2 || type === 0) {
        if (!RegPassword.test(this.password2)) {
          this.truePassword2 = false
          return
        }
      }
      if (type === 3 || type === 0) {
        if (this.password3 !== this.password2) {
          this.truePassword3 = false
          return
        }
      }
      this.allTrue = true
    },
    submit() {
      this.checkpassword(0)
      if (this.allTrue) {
        const _this = this
        _this
          .$axios({
            method: 'post',
            url: `/web/member/member/up-pwd`,
            data: {
              original_password:this.password1,
              password: this.password2,
              password_repetition: this.password3
            }
          })
          .then(res => {
            // _this.$store.dispatch('logout')
            localStorage.setItem("refreshToken", res.refresh_token);
            localStorage.setItem("accessToken", res.access_token);
            let nowDate = parseInt((new Date()).getTime() / 1000)
            localStorage.setItem("refreshTime", nowDate);

            this.$store.commit('setToken', res.access_token)
            this.$store.commit('setUserInfo', res.member);
            this.$router.push({
              name: 'personal-successPassword'
            })
          })
          .catch(err => {
            this.$toast.show(err.message)
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.password {
  .content {
    .title {
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      margin: 20px 0 10px;
      font-weight: 600;
      padding-left: 20px;
      text-align: left;
      color: rgba(51, 51, 51, 1);
    }
    .input-mod {
      display: inline-block;
      padding: 10px 20px;
      width: 100%;
    }
    .error-message {
      display: none;
      font-size: 12px;
      padding: 0px 20px 0 30px;
      text-align: left;
      color: #ed4949;
    }
    .active {
      display: block;
    }
    .btn {
      margin: 20px auto;
      width: 90%;
    }
    .tips {
      margin: 0 20px;
      padding: 10px 16px;
      height: 100px;
      background: #f7f4f1;
      border-radius: 5px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(147, 116, 102, 1);
      line-height: 20px;
      text-align: left;
    }
  }
}
</style>
