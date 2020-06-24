<template>
  <div class="page-content" v-loading="loading">
    <section class="search-condition">
      <!--      款式-->
      <div class="condition-item condition-style">
        <h2 class="condition-name">
          {{ $t(`${lang}.style`) }}
        </h2>
        <ul class="options">
          <li
            v-for="(option, index) in styleOptions"
            :key="index"
            :class="[
              'option-item',
              { active: option.id === searchConditions.style }
            ]"
            @click="changeStyle(option.id)"
          >
            <div class="item-icon">
              <img :src="option.image" />
            </div>
            <div class="item-name">
              {{ option.name }}
            </div>
          </li>
        </ul>
      </div>
      <!--      材質条件-->
      <div class="condition-item condition-material">
        <h2 class="condition-name">
          {{ $t(`${lang}.color`) }}
        </h2>
        <ul class="options">
          <li
            :class="[
              'option-item',
              { active: '' === searchConditions.material }
            ]"
            @click="changeMaterial('')"
          >
            <div class="item-icon">
              <img src="/ring-material/all.png" />
            </div>
            <div class="item-name">
              {{ $t(`${lang}.allColor`) }}
            </div>
          </li>
          <li
            v-for="(option, index) in materialOptions"
            :key="index"
            :class="[
              'option-item',
              { active: option.id === searchConditions.material }
            ]"
            @click="changeMaterial(option.id)"
          >
            <div class="item-icon">
              <img :src="option.image" />
            </div>
            <div class="item-name">
              {{ option.name }}
            </div>
          </li>
        </ul>
      </div>
      <!--      价格区间选择-->
      <div class="condition-item range-slider condition-price">
        <h2 class="condition-name">
          {{ $t(`${lang}.price`) }}
        </h2>
        <div class="operate-area">
          <div class="range">
            <div class="range-input min-range">
              <span class="coin">{{ formatCoin(coinType) }}</span>
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.priceRange[0]) }}</span>
                <input
                  v-model="searchConditions.priceRange[0]"
                  :min="defaultPriceRange[0]"
                  :max="searchConditions.priceRange[1]"
                  @keydown.enter="changePriceRange(searchConditions.priceRange)"
                  @blur="changePriceRange(searchConditions.priceRange)"
                />
              </div>
            </div>
            <span class="to">
              {{ $t(`${lang}.to`) }}
            </span>
            <div class="range-input max-range">
              <span class="coin">{{ formatCoin(coinType) }}</span>
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.priceRange[1]) }}</span>
                <input
                  v-model="searchConditions.priceRange[1]"
                  :min="searchConditions.priceRange[0]"
                  :max="defaultPriceRange[1]"
                  range
                  @keydown.enter="changePriceRange(searchConditions.priceRange)"
                  @blur="changePriceRange(searchConditions.priceRange)"
                />
              </div>
            </div>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.priceRange"
              :min="defaultPriceRange[0]"
              :max="defaultPriceRange[1]"
              range
              @change="changePriceRange(searchConditions.priceRange)"
            />
          </div>
          <div class="fast">
            <span
              v-for="(each, index) in fastPriceRanges"
              :key="index"
              class="fast-item"
              @click="changePriceRange(each)"
            >
              {{ formatMoney(each[0], 0) + '-' + formatMoney(each[1], 0) }}
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="list-title" v-show="this.loading == false">
      <h1 class="title">
        {{ $t(`${lang}.totalCountTitle`, { total_count }) }}
        <!--        {{-->
        <!--          total_count-->
        <!--            ? $t(`${lang}.totalCountTitle`, { total_count })-->
        <!--            : $t(`${lang}.title`)-->
        <!--        }}-->
      </h1>
      <h3 class="sub-title">{{ $t(`${lang}.titleDesc`) }}</h3>
    </section>
    <section class="sort">
      <div class="sort-type">
        <div class="using-type">
          <span class="type-name">{{ $t(`${lang}.sort`) }}</span>
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
    <section class="list-content">
      <div class="list-data">
        <div
          v-for="(item, index) in showingData"
          :key="index"
          :class="['data-item', item.itemType]"
        >
          <!--          商品数据-->
          <div v-if="item.itemType === 'product'" class="product-content">
            <nuxt-link :to="item.to" >
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
                    @click.stop="setWish(item.id)"
                  ></i>
                  <i
                    v-else
                    class="iconfont iconkongxin"
                    @click.stop="setWish(item.id)"
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
              <div class="product-price" v-if="couponType(item.coupon) !== 'discount'">
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
      <no-more-data v-show="this.allData.length == 0 && this.loading == false" :dataVal = "2"></no-more-data>
      <!-- <bdd-empty v-show="noListData" type="product"></bdd-empty> -->
    </section>
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import ListPage from '@/mixins/list-page.js'
import Operate from '@/mixins/operate.js'
const defaultPriceRange = [0, 300000]
const lang = 'pairRingsList'
export default {
  mixins: [List, ListPage, Operate],
  head() {
    return this.seo || {
      title: '鉆戒對戒_吊墜項鏈__男戒女戒_鉆石鉑金K金首飾_手鏈手鐲_耳釘耳飾|BDD官網',
      meta: [
        {
          name: 'title',
          content: '鉆戒對戒_吊墜項鏈__男戒女戒_鉆石鉑金K金首飾_手鏈手鐲_耳釘耳飾|BDD官網'
        },
        {
          name: 'description',
          content: 'BDD官網商品列表推出手鍊, 手鐲, 白金, 耳環, 戒指等鉆石珠寶和K金首飾圖片，裸鉆價格、鉑金價格以及K金價格介紹。'
        },
        {
          name: 'keywords',
          content: '手鍊, 手鐲, 白金, 耳環, 戒指, k金, 項鍊, 黃金, 鉑金, 鉆石'
        }
      ]
    }
  },
  props:['seo'],
  data() {
    return {
      lang,
      listUrl: '/web/goods/style/search',
      page_size: 16,
      styleOptions: this.CONDITION_INFO.style.coupleRings,
      materialOptions: this.CONDITION_INFO.quality.rings,
      defaultPriceRange,
      fastPriceRanges: [[1000, 3000], [3000, 5000], [5000, 300000]],
      searchConditions: {
        styleSex: '', // 54-款式， 26-适用人群
        style: '',
        material: '',
        priceRange: JSON.parse(JSON.stringify(defaultPriceRange))
      },
      loading: true,
      coinType:'',
	    language: this.$store.state.language
    }
  },
  computed: {
    // 列表特定body参数
    specialDatas() {
      const conditions = this.searchConditions
      const sortInfo = this.usingSortInfo
      const params = [
        // 价格区间
        {
          type: 1,
          paramName: 'sale_price',
          valueType: 2,
          beginValue: conditions.priceRange[0],
          endValue: conditions.priceRange[1]
        }
      ]

      if (conditions.style) {
        params.push({
          type: 2,
          paramId:39,
          paramName: 'ring_style',
          valueType: 1,
          configValues: conditions.style === '' ? [] : [conditions.style]
        })
      } 
      
      if (conditions.material) {
        params.push({
          type: 3,
          paramId:10,
          paramName: 'material',
          valueType: 1,
          configValues: conditions.material === '' ? [] : [conditions.material]
        })
      }

      const data = {
        advertType: 19,
        // 商品类别ID
        categoryId: 19,
        // 排序字段名
        orderParam: sortInfo.sortBy,
        // 排序类型（1:升 2:降）
        orderType: sortInfo.sortType,
        // 每页显示数量
        page_size: this.page_size,

        // 参数数组
        params

        // beginPrice: conditions.priceRange[0],
        // endPrice: conditions.priceRange[1],
        // materialValue: conditions.material,
        // styleValue: conditions.style
      }

      // 已选商品id
      if (this.$route.query.selectGoodsId) {
        data.selectGoodsId = this.$route.query.selectGoodsId
      }
      return data
    },
    // 处理用于显示的数据
    showingData() {
      // console.log("this.allData",this.allData)
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
        this.coinType = item.coinType
        if (item.hasOwnProperty('dsName')) {
          // 广告
          item.itemType = adNum % 2 === 1 ? 'ad-short' : 'ad-long'
          if (
            item.advertImgModelList &&
            Array.isArray(item.advertImgModelList)
          ) {
            item.advertImgModelList.forEach(ad => {
              ad.image = _this.imageStrToArray(ad.image || '')
            })
          } else {
            item.advertImgModelList = [
              {
                addres: '',
                id: item.id,
                image: _this.imageStrToArray(item.dsImg || ''),
                tbAdvertId: ''
              }
            ]
          }
          adNum++
        } else {
          item.itemType = 'product'
          item.ringImg = _this.imageStrToArray(item.goodsImages || '')
          item.goodsImages = item.ringImg
          item.to = {
            path: '/ring/wedding-rings/' + item.id.replace(/\//g, ''),
            query: {
              goodId: item.id,
              ringType: 'pair'
            }
          }
        }
      })
      // console.log("this.allData",allData)
      return allData
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.research()
      // console.log(location)
    })
	
	// this.language = this.getCookie('language')
  },
  methods: {
    // 改变款式条件
    changeStyle(value) {
      const searchConditions = this.searchConditions
      // console.log('style====>', searchConditions.style, value)
      if (searchConditions.style === value) {
        this.changeCondition('styleSex', '')
        this.changeCondition('style', '')
      } else {
        this.changeCondition('style', value)
      }
    },
    // 改变材質条件
    changeMaterial(value) {
      const searchConditions = this.searchConditions
      if (searchConditions.material === value) {
        this.changeCondition('material', '')
      } else {
        this.changeCondition('material', value)
      }
    },
    // 改变价格条件
    changePriceRange(value) {
      this.changeCondition('priceRange', value)
    },
    changeCondition(key, value) {
      const searchConditions = JSON.parse(JSON.stringify(this.searchConditions))
      searchConditions[key] = value
      this.searchConditions = searchConditions
      this.research()
    },
    // 对戒独有的参数
    addWish(id) {
      const _this = this

      if (!id) {
        this.$errorMessage('no id')
        return
      }

      const goodInfo = {
        goodsId: null,
        groupId: id,
        groupType: 1,
        type: 1
      }

      _this.$store
        .dispatch('addWish', goodInfo)
        .then(data => {
          _this.$successMessage('ok')
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.product-price{
  .coin {
    // margin-right: 6px;
    line-height: 51px!important;
    font-size: 18px;
    margin-right: 6px;
  }
}
.page-content {
  min-width: 1360px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 0;
}
.search-condition {
  .condition-item {
    flex-direction: column;
    align-items: stretch;
  }

  .condition-style {
    width: auto;
    /*flex-grow: 0;*/
    /*flex-shrink: 0;*/

    .condition-name {
      margin-right: 30px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: left;
    }
    .options {
      flex-wrap: nowrap;
    }
  }

  .condition-material {
    flex-grow: 3;
    .condition-name {
      margin-right: 30px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .condition-price {
    display: flex;
    align-items: stretch;
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 0;
    position: relative;

    .condition-name {
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 0;
      position: relative;
      margin-right: 30px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    .operate-area {
      width: 400px;
    }
  }
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
