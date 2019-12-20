export default {
  data() {
    return {
      conditions: [
        {
          type: 'eject-choose-pro',
          key: 'style',
          name: this.LANGUAGE.listCommons.style,
          checked: ``,
          options: []
        },
        {
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.listCommons.fineness,
          checked: ``,
          options: this.CONDITION_INFO.quality.rings
        },
        {
          type: 'eject-choose',
          key: 'price-bar',
          // key: 'price',
          name: this.LANGUAGE.listCommons.price,
          checked: ``,
          options: []
        }
      ],
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content
    }
  },
  // mounted() {
  //   console.log('mixin mounted========>')
  //   this.categoryId = 2
  //   this.madeUpEv()
  // },
  methods: {
    madeUpEv() {
      this.research()
    },
    conditionText(info) {
      const result = []
      const checked = info.checked
      const options = info.options

      for (let n = 0, length = options.length; n < length; n++) {
        if (checked.indexOf(options[n].id) > -1) {
          result.push(options[n].name)
        }
      }
      return result.join('-')
    },
    showChooseEject(info) {
      if (info.type === `eject-choose-pro`) {
        const refName = `${info.key}-${info.type}`
        this.$refs[refName] && this.$refs[refName].showIt()
      } else if (info.type === `eject-choose`) {
        console.log(this.$refs[info.key])
        this.$refs[info.key].show()
      }
    },
    getCheckedIds(data = []) {
      console.log(data)
      const result = []
      for (let n = 0, length = data.length; n < length; n++) {
        result.push(data[n].id)
      }
      return result.join(',')
    },
    clearStyle(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[0].checked = this.getCheckedIds(data)
      this.conditions = conditions
      this.madeUpEv()
    },
    clearQuality(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[1].checked = this.getCheckedIds(data)
      this.conditions = conditions
      this.madeUpEv()
    },

    showSwiperTap() {
      this.$refs.suitability.show()
    },
    clickData(data) {
      this.$emit('clickData', data)
    },
    showChoose(index) {
      this.$refs[index].show()
    },
    getBacks(val) {
      if (val.name === `carat-bar` || val.name === `price-bar`) {
        this.conditions.forEach(obj => {
          if (obj.key === val.name) {
            if (val.content.length !== 0) {
              obj.checked = `${val.content[0].id},${val.content[1].id}`
            } else {
              obj.checked = ``
            }
            obj.options = val.content
          }
        })
      } else {
        this.conditions.forEach(obj => {
          if (obj.key === val.name) {
            obj.checked = this.getCheckedIds(val.content)
          }
        })
      }
      this.madeUpEv()
    },
    getSortBy(val) {
      this.conditionWord = val.item.content
      this.sortType = val.item.sortType
      this.sortBy = val.item.sortBy
      this.madeUpEv()
    }
  }
}
