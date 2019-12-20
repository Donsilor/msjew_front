<template>
  <div class="data-list">
    <div class="top-part">
      <div class="title">{{ lang['marriage-ring'] }}</div>
      <div class="choose-box">
        <div
          v-for="(each, n) in conditions"
          :key="n"
          :class="['choose-btn', { active: each.checked.length > 0 }]"
          @click="showChooseEject(each)"
        >
          <div>{{ each.name }}</div>
          <div class="ow-h1">
            {{ each.checked.length > 0 ? conditionText(each) : lang.all }}
          </div>
          <!--          <div-->
          <!--            v-show="each.checked.length > 0"-->
          <!--            class="triangle-down triangle"-->
          <!--          />-->
        </div>
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
          <span>{{ conditionWord }}</span>
          <i class="iconfont iconshaixuan" />
        </div>
      </div>
      <div class="list">
        <div
          v-for="(each, index) in showData"
          :key="index"
          @click="clickData(each)"
        >
          <div class="info-image">
            <img
              :src="imageStrToArray(each.goodsImages)[0]"
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
        :type="'list'"
        @searchAgain="research"
      ></bdd-empty>
      <requesting v-if="requestingListData"></requesting>
      <!--      <no-more-data v-if="noMoreListData"></no-more-data>-->
      <footer-bar v-if="noMoreListData"></footer-bar>
    </div>
    <swiper-tap
      ref="suitability"
      :choose-line="0"
      @clear="getSortBy"
    ></swiper-tap>
    <choose-eject-pro
      ref="style-eject-choose-pro"
      :title="lang.style"
      :type="'style'"
      :required="true"
      :options="conditions[0].options"
      @clear="clearStyle"
    ></choose-eject-pro>
    <choose-eject-pro
      ref="quality-eject-choose-pro"
      :title="lang.fineness"
      :type="'quality'"
      :required="true"
      :options="conditions[1].options"
      @clear="clearQuality"
    ></choose-eject-pro>
    <!--价格选择底部弹出 -->
    <progress-bar ref="price-bar" @backOption="getBacks"></progress-bar>
  </div>
</template>

<script>
import Axios from 'axios'
import Mixin from './mixin.js'
import List from '@/mixins/list.js'
const CancelToken = Axios.CancelToken
export default {
  mixins: [Mixin, List],
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      listUrl: `/wap/goods/searchRing`,
      beginPrice: 0,
      endPrice: 100000000
    }
  },
  created() {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      this.conditions[0].options = this.CONDITION_INFO.style.coupleRings
      this.research()
    })
  },
  methods: {
    getBacks(val) {
      console.log(val)
      if (val.content.length !== 0) {
        this.conditions[2].checked = `${val.content[0].id},${val.content[1].id}`
        this.beginPrice = val.content[0].id || 0
        this.endPrice = val.content[1].id || 99999999
      } else {
        this.conditions[2].checked = ``
        this.beginPrice = 0
        this.endPrice = 99999999
      }
      this.conditions[2].options = val.content
      this.research()
    },
    // 请求当前页数据
    getPageInfo(currPage = 1) {
      const _this = this
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$toast('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${currPage}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        data: {
          beginPrice: _this.beginPrice,
          endPrice: _this.endPrice,
          currPage: currPage,
          materialValue: _this.conditions[1].checked,
          orderParam: _this.sortBy,
          orderType: _this.sortType,
          pageSize: 10,
          styleValue: _this.conditions[0].checked,
          userId: null
        }
      }

      console.log(`请求页码为：${currPage}`)

      _this
        .$axios({
          method: 'post',
          url: _this.listUrl,
          headers: options.headers || {},
          params: Object.assign(options.params || {}, _this.specialParams),
          data: options.data || {}
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

<style scoped lang="less">
.data-list {
  position: relative;
  .top-part {
    .top-part(3);
  }
  .list-part {
    @listPart();
  }
}
</style>
