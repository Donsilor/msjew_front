<template>
  <div class="page">
    <div class="bar">
      <h1 class="title">{{ lang.callUs }}</h1>
      <div class="go-back-btn" @click="goBack($router)">
        <i class="iconfont iconfanhuiicon-"></i>
        <span>{{ lang.goBack }}</span>
      </div>
    </div>
    <section v-show="!isSuccessful" class="page-content">
      <h2 class="title">{{ lang.book }}</h2>
      <div class="input-line">
        <input
          v-model="info.lastName"
          class="text-input"
          type="text"
          :placeholder="'*' + lang.name"
        />
      </div>
      <div class="input-line">
        <input
          v-model="info.firstName"
          class="text-input"
          type="text"
          :placeholder="'*' + lang.surname"
        />
      </div>
      <div class="select-line">
        <div class="select-text">
          {{ checkedPhoneCodeInfo.name }} {{ checkedPhoneCodeInfo.value }}
        </div>
        <i class="iconfont iconxiala"></i>
        <select v-model="info.telCode">
          <option
            v-for="(item, index) in countryPhoneCodeOptions"
            :key="index"
            :value="item.value"
            >{{ item.name }} {{ item.value }}</option
          >
        </select>
      </div>
      <div class="input-line">
        <input
          v-model="info.telphone"
          class="text-input"
          type="tel"
          :placeholder="'*' + lang.tel"
        />
      </div>
      <div class="date-input-line">
        <div class="date-text">
          {{ info.arrivalTime ? info.arrivalTime : '*' + lang.arrivalTime }}
        </div>
        <i class="iconfont iconriqi"></i>
        <input
          class="date-input"
          type="datetime-local"
          @change="setArrivalTime"
        />
      </div>
      <div class="radio-line">
        <div
          v-for="(each, index) in ringTypes"
          :key="index"
          class="radio-option"
          @click="checkGoodgType(each.type)"
        >
          <span :class="['radio', { active: each.type === info.goodsType }]"
            >✔</span
          >
          <span class="radio-name">{{ each.name }}</span>
        </div>
      </div>
      <div class="textarea-line">
        <textarea
          v-model="info.message"
          :placeholder="lang.leaveAMessage"
        ></textarea>
      </div>
      <div class="submit-line">
        <button class="submit" @click="submit">{{ lang.submit }}</button>
      </div>
    </section>
    <section v-show="isSuccessful" class="submit-successful">
      <div class="status-icon">
        <img src="/empty/address.png" />
      </div>
      <div class="icon-shadow"></div>
      <h1 class="status-title">
        {{ lang.submitSuccessTitle }}
      </h1>
      <h3 class="status-desc">
        {{ lang.submitSuccessDesc }}
      </h3>
    </section>
    <section class="contact-us">
      <div class="map">
        <img src="/index/map.png" />
      </div>
      <div class="info">
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.store }}</span>
          <span class="row-text">{{ lang.storeName }}</span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.address }}</span>
          <span class="row-text">{{ lang.addressDetail }}</span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.tel }}</span>
          <span class="row-text">
            <a href="tel:+852 2165 3905">+852 2165 3905</a>
          </span>
          <span class="column-line"></span>
          <span class="row-icon">
            <a href="tel:+852 2165 3905">
              <i class="iconfont iconphone"></i>
            </a>
          </span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.email }}</span>
          <span class="row-text">
            <a href="mailto:service@bddco.com">service@bddco.com</a>
          </span>
          <span class="column-line"></span>
          <span class="row-icon">
            <a href="mailto:service@bddco.com">
              <i class="iconfont iconyouxiang"></i>
            </a>
          </span>
        </div>
      </div>
    </section>

    <section v-show="isFail" class="submit-fail">
      <div class="content">
        <div class="message">
          <div class="status-icon">
            <i class="iconfont iconicon-test1"></i>
          </div>
          <div class="icon-shadow"></div>
          <h1 class="status-title">
            {{ lang.submitFailTitle }}
          </h1>
          <h3 class="status-desc">
            {{ lang.submitFailDesc }}
          </h3>
        </div>
        <div class="button-group">
          <button class="confirm" @click="resetSubmitStatus">
            {{ lang.confirm }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PhoneJson from '@/assets/countrycode.json'
import Moment from 'moment'
export default {
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.callUs,
      ringTypes: [
        {
          type: 2,
          name: this.LANGUAGE.callUs.engagementRing
        },
        {
          type: 1,
          name: this.LANGUAGE.callUs.marriageRing
        },
        {
          type: 3,
          name: this.LANGUAGE.callUs.fashionAccessory
        }
      ],
      info: {
        lastName: '', // 名
        firstName: '', // 姓氏
        telCode: '+852',
        telphone: '',
        arrivalTime: '',
        goodsType: 2,
        message: ''
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
        en_US: 'en'
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
        if (countryCodes[n].value === info.telCode) {
          result = countryCodes[n]
          break
        }
      }
      return result
    }
  },
  methods: {
    setArrivalTime(e) {
      const value = e.target.value
      const info = JSON.parse(JSON.stringify(this.info))
      console.log(111, value)
      console.log(222, Moment(value).format('YYYY-MM-DD HH:mm'))
      info.arrivalTime = Moment(value).format('YYYY-MM-DD HH:mm')
      this.info = info
    },
    checkGoodgType(type) {
      const info = JSON.parse(JSON.stringify(this.info))
      info.goodsType = type
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
      info.arrivalTime = Moment(info.arrivalTime).millisecond()

      if (info.arrivalTime <= Moment().millisecond()) {
        this.$toast(this.lang.bookTimeError)
        return
      }

      _this
        .$axios({
          method: 'post',
          url: `/wap/reservation/addReservation`,
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
.page {
  padding: 0 15px;
  box-sizing: border-box;
}
.bar {
  position: relative;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 18px;
    font-family: PingFang HK;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .go-back-btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);

    .iconfont {
      font-size: 11px;
    }
    span {
      font-size: 14px;
      font-family: PingFang HK;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
.page-content {
  .title {
    margin-bottom: 14px;
    font-size: 16px;
    font-family: PingFang HK;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: left;
  }
  .input-line,
  .select-line,
  .date-input-line {
    position: relative;
    margin-bottom: 18px;
    padding: 0 10px;
    height: 40px;
    border: 1px solid rgba(199, 183, 183, 1);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .input-line {
    .text-input {
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 14px;
      font-family: PingFang HK;
      font-weight: 400;
      &::-webkit-input-placeholder {
        color: #999999;
      }
    }
  }
  .select-line {
    background-color: #f9f9f9;
    .select-text {
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 14px;
      font-family: PingFang HK;
      font-weight: 400;
      color: #333333;
      text-align: left;
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
  .date-input-line {
    background-color: #f9f9f9;
    .date-text {
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 14px;
      font-family: PingFang HK;
      font-weight: 400;
      color: #333333;
      text-align: left;
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

      &:focus {
        opacity: 1;
        background-color: #ffffff;
      }
    }
  }
  .radio-line {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    .radio-option {
      /*flex-grow: 1;*/
      /*flex-shrink: 1;*/
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;

      .radio {
        flex-grow: 0;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        line-height: 14px;
        margin-right: 7px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(170, 170, 170, 1);
        border-radius: 50%;
        color: transparent;

        &.active {
          color: #ffffff;
          background-color: #f29b87;
          border: 1px solid #f29b87;
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
    border: 1px solid rgba(199, 183, 183, 1);
    box-sizing: border-box;

    textarea {
      width: 100%;
      height: 100%;
      text-align: left;
      font-size: 14px;
      font-family: PingFang HK;
      font-weight: 400;

      &::-webkit-input-placeholder {
        color: #999999;
      }
    }
  }
  .submit-line {
    padding: 27px 0 29px 0;
    .submit {
      width: 100%;
      height: 40px;
      font-size: 16px;
      font-family: PingFang HK;
      font-weight: 400;
      color: #ffffff;
      background: rgba(51, 51, 51, 1);
      border-radius: 5px;
    }
  }
}

/*联系我们*/
.contact-us {
  /*padding: 18px 15px 30px 15px;*/
  /*box-sizing: border-box;*/

  .title {
    position: relative;
    margin-bottom: 26px;
    height: 15px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    text-align: center;

    &:after {
      content: '';
      position: absolute;
      top: 24px;
      left: calc(50% - 22px);
      width: 44px;
      height: 1px; /*no*/
      background: rgba(221, 221, 221, 1);
    }
  }
  .map {
    margin-bottom: 15px;

    img {
      width: 100%;
    }
  }
  .info {
    .info-row {
      height: 50px;
      border-bottom: 1px solid rgba(190, 190, 190, 1); /*no*/
      display: flex;
      align-items: center;

      .line {
        margin-right: 6px;
        width: 30px;
        height: 1px; /*no*/
        background: rgba(190, 190, 190, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-name {
        width: 66px;
        height: 9px;
        font-size: 9px;
        font-weight: 400;
        text-align: left;
        color: rgba(153, 153, 153, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-text {
        /*height: 12px;*/
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: rgba(0, 0, 0, 1);
        flex-grow: 1;
        flex-shrink: 1;

        a {
          color: initial;
        }
      }
      .column-line {
        width: 1px; /*no*/
        height: 30px;
        background: rgba(190, 190, 190, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-icon {
        width: 70px;
        flex-grow: 0;
        flex-shrink: 0;

        .iconfont {
          color: #a3a3a3;
        }
        .iconphone {
          font-size: 24px;
        }
        .iconyouxiang {
          font-size: 31px;
        }
      }
    }

    .info-row:nth-of-type(1) {
      border-top: 1px solid rgba(190, 190, 190, 1); /*no*/
    }
  }
}

.submit-successful {
  margin-bottom: 12px;
  padding: 25px 60px;
  background-color: #f8f8f8;
  box-sizing: border-box;

  .status-icon {
    text-align: center;
    margin-bottom: 5px;

    img {
      width: 60px;
    }
  }
  .status-title {
    margin-bottom: 11px;
    font-size: 18px;
    font-family: PingFang HK;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
  .status-desc {
    font-size: 12px;
    font-family: PingFang HK;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}

.submit-fail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    width: 270px;
    border-radius: 5px;

    .message {
      padding: 35px 35px 17px 35px;
      box-sizing: border-box;

      .status-icon {
        text-align: center;
        margin-bottom: 5px;

        .iconfont {
          font-size: 40px;
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
      }
      .status-desc {
        font-size: 12px;
        font-family: PingFang HK;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
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
      }
    }
  }
}
</style>
