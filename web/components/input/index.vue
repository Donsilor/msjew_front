<template>
  <div class="input-box" :style="boxStyle">
    <template v-if="leftIcon">
      <div class="input-icon">
        <i :class="['iconfont', leftIcon]"></i>
      </div>
    </template>
    <input
      v-model="inputValue"
      spellcheck="false"
      :class="[{ password: passwordType }]"
      :style="inputStyle"
      :type="showingType"
      :placeholder="placeholder"
      @focus="focusEvent"
      @blur="blurEvent"
      @keydown="keydownEvent"
      @keyup="keyupEvent"
      @keypress="keypressEvent"
      @change="changeEvent"
    />
    <template v-if="passwordType">
      <div class="input-icon">
        <i
          v-if="showPassword"
          class="iconfont iconopen"
          @click="changePassworStatus(false)"
        ></i>
        <i
          v-if="!showPassword"
          class="iconfont iconcloes"
          @click="changePassworStatus(true)"
        ></i>
      </div>
    </template>
    <template v-else>
      <template v-if="rightIcon">
        <div class="input-icon">
          <i :class="['iconfont', rightIcon]"></i>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text',
      validator(value) {
        return ['text', 'tel', 'password', 'email'].includes(value)
      }
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    leftIcon: {
      type: String,
      required: false,
      default: ''
    },
    rightIcon: {
      type: String,
      required: false,
      default: ''
    },
    padding: {
      type: String,
      required: false,
      default: ''
    },
    textAlign: {
      type: String,
      required: false,
      default: 'left',
      validator(value) {
        return ['left', 'center', 'right', 'justify', 'inherit'].includes(value)
      }
    }
  },
  data() {
    return {
      showPassword: false,
      inputValue: ''
    }
  },
  computed: {
    boxStyle() {
      return {
        padding: this.padding
      }
    },
    inputStyle() {
      return {
        'text-align': this.textAlign
      }
    },
    passwordType() {
      return this.type === 'password'
    },
    showingType() {
      let result = this.type
      if (result === 'password' && this.showPassword) {
        result = 'text'
      }
      return result
    }
  },
  watch: {
    value(val, oldVal) {
      this.inputValue = val
      this.$emit('change', val)
    },
    inputValue(val, oldVal) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.inputValue = this.value
    })
  },
  methods: {
    changePassworStatus(status = false) {
      this.showPassword = status
    },
    focusEvent(e) {
      this.$emit('focus', e)
    },
    blurEvent(e) {
      this.$emit('blur', e)
    },
    inputEvent(e) {
      this.$emit('input', e)
    },
    keydownEvent(e) {
      this.$emit('keydown', e)
    },
    keyupEvent(e) {
      this.$emit('keyup', e)
    },
    keypressEvent(e) {
      this.$emit('keypress', e)
    },
    changeEvent(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="less" scoped>
.input-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
input {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  font-size: 14px;
  border: 0;
  background-color: transparent;
}
input::-webkit-input-placeholder {
  color: #999999;
}
.input-icon {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 20px;

  .iconfont {
    font-size: 20px;
    margin-left: 10px;
    color: #999999;
  }
}
</style>
