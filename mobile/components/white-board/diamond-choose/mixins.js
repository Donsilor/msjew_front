import Layout from '../index.vue'

export default {
  components: {
    Layout
  },
  props: {},
  data() {
    return {
      lang: this.LANGUAGE.components.whiteBoard,
      active: false,
      actIndex: 0,
      content: [
        {
          url: '/diamond/diamond/round.png',
          name: this.LANGUAGE.components.whiteBoard.round,
          desc: this.LANGUAGE.components.whiteBoard.roundDesc
        },
        {
          url: '/diamond/diamond/oval.png',
          name: this.LANGUAGE.components.whiteBoard.oval,
          desc: this.LANGUAGE.components.whiteBoard.ovalDesc
        },
        {
          url: '/diamond/diamond/princess.png',
          name: this.LANGUAGE.components.whiteBoard.princessSquare,
          desc: this.LANGUAGE.components.whiteBoard.princessSquareDesc
        },
        {
          url: '/diamond/diamond/emerald.png',
          name: this.LANGUAGE.components.whiteBoard.octagonalTrapezoid,
          desc: this.LANGUAGE.components.whiteBoard.octagonalTrapezoidDesc
        },
        {
          url: '/diamond/diamond/heart.png',
          name: this.LANGUAGE.components.whiteBoard.heartShaped,
          desc: this.LANGUAGE.components.whiteBoard.heartShapedDesc
        },
        {
          url: '/diamond/diamond/marquise.png',
          name: this.LANGUAGE.components.whiteBoard.marquise,
          desc: this.LANGUAGE.components.whiteBoard.marquiseDesc
        },
        {
          url: '/diamond/diamond/cushion.png',
          name: this.LANGUAGE.components.whiteBoard.pincushion,
          desc: this.LANGUAGE.components.whiteBoard.pincushionDesc
        },
        {
          url: '/diamond/diamond/pear.png',
          name: this.LANGUAGE.components.whiteBoard.dropShape,
          desc: this.LANGUAGE.components.whiteBoard.dropShapeDesc
        },
        {
          url: '/diamond/diamond/asscher.png',
          name: this.LANGUAGE.components.whiteBoard.laserSquare,
          desc: this.LANGUAGE.components.whiteBoard.laserSquareDesc
        },
        {
          url: '/diamond/diamond/radiant.png',
          name: this.LANGUAGE.components.whiteBoard.octagonalLaser,
          desc: this.LANGUAGE.components.whiteBoard.octagonalLaserDesc
        }
      ]
    }
  },
  computed: {},
  methods: {
    //  show box
    show() {
      this.active = true
    },
    //  hide box
    hide() {
      this.active = false
    }
    // clearChoose() {
    //   this.$emit('onClear', this.checkedOptions)
    //   this.hide()
    // }
  }
}
