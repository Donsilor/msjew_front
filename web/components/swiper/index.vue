<template>
  <div class="swiper">
    <div
      ref="swiper-content"
      class="content"
      @touchstart.capture.prevent.stop="touchStart"
      @mousedown.capture.prevent.stop="mouseDown"
      @click.capture="emitClick"
    >
      <template v-if="slotFinish">
        <div
          v-for="(each, n) in showItems"
          :key="n"
          :class="[
            'content-item',
            { 'active-swiper-content-item': active === n }
          ]"
          :style="getPosition(n)"
          @click="setActive(n)"
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
    scaleMultiple: {
      type: Number,
      required: false,
      default: 1.1,
      validator(value) {
        return value > 1
      }
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
      minLength: 20,
      active: 0,

      touchDistance: null,
      autoInterval: null,

      isMoving: false,
      isDragging: false,
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
        data
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
        const cut = this.itemWidth
          ? (width / 100) * this.itemWidth
          : width / 2.8
        proportion = Math.floor((touchDistance / cut) * 100)
        // const cut = this.itemWidth ? 100 / this.itemWidth + 1 : 2.8
        // proportion = Math.floor((touchDistance / (width / cut)) * 100)
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
    this.removeAutoChange()
  },
  methods: {
    emitClick(e) {
      if (this.isDragging) {
        e.stopPropagation()
        e.preventDefault()
      }
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
      if (_this.active === num) {
        return
      }
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

      let display = 'initial'
      let zIndex = 0
      let left = 0
      let opacity = 0
      if (start < ready) {
        // 左边
        zIndex = ready - start
        left = zIndex * -100 - 10
      } else if (start === ready) {
        // 中间
        zIndex = 0
        left = 0
      } else {
        // 右边
        zIndex = start - ready
        left = zIndex * 100 + 10
      }
      left += this.getTouchMoveProprotion

      if (this.isMoving) {
        // console.log('正在移动，全部显示')
        opacity = 1
      } else if (index === this.active) {
        opacity = 1
      } else if (zIndex >= -4 && zIndex <= 4) {
        opacity = this.opacity ? 0.6 : 1
      } else {
        display = 'none'
        opacity = 0
      }

      const scale = this.scale
        ? left === 0
          ? `scale(${this.scaleMultiple}, ${this.scaleMultiple})`
          : 'scale(0.9, 0.9)'
        : 'scale(1, 1)'

      const style = {
        width: `${this.itemWidth}%`,
        left: `${(100 - this.itemWidth) / 2}%`,
        transform: `translate(${left}%, 0) ${scale} translateZ(0)`,
        zIndex,
        opacity,
        display
      }

      return style
    },
    touchStart(e) {
      const _this = this
      const startX = Math.floor(e.targetTouches[0].clientX)

      let endX = null
      let isEnd = false

      // 删除自动切换
      if (_this.auto) {
        _this.removeAutoChange()
      }

      _this.isMoving = true

      const touchMove = event => {
        requestAnimationFrame(() => {
          if (isEnd) {
            return
          }
          endX = Math.floor(event.targetTouches[0].clientX)
          _this.touchDistance = endX - startX
        })
      }
      const touchEnd = event => {
        isEnd = true
        _this.isMoving = false
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', touchEnd)

        _this.setActive(
          _this.getItemIndexByNum(_this.computeActiveByDistance())
        )
        _this.touchDistance = null

        // 恢复自动切换
        if (_this.auto) {
          _this.autoChange()
        }
      }
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', touchEnd)
    },
    mouseDown(e) {
      const _this = this
      const startX = Math.floor(e.clientX)

      let endX = null
      let isEnd = false

      // 删除自动切换
      if (_this.auto) {
        _this.removeAutoChange()
      }

      _this.isMoving = true

      const mouseMove = event => {
        requestAnimationFrame(() => {
          if (isEnd) {
            return
          }
          endX = Math.floor(event.clientX)
          _this.touchDistance = endX - startX

          if (!_this.isDragging) {
            if (_this.touchDistance > -5 && _this.touchDistance < 5) {
              _this.isDragging = true
            }
          }
        })
      }
      const mouseUp = event => {
        event.preventDefault()
        event.stopPropagation()

        isEnd = true
        _this.isMoving = false
        setTimeout(() => {
          _this.isDragging = false
        }, 100)
        document.removeEventListener('mousemove', mouseMove, true)
        document.removeEventListener('mouseup', mouseUp, true)

        _this.setActive(
          _this.getItemIndexByNum(_this.computeActiveByDistance())
        )
        _this.touchDistance = null

        // 恢复自动切换
        if (_this.auto) {
          _this.autoChange()
        }
      }
      document.addEventListener('mousemove', mouseMove, true)
      document.addEventListener('mouseup', mouseUp, true)
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
      this.$emit('change', {
        index: this.activeIndex,
        swiperIndex: this.active
      })
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
  /*overflow: hidden;*/
}
.content-item {
  position: absolute;
  top: 0;
  height: 100%;
  /*overflow: hidden;*/
  opacity: 0.7;
  transition: all 0.2s linear;
}
.instructions {
  position: absolute;
  left: 0;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.instructions-item {
  width: 8px;
  height: 3px;
  margin: 0 2px;
  border-radius: 2px;
  background-color: #999999;
  transition: all 0.5s linear;
}
.instructions-item.active {
  background-color: #f29b87;
}
</style>
