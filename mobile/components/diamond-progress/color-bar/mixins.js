import Layout from '../../eject-layout'

export default {
  components: {
    Layout
  },
  props: {
    options: {
      type: Array,
      require: false,
      default() {
        return this.CONDITION_INFO.color
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.diamondProgress,
      active: false,
      leftArray: [],
      startNum: 0,
      endNum: null,
      inStartNum: 0,
      inEndNum: null,
      actIndex: null,
      markInStartNum: 0,
      markInEndNum: null,
      markActIndex: null,
      markStartNum: 0,
      markEndNum: null,
      isNew: true
    }
  },
  filters: {
    toFixs: function(val) {
      return parseFloat(val).toFixed(2)
    }
  },
  computed: {},
  mounted() {
    const perLeft = 1 / this.options.length
    for (let i = 0; i <= this.options.length; i++) {
      this.leftArray.push(perLeft * i)
    }
    this.markEndNum = this.options.length
    this.endNum = this.options.length
    this.markInEndNum = this.options.length
    this.inEndNum = this.options.length
  },
  methods: {
    //  show box
    show() {
      if (this.isNew) {
        this.active = true
        this.isNew = false
        return
      }
      this.inStartNum = this.markInStartNum
      this.inEndNum = this.markInEndNum
      this.startNum = this.markStartNum
      this.endNum = this.markEndNum
      this.actIndex = this.markActIndex
      this.active = true
    },
    //  hide box
    hide() {
      this.active = false
      setTimeout(() => {
        this.resetChoose()
      }, 1000)
    },
    resetChoose() {
      this.startNum = 0
      this.endNum = this.options.length
      this.inStartNum = 0
      this.inEndNum = this.options.length
      this.actIndex = null
    },
    touchStart(e) {
      e.preventDefault()
      this.$refs.ballLeft.style.transition = `unset`
      const beginLeft = e.target.offsetParent.offsetLeft
      const beginRight =
        this.leftArray[parseInt(this.endNum) - 1] *
        this.$refs.lineWidth.offsetWidth
      const startX = e.targetTouches[0].clientX
      let endX = null
      let thatLeft = null
      const touchMove = e => {
        endX = e.targetTouches[0].clientX
        thatLeft = beginLeft + endX - startX
        if (thatLeft < 0) {
          thatLeft = 0
        } else if (thatLeft >= beginRight) {
          thatLeft = beginRight
        }
        if (
          thatLeft >
          this.leftArray[this.startNum] * this.$refs.lineWidth.offsetWidth +
            this.$refs.singleLine[0].offsetWidth / 2
        ) {
          this.startNum++
        } else if (
          thatLeft <=
          this.leftArray[this.startNum] * this.$refs.lineWidth.offsetWidth -
            this.$refs.singleLine[0].offsetWidth / 2
        ) {
          this.startNum--
        }
        this.$refs.ballLeft.style.left = thatLeft + 'px'
      }
      const deleteListener = () => {
        this.$refs.ballLeft.style.transition = `all 0.2s linear`
        this.inStartNum = this.startNum
        this.$refs.ballLeft.style.left =
          this.leftArray[this.inStartNum] * 100 + '%'
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', deleteListener)
      }
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', deleteListener)
    },
    touchEnd(e) {
      e.preventDefault()
      this.$refs.ballRight.style.transition = `unset`
      const beginLeft = e.target.offsetParent.offsetLeft
      const stopLeft =
        this.leftArray[parseInt(this.startNum) + 1] *
        this.$refs.lineWidth.offsetWidth
      const startX = e.targetTouches[0].clientX
      let endX = null
      let thatLeft = null
      const touchMove = e => {
        endX = e.targetTouches[0].clientX
        thatLeft = beginLeft + endX - startX
        if (thatLeft > this.$refs.lineWidth.offsetWidth) {
          thatLeft = this.$refs.lineWidth.offsetWidth
        } else if (thatLeft <= stopLeft) {
          thatLeft = stopLeft
        }
        if (
          thatLeft >
          this.leftArray[this.endNum] * this.$refs.lineWidth.offsetWidth +
            this.$refs.singleLine[0].offsetWidth / 2
        ) {
          this.endNum++
        } else if (
          thatLeft <=
          this.leftArray[this.endNum] * this.$refs.lineWidth.offsetWidth -
            this.$refs.singleLine[0].offsetWidth / 2
        ) {
          this.endNum--
        }
        this.$refs.ballRight.style.left = thatLeft + 'px'
      }
      const deleteListener = () => {
        this.$refs.ballRight.style.transition = `all 0.2s linear`
        this.inEndNum = this.endNum
        this.$refs.ballRight.style.left =
          this.leftArray[this.inEndNum] * 100 + '%'
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', deleteListener)
      }
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', deleteListener)
    },
    touchLine(e) {
      const clickPoint = e.offsetX / e.target.offsetWidth
      let s = 1
      for (const i in this.leftArray) {
        const compareS = Math.abs(clickPoint - this.leftArray[i])
        if (compareS < s) {
          this.actIndex = i
          s = compareS
        }
      }
      const startS = Math.abs(this.actIndex - this.startNum)
      const endS = Math.abs(this.actIndex - this.endNum)
      if (startS > endS) {
        this.endNum = this.actIndex
        this.inEndNum = this.actIndex
      } else if (startS < endS) {
        this.startNum = this.actIndex
        this.inStartNum = this.actIndex
      } else if (clickPoint - this.leftArray[this.actIndex] > 0) {
        this.endNum = this.actIndex
        this.inEndNum = this.actIndex
      } else {
        this.startNum = this.actIndex
        this.inStartNum = this.actIndex
      }
    },
    showHelp() {
      this.$emit(`help`)
    },
    backOption() {
      const jsonBack = {
        name: `color-bar`,
        content: []
      }
      if (
        parseInt(this.inStartNum) !== 0 ||
        parseInt(this.inEndNum) !== this.options.length
      ) {
        if (parseInt(this.inStartNum) === this.inEndNum - 1) {
          jsonBack.content = [this.options[this.inStartNum]]
        } else {
          jsonBack.content = [
            this.options[this.inStartNum],
            this.options[this.inEndNum - 1]
          ]
        }
      }
      this.markInStartNum = this.inStartNum
      this.markInEndNum = this.inEndNum
      this.markStartNum = this.startNum
      this.markEndNum = this.endNum
      this.markActIndex = this.actIndex
      this.$emit(`backOption`, jsonBack)
      this.active = false
    }
  }
}
