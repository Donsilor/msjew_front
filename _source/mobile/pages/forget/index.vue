<template>
  <section>
    <div class="title-bar">
      <span class="title">{{ lang.forget }}</span>
    </div>

    <div class="line-box input-line">
      <bdd-input
        v-model="email"
        :placeholder="lang.email"
        @blur="inputKey('email')"
      ></bdd-input>
      <div
        :class="['error-message', { active: !trueEmail && hadInput('email') }]"
      >
        {{ lang['email-error'] }}
      </div>
    </div>

    <div class="line-box">
      <button class="full-btn to-next" @click="toNext">
        <span class="btn-message">{{ lang.next }}</span>
      </button>
    </div>
  </section>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  mixins: [Input],
  data() {
    return {
      lang: this.LANGUAGE.forget.index,
      email: ''
    }
  },
  computed: {
    trueEmail() {
      return this.$helpers && this.$helpers.trueEmail(this.email)
    }
  },
  methods: {
    toNext() {
      // this.$router.push({
      //   name: 'login-forget-second'
      // })
      // if (!this.email) {
      //   this.$toast('郵箱不能为空')
      //   return
      // }
      // if (!this.trueEmail) {
      //   this.$toast('郵箱格式錯誤')
      //   return
      // }
      this.emitEvent()
    },
    emitEvent() {
      console.log('emitEvent')
      this.$emit('emailFinish', this.email)
    }
  }
}
</script>

<style scoped>
.title-bar {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title-bar .title {
  font-size: 20px;
  color: #333333;
}
.line-box {
  margin-bottom: 25px;
}
.full-btn.to-next {
  font-size: 16px;
  color: #ffffff;
  background-color: #f29b87;
}
.error-message {
  height: 8px;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  color: rgba(237, 73, 73, 1);
  opacity: 0;
}
.error-message.active {
  height: 21px;
  line-height: 28px;
  opacity: 1;
}
</style>
