<template>
  <div class="page-content" v-loading="loading">
    <section class="crumbs">{{ $t(`${lang}.homePage`) }} > {{ $t(`${lang}.result`) }}</section>
    <section class="search-keyword">
      <input
        v-model.trim="keyword"
        class="keyword-input"
        :placeholder="$t(`${lang}.keywordPlaceholder`)"
        @keyup.enter="toSearch"
        ref = "k_input"
      />
      <button class="search-btn" @click="toSearch">
        {{ $t(`${lang}.search`) }}
      </button>
    </section>
    <section class="sort">
      <div class="sort-type">
        <div class="using-type">
          <span class="type-name">
            {{ $t(`${lang}.sort`) }}
          </span>
          <i class="iconfont iconxiala"></i>
        </div>
        <ul class="type-list">
          <li
            v-for="(item, index) in sortOptions"
            :key="index"
            :class="['type-item', { active: index === sortTypeIndex }]"
            @click="changeSort(index)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </section>
    <section class="list-content" >
      <div class="list-data">
        <div
          v-for="(item, index) in showingData"
          :key="index"
          :class="['data-item', item.itemType]"
        >
          <!--          商品数据-->
          <div v-if="item.itemType === 'product'" class="product-content">
            <nuxt-link :to="item.to" target="_blank">
              <div class="product-image">
                <img class="main-image" :src="item.goodsImages[0]" />
                <img
                  class="sub-image"
                  :src="item.goodsImages[1] || item.goodsImages[0]"
                />
                <!-- <div class="wish-state">
                  <i
                    v-if="inWish(item.id)"
                    class="iconfont iconxin"
                    @click.stop.prevent="setWish(item.id)"
                  ></i>
                  <i
                    v-else
                    class="iconfont iconkongxin"
                    @click.stop.prevent="setWish(item.id)"
                  ></i>
                </div> -->

                <!-- 折扣 -->
                <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'discount'">
                  <span>{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
                </div>

                <!-- 优惠券 -->
                <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'money'">
                  <span>{{ $t(`${lang}.discounts1`) }}</span>
                </div>

              </div>
              </nuxt-link>
            <div class="product-info">
              <div class="product-price">
               <div v-if="couponType(item.coupon) !== 'discount'">
                  <span class="coin">{{ formatCoin(item.coinType) }}</span>
                  <span class="price">{{ formatNumber(item.salePrice) }}</span>
                </div>

                <!-- 折扣 -->
                <div class="list-discount-price" v-if="couponType(item.coupon) == 'discount'">
                  <div>
                    <span class="coin">{{ formatCoin(item.coinType) }}</span>
                    <span class="price">{{ formatNumber(item.salePrice) }}</span>
                  </div>
                  <div>
                    <span class="coin">{{ formatCoin(item.coinType) }}</span>
                    <span class="price">{{ formatNumber(item.coupon.discount.price) }}</span>
                  </div>
                </div>
              </div>

              <div class="product-title">
                <!-- 优惠券 -->
                <span class="list-discount-icon2 padding" v-if="couponType(item.coupon) == 'money'">￥</span>
                <!-- 折扣 -->
                <span class="list-discount-icon2" v-if="couponType(item.coupon) == 'discount'">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
                {{ item.goodsName }}
              </div>
            </div>
          </div>
          <!--          广告数据-->
          <div v-else class="ad-content">
            <el-carousel height="480px">
              <el-carousel-item
                v-for="(ad, adIndex) in item.advertImgModelList"
                :key="adIndex"
              >
                <div class="ad-image">
                  <img :src="ad.image[0]" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div v-show="showNextPageButton" class="more-list-data">
        <!-- <button
          v-loading="requestingListData"
          class="check-more"
          @click="getNextPage"
        >
          {{ $t('common.getMore') }}
        </button> -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <no-more-data v-show="this.allData.length == 0 && this.loading == false" :dataVal = "1" @changeFn = "changeFng()"></no-more-data>
      <!-- <bdd-empty v-show="noListData" type="search"></bdd-empty> -->
    </section>
  </div>
</template>

<script>
import Axios from 'axios'
import List from '@/mixins/list.js'
import Operate from '@/mixins/operate.js'
const CancelToken = Axios.CancelToken
const lang = 'search'
export default {
  head() {
    return this.seo || {}
  },
  props:['seo'],
  mixins: [List, Operate],
  data() {
    return {
      lang,
      listMethod: 'get',
      listUrl: '/web/common/search/index',
      sortOptions: this.CONDITION_INFO.sortBy.search,
      sortTypeIndex: 0,
      page_size: 16,
      keyword: '',
      loading: true,
      language: this.$store.state.language
      // noMoreListData: false
    }
  },
  computed: {
    // 列表特定body参数
    specialParams() {
      const sortInfo = this.usingSortInfo

      const data = {
        timeSock: new Date().getTime(),
        goodsId: '',
        categoryId: '',
        text: this.keyword,

        // // 排序字段名
        // orderParam: sortInfo.sortBy,
        sortType: sortInfo.sortType,
        // 每页显示数量
        page_size: this.page_size,

        page: this.nextCurrPageNum
      }
      return data
    },
    // 处理用于显示的数据
    showingData() {
      console.log("加载状态",this.allData)
      // if(this.allData.length == 0){
      //   this.loading = true
      //   setTimeout(() => {
      //     this.loading = false
      //   }, 1000);
      // }else if(this.allData.length > 0){
      //   this.loading = false
      // }
      const _this = this
      const allData = JSON.parse(JSON.stringify(_this.allData))
      let adNum = 1
      allData.forEach(item => {
        if (item.hasOwnProperty('dsName')) {
          // 广告
          item.itemType = adNum % 2 === 1 ? 'ad-short' : 'ad-long'
          if (
            item.advertImgModelList &&
            Array.isArray(item.advertImgModelList)
          ) {
            item.advertImgModelList.forEach(ad => {
              ad.image = _this.imageStrToArray(ad.image)
            })
          } else {
            item.advertImgModelList = [
              {
                addres: '',
                id: item.id,
                image: _this.imageStrToArray(item.dsImg),
                tbAdvertId: ''
              }
            ]
          }
          adNum++
        } else {
          item.itemType = 'product'
          item.goodsImages = _this.imageStrToArray(item.goodsImages)
          if(item.categoryId == 2){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/wedding-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'single'
              }
            }
          }else if(item.categoryId == 12){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/engagement-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'engagement'
              }
            }

          }else if(item.categoryId == 19){  //对戒
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/wedding-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'pair'
              }
            }
          }else if(item.categoryId == 20){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/diamond-details/'+ item.id,
              query: {
                goodId: item.id
              }
            }

          }else{
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/jewellery/necklace/'+ item.id,
              query: {
                goodId: item.id
              }
            }
          }

        }
      })
      return allData
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
  mounted() {
    // if(this.allData.length == 0){
    //   this.loading = true
    //   setTimeout(() => {
    //     this.loading = false
    //   }, 1000);
    // }else if(this.allData.length > 0){
    //   this.loading = false
    // }
    const _this = this
    _this.$nextTick(() => {
      _this.keyword = _this.$helpers.base64Decode(
        _this.$route.query.keyword || ''
      )
      _this.research()
    })
    
    // this.language = this.getCookie('language')
  },
  methods: {
    toSearch() {
      // console.log("this.allData",this.allData)
      if(this.allData.length == 0){
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000);
      }else if(this.allData.length > 0){
        this.loading = false
      }
      this.$router.replace({
        path: '/search',
        query: {
          keyword: this.$helpers.base64Encode(this.keyword)
        }
      })

    },
    // 请求当前页数据
    getPageInfo(page = this.page) {
      const _this = this
      _this.loading = true
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$errorMessage('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${page}`
      // const reqMark = `${page}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        data: {
          page
        }
      }

      //console.log(`请求页码为：${page}`)

      _this
        .$axios({
          method: _this.listMethod,
          url: _this.listUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: Object.assign(options.params || {}, _this.specialParams),
          data: Object.assign(options.data || {}, _this.specialDatas),
          transformRequest: [
            function(data) {
              let ret = ''
              for (const it in data) {
                // 过滤空元素
                if (data[it] === '' || data[it] === null) {
                  continue
                }
                ret +=
                  encodeURIComponent(it) +
                  '=' +
                  encodeURIComponent(data[it]) +
                  '&'
              }
              return ret
            }
          ],
          cancelToken: options.cancelToken
        })
        .then(data => {
          // this.loading = false
          if(!data){
            console.log("没数据，未响应，请求失败")
            _this.loading = true
            // setTimeout(() => {
            //   this.loading = false
            // }, 1000);
          }else{
            console.log("有数据")
            _this.loading = false
          }
          var data = data.data
          if (data.data) {
            _this.listData[page] = JSON.parse(JSON.stringify(data.data))
          }
          // _this.listData[page] = JSON.parse(JSON.stringify(data.list || []))
          delete data.data
          _this.setPageInfo(data)
          _this.removeRequesting(reqMark)
        })
        .catch(err => {
          console.error(err)
          _this.loading = false
          if (err instanceof Error) {
            console.log('这是一个错误')
          } else {
            console.log('这是一个错误数据')
          }
          _this.removeRequesting(reqMark)
        })
    },
    changeFng(){
      this.keyword = '';
      this.$refs.k_input.focus()
    }
  }
}
</script>

