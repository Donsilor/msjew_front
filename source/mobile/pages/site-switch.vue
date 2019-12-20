<template>
  <div>
    <div class="operate-bar">
      <i class="icon iconfont iconguanbi close" @click="goBack($router)"></i>
    </div>
    <div class="page-content">
      <div>
        <h1 class="title">
          <i class="iconfont icon_xuanzeyuyanhuobi"></i>
          <span>{{ lang.chooseLanguageCoin }}</span>
        </h1>
        <div class="select-line-box" @click="chooseLanguage">
          <span>{{ languageText }}</span>
          <i class="iconfont iconkuozhan"></i>
        </div>
        <div class="select-line-box" @click="chooseCoin">
          <span>{{ coinText }}</span>
          <i class="iconfont iconkuozhan"></i>
        </div>
        <div class="button-line-box">
          <button class="full-btn determine" @click="changePage">
            <span class="btn-message">{{ lang.clear }}</span>
          </button>
        </div>
      </div>
      <div class="notify">
        <nuxt-link :to="{ name: 'help-pages-deliveryPolicy' }">
          <div class="notify-line-box">
            <span class="notify-icon green-bg">
              <i class="iconfont icon_songhuozhengce"></i>
            </span>
            <span class="notify-title">{{ lang.ourShippingPolicy }}</span>
            <span class="notify-directive">
              <i class="iconfont iconyou"></i>
            </span>
          </div>
        </nuxt-link>
        <nuxt-link :to="{ name: 'help-pages-paymentMethod' }">
          <div class="notify-line-box">
            <span class="notify-icon orange-bg">
              <i class="iconfont icon_fukuanfangshi"></i>
            </span>
            <span class="notify-title">{{ lang.ourPayType }}</span>
            <span class="notify-directive">
              <i class="iconfont iconyou"></i>
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
    <swiper-tap
      ref="language-tap"
      :list="languageOptions"
      :choose-line="language"
      @clear="changeLanguage"
    ></swiper-tap>
    <swiper-tap
      ref="coinTap"
      :list="coinOptions"
      :choose-line="coin"
      @clear="changeCoin"
    ></swiper-tap>
  </div>
</template>

<script>
export default {
  layout: 'no-footer-bar',
  head() {
    return {
      title: `BBD&Co.`
    }
  },
  data() {
    return {
      lang: this.LANGUAGE['site-switch'],
      language: 0,
      coin: 0,
      languageOptions: this.$bddDefinition.languageOptions,
      coinOptions: this.$bddDefinition.coinOptions
    }
  },
  computed: {
    languageText() {
      return this.languageOptions[this.language].content
    },
    coinText() {
      return this.coinOptions[this.coin].content
    },
    languageCode() {
      return this.languageOptions[this.language].code
    },
    coinCode() {
      return this.coinOptions[this.coin].code
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      for (let n = 0, length = _this.languageOptions.length; n < length; n++) {
        if (_this.languageOptions[n].code === _this.$store.state.language) {
          _this.language = n
          break
        }
      }

      for (let n = 0, length = _this.coinOptions.length; n < length; n++) {
        if (_this.coinOptions[n].code === _this.$store.state.coin) {
          _this.coin = n
          break
        }
      }
    })
  },
  methods: {
    chooseLanguage() {
      this.$refs['language-tap'].show()
    },
    changeLanguage(data) {
      this.language = data.index
    },
    chooseCoin() {
      this.$refs.coinTap.show()
    },
    changeCoin(data) {
      this.coin = data.index
    },
    changePage() {
      // this.$toast('根据所选切换站点货币')
      /**
       * 设置语言和货币
       */
      this.$store.commit('setCoin', this.coinCode)
      this.$store.commit('setLanguage', this.languageCode)
      setTimeout(() => {
        // location.href = '/'
        // location.reload()
        location.href = this.$route.query.redirectUri
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.operate-bar {
  padding: 16px 19px 0 19px;
  height: 17px;
  text-align: right;
  margin-bottom: 24px;
}
.operate-bar .close {
  font-size: 17px;
  color: #666666;
}
.page-content {
  padding: 6px 33px 0 38px;
  box-sizing: border-box;

  .title {
    margin-bottom: 25px;
    height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);

    .icontouxiang {
      margin-right: 7px;
    }
  }
  .select-line-box {
    &:nth-of-type(2) {
      margin-bottom: 32px;
    }

    position: relative;
    margin-bottom: 18px;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    background: rgba(249, 249, 249, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconkuozhan {
      position: absolute;
      top: 50%;
      right: 10px;
      color: #666666;
      font-size: 20px;
      transform: translate(0, -55%) rotate(90deg);
    }
  }
  .button-line-box {
    margin-bottom: 18px;

    button {
      height: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(51, 51, 51, 1);

      &.determine {
        /*letter-spacing: 16px;*/
      }
    }
  }
  .notify {
    .notify-line-box {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(221, 221, 221, 1);

      .notify-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &.green-bg {
          background: rgba(168, 205, 182, 1);
        }
        &.orange-bg {
          background: rgba(249, 184, 169, 1);
        }
        .iconfont {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .notify-title {
        flex-grow: 1;
        flex-shrink: 1;
        padding: 0 11px;
        box-sizing: border-box;
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: rgba(51, 51, 51, 1);
      }
      .notify-directive {
        .iconfont {
          color: #666666;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
