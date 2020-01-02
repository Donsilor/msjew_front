<template>
  <div class="swiper" @touchmove="endTouch">
    <div ref="swiper-content" class="content" @touchstart.stop="touchStart">
      <template v-if="slotFinish">
        <div
          v-for="(each, n) in showItems"
          :key="n"
          class="content-item"
          :style="getPosition(n)"
        >
          <!--          <span>{{ n }}</span>-->
          <slot :name="`content-${n}`">
            {{ `content-${n}` }}
          </slot>
        </div>
      </template>
    </div>
    <div v-show="indicator" class="instructions">
      <span
        v-for="(each, n) in dealItems.data"
        :key="n"
        :class="['instructions-item', { active: activeIndex === n }]"
      ></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
let moveType = null
export default {
  props: {
    itemWidth: {
      type: Number,
      required: false,
      default: 100,
      validator(value) {
        return value > 1 && value <= 100
      }
    },
    indicator: {
      type: Boolean,
      required: false,
      default: true
    },
    auto: {
      type: Boolean,
      required: false,
      default: false
    },
    scale: {
      type: Boolean,
      required: false,
      default: false
    },
    opacity: {
      type: Boolean,
      required: false,
      default: false
    },
    button: {
      type: Boolean,
      required: false,
      default: false
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
    }
  },
  data() {
    return {
      slotFinish: false,
      minLength: 10,
      active: 0,

      touchDistance: null,
      autoInterval: null,

      timestamp: null
    }
  },
  computed: {
    dealItems() {
      const data = []
      const items = this.$slots.default || []

      for (let n = 0, length = items.length; n < length; n++) {
        if (items[n].tag) {
          data.push({
            index: data.length,
            el: items[n]
          })
        }
      }

      return {
        timestamp: this.timestamp,
        data: data
      }
    },
    showItems() {
      const minLength = this.minLength
      const items = this.dealItems.data
      let result = [].concat(items)

      if (items.length === 0) {
        return result
      }

      if (items.length >= minLength) {
        return result
      } else {
        const need = minLength - items.length
        for (
          let n = 0, length = Math.ceil(need / items.length);
          n < length;
          n++
        ) {
          result = result.concat(items)
        }
      }

      return result
    },
    ready() {
      const length = this.showItems.length
      const ds = length % 2
      return (length - (ds ? 1 : 2)) / 2
    },
    showingIndexs() {
      const result = []
      const active = this.active
      const ready = this.ready
      for (let n = ready; n > 0; n--) {
        const num = active - n
        result.push(this.getItemIndexByNum(num))
      }
      result.push(active)
      for (let n = 1; n < ready + 1; n++) {
        const num = active + n
        result.push(this.getItemIndexByNum(num))
      }
      return result
    },
    getTouchMoveProprotion() {
      const touchDistance = this.touchDistance
      let proportion = 0

      if (touchDistance !== null) {
        const swiperContent = this.$refs['swiper-content']
        const width = swiperContent.clientWidth
        proportion = Math.floor((touchDistance / (width / 2.2)) * 100)
      }
      return proportion
    },
    activeIndex() {
      return this.showItems[this.active]
        ? this.showItems[this.active].index
        : null
      // return this.showItems[this.active] && this.showItems[this.active].index
      //   ? this.showItems[this.active].index
      //   : null
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      // document.addEventListener('touchmove', _this.stopEvent, true)

      _this.resetSlot()
      _this.slotFinish = true

      if (_this.auto) {
        _this.autoChange()
      }
    })
  },
  beforeUpdate() {
    this.timestamp = new Date().getTime()
    this.resetSlot()
  },
  beforeDestroy() {
    // document.removeEventListener('touchmove', this.stopEvent, true)
    this.removeAutoChange()
  },
  methods: {
    stopEvent(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    resetSlot() {
      const _this = this
      const items = _this.showItems
      for (let n = 0, length = items.length; n < length; n++) {
        // _this.$slots[`content-${n}`] = [items[n].el]
        Vue.set(_this.$slots, `content-${n}`, [items[n].el])
        // this.$set(_this.$slots, `content-${n}`, [items[n].el])
      }
    },
    autoChange() {
      const _this = this
      if (_this.dealItems.data.length === 0) {
        return
      }
      _this.removeAutoChange()
      _this.autoInterval = setInterval(() => {
        _this.goNext(true)
      }, _this.duration)
    },
    removeAutoChange() {
      const _this = this
      clearInterval(_this.autoInterval)
    },
    setActive(num) {
      const _this = this
      _this.active = num
      _this.changeEmit()
    },
    goNext(type) {
      let active = this.active
      if (!type) {
        if (active - 1 < 0) {
          // this.active = this.showItems.length - 1
          this.setActive(this.showItems.length - 1)
        } else {
          active--
          this.setActive(active)
        }
      } else if (active + 1 > this.showItems.length - 1) {
        // this.active = 0
        this.setActive(0)
      } else {
        active++
        this.setActive(active)
      }
    },
    getItemIndexByNum(num) {
      let result = 0
      if (num >= 0 && num < this.showItems.length) {
        result = num
      } else if (num < 0) {
        num = this.getItemIndexByNum(this.showItems.length + num)
        result = num
      } else {
        num = this.getItemIndexByNum(num - this.showItems.length)
        result = num
      }
      return result
    },
    getPosition(index = 0) {
      // index为数组下标
      const ready = this.ready
      // 根据位置变换的下标数组
      const showingIndexs = this.showingIndexs

      const start = showingIndexs.indexOf(index)

      let zIndex = 0
      let left = 0
      let opacity = 0
      if (start < ready) {
        // 左边
        zIndex = ready - start
        left = zIndex * -101
      } else if (start === ready) {
        // 中间
        zIndex = 0
        left = 0
      } else {
        // 右边
        zIndex = start - ready
        left = zIndex * 101
      }
      left += this.getTouchMoveProprotion

      // if (zIndex === 0) {
      if (index === this.active) {
        opacity = 1
      } else if (zIndex >= -2 && zIndex <= 2) {
        opacity = this.opacity ? 0.6 : 1
      } else {
        opacity = 0
      }

      const scale = this.scale
        ? left === 0
          ? 'scale(1, 1)'
          : 'scale(0.9, 0.9)'
        : 'scale(1, 1)'

      const style = {
        width: `${this.itemWidth}%`,
        left: `${(100 - this.itemWidth) / 2}%`,
        transform: `translate(${left}%, 0) ${scale} translateZ(0)`,
        zIndex: zIndex,
        opacity: opacity
      }

      return style
    },
    endTouch(e) {
      if (moveType === 'left') {
        e.preventDefault()
      }
    },
    touchStart(e) {
      const _this = this
      const startX = Math.floor(e.targetTouches[0].clientX)
      const startY = Math.floor(e.targetTouches[0].clientY)

      let endX = null
      let endY = null
      let isEnd = false
      const startTime = new Date().getTime()

      moveType = null

      // 删除自动切换
      if (_this.auto) {
        _this.removeAutoChange()
      }

      const touchMove = event => {
        if (isEnd) {
          return
        }

        if (moveType === 'left') {
          e.preventDefault()
          e.stopPropagation()
          event.preventDefault()
          event.stopPropagation()
        }
        // console.log('touchMove')
        endX = Math.floor(event.targetTouches[0].clientX)
        endY = Math.floor(event.targetTouches[0].clientY)

        if (!moveType) {
          if (Math.abs(endY - startY) < 10 && Math.abs(endX - startX) > 10) {
            // console.log('左右')
            moveType = 'left'
          }
          if (Math.abs(endX - startX) < 10 && Math.abs(endY - startY) > 10) {
            // console.log('上下')
            moveType = 'top'
          }
        }

        if (moveType === 'left') {
          // console.log('左右')
          _this.touchDistance = endX - startX
          e.preventDefault()
          e.stopPropagation()
          event.preventDefault()
          event.stopPropagation()
        }
      }
      const touchEnd = event => {
        // console.log('touchEnd')
        isEnd = true
        document.removeEventListener('touchmove', touchMove, true)
        document.removeEventListener('touchend', touchEnd, true)

        // 恢复自动切换
        if (_this.auto) {
          _this.autoChange()
        }

        const endTime = new Date().getTime()

        if (endTime - startTime < 300) {
          // if (_this.touchDistance > -130 && _this.touchDistance < -80) {
          if (_this.touchDistance < -30) {
            _this.goNext(true)
            _this.touchDistance = null
            return
          }
          // if (_this.touchDistance < 130 && _this.touchDistance > 80) {
          if (_this.touchDistance > 30) {
            _this.goNext(false)
            _this.touchDistance = null
            return
          }
        }

        _this.setActive(
          _this.getItemIndexByNum(_this.computeActiveByDistance())
        )
        _this.touchDistance = null
      }
      document.addEventListener('touchmove', touchMove, true)
      document.addEventListener('touchend', touchEnd, true)
    },
    computeActiveByDistance() {
      const _this = this
      const moveProprotion = _this.getTouchMoveProprotion
      let int = 0
      const remainder = (moveProprotion > 100 ? moveProprotion : 0) % 100

      if (moveProprotion > 0) {
        // 右划
        int = Math.floor(moveProprotion / 100)
      } else {
        int = Math.ceil(moveProprotion / 100)
      }

      if (moveProprotion > 0) {
        // 右划
        if (remainder >= 50) {
          int++
        }
      } else if (remainder <= -50) {
        int--
      }
      int = _this.active - int

      return int
    },
    changeEmit() {
      this.$emit('change', this.activeIndex)
    }
  }
}
</script>

<style scoped lang="less">
.swiper {
  position: relative;
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-item {
  position: absolute;
  /*top: 10%;*/
  /*left: 10%;*/
  /*width: 80%;*/
  /*height: 80%;*/
  top: 0;
  /*left: 0;*/
  /*width: 100%;*/
  height: 100%;
  /*background-color: darkcyan;*/
  overflow: hidden;
  opacity: 0.7;
  transition: all 0.4s linear;
}
/*.content-item span {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  font-size: 24px;*/
/*}*/
.instructions {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  /*transform: translate(0, -200%);*/
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.instructions-item {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s linear;
}
.instructions-item.active {
  background-color: rgba(255, 255, 255, 1);
}
</style>
