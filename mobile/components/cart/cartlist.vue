<template>
  <div class="cart-list">
    <div class="content">
      <div class="mod">
        <ul>
          <!-- v-if="
                !(index !== 0 && item.createTime === list[index - 1].createTime)
              " -->
          <li v-for="(item, index) in list" :key="index">
             <!-- v-if="
                !(index !== 0 && item.createTime === list[index - 1].createTime)
              " -->
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
              <!-- 单品 -->
              <div v-if="item.groupType === 0 && Number(item.goodsType) !== 19"  class="single">
                <div class="img-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]">
                  <img :src="imageStrToArray(item.goodsImages)[0]" />

                  <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                    <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                    <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                  </div>
                </div>
                <div class="right">
                  <h4 class="ow-h2">
                    <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                    <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                    {{ item.goodsName }}
                  </h4>
                  <p>SKU：{{ item.sku }}</p>
                  <p class="p">
                    {{
                      getconfig(item.config, item.simpleGoodsEntity.baseConfig,item.goodsAttr,item.lettering)
                    }}
                  </p>

                  <b v-if="!item.coupon.discount">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatMoney(item.salePrice) }}</b>
                  
                  <div class="discount-price" v-else>
                    <div class="old-price">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.salePrice) }}</div>
                    <b>{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.coupon.discount.price) }}</b>
                  </div>

                  <div v-if="item.groupType === 1" class="btn-type">
                    {{ lang.ring }}
                  </div>
                  <div v-if="item.groupType === 2" class="btn-type" :class="{marginTop: item.groupType === 2}">
                    {{ lang.coustom }}
                  </div>
                  <div v-if="item.groupType !== 0 && index !== list.length - 1">
                    <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-10">
                      <i class="discount-icon" v-if="list[index + 1].coupon.discount">{{ language == 'en_US' ? discountUs(list[index + 1].coupon.discount.discount)+'%' : discountConversion(list[index + 1].coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                      <i class="discount-icon padding" v-if="list[index + 1].coupon.money">￥</i>

                      {{ list[index + 1].goodsName }}
                    </h4>
                    <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                      SKU：{{ list[index + 1].sku }}
                    </p>
                    <p class="p">
                      {{
                        getconfig(
                          list[index + 1].config,
                          list[index + 1].simpleGoodsEntity.baseConfig
                        )
                      }}
                    </p>

                    <b v-if="!list[index + 1].coupon.discount">{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatMoney(list[index + 1].salePrice) }}</b>

                    <div class="discount-price" v-else>
                      <div class="old-price">{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatNumber(list[index + 1].salePrice) }}</div>
                      <b>{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatNumber(list[index + 1].coupon.discount.price) }}</b>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 对戒 -->
              <div v-if="item.goodsType == '19'" class="double">
                <div class="img-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]">
                  <img :src="imageStrToArray(item.goodsImages)[0]" />

                  <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                    <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                    <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                  </div>
                </div>

                <div class="right" v-for="(ring, _index) in item.sku" :key="_index">
                  <h4 class="ow-h2">
                    <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                    <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                    {{ item.goodsName }}
                  </h4>
                  <p class="sku">SKU：{{ item.simpleGoodsEntity.goodsCode }}</p>
                  <p class="p">
                    {{
                      getDubleConfig(ring.lang.goods_spec,ring.lang.goods_attr[26].value,ring,item.goodsAttr)
                    }}
                  </p>
                  <!-- <b>{{ coin }} {{ formatMoney(item.salePrice) }}</b> -->
                  <div v-if="item.goodsType == '19'" class="btn-type">
                    {{ lang.ring }}
                  </div>
                  <div v-if="item.groupType == 1" class="btn-type">
                    {{ lang.coustom }}
                  </div>
                  <!-- <div v-if="item.groupType !== 0 && index !== list.length - 1">
                    <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-10">
                      {{ list[index + 1].goodsName }}
                    </h4>
                    <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                      SKU：{{ list[index + 1].sku }}
                    </p>
                    <p class="p">
                      {{
                        getconfig(
                          list[index + 1].config,
                          list[index + 1].simpleGoodsEntity.baseConfig
                        )
                      }}
                    </p>
                    <b>{{ coin }} {{ formatMoney(list[index + 1].salePrice) }}</b>
                  </div> -->
                </div>

                  <b v-if="!item.coupon.discount" class="double-ring-price">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatMoney(item.salePrice) }}</b>
                  
                  <div class="discount-price" v-else>
                    <div class="old-price">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.salePrice) }}</div>
                    <b>{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.coupon.discount.price) }}</b>
                  </div>
              </div>
              <!-- 定制 -->
              <div v-if="item.groupType === 2" class="customization">
                <div class="img-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]">
                  <img :src="imageStrToArray(item.goodsImages)[0]" />

                  <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                    <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                    <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                  </div>
                </div>

                <div class="right">
                  <h4 class="ow-h2">
                    <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                    <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                    {{ item.goodsName }}
                  </h4>
                  <p>SKU：{{ item.sku }}</p>
                  <p class="p">
                    {{
                      getMadeConfig(item.config,item.simpleGoodsEntity.detailConfig,item.goodsAttr)
                    }}
                  </p>
                  
                  <b v-if="!item.coupon.discount">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatMoney(item.salePrice) }}</b>
                  
                  <div class="discount-price" v-else>
                    <div class="old-price">{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.salePrice) }}</div>
                    <b>{{ formatCoin(item.simpleGoodsEntity.coinType) }} {{ formatNumber(item.coupon.discount.price) }}</b>
                  </div>

                  <div v-if="item.groupType === 1" class="btn-type">
                    {{ lang.ring }}
                  </div>
                  <div v-if="item.groupType === 2" class="btn-type" :class="{marginTop: item.groupType === 2}">
                    {{ lang.coustom }}
                  </div>
                  <div v-if="item.groupType !== 0 && index !== list.length - 1">
                    <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-10">
                      <i class="discount-icon" v-if="list[index + 1].coupon.discount">{{ language == 'en_US' ? discountUs(list[index + 1].coupon.discount.discount)+'%' : discountConversion(list[index + 1].coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                      <i class="discount-icon padding" v-if="list[index + 1].coupon.money">￥</i>

                      {{ list[index + 1].goodsName }}
                    </h4>
                    <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                      SKU：{{ list[index + 1].sku }}
                    </p>
                    <p class="p">
                      {{
                        getMadeConfig(
                          list[index + 1].config,
                          list[index + 1].simpleGoodsEntity.detailConfig,
                          list[index + 1].goodsAttr
                        )
                      }}
                    </p>
                    
                    <b v-if="!list[index + 1].coupon.discount">{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatMoney(list[index + 1].salePrice) }}</b>
                  
                    <div class="discount-price" v-else>
                      <div class="old-price">{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatNumber(list[index + 1].salePrice) }}</div>
                      <b>{{ formatCoin(list[index + 1].simpleGoodsEntity.coinType) }} {{ formatNumber(list[index + 1].coupon.discount.price) }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.anonymousDetail,
      coin: this.$store.state.coin,
      selectIndex: true,
      tex: {
        logisticsFee: 0,
        taxFee: 0,
        safeFee: 0,
        orderAmount: 0
      },
      num: 1,
      language: this.$store.state.language
    }
  },
  mounted() {
    
    // this.language = this.getCookie('language')
  },
  methods: {
    formatMoney: formatMoney,
    // 属性数值转化成字符串
    getconfig(list, list2, attr,lettering) {
      // console.log("itemlist2",list2)
      let config = list.concat(attr)
      let text = ''
      if(this.isLogin){
        if (list.length > 0) {
          list.map((item, index) => {
            if (index === list.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }else {
        console.log("config",config)
        if (config.length > 0) {
          config.map((item, index) => {
            if (index === config.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }
      if (list2 &&  list2.length > 0) {
        list2.map((item, index) => {
          if (item.configId === 196) {
            // console.log(list2, '9999', item)
            text = text + ' /  ' + item.configAttrIVal
          }
        })
      }
       // 刻字
      if(lettering){
        text = text+' /  '+ lettering 
      }
      
      return text
    },
    getMadeConfig(list,list2,attr){
      let text = ''
      if(this.isLogin){
        if (list2.length > 0) {
          list2.map((item, index) => {
            console.log("itemlist2",item)
            if (index === list2.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }else {
        if (list2.length > 0) {
          list2.map((item, index) => {
             console.log("itemlist2",item)
            if (index === list2.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }
      return text
    },
    // 属性数值转化成字符串
    getDubleConfig(good_spec,goods_attr,ring,attr) {
      // console.log('9999',ring.id)
      let attrs = []
     
      ring.lang.goods_spec.forEach((item,a) => {
        attrs.push(item)
      })
      attr.forEach((i,a) => {
        // console.log('9999',ring.id,i)
        if (ring.id == i.goodsId) {
          // i.attr_name = i.configVal
          i.attr_value = i.configAttrIVal
          attrs.push(i)
        }
      })
      let text = ''
      if (attrs.length > 0) {
        attrs.map((item, index) => {

          if (index === attrs.length - 1) {
            text = text + item.attr_value
          } else {
            text = text + item.attr_value + ' /  '
          }
        }) 
      }
     if (goods_attr) {
       for (let i in goods_attr) {
      //  console.log("good_spec",goods_attr[i])
        text = text + ' /  '+goods_attr[i] 
      }
        // goods_attr.map((item, index) => {

        //   if (index === goods_attr.length - 1) {
        //     text = text + item
        //   } else {
        //     text = text + item + ' /  '
        //   }
        // }) 
      }
      //  console.log("good_spec",text)
      return text
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.cart-list {
  .content {
    display: inline-block;
    width: 100%;
    .mod {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      ul {
        background: #f2f2f2;
        .mod-item {
          display: inline-block;
          width: 93%;
          background: #ffffff;
          padding: 34px 3.5% 20px;
          margin: 10px 12px 0;
          border-radius: 5px;
        }
        li {
          .img-box{
            float: left;
            width: 75px;
            height: 75px;
            position: relative;

            .activity-sign{
              width: 40px;
              height: 40px;
              bottom: -4px;
              right: -3px;

              .triangle{
                padding-top: 16px;
                padding-left: 4px;
                font-size: 10px;
              }
            }
          }
          .img-box.on{
            border: 1px solid red;
          }
          .img-box.marginTop{
            margin-top: 60px;
          }
          img {
            width: 100%;
            height: 100%;
          }
           .right {
              margin-left: 90px;
              text-align: left;
              h4 {
                display: inline-block;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              span {
                float: right;
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              p {
                font-size: 13px;
                line-height: 22px;
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
                width: 80px;
                height: 20px;
                margin-left: -92px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 2px;
                font-size: 12px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
                margin-top: 14px;
              }
            }
          .signle{
            .right {
              margin-left: 90px;
              text-align: left;
              h4 {
                display: inline-block;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              span {
                float: right;
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              p {
                font-size: 13px;
                line-height: 22px;
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
                width: 80px;
                height: 20px;
                margin-left: -92px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 2px;
                font-size: 12px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
                margin-top: 14px;
              }
            }
          }
          .double{
            .discount-price{
               margin-top: 10px;
            }
            .old-price{
              margin-left: 90px;
              text-align: left;
            }
            // b{
            //   font-size: 17px;
            //   line-height: 20px;
            //   font-weight: 400;
            //   color: rgba(243, 163, 145, 1);
            //   font-family: twCenMt;
            //   margin-left: 15px;
            // }
            b {
              width: 60%;
              text-align: left;
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
              display: inline-block;
              // margin-top: 10px;
              margin-left: 89px;
            }
            .right {
              margin-left: 90px;
              text-align: left;
              position: relative;
              h4 {
                display: inline-block;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              span {
                float: right;
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              p {
                font-size: 13px;
                line-height: 22px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .p {
                // margin-bottom: 4px;
              }
              b {
                font-size: 17px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(243, 163, 145, 1);
                font-family: twCenMt;
              }
              .btn-type {
                width: 80px;
                height: 20px;
                margin-left: -92px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 2px;
                font-size: 12px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
                margin-top: 14px;
                position: absolute;
              }
              .sku{
                margin-bottom: 10px;
              }
            }
            .right:nth-child(3) {
              // border-bottom: 1px solid #f5f5f5;
              .btn-type{
                display: none;
              }
              .ow-h2{
                display: none;
              }
              .sku{
                display: none;
              }
            }
            .double-ring-price{
              margin-right: 45px;
            }
            
          }
          .customization{
            .img-box.marginTop{
              margin-top: 30px;
            }
            .right {
              margin-left: 90px;
              text-align: left;
              h4 {
                display: inline-block;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              span {
                float: right;
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              p {
                font-size: 13px;
                line-height: 22px;
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
                width: 80px;
                height: 20px;
                margin-left: -92px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 2px;
                font-size: 12px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
                margin-top: 14px;
              }
            }
            

            .btn-type.marginTop{
              margin-top: 50px;
              float: left;
            }
          }
        }
      }
    }
  }
  .old-price{
    font-size: 12px;
    margin-bottom: 6px;
  }

  .discount-price{
    padding: 0;
  }

  i{
    font-style: normal;
  }
}
</style>
