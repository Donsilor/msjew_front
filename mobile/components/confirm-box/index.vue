<template>
  <div class="confirm-box" @click.stop="clickMask" @touchmove.stop.prevent="">
    <div class="content flex-box" @click.stop>
      <div class="text-content flex-box">
        <div v-if="title" class="title">{{ title }}</div>
        <div v-if="message" class="message">{{ message }}</div>
      </div>
      <div class="button-line flex-box">
        <template v-if="buttons.length">
          <button
            v-for="(each, n) in buttons"
            :key="n"
            @click="clickButton(each.callback)"
          >
            {{ each.text }}
          </button>
        </template>
        <template v-else>
          <button @click="clickButton()">{{ lang.clear }}</button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      lang: this.LANGUAGE.components.confirmBox,
      title: '',
      message: '',
      buttons: [],
      close: function() {},
      clickOutSide: null
      // 'clickOutSide': function () {
      //     console.log('clickOutSide');
      // }
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    const that = this
    that.$nextTick(function() {})
  },
  beforeDestroy() {},
  methods: {
    // 点击遮罩背景
    clickMask() {
      if (!this.clickOutSide) {
        return
      }
      this.clickOutSide()
      this.destroyElement()
    },
    // 点击按钮
    clickButton(callback) {
      this.destroyElement()
      ;(callback || function() {})()
    },
    // 销毁组件
    destroyElement() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
      this.close()
    }
  }
}
</script>
<style scoped lang="less">
.flex-box {
  display: flex;
}
.confirm-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 110;
}

.content {
  flex-direction: column;
  position: absolute;
  /*top: 0;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*transform: scale(0, 0);*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0, 0);
  margin: auto;
  width: 270px;
  /*height: min-content;*/
  max-height: 80vh;
  border-radius: 8px;
  /*border-top: 40px solid transparent;*/
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  animation: show-in 0.2s linear forwards;
}

.content.show-in {
  animation: show-in 0.2s linear forwards;
}

.content.hide-out {
  animation: hide-out 0.2s linear forwards;
}

@keyframes show-in {
  0% {
    /*transform: scale(0, 0);*/
    transform: translate(-50%, -50%) scale(0, 0);
  }
  100% {
    /*transform: scale(1, 1);*/
    transform: translate(-50%, -50%) scale(1, 1);
  }
}

@keyframes hide-out {
  0% {
    /*transform: scale(1, 1);*/
    transform: translate(-50%, -50%) scale(1, 1);
  }
  100% {
    /*transform: scale(0, 0);*/
    transform: translate(-50%, -50%) scale(0, 0);
  }
}

.text-content {
  flex-direction: column;
  padding: 10px 0;
}
.title {
  padding: 0 (270-220)/2px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: #333;
  text-align: center;
  word-break: keep-all;
}

.message {
  flex-grow: 1;
  position: relative;
  /*min-height: 80px;*/
  max-height: 50vh;
  padding: 0 (270-230)/2px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  font-size: 14px;
  color: #666666;
  text-align: center;
  overflow-y: scroll;
  box-sizing: border-box;
  word-break: keep-all;
}

.button-line {
  flex-direction: row;
  position: relative;
  border-top: 1px solid rgba(221, 221, 221, 1); /*no*/
  box-sizing: border-box;
  flex-grow: 0;
  flex-basis: 40px;
}

.button-line button {
  flex-basis: 10px;
  flex-grow: 1;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
  border-right: 1px solid rgba(221, 221, 221, 1); /*no*/
  text-overflow: ellipsis;
  font-size: 16px;
  color: #666;
  overflow: hidden;
}

.button-line button:nth-last-of-type(1) {
  border-right: 0;
  color: #f29b87;
}
</style>
