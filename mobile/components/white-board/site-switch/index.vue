<template>
  <layout :show="active" @onClose="changePage">
    <template slot="content">
      <div class="content-box">
        <h2 class="title">{{ lang.chooseLanguageCoin }}</h2>
        <div class="select-line" @click="chooseLanguage">
          <div class="line-icon">
            <i class="iconfont icon_xuanzeyuyanhuobi"></i>
          </div>
          <div class="line-text">
            <span>{{ languageText }}</span>
          </div>
          <div class="select-icon">
            <i class="iconfont iconkuozhan"></i>
          </div>
        </div>
        <div class="select-line" @click="chooseCoin">
          <div class="line-icon">
            <i class="iconfont iconhuobi"></i>
          </div>
          <div class="line-text">
            <span>{{ coinText }}</span>
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
    <template slot="other">
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
    </template>
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
  mounted() {},
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
      this.$emit('finish', {
        coinCode: this.coinCode,
        coinText: this.coinText,
        languageCode: this.languageCode,
        languageText: this.languageText
      })
      this.hide()
      setTimeout(() => {
        location.reload()
      }, 0)
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
