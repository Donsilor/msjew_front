<template>
  <div class="page-content">
    <section class="search-condition">
      <!--      女士戒指-->
      <div class="condition-item condition-style condition-lady-style">
        <h2 class="condition-name">
          {{ $t(`${lang}.woman`) }}
        </h2>
        <ul class="options">
          <li
            v-for="(option, index) in ladyStyleOptions"
            :key="index"
            :class="[
              'option-item',
              { active: option.id === searchConditions.style }
            ]"
            @click="changeStyle(20, option.id)"
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
      <!--      男士戒指-->
      <div class="condition-item condition-style condition-man-style">
        <h2 class="condition-name">
          {{ $t(`${lang}.man`) }}
        </h2>
        <ul class="options">
          <li
            v-for="(option, index) in manStyleOptions"
            :key="index"
            :class="[
              'option-item',
              { active: option.id === searchConditions.style }
            ]"
            @click="changeStyle(10, option.id)"
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
              <span class="coin">{{ $store.state.coin }}</span>
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
              <span class="coin">{{ $store.state.coin }}</span>
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.priceRange[1]) }}</span>
                <input
                  v-model="searchConditions.priceRange[1]"
                  :min="searchConditions.priceRange[0]"
                  :max="defaultPriceRange[1]"
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
    <section class="list-title">
      <h1 class="title">
        {{ $t(`${lang}.totalCountTitle`, { totalCount }) }}
        <!--        {{-->
        <!--          totalCount-->
        <!--            ? $t(`${lang}.totalCountTitle`, { totalCount })-->
        <!--            : $t(`${lang}.title`)-->
        <!--        }}-->
      </h1>
      <h3 class="sub-title">{{ activeStyleInfo.desc }}</h3>
      <!--      <h3 class="sub-title">{{ $t(`${lang}.titleDesc`) }}</h3>-->
    </section>
    <section class="sort">
      <div class="sort-type">
        <div class="using-type">
          <span class="type-name">排序</span>
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
            <nuxt-link :to="item.to">
              <div class="product-image">
                <img class="main-image" :src="item.goodsImages[0]" />
                <img
                  class="sub-image"
                  :src="item.goodsImages[1] || item.goodsImages[0]"
                />
                <div class="wish-state">
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
                </div>
              </div>
            </nuxt-link>
            <div class="product-info">
              <div class="product-price">
                <span class="coin">{{ item.coinType }}</span>
                <span class="price">{{ formatNumber(item.salePrice) }}</span>
              </div>
              <div class="product-title">
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
        <button
          v-loading="requestingListData"
          class="check-more"
          @click="getNextPage"
        >
          {{ $t('common.getMore') }}
        </button>
      </div>
      <no-more-data v-show="noMoreListData"></no-more-data>
      <bdd-empty v-show="noListData" type="product"></bdd-empty>
    </section>
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import ListPage from '@/mixins/list-page.js'
import Operate from '@/mixins/operate.js'
const defaultPriceRange = [200, 300000]
const lang = 'singleRingsList'
export default {
  mixins: [List, ListPage, Operate],
  data() {
    return {
      lang,
      listUrl: '/web/goods/searchGoods',
      pageSize: 13,
      manStyleOptions: this.CONDITION_INFO.style.manRings,
      ladyStyleOptions: this.CONDITION_INFO.style.womanRings,
      materialOptions: this.CONDITION_INFO.quality.rings,
      defaultPriceRange,
      fastPriceRanges: [[1200, 15000], [15000, 30000], [30000, 50000]],
      searchConditions: {
        styleSex: '', // 20-女戒款式， 10-男戒款式
        style: '',
        material: '',
        priceRange: JSON.parse(JSON.stringify(defaultPriceRange))
      }
    }
  },
  computed: {
    activeStyleInfo() {
      let result = {}
      const id = this.searchConditions.style
      const styleOptions = this.searchConditions.styleSex
        ? {
            10: this.manStyleOptions,
            20: this.ladyStyleOptions
          }[this.searchConditions.styleSex]
        : []
      if (id === '') {
        return result
      }

      for (let n = 0, length = styleOptions.length; n < length; n++) {
        if (styleOptions[n].id === id) {
          result = styleOptions[n]
          break
        }
      }
      return result
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

      if (!conditions.styleSex) {
        params.push({
          type: 2,
          paramName: 'engaged_style',
          valueType: 1,
          configValues: [-2]
        })
      } else {
        const styleSexMap = {
          10: 'marry_style_man',
          20: 'marry_style_wom'
        }
        params.push({
          type: 2,
          paramName: styleSexMap[conditions.styleSex],
          valueType: 1,
          configValues: conditions.style === '' ? [] : [conditions.style]
        })
      }

      if (conditions.material) {
        params.push({
          type: 3,
          paramName: 'material',
          valueType: 1,
          configValues: conditions.material === '' ? [] : [conditions.material]
        })
      }

      const data = {
        advertType: 2,
        // 商品类别ID
        categoryId: 2,
        // 排序字段名
        orderParam: sortInfo.sortBy,
        // 排序类型（1:升 2:降）
        orderType: sortInfo.sortType,
        // 每页显示数量
        pageSize: this.pageSize,
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
          item.itemType = 'product'
          item.goodsImages = _this.imageStrToArray(item.goodsImages || '')
          item.to = {
            path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
            query: {
              goodId: item.id,
              ringType: 'single'
            }
          }
        }
      })
      return allData
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.research()
    })
  },
  methods: {
    // 改变款式条件
    changeStyle(sex, value) {
      const searchConditions = this.searchConditions
      console.log('styleSex====>', searchConditions.styleSex, sex)
      console.log('style====>', searchConditions.style, value)
      if (
        searchConditions.styleSex === sex &&
        searchConditions.style === value
      ) {
        this.changeCondition('styleSex', '')
        this.changeCondition('style', '')
      } else {
        this.changeCondition('styleSex', sex)
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
    }
  }
}
</script>

<style lang="less" scoped>
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

  .condition-lady-style {
    flex-grow: 2;
    flex-shrink: 2;
    width: auto;
  }

  .condition-man-style {
    flex-grow: 1;
    flex-shrink: 1;
    width: auto;
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
