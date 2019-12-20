<template>
  <div class="password">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.psw1`) }}</div>
    </div>
    <div class="pass-word">
      <div class="pass-word-line">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw2`) }}</div>
        <input
          v-model="oldPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw5`)"
          autocomplete="new-password"
          type="password"
        />
      </div>
      <div class="pass-word-line">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw3`) }}</div>
        <input
          v-model="newPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw6`)"
          type="password"
        />
      </div>
      <div class="pass-word-line">
        <div class="pass-word-line-label">{{ $t(`${lang}.psw4`) }}</div>
        <input
          v-model="agaPsw"
          class="pass-word-line-input"
          :placeholder="$t(`${lang}.psw7`)"
          type="password"
        />
      </div>
    </div>
    <div class="submit-new-password-btn" @click="submit">
      {{ $t(`${lang}.save`) }}
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
      agaPsw: ``
    }
  },
  methods: {
    submit() {
      if (this.oldPsw === '') {
        this.$message.error(this.lang.psw5)
        return
      }
      if (this.newPsw !== this.agaPsw) {
        this.$message.error(this.lang.psw8)
        return
      }
      if (!RegPassword.test(this.newPsw)) {
        this.$message.error(this.lang.psw9)
        return
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({ oldPassword: this.oldPsw, newPassword: this.newPsw })
        ),
        false
      )
      this.$axios
        .post('/web/myAccount/updateUserPassword', data)
        .then(res => {
          console.log(res)
          this.$message({
            message: this.$t(`${lang}.success`),
            type: 'success'
          })
          setTimeout(() => {
            this.$store.dispatch(`logout`)
            this.$router.push(`/login`)
          }, 1000)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
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
      margin-top: 20px;
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
  }
  .submit-new-password-btn {
    width: 190px;
    height: 40px;
    margin-top: 40px;
    font-size: 14px;
    line-height: 40px;
    color: #8b766c;
    text-align: center;
    border: 1px solid #8b766c;
    cursor: pointer;
  }
}
</style>
