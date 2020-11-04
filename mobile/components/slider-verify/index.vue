<template>
  <div class="verify">
    <!--    <div class="verify-bg">-->
    <!--      <span class="message">向右滑動驗證</span>-->
    <!--    </div>-->
    <div class="bg" :style="bgStyle"></div>
    <div ref="verify-operate" class="verify-operate" :style="operateStyle">
      <span :class="['message', { finish: isFinish }]">{{ message }}</span>
      <span
        :class="['slider', { finish: isFinish }]"
        :style="sliderStyle"
        @touchstart="onTouchstart"
      >
        <template v-if="isFinish">
          <i class="iconfont icongou"></i>
        </template>
        <template v-else>
          {{ '>>' }}
        </template>
      </span>
    </div>
  </div>
</template>

<script>
const transitionTime = 0.3
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.sliderVerify,
      verifyWidth: null,
      sliderWidth: 60,
      left: 0,

      minX: 0,
      maxX: 200,
      transition: false
    }
  },
  computed: {
    bgStyle() {
      const progress = this.progress
      return {
        width: `${progress}%`,
        background: `linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(172, 213, 152, 1) 100%)`,
        transition: `all ${transitionTime}s linear`
      }
    },
    operateStyle() {
      const progress = this.progress
      let background = ''
      if (progress < 52) {
        if (this.left === 0) {
          background = `rgba(172, 213, 152, 0)`
        } else {
          background = `linear-gradient(
          90deg, rgba(255, 255, 255, 1) 0%,
          rgba(172, 213, 152, 1) ${progress}%,
          rgba(172, 213, 152, 0) ${progress}%,
          rgba(172, 213, 152, 0) 100%)`
        }
      } else {
        background = `linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(172, 213, 152, 1) 52%,
          rgba(172, 213, 152, 1) ${progress}%,
          rgba(172, 213, 152, 0) ${progress}%,
          rgba(172, 213, 152, 0) 100%)`
      }
      return {
        background: background
      }
    },
    sliderStyle() {
      return {
        left: `${this.left}px`,
        width: `${this.sliderWidth}px`,
        transition: `all ${this.transition ? transitionTime : '0'}s linear`
      }
    },
    progress() {
      const proportion = this.verifyWidth
        ? ((this.left + this.sliderWidth / 2) / this.verifyWidth) * 100
        : 0
      return proportion
    },
    isFinish() {
      if (this.left === this.maxX) {
        this.finish()
        return true
      } else {
        return false
      }
    },
    message() {
      return this.isFinish ? this.lang.verifySuccess : this.lang.verifyIt
    }
  },
  beforeDestroy() {
    document.body.removeEventListener('touchmove', this.preventTouchmove)
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      document.body.addEventListener('touchmove', _this.preventTouchmove)
    })
  },
  methods: {
    preventTouchmove(e) {
      e.preventDefault()
    },
    reset() {
      this.transition = true
      this.left = 0
      setTimeout(() => {
        const verifyOperate = this.$refs['verify-operate']
        this.verifyWidth = verifyOperate.getBoundingClientRect().width
      }, 0)
      setTimeout(() => {
        this.transition = false
      }, transitionTime * 1000)
    },
    onTouchstart(e) {
      e.preventDefault()
      e.stopPropagation()

      if (this.isFinish) {
        return
      }

      const target = e.target.getBoundingClientRect()
      const parent = e.target.parentNode.getBoundingClientRect()
      const startX = Math.floor(e.targetTouches[0].clientX)
      const baseLeft = this.left

      const minX = this.minX
      const maxX = (this.maxX = Math.floor(parent.width - target.width))

      const deleteListener = () => {
        console.log('deleteListener================>')
        document.removeEventListener('touchmove', touchMove)
      }

      const touchMove = event => {
        e.preventDefault()
        e.stopPropagation()

        if (this.isFinish) {
          deleteListener()
        }

        requestAnimationFrame(() => {
          const endX = Math.floor(event.targetTouches[0].clientX)
          const move = endX - startX
          let newLeft = baseLeft + move

          if (newLeft < minX) {
            newLeft = minX
          } else if (maxX < newLeft) {
            newLeft = maxX
          }

          this.left = newLeft
        })
      }

      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', event => {
        deleteListener()
        if (!this.isFinish) {
          setTimeout(() => {
            this.reset()
          }, 100)
        }
      })
    },
    finish() {
      this.$emit('finish')
    }
  }
}
</script>

<style scoped>
.verify {
  position: relative;
  height: 32px;
  box-shadow: 0 0 3px 0 rgba(184, 184, 184, 0.6);
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.verify-operate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verify-operate .message {
  font-size: 13px;
  font-weight: 400;
  color: rgba(187, 187, 187, 1);
}
.verify-operate .message.finish {
  color: rgba(255, 255, 255, 1);
}
.verify-operate .slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  line-height: 30px;
  color: #bbbbbb;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 3px 0 rgba(156, 156, 155, 0.4); /*no*/
  border-radius: 8px;
}
.verify-operate .slider.finish {
  color: #acd598;
}
.verify-operate .slider.finish .icongou {
  font-size: 18px;
}
</style>
