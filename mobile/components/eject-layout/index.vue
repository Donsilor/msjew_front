<template>
  <div :class="['eject', { active: show }]" @touchmove="stopPop">
    <div class="bg" @click="closeEmit"></div>
    <div class="eject-box">
      <div class="top">
        <i class="iconfont iconguanbi close" @click="closeEmit"></i>
        <div class="title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="button">
          <slot name="button">
            <button>click</button>
          </slot>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    stopScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    stopPop(e) {
      e.preventDefault()
    },
    closeEmit() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>
.eject {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
}
.eject.active {
  visibility: visible;
}
.bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.1s linear;
}
.eject.active .bg {
  /*background-color: rgba(0, 0, 0, 0.5);*/
}
.eject-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0); /*no*/
  border-radius: 8px 8px 0 0;
  background-color: #ffffff;
  transform: translate(0, 100%);
  transition: all 0.2s linear;
}
.eject.active .eject-box {
  transform: translate(0, 0);
  box-shadow: 0 -5px 20px 0 rgba(153, 153, 153, 0.2);
}
/*顶部*/
.top {
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close {
  flex-basis: 20px;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  font-size: 18px;
  line-height: 18px;
  color: #bbbbbb;
}
.title {
  flex-basis: 220px;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
}
.button {
  flex-basis: 30px;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: right;
}
.button .iconfont {
  font-size: 20px;
  line-height: 20px;
  color: #bbbbbb;
}
</style>
