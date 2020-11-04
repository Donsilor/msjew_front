<template>
  <div ref="scroll-box" :class="['scroll-box', scroll]" @scroll="scrollIt">
    <slot></slot>
    <div v-show="isHalf" class="scroll-to-top" @click="goTop()">
      <i class="iconfont iconzhiding"></i>
    </div>
  </div>
</template>
<style scoped>
.scroll-box {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.scroll-box.x {
  overflow-x: scroll;
  overflow-y: hidden;
}
.scroll-box.y {
  overflow-x: hidden;
  overflow-y: scroll;
}
.scroll-box.xy {
  overflow-x: scroll;
  overflow-y: scroll;
}
.scroll-box::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
.scroll-to-top {
  position: fixed;
  bottom: 152px;
  right: 17px;
  z-index: 8;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}
.iconzhiding {
  display: block;
  width: 44px;
  height: 44px;
  line-height: 44px;
  color: white;
  font-size: 22px;
}
</style>
<script>
export default {
  props: {
    scroll: {
      type: String,
      required: false,
      default: 'y',
      validator(value) {
        return ['x', 'y', 'xy'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      lastTop: 0,
      lastTopSend: null,
      scrollTop: 0
      // lastBottomSend: null
    }
  },
  computed: {
    isHalf: function() {
      return this.scrollTop > 570
    }
  },
  watch: {
    // 每次切换路由，滚动到顶部
    $route(val, oldVal) {
      const layoutBox = this.$refs['scroll-box']
      if (!layoutBox) {
        return
      }
      layoutBox.scrollTop = 0
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    scrollIt(e) {
      const _this = this
      e.stopPropagation()
      e.preventDefault()

      requestAnimationFrame(() => {
        const scrollBox = e.target
        this.scrollTop = scrollBox.scrollTop
        // console.log(this.scrollTop)
        if (_this.lastTop === scrollBox.scrollTop) {
          return
        }

        // 距离
        const distance = scrollBox.scrollTop - _this.lastTop
        // 方向
        const direction = distance > 0

        _this.lastTop = scrollBox.scrollTop

        if (distance === 0) {
          return
        }

        if (!direction) {
          // 向上滚动
          // console.log('向上滚动')
          // _this.lastBottomSend = null
          const isTop = scrollBox.scrollTop <= 0
          // const isTop = scrollBox.scrollTop <= 40

          if (isTop) {
            if (!_this.lastTopSend) {
              _this.lastTopSend = scrollBox.scrollTop
              _this.arrivalTop()
            }
          }
        } else {
          // 向下滚动
          // console.log('向下滚动')
          _this.lastTopSend = null
          const isBottom =
            scrollBox.scrollTop + scrollBox.clientHeight >=
            scrollBox.scrollHeight - 40

          if (isBottom) {
            // if (!_this.lastBottomSend) {
            //   _this.lastBottomSend = scrollBox.scrollTop
            //   _this.arrivalBottom()
            // }
            _this.arrivalBottom()
          }
        }
      })
    },
    arrivalTop() {
      this.$emit('arrivalTop', {})
    },
    arrivalBottom() {
      this.$emit('arrivalBottom', {})
    },
    // arrivalLeft() {
    //   this.$emit('arrivalLeft', {})
    // },
    // arrivalRight() {
    //   this.$emit('arrivalRight', {})
    // }
    goTop() {
      this.$refs['scroll-box'].scrollTop = 0
    }
  }
}
</script>
