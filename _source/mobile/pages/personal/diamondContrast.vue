<template>
  <div class="diamond-contrast">
    <Header :title="lang.title" />
    <div class="diamond-content clearboth">
      <div v-if="list.length > 0" class="top clearboth">
        <div class="diamond01" @click="showSwiperTap(1)">
          <span v-show="diamond01 === -1">{{ lang.select }}</span>
          <span v-show="diamond01 !== -1" class="title-diamond">{{
            list1[diamond01] && list1[diamond01].content
          }}</span>
          <i
            class="icon iconfont "
            :class="diamondIndex01 ? 'iconshang' : 'iconxiala'"
          ></i>
        </div>
        <div class="diamond02" @click="showSwiperTap(2)">
          <span v-show="diamond02 === -1">{{ lang.select }}</span>
          <span v-show="diamond02 !== -1" class="title-diamond">{{
            list2[diamond02] && list2[diamond02].content
          }}</span>
          <i
            class="icon iconfont"
            :class="diamondIndex02 ? 'iconshang' : 'iconxiala'"
          ></i>
        </div>
      </div>
      <bdd-empty
        v-if="list.length === 0"
        :type="'diamondContrast'"
        @toShopping="toShopping"
      ></bdd-empty>
      <bdd-empty
        v-if="!(diamond01 !== -1 || diamond02 !== -1) && list.length !== 0"
        :type="'chooseDiamondContrast'"
      ></bdd-empty>
      <div class="mod">
        <div v-if="list1[diamond01]" class="diamond">
          <img
            :src="
              imageStrToArray(list1[diamond01].simpleGoodsEntity.goodsImages)[0]
            "
            @click="godetail(list1[diamond01])"
          />
          <h6 class="ow-h2">
            {{ list1[diamond01].simpleGoodsEntity.goodsName }}
          </h6>
          <p>
            {{ coin }}
            {{ formatMoney(list1[diamond01].simpleGoodsEntity.salePrice) }}
          </p>
          <ul>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 31)
              }}</span>
              <span>{{ lang.carat }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 34)
              }}</span>
              <span>{{ lang.color }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 33)
              }}</span>
              <span>{{ lang.cut }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 35)
              }}</span>
              <span>{{ lang.cleaness }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 36)
              }}</span>
              <span>{{ lang.luster }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 37)
              }}</span>
              <span>{{ lang.symmetry }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 38)
              }}</span>
              <span>{{ lang.fluorescence }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 39)
              }}</span>
              <span>{{ lang.cuttingDepth }}</span>
            </li>
            <li>
              <span>{{
                getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 40)
              }}</span>
              <span>{{ lang.stoneSurface }}</span>
            </li>
            <li>
              {{ getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 192)
              }}{{ getVal(list1[diamond01].simpleGoodsEntity.baseConfig, 191) }}
            </li>
          </ul>
          <div class="btn1" @click="addCart(list1[diamond01])">
            {{ lang.addCart }}
          </div>
          <div class="btn2" @click="deleteDiamond(list1[diamond01].id, 1)">
            {{ lang.remove }}
          </div>
        </div>
        <div class="mod">
          <div v-if="list2[diamond02]" class="diamond diamond-right">
            <img
              :src="
                imageStrToArray(
                  list2[diamond02].simpleGoodsEntity.goodsImages
                )[0]
              "
              @click="godetail(list2[diamond02])"
            />
            <h6 class="ow-h2">
              {{ list2[diamond02].simpleGoodsEntity.goodsName }}
            </h6>
            <p>
              {{ coin }}
              {{ formatMoney(list2[diamond02].simpleGoodsEntity.salePrice) }}
            </p>
            <ul>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 31)
                }}</span>
                <span>{{ lang.carat }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 34)
                }}</span>
                <span>{{ lang.color }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 33)
                }}</span>
                <span>{{ lang.cut }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 35)
                }}</span>
                <span>{{ lang.cleaness }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 36)
                }}</span>
                <span>{{ lang.luster }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 37)
                }}</span>
                <span>{{ lang.symmetry }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 38)
                }}</span>
                <span>{{ lang.fluorescence }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 39)
                }}</span>
                <span>{{ lang.cuttingDepth }}</span>
              </li>
              <li>
                <span>{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 40)
                }}</span>
                <span>{{ lang.stoneSurface }}</span>
              </li>
              <li>
                {{ getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 192)
                }}{{
                  getVal(list2[diamond02].simpleGoodsEntity.baseConfig, 191)
                }}
              </li>
            </ul>
            <div class="btn1" @click="addCart(list2[diamond02])">
              {{ lang.addCart }}
            </div>
            <div class="btn2" @click="deleteDiamond(list2[diamond02].id, 2)">
              {{ lang.remove }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <swiper-tap
      ref="suitability1"
      :list="list1"
      :choose-line="2"
      @clear="sure"
    ></swiper-tap>
    <swiper-tap
      ref="suitability2"
      :list="list2"
      :choose-line="2"
      @clear="sure"
    ></swiper-tap>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
  name: 'DiamondContrast',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.diamondContrast,
      coin: this.$store.state.coin,
      typeIndex: 0,
      diamondIndex01: false,
      diamondIndex02: false,
      diamond01: -1,
      diamond02: -1,
      list: [],
      list1: [],
      list2: []
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    formatMoney: formatMoney,
    getinfo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/collection/list`,
          params: {
            type: 2,
            currPage: 1,
            pageSize: 99
          }
        })
        .then(res => {
          _this.list = []
          if (res.list.length > 0) {
            res.list.map((item, index) => {
              const obj = {
                type: true,
                id: item.id,
                simpleGoodsEntity: item.simpleGoodsEntity,
                content: item.simpleGoodsEntity.goodsName
              }
              _this.list.push(obj)
            })
          }
        })
        .catch(err => {
          console.log('err:', err)
        })
      console.log(this.list, '5555')
    },
    godetail(id) {
      this.$router.push({
        name: 'diamond-diamonds',
        query: {
          goodId: id.simpleGoodsEntity.goodId
        }
      })
    },
    toShopping() {
      this.$router.push({
        name: 'diamond-list'
      })
    },
    deleteDiamond(id, type) {
      if (type === 1) {
        this.diamond01 = -1
      } else if (type === 2) {
        this.diamond02 = -1
      }
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: `wap/collection/delete`,
          params: {
            ids: id
          }
        })
        .then(res => {
          this.getinfo()
          this.$toast.show(this.lang.toast1)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    addCart(data = {}) {
      // this.$toast('点击了添加到购物车')
      console.log(data, '000')
      const obj = {
        goodsCount: 1,
        goodsDetailsId: '88888888',
        goodsId: data.simpleGoodsEntity.goodId,
        groupId: null,
        groupType: null,
        serviceId: 0,
        serviceVal: 'string'
      }
      this.$store
        .dispatch('addCart', obj)
        .then(data => {
          this.$toast(this.lang.toast2)
        })
        .catch(err => {
          this.$toast(`${this.lang.toast3}：${err.message}`)
        })
    },
    showSwiperTap(type) {
      this.typeIndex = type
      if (type === 1) {
        this.list1 = []
        if (this.diamond02 !== -1 && this.list2.length > 0) {
          this.list.map((item, index) => {
            if (
              this.diamond02 !== -1 &&
              item.id !== this.list2[this.diamond02].id
            ) {
              this.list1.push(item)
            }
          })
        } else {
          this.list1 = this.list
        }
        this.diamondIndex01 = true
        this.$refs.suitability1.show()
      } else if (type === 2) {
        this.list2 = []
        if (this.diamond01 !== -1 && this.list1.length > 0) {
          this.list.map((item, index) => {
            if (
              this.diamond01 !== -1 &&
              item.id !== this.list1[this.diamond01].id
            ) {
              this.list2.push(item)
            }
          })
        } else {
          this.list2 = this.list
        }
        this.diamondIndex02 = true
        this.$refs.suitability2.show()
      }
    },
    getVal(list, id) {
      let val = '--'
      list.map((item, index) => {
        if (item.configId === id) {
          val = item.configAttrIVal
        }
      })
      return val
    },
    sure(val) {
      console.log('val', val)
      if (this.typeIndex === 1) {
        this.diamond01 = val.index
      } else if (this.typeIndex === 2) {
        this.diamond02 = val.index
      } else {
        this.diamond01 = this.diamond02 = -1
      }
      console.log(this.diamond01, this.diamond02)
      this.diamondIndex02 = this.diamondIndex01 = false
    }
  }
}
</script>

<style scoped lang="less">
.diamond-contrast {
  width: 100%;
  min-height: 100%;
  .diamond-content {
    .top {
      .diamond01,
      .diamond02 {
        float: left;
        width: 48%;
        height: 60px;
        font-size: 14px;
        line-height: 60px;
        color: #666666;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        margin: 15px 0 12px 5px;
        span {
          display: inline-block;
          margin-right: -20px;
          max-width: 72%;
          height: 60px;
          line-height: 60px;
          overflow: hidden;
        }
        i {
          float: right;
          padding-right: 10px;
        }
      }
    }
    .mod {
      .diamond {
        float: left;
        width: 48%;
        margin-left: 5px;
        img {
          width: 100%;
          height: 100%;
        }
        h6 {
          display: inline-block;
          width: 88.9%;
          height: 36px;
          margin: 10px auto 0;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          overflow: hidden;
        }
        p {
          width: 100%;
          height: 14px;
          margin: 10px 0 15px;
          font-size: 16px;
          font-family: twCenMt;
          font-weight: 400;
          color: rgba(242, 155, 135, 1);
        }
        ul {
          li {
            display: inline-block;
            width: 88.9%;
            height: 50px;
            span:nth-child(1) {
              display: block;
              margin-top: 6px;
              font-size: 14px;
              height: 18px;
              line-height: 18px;
              color: rgba(51, 51, 51, 1);
            }
            span:nth-child(2) {
              display: block;
              height: 18px;
              line-height: 18px;
              color: #999999;
            }
          }
          li:nth-child(2n + 1) {
            background: #f8f8f8;
          }
          li:last-child {
            font-size: 14px;
            line-height: 50px;
            font-weight: 400;
            text-decoration: underline;
            color: rgba(147, 116, 102, 1);
          }
        }
        .btn1 {
          width: 72.2%;
          height: 32px;
          margin: 5px auto 10px;
          background: rgba(242, 155, 135, 1);
          border-radius: 5px;
          font-size: 14px;
          line-height: 32px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .btn2 {
          width: 72.2%;
          height: 32px;
          margin: 0 auto 30px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 5px;
          font-size: 14px;
          line-height: 32px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      .diamond-right {
        float: right;
        margin: 0 5px 0 0;
      }
    }
  }
}
</style>
