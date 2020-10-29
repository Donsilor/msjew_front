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
        <!-- <div v-if="this.$store.state.platform == 31" class="select-line-box">
          <input :value="languages" type="text" disabled/>
        </div>
        <div v-else class="select-line-box">
          <input :value="language" type="text" />
            <select name="" id="" v-model="language">
              <option v-for="(p, index) in languageOptions" :key="index" :value="p.content">
                {{p.content}}
              </option>
            </select>
          <i class="iconfont iconkuozhan"></i>
        </div> -->
        <div class="select-line-box">
          <input :value="language" type="text" />
            <select name="" id="" v-model="language">
              <option v-for="(p, index) in languageOptionsCn" :key="index" :value="p.content">
                {{p.content}}
              </option>
            </select>
          <i class="iconfont iconkuozhan"></i>
        </div>
        <!-- <div class="select-line-box">
          <input :value="languageCn" type="text" disabled/>
        </div> -->
        <!-- <div class="select-line-box" v-if="this.$store.state.platform === 21">
          <input :value="coin" type="text" />
          <select name="" id="" v-model="coin">
            <option v-for="(p, index) in coinOptionsCn" :key="index" :value="p.code">
              {{p.content}}
            </option>
          </select>
        </div>
        <div class="select-line-box" v-else-if="this.$store.state.platform === 41">
          <input :value="coin" type="text" />
          <select name="" id="" v-model="coin">
            <option v-for="(p, index) in coinOptionsTw" :key="index" :value="p.code">
              {{p.content}}
            </option>
          </select>
        </div>
        <div v-else class="select-line-box">
          <input :value="coin" type="text" />
          <select name="" id="" v-model="coin">
            <option v-for="(p, index) in coinOptions" :key="index" :value="p.code">
              {{p.content}}
            </option>
          </select>
          <i class="iconfont iconkuozhan"></i>
        </div> -->
        <div class="select-line-box">
          <input :value="coinCn" type="text" disabled/>
        </div>
         <!-- <select name="" id="" v-model="aa">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select> -->
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
    <!-- <swiper-tap
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
    ></swiper-tap> -->
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
      languageOptionsCn: this.$bddDefinition.languageOptionsCn,
      coinOptions: this.$bddDefinition.coinOptions,
      coinOptionsCn: this.$bddDefinition.coinOptionsCn,
      coinOptionsTw: this.$bddDefinition.coinOptionsTw,
      aa:'',
      languages:'English',
      languageCn:'中文简体',
      coinCn:'CNY'
    }
  },
  computed: {
    languageText() {
      // console.log("aa",this.languageOptions[this.language].content)
      return this.languageOptionsCn[this.language].content
    },
    coinText() {
      if(this.$store.state.platform === 21){
        return this.coinOptionsCn[this.coin].content
      } else if(this.$store.state.platform === 41){
        return this.coinOptionsTw[this.coin].content
      } else {
        return this.coinOptions[this.coin].content
      }
    },
    languageCode() {
      return this.languageOptionsCn[this.language].code
    },
    coinCode() {
      if(this.$store.state.platform === 21){
        return this.coinOptionsCn[this.coin].code
      } else if(this.$store.state.platform === 41){
        return this.coinOptionsTw[this.coin].code
      } else {
        return this.coinOptions[this.coin].code
      }
    }
  },
  created(){
    // console.log("coin",this.coinOptionsTw)
    if(this.$store.state.platform === 21){
      this.coin = this.coinOptionsCn[0].content
    } else if(this.$store.state.platform === 41){
      this.coin = this.coinOptionsTw[0].content
    } else {
      this.coin = this.coinOptions[0].content
    }
  },
  mounted() {
    // this.language = this.languageOptions[0].content
    // console.log(this.coinOptions[this.coin].content)
    const _this = this
    _this.$nextTick(() => {
      for (let n = 0, length = _this.languageOptionsCn.length; n < length; n++) {
        if (_this.languageOptionsCn[n].code === _this.$store.state.language) {
          _this.language = _this.languageOptionsCn[n].content
          break
        }
      }

      if(this.$store.state.platform === 21){
        for (let n = 0, length = _this.coinOptionsCn.length; n < length; n++) {
          if (_this.coinOptionsCn[n].code === _this.$store.state.coin) {
            _this.coin = _this.coinOptionsCn[n].code
            break
          }
        }
      } else if(this.$store.state.platform === 41){
        for (let n = 0, length = _this.coinOptionsTw.length; n < length; n++) {
          if (_this.coinOptionsTw[n].code === _this.$store.state.coin) {
            _this.coin = _this.coinOptionsTw[n].code
            break
          }
        }
      } else {
        for (let n = 0, length = _this.coinOptions.length; n < length; n++) {
          if (_this.coinOptions[n].code === _this.$store.state.coin) {
            _this.coin = _this.coinOptions[n].code
            break
          }
        }
      }
    })
  },
  methods: {
    chooseLanguage(val) {
      
      // this.$refs['language-tap'].show()
    },
    // changeLanguage(data) {
    //   this.language = data.index
    // },
    chooseCoin() {
      // this.$refs.coinTap.show()
    },
    changeCoin(data) {
      this.coin = data.index
    },
    changePage(lang,coin) {
      // this.$toast('根据所选切换站点货币')
      /**
       * 设置语言和货币
       */
      if(this.language == '中文简体'){
        this.langs = 'zh_CN'
      }
      if(this.language == '繁體中文'){
        this.langs = 'zh_TW'
      }
      if(this.language == 'English'){
        this.langs = 'en_US'
      }
      this.$store.commit('setLanguage',this.langs)
      this.$store.commit('setCoin',this.coin)
      // this.$store.commit('setLanguage', val)
      setTimeout(() => {
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
    input{
      width: 100%;
      height: 100%;
      line-height: 38px;
      text-align: left;
      background: #f8f8f8;
      -webkit-appearance: none;
      border: 0;
      padding: 0 0 0 13px;
      margin: 0;
      outline: 0;
      color: #999999;
    }
    select{
      color: #999999;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      font-size: inherit;
      -webkit-appearance: none;
      border: 0;
      outline: 0;
      padding: 0;
      margin: 0;
      resize: none;
      border-radius: 0;
      background: none;
      padding-left: 12px;
      // option{
      //   padding-left: 10px;
      // }
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
