export default {
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      conditions: [
        {
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.listCommons.fineness,
          checked: [],
          options: this.CONDITION_INFO.quality.necklace
        },
        {
          type: 'eject-choose',
          key: 'price-bar',
          name: this.LANGUAGE.listCommons.price,
          checked: ``,
          options: []
        }
      ],
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content,
      isResetProgress: false
    }
  },
  mounted() {
    // console.log(`check=====>`, this.CONDITION_INFO.quality.necklace)
    if (parseInt(this.$route.query.step) === 2) {
      this.selectGoodsId = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      ).steps[0].goodsId
    }
    this.categoryId = 4
    this.madeUpEv()
  },
  methods: {
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
      const result = []
      for (let n = 0, length = data.length; n < length; n++) {
        result.push(data[n].id)
      }
      return result.join(',')
    },
    clearQuality(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[0].checked = this.getCheckedIds(data)
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
      console.log(val)
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
      this.isResetProgress = false
      this.madeUpEv()
    },
    getSortBy(val) {
      this.conditionWord = val.item.content
      this.sortType = val.item.sortType
      this.sortBy = val.item.sortBy
      this.madeUpEv()
    },
    madeUpEv() {
      this.ev = ``
      if (this.conditions[0].checked !== ``) {
        this.ev += `material=${this.conditions[0].checked}`
      }
      if (this.conditions[1].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[1].checked
          .split(',')
          .join('-')}`
      }
      this.ev += `^goods_mod=1`
      this.research()
      console.log(this.ev)
    }
  }
}
