import Layout from '../index.vue'

export default {
  components: {
    Layout
  },
  props: {},
  data() {
    return {
      active: false
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
  }
}