<style lang="less" scoped>
.search-keyword {
  display: flex;
  align-items: center;
  justify-content: center;

  .keyword-input {
    margin-right: 18px;
    height: 32px;
    line-height: 32px;
    width: 500px;
    border: 1px solid #ddd;
    text-indent: 7px;
    font-size: 14px;
    outline: none;
    transition: all 0.2s linear;

    &:focus {
      border: 1px solid #c1aaa0;
    }
  }
  .search-btn {
    width: 125px;
    height: 32px;
    background: #c1aaa0;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    text-align: center;
  }
}
.page-content {
  min-width: 1200px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 0;
}

.crumbs{
  margin: -16px 0 20px;
  font-size: 12px;
  color: #333;
}
</style>
<style lang="less">
// 修改elementUI分页组件的样式
.page-content{
  .el-pagination__sizes{
    display: none!important;
  }
  .el-dialog, .el-pager li{
    background: none;
  }
  .el-pagination button, .el-pagination span:not([class*=suffix]){
    font-size:16px;
    height: 37px!important;
    line-height: 37px;
  }

  .el-pager, .el-pager li{
    font-size: 16px;
  }
  .el-pager {
    height: 37px!important;
    padding: 5px 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    list-style: none;
    font-size: 0;
  }
  .el-pager li.active {
    color: #fff;
    border-radius: 50%;
    cursor: default;
    background: #c1aaa0!important;
  }
  .el-pager li {
    padding: 0 4px;
    font-size: 13px;
    min-width: 28.5px;
    margin: 0 5px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 20px;
  }
  .el-pagination__editor.el-input .el-input__inner{
    height: 28px;
  }
  .el-pagination button:disabled{
    background-color: #f4f2f3;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
    background-color: #f4f2f3;
  }
  .el-pager li:hover{
    color:#c1aaa0;
  }
  .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
    font-size:20px;
  }
  .el-pager .active:hover{
    color: #fff!important;
  }
}
</style>
