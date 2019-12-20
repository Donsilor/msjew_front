<template>
  <div :class="['white-board-mask', { active: show }]">
    <div class="bg"></div>
    <div class="white-board">
      <i class="iconfont iconguanbi close" @click="closeEmit"></i>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
    <slot name="other"></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    closeEmit() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped lang="less">
.white-board-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s linear;
  animation: show-in 0.2s linear forwards;
  z-index: 9999;
  .white-board {
    width: 345px;
    max-height: 70vh;
    /*min-height: 200px;*/
    height: max-content;
    overflow-y: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .close {
      position: absolute;
      right: 16px;
      top: 13px;
      font-size: 20px;
      line-height: 20px;
      color: #bbbbbb;
    }
    .content.show-in {
      animation: show-in 0.2s linear forwards;
    }

    .content.hide-out {
      animation: hide-out 0.2s linear forwards;
    }
  }
}
.white-board-mask.active {
  visibility: visible;
  opacity: 1;
}
</style>
