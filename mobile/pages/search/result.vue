<template>
  <div class="page" >
    <scroll-box @arrivalBottom="getNextPage">
      <div class="top-bar">
        <div class="go-back-btn" @click="goBackto">
          <i class="iconfont iconfanhuiicon-"></i>
          <!-- <span class="text">{{ lang.back }}</span> -->
        </div>
        <div class="operating-area">

          <input
            v-model.trim="keyword"
            :placeholder="lang.inputKeyword"
            @keyup.enter="searchAgain"
          />
          <img v-show="this.keyword !== ''" class="cha" src="/component/tip-message/cha.png" @click="clear">
          <span class="gap-line" ></span>
          <i class="iconfont iconicon-sousuo" @click="searchAgain"></i>
          <!-- <button class="search-btn" @click="searchAgain">
            {{ lang.search }}
          </button> -->
        </div>
        <span class="cancel" @click="goBackto">
          {{ lang.cancel }}
        </span>
      </div>
      <!--    list start v-show="this.loading == false"-->
      <div class="list-part" >
        <div class="title" v-show="pageInfo && pageInfo.total_count">
          <div>
            {{ lang.total }}
            <span>{{ (pageInfo && pageInfo.total_count) || 0 }}</span>
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

              <!-- 折扣 -->
              <div class="discount-a-icon" v-if="couponType(each.coupon) == 'discount'">
                <div>{{ language == 'en_US' ? each.coupon.discount.discount+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
              </div>

              <!-- 优惠券 -->
              <div class="discount-a-icon" v-if="couponType(each.coupon) == 'money'">
                <div>{{ lang.discounts1 }}</div>
              </div>

            </div>

            <!-- 折扣 -->
            <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'discount'">
              <span class="discount-a-icon2">{{ language == 'en_US' ? each.coupon.discount.discount+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
              {{ each.goodsName }}
            </div>

            <!-- 优惠券 -->
            <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'money'">
              <span class="discount-b-icon2">￥</span>
              {{ each.goodsName }}
            </div>

            <div class="product-price">
              <div class="list-discount-price" v-if="couponType(each.coupon) !== 'discount'">
                <div class="info-price">
                  <span class="coin">{{ each.coinType }}</span>
                  <span class="price">{{ formatNumber(each.salePrice) }}</span>
                </div>
              </div>
            
              <!-- 折扣 -->
              <div class="list-discount-price" v-if="couponType(each.coupon) == 'discount'">
                <div class="info-price old-price-2">
                  <span class="coin">{{ each.coinType }}</span>
                  <span class="price">{{ formatNumber(each.salePrice) }}</span>
                </div>
                <div class="info-price">
                  <span class="coin">{{ each.coinType }}</span>
                  <span class="price">{{ formatNumber(each.coupon.discount.price) }}</span>
                </div>
              </div>
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
import GoodListProps from '@/mixins/good-search-list-props.js'
export default {
  layout: 'no-bar',
  mixins: [List, GoodListProps],
  data() {
    return {
      lang: this.LANGUAGE.search.result,
      // canSearchWithoutKeyword: false,
      similarGoodsId: '',
      conditionWord: this.CONDITION_INFO.sortBy.default[0].content,
      language: ''
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
 watch: {
    // 每次切换路由，滚动到顶部
    $route(val, oldVal) {
      const _this = this
        _this.keyword = _this.$helpers.base64Decode(
        _this.$route.query.keyword || ''
      )
      _this.research()
    }
  },
  mounted(){
    const _this = this
    _this.$nextTick(() => {
      if (_this.$route.query) {
        _this.keyword = _this.$helpers.base64Decode(
          _this.$route.query.keyword || ''
        )
      }

      // if(_this.pageInfo && _this.pageInfo.total_count){
      //   _this.searchAgain()
      // }
      _this.searchAgain()
    })

    this.language = this.getCookie('language')
  },
  methods: {
    show(){
      const _this = this
      if(_this.$route.query.keyword !== ''){
        _this.$nuxt.$loading.start()
        if(_this.pageInfo && _this.pageInfo.total_count){
          _this.$nuxt.$loading.finish()
        }
        // setTimeout(() => {
        //   _this.$nuxt.$loading.finish()
        // }, 1000);
      }
    },
    clear(){
      this.keyword= ''
    },
    showSwiperTap() {
      this.$refs.suitability.show()
    },
    searchAgain() {
      // console.log(this.pageInfo,this.pageInfo.total_count)
      const _this = this
      _this.$nuxt.$loading.start()
      // if(_this.pageInfo && _this.pageInfo.total_count){
      //   console.log(this.pageInfo,this.pageInfo.total_count)
      //   _this.$nuxt.$loading.finish()
      // }
      // setTimeout(() => {
      //   _this.$nuxt.$loading.finish()
      // }, 1000);
      // console.log('点击了重新搜索')
      this.$router.replace({
        name: 'search-result',
        query: {
          keyword: this.$helpers.base64Encode(this.keyword),
        }
      })
      if (!this.$store.getters.hadLogin) {
        // console.log('this.keyword=====>', this.keyword)
        this.$store.dispatch('addLocalSearchHistory', this.keyword)
      }
      this.research()

    },
    toDetail(info) {
      let routerName = ''
      switch (info.categoryId) {
        case 15:
          // 钻石
          routerName = 'diamond-diamonds'
          break
        case 2:
          // 戒指
          routerName = 'marriage-ring-single-ring-detail'
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
        case 12:
          routerName = 'engagement-engagement-rings'
          break
        // 对戒
        case -1:
          routerName = 'marriage-ring-pair-ring-detail'
          break
      }

      if(info.categoryId == 2){
          this.$router.push({
            name: routerName,
            query: {
              goodId: info.goodsId || info.id,
              ringType : 'single'
            }
          })
      }else if(info.categoryId == -1){
        this.$router.push({
          name: routerName,
          query: {
            goodId: info.goodsId || info.id,
            ringType : 'pair'
          }
        })
      }else{
        this.$router.push({
          name: routerName,
          query: {
            goodId: info.goodsId || info.id,
          }
        })
      }

    },
    getSortBy(val) {
      this.conditionWord = val.item.content
      this.sortType = val.item.sortType
      this.sortBy = val.item.sortBy
      this.searchAgain()
    },
    goBackto(){
      this.$router.go(-2)
    }
  }
}
</script>

<style lang="less" scoped>
.loading{
  opacity: 0.6;
}
.page {
  width: 100vw;
  height: 100vh;
  background: rgba(245, 245, 245, 1);
}
.top-bar {
  padding: 7px 12px 6px 15px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  // background-color: #ffffff;
  background-color: #cedee6;
  display: flex;
  align-items: center;
  .cancel{
    margin: 0 10px 0 15px;
    font-size: 16px;
    cursor: pointer;
  }
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
  .cha{
      width: 17px;
      height: 16px;
      font-weight: 600;
      box-sizing: border-box;
    }
    .gap-line{
      margin: 0 0px 0 10px;
      width: 1px;
      height: 16px;
      font-size: 12px;
      background-color: #a2c2d2;
    }
  .operating-area {
    height: 32px;
    background: rgba(245, 245, 245, 1);
    border-radius: 25px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;

    .iconfont {
       margin: 0 15px 0 10px;
      font-size: 18px;
      color: #333333;
      font-weight: 600;
    }
    input {
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 14px;
      font-weight: 400;
      // padding-top: 3px;
      padding-left: 10px;
      &::-webkit-input-placeholder {
        // color: rgba(187, 187, 187, 1);
         color: #cedee6;
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
