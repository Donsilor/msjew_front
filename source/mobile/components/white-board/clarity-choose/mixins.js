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
      content: this.CONDITION_INFO.clarity
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
