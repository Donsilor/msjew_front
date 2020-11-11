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
        // {
        //   type: 'eject-choose-pro',
        //   key: 'series',
        //   name: this.LANGUAGE.listCommons.series,
        //   checked: ``,
        //   options: []     //this.sendCod
        // },
        // {
        //   type: 'eject-choose-pro',
        //   key: 'style',
        //   name: this.LANGUAGE.listCommons.styles,
        //   checked: ``,
        //   options: this.CONDITION_INFO.style.ringStyles
        // },
        {
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.listCommons.material,
          checked: ``,
          options: this.sendCod
        },
        // {
        //   type: 'eject-choose-pro',
        //   key: 'mosaic',
        //   name: this.LANGUAGE.listCommons.mosaic,
        //   checked: ``,
        //   options: this.CONDITION_INFO.style.ringStyles
        // },
        // {
        //   type: 'eject-choose-pro',
        //   key: 'object',
        //   name: this.LANGUAGE.listCommons.object,
        //   checked: ``,
        //   options: this.CONDITION_INFO.style.ringStyles
        // },
        // {
        //   type: 'eject-choose-pro',
        //   key: 'style',
        //   name: this.LANGUAGE.listCommons.theme,
        //   checked: ``,
        //   options: this.CONDITION_INFO.style.theme
        // },
        {
          type: 'eject-choose',
          key: 'price-bar',
          name: this.LANGUAGE.listCommons.price,
          checked: (typeof this.$route.query.startPrice !== 'undefined' && typeof this.$route.query.endPrice !== 'undefined')  ? this.$route.query.startPrice + '-' + this.$route.query.endPrice:'',
          options: (typeof this.$route.query.startPrice !== 'undefined' && typeof this.$route.query.endPrice !== 'undefined')  ? [{id:this.$route.query.startPrice,name:Math.round(this.$route.query.startPrice/1000,2) + `K`},{id:this.$route.query.endPrice,name:Math.round(this.$route.query.endPrice/1000,2) + `K`}]:[]
        }
      ],
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content,
      isResetProgress: false,
      category : [4]
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
          this.categoryId = 8
          break
        case 3:
          this.categoryId = 9
          break
        case 4:
          this.categoryId = [6,22,23,24]
          break
        case 5:
          this.categoryId = 22
          break
        case 6:
          this.categoryId = 6
          break
        case 7:
          this.categoryId = 23
          break
        case 8:
          this.categoryId = 24
          break
        
      }
      let material = typeof this.$route.query.material !== 'undefined' ? this.$route.query.material:''
      this.conditions[0].options = JSON.parse(JSON.stringify(this.sendCod))
      this.conditions[0].checked = material.toString()
      // this.conditions[1].options = this.CONDITION_INFO.style.theme
      // this.conditions[1].checked = ``
      this.conditions[1].checked = ``
      this.conditions[1].options = []
      this.isResetProgress = true
      this.madeUpEv()
    },

    $route(val, oldVal) {
      
      let material = typeof this.$route.query.material !== 'undefined' ? this.$route.query.material:''
      let species = typeof this.$route.query.category !== 'undefined' ? this.$route.query.category:''
      console.log("this.0000000",typeof species,typeof [4,5])
      if(species == [4,5]){
        this.category = [4,5]
        console.log(9999999999999)
      }
      this.conditions[0].options = JSON.parse(JSON.stringify(this.sendCod))
      this.conditions[0].checked = material.toString()
      // this.conditions[1].options = this.CONDITION_INFO.style.theme
      // let theme = typeof this.$route.query.theme !== 'undefined' ? this.$route.query.theme:''
      // this.conditions[1].checked = theme.toString()
      this.conditions[1].checked = ``
      this.conditions[1].options = []
      this.isResetProgress = true
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
        this.categoryId = 8
        break
      case 3:
        this.categoryId = 9
        break
      case 4:
        this.categoryId = [6,22,23,24]
        break
      case 5:
        this.categoryId = 22
        break
      case 6:
        this.categoryId = 6
        break
      case 7:
        this.categoryId = 23
        break
      case 8:
        this.categoryId = 24
        break
      case -1:
        this.categoryId = this.category
        break
    }
    let material = typeof this.$route.query.material !== 'undefined' ? this.$route.query.material:''
    this.conditions[0].checked = material.toString()
    // let theme = typeof this.$route.query.theme !== 'undefined' ? this.$route.query.theme:''
    // this.conditions[1].checked = theme.toString()
    this.madeUpEv()
  },
  methods: {
    conditionText(info) {
      const result = []
      const checked = info.checked
      const options = info.options

      for (let n = 0, length = options.length; n < length; n++) {
        // if (checked.indexOf(options[n].id) > -1) {
        if (checked == options[n].id) {
          result.push(options[n].name)
        }
        // console.log("dddd",options[n].id,options[n].name)
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
   
    // 系列
    // clearSeries(data) {
    //   const conditions = JSON.parse(JSON.stringify(this.conditions))
    //   conditions[0].checked = this.getCheckedIds(data)
    //   this.conditions = conditions
    //   this.madeUpEv()
    // },

    // 风格
    // clearStyle(data) {
    //   const conditions = JSON.parse(JSON.stringify(this.conditions))
    //   conditions[1].checked = this.getCheckedIds(data)
    //   this.conditions = conditions
    //   this.madeUpEv()
    // },
    // 材质
    clearQuality(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[0].checked = this.getCheckedIds(data)
      this.conditions = conditions
      this.madeUpEv()
    },
    // 镶嵌方式
    // clearMosaic(data) {
    //   const conditions = JSON.parse(JSON.stringify(this.conditions))
    //   conditions[3].checked = this.getCheckedIds(data)
    //   this.conditions = conditions
    //   this.madeUpEv()
    // },
    // 送礼对象
    // clearObject(data) {
    //   const conditions = JSON.parse(JSON.stringify(this.conditions))
    //   conditions[4].checked = this.getCheckedIds(data)
    //   this.conditions = conditions
    //   this.madeUpEv()
    // },

    // clearTheme(data) {
    //   const conditions = JSON.parse(JSON.stringify(this.conditions))
    //   conditions[1].checked = this.getCheckedIds(data)
    //   this.conditions = conditions
    //   this.madeUpEv()
    // },
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

      // this.ev += ``
      // if (this.conditions[1].checked !== ``) {
      //   this.ev += `^theme=${this.conditions[1].checked}`
      // }

      if (this.conditions[1].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[1].checked
          .split(',')
          .join('-')}`
      }
      this.research()
      console.log(this.ev)
    }
  }
}
