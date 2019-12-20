<template>
  <div class="address">
    <Header :title="`${lang.order}(${num})`" />
    <div v-if="!noListData" class="content">
      <div class="mod">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="godetails(item, index)"
          >
            <div
              v-if="
                !(
                  index !== 0 &&
                  item.createTime === list[index - 1].createTime &&
                  item.groupType !== 0
                )
              "
              class="mod-item"
            >
              <img :src="imageStrToArray(item.goodsImages)[0]" />
              <span v-if="!getStatus(item, index)" class="failed">
                {{ lang.failed }}
              </span>
              <div class="right">
                <h4 class="ow-h2">
                  {{ item.goodsName }}
                </h4>
                <p>SKU：{{ item.sku }}</p>
                <p class="p">
                  {{
                    getconfig(item.config, item.simpleGoodsEntity.baseConfig)
                  }}
                </p>
                <b>{{ coin }} {{ formatMoney(item.salePrice) }}</b>
                <div v-if="item.groupType === 1" class="btn-type">
                  {{ lang.ring }}
                </div>
                <div v-if="item.groupType === 2" class="btn-type">
                  {{ lang.coustom }}
                </div>
                <div v-if="item.groupType !== 0 && index !== list.length - 1">
                  <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-20">
                    {{ list[index + 1].goodsName }}
                  </h4>
                  <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                    SKU：{{ list[index + 1].sku }}
                  </p>
                  <p>
                    {{
                      getconfig(
                        list[index + 1].config,
                        list[index + 1].simpleGoodsEntity.baseConfig
                      )
                    }}
                  </p>
                  <b>{{ coin }} {{ formatMoney(list[index + 1].salePrice) }}</b>
                </div>
              </div>
              <div class="domore">
                <i
                  v-if="getStatus(item, index)"
                  class="icon iconfont"
                  :class="{ icongou: item.isSelect }"
                  @click.stop="isSelect(item, index)"
                ></i>
                <a
                  v-if="!getStatus(item, index)"
                  class="similar"
                  @click.stop="
                    goMore(item.simpleGoodsEntity.categoryId, item.goodsId)
                  "
                  ><span v-if="item.groupType === 0"
                    >{{ lang.similar }}
                  </span></a
                >
                <span class="remove" @click.stop="remove(item, index)"
                  ><i class="icon iconfont iconicon-test2"></i>
                  {{ lang.remove }}</span
                >
                <span class="num">{{ lang.number }} *1</span>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="list.length > 0" class="bottom">
          <i
            class="icon iconfont"
            :class="{ icongou: selectAll }"
            @click="selectAlls"
          ></i>
          <span>{{ lang.all }}</span>
          <div class="order">
            <span>{{ lang.total }}</span>
            <span class="small"
              >{{ coin }} {{ formatMoney(sumPrice.toFixed(2)) }}</span
            >
          </div>
          <span class="btn" @click="goPay">{{ lang.goPay }}({{ sumNum }})</span>
        </div>
      </div>
    </div>
    <bdd-empty
      v-if="list.length <= 0"
      :type="'cart'"
      @toShopping="toShopping"
    ></bdd-empty>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
