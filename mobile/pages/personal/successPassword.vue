<template>
  <div class="success-password">
    <i class="icon iconfont icongou"></i>
    <div class="title">{{ lang.title }}</div>
    <p>
      {{ lang.p1 }}<br />
      {{ lang.p2 }}{{ waitingTime }}{{ lang.p3 }}
    </p>
    <div class="btn-common btn-pink btn" @click="goLogin">
      {{ lang.goLogin }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessPassword',
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.personal.successPassword,
      waitingTime: 10
    }
  },
  created() {
    this.countDown()
  },
  methods: {
    goLogin() {
      this.waitingTime = 0
      this.$router.push({
        name: 'login'
      })
    },
    countDown() {
      const _this = this
      const countDownStart = setInterval(function() {
        if (_this.waitingTime === 0) {
          clearInterval(countDownStart)
          _this.goLogin()
        } else {
          _this.waitingTime--
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.success-password {
  i {
    display: inline-block;
    width: 42px;
    height: 42px;
    margin-top: 102px;
    font-size: 38px;
    line-height: 42px;
    font-weight: 500;
    color: #7dae78;
    border: 3px solid #7dae78;
    border-radius: 50%;
  }
  .title {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: #333333;
    margin-top: 12px;
  }
  p {
    display: inline-block;
    width: 335px;
    margin: 30px auto 0;
    background: rgba(247, 244, 241, 1);
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(147, 116, 102, 1);
    line-height: 20px;
    padding: 10px 30px;
    word-break: keep-all;
  }
  .btn {
    margin-top: 36px;
  }
}
</style>
