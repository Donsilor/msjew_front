export default {
  data() {
    return {
      hadInputKeys: []
    }
  },
  methods: {
    inputKey(key = null) {
      console.log('inputKey=====>', key)
      if (!key) {
        return
      }
      const hadInputKeys = JSON.parse(JSON.stringify(this.hadInputKeys))
      if (this.hadInput(key)) {
        return
      }
      hadInputKeys.push(key)
      this.hadInputKeys = hadInputKeys
    },
    hadInput(key = null) {
      if (!key) {
        return false
      }
      const start = this.hadInputKeys.indexOf(key)
      return start > -1
    }
  }
}
