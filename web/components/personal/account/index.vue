<template>
  <div class="account">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.base`) }}</div>
    </div>
    <div class="base-info">
      <div class="base-info-line">
        <div class="base-info-line-title">{{ $t(`${lang}.email`) }}</div>
        <div class="base-info-line-content">{{ userInfo.account }}</div>
      </div>
      <div class="base-info-line">
        <input
          v-model="userInfo.surname"
          class="base-name-input"
          :placeholder="$t(`${lang}.lastName`)"
          type="text"
        />
        <input
          v-model="userInfo.name"
          class="base-name-input"
          :placeholder="$t(`${lang}.firstName`)"
          type="text"
        />
      </div>
      <div class="base-info-line">
        <div class="base-info-line-title">{{ $t(`${lang}.sex`) }}：</div>
        <div class="base-info-line-content gender-choose">
          <div class="single-radio">
            <input
              :checked="userInfo.gender === 1"
              type="radio"
              @click="userInfo.gender = 1"
            />
            <span @click="userInfo.gender = 1">{{ $t(`${lang}.male`) }}</span>
          </div>
          <div class="single-radio">
            <input
              :checked="userInfo.gender === 2"
              type="radio"
              @click="userInfo.gender = 2"
            />
            <span @click="userInfo.gender = 2">{{ $t(`${lang}.female`) }}</span>
          </div>
          <div class="single-radio">
            <input
              :checked="userInfo.gender === 0"
              type="radio"
              @click="userInfo.gender = 0"
            />
            <span @click="userInfo.gender = 3">{{ $t(`${lang}.secret`) }}</span>
          </div>
        </div>
      </div>
      <div class="base-info-line">
        <div class="base-info-line-title">{{ $t(`${lang}.marriage`) }}：</div>
        <div class="base-info-line-content marriage-choose">
          <div class="single-radio">
            <input
              :checked="userInfo.marStatus === 0"
              type="radio"
              @click="userInfo.marStatus = 0"
            />
            <span @click="userInfo.marStatus = 0">{{
              $t(`${lang}.married`)
            }}</span>
          </div>
          <div class="single-radio">
            <input
              :checked="userInfo.marStatus === 1"
              type="radio"
              @click="userInfo.marStatus = 1"
            />
            <span @click="userInfo.marStatus = 1">{{
              $t(`${lang}.unmarried`)
            }}</span>
          </div>
        </div>
      </div>
      <div class="base-info-line">
        <div class="base-info-line-title">{{ $t(`${lang}.birthday`) }}：</div>
        <div class="base-info-line-content birthday-choose">
          <div class="single-radio">
            <span>{{ $t(`${lang}.year`) }}</span
            ><span>{{ year }}</span
            ><i class="iconfont iconxiala" />
            <select v-if="!userInfo.birthday" v-model="year" @change="doYear()">
              <option v-for="(y, index) in years" :key="index" :value="y">{{
                y
              }}</option>
            </select>
            <div class="once-tell">{{ $t(`${lang}.msg`) }}</div>
          </div>
          <div class="single-radio">
            <span>{{ $t(`${lang}.month`) }}</span
            ><span>{{ month }}</span
            ><i class="iconfont iconxiala" />
            <select
              v-if="!userInfo.birthday"
              v-model="month"
              @change="doMonth()"
            >
              <option v-for="(m, index) in months" :key="index" :value="m">{{
                m
              }}</option>
            </select>
          </div>
          <div class="single-radio">
            <span>{{ $t(`${lang}.day`) }}</span
            ><span>{{ day }}</span
            ><i class="iconfont iconxiala" />
            <select v-if="!userInfo.birthday" v-model="day">
              <option v-for="(d, index) in days" :key="index" :value="d">{{
                d
              }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="base-btn" @click="saveInfo()">{{ $t(`${lang}.save`) }}</div>
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.link`) }}</div>
    </div>
    <div class="bind-info">
      <div class="bind-info-line">
        <div class="bind-info-title">{{ $t(`${lang}.faceLook`) }}</div>
        <div class="bind-info-content">
          <img
            v-show="!userInfo.facebookAccount"
            class="bind-img"
            src="../../../static/personal/account/facelook.png"
            alt=""
          />
          <div v-show="!userInfo.facebookAccount" class="bind-input-box">
            <input v-model="fbEmail" type="text" class="bind-input" />
            <span class="bind-input-span" @click="checkEmail(fbEmail, 2)">{{
              $t(`${lang}.bind`)
            }}</span>
          </div>
          <div v-show="userInfo.facebookAccount" class="bind-btn">
            <div>{{ showFacebookAccount }}&nbsp;</div>
            <div class="bind-status">{{ $t(`${lang}.alreadyBind`) }}</div>
          </div>
        </div>
      </div>
      <div class="bind-info-line">
        <div class="bind-info-title">{{ $t(`${lang}.google`) }}</div>
        <div class="bind-info-content">
          <img
            v-show="!userInfo.googleAccount"
            class="bind-img"
            src="../../../static/personal/account/google.png"
            alt=""
          />
          <div v-show="!userInfo.googleAccount" class="bind-input-box">
            <input v-model="ggMail" type="text" class="bind-input" />
            <span class="bind-input-span" @click="checkEmail(ggMail, 1)">{{
              $t(`${lang}.bind`)
            }}</span>
          </div>
          <div v-show="userInfo.googleAccount" class="bind-btn">
            <div>{{ showGoogleAccount }}&nbsp;</div>
            <div class="bind-status">{{ $t(`${lang}.alreadyBind`) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Email } from '@/assets/js/require-lee.js'
const lang = 'personal.account'
export default {
  name: 'Index',
  data() {
    return {
      lang,
      userInfo: {
        account: `akm`,
        surname: ``,
        name: ``,
        gender: 0,
        marStatus: 1,
        birthday: ``,
        facebookAccount: ``,
        googleAccount: ``
      },
      year: new Date().getFullYear(),
      years: [],
      month: '',
      months: [],
      day: '',
      days: [],
      fbEmail: ``,
      ggMail: ``,
      isBirthday: false
    }
  },
  computed: {
    showFacebookAccount() {
      const hidenLength = 4
      let result = this.userInfo.facebookAccount
      if ([undefined, null].includes(result)) {
        return result
      }
      if (result.length < hidenLength + 1) {
        let newstr = ''
        for (let n = 0; n < result.length; n++) {
          newstr += '*'
        }
        result = newstr
      } else {
        const start = Math.floor((result.length - hidenLength) / 2)
        const end = start + hidenLength
        result =
          result.slice(0, start) +
          new Array(hidenLength).fill('*').join('') +
          result.slice(end, result.length)
      }
      return result
    },
    showGoogleAccount() {
      const hidenLength = 4
      let result = this.userInfo.googleAccount
      if ([undefined, null].includes(result)) {
        return result
      }
      if (result.length < hidenLength + 1) {
        let newstr = ''
        for (let n = 0; n < result.length; n++) {
          newstr += '*'
        }
        result = newstr
      } else {
        const start = Math.floor((result.length - hidenLength) / 2)
        const end = start + hidenLength
        result =
          result.slice(0, start) +
          new Array(hidenLength).fill('*').join('') +
          result.slice(end, result.length)
      }
      return result
    }
  },
  beforeMount() {
    this.getUserInfo()
    const year = new Date().getFullYear() - 1900
    for (let i = 0; i <= year; i++) {
      this.years.push(i + 1900)
    }
    for (let i = 0; i < 12; i++) {
      i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1)
    }
    this.month = this.months[0]
    for (let i = 0; i < 31; i++) {
      i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
    }
    this.day = this.days[0]
  },
  methods: {
    doYear() {
      const nowy = new Date().getFullYear()
      const nowm = new Date().getMonth()
      const thisYear = parseInt(this.year) === parseInt(nowy)
      if (this.months.length !== 12) {
        this.months = []
        for (let i = 0; i < 12; i++) {
          i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1)
        }
      }
      if (thisYear) {
        this.months = []
        for (let i = 0; i <= nowm; i++) {
          i < 9 ? this.months.push('0' + (i + 1)) : this.months.push(i + 1)
        }
        this.month = this.months[0]
        this.days = []
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      } else {
        this.month = this.months[0]
        this.days = []
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      }
    },
    doMonth() {
      const nowy = new Date().getFullYear()
      const nowm = new Date().getMonth()
      const nowd = new Date().getDate()
      const thisYear = parseInt(this.year) === parseInt(nowy)
      const thisMonth = parseInt(this.month) === parseInt(nowm) + 1
      const monthBig = [1, 3, 5, 7, 8, 10, 12]
      const monthSmall = [4, 6, 9, 11]
      if (thisYear && thisMonth) {
        console.log(1)
        this.days = []
        for (let i = 0; i < nowd; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      } else if (monthBig.includes(parseInt(this.month))) {
        this.days = []
        for (let i = 0; i < 31; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      } else if (monthSmall.includes(parseInt(this.month))) {
        this.days = []
        for (let i = 0; i < 30; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      } else if (parseInt(this.year) % 4 === 0) {
        this.days = []
        for (let i = 0; i < 29; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      } else {
        this.days = []
        for (let i = 0; i < 28; i++) {
          i < 9 ? this.days.push('0' + (i + 1)) : this.days.push(i + 1)
        }
        this.day = this.days[0]
      }
    },
    getUserInfo() {
      this.$axios
        .get('/web/user/me')
        .then(res => {
          console.log(res)
          this.userInfo = res
          this.loading = false
          if (this.userInfo.birthday) {
            this.year = moment(this.userInfo.birthday).format('YYYY')
            this.month = moment(this.userInfo.birthday).format('MM')
            this.day = moment(this.userInfo.birthday).format('DD')
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
    saveInfo() {
      if (this.userInfo.surname === '' || this.userInfo.surname.length > 20) {
        this.$message.error(this.$t(`${lang}.name1`))
        return
      }
      if (this.userInfo.name === '' || this.userInfo.name.length > 20) {
        this.$message.error(this.$t(`${lang}.name1`))
        return
      }
      this.userInfo.birthday = moment(
        this.year + '-' + this.month + '-' + this.day
      ).format('x')
      this.$axios
        .post('/web/myAccount/updateBaseUserInfo', {
          surname: this.userInfo.surname,
          name: this.userInfo.name,
          revEmail: this.userInfo.revEmail,
          gender: this.userInfo.gender,
          marStatus: this.userInfo.marStatus,
          birthday: this.userInfo.birthday
        })
        .then(res => {
          console.log(res)
          this.$message({
            message: this.$t(`${lang}.success`),
            type: 'success'
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
    checkEmail(e, type) {
      if (!Email.test(e)) {
        this.$message.error(this.$t(`${lang}.emailGood`))
        return
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ email: e, type })),
        false
      )
      this.$axios
        .post('/web/myAccount/bindEmail', data)
        .then(res => {
          this.$message({
            message: this.lang.bindSuccess,
            type: 'success'
          })
          if (type === 1) {
            this.userInfo.googleAccount = e
          } else if (type === 2) {
            this.userInfo.facebookAccount = e
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.account {
  width: 100%;
  padding: 30px 0;
  .pink-title {
    display: flex;
    align-items: center;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 28px;
    }
  }
  .base-info {
    padding: 40px 28px;
    .base-info-line {
      display: flex;
      font-size: 14px;
      color: #333;
      margin-bottom: 30px;
      .base-info-line-title {
        width: 110px;
        margin-right: 20px;
      }
      .base-name-input {
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
      .gender-choose,
      .marriage-choose {
        display: flex;
        align-items: center;
        .single-radio {
          width: 120px;
          input[type='radio'] {
            width: 14px;
            height: 14px;
            margin-right: 10px;
            -webkit-appearance: radio;
          }
          span {
            cursor: pointer;
          }
        }
      }
      .birthday-choose {
        display: flex;
        align-items: center;
        .single-radio {
          width: 120px;
          position: relative;
          margin-right: 30px;
          border-bottom: 1px solid rgba(153, 153, 153, 1);
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
    }
  }
  .base-btn {
    width: 190px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #8b766c;
    color: #8b766c;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-left: 28px;
    margin-bottom: 50px;
  }
  .bind-info {
    padding: 40px 28px;
    .bind-info-title {
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 20px;
    }
    .bind-info-content {
      .bind-img {
        display: block;
        width: 130px;
        height: 36px;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .bind-input-box {
        font-size: 16px;
        color: #666;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        .bind-input {
          width: 250px;
          height: 30px;
          line-height: 30px;
          -webkit-appearance: none;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 1px solid #666;
          outline: 0;
          margin-right: 10px;
        }
        .bind-input-span {
          cursor: pointer;
        }
      }
      .bind-btn {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        margin-bottom: 30px;
        .bind-status {
          margin-right: 18px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
