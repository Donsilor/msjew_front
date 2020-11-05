export default {
  props: {
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.chooseEject,
      choose: []
    }
  },
  computed: {
    checkedOptions() {
      const result = []
      const options = this.options
      const choose = this.choose

      for (let n = 0, length = options.length; n < length; n++) {
        if (choose.indexOf(options[n].id) === -1) {
          continue
        }
        result.push(options[n])
      }
      return result
    }
  },
  methods: {
    hadChecked(id) {
      return this.choose.indexOf(id) > -1
    },
    setChoose(data = []) {
      this.choose = JSON.parse(JSON.stringify(data))
      this.emitChange()
    },
    resetChoose() {
      this.setChoose([])
    },
    checked(id) {
      const choose = JSON.parse(JSON.stringify(this.choose))
      const start = choose.indexOf(id)

      if (this.multiple) {
        if (start === -1) {
          choose.push(id)
        } else {
          if (this.required) {
            if (choose.length === 1) {
              // this.$toast(this.lang.mustChoose)
              return
            }
          }
          choose.splice(start, 1)
        }
        this.setChoose(choose)
      } else if (start === -1) {
        this.setChoose([id])
      } else {
        if (this.required) {
          if (choose.length === 1) {
            // this.$toast(this.lang.mustChoose)
            return
          }
        }
        this.setChoose([])
      }
    },
    emitChange() {
      this.$emit('change', JSON.parse(JSON.stringify(this.checkedOptions)))
    }
  }
}
