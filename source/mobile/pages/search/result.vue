<template>
  <div class="page">
    <scroll-box @arrivalBottom="getNextPage">
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
            @keyup.enter="searchAgain"
          />
          <button class="search-btn" @click="searchAgain">
            {{ lang.search }}
          </button>
        </div>
      </div>
      <!--    list start-->
      <div class="list-part">
        <div class="title">
          <div>
            {{ lang.total }}
            <span>{{ (pageInfo && pageInfo.totalCount) || 0 }}</span>
            {{ lang.goods }}
          </div>
          <div @click="showSwiperTap">
            <span>{{ conditionWord }}</span
            ><i class="iconfont iconshaixuan" />
          </div>
        </div>
        <div v-if="!noListData" class="list">
          <div v-for="(each, n) in showData" :key="n" @click="toDetail(each)">
            <div class="info-image">
              <img
                :src="imageStrToArray(each.goodsImages)[0] || '/luanlai.jpg'"
                :alt="each.goodsName"
                @error="imageError"
              />
            </div>
            <div class="info-title ow-h2">
              {{ each.goodsName }}
            </div>
            <div class="info-price">
              {{ each.coinType }} {{ formatNumber(each.salePrice) }}
            </div>
          </div>
        </div>
        <bdd-empty
          v-if="noListData"
          :type="'search'"
          @searchAgain="goBack($router)"
        ></bdd-empty>
        <requesting v-if="requestingListData"></requesting>
        <!--        <no-more-data v-if="noMoreListData"></no-more-data>-->
        <footer-bar v-if="noMoreListData"></footer-bar>
      </div>
    </scroll-box>
    <swiper-tap ref="suitability" @clear="getSortBy"></swiper-tap>
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-list-props.js'
export default {
  layout: 'no-bar',
  mixins: [List, GoodListProps],
  data() {
    return {
      lang: this.LANGUAGE.search.result,
      // canSearchWithoutKeyword: false,
      similarGoodsId: '',
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content
    }
  },
  computed: {
    // 列表特定query参数
    specialParams() {
      return {
        categoryId: this.categoryId,
        similarGoodsId: this.similarGoodsId
      }
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      if (_this.$route.query) {
        _this.keyword = _this.$route.query.keyword || ''
        _this.categoryId = _this.$route.query.categoryId || ''
        _this.similarGoodsId = _this.$route.query.similarGoodsId || ''
      }
      _this.searchAgain()
    })
  },
  methods: {
    showSwiperTap() {
      this.$refs.suitability.show()
    },
    searchAgain() {
      console.log('点击了重新搜索')
      this.$router.replace({
        name: 'search-result',
        query: {
          keyword: this.keyword,
          categoryId: this.categoryId,
          similarGoodsId: this.similarGoodsId
        }
      })
      if (!this.$store.getters.hadLogin) {
        console.log('this.keyword=====>', this.keyword)
        this.$store.dispatch('addLocalSearchHistory', this.keyword)
      }
      this.research()
    },
    toDetail(info) {
      let routerName = ''

      switch (info.categoryId) {
        case 1:
          // 钻石
          routerName = 'diamond-diamonds'
          break
        case 2:
          // 戒指
          if (info.ringId) {
            // 对戒
            routerName = 'marriage-ring-pair-ring-detail'
          } else {
            // 单个戒指
            routerName = 'engagement-engagement-rings'
          }
          break
        case 3:
          // 珠宝饰品
          routerName = 'accessories-accessories'
          break
        case 4:
          // 项链
          routerName = 'accessories-accessories'
          break
        case 5:
          // 吊坠
          routerName = 'accessories-accessories'
          break
        case 6:
          // 耳钉
          routerName = 'accessories-accessories'
          break
        case 7:
          // 耳环
          routerName = 'accessories-accessories'
          break
        case 8:
          // 手链
          routerName = 'accessories-accessories'
          break
        case 9:
          // 手镯
          routerName = 'accessories-accessories'
          break
      }

      this.$router.push({
        name: routerName,
        query: {
          goodId: info.goodsId || info.id,
          ringId: info.ringId
        }
      })
    },
    getSortBy(val) {
      this.conditionWord = val.item.content
      this.sortType = val.item.sortType
      this.sortBy = val.item.sortBy
      this.searchAgain()
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
.list-part {
  @listPart();
}
</style>