const storage = process.client ? require('good-storage').default : {}
export default {
  name: 'Cart',
  layout: 'no-footer-bar',
  components: {
    Header
  },
  data() {
    return {
      coin: this.$store.state.coin,
      list: [],
      selectAll: false,
      sumPrice: 0,
      noListData: true,
      isLogin: !!this.$store.getters.hadLogin,
      cartList: [],
      sumNum: 0,
      lang: this.LANGUAGE.cart.index,
      num: 0
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (this.isLogin) {
        this.getList()
      } else {
        this.getLocalCart()
      }
    })
  },
  //
  methods: {
    formatMoney: formatMoney,
    toShopping() {
      this.$router.push({
        name: 'index'
      })
    },
    // 去找类似
    goMore(val, val2) {
      this.$router.push({
        name: 'search-result',
        query: {
          similarGoodsId: val2,
          categoryId: val
        }
      })
    },
    goPay() {
      const arr = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isSelect) {
          arr.push(this.list[i])
        }
      }
      if (arr.length <= 0) {
        this.$toast.show(this.lang.toast1)
      } else if (arr.length > 0) {
        storage && storage.set('myCartList', JSON.stringify(arr))
        this.$router.push({
          name: 'cart-sureOrder'
        })
      }
    },
    // 判断是否失效
    getStatus(item, ind) {
      let status = false
      if (item.groupType === 2) {
        if (item.goodsStatus === 2 && this.list[ind + 1].goodsStatus === 2) {
          status = true
        }
      } else if (item.groupType === 1) {
        if (
          item.goodsStatus === 2 &&
          this.list[ind + 1].goodsStatus === 2 &&
          item.status
        ) {
          status = true
        }
      } else if (item.goodsStatus === 2) {
        status = true
      }
      return status
    },
    // 全选与反选
    selectAlls() {
      this.selectAll = !this.selectAll
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].goodsStatus === 2 && this.list[i].status === 1) {
          this.list[i].isSelect = this.selectAll
        } else {
          this.list[i].isSelect = false
        }
      }
      this.getNum()
    },
    // 选择商品
    isSelect(data, index) {
      if (data.groupType !== 0 && index < this.list.length - 1) {
        this.list[index].isSelect = !this.list[index].isSelect
        this.list[index + 1].isSelect = !this.list[index + 1].isSelect
      } else {
        this.list[index].isSelect = !this.list[index].isSelect
      }
      this.getNum()
    },
    // 计数和选择计数汇总，价格汇总
    getNum() {
      this.selectAll = true
      let newPrice = 0
      this.sumNum = 0
      for (let i = 0; i < this.list.length; i++) {
        // 购物车总数汇总
        this.num = 0
        this.list.map((item, index) => {
          if (item.groupType === 0) {
            this.num = this.num + 1
          } else {
            this.num = this.num + 0.5
          }
        })
        // 价格汇总
        if (this.list[i].isSelect) {
          console.log(i, 'iiii')
          newPrice = newPrice + this.list[i].salePrice
          // 数量汇总
          if (this.list[i].groupType === 0) {
            this.sumNum = this.sumNum + 1
          } else {
            this.sumNum = this.sumNum + 0.5
          }
        }
        // 反选
        if (this.list[i].goodsStatus === 2 && this.list[i].status === 1) {
          if (!this.list[i].isSelect) {
            this.selectAll = false
          }
        }
      }
      this.sumPrice = newPrice
    },
    // 删除商品
    remove(item, index) {
      if (!this.isLogin) {
        console.log('item', item)
        let arr = null
        if (item.groupType === 0) {
          arr = item.localSn
        } else {
          arr = [item.localSn, this.list[index + 1].localSn]
        }
        this.$store.dispatch('removeCart', arr).then(res => {
          this.getLocalCart()
          this.$toast.show(this.lang.toast2)
        })
      } else if (this.isLogin) {
        let arr2 = null
        if (item.groupType === 0) {
          arr2 = [item.id]
        } else {
          arr2 = [item.id, this.list[index + 1].id]
        }
        this.$axios({
          method: 'post',
          url: '/wap/goodsCart/delete',
          params: {
            ids: arr2.join(',')
          }
        })
          .then(res => {
            this.$toast.show(this.lang.toast2)
            this.getList()
            this.$store.dispatch('getCart')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 属性数值转化成字符串
    getconfig(list, list2) {
      let text = ''
      if (list.length > 0) {
        list.map((item, index) => {
          if (index === list.length - 1) {
            text = text + item.configAttrIVal
          } else {
            text = text + item.configAttrIVal + ' /  '
          }
        })
      }
      if (list2 && list2.length > 0) {
        list2.map((item, index) => {
          if (item.configId === 196) {
            console.log(list2, '9999', item)
            text = text + ' /  ' + item.configAttrIVal
          }
        })
      }
      return text
    },
    // 获取本地数据
    getLocalList(list) {
      this.$axios({
        method: 'post',
        url: `/wap/goodsCart/postCart`,
        data: list
      })
        .then(res => {
          this.doFormat(res)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 获取本地local列表
    getLocalCart() {
      this.$store.dispatch('getLocalCart').then(res => {
        if (res.length > 0) {
          this.noListData = false
          this.cartList = []
          res.map((item, index) => {
            item.data.map((val, ind) => {
              // Status 商品状态(1-仓库,2-上架,3-下架,4-删除)
              // 定制
              // createTime: 1560497513455  //对戒时才有用为必传 切为一致 其他情况可传可以不传
              // goodsCount: 1   //都为一
              // goodsDetailsId: 1865  //都为详情DetailsId
              // goodsId: 304   //都为商品类Id
              // groupId: 1560497551424 //定制为前端生成的时间挫，精确到秒，单品为null，对戒为商品groupId，
              // groupType: 2 // 单品为空，对戒为1 ， 定制2
              // updateTime: 0 // 创建本地购物车时间id
              const o = {
                createTime: item.createTime,
                goodsCount: 1,
                goodsDetailsId: val.goodsDetailsId,
                goodsId: val.goodsId,
                groupId:
                  val.groupType === 1
                    ? val.groupId
                    : val.groupType === 2
                    ? item.id
                    : null,
                groupType: val.groupType,
                updateTime: item.id // 这里改了啊，大佬！！！！！！！！！！！！！！！！！！！！！
              }
              this.cartList.push(o)
            })
          })
          this.cartList.reverse()
          this.getLocalList(this.cartList)
        } else {
          this.num = 0
          this.list = []
        }
      })
    },
    // 获取登录列表数据
    getList() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/goodsCart/list`
        })
        .then(res => {
          this.doFormat(res)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 格式化数据列表
    doFormat(res) {
      this.list = []
      if (res && res.length > 0) {
        this.noListData = false
        res.map((item, index) => {
          const o = {
            isSelect: false,
            goodsImages:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.ringImg
                : item.simpleGoodsEntity.goodsImages,
            goodsName:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.name
                : item.simpleGoodsEntity.goodsName,
            config:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.simpleGoodsEntity.detailConfig
                : item.simpleGoodsEntity.categoryId === 1
                ? item.simpleGoodsEntity.baseConfig
                : item.simpleGoodsEntity.detailConfig,
            sku:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.simpleGoodsEntity
                    .simpleGoodsDetails.goodsDetailsCode
                : item.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode,
            salePrice:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.simpleGoodsEntity
                    .simpleGoodsDetails.retailMallPrice
                : item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            groupType: item.groupType || 0,
            createTime:
              item.groupType === 1
                ? item.createTime
                : item.groupId
                ? item.groupId
                : item.goodsId,
            goodsId: item.goodsId,
            goodsDetailsId: item.goodsDetailsId,
            id: item.id,
            localSn: item.localSn,
            groupId: item.groupId || null,
            simpleGoodsEntity:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.simpleGoodsEntity
                : item.simpleGoodsEntity,
            status:
              item.groupType === 1 ? item.ringsSimpleGoodsEntity.status : 1,
            goodsStatus:
              item.groupType === 1
                ? item.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus
                : item.simpleGoodsEntity.goodsStatus
          }
          this.list.push(o)
        })
        for (let i = 0; i < this.list.length - 1; i++) {
          if (
            this.list[i].simpleGoodsEntity.categoryId === 1 &&
            this.list[i].createTime === this.list[i + 1].createTime
          ) {
            const tamp = this.list[i]
            this.list[i] = this.list[i + 1]
            this.list[i + 1] = tamp
          }
        }
        this.getNum()
      } else {
        this.noListData = true
        this.num = 0
      }
    },
    switchName(i) {
      const num = parseInt(i)
      switch (num) {
        case 1:
          return `diamond`
        case 2:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    godetails(item, index) {
      // 去定制详情
      if (item.groupType === 2) {
        const ct1 = this.isLogin ? item.id : item.localSn
        const ct2 = this.isLogin
          ? this.list[index + 1].id
          : this.list[index + 1].localSn
        this.goToMade(
          item.simpleGoodsEntity.categoryId,
          item.goodsId,
          item.goodsDetailsId,
          ct1,
          this.list[index + 1].simpleGoodsEntity.categoryId,
          this.list[index + 1].goodsId,
          this.list[index + 1].goodsDetailsId,
          ct2
        )
      }
      // 去对戒详情
      if (item.groupType === 1) {
        this.$router.push({
          name: 'marriage-ring-pair-ring-detail',
          query: {
            ringId: item.groupId,
            ct: this.isLogin ? item.id : item.localSn,
            dt1: item.goodsDetailsId,
            dt2: this.list[index + 1].goodsDetailsId
          }
        })
      }
      // 去单品详情
      if (item.groupType === 0) {
        if (item.simpleGoodsEntity.categoryId === 1) {
          // 是个钻石💎
          this.$router.push({
            name: 'diamond-diamonds',
            query: {
              goodId: item.goodsId,
              cartId: this.isLogin ? item.id : item.localSn
            }
          })
        } else if (item.simpleGoodsEntity.categoryId === 2) {
          if (item.simpleGoodsEntity.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指💍')
            this.$router.push({
              name: 'marriage-ring-single-ring-detail',
              query: {
                goodId: item.goodsId,
                cartId: this.isLogin ? item.id : item.localSn
              }
            })
          } else if (item.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指💍')
            this.$router.push({
              name: 'engagement-engagement-rings',
              query: {
                goodId: item.goodsId,
                cartId: this.isLogin ? item.id : item.localSn
              }
            })
          }
        } else {
          // 饰品
          this.$router.push({
            name: 'accessories-accessories',
            query: {
              goodId: item.goodsId,
              cartId: this.isLogin ? item.id : item.localSn
            }
          })
        }
      }
    },
    goToMade(ct1, gs1, gd1, ci1, ct2, gs2, gd2, ci2) {
      console.log('11', ct1, gs1, gd1, ci1, ct2, gs2, gd2, ci2)
      const obj = {
        steps: [
          {
            goodsId: gs1,
            goodsDetailsId: gd1,
            ct: ct1,
            cartId: ci1,
            page: `detail`
          },
          {
            goodsId: gs2,
            goodsDetailsId: gd2,
            ct: ct2,
            cartId: ci2,
            page: `detail`
          }
        ]
      }
      console.log(obj)
      this.$router.push({
        name: `custom-made-${this.switchName(ct1)}-made-${this.switchName(
          ct2
        )}-detail`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(obj)),
          step: 3,
          goodId: gs2
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.address {
  min-height: 100%;
  background: #f5f5f5;
  .content {
    display: inline-block;
    width: 100%;
    .mod {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      ul {
        background: #f2f2f2;
        margin-bottom: 50px;
        li {
          position: relative;
          .mod-item {
            display: inline-block;
            width: 100%;
            background: #ffffff;
            padding: 34px 14px 20px;
            margin-top: 8px;
          }
          img {
            float: left;
            width: 125px;
            height: 125px;
          }
          .failed {
            position: absolute;
            top: 42px;
            left: 14px;
            width: 125px;
            height: 125px;
            font-size: 14px;
            font-family: PingFangHK-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 125px;
            background: rgba(51, 51, 51, 0.2);
          }
          .right {
            margin-left: 140px;
            padding-bottom: 24px;
            border-bottom: 1px solid #f5f5f5;
            text-align: left;
            min-height: 125px;
            h4 {
              display: inline-block;
              max-height: 40px;
              font-size: 14px;
              line-height: 20px;
              font-family: PingFangHK-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
            p {
              font-size: 13px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
            .p {
              margin-bottom: 4px;
            }
            b {
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
            }
            .btn-type {
              position: absolute;
              top: 174px;
              left: 34px;
              width: 80px;
              height: 26px;
              text-align: center;
              background: rgba(245, 240, 236, 1);
              border: 1px solid rgba(215, 202, 196, 1);
              border-radius: 4px;
              font-size: 12px;
              line-height: 26px;
              font-weight: 400;
              color: rgba(148, 116, 101, 1);
            }
          }
          .domore {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 20px;
            margin-top: 16px;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            text-align: right;
            color: rgba(153, 153, 153, 1);
            i {
              width: 18px;
              height: 18px;
              text-align: center;
              font-size: 18px;
              line-height: 18px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 50%;
              margin-left: 50px;
              cursor: pointer;
            }
            .icongou {
              background: rgba(242, 155, 135, 1);
              color: #ffffff;
              border: 1px solid rgba(242, 155, 135, 1);
            }
            .iconicon-test2 {
              float: left;
              margin: 0;
              border: none;
            }
            .similar {
              width: 125px;
              text-align: center;
            }
            .remove {
              cursor: pointer;
            }
            .num {
              color: rgba(102, 102, 102, 1);
            }
            a {
              text-decoration: underline;
              color: rgba(206, 163, 160, 1);
              cursor: pointer;
            }
          }
        }
      }
    }
    .bottom {
      position: fixed;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 50px;
      background: #ffffff;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: left;
      box-shadow: 0px -1px 6px 0px rgba(172, 172, 172, 0.59);
      i {
        float: left;
        width: 18px;
        height: 18px;
        text-align: center;
        font-size: 18px;
        line-height: 18px;
        margin: 14px 5px 0 12px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 50%;
        cursor: pointer;
      }
      .icongou {
        background: rgba(242, 155, 135, 1);
        color: #ffffff;
        border: 1px solid rgba(242, 155, 135, 1);
      }
      span {
        float: left;
        font-size: 14px;
        line-height: 50px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .order {
        float: left;
        height: 50px;
        width: 160px;
        padding: 5px 0 5px 18px;
        font-size: 14px;
        line-height: 20px;
        color: rgba(51, 51, 51, 1);
        text-align: left;
        span {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          line-height: 18px;
        }
        .small {
          font-size: 18px;
          line-height: 22px;
          font-family: twCenMt;
          font-weight: 400;
          color: #f29b87;
        }
      }
      .btn {
        float: right;
        height: 50px;
        padding: 0 10px;
        background: rgba(242, 155, 135, 1);
        font-size: 16px;
        text-align: center;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
