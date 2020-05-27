<template>
<!-- @onClose="changePage" -->
  <layout :show="active" @onClose="close">
    <template slot="content">
      <div class="content-box">
        <h2 class="title">{{ lang.chooseLanguageCoin }}</h2>
        <div class="select-line" @click="chooseLanguage">
          <div class="line-icon">
            <i class="iconfont icon_xuanzeyuyanhuobi"></i>
          </div>
          <div v-if="this.$store.state.platform == 31" class="line-text">
            <input :value="languages" type="text" disabled/>
          </div>
          <div v-else class="line-text">
            <!-- <span>{{ languageText }}</span> -->
            <input :value="language" type="text" />
            <select name="" id="" v-model="language">
              <option v-for="(p, index) in languageOptions" :key="index" :value="p.content">
                {{p.content}}
              </option>
            </select>
          </div>
          <div class="select-icon" v-show="this.$store.state.platform !== 31">
            <i class="iconfont iconkuozhan"></i>
          </div>
        </div>
        <div v-if="this.$store.state.platform === 21" class="select-line" @click="chooseCoin">
          <div class="line-icon">
            <i class="iconfont iconhuobi"></i>
          </div>
          <div class="line-text">
            <input :value="coin" type="text" />
            <select name="" id="" v-model="coin">
              <option v-for="(p, index) in coinOptionsCn" :key="index" :value="p.code">
                {{p.content}}
              </option>
            </select>
          </div>
          <div class="select-icon">
            <i class="iconfont iconkuozhan"></i>
          </div>
        </div>
        <div v-else class="select-line" @click="chooseCoin">
          <div class="line-icon">
            <i class="iconfont iconhuobi"></i>
          </div>
          <div class="line-text">
            <input :value="coin" type="text" />
            <select name="" id="" v-model="coin">
              <option v-for="(p, index) in coinOptions" :key="index" :value="p.code">
                {{p.content}}
              </option>
            </select>
          </div>
          <div class="select-icon">
            <i class="iconfont iconkuozhan"></i>
          </div>
        </div>
        <button class="clear-btn" @click="changePage">
          {{ lang.clear }}
        </button>
      </div>
    </template>
    <!-- <template slot="other">
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
    </template> -->
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  mixins: [Mixins],
  data() {
    return {
      lang: this.LANGUAGE.components.whiteBoard,
      language: 0,
      coin: 0,
      languageOptions: this.$bddDefinition.languageOptions,
      coinOptions: this.$bddDefinition.coinOptions,
      coinOptionsCn: this.$bddDefinition.coinOptionsCn,
      langs:'',
      languages:'English'
    }
  },
  computed: {
    languageText() {
      return this.languageOptions[this.language].content
    },
    coinText() {
      if(this.$store.state.platform === 21){
        return this.coinOptionsCn[this.coin].content
      } else {
        return this.coinOptions[this.coin].content
      }
    },
    languageCode() {
      return this.languageOptions[this.language].code
    },
    coinCode() {
      if(this.$store.state.platform === 21){
        return this.coinOptionsCn[this.coin].code
      } else {
        return this.coinOptions[this.coin].code
      }
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      for (let n = 0, length = _this.languageOptions.length; n < length; n++) {
        if (_this.languageOptions[n].code === _this.$store.state.language) {
          _this.language = _this.languageOptions[n].content
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
    chooseLanguage() {
      // this.$refs['language-tap'].show()
    },
    changeLanguage(data) {
      this.language = data.index
    },
    chooseCoin() {
      // this.$refs.coinTap.show()
    },
    changeCoin(data) {
      this.coin = data.index
    },
    changePage() {
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
      // this.$emit('finish', {
      //   coinCode: this.coinCode,
      //   coinText: this.coinText,
      //   languageCode: this.languageCode,
      //   languageText: this.languageText
      // })
      this.hide()
      setTimeout(() => {
        location.reload()
      }, 0)
    },
    // 关闭切换语言弹窗
    close(){
      this.hide()
    }
  }
}
</script>

<style scoped lang="less">
.content-box {
  padding: 36px 33px 29px 33px;
  box-sizing: border-box;
}
.title {
  margin-bottom: 22px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.select-line {
  position: relative;
  margin-bottom: 19px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(249, 249, 249, 1);
  border: 0 solid rgba(187, 187, 187, 1);
  border-radius: 5px;

  display: flex;
  align-items: center;

  &:nth-last-of-type(1) {
    margin-bottom: 28px;
  }

  .line-icon {
    flex-shrink: 0;
    flex-grow: 0;
    width: 30px;
    padding: 0 5px;
    .iconfont {
      font-size: 17px;
    }
    .icon_xuanzeyuyanhuobi {
      color: #d72923;
    }
    .iconhuobi {
      color: #deb159;
    }
  }
  .line-text {
    flex-shrink: 1;
    flex-grow: 1;
    min-width: 0;
    padding: 0 5px;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    
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
        
      // }
    }
  }
  .select-icon {
    flex-shrink: 0;
    flex-grow: 0;
    width: 20px;
    padding: 0 5px;
    .iconfont {
      font-size: 17px;
      color: #666666;
      display: inline-block;
      transform: rotateZ(90deg);
    }
  }
}
.clear-btn {
  width: 100%;
  padding: 13px;
  font-size: 16px;
  font-weight: 400;
  /*letter-spacing: 16px;*/
  color: rgba(255, 255, 255, 1);
  background: rgba(51, 51, 51, 1);
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
