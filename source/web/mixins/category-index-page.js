export default {
  data() {
    return {
      ad: [],
      webSite: [],
      bannerHeight: 0
    }
  },
  computed: {
    banner() {
      const ad = JSON.parse(
        JSON.stringify(this.ad && this.ad[0] ? this.ad[0] : [])
      )

      console.log(ad)

      let result = []
      if (ad.advertImgModelList && ad.advertImgModelList.length > 0) {
        result = ad.advertImgModelList
        for (let n = 0, length = result.length; n < length; n++) {
          result[n].openType = ad.tdOpenType
          result[n].image = this.completionImageStr(result[n].image)
          result[n].isOutUrl = result[n].addres.includes('http')
          result[n].url = result[n].addres
        }
      } else {
        result.push({
          openType: ad.tdOpenType,
          image: this.completionImageStr(ad.dsImg),
          url: ''
        })
      }
      return result
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.screenResize()
      window.onresize = _this.screenResize
    })
  },
  beforeDestroy() {
    window.onresize = () => {}
  },
  methods: {
    // 页面尺寸改变时触发重新计算
    screenResize() {
      this.resetBannerSize()
    },
    // 重新计算banner高度
    resetBannerSize() {
      const _this = this
      if (_this.banner[0] && _this.banner[0].image) {
        const image = new Image()
        image.src = _this.banner[0].image
        image.onload = result => {
          console.log(image.width, image.height)
          _this.bannerHeight =
            (document.body.clientWidth * image.height) / image.width
        }
      }
    }
  }
}
