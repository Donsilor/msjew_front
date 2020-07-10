export default {
  data() {
    return {
      ad: []
    }
  },
  computed: {
    banner() {
      const ad = JSON.parse(
        JSON.stringify(this.ad  ? this.ad : [])
      )

      let result = []

      if(ad && ad.length > 0){
        result = ad
      }else{
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
      }

      return result
    }
  }
}
