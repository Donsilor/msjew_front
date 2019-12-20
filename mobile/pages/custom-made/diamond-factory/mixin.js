export default {
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      conditions: [
        {
          type: 'eject-choose-pro',
          key: 'shape',
          name: this.LANGUAGE.listCommons.shape,
          checked: ``,
          options: this.CONDITION_INFO.shape
        },
        {
          type: 'eject-choose',
          key: 'carat-bar',
          name: this.LANGUAGE.listCommons.carat,
          checked: ``,
          options: []
        },
        {
          type: 'eject-choose',
          key: 'color-bar',
          name: this.LANGUAGE.listCommons.color,
          checked: ``,
          options: this.CONDITION_INFO.color
        },
        {
          type: 'eject-choose',
          key: 'clarity-bar',
          name: this.LANGUAGE.listCommons.clarity,
          checked: ``,
          options: this.CONDITION_INFO.clarity
        },
        {
          type: 'eject-choose',
          key: 'cut-bar',
          name: this.LANGUAGE.listCommons.cut,
          checked: ``,
          options: this.CONDITION_INFO.cut
        },
        {
          type: 'eject-choose',
          key: 'price-bar',
          name: this.LANGUAGE.listCommons.price,
          checked: ``,
          options: []
        },
        {
          type: 'eject-choose',
          key: 'luster-bar',
          name: this.LANGUAGE.listCommons.luster,
          checked: ``,
          options: this.CONDITION_INFO.luster
        },
        {
          type: 'eject-choose',
          key: 'symmetry-bar',
          name: this.LANGUAGE.listCommons.symmetry,
          checked: ``,
          options: this.CONDITION_INFO.symmetry
        }
      ],
      conditionWord: this.CONDITION_INFO.sortBy.diamond[0].content
    }
  },
  mounted() {
    this.categoryId = 1
    if (parseInt(this.$route.query.step) === 2) {
      this.selectGoodsId = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      ).steps[0].goodsId
    }
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
        // console.log(this.$refs[info.key])
        this.$refs[info.key].show()
      }
    },
    getCheckedIds(data = []) {
      // console.log(data)
      const result = []
      for (let n = 0, length = data.length; n < length; n++) {
        result.push(data[n].id)
      }
      return result.join(',')
    },
    clearShape(data) {
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
    },
    madeUpEv() {
      this.ev = ``
      if (this.conditions[0].checked !== ``) {
        this.ev += `shape=${this.conditions[0].checked}`
      }
      if (this.conditions[1].checked !== ``) {
        this.ev += `^carat=${this.conditions[1].checked.split(',').join('-')}`
      }
      if (this.conditions[2].checked !== ``) {
        this.ev += `^color=${this.conditions[2].checked.split(',').join('||')}`
      }
      if (this.conditions[3].checked !== ``) {
        this.ev += `^clarity=${this.conditions[3].checked
          .split(',')
          .join('||')}`
      }
      if (this.conditions[4].checked !== ``) {
        this.ev += `^cut=${this.conditions[4].checked.split(',').join('||')}`
      }
      if (this.conditions[5].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[5].checked
          .split(',')
          .join('-')}`
      }
      if (this.conditions[6].checked !== ``) {
        this.ev += `^polish=${this.conditions[6].checked.split(',').join('||')}`
      }
      if (this.conditions[7].checked !== ``) {
        this.ev += `^symmetry=${this.conditions[7].checked
          .split(',')
          .join('||')}`
      }
      this.research()
      console.log(this.ev)
    }
  }
}
