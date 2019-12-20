<template>
  <section>
    <div class="title-bar">
      <span class="title">
        {{ lang['reset-password'] }}
      </span>
    </div>

    <div class="line-box input-line">
      <bdd-input
        v-model="password"
        :placeholder="lang['input-new-password']"
        @input="inputKey('password')"
      ></bdd-input>
      <div
        :class="[
          'error-message',
          { active: !truePassword && hadInput('password') }
        ]"
      >
        {{ lang['password-error'] }}
      </div>
    </div>
    <div class="line-box input-line">
      <bdd-input
        v-model="confirmdPassword"
        :placeholder="lang['confirm-password']"
        @input="inputKey('confirmdPassword')"
      ></bdd-input>
      <div
        :class="[
          'error-message',
          { active: !samePassword && hadInput('confirmdPassword') }
        ]"
      >
        {{ lang['password-not-same'] }}
      </div>
    </div>

    <div class="message">
      {{ lang['password-claim'] }}
    </div>

    <div class="line-box">
      <button class="full-btn to-next" @click="toNext">
        <span class="btn-message">
          {{ lang['next'] }}
        </span>
      </button>
    </div>
  </section>
</template>

<script>
import Input from '@/mixins/input.js'
export default {
  mixins: [Input],
  props: {
    email: {
      type: String,
      required: false,
      default: ''
    },
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.forget['new-password'],
      password: '',
      confirmdPassword: ''
    }
  },
  computed: {
    truePassword() {
      return this.password
    },
    samePassword() {
      return this.password === this.confirmdPassword
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      if (!_this.email || !_this.code) {
        _this.$router.replace({
          name: 'forget'
        })
      }
    })
  },
  methods: {
    toNext() {
      if (!this.truePassword) {
        this.$toast(this.lang['password-error'])
        return
      }
      if (!this.samePassword) {
        this.$toast(this.lang['password-not-same'])
        return
      }
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('newPasswordFinish', {
        password: this.password,
        confirmdPassword: this.confirmdPassword
      })
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
  margin-bottom: 12px;
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
.message {
  margin-bottom: 36px;
  padding: 14px;
  text-align: left;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(147, 116, 102, 1);
  background: rgba(247, 244, 241, 1);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
