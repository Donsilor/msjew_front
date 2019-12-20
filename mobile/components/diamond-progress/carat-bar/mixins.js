import Layout from '../../eject-layout'

export default {
  components: {
    Layout
  },
  props: {},
  data() {
    return {
      lang: this.LANGUAGE.components.diamondProgress,
      active: false,
      opStart: true,
      opEnd: true,
      inNumStart: 0.1,
      inNumEnd: 10,
      outNumStart: 0.1,
      outNumEnd: 10,
      markNumStart: 0,
      markNumEnd: 10
    }
  },
  filters: {
    toFixs: function(val) {
      return parseFloat(val).toFixed(2)
    }
  },
  computed: {},
  methods: {
    //  show box
    show() {
      this.inNumStart = parseFloat(this.markNumStart).toFixed(2)
      this.inNumEnd = parseFloat(this.markNumEnd).toFixed(2)
      this.outNumStart = parseFloat(this.markNumStart).toFixed(2)
      this.outNumEnd = parseFloat(this.markNumEnd).toFixed(2)
      this.active = true
    },
    //  hide box
    hide() {
      this.active = false
    },
    resetChoose() {
      this.opStart = true
      this.opEnd = true
      this.inNumStart = 0.1
      this.inNumEnd = 10
      this.outNumStart = 0.1
      this.outNumEnd = 10
      this.$refs.ballRight.style.left = ``
    },
    watchNum(val) {
      if (val === `start`) {
        this.opStart = true
        if (
          this.inNumStart < 0.1 ||
          this.inNumStart === `` ||
          this.inNumStart === ` `
        ) {
          this.inNumStart = 0.1
        } else if (this.inNumStart > this.inNumEnd) {
          this.inNumStart = parseFloat(this.inNumEnd).toFixed(2)
        } else {
          this.inNumStart = parseFloat(this.inNumStart).toFixed(2)
        }
        this.outNumStart = parseFloat(this.inNumStart).toFixed(2)
      } else if (val === `end`) {
        this.opEnd = true
        this.$refs.ballRight.style.left = ``
        if (
          this.inNumEnd > 10 ||
          this.inNumEnd === `` ||
          this.inNumEnd === ` `
        ) {
          this.inNumEnd = 10
        } else if (this.inNumEnd < this.inNumStart) {
          this.inNumEnd = parseFloat(this.inNumStart).toFixed(2)
        } else {
          this.inNumEnd = parseFloat(this.inNumEnd).toFixed(2)
        }
        this.outNumEnd = parseFloat(this.inNumEnd).toFixed(2)
      }
    },
    pbk(val) {
      //  当获得用户输入的数值之后，先判断用户输入的值的区间（1000， 100000， 300000）。
      //  先减掉前一个区间的最大值（10000， 100000），再除以当前区间的一跳值，得出在当前区间的块数。
      //  再加上前面区间的总块数，得到了总块数。
      //  然后乘以每一块的100/480 = 0.625%的left值，得出来的就是总共的left值。
      const zoom1 = 0.01
      const zoom2 = 0.12
      const zoom3 = 0.12
      const total1 = 2
      const total2 = 6
      const total3 = 10
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
      const zoom1 = 0.01
      const zoom2 = 0.12
      const zoom3 = 0.12
      const total1 = 2
      const total2 = 6
      const total3 = 10
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
        this.outNumStart = parseFloat(this.inNumStart).toFixed(2)
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
        this.outNumEnd = parseFloat(this.inNumEnd).toFixed(2)
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
        this.outNumEnd = parseFloat(this.inNumEnd).toFixed(2)
      } else {
        this.$refs.ballLeft.style.left = `${clickPosition}`
        this.inNumStart = this.pbg(`${clickPosition}`)
        this.outNumStart = parseFloat(this.inNumStart).toFixed(2)
      }
    },
    showHelp() {
      this.$emit(`help`)
    },
    backOption() {
      let jsonBack = {}
      if (this.inNumStart === 0.1 && this.inNumEnd === 10) {
        jsonBack = {
          name: `carat-bar`,
          content: []
        }
      } else {
        jsonBack = {
          name: `carat-bar`,
          content: [
            {
              id: parseFloat(this.inNumStart).toFixed(2),
              name: parseFloat(this.inNumStart).toFixed(2)
            },
            {
              id: parseFloat(this.inNumEnd).toFixed(2),
              name: parseFloat(this.inNumEnd).toFixed(2)
            }
          ]
        }
      }
      this.markNumStart = parseFloat(this.inNumStart).toFixed(2)
      this.markNumEnd = parseFloat(this.inNumEnd).toFixed(2)
      this.$emit(`backOption`, jsonBack)
      this.active = false
    }
  }
}
