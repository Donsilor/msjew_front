<template>
  <div class="page">
    <div class="top-bar">
      <div class="go-back-btn" @click="goBack($router)">
        <i class="iconfont iconfanhuiicon-"></i>
        <span class="text">{{ lang.back }}</span>
      </div>
      <div class="operating-area">
        <i class="iconfont iconicon-sousuo"></i>
        <input
          v-model="keyword"
          :placeholder="lang.inputKeyword"
          @keyup.enter="search(keyword)"
        />
        <button class="search-btn" @click="search(keyword)">
          {{ lang.search }}
        </button>
      </div>
    </div>
    <div class="recommend">
      <section v-if="hotSearch" class="keyword-box">
        <div class="box-title">{{ lang.hotRecommend }}</div>
        <div v-if="hotSearch.length > 0" class="list">
          <div v-for="(earch, n) in hotSearch" :key="n" class="item">
            <span class="icon">
              <i class="iconfont icongerenzhongxin_xinyuandan hot-icon"></i>
            </span>
            <span class="text" @click="search(earch.keyword)">
              {{ earch.keyword }}
            </span>
          </div>
        </div>
        <div v-if="hotSearch.length === 0" class="no-data">
          {{ lang.noHotRecommend }}
        </div>
      </section>
      <section v-if="historySearch" class="keyword-box">
        <div class="box-title">{{ lang.history }}</div>
        <div v-if="historySearch.length > 0" class="list">
          <div v-for="(earch, n) in historySearch" :key="n" class="item">
            <span class="icon">
              <i class="iconfont iconxialajiazaigengduo history-icon"></i>
            </span>
            <span class="text" @click="search(earch.keyword)">
              {{ earch.keyword }}
            </span>
          </div>
        </div>
        <div v-if="historySearch.length === 0" class="no-data">
          {{ lang.noResult }}
        </div>
      </section>
      <div
        v-if="historySearch && historySearch.length > 0"
        class="clean-history"
      >
        <span @click="cleanSearchHistory">{{ lang.cleanHistory }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.search.index,
      hotSearch: null,
      historySearch: null,
      keyword: ''
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getSearchKeyword()
    })
  },
  methods: {
    dealOnlineData(data) {
      data = data || []
      data = data.map(item => {
        return { keyword: item }
      })
      return data
    },
    getSearchKeyword() {
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: '/wap/goods/getSearchKeyword'
        })
        .then(data => {
          // data = {
          //   searchHistory: null,
          //   searchHotword: ['王者荣耀', '88889', '朱昌杰']
          // }
          _this.hotSearch = _this.dealOnlineData(data.searchHotword)
          if (this.$store.getters.hadLogin) {
            _this.historySearch = _this.dealOnlineData(data.searchHistory)
          }
        })
        .catch(err => {
          console.error(err)
        })

      if (!this.$store.getters.hadLogin) {
        // 读取本地历史记录
        _this.$store
          .dispatch('getLocalSearchHistory')
          .then(data => {
            console.log('data====>', data)
            _this.historySearch = data
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    cleanSearchHistory() {
      const _this = this
      const clean = () => {
        _this.historySearch = []
        _this.$toast(_this.lang.cleanHistory)
      }

      if (this.$store.getters.hadLogin) {
        _this
          .$axios({
            method: 'post',
            url: '/wap/goods/deleteSearchHistory'
          })
          .then(data => {
            clean()
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        _this.$store
          .dispatch('cleanLocalSearchHistory')
          .then(data => {
            clean()
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    search(keyword = '') {
      if (!keyword) {
        if (!this.keyword) {
          this.$toast(this.lang.inputKeywordPlease)
          return
        }
        keyword = this.keyword
      }

      this.$router.push({
        name: 'search-result',
        query: {
          keyword: keyword
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: rgba(245, 245, 245, 1);
}
.top-bar {
  padding: 7px 12px 6px 15px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;

  .go-back-btn {
    margin-right: 21px;
    white-space: nowrap;
    display: flex;
    align-items: center;

    .iconfanhuiicon- {
      font-size: 11px;
      color: rgba(102, 102, 102, 1);
    }
    .text {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .operating-area {
    height: 32px;
    background: rgba(245, 245, 245, 1);
    border-radius: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;

    .iconfont {
      margin: 0 6px 0 12px;
      font-size: 13px;
      color: rgba(187, 187, 187, 1);
    }
    input {
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 14px;
      font-weight: 400;
      padding-top: 3px;
      &::-webkit-input-placeholder {
        color: rgba(187, 187, 187, 1);
      }
    }
    .search-btn {
      width: 60px;
      height: 100%;
      background: rgba(242, 155, 135, 1);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.recommend {
  background-color: #ffffff;

  .keyword-box {
    padding: 0 15px;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    box-sizing: border-box;

    .box-title {
      padding: 14px 0 21px 0;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      text-align: left;
    }
    .item {
      margin-bottom: 27px;
      display: flex;
      align-items: center;

      &:nth-last-of-type(1) {
        margin-bottom: 22px;
      }

      .icon {
        width: 23px;
        flex-grow: 0;
        flex-shrink: 0;
        text-align: left;

        .hot-icon {
          font-size: 12px;
          color: #f29b87;
        }
        .history-icon {
          font-size: 13px;
          color: #666666;
        }
      }
      .text {
        flex-grow: 1;
        flex-shrink: 1;
        text-align: left;
        font-size: 15px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .no-data {
      margin-bottom: 27px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .clean-history {
    height: 40px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
