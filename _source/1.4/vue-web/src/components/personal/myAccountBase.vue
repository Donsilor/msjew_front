<template>
  <div
    v-loading="loading"
    class="mab">
    <div class="email-addr">
      <div class="margin-right-20">{{ lang.email }}</div>
      <div>{{ userInfo.account }}</div>
    </div>
    <div class="user-name">
      <input
        v-model="userInfo.surname"
        :placeholder="lang.lastName"
        type="text">
      <input
        v-model="userInfo.name"
        :placeholder="lang.firstName"
        type="text">
    </div>
    <div
      v-show="false"
      class="user-radio-box">
      <div class="radio-title">
        {{ lang.bookEmail }}
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.revEmail===1"
          type="radio"
          @click="userInfo.revEmail = 1">
        <span @click="userInfo.revEmail = 1">{{ lang.yes }}</span>
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.revEmail===2"
          type="radio"
          @click="userInfo.revEmail = 2">
        <span @click="userInfo.revEmail = 2">{{ lang.no }}</span>
      </div>
    </div>
    <div class="user-radio-box">
      <div class="radio-title">
        {{ lang.sex }}
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.gender===1"
          type="radio"
          @click="userInfo.gender = 1">
        <span @click="userInfo.gender = 1">{{ lang.male }}</span>
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.gender===2"
          type="radio"
          @click="userInfo.gender = 2">
        <span @click="userInfo.gender = 2">{{ lang.female }}</span>
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.gender===0"
          type="radio"
          @click="userInfo.gender = 0">
        <span @click="userInfo.gender = 3">{{ lang.secret }}</span>
      </div>
    </div>
    <div class="user-radio-box">
      <div class="radio-title">
        {{ lang.marriage }}
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.marStatus===0"
          type="radio"
          @click="userInfo.marStatus = 0">
        <span @click="userInfo.marStatus = 0">{{ lang.married }}</span>
      </div>
      <div class="single-radio">
        <input
          :checked="userInfo.marStatus===1"
          type="radio"
          @click="userInfo.marStatus = 1">
        <span @click="userInfo.marStatus = 1">{{ lang.unmarried }}</span>
      </div>
    </div>
    <div
      id="bDay"
      class="user-radio-box">
      <div class="radio-title">
        {{ lang.birthday }}
      </div>
      <div class="single-radio">
        <span>{{ lang.year }}</span><span>{{ year }}</span><i class="iconfont iconxiala"/>
        <select
          v-if="!userInfo.birthday"
          v-model="year"
          @change="doYear()">
          <option
            v-for="(y,index) in years"
            :value="y"
            :key="index">{{ y }}</option>
        </select>
        <div class="once-tell">{{ lang.msg }}</div>
      </div>
      <div class="single-radio">
        <span>{{ lang.month }}</span><span>{{ month }}</span><i class="iconfont iconxiala"/>
        <select
          v-if="!userInfo.birthday"
          v-model="month"
          @change="doMonth()">
          <option
            v-for="(m,index) in months"
            :value="m"
            :key="index">{{ m }}</option>
        </select>
      </div>
      <div class="single-radio">
        <span>{{ lang.day }}</span><span>{{ day }}</span><i class="iconfont iconxiala"/>
        <select
          v-if="!userInfo.birthday"
          v-model="day">
          <option
            v-for="(d,index) in days"
            :value="d"
            :key="index">{{ d }}</option>
        </select>
      </div>
    </div>
    <div
      class="user-btn"
      @click="saveInfo()">{{ lang.save }}</div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'MyAccountBase',
  data() {
    return {
      lang: this.$LANGUAGE.personal.account,
      year: '',
      years: [],
      month: '',
      months: [],
      day: '',
      days: [],
      userInfo: {},
      loading: true
    };
  },
  beforeMount() {
    this.getUserInfo();
    const year = parseInt(new Date().getFullYear() - 1900);
    for (let i = 0; i <= year; i++) {
      this.years.push(i + 1900);
    }
    for (let i = 0; i < 12; i++) {
      i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1);
    }
    this.month = this.months[0];
    for (let i = 0; i < 31; i++) {
      i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
    }
    this.day = this.days[0];
  },
  methods: {
    getUserInfo() {
      this.$axiosGet('/web/user/me').then(res => {
        // console.log(res)
        if (res.data) {
          this.userInfo = res.data;
          this.loading = false;
          if (this.userInfo.birthday) {
            this.year = moment(this.userInfo.birthday).format('YYYY');
            this.month = moment(this.userInfo.birthday).format('MM');
            this.day = moment(this.userInfo.birthday).format('DD');
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    saveInfo() {
      if (this.userInfo.surname === '' || this.userInfo.surname.length > 20) {
        this.$message.error(this.lang.name1);
        return;
      }
      if (this.userInfo.name === '' || this.userInfo.name.length > 20) {
        this.$message.error(this.lang.name1);
        return;
      }
      this.userInfo.birthday = moment(this.year + '-' + this.month + '-' + this.day).format('x');
      this.$postJsonRequest('/web/myAccount/updateBaseUserInfo', {
        surname: this.userInfo.surname,
        name: this.userInfo.name,
        revEmail: this.userInfo.revEmail,
        gender: this.userInfo.gender,
        marStatus: this.userInfo.marStatus,
        birthday: this.userInfo.birthday
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            message: this.lang.success,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.data);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    doYear() {
      const nowy = new Date().getFullYear();
      const nowm = new Date().getMonth();
      const thisYear = parseInt(this.year) === parseInt(nowy);
      if (this.months.length !== 12) {
        this.months = [];
        for (let i = 0; i < 12; i++) {
          i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1);
        }
      }
      if (thisYear) {
        this.months = [];
        for (let i = 0; i <= nowm; i++) {
          i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1);
        }
        this.month = this.months[0];
        this.days = [];
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
        }
        this.day = this.days[0];
      } else {
        this.month = this.months[0];
        this.days = [];
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
        }
        this.day = this.days[0];
      }
    },
    doMonth() {
      const nowy = new Date().getFullYear();
      const nowm = new Date().getMonth();
      const nowd = new Date().getDate();
      const thisYear = parseInt(this.year) === parseInt(nowy);
      const thisMonth = parseInt(this.month) === parseInt(nowm) + 1;
      const monthBig = [1, 3, 5, 7, 8, 10, 12];
      const monthSmall = [4, 6, 9, 11];
      if (thisYear && thisMonth) {
        console.log(1);
        this.days = [];
        for (let i = 0; i < nowd; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
        }
        this.day = this.days[0];
      } else if (monthBig.includes(parseInt(this.month))) {
        this.days = [];
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
        }
        this.day = this.days[0];
      } else if (monthSmall.includes(parseInt(this.month))) {
        this.days = [];
        for (let i = 0; i < 30; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
        }
        this.day = this.days[0];
      } else {
        if (parseInt(this.year) % 4 === 0) {
          this.days = [];
          for (let i = 0; i < 29; i++) {
            i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
          }
          this.day = this.days[0];
        } else {
          this.days = [];
          for (let i = 0; i < 28; i++) {
            i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1);
          }
          this.day = this.days[0];
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.mab {
  .email-addr {
    display: flex;
    font-size: 14px;
    color: #333;
    margin-bottom: 30px;
  }
  .user-name {
    display: flex;
    height: 42px;
    margin-bottom: 28px;
    input {
      display: block;
      width: 190px;
      height: 41px;
      line-height: 41px;
      -webkit-appearance: none;
      outline: 0;
      padding: 0;
      margin: 0 27px 0 0;
      border: 0;
      border-bottom: 1px solid #999;
      color: #999;
      font-size: 14px;
    }
  }
  .user-radio-box {
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: 30px;
    .radio-title {
      width: 107px;
    }
    .single-radio {
      width: 120px;
      input[type=radio] {
        width: 14px;
        height: 14px;
        margin-right: 10px;
      }
      span {
        cursor: pointer;
      }
    }
  }
  #bDay {
    margin-bottom: 60px;
    .single-radio {
      position: relative;
      margin-right: 30px;
      border-bottom: 1px solid rgba(153,153,153,1);
      font-size: 14px;
      color: #333;
      span:nth-child(1) {
        display: inline-block;
      }
      span:nth-child(2) {
        width: 50px;
        display: inline-block;
        text-align: center;
        color: #999;
        font-size: 14px;
      }
      .iconxiala {
        position: absolute;
        font-size: 12px;
        width: 12px;
        height: 12px;
        line-height: 12px;
        display: block;
        color: #999;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      select {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .once-tell {
        /*width: max-content;*/
        white-space: nowrap;
        position: absolute;
        left: 0;
        bottom: -10px;
        transform: translateY(100%);
        font-size: 12px;
        color: #999;
      }
    }
  }
  .user-btn {
    width: 190px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #8B766C;
    color: #8B766C;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 50px;
  }
}
</style>
