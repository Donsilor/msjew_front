<template>
  <section>
    <div class="title-bar">
      <span class="title">
        {{ lang['forget'] }}
      </span>
    </div>

    <div class="line-box info-box">
      <div class="forget-info">
        {{ lang['had-send-email'] }}
      </div>
      <div class="forget-info">
        {{ email }}
      </div>
      <div class="forget-info">
        {{ lang['check-it'] }}
      </div>
    </div>

    <div class="line-box input-line">
      <bdd-input
        v-model="code"
        :placeholder="lang['code']"
        :padding="'0 30% 0 3%'"
        @input="inputKey('code')"
      ></bdd-input>
      <div class="send-code">
        <send-email-code :email="email" :type="'reset'"></send-email-code>
      </div>
      <div
        :class="['error-message', { active: !trueCode && hadInput('code') }]"
      >
        {{ errorMessage }}
      </div>
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
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.forget['verify-code'],
      code: ''
    }
  },
  computed: {
    trueCode() {
      return !!this.code
    },
    errorMessage() {
      return this.code && this.trueCode ? '' : this.lang['code-null']
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      if (!_this.email) {
        _this.$router.replace({
          name: 'forget'
        })
      }
    })
  },
  methods: {
    toNext() {
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('compareCode', {
        code: this.code
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
  position: relative;
  margin-bottom: 25px;
}
.info-box {
  margin-bottom: 20px;
}

.forget-info {
  color: rgba(147, 116, 102, 1);
  line-height: 16px;
  text-align: left;
}
.forget-info:nth-of-type(1) {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 9px;
}
.forget-info:nth-of-type(2) {
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  color: rgba(147, 116, 102, 1);
  margin-bottom: 10px;
}
.forget-info:nth-of-type(3) {
  font-size: 12px;
  font-weight: 400;
  color: rgba(147, 116, 102, 1);
}
.send-code {
  position: absolute;
  top: 4px;
  right: 6px;
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
