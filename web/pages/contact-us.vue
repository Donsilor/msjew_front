<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <section class="our-info">
        <div class="map">
          <img src="/content-us/map.png" />
        </div>
        <dl class="info">
          <dd class="item">
            <div class="dd-icon">
              <i class="iconfont iconphone" />
            </div>
            <div class="dd-content">
              <h2 class="dd-title">{{ $t(`${lang}.callToUs`) }}</h2>
              <p class="dd-desc">
                {{ $t(`${lang}.welcomeYourTel`) }}：（852）2165 3905
              </p>
              <p class="dd-desc">
                {{ $t(`${lang}.welcomeYourTelTip`) }}
              </p>
            </div>
          </dd>
          <dd class="item">
            <div class="dd-icon">
              <i class="iconfont iconyouxiang" />
            </div>
            <div class="dd-content">
              <h2 class="dd-title">{{ $t(`${lang}.emailToUs`) }}</h2>
              <p class="dd-desc">
                <a href="mailto:service@bddco.com">service@bddco.com</a>；{{
                  $t(`${lang}.allQuestionWillBeDeal`)
                }}
              </p>
            </div>
          </dd>
          <!-- <dd class="item">
            <div class="dd-icon">
              <i class="iconfont icondizhi" />
            </div>
            <div class="dd-content">
              <h2 class="dd-title">{{ $t(`${lang}.ourAddress`) }}</h2>
              <p class="dd-desc">
                {{ $t(`${lang}.addressDetail`) }}
              </p>
            </div>
          </dd> -->
        </dl>
      </section>
      <!-- <div class="title">{{ $t(`${lang}.book`) }}</div> -->
      <!-- <section v-show="!isSuccessful" class="reservation">
        <div class="reservation-content">
          <div class="row-line">
            <div class="input">
              <input
                v-model="info.last_name"
                :placeholder="'*' + $t(`${lang}.name`)"
                maxlength="20"
              />
            </div>
            <div class="input">
              <input
                v-model="info.first_name"
                :placeholder="'*' + $t(`${lang}.surname`)"
                maxlength="20"
              />
            </div>
          </div>
          <div class="row-line">
            <div class="select country-code">
              <div
                :class="['select-text', { active: checkedPhoneCodeInfo.value }]"
              >
                {{ checkedPhoneCodeInfo.name }} {{ checkedPhoneCodeInfo.value }}
              </div>
              <i class="iconfont iconxiala" />
              <select v-model="info.mobile_code">
                <option
                  v-for="(item, index) in countryPhoneCodeOptions"
                  :key="index"
                  :value="item.value"
                  >{{ item.name }} {{ item.value }}</option
                >
              </select>
            </div>
            <div class="input">
              <input
                v-model="info.telphone"
                :placeholder="'*' + $t(`${lang}.tel`)"
              />
            </div>
          </div>
          <div class="row-line">
            <div class="date-input-el">
              <div :class="['date-text', { active: info.book_date }]">
                {{
                  info.book_date ? info.book_date : '*' + $t(`${lang}.bookDate`)
                }}
              </div>
              <i class="iconfont iconriqi" />
              <div class="date-input">
                <el-date-picker
                  v-model="info.book_date"
                  :clearable="false"
                  :picker-options="pickerOptions"
                  style="width: 100%;"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="setBookDate"
                />
              </div>
            </div>
            <div class="select date-input-el">
              <div :class="['select-text', { active: info.book_time }]">
                {{
                  info.book_time ? info.book_time : '*' + $t(`${lang}.bookTime`)
                }}
              </div>
              <i class="iconfont iconxiala" />
              <select v-model="info.book_time" >
                <option
                  v-for="(option, index) in bookTimeOptions"
                  :key="index"
                  :value="option.value"
                  >{{ option.value }}</option
                >
              </select>
            </div>
          </div>
          <div class="radio-line">
            <div
              v-for="(each, index) in ringTypes"
              :key="index"
              class="radio-option"
              @click="checkGoodsType(each.type)"
            >
              <span :class="['radio', { active: each.type === info.type_id }]"
                >✔</span
              >
              <span class="radio-name">{{ each.name }}</span>
            </div>
          </div>
          <div class="textarea-line">
            <textarea
              v-model="info.content"
              :placeholder="$t(`${lang}.leaveAMessage`)"
            />
          </div>
          <div class="submit-line">
            <button class="submit" @click="submit">
              {{ $t(`${lang}.submit`) }}
            </button>
          </div>
        </div>
      </section> -->
      <section v-show="isSuccessful" class="submit-successful">
        <div class="successful-content">
          <div class="status-icon">
            <img src="/empty/product.png" />
          </div>
          <div class="icon-shadow" />
          <h1 class="status-title">
            {{ $t(`${lang}.submitSuccessTitle`) }}
          </h1>
          <h3 class="status-desc">
            {{ $t(`${lang}.submitSuccessDesc`) }}
          </h3>
        </div>
      </section>

      <section v-show="isFail" class="submit-fail">
        <div class="fail-content">
          <div class="message">
            <div class="status-icon">
              <i class="iconfont iconicon-test1" />
            </div>
            <div class="icon-shadow" />
            <h1 class="status-title">
              {{ $t(`${lang}.submitFailTitle`) }}
            </h1>
            <h3 class="status-desc">
              {{ $t(`${lang}.submitFailDesc`) }}
            </h3>
          </div>
          <div class="button-group">
            <button class="confirm" @click="resetSubmitStatus">
              {{ $t(`${lang}.confirm`) }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </layout>
</template>

<script>
import Moment from 'moment'
import PhoneJson from '@/assets/countrycode.json'
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'contactUs'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },
      ringTypes: [
        {
          type: 2,
          name: this.$t(`${lang}.engagementRing`)
        },
        {
          type: 1,
          name: this.$t(`${lang}.marriageRing`)
        },
        {
          type: 3,
          name: this.$t(`${lang}.fashionAccessory`)
        }
      ],
      bookTimeOptions: [
        {
          value: '10:00'
        },
        {
          value: '10:30'
        },
        {
          value: '11:00'
        },
        {
          value: '11:30'
        },
        {
          value: '14:00'
        },
        {
          value: '15:00'
        },
        {
          value: '15:30'
        },
        {
          value: '16:00'
        },
        {
          value: '16:30'
        },
        {
          value: '17:00'
        },
        {
          value: '17:30'
        }
      ],
      info: {
        last_name: '', // 名
        first_name: '', // 姓氏
        mobile_code: '+852',
        telphone: '',
        book_date: '',
        book_time: '',
        type_id: 2,
        content: ''
      },
      isSuccessful: false,
      isFail: false
    }
  },
  computed: {
    countryPhoneCodeOptions() {
      const result = []
      const language = this.$store.state.language
      const map = {
        zh_TW: 'cn',
        en_US: 'en',
        zh_CN: 'zh'
      }
      PhoneJson.forEach(item => {
        result.push({
          name: item[map[language]],
          value: item.phone_code
        })
      })
      return result
    },
    checkedPhoneCodeInfo() {
      let result = {}
      const info = this.info
      const countryCodes = this.countryPhoneCodeOptions
      for (let n = 0, length = countryCodes.length; n < length; n++) {
        if (countryCodes[n].value === info.mobile_code) {
          result = countryCodes[n]
          break
        }
      }
      console.log('result===>', result)
      return result
    }
  },
  methods: {
    setBookDate(value) {
      const info = JSON.parse(JSON.stringify(this.info))
      info.book_date = value
      this.info = info
    },
    setBookTime(value) {
      const info = JSON.parse(JSON.stringify(this.info))
      info.book_time = value
      this.info = info
    },
    checkGoodsType(type) {
      const info = JSON.parse(JSON.stringify(this.info))
      info.type_id = type
      this.info = info
    },
    submitSuccessfulShow() {
      this.isSuccessful = true
      this.isFail = false
    },
    submitFailShow() {
      this.isSuccessful = false
      this.isFail = true
    },
    resetSubmitStatus() {
      this.isSuccessful = false
      this.isFail = false
    },
    submit() {
      const _this = this
      const info = JSON.parse(JSON.stringify(this.info))

      if (!info.last_name) {
        this.$errorMessage(this.$t(`${lang}.inputTheLastName`))
        return
      }

      if (!info.first_name) {
        this.$errorMessage(this.$t(`${lang}.inputTheFirstName`))
        return
      }

      if (!info.telphone) {
        this.$errorMessage(this.$t(`${lang}.inputTelphone`))
        return
      }

      if (!info.book_date) {
        this.$errorMessage(this.$t(`${lang}.selectTheCorrectDate`))
        return
      }

      if (!info.book_time) {
        this.$errorMessage(this.$t(`${lang}.selectAnAppointmentTime`))
        return
      }

      // info.arrivalTime = Moment(info.book_date + ' ' + info.book_time).valueOf()

      // const tomorrow = Moment()
      //   .add(1, 'd')
      //   .format('YYYY-MM-DD')

      // if (info.arrivalTime <= Moment(tomorrow).valueOf()) {
      //   this.$errorMessage(this.$t(`${lang}.bookTimeError`))
      //   return
      // }

      _this
        .$axios({
          method: 'post',
          url: `/web/member/contact/add`,
          data: info
        })
        .then(data => {
          console.log(data)
          _this.submitSuccessfulShow()
        })
        .catch(err => {
          // _this.$toast(err.message)
          _this.submitFailShow(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 60px;
  border: 1px solid rgba(215, 215, 215, 1);
  .title {
    font-size: 24px;
    margin: 40px 0px;
    text-align: left;
    color: #000000;
  }

  .our-info {
    display: flex;
    align-items: stretch;

    .map {
      flex-grow: 0;
      flex-shrink: 0;
      width: 47%;
      position: relative;
      font-size: 0;
      line-height: 0;

      img {
        width: 100%;
      }
    }

    .info {
      flex-grow: 1;
      flex-shrink: 1;
      min-width: 0;
      position: relative;
      // padding: 25px 16px 25px 24px;
      padding: 60px 16px 60px 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .item {
        display: flex;
        align-items: flex-start;

        .dd-icon {
          flex-grow: 0;
          flex-shrink: 0;
          position: relative;
          margin-right: 10px;
          width: 28px;
          height: 28px;
          line-height: 28px;
          background: rgba(235, 156, 137, 1);
          border: 0 solid;
          border-image: linear-gradient(
              0deg,
              rgba(236, 204, 134, 1),
              rgba(255, 255, 255, 1)
            )
            10 10;
          border-radius: 50%;
          text-align: center;

          .iconfont {
            font-size: 17px;
            color: #ffffff;
          }
        }
        .dd-content {
          flex-grow: 1;
          flex-shrink: 1;
          min-width: 0;
          position: relative;
          text-align: left;

          .dd-title {
            margin-bottom: 5px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
          }

          .dd-desc {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 24px;

            a {
              text-decoration: underline;
              color: rgba(204, 165, 159, 1);
            }
          }
        }
      }
    }
  }

  .reservation {
    padding: 50px 0 45px 0;
    background: rgba(248, 248, 248, 1);
    border-image: linear-gradient(
        0deg,
        rgba(236, 204, 134, 1),
        rgba(255, 255, 255, 1)
      )
      10 10;

    .reservation-content {
      margin: 0 auto;
      width: 620px;

      .row-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 17px;

        .input {
          flex-grow: 1;
          flex-shrink: 1;
          min-width: 0;
          position: relative;
          width: 300px;
          height: 36px;
          margin-right: 15px;
          border: 1px solid rgba(221, 221, 221, 1);
          box-sizing: border-box;
          background: rgba(255, 255, 255, 1);

          &:nth-last-of-type(1) {
            margin-right: 0;
          }

          input {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 0 10px;

            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;

            background: transparent;
            border: 0;
            outline: none;
            box-sizing: border-box;
          }
        }

        .select {
          position: relative;
          margin-right: 15px;
          padding: 0 10px;
          box-sizing: border-box;
          background-color: #dddddd;
          display: flex;
          align-items: center;

          &:nth-last-of-type(1) {
            margin-right: 0;
          }

          .select-text {
            flex-grow: 1;
            flex-shrink: 1;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            text-align: left;

            &.active {
              color: #333333;
            }
          }
          .iconfont {
            margin-left: 10px;
            font-size: 11px;
            color: #666666;
          }
          select {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }

        .date-input-el {
          flex-grow: 1;
          flex-shrink: 1;
          min-width: 0;
          padding: 0 10px;
          position: relative;
          width: 300px;
          height: 36px;
          margin-right: 15px;
          border: 1px solid rgba(221, 221, 221, 1);
          box-sizing: border-box;
          background: rgba(255, 255, 255, 1);
          display: flex;
          align-items: center;

          &:nth-last-of-type(1) {
            margin-right: 0;
          }

          .date-text {
            flex-grow: 1;
            flex-shrink: 1;
            font-size: 14px;
            font-family: PingFang HK;
            font-weight: 400;
            color: #999999;
            text-align: left;

            &.active {
              color: #333333;
            }
          }
          .iconfont {
            margin-left: 10px;
            font-size: 18px;
            color: #bbbbbb;
          }
          .date-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            border: 0;
            outline: none;
          }
        }

        .country-code {
          width: 220px;
        }
      }
      .radio-line {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/
        flex-wrap: wrap;

        .radio-option {
          /*flex-grow: 1;*/
          /*flex-shrink: 1;*/
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
          margin-right: 66px;

          .radio {
            flex-grow: 0;
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            line-height: 16px;
            margin-right: 7px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(170, 170, 170, 1);
            border-radius: 50%;
            color: transparent;

            &.active {
              color: #ffffff;
              background-color: #f29b87;
              border: 1px solid #f29b87;
              font-size: 15px;
              text-align: center;
            }
          }
          .radio-name {
            flex-grow: 1;
            flex-shrink: 1;
            font-size: 14px;
            font-family: PingFang HK;
            font-weight: 400;
            color: #333333;
          }
        }
      }
      .textarea-line {
        height: 100px;
        padding: 10px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        background-color: #ffffff;

        textarea {
          width: 100%;
          height: 100%;
          text-align: left;
          font-size: 14px;
          font-family: PingFang HK;
          font-weight: 400;
          background-color: transparent;
          resize: none;
          border: 0;
          outline: none;

          &::-webkit-input-placeholder {
            color: #999999;
          }
        }
      }
      .submit-line {
        padding: 27px 0 29px 0;
        text-align: right;
        .submit {
          width: 120px;
          height: 30px;
          font-size: 14px;
          font-family: PingFang HK;
          font-weight: 400;
          color: #ffffff;
          background: rgba(51, 51, 51, 1);
          border: 0;
          outline: none;
        }
      }
    }
  }

  .submit-successful {
    position: relative;
    width: 100%;
    height: 420px;
    margin-bottom: 12px;
    padding: 25px 60px;
    background-color: #f8f8f8;
    box-sizing: border-box;

    .successful-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .status-icon {
        text-align: center;
        margin-bottom: 5px;

        img {
          width: 80px;
        }
      }
      .status-title {
        margin-bottom: 11px;
        font-size: 24px;
        font-family: PingFang HK;
        font-weight: 500;
        color: #333333;
        text-align: center;
      }
      .status-desc {
        font-size: 12px;
        font-family: PingFang HK;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
      }
    }
  }

  .submit-fail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .fail-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      width: 350px;

      .message {
        padding: 35px 0 28px 0;
        box-sizing: border-box;

        .status-icon {
          text-align: center;
          margin-bottom: 5px;

          .iconfont {
            font-size: 48px;
            color: rgba(115, 117, 134, 1);
          }
        }
        .icon-shadow {
          width: 31px;
          height: 3px;
          margin: 0 auto 15px auto;
          background: rgba(228, 228, 228, 1);
          border: 0 solid rgba(224, 233, 221, 1);
          border-radius: 50%;
        }
        .status-title {
          margin-bottom: 11px;
          font-size: 18px;
          font-family: PingFang HK;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          text-align: center;
        }
        .status-desc {
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 12px;
          font-family: PingFang HK;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          text-align: center;
        }
      }

      .button-group {
        height: 40px;
        border-top: 1px solid rgba(221, 221, 221, 1);
        display: flex;
        align-items: stretch;
        justify-content: center;

        .confirm {
          flex-grow: 1;
          flex-shrink: 1;
          font-size: 16px;
          font-family: PingFang HK;
          font-weight: 400;
          color: rgba(242, 155, 135, 1);
          background-color: transparent;
          border: 0;
          outline: none;
        }
      }
    }
  }
}
</style>
