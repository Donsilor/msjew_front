import PhoneJson from '@/assets/countrycode.json'
const lang = 'personal.index'
export default {
  name: 'address',
  data() {
    return {
      lang,
      country: { areaId: '', areaName: this.$t(`${lang}.select`) },
      countryList: [{ areaId: '', areaName: this.$t(`${lang}.select`) }],
      province: { areaId: '', areaName: '- - -' },
      provinceList: [{ areaId: '', areaName: '- - -' }],
      city: { areaId: '', areaName: '- - -' },
      cityList: [{ areaId: '', areaName: '- - -' }],
      phoneJson: PhoneJson,
      phoneNum: { cn: '', en: '', phone_code: '' }
    }
  },
  beforeMount() {
    this.getListOne()
    this.phoneNum = this.phoneJson[0]
  },
  methods: {
    getListOne() {
      this.$axios
        .get('/web/myAccount/listArea')
        .then(res => {
          // console.log('country===>', res)
          this.countryList = res
          this.countryList.unshift({
            areaId: '',
            areaName: this.$t(`${lang}.select`)
          })
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
        .get('/web/myAccount/listArea', {
          params: { areaId: this.country.areaId }
        })
        .then(res => {
          // console.log('province===>', res)
          if (res) {
            this.provinceList = res
            this.provinceList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            this.province = { areaId: '', areaName: this.$t(`${lang}.select`) }
            this.cityList = [{ areaId: '', areaName: '- - -' }]
            this.city = { areaId: '', areaName: '- - -' }
          } else {
            this.provinceList = [{ areaId: '', areaName: '- - -' }]
            this.province = { areaId: '', areaName: '- - -' }
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
    },
    getListThree() {
      if (this.province.areaId === '') {
        this.cityList = [{ areaId: '', areaName: '- - -' }]
        this.city = { areaId: '', areaName: '- - -' }
        return
      }
      this.$axios
        .get('/web/myAccount/listArea', {
          params: { areaId: this.province.areaId }
        })
        .then(res => {
          // console.log('city===>', res)
          if (res) {
            this.cityList = res
            this.cityList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            this.city = { areaId: '', areaName: this.$t(`${lang}.select`) }
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
    },
    async setAddress(obj) {
      // console.log(obj)
      let step = false
      this.country = { areaId: obj.countryId, areaName: obj.countryName }
      await this.$axios
        .get('/web/myAccount/listArea', {
          params: { areaId: obj.countryId }
        })
        .then(res => {
          // console.log(res)
          if (res) {
            // console.log('拿到了省份');
            this.provinceList = res
            this.provinceList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            if (obj.provinceId) {
              this.province = {
                areaId: obj.provinceId,
                areaName: obj.provinceName
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
        .get('/web/myAccount/listArea', {
          params: { areaId: obj.provinceId }
        })
        .then(res => {
          // console.log(res)
          if (res) {
            // console.log('拿到了城市');
            this.cityList = res
            this.cityList.unshift({
              areaId: '',
              areaName: this.$t(`${lang}.select`)
            })
            this.city = obj.cityId
              ? { areaId: obj.cityId, areaName: obj.cityName }
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
    }
  }
}
