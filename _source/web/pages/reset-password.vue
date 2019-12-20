<template>
  <div class="page">
    <div class="content">
      <ul class="schedule">
        <li
          v-for="(item, index) in schedule"
          :key="index"
          :class="[
            'item',
            { pass: item.key < activeScheduleKey },
            { active: activeScheduleKey === item.key }
          ]"
        >
          <span class="item-number">{{ item.key }}</span>
          <div class="item-name">
            {{ item.name }}
          </div>
        </li>
      </ul>
      <ul class="schedule-content">
        <li class="item item-1" :style="scheduleContentStyle">
          <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
          <div class="item-content">
            <h2 class="tip">{{ $t(`${lang}.address`) }}</h2>
            <div class="input-line">
              <input
                v-model="info.email"
                class="bottom-border-input"
                @keydown.enter="changeSchedule(2)"
              />
            </div>
            <div class="button-group">
              <button
                v-loading="ajaxLoading"
                class="submit-button"
                @click="changeSchedule(2)"
              >
                {{ $t(`${lang}.next`) }}
              </button>
            </div>
          </div>
        </li>
        <li class="item item-2" :style="scheduleContentStyle">
          <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
          <div class="item-content">
            <div class="item-icon">
              <img src="/reset-password/email.png" />
            </div>
            <h2 class="tip">
              {{ $t(`${lang}.hadSendEmailCode1`) }}
              <span>{{ info.email }}</span>
              {{ $t(`${lang}.hadSendEmailCode2`) }}
            </h2>
            <div class="wrong-email">
              <span>{{ $t(`${lang}.wrongEmail`) }}</span>
              <span class="rewrite" @click="changeSchedule(1)">
                {{ $t(`${lang}.changeEmail`) }}
              </span>
            </div>
            <div class="input-line">
              <input
                v-model="info.code"
                class="bottom-border-input"
                :placeholder="$t(`${lang}.inputEmailCode`)"
                @keydown.enter="changeSchedule(3)"
              />
            </div>
            <div class="button-group">
              <button
                v-loading="ajaxLoading"
                class="submit-button"
                @click="changeSchedule(3)"
              >
                {{ $t(`${lang}.submit`) }}
              </button>
            </div>
          </div>
        </li>
        <li class="item item-3" :style="scheduleContentStyle">
          <h3 class="item-title">{{ $t(`${lang}.forgetPassword`) }}</h3>
          <div class="item-content">
            <h2 class="tip">
              {{ $t(`${lang}.newPassword`) }}
            </h2>
            <h3 class="sub-tip">
              {{ $t(`${lang}.newPasswordTip`) }}
            </h3>
            <div class="wrong-email">
              <span>{{ $t(`${lang}.wrongEmail`) }}</span>
              <span class="rewrite" @click="changeSchedule(1)">
                {{ $t(`${lang}.changeEmail`) }}
              </span>
            </div>
            <div class="input-line">
              <input
                v-model="info.password"
                class="bottom-border-input"
                :placeholder="$t(`${lang}.newPassword`)"
                @keydown.enter="changeSchedule(4)"
              />
            </div>
            <div class="input-line">
              <input
                v-model="info.confirmdPassword"
                class="bottom-border-input"
                :placeholder="$t(`${lang}.confirmPassword`)"
                @keydown.enter="changeSchedule(4)"
              />
            </div>
            <div class="button-group">
              <button
                v-loading="ajaxLoading"
                class="submit-button"
                @click="changeSchedule(4)"
              >
                {{ $t(`${lang}.reset`) }}
              </button>
            </div>
          </div>
        </li>
        <li class="item item-4" :style="scheduleContentStyle">
          <div class="item-content">
            <h2 class="tip">{{ $t(`${lang}.hadReset`) }}</h2>
            <h3 class="sub-tip">
              {{ $t(`${lang}.waitTimes`, { second: waitSecond }) }}
            </h3>
            <div class="button-group">
              <button
                v-loading="ajaxLoading"
                class="submit-button"
                @click="toLogin"
              >
                {{ $t(`${lang}.loginNow`) }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
const lang = 'resetPassword'
export default {
  components: {},
  mixins: [Input],
  data() {
    return {
      lang,
      waitSecond: 10,
      waitTimeout: null,
      activeScheduleKey: 1,
      schedule: [
        {
          key: 1,
          name: this.$t(`${lang}.schedule1`)
        },
        {
          key: 2,
          name: this.$t(`${lang}.schedule2`)
        },
        {
          key: 3,
          name: this.$t(`${lang}.schedule3`)
        },
        {
          key: 4,
          name: this.$t(`${lang}.schedule4`)
        }
      ],
      info: {
        email: '12345362@qq.com',
        code: '',
        password: '',
        confirmdPassword: ''
      },
      ajaxLoading: false
    }
  },
  computed: {
    scheduleContentStyle() {
      return {
        transform: `translate(-${(this.activeScheduleKey - 1) * 100}%, 0)`
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    async changeSchedule(key) {
      const _this = this
      const nextScheduleKey = key

      _this.ajaxLoading = true
      switch (key) {
        case 1:
          const info = JSON.parse(JSON.stringify(_this.info))
          info.email = ''
          info.code = ''
          info.password = ''
          info.confirmdPassword = ''
          _this.info = info
          break
        case 2:
          try {
            await _this.sendCode()
          } catch (e) {
            _this.$errorMessage(e.message)
            _this.ajaxLoading = false
            return
          }
          break
        case 3:
          try {
            await _this.compareCode()
          } catch (e) {
            _this.$errorMessage(e.message)
            _this.ajaxLoading = false
            return
          }
          break
        case 4:
          try {
            await _this.resetPassword()
          } catch (e) {
            _this.$errorMessage(e.message)
            _this.ajaxLoading = false
            return
          }
          _this.waitTimeout = setTimeout(() => {
            clearTimeout(_this.waitTimeout)
            _this.toLogin()
          }, _this.waitSecond * 1000)
          break
        default:
          _this.ajaxLoading = false
          return
      }
      _this.ajaxLoading = false
      _this.activeScheduleKey = nextScheduleKey
    },
    // 发送验证码
    sendCode() {
      const _this = this
      return new Promise((resolve, reject) => {
        _this
          .$axios({
            method: 'post',
            url: '/web/user/resetEmail',
            params: {
              email: _this.info.email
            }
          })
          .then(data => {
            console.log(data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 验证验证码
    compareCode() {
      const _this = this
      return new Promise((resolve, reject) => {
        if (!_this.info.code) {
          reject(new Error(_this.$t(`${lang}.inputEmailCode`)))
        }

        _this
          .$axios({
            method: 'post',
            url: '/web/user/compareCode',
            params: {
              email: _this.info.email,
              code: _this.info.code
            }
          })
          .then(data => {
            console.log(data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 重置密码
    resetPassword() {
      const _this = this
      return new Promise((resolve, reject) => {
        if (!_this.info.password) {
          reject(new Error(_this.$t(`${lang}.newPassword`)))
        }
        if (!_this.info.confirmdPassword) {
          reject(new Error(_this.$t(`${lang}.confirmPassword`)))
        }

        _this
          .$axios({
            method: 'post',
            url: '/web/user/resetPwd',
            params: _this.info
          })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    toLogin() {
      const _this = this
      _this.$router.push({
        path: 'login'
      })
    }
  }
}
</script>

<style scoped lang="less">
.bottom-border-input {
  height: 37px;
  border-bottom: 1px solid #999999;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-align: left;

  &::-webkit-input-placeholder {
    color: #999999;
  }
}

.button-group {
  text-align: center;
  padding-top: 44px;
}
.submit-button {
  width: 400px;
  height: 48px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(168, 143, 130, 1);
}

.page {
  position: relative;
  width: 100%;
  background-image: url('/login/necklace.png'), url('/login/bg.png');
  background-size: 100% 100%;

  .content {
    position: relative;
    width: 1280px;
    margin: auto;
    padding: 50px 0;
    box-sizing: border-box;

    .schedule {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        position: relative;
        width: 290px;
        height: 168px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        transition: all 0.2s linear;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-number {
          margin-bottom: 20px;
          width: 58px;
          height: 58px;
          line-height: 58px;
          font-size: 30px;
          font-family: twCenMT;
          color: rgba(255, 255, 255, 1);
          background: rgba(230, 230, 230, 1);
          border-radius: 50%;
          text-align: center;
        }

        .item-name {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          text-align: center;
        }

        &.pass,
        &.active {
          border: 1px solid rgba(185, 127, 139, 1);
          box-shadow: 0px 5px 0px 0px rgba(238, 187, 194, 0.35);

          .item-number {
            background-color: #ddb0aa;
          }

          .item-name {
            color: #b18f8b;
          }
        }

        &.active {
          :before {
            content: ' ';
            position: absolute;
            top: 100%;
            left: 50%;
            transform-origin: left top;
            transform: translate(-50%, 0) rotateZ(-45deg);
            background-color: rgba(185, 127, 139, 1);
            width: 10px;
            height: 10px;
          }

          :after {
            content: ' ';
            position: absolute;
            top: 100%;
            left: 50%;
            transform-origin: left top;
            transform: translate(-50%, -2px) rotateZ(-45deg);
            background-color: #ffffff;
            width: 10px;
            height: 10px;
          }
        }
      }
    }

    .schedule-content {
      width: 100%;

      list-style: none;
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;

      .item {
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        height: 520px;
        padding: 50px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.9);
        transition: all 0.2s linear;

        .item-title {
          height: 20px;
          border-left: 1px solid #333333;
          padding-left: 27px;
          line-height: 20px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(168, 143, 130, 1);
          box-sizing: border-box;
        }

        &.item-1 {
          .item-content {
            padding-top: 80px;

            .tip {
              margin-bottom: 23px;
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              text-align: center;
            }
            .input-line {
              text-align: center;

              input {
                width: 400px;
              }
            }
          }
        }

        &.item-2 {
          .item-content {
            text-align: center;
            padding-top: 30px;

            .item-icon {
              margin-bottom: 30px;
              font-size: 0;
              line-height: 0;

              img {
                width: 62px;
              }
            }

            .tip {
              width: 60%;
              margin: 0 auto 20px auto;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;

              span {
                margin: 0 10px;
                color: #a88f82;
              }
            }

            .wrong-email {
              width: 370px;
              margin: 0 auto 30px auto;
              display: flex;
              align-items: center;
              justify-content: space-between;

              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);

              .rewrite {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                text-decoration: underline;
                color: rgba(168, 143, 130, 1);
              }
            }

            .input-line {
              width: 370px;
              margin: 0 auto;

              input {
                width: 100%;
                text-align: center;
              }
            }
          }
        }

        &.item-3 {
          .item-content {
            width: 400px;
            margin: auto;
            text-align: left;
            padding-top: 30px;

            .tip {
              margin: 0 auto 20px auto;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;

              span {
                margin: 0 10px;
                color: #a88f82;
              }
            }

            .sub-tip {
              margin-bottom: 28px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(205, 188, 169, 1);
              line-height: 18px;
            }

            .wrong-email {
              margin: 0 auto 30px auto;
              display: flex;
              align-items: center;
              justify-content: space-between;

              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);

              .rewrite {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                text-decoration: underline;
                color: rgba(168, 143, 130, 1);
              }
            }

            .input-line {
              margin: 0 auto;

              input {
                width: 100%;
                text-align: center;
              }
            }
          }
        }

        &.item-4 {
          .item-content {
            padding-top: 100px;

            .tip {
              margin-bottom: 23px;
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              text-align: center;
            }

            .sub-tip {
              margin-bottom: 28px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(205, 188, 169, 1);
              line-height: 18px;
              text-align: center;
            }

            .button-group {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
