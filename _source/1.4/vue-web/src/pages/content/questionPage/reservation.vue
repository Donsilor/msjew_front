<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <section
      class="our-info">
      <div class="map">
        <img src="/static/images/map.png" >
      </div>
      <dl class="info">
        <dd class="item">
          <div class="dd-icon">
            <i class="iconfont iconphone"/>
          </div>
          <div class="dd-content">
            <h2 class="dd-title">{{ lang.callToUs }}</h2>
            <p class="dd-desc">
              {{ lang.welcomeYourTel }}：（852）2165 3905
            </p>
          </div>
        </dd>
        <dd class="item">
          <div class="dd-icon">
            <i class="iconfont iconyouxiang"/>
          </div>
          <div class="dd-content">
            <h2 class="dd-title">{{ lang.emailToUs }}</h2>
            <p class="dd-desc">
              <a href="mailto:service@bddco.com">service@bddco.com</a>；{{ lang.allQuestionWillBeDeal }}
            </p>
          </div>
        </dd>
        <dd class="item">
          <div class="dd-icon">
            <i class="iconfont icondizhi"/>
          </div>
          <div class="dd-content">
            <h2 class="dd-title">{{ lang.ourAddress }}</h2>
            <p class="dd-desc">
              {{ lang.addressDetail }}
            </p>
          </div>
        </dd>
      </dl>
    </section>
    <div class="title">{{ lang.book }}</div>
    <section
      v-show="!isSuccessful"
      class="reservation">
      <div class="reservation-content">
        <div class="row-line">
          <div class="input">
            <input
              :placeholder="'*' + lang.name"
              v-model="info.lastName" >
          </div>
          <div class="input">
            <input
              :placeholder="'*' + lang.surname"
              v-model="info.firstName" >
          </div>
        </div>
        <div class="row-line">
          <div class="select country-code">
            <div class="select-text">
              {{ checkedPhoneCodeInfo.name }} {{ checkedPhoneCodeInfo.value }}
            </div>
            <i class="iconfont iconxiala"/>
            <select v-model="info.telCode">
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
              :placeholder="'*' + lang.tel"
              v-model="info.telphone" >
          </div>
        </div>
        <div class="row-line">
          <div class="date-input">
            <div class="date-text">
              {{ info.bookDate ? info.bookDate : '*' + lang.bookDate }}
            </div>
            <i class="iconfont iconriqi"/>
            <div class="date-input">
              <el-date-picker
                v-model="info.bookDate"
                :clearable="false"
                style="width: 100%;"
                type="date"
                value-format="yyyy-MM-dd"
                @change="setBookDate"/>
            </div>
          </div>
          <div class="date-input">
            <div class="date-text">
              {{ info.bookTime ? info.bookTime : '*' + lang.bookTime }}
            </div>
            <i class="iconfont iconxiala"/>
            <div class="date-input">
              <el-time-picker
                v-model="info.bookTime"
                :clearable="false"
                style="width: 100%;"
                size="mini"
                value-format="HH:mm"
                @change="setBookTime"/>
            </div>
          </div>
        </div>
        <div class="radio-line">
          <div
            v-for="(each, index) in ringTypes"
            :key="index"
            class="radio-option"
            @click="checkGoodsType(each.type)"
          >
            <span
              :class="['radio', { active: each.type === info.goodsType }]"
            >✔</span
            >
            <span class="radio-name">{{ each.name }}</span>
          </div>
        </div>
        <div class="textarea-line">
          <textarea
            :placeholder="lang.leaveAMessage"
            v-model="info.message" />
        </div>
        <div class="submit-line">
          <button
            class="submit"
            @click="submit">{{ lang.submit }}</button>
        </div>
      </div>
    </section>
    <section
      v-show="isSuccessful"
      class="submit-successful">
      <div class="successful-content">
        <div class="status-icon">
          <img src="/static/images/empty/product.png" >
        </div>
        <div class="icon-shadow"/>
        <h1 class="status-title">
          {{ lang.submitSuccessTitle }}
        </h1>
        <h3 class="status-desc">
          {{ lang.submitSuccessDesc }}
        </h3>
      </div>
    </section>

    <section
      v-show="isFail"
      class="submit-fail">
      <div class="fail-content">
        <div class="message">
          <div class="status-icon">
            <i class="iconfont iconicon-test1"/>
          </div>
          <div class="icon-shadow"/>
          <h1 class="status-title">
            {{ lang.submitFailTitle }}
          </h1>
          <h3 class="status-desc">
            {{ lang.submitFailDesc }}
          </h3>
        </div>
        <div class="button-group">
          <button
            class="confirm"
            @click="resetSubmitStatus">
            {{ lang.confirm }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PhoneJson from '@/assets/countrycode.json';
import Moment from 'moment';
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.reservation,
      ringTypes: [
        {
          type: 2,
          name: this.$LANGUAGE.questionPage.reservation.engagementRing
        },
        {
          type: 1,
          name: this.$LANGUAGE.questionPage.reservation.marriageRing
        },
        {
          type: 3,
          name: this.$LANGUAGE.questionPage.reservation.fashionAccessory
        }
      ],
      info: {
        lastName: '', // 名
        firstName: '', // 姓氏
        telCode: '+852',
        telphone: '',
        bookDate: '',
        bookTime: '',
        goodsType: 2,
        message: ''
      },
      isSuccessful: false,
      isFail: false
    };
  },
  computed: {
    countryPhoneCodeOptions() {
      const result = [];
      const language = localStorage.getItem('locale');
      const map = {
        zh_TW: 'cn',
        en_US: 'en'
      };
      PhoneJson.forEach(item => {
        result.push({
          name: item[map[language]],
          value: item.phone_code
        });
      });
      return result;
    },
    checkedPhoneCodeInfo() {
      let result = {};
      const info = this.info;
      const countryCodes = this.countryPhoneCodeOptions;
      for (let n = 0, length = countryCodes.length; n < length; n++) {
        if (countryCodes[n].value === info.telCode) {
          result = countryCodes[n];
          break;
        }
      }
      console.log('result===>', result);
      return result;
    }
  },
  methods: {
    setBookDate(value) {
      const info = JSON.parse(JSON.stringify(this.info));
      info.bookDate = value;
      this.info = info;
    },
    setBookTime(value) {
      const info = JSON.parse(JSON.stringify(this.info));
      info.bookTime = value;
      this.info = info;
    },
    checkGoodsType(type) {
      const info = JSON.parse(JSON.stringify(this.info));
      info.goodsType = type;
      this.info = info;
    },
    submitSuccessfulShow() {
      this.isSuccessful = true;
      this.isFail = false;
    },
    submitFailShow() {
      this.isSuccessful = false;
      this.isFail = true;
    },
    resetSubmitStatus() {
      this.isSuccessful = false;
      this.isFail = false;
    },
    submit() {
      const _this = this;
      const info = JSON.parse(JSON.stringify(this.info));
      info.arrivalTime = Moment(info.bookDate + info.bookTime).millisecond();

      if (info.arrivalTime <= Moment().millisecond()) {
        this.$message.error(this.lang.bookTimeError);
        return;
      }

      _this
        .$axiosPost(`/web/reservation/addReservation`, info)
        .then(data => {
          console.log(data);
          _this.submitSuccessfulShow();
        })
        .catch(err => {
          // _this.$toast(err.message)
          _this.submitFailShow(err.message);
        });
    }
  }
};
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
        padding: 25px 16px 25px 24px;
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
            width:28px;
            height:28px;
            line-height: 28px;
            background:rgba(235,156,137,1);
            border:0 solid;
            border-image:linear-gradient(0deg, rgba(236,204,134,1), rgba(255,255,255,1)) 10 10;
            border-radius:50%;
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
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:bold;
              color:rgba(102,102,102,1);
            }

            .dd-desc {
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height:24px;

              a {
                text-decoration:underline;
                color:rgba(204,165,159,1);
              }
            }
          }
        }
      }
    }

    .reservation {
      padding: 50px 0 45px 0;
      background:rgba(248,248,248,1);
      border-image:linear-gradient(0deg, rgba(236,204,134,1), rgba(255,255,255,1)) 10 10;

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
            border: 1px solid rgba(221,221,221,1);
            box-sizing: border-box;
            background: rgba(255,255,255,1);

            &:nth-last-of-type(1) {
              margin-right: 0;
            }

            input {
              position: relative;
              width: 100%;
              height: 100%;
              padding: 0 10px;

              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;

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
              font-family:Microsoft YaHei;
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

          .date-input {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            padding: 0 10px;
            position: relative;
            width: 300px;
            height: 36px;
            margin-right: 15px;
            border: 1px solid rgba(221,221,221,1);
            box-sizing: border-box;
            background: rgba(255,255,255,1);
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
            resize:none;
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
            height:30px;
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
        }
        .status-desc {
          font-size: 12px;
          font-family: PingFang HK;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
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
            background-color: transparent;
            border: 0;
            outline: none;
          }
        }
      }
    }
  }
</style>
