export default {
  props: {
    defaultCondition: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      searchConditions: {}
    }
  },
  created() {
    this.searchConditions = Object.assign(
      this.searchConditions,
      this.defaultCondition
    )
  }
}
