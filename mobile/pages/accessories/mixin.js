export default {
  props: {
    sendCod: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    activeIndex: {
      type: Number,
      require: true,
      default() {
        return -1
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      conditions: [
        {
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.listCommons.fineness,
          checked: ``,
          options: this.sendCod
        },
        {
          type: 'eject-choose-pro',
          key: 'style',
          name: this.LANGUAGE.listCommons.theme,
          checked: ``,
          options: this.CONDITION_INFO.style.theme
        },
        {
          type: 'eject-choose',
          key: 'price-bar',
          name: this.LANGUAGE.listCommons.price,
          checked: (typeof this.$route.query.startPrice !== 'undefined' && typeof this.$route.query.endPrice !== 'undefined')  ? this.$route.query.startPrice + '-' + this.$route.query.endPrice:'',
          options: (typeof this.$route.query.startPrice !== 'undefined' && typeof this.$route.query.endPrice !== 'undefined')  ? [{id:this.$route.query.startPrice,name:this.$route.query.startPrice/1000 + `K`},{id:this.$route.query.endPrice,name:this.$route.query.endPrice/1000 + `K`}]:[]
        }
      ],
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content,
      isResetProgress: false,
      theme_text :'',
      category : [4,5,6,7,8,9,16,17,18]
    }
  },
  watch: {
    activeIndex: function(val) {
      switch (val) {
        case 0:
          this.categoryId = 4
          break
        case 1:
          this.categoryId = 5
          break
        case 2:
          this.categoryId = 6
          break
        case 3:
          this.categoryId = 7
          break
        case 4:
          this.categoryId = 8
          break
        case 5:
          this.categoryId = 9
          break
        case 6:
          this.categoryId = 16
          break
        case 7:
          this.categoryId = 17
          break
        case 8:
          this.categoryId = 18
          break
        
      }
      this.conditions[0].options = JSON.parse(JSON.stringify(this.sendCod))
      this.conditions[0].checked = ``
      this.conditions[1].options = this.CONDITION_INFO.style.theme
      this.conditions[1].checked = ``
      this.theme_text = ''
      this.conditions[2].checked = ``
      this.conditions[2].options = []
      this.isResetProgress = true
      this.madeUpEv()
    },

    $route(val, oldVal) {
      this.conditions[0].options = JSON.parse(JSON.stringify(this.sendCod))
      this.conditions[0].checked = ``
      this.conditions[1].options = this.CONDITION_INFO.style.theme
      let theme = typeof this.$route.query.theme !== 'undefined' ? this.$route.query.theme:''
      this.conditions[1].checked = theme.toString()
      this.theme_text = this.conditionText(this.conditions[1])
      this.conditions[2].checked = ``
      this.conditions[2].options = []
      this.isResetProgress = true
      this.categoryId = [4,5,6,7,8,9,16,17,18]
      this.madeUpEv()
    }
  },
  mounted() {
    switch (parseInt(this.activeIndex)) {
      case 0:
        this.categoryId = 4
        break
      case 1:
        this.categoryId = 5
        break
      case 2:
        this.categoryId = 6
        break
      case 3:
        this.categoryId = 7
        break
      case 4:
        this.categoryId = 8
        break
      case 5:
        this.categoryId = 9
        break
      case 6:
        this.categoryId = 16
        break
      case 7:
        this.categoryId = 17
        break
      case 8:
        this.categoryId = 18
        break
      case -1:
        this.categoryId = this.category
        break
    }
    let theme = typeof this.$route.query.theme !== 'undefined' ? this.$route.query.theme:''
    this.conditions[1].checked = theme.toString()
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

    clearTheme(data) {
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
      console.log(val)
      this.conditions.forEach(obj => {
        if (obj.key === val.name) {
          if (val.content.length !== 0) {
            obj.checked = `${val.content[0].id},${val.content[2].id}`
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

      this.ev += ``
      if (this.conditions[1].checked !== ``) {
        this.ev += `^theme=${this.conditions[1].checked}`
      }

      if (this.conditions[2].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[2].checked
          .split(',')
          .join('-')}`
      }
      this.research()
      console.log(this.ev)
    }
  }
}
