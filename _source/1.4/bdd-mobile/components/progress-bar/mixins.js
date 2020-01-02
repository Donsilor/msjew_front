import Layout from '../eject-layout'

export default {
  components: {
    Layout
  },
  props: {
    isReset: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.progressBar,
      active: false,
      opStart: true,
      opEnd: true,
      inNumStart: 0,
      inNumEnd: 10000000,
      outNumStart: 0,
      outNumEnd: 10000000,
      markNumStart: 0,
      markNumEnd: 10000000
    }
  },
  watch: {
    isReset: function(val) {
      if (val) {
        this.inNumStart = 0
        this.inNumEnd = 10000000
        this.outNumStart = 0
        this.outNumEnd = 10000000
        this.markNumStart = 0
        this.markNumEnd = 10000000
      }
    }
  },
  computed: {
    coinType() {
      return this.$store.state.coin
    }
  },
  methods: {
    //  show box
    show() {
      this.inNumStart = this.markNumStart
      this.inNumEnd = this.markNumEnd
      this.outNumStart = this.markNumStart
      this.outNumEnd = this.markNumEnd
      this.active = true
    },
    //  hide box
    hide() {
      this.active = false
    },
    resetChoose() {
      this.opStart = true
      this.opEnd = true
      this.inNumStart = 0
      this.inNumEnd = 10000000
      this.outNumStart = 0
      this.outNumEnd = 10000000
      this.$refs.ballRight.style.left = ``
    },
    watchNum(val) {
      if (val === `start`) {
        this.opStart = true
        if (
          this.inNumStart < 0 ||
          this.inNumStart === `` ||
          this.inNumStart === ` `
        ) {
          this.inNumStart = 0
        } else if (this.inNumStart > this.inNumEnd) {
          this.inNumStart = this.inNumEnd
        } else {
          this.inNumStart = parseFloat(this.inNumStart)
        }
        this.outNumStart = this.inNumStart
      } else if (val === `end`) {
        this.opEnd = true
        this.$refs.ballRight.style.left = ``
        if (
          this.inNumEnd > 10000000 ||
          this.inNumEnd === `` ||
          this.inNumEnd === ` `
        ) {
          this.inNumEnd = 10000000
        } else if (this.inNumEnd < this.inNumStart) {
          this.inNumEnd = this.inNumStart
        } else {
          this.inNumEnd = parseFloat(this.inNumEnd)
        }
        this.outNumEnd = this.inNumEnd
      }
    },
    pbk(val) {
      //  当获得用户输入的数值之后，先判断用户输入的值的区间（1000， 100000， 300000）。
      //  先减掉前一个区间的最大值（10000， 100000），再除以当前区间的一跳值，得出在当前区间的块数。
      //  再加上前面区间的总块数，得到了总块数。
      //  然后乘以每一块的100/480 = 0.625%的left值，得出来的就是总共的left值。
      const zoom1 = 50
      const zoom2 = 5000
      const zoom3 = 100000
      const total1 = 50000
      const total2 = 1000000
      const total3 = 10000000
      const area1 = total1 / zoom1
      const area2 = (total2 - total1) / zoom2
      const area3 = (total3 - total2 - total1) / zoom3
      const per = 100 / (area1 + area2 + area3)
      if (val <= total1) {
        return (val / zoom1) * per
      } else if (val <= total2 && val > total1) {
        return ((val - total1) / zoom2 + area1) * per
      } else if (val > total2 && val < total3) {
        return ((val - total2) / zoom3 + area1 + area2) * per
      } else if (val <= 0) {
        return 0
      } else if (val >= total3) {
        return 100
      } else {
        return 0
      }
    },
    pbg(val) {
      //  100%长度分成区间总块，每块是每跳一次的left值。
      //  然后，用获取到的left值，去除以每块的left值之后，获得了块数。
      //  获得后的块数，再判断块的区间，如果是在第二梯队或者是第三梯队，应先减掉前面区间的块数总和，得出当前区间的块数，四合五入后得出来的就是当前区间的最终块数了，进而就能得出显示的价格了。
      const zoom1 = 50
      const zoom2 = 5000
      const zoom3 = 100000
      const total1 = 50000
      const total2 = 1000000
      const total3 = 10000000
      const area1 = total1 / zoom1
      const area2 = (total2 - total1) / zoom2
      const area3 = (total3 - total2 - total1) / zoom3
      const per = 100 / (area1 + area2 + area3)
      const blocks = (val * 100) / per
      if (blocks <= area1) {
        return Math.round(blocks) * zoom1
      } else if (blocks <= area2 + area1 && blocks > area1) {
        return Math.round(blocks - area1) * zoom2 + total1
      } else if (blocks < area3 + area2 + area1 && blocks > area2 + area1) {
        return Math.round(blocks - area1 - area2) * zoom3 + total2
      } else if (blocks >= area3 + area2 + area1) {
        return total3
      } else {
        return 0
      }
    },
    focusAgain(val) {
      if (val === `start`) {
        this.opStart = false
        this.$refs.ips.focus()
      } else if (val === `end`) {
        this.opEnd = false
        this.$refs.ipe.focus()
      }
    },
    touchStart(e) {
      e.preventDefault()
      const beginLeft = e.target.offsetParent.offsetLeft
      const beginRight =
        this.$refs.ballRight.offsetLeft + this.$refs.ballRight.offsetWidth
      const startX = e.targetTouches[0].clientX
      let endX = null
      const touchMove = e => {
        endX = e.targetTouches[0].clientX
        let thatLeft = beginLeft + endX - startX
        if (thatLeft < 0) {
          thatLeft = 0
        } else if (thatLeft >= beginRight) {
          thatLeft = beginRight
        }
        this.$refs.ballLeft.style.left = thatLeft + 'px'
        this.inNumStart = this.pbg(thatLeft / this.$refs.lineWidth.offsetWidth)
        this.outNumStart = this.inNumStart
      }
      const deleteListener = () => {
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', deleteListener)
      }
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', deleteListener)
    },
    touchEnd(e) {
      e.preventDefault()
      const beginLeft =
        e.target.offsetParent.offsetLeft + this.$refs.ballRight.offsetWidth
      const stopLeft = this.$refs.ballLeft.offsetLeft
      const startX = e.targetTouches[0].clientX
      let endX = null
      const touchMove = e => {
        endX = e.targetTouches[0].clientX
        let thatLeft = beginLeft + endX - startX
        if (thatLeft > this.$refs.lineWidth.offsetWidth) {
          thatLeft = this.$refs.lineWidth.offsetWidth
        } else if (thatLeft <= stopLeft) {
          thatLeft = stopLeft
        }
        this.$refs.ballRight.style.left =
          thatLeft - this.$refs.ballRight.offsetWidth + 'px'
        this.inNumEnd = this.pbg(thatLeft / this.$refs.lineWidth.offsetWidth)
        this.outNumEnd = this.inNumEnd
      }
      const deleteListener = () => {
        this.$refs.ballRight.style.left = ``
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', deleteListener)
      }
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', deleteListener)
    },
    touchLine(e) {
      const clickPosition = e.offsetX / e.target.offsetWidth
      const marginL = Math.abs(
        e.offsetX / e.target.offsetWidth -
          this.$refs.ballLeft.offsetLeft / this.$refs.lineWidth.offsetWidth
      )
      const marginR = Math.abs(
        e.offsetX / e.target.offsetWidth -
          (this.$refs.ballRight.offsetLeft + this.$refs.ballRight.offsetWidth) /
            this.$refs.lineWidth.offsetWidth
      )
      if (marginL >= marginR) {
        this.$refs.ballRight.style.right = `${clickPosition}`
        this.inNumEnd = this.pbg(`${clickPosition}`)
        this.outNumEnd = this.inNumEnd
      } else {
        this.$refs.ballLeft.style.left = `${clickPosition}`
        this.inNumStart = this.pbg(`${clickPosition}`)
        this.outNumStart = this.inNumStart
      }
    },
    backOption() {
      const jsonBack = {
        name: `price-bar`,
        content: []
      }
      const num1 = parseFloat(this.inNumStart / 100).toFixed(1)
      const num2 = parseFloat(this.inNumEnd / 100).toFixed(1)
      if (
        parseFloat(this.inNumStart) !== 0 ||
        parseFloat(this.inNumEnd) !== 10000000
      ) {
        jsonBack.content = [
          {
            id: parseFloat(this.inNumStart),
            name:
              parseFloat(this.inNumStart) / 1000 >= 10
                ? parseInt(this.inNumStart / 1000) + `K`
                : num1 / 10 + `K`
          },
          {
            id: parseFloat(this.inNumEnd),
            name:
              parseFloat(this.inNumEnd) / 1000 >= 10
                ? parseInt(this.inNumEnd / 1000) + `K`
                : num2 / 10 + `K`
          }
        ]
      }
      this.markNumStart = this.inNumStart
      this.markNumEnd = this.inNumEnd
      this.$emit(`backOption`, jsonBack)
      this.active = false
    }
  }
}
