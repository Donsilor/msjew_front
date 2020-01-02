<template>
  <div class="swiper">
    <div class="content">
      <div
        v-for="(each, n) in showItems"
        :key="n"
        class="swiper-item"
        :style="getPosition(n)"
      >
        {{ n }}
      </div>
    </div>
    <div class="instructions">
      <span class="instructions-item active"></span>
      <span class="instructions-item"></span>
      <span class="instructions-item"></span>
    </div>
  </div>
</template>

<script>
import Mixins from './mixins'
export default {
  mixins: [Mixins],
  data() {
    return {
      minLength: 5,
      // ready: 2,
      active: 0,
      items: [
        {
          index: 0
        },
        {
          index: 1
        },
        {
          index: 2
        }
      ]
    }
  },
  computed: {
    dealItems() {
      const result = []
      const items = JSON.parse(JSON.stringify(this.items))
      for (let n = 0, length = items.length; n < length; n++) {
        result.push({
          index: n,
          data: items[n]
        })
      }

      return result
    },
    showItems() {
      const minLength = this.minLength
      const items = JSON.parse(JSON.stringify(this.dealItems))
      let result = JSON.parse(JSON.stringify(items))
      if (items.length >= minLength) {
        if (items.length % 2 === 0) {
          items.push(items[0])
        }
        return result
      } else {
        const need = minLength - items.length
        for (
          let n = 0, length = Math.floor(need / items.length);
          n < length;
          n++
        ) {
          result = result.concat(items)
        }
        for (
          let n = 0, length = Math.floor(need % items.length);
          n < length;
          n++
        ) {
          result.push(items[n])
        }
      }

      return result
    },
    ready() {
      const length = this.showItems.length
      return (length - 1) / 2
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
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      console.log('_this.showItems====>', _this.showItems)
      console.log('_this.showingIndexs====>', _this.showingIndexs)
      const gapTime = 2000
      setInterval(() => {
        _this.goNext(1)
      }, gapTime)
    })
  },
  methods: {
    goNext(type) {
      const active = this.active
      if (type < 0) {
        if (active - 1 < 0) {
          this.active = this.showItems.length - 1
        }
        this.active--
      } else if (active + 1 > this.showItems.length - 1) {
        this.active = 0
      } else {
        this.active++
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
      // const active = this.active
      // // 处理后的数组
      // const showItems = this.showItems
      const ready = this.ready
      // 根据位置变换的下标数组
      const showingIndexs = this.showingIndexs

      const start = showingIndexs.indexOf(index)
      // console.log('index===>', index)
      // console.log('start===>', start)

      let zIndex = 0
      let left = 0
      if (start < ready) {
        // 左边
        zIndex = ready - start
        left = zIndex * -100
      } else if (start === ready) {
        // 中间
        zIndex = 0
        left = 0
      } else {
        // 右边
        zIndex = start - ready
        left = zIndex * 100
      }

      const style = {
        transform: `translate(${left}%, 0) ${
          left === 0 ? 'scale(1, 1)' : 'scale(0.9, 0.9)'
        }`,
        zIndex: zIndex,
        opacity: left === 0 ? 1 : 0.7
      }

      // console.log('style===>', style)

      return style

      // const positionIndex = index - this.ready
      // const left = positionIndex * 100
      // const zIndex = -Math.abs(positionIndex) + this.ready
      // let opacity = 0.3
      // if (positionIndex === 0) {
      //   opacity = 1
      // }
      // return {
      //   transform: `translate(${left}%, 0) ${
      //     positionIndex === 0 ? 'scale(1.1, 1.1)' : 'scale(1, 1)'
      //   }`,
      //   zIndex: zIndex,
      //   opacity: opacity
      // }
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
}
.swiper-item {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: darkcyan;
  opacity: 0.7;
  transition: all 1s linear;
}
.instructions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  transform: translate(0, -200%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.instructions-item {
  width: 6px;
  height: 6px;
  margin: 0 2px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.instructions-item.active {
  background-color: rgba(255, 255, 255, 1);
}
</style>
