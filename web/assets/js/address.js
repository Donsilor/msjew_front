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
      phoneNum: { cn: '', en: '', zh: '', phone_code: '' },
      isLogin:this.$store.getters.hadLogin
    }
  },
  beforeMount() {
    this.defaultAddress()
    this.getListTwo()
    this.getListOne()
  },
  methods: {
    defaultAddress() {
      var len = this.$store.state.language,childLen='cn';
      if(len == 'zh_CN'){
        childLen = 'cn'
      }else if(len == 'zh_TW'){
        childLen = 'zh'
      }else if(len == 'en_US'){
        childLen = 'en'
      }
  
      if(this.$store.state.platform == '20'){
        this.country={areaId:'7',areaName: this.phoneJson[1][childLen]}
        this.countryList=[{ areaId:'7',areaName: this.phoneJson[1][childLen]}]
        this.phoneNum = this.phoneJson[1]
      }else if(this.$store.state.platform == '10'){
        this.country={areaId:'279',areaName: this.phoneJson[0][childLen]}
        this.countryList=[{ areaId:'279',areaName: this.phoneJson[0][childLen]}]
        this.phoneNum = this.phoneJson[0]
      }else if(this.$store.state.platform == '30'){
        this.country={areaId:'140',areaName: this.phoneJson[219][childLen]}
        this.countryList=[{ areaId:'140',areaName: this.phoneJson[219][childLen]}]
        this.phoneNum = this.phoneJson[219]
      }else if(this.$store.state.platform == '40'){
        this.country={areaId:'278',areaName: this.phoneJson[3][childLen]}
        this.countryList=[{ areaId:'278',areaName: this.phoneJson[3][childLen]}]
        this.phoneNum = this.phoneJson[3]
      }
    },
    getListOne() {
      this.$axios
        .get('/web/common/area')
        .then(res => {
            this.countryList = res.data
            // this.countryList.unshift({
            //   areaId: '',
            //   areaName: this.$t(`${lang}.select`)
            // })

            // console.log('country===>', res)

            if(this.country.areaId){
              for(var i=0; i<res.data.length; i++){
                if(res.data[i].areaId == this.country.areaId){
                  this.country={areaId: res.data[i].areaId,areaName: res.data[i].areaName}
                  // this.countryList=[{ areaId: res.data[i].areaId,areaName: res.data[i].areaName}]
                }
              }
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
            if(this.isLogin){
              this.cityList.unshift({
                areaId: '',
                areaName: '- - -'
              })
            } else {
              this.cityList.unshift({
                areaId: '0',
                areaName: '- - -'
              })
            }
            
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

      this.defaultAddress()
      this.getListTwo()
    }
  }
}
