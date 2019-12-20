<template>
  <div class="page-cover">
    <div class="page-content">
      <section class="search-condition">
        <!--      飾品-->
        <div class="condition-item condition-style condition-jewellery-style">
          <h2 class="condition-name">
            {{ $t(`${lang}.jewellery`) }}
          </h2>
          <ul class="options">
            <li
              v-for="(option, index) in jewelleryOptions"
              :key="index"
              :class="[
                'option-item',
                { active: option.categoryId === searchConditions.categoryId }
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
          <h2 class="condition-name">
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
      </section>
      <section class="list-title">
        <h1 class="title">
          {{ $t(`${lang}.totalCountTitle`, { totalCount }) }}
          <!--          {{-->
          <!--            totalCount-->
          <!--              ? $t(`${lang}.totalCountTitle`, { totalCount })-->
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
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import ListPage from '@/mixins/list-page.js'
import Operate from '@/mixins/operate.js'
const defaultPriceRange = [200, 300000]
const lang = 'jewelleryList'
export default {
  mixins: [List, ListPage, Operate],
  data() {
    return {
      lang,
      listUrl: '/web/goods/searchGoods',
      pageSize: 13,
      jewelleryOptions: this.CONDITION_INFO.jewellery,
      quality: this.CONDITION_INFO.quality,
      defaultPriceRange,
      fastPriceRanges: [[1200, 15000], [15000, 30000], [30000, 50000]],
      searchConditions: {
        categoryId: 4,
        materialIndex: '',
        priceRange: JSON.parse(JSON.stringify(defaultPriceRange))
      }
    }
  },
  computed: {
    materialOptions() {
      const categoryId = this.searchConditions.categoryId
      const category = this.getCategoryById(categoryId)

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

      if (conditions.materialIndex) {
        params.push({
          type: 3,
          paramName: 'material',
          valueType: 1,
          configValues: [this.materialOptions[conditions.materialIndex].id]
        })
      }

      const data = {
        // 商品类别ID
        categoryId: conditions.categoryId,
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
          const category = _this.getCategoryById(item.categoryId)
          const categoryName =
            category && category.qualityName ? category.qualityName : 'other'
          item.itemType = 'product'
          item.goodsImages = _this.imageStrToArray(item.goodsImages || '')
          item.to = {
            path: `/jewellery/${categoryName}/${item.goodsName.replace(
              /\//g,
              ''
            )}`,
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
    _this.$nextTick(() => {
      _this.research()
    })
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
      width: 60%;
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
