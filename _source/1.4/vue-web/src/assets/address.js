import PhoneJson from '../assets/countrycode.json';
export default {
  name: 'address',
  data() {
    return {
      lang: this.$LANGUAGE.personal.index,
      country: {areaId: '', areaName: this.$LANGUAGE.personal.index.select},
      countryList: [{areaId: '', areaName: this.$LANGUAGE.personal.index.select}],
      province: {areaId: '', areaName: '- - -'},
      provinceList: [{areaId: '', areaName: '- - -'}],
      city: {areaId: '', areaName: '- - -'},
      cityList: [{areaId: '', areaName: '- - -'}],
      phoneJson: PhoneJson,
      phoneNum: {cn: '', en: '', phone_code: ''}
    };
  },
  beforeMount() {
    this.getListOne();
    this.phoneNum = this.phoneJson[0];
  },
  methods: {
    getListOne() {
      this.$axiosGet('/web/myAccount/listArea').then(res => {
        // console.log('country===>', res.data)
        this.countryList = res.data;
        this.countryList.unshift({areaId: '', areaName: this.lang.select});
      }).catch(err => {
        console.log(err);
      });
    },
    getListTwo() {
      if (this.country.areaId === '') {
        this.provinceList = [{areaId: '', areaName: '- - -'}];
        this.province = {areaId: '', areaName: '- - -'};
        this.cityList = [{areaId: '', areaName: '- - -'}];
        this.city = {areaId: '', areaName: '- - -'};
        return;
      }
      this.$axiosGet('/web/myAccount/listArea', {
        areaId: this.country.areaId
      }).then(res => {
        // console.log('province===>', res.data)
        if (res.data) {
          this.provinceList = res.data;
          this.provinceList.unshift({areaId: '', areaName: this.lang.select});
          this.province = {areaId: '', areaName: this.lang.select};
          this.cityList = [{areaId: '', areaName: '- - -'}];
          this.city = {areaId: '', areaName: '- - -'};
        } else {
          this.provinceList = [{areaId: '', areaName: '- - -'}];
          this.province = {areaId: '', areaName: '- - -'};
          this.cityList = [{areaId: '', areaName: '- - -'}];
          this.city = {areaId: '', areaName: '- - -'};
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getListThree() {
      if (this.province.areaId === '') {
        this.cityList = [{areaId: '', areaName: '- - -'}];
        this.city = {areaId: '', areaName: '- - -'};
        return;
      }
      this.$axiosGet('/web/myAccount/listArea', {
        areaId: this.province.areaId
      }).then(res => {
        // console.log('city===>', res.data)
        if (res.data) {
          this.cityList = res.data;
          this.cityList.unshift({areaId: '', areaName: this.lang.select});
          this.city = {areaId: '', areaName: this.lang.select};
        } else {
          this.cityList = [{areaId: '', areaName: '- - -'}];
          this.city = {areaId: '', areaName: '- - -'};
        }
      }).catch(err => {
        console.log(err);
      });
    },
    async setAddress(obj) {
      // console.log(obj)
      let step = false;
      this.country = {areaId: obj.countryId, areaName: obj.countryName};
      await this.$axiosGet('/web/myAccount/listArea', {
        areaId: obj.countryId
      }).then(res => {
        // console.log(res)
        if (res.data) {
          // console.log('拿到了省份');
          this.provinceList = res.data;
          this.provinceList.unshift({areaId: '', areaName: this.lang.select});
          if (obj.provinceId) {
            this.province = {areaId: obj.provinceId, areaName: obj.provinceName};
          } else {
            this.province = this.provinceList[0];
            this.cityList = [{areaId: '', areaName: '- - -'}];
            this.city = {areaId: '', areaName: '- - -'};
            step = true;
          }
        } else {
          this.provinceList = [{areaId: '', areaName: '- - -'}];
          this.province = {areaId: '', areaName: '- - -'};
          this.cityList = [{areaId: '', areaName: '- - -'}];
          this.city = {areaId: '', areaName: '- - -'};
          step = true;
        }
      }).catch(err => {
        console.log(err);
      });
      if (step) return false;
      await this.$axiosGet('/web/myAccount/listArea', {
        areaId: obj.provinceId
      }).then(res => {
        // console.log(res)
        if (res.data) {
          // console.log('拿到了城市');
          this.cityList = res.data;
          this.cityList.unshift({areaId: '', areaName: this.lang.select});
          this.city = obj.cityId ? {areaId: obj.cityId, areaName: obj.cityName} : this.cityList[0];
        } else {
          this.cityList = [{areaId: '', areaName: '- - -'}];
          this.city = {areaId: '', areaName: '- - -'};
        }
      }).catch(err => {
        console.log(err);
      });
      return false;
    },
    resetAddress() {
      this.country = {areaId: '', areaName: this.lang.select};
      this.province = {areaId: '', areaName: '- - -'};
      this.provinceList = [{areaId: '', areaName: '- - -'}];
      this.city = {areaId: '', areaName: '- - -'};
      this.cityList = [{areaId: '', areaName: '- - -'}];
    }
  }
};
