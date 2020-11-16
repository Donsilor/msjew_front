import PhoneJson from '@/assets/countrycode.json'
const lang = 'personal.index'
export default {
  name: 'address',
  data() {
    return {
      lang,
      country: { areaId: '', areaName: this.$t(`${lang}.select`)},
      countryList: [{ areaId: '', areaName: this.$t(`${lang}.select`) }],
      province: { areaId: '', areaName: '- - -' },
      provinceList: [{ areaId: '', areaName: '- - -' }],
      city: { areaId: '', areaName: '- - -' },
      cityList: [{ areaId: '', areaName: '- - -' }],
      phoneJson: PhoneJson,
      phoneNum: { cn: '', en: '', zh: '', phone_code: '' }
    }
  },
  beforeMount() {
    if(this.$store.state.language === 'zh_CN'){
      this.country={areaId:'7',areaName: '中国'}
      this.countryList=[{ areaId:'7',areaName: '中国'}]
      // this.getListTwo()
    }
    this.getListOne()
    
    // this.phoneNum = this.phoneJson[0]
  
    if (this.$store.state.language === 'en_US' || this.$store.state.language === 'zh_TW') {
      return this.phoneNum = this.phoneJson[0]
    }else if(this.$store.state.language === 'zh_CN'){
      return this.phoneNum = this.phoneJson[1]
    }
  },
  methods: {
    getListOne() {
      this.$axios
        .get('/web/common/area')
        .then(res => {
            this.countryList = res.data
            // this.countryList.unshift({
            //   areaId: '',
            //   areaName: this.$t(`${lang}.select`)
            // })

            
            // console.log('country===>', res.countryList.areaName) 
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    getListTwo() {
      if (this.country.areaId === '') {
        this.provinceList = [{ areaId: '', areaName: '- - -' }]
        this.province = { areaId: '', areaName: '- - -' }
        this.cityList = [{ areaId: '', areaName: '- - -' }]
        this.city = { areaId: '', areaName: '- - -' }
        return
      }
      this.$axios
        .get('/web/common/area', {
          params: { pid: this.country.areaId }
        })
        .then(res => {
          // console.log('省份=====>', res)
          if (!res.data.length==0) {
            this.provinceList = res.data
            this.provinceList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            this.province = { areaId: '', areaName: this.$t(`${lang}.select`) }
            this.cityList = [{ areaId: '', areaName: '- - -' }]
            this.city = { areaId: '', areaName: '- - -' }
          } else {
            this.provinceList = [{ areaId: '0', areaName: '- - -' }]
            this.province = { areaId: '0', areaName: '- - -' }
            this.cityList = [{ areaId: '0', areaName: '- - -' }]
            this.city = { areaId: '0', areaName: '- - -' }
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    getListThree() {
      if (this.province.areaId == '') {
        this.cityList = [{ areaId: '', areaName: '- - -' }]
        this.city = { areaId: '', areaName: '- - -' }
        return 
      }
      this.$axios
        .get('/web/common/area', {
          params: { pid:this.province.areaId }
        })
        .then(res => {
          // console.log('城市===>',res)
          // console.log('城市===>qqq',res.data.length)
          if (!res.data.length==0){
            this.cityList = res.data
            this.cityList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            this.city = { areaId: '', areaName: this.$t(`${lang}.select`) }
          } else {
            this.cityList = [{ areaId: '0', areaName: '- - -' }]
            this.city = { areaId: '0', areaName: '- - -' }
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    async setAddress(obj) {
      let step = false
      this.country = {areaId: obj.country_id, areaName: obj.country_name }
      await this.$axios
        .get('/web/common/area', {
          params: { pid: obj.country_id }
        })
        .then(res => {
          // console.log('拿到了省份',res);
          if (res) {
            this.provinceList = res.data
            this.provinceList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            if (obj.province_id) {
              this.province = {
                areaId: obj.province_id,
                areaName: obj.province_name
              }
            } else {
              this.province = this.provinceList[0]
              this.cityList = [{ areaId: '', areaName: '- - -' }]
              this.city = { areaId: '', areaName: '- - -' }
              step = true
            }
          } else {
            this.provinceList = [{ areaId: '', areaName: '- - -' }]
            this.province = { areaId: '', areaName: '- - -' }
            this.cityList = [{ areaId: '', areaName: '- - -' }]
            this.city = { areaId: '', areaName: '- - -' }
            step = true
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
      if (step) return false
      await this.$axios
        .get('/web/common/area', {
          params: { pid: obj.province_id }
        })
        .then(res => {
          if (res) {
            // console.log('拿到了城市',res);
            this.cityList = res.data
            this.cityList.unshift({
              areaId: '',
              areaName: '- - -'
            })
            this.city = obj.city_id
              ? { areaId: obj.city_id, areaName: obj.city_name }
              : this.cityList[0]
          } else {
            this.cityList = [{ areaId: '', areaName: '- - -' }]
            this.city = { areaId: '', areaName: '- - -' }
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
      return false
    },
    resetAddress() {
      this.country = { areaId: '', areaName: this.$t(`${lang}.select`) }
      this.province = { areaId: '', areaName: '- - -' }
      this.provinceList = [{ areaId: '', areaName: '- - -' }]
      this.city = { areaId: '', areaName: '- - -' }
      this.cityList = [{ areaId: '', areaName: '- - -' }]

      if(this.$store.state.language === 'zh_CN'){
        this.country={areaId:'7',areaName: '中国'}
        // this.countryList=[{ areaId:'7',areaName: '中国'}]
        this.getListTwo()
      }
    }
  }
}
