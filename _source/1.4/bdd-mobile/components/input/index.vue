<template>
  <div class="input-box" :style="boxStyle">
    <template v-if="leftIcon">
      <i :class="['iconfont', leftIcon]"></i>
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
    </template>
    <template v-else>
      <template v-if="rightIcon">
        <i :class="['iconfont', rightIcon]"></i>
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
        return ['text', 'tel', 'password', 'email'].indexOf(value) !== -1
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
        return (
          ['left', 'center', 'right', 'justify', 'inherit'].indexOf(value) !==
          -1
        )
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

<style scoped>
.input-box {
  position: relative;
  height: 40px;
  padding: 0 11px;
  border: 1px solid rgba(187, 187, 187, 1); /*no*/
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
input {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  font-size: 14px;
  border: 0;
  text-align: left;
  background-color: transparent;
  padding-top: 3px;
}
input::-webkit-input-placeholder {
  color: #999999;
}
.iconfont {
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 20px;
  margin-left: 10px;
  color: #999999;
}
</style>
