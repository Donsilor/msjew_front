<template>
  <section>
    <div class="status">
      <div class="status-icon">
        <i class="iconfont icongantanhao1"></i>
      </div>
      <div class="status-text">
        {{ lang['reset-success'] }}
      </div>
    </div>

    <div class="message">
      {{ lang['success-message'] }}<br />
      {{ laterTime }}{{ lang['replace-message'] }}
    </div>

    <div class="line-box">
      <button class="full-btn to-login" @click="toLogin">
        <span class="btn-message">
          {{ lang['login'] }}
        </span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.forget.success,
      laterTime: 5,
      timeout: null
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.timeout = setInterval(() => {
        _this.laterTime--
        if (_this.laterTime === 0) {
          _this.toLogin()
        }
      }, 1000)
    })
  },
  methods: {
    toLogin() {
      clearTimeout(this.timeout)
      this.$router.replace({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.status {
  margin-bottom: 32px;
}
.status-icon {
  margin-bottom: 10px;
}
.status-icon .iconfont {
  font-size: 42px;
  color: #7dae78;
}
.status-text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.message {
  margin-bottom: 36px;
  padding: 12px 33px 15px 33px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(147, 116, 102, 1);
  line-height: 20px;
  text-align: center;
  background: rgba(247, 244, 241, 1);
  border-radius: 5px;
  box-sizing: border-box;
}
.full-btn.to-login {
  font-size: 16px;
  color: #ffffff;
  background-color: #f29b87;
}
</style>
