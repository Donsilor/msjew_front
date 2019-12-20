<template>
  <div class="live-chat">
    <div
      class="live-chat-logo"
      :style="logoStyle"
      @click="open"
      @touchstart="onTouchstart"
    >
      <i class="iconfont iconicon-xiaoxi"></i>
    </div>
    <!--    <div :class="['live-chat-content', 'active']">-->
    <div :class="['live-chat-content', { active: active }]">
      <div class="bg" @click="close"></div>
      <div class="live-chat-iframe">
        <div v-show="isLoading" class="loading">loading...</div>
        <iframe src="https://lc.chat/now/10943482/" @load="finishLoad"></iframe>
        <!--        <iframe src="https://secure.livechatinc.com/licence/10943482/v2/open_chat.cgi?license=10943482&group=0&embedded=1&widget_version=3&unique_groups=0"></iframe>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      isLoading: true,
      left: 0,
      top: 0
    }
  },
  computed: {
    logoStyle() {
      return {
        transform: `translate(${this.left}px, ${this.top}px)`
      }
    }
  },
  beforeDestroy() {
    // document.body.removeEventListener('touchmove', this.preventTouchmove)
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      // document.body.addEventListener('touchmove', _this.preventTouchmove)
    })
  },
  methods: {
    open() {
      this.active = true
    },
    close() {
      this.active = false
    },
    finishLoad() {
      this.isLoading = false
    },
    preventTouchmove(e) {
      e.preventDefault()
    },
    onTouchstart(e) {
      // e.preventDefault()
      // e.stopPropagation()

      const _this = this
      const startX = Math.floor(e.targetTouches[0].clientX)
      const startY = Math.floor(e.targetTouches[0].clientY)

      const oldLeft = _this.left
      const oldTop = _this.top

      const deleteListener = () => {
        // console.log('deleteListener================>')
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', deleteListener)
      }

      const touchMove = event => {
        // event.preventDefault()
        // event.stopPropagation()

        requestAnimationFrame(() => {
          const endX = Math.floor(event.targetTouches[0].clientX)
          const endY = Math.floor(event.targetTouches[0].clientY)
          const moveX = endX - startX
          const moveY = endY - startY

          _this.left = oldLeft + moveX
          _this.top = oldTop + moveY
        })
      }

      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', deleteListener)
    }
  }
}
</script>

<style lang="less" scoped>
.live-chat-logo {
  top: 70%;
  right: 5%;
  position: fixed;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  background-color: rgb(244, 244, 246);
  box-shadow: rgba(0, 0, 0, 0.3) 0 4px 8px;
  /*transition: all 0.1s linear;*/
  z-index: 1111;

  .iconfont {
    font-size: 30px;
    color: #f29b87;
  }
}
.live-chat-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  transition: all 0.2s linear;
  z-index: 1111;

  .bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .live-chat-iframe {
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 85%;
    background-color: #ffffff;
    transform: translate(0, 100%);
    transition: all 0.2s linear;

    .loading {
      padding: 30px 0;
      text-align: center;
      font-size: 16px;
      color: rgb(242, 155, 135);
    }

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  &.active {
    visibility: visible;

    .live-chat-iframe {
      transform: translate(0, 0);
    }
  }
}
</style>
