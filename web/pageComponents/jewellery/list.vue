<template>
  <div class="page-cover" v-loading="loading">
    <div class="page-content">
      <section class="search-condition">
        <!--      飾品-->
        <div class="condition-item condition-style condition-jewellery-style">
          <h2 class="condition-name" style="margin-right: 70px;">
            {{ $t(`${lang}.jewellery`) }}
          </h2>
          <ul class="options">
            <li
              :class="[
                'option-item',
                { active: '' === searchConditions.categoryId}
              ]"
              @click="changeCategoryId('')"
            >
              <div class="item-icon">
                <img src="/ring-material/all.png" />
              </div>
              <div class="item-name">
                {{ $t(`${lang}.type`) }}
              </div>
            </li>
            <li
              v-for="(option, index) in jewelleryOptions"
              :key="index"
              :class="[
                'option-item',
                { active: option.categoryId === searchConditions.categoryId || (searchConditions.categoryId instanceof Array && searchConditions.categoryId.indexOf(option.categoryId) >= 0)}
              ]"
              @click="changeCategoryId(option.categoryId)"
            >
              <div class="item-icon">
                <i :class="['iconfont', option.iconfont]"></i>
              </div>
              <div class="item-name">
                {{ option.name }}
              </div>
            </li>
          </ul>
        </div>
        <!--      成色-->
        <div class="condition-item condition-material">
          <h2 class="condition-name" style="margin-right: 70px;">
            {{ $t(`${lang}.color`) }}
          </h2>
          <ul class="options">
            <li
              :class="[
                'option-item',
                { active: '' === searchConditions.materialIndex }
              ]"
              @click="changeMaterial('')"
            >
              <div class="item-icon">
                <img src="/ring-material/all.png" />
              </div>
              <div class="item-name">
                {{ $t(`${lang}.colors`) }}
              </div>
            </li>
            <li
              v-for="(option, index) in materialOptions"
              :key="index"
              :class="[
                'option-item',
                { active: index === searchConditions.materialIndex }
              ]"
              @click="changeMaterial(index)"
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
                <span class="coin">{{ $store.state.coin }}</span>
                <div class="range-text">
                  <span>{{
                    formatNumber(searchConditions.priceRange[0])
                  }}</span>
                  <input
                    v-model="searchConditions.priceRange[0]"
                    :min="defaultPriceRange[0]"
                    :max="searchConditions.priceRange[1]"
                    @keydown.enter="
                      changePriceRange(searchConditions.priceRange)
                    "
                    @blur="changePriceRange(searchConditions.priceRange)"
                  />
                </div>
              </div>
              <span class="to">{{ $t(`${lang}.to`) }}</span>
              <div class="range-input max-range">
                <span class="coin">{{ $store.state.coin }}</span>
                <div class="range-text">
                  <span>{{
                    formatNumber(searchConditions.priceRange[1])
                  }}</span>
                  <input
                    v-model="searchConditions.priceRange[1]"
                    :min="searchConditions.priceRange[0]"
                    :max="defaultPriceRange[1]"
                    @keydown.enter="
                      changePriceRange(searchConditions.priceRange)
                    "
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


        <!--      主石类型-->
        <div class="condition-item condition-material">
          <h2 class="condition-name">
            {{ $t(`${lang}.stoneType`) }}
          </h2>
          <ul class="options">
            <li
              :class="[
                'option-item',
                { active: '' === searchConditions.stoneTypeId }
              ]"
              @click="changeStoneType('')"
            >
              <div class="item-icon">
                <img src="/ring-material/all.png" />
              </div>
              <div class="item-name">
                {{ $t(`${lang}.stoneType`) }}
              </div>
            </li>
            <li
              v-for="(option, index) in stoneType"
              :key="index"
              :class="[
                'option-item',
                { active: option.id === searchConditions.stoneTypeId }
              ]"
              @click="changeStoneType(option.id)"
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
      </section>
      <section class="list-title" v-show="this.loading == false">
        <h1 class="title">
          {{ $t(`${lang}.totalCountTitle`, { total_count }) }}
          <!--          {{-->
          <!--            total_count-->
          <!--              ? $t(`${lang}.totalCountTitle`, { total_count })-->
          <!--              : $t(`${lang}.title`)-->
          <!--          }}-->
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
                    <span>{{ discountConversion(item.coupon.discount.discount) }}{{ $t(`${lang}.discounts2`) }}</span>
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
                    <span class="coin">{{ item.coinType }}</span>
                    <span class="price">{{ formatNumber(item.salePrice) }}</span>
                  </div>

                  <!-- 折扣 -->
                  <div class="list-discount-price" v-if="couponType(item.coupon) == 'discount'">
                    <div>
                      <span class="coin">{{ item.coinType }}</span>
                      <span class="price">{{ formatNumber(item.salePrice) }}</span>
                    </div>
                    <div>
                      <span class="coin">{{ item.coinType }}</span>
                      <span class="price">{{ formatNumber(item.coupon.discount.price) }}</span>
                    </div>
                  </div>
                </div>

                <div class="product-title">
                  <!-- 优惠券 -->
                  <span class="list-discount-icon2 padding" v-if="couponType(item.coupon) == 'money'">￥</span>
                  <!-- 折扣 -->
                  <span class="list-discount-icon2" v-if="couponType(item.coupon) == 'discount'">{{ discountConversion(item.coupon.discount.discount) }}{{ $t(`${lang}.discounts2`) }}</span>
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
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import ListPage from '@/mixins/list-page.js'
import Operate from '@/mixins/operate.js'
const defaultPriceRange = [0, 300000]
const lang = 'jewelleryList'
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
      jewelleryOptions: this.CONDITION_INFO.jewellery,
      quality: this.CONDITION_INFO.quality,
      stoneType: this.CONDITION_INFO.stoneType,
      defaultPriceRange,
      fastPriceRanges: [[1000, 3000], [3000, 5000], [5000, 300000]],
      searchConditions: {
        categoryId: '',
        typeId: 4,
        stoneTypeId:'',
        materialIndex: '',
        priceRange: JSON.parse(JSON.stringify(defaultPriceRange))
      },
      loading: true,
      all_category : [4,5,6,7,8,9,16,17,18]

    }
  },
  computed: {
    materialOptions() {
      const typeId = this.searchConditions.typeId
      const category = this.getCategoryById(typeId)
      return this.quality[category.qualityName]
    },
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

      if (conditions.materialIndex !== "") {
        params.push({
          type: 3,
          paramId:10,
          paramName: 'material',
          valueType: 1,
          configValues: [this.materialOptions[conditions.materialIndex].id]
        })
      }

      if (conditions.scenes) {
        params.push({
          type: 2,
          paramId:60,
          paramName: 'scenes',
          valueType: 1,
          configValues: conditions.scenes === '' ? [] : [conditions.scenes]
        })
      }

      if (conditions.stoneTypeId !== "") {
        params.push({
          type: 3,
          paramId:56,
          paramName: 'stone_type',
          valueType: 1,
          configValues: conditions.stoneTypeId === '' ? [] : [conditions.stoneTypeId]
        })
      }




      const data = {
        // 商品类别ID
        categoryId: conditions.categoryId == '' ? this.all_category:conditions.categoryId,
        // 排序字段名
        orderParam: sortInfo.sortBy,
        // 排序类型（1:升 2:降）
        orderType: sortInfo.sortType,
        // 每页显示数量
        page_size: this.page_size,
        // 参数数组
        params
      }

      // 已选商品id
      if (this.$route.query.selectGoodsId) {
        data.selectGoodsId = this.$route.query.selectGoodsId
      }
      return data
    },
    // 处理用于显示的数据
    showingData() {
      // console.log("加载状态",this.loading)
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
          const category = _this.getCategoryById(parseInt(item.categoryId))
          const categoryName =
            category && category.qualityName ? category.qualityName : 'other'
          item.itemType = 'product'
          item.goodsImages = _this.imageStrToArray(item.goodsImages || '')
          item.to = {
            path: `/jewellery/${categoryName}/${item.id}`,
            query: {
              goodId: item.id
            }
          }
        }
      })
      return allData
    }
  },
  mounted() {
    const _this = this
    var priceRange_val =this.$route.query.priceRange
    if(priceRange_val !== undefined){
      this.priceRange = JSON.parse(this.$helpers.base64Decode(priceRange_val));
      this.changePriceRange(this.priceRange);

    }


    _this.$nextTick(() => {
      _this.research()
    })
  },
  watch: {
    $route(val, oldVal) {
      var priceRange_val =this.$route.query.priceRange
      if(priceRange_val !== undefined){
        this.priceRange = JSON.parse(this.$helpers.base64Decode(priceRange_val));
        this.changePriceRange(this.priceRange);

      }
    }
  },
  methods: {
    getCategoryById(categoryId) {
      const jewelleryOptions = this.jewelleryOptions
      let result = null
      for (let n = 0; n < jewelleryOptions.length; n++) {
        if (jewelleryOptions[n].categoryId === categoryId) {
          result = jewelleryOptions[n]
          break
        }
      }
      return result
    },
    // 改变分类条件
    changeCategoryId(value) {
      this.changeCondition('categoryId', value)
    },
    // 改变材質条件
    changeMaterial(index) {
      this.changeCondition('materialIndex', index)
    },

    // 改变主石类型条件
    changeStoneType(index) {
      this.changeCondition('stoneTypeId', index)
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


    //判断两个对象是否相等
    isEqual(objA,objB){
        //相等
        if(objA === objB) return objA !== 0 || 1/objA === 1/objB;
        //空判断
        if(objA == null || objB == null) return objA === objB;
        //类型判断
        if(Object.prototype.toString.call(objA) !== Object.prototype.toString.call(objB)) return false;

        switch(Object.prototype.toString.call(objA)){
            case '[object RegExp]':
            case '[object String]':
                //字符串转换比较
                return '' + objA ==='' + objB;
            case '[object Number]':
                //数字转换比较,判断是否为NaN
                if(+objA !== +objA){
                    return +objB !== +objB;
                }

                return +objA === 0?1/ +objA === 1/objB : +objA === +objB;
            case '[object Date]':
            case '[object Boolean]':
                return +objA === +objB;
            case '[object Array]':
                //判断数组
                for(let i = 0; i < objA.length; i++){
                    if (!this.isEqual(objA[i],objB[i])) return false;
                }
                return true;
            case '[object Object]':
                //判断对象
                let keys = Object.keys(objA);
                for(let i = 0; i < keys.length; i++){
                    if (!this.isEqual(objA[keys[i]],objB[keys[i]])) return false;
                }

                keys = Object.keys(objB);
                for(let i = 0; i < keys.length; i++){
                    if (!this.isEqual(objA[keys[i]],objB[keys[i]])) return false;
                }

                return true;
            default :
                return false;
        }
    },
  }
}
</script>

<style lang="less" scoped>
.page-cover {
  background-image: url('/jewellery-accessories/jewellery-bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.page-content {
  min-width: 1360px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 0;
}
.search-condition {
  .condition-style {
    width: auto;

    .condition-name {
      margin-right: 30px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .condition-jewellery-style {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;

    .options {
      width: 100%;
      .option-item {
        width: 108px;
        border: 1px solid #ccc;
        background: #fff;
        .item-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            font-size: 34px;
          }
        }
      }
    }
  }

  .condition-material {
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
    align-items: center;
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
