<template>
  <div class="page-content">
    <section class="search-keyword">
      <input
        v-model="keyword"
        class="keyword-input"
        :placeholder="$t(`${lang}.keywordPlaceholder`)"
        @keyup.enter="toSearch"
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
    <section class="list-content">
      <div class="list-data">
        <div
          v-for="(item, index) in showingData"
          :key="index"
          :class="['data-item', item.itemType]"
        >
          <!--          商品数据-->
          <div v-if="item.itemType === 'product'" class="product-content">
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
      <bdd-empty v-show="noListData" type="search"></bdd-empty>
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
  mixins: [List, Operate],
  data() {
    return {
      lang,
      listMethod: 'get',
      listUrl: '/web/goods/searchAllGoods',
      sortOptions: this.CONDITION_INFO.sortBy.search,
      sortTypeIndex: 0,
      pageSize: 16,
      keyword: ''
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
        pageSize: this.pageSize,

        currPage: this.nextCurrPageNum
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
    const _this = this
    _this.$nextTick(() => {
      _this.keyword = _this.$helpers.base64Decode(
        _this.$route.query.keyword || ''
      )
      _this.research()
    })
  },
  methods: {
    toSearch() {
      this.$router.replace({
        path: '/search',
        query: {
          keyword: this.$helpers.base64Encode(this.keyword)
        }
      })
    },
    // 请求当前页数据
    getPageInfo(currPage = 1) {
      const _this = this
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$errorMessage('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${currPage}`
      // const reqMark = `${currPage}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        data: {
          currPage
        }
      }

      console.log(`请求页码为：${currPage}`)

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
          if (data.list) {
            _this.listData[currPage] = JSON.parse(JSON.stringify(data.list))
          }
          // _this.listData[currPage] = JSON.parse(JSON.stringify(data.list || []))
          delete data.list
          _this.setPageInfo(data)
          _this.removeRequesting(reqMark)
        })
        .catch(err => {
          console.error(err)
          if (err instanceof Error) {
            console.log('这是一个错误')
          } else {
            console.log('这是一个错误数据')
          }
          _this.removeRequesting(reqMark)
        })
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
    padding: 0 20px;
    height: 32px;
    background: #c1aaa0;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
}
.page-content {
  min-width: 1360px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 0;
}
</style>
