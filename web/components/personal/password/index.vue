<template>
  <div class="password">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.psw1`) }}</div>
    </div>
    <div class="switchover clf">
      <span class="fr" @click="toggleType()">
        <i v-if="inputType == 'password'" class="iconfont iconcloes"></i>
        <i v-else class="iconfont iconopen"></i>
      </span>
    </div>
    <div class="pass-word">
      <div :class="['pass-word-line',{'border-red': lineA}]">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw2`) }}</div>
        <input
          v-model="oldPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw5`)"
          autocomplete="new-password"
          :type="inputType"
          maxlength="30"
          @input="inputText(1)"
        />
      </div>
      <div :class="['pass-word-line',{'border-red': lineB}]">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw3`) }}</div>
        <input
          v-model="newPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw6`)"
          :type="inputType"
          maxlength="16"
          @input="inputText(2)"
        />
      </div>
      <div :class="['pass-word-line',{'border-red': lineC}]">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw4`) }}</div>
        <input
          v-model="agaPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw7`)"
          :type="inputType"
          maxlength="16"
          @input="inputText(3)"
        />
      </div>
    </div>

    <div class="btn-box clf">
      <div class="submit-new-password-btn fl" @click="submit">
        {{ $t(`${lang}.save`) }}
      </div>
      <div class="find-password fr">
        <nuxt-link :to="{ path: '/reset-password',query:{type:loginType} }">
          {{ $t(`${lang}.forget`) }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RegPassword } from '@/assets/js/require-lee.js'
const lang = 'personal.account'
export default {
  name: 'Index',
  data() {
    return {
      lang,
      oldPsw: ``,
      newPsw: ``,
      agaPsw: ``,
      inputType: 'password',
      loginType: 0,
      lineA: false,
      lineB: false,
      lineC: false
    }
  },
  mounted() {
	  this.loginType = sessionStorage.getItem("loginType")
  },
  methods: {
    submit() {
      // console.log("aaaaa")
      if (this.oldPsw === '') {
        this.lineA = true;
        this.$errorMessage(this.$t(`${lang}.psw5`))
        return
      }
      if (this.newPsw !== this.agaPsw) {
        this.lineB = true;
        this.lineC = true;
        this.$errorMessage(this.$t(`${lang}.psw8`))
        return
      }
      if (!RegPassword.test(this.newPsw)) {
        this.$errorMessage(this.$t(`${lang}.psw9`))
        this.lineB = true;
        this.lineC = true;
        return
      }

      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({ original_password: this.oldPsw,password: this.newPsw,password_repetition:this.agaPsw })
        ),
        false
      )
      this.$axios
        .post('/web/member/member/up-pwd', data)
        .then(res => {
          // console.log("修改密码",res)
          this.$message({
            message: this.$t(`${lang}.success`),
            type: 'success'
          })
          localStorage.setItem('refreshToken',res.data.refresh_token);
		      localStorage.setItem('accessToken',res.data.access_token);
          this.$store.commit('setToken', res.data.access_token)
          this.$store.commit('setUserInfo',res.data.member)
          this.oldPsw = ''
          this.newPsw = ''
          this.agaPsw = ''
          // setTimeout(() => {
          //   this.$store.dispatch(`logout`)
          //   this.$router.push(`/login`)
          // }, 1000)
        })
        .catch(err => {
          this.lineA = true;
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    toggleType() {
      this.inputType = this.inputType == 'password' ? 'text' : 'password'
    },
    inputText(k) {
      switch (k) {
        case 1: this.lineA = false
          break;
        case 2: this.lineB = false
          break;
        case 3: this.lineC = false
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
.password {
  width: 100%;
  padding: 30px 0;
  .pink-title {
    display: flex;
    align-items: center;
    margin-bottom: 39px;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 28px;
    }
  }
  .pass-word {
    .pass-word-line {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .pass-word-line-label {
        width: 150px;
        font-size: 14px;
        line-height: 36px;
        color: #333333;
      }
      .pass-word-line-input {
        width: 340px;
        height: 31px;
        font-size: 14px;
        line-height: 36px;
        color: #999999;
        border: none;
        outline: none;
        border-bottom: 1px solid #999999;
      }
    }

    .border-red{
      .pass-word-line-input {
        border-bottom: 1px solid #f00;
      }
    }
  }
  .btn-box{
    width: 490px;
    margin-top: 40px;

    .submit-new-password-btn {
      width: 150px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      color: #8b766c;
      text-align: center;
      border: 1px solid #8b766c;
      cursor: pointer;
    }
    .find-password{
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #8b766c;
      text-align: center;
      border-bottom: 1px solid #8b766c;
      cursor: pointer;
      margin-top: 10px;
    }
  }
}

.pass-word-line-input::placeholder{
  color: #ccc;
}

.switchover{
  width: 490px;
  margin-top: 20px;

  .iconfont{
    font-size: 20px;
    color: #d2d2d2;
    cursor: pointer;
  }
}
</style>
