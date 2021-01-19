<template>
  <div class="single">
    <div class="good-info">
      <nuxt-link :to="getJumpLink(g)">
        <div class="good-img">
          <img :src="imageStrToArray(g.image)[0]" alt="" />
          <div
            v-if="g.data[0].simpleGoodsEntity.goodsStatus !== 2"
            class="img-bord"
          >
            <span>{{ $t(`cart.Invalid`) }}</span>
          </div>

          <!-- 折扣 -->
          <div class="list-discount-icon1" v-if="couponType(g.data[0].coupon) == 'discount'">
            <span>{{ language == 'en_US' ? discountUs(g.data[0].coupon.discount.discount)+'%' : discountConversion(g.data[0].coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
          </div>

          <!-- 优惠券 -->
          <div class="list-discount-icon1" v-if="couponType(g.data[0].coupon) == 'money'">
            <span>{{ $t(`${lang}.discounts1`) }}</span>
          </div>
        </div>
      </nuxt-link>

      <nuxt-link :to="getJumpLink(g)" class="good-desc-wrap">
        <div class="good-desc">
          <div>
            {{ g.goodsName }}
          </div>
          <div>
            SKU：{{
              g.data[0].simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode
            }}
          </div>
        </div>
      </nuxt-link>

      <div
        v-if="g.data[0].simpleGoodsEntity.categoryId !== 1"
        class="good-information"
      >
        <div>
          <div
            v-for="(i, k) in g.data[0].simpleGoodsEntity.detailConfig"
            :key="k"
            class="infos"
          >
            <div>{{ i.configVal }}</div>
            <div>{{ i.configAttrIVal }}</div>
          </div>
          <!-- 色彩 -->
          <div class="infos" v-for="(i, k) in g.data[0].goodsAttr" :key="'color='+k">
            <div>{{ i.configVal }}</div>
            <div>{{ i.configAttrIVal }}</div>
          </div>
          <!-- 刻字内容 -->
          <div class="infos" v-if="g.data[0].lettering">
            <div>{{$t(`${lang}.engravingContent`)}}</div>
            <div>{{g.data[0].lettering}}</div>
          </div>
          
          <div v-if="type == 'single' && showAttr" class="goods-attr">
            <div class="triangle">
              <span></span>
              <span></span>
            </div>

            <div class="attrs">
              <div class="attrs-content">
                <!-- 主石大小 -->
                <div v-if="carats.length" class="attr-list texture clf">
                  <div class="attr fl">{{ caratsText }}</div>
                  <div class="val fl clf">
                    <div class="val-child fl" :class="{'active': index == selected.caratIndex}" v-for="(item, index) in carats" :key="index" @click="chooseAttr('carats', index)">{{ item.name }}</div>
                  </div>
                </div>
                <!-- 成色 -->
                <div v-if="materials.length" class="attr-list texture clf">
                  <div class="attr fl">{{ materialsText }}</div>
                  <div class="val fl clf">
                    <div class="val-child fl" :class="{'active': index == selected.materialIndex}" v-for="(item, index) in materials" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
                  </div>
                </div>
                <!-- 尺寸 -->
                <div v-if="sizes.length" class="attr-list site clf">
                  <div class="attr fl">{{ sizesText }}</div>
                  <div class="val fl clf">
                    <div class="val-child fl" :class="{'active': index == selected.sizeIndex}" v-for="(item, index) in sizes" :key="index" @click="chooseAttr('size', index)">{{ item.name }}</div>
                  </div>
                </div>
                <!-- 主石色彩 -->
                <div v-if="colorDetail.length" class="attr-list color clf">
                  <div class="attr fl">{{ colorText }}</div>
                  <div class="val fl clf">
                    <div class="val-child fl" :class="{'active': index == selected.colorIndex}" v-for="(item, index) in colorDetail" :key="index" @click="chooseAttr('color', index)">{{ item.name }}</div>
                  </div>
                </div>
              </div>

              <div class="attrs-btn clf">
                <div class="price fl">
                  <span class="currency">{{ formatCoin(coin) }}</span>
                  <span class="num">{{ formatNumber(price) }}</span>
                </div>
                <div class="btns fr clf">
                  <div class="btn fl" @click="cancelAdjustAttr($event)">{{ $t(`${lang}.cancle`) }}</div>
                  <div class="btn fl" @click="confirmAttr()">{{ $t(`${lang}.confirm`) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span v-if="ifShowEditBtn" class="edit" @click="editAttr('single')"></span>
      </div>

      <div
        v-if="g.data[0].simpleGoodsEntity.categoryId === 1"
        class="good-description"
      >
        <span v-for="(i, k) in g.data[0].simpleGoodsEntity.baseConfig" :key="k">
          <span v-if="k != g.data[0].simpleGoodsEntity.baseConfig.length - 1"
            >{{ i.configAttrIVal }},
          </span>
          <span
            v-else-if="k == g.data[0].simpleGoodsEntity.baseConfig.length - 1"
            >{{ i.configAttrIVal }}</span
          >
        </span>
      </div>

      <div class="good-num">{{ g.data[0].goodsCount }}</div>

      <!-- 原金额 -->
      <div class="good-price" :class="{'old-price': couponType(g.data[0].coupon) == 'discount'}">
        {{ formatCoin(g.coinType) }}
        {{
          formatNumber(
            g.data[0].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
          )
        }}
      </div>

      <!-- 优惠后金额 -->
      <div class="now-price">
        <span v-if="couponType(g.data[0].coupon) == 'discount'">
          {{ formatCoin(g.coinType) }}
          {{
            formatNumber(
              g.data[0].coupon.discount.price
            )
          }}
        </span>
        <span  v-if="couponType(g.data[0].coupon) !== 'discount'">
          {{ formatCoin(g.coinType) }}
          {{
            formatNumber(
              g.data[0].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
            )
          }}
        </span>
      </div>

      <div class="btn-box">
        <div
          v-if="g.data[0].simpleGoodsEntity.goodsStatus === 2"
          class="good-btn"
        >
          <i class="iconfont iconlajitong" @click="deleteGood()" />
        </div>
        <div v-else class="lose-btn">
          <div @click="searchSimilar(g.data[0])">
            {{ $t(`cart.searchSimilar`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'cart'
import GoodCart from '@/mixins/good-cart.js'
export default {
  data() {
    return{
      lang,
      productData: {},
      selected: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      colorAttrs: [
        {
          config_id:'',
          config_attr_id:''
        }
      ],
    }
  },
  name: 'Single',
  mixins: [GoodCart],
  computed: {
    // 成色
    materials() {
      if(this.productData.materials){
        return this.productData.materials
      }else{
        return []
      }
    },
    // 主石大小
    carats() {
      if(this.productData.carats){
        return this.productData.carats
      }else{
        return []
      }
    },
    // 尺寸
    sizes() {
      if(this.productData.sizes){
        return this.productData.sizes
      }else{
        return []
      }
    },
    //色彩  start
    colorDetail(){
      const Spec = this.productData.specs

      let colors = []
      let colorSpec = ''
      let colorId = ''
      // let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            this.configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                name: specs[i]
              }));
            }
          }
        })
        return colors
      }else{
        return []
      }
    },
    goodsAttrs(){
      const _this = this
      const ringChecked = _this.selected.colorIndex
      const colorDetail = _this.colorDetail

      const color =
        colorDetail.length > 0 && colorDetail[ringChecked]
          ? colorDetail[ringChecked].id
          : null
      _this.colorAttrs[0].config_id = _this.configId
      _this.colorAttrs[0].config_attr_id = color
      return _this.colorAttrs
    },
    simpleDetail() {
      const _this = this
      const productData = _this.productData
      const details = productData.details

      const material =
        productData.materials.length > 0 &&
        productData.materials[this.selected.materialIndex]
          ? productData.materials[this.selected.materialIndex].id
          : null
      const size =
        productData.sizes.length > 0 &&
        productData.sizes[this.selected.sizeIndex]
          ? productData.sizes[this.selected.sizeIndex].id
          : null
      const carat =
        productData.carats.length > 0 &&
        productData.carats[this.selected.caratIndex]
          ? productData.carats[this.selected.caratIndex].id
          : null

      let result = null
      console.log(66, this.selected.materialIndex)
      console.log(0,productData)
      console.log(1111,material)
      console.log(222,size)
      console.log(333,carat)

      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat) {
          result = item
          break
        }
      }

      return result
    }
  },
  methods: {
    addWish() {
      const data = {
        goodsId: this.g.goodsId,
        groupId: null,
        groupType: null,
        type: 1
      }
      this.$store
        .dispatch('addWish', data)
        .then(data => {
          this.$successMessage(this.$t(`cart.addWishSuccess`))
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    deleteGood() {
      const data = [this.g.id]
      this.$store
        .dispatch(`removeCart`, data)
        .then(data => {
          this.$emit(`bottomData`)
          this.$successMessage(this.$t(`cart.deleteSuccess`))
          this.$emit(`reloadList`)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    searchSimilar(info) {
      let routerName = ''
      switch (info.goodsType) {
        case 15:
          // 莫桑石
          routerName = '/diamonds/round-cut'
          break
        case 2:
          if(info.groupType == 1){
            //对戒
             routerName = '/wedding-rings/classic-series'
          }else{
            // 戒指
             routerName = '/wedding-rings/all'
          }


          break
        case 3:
          // 珠宝饰品
          routerName = '/jewellery/all'
          break
        case 4:
          // 项链
          routerName = '/jewellery/necklaces'
          break
        case 5:
          // 吊坠
          routerName = '/jewellery/pendants'
          break
        case 6:
          // 耳钉
          routerName = '/jewellery/ear-stud'
          break
        case 7:
          // 耳环
          routerName = '/jewellery/earrings'
          break
        case 8:
          // 手链
          routerName = '/jewellery/bracelets'
          break
        case 9:
          // 手镯
          routerName = '/jewellery/bangles'
          break
        case 12:
          routerName = '/engagement-rings/all'
          break

      }

      const routerJump = this.$router.resolve({
        path: routerName,
        query: {

        }
      })
      window.open(routerJump.href, '_blank')
      //  用分类id和商品id去搜索
    }
  }
}
</script>

<style scoped lang="less">

.single {
  border-bottom: 1px solid rgba(239, 239, 239, 1);
  width: calc(100% - 50px);
  .good-info {
    position: relative;
    height: 179px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    align-items: center;
    .good-img {
      position: relative;
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 2px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      box-sizing: border-box;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .good-desc-wrap{
      width: calc((60% - 140px) * 0.56);
      padding-right: 20px;
      box-sizing: border-box;

      .good-desc {
        line-height: 18px;
        div:nth-child(1) {
          max-height: 18 * 3px;
          margin-bottom: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          /*word-break: break-all;*/
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        div:nth-child(2) {
          color: #999;
        }
      }
    }
    .good-information {
      position: relative;
      width: calc((60% - 140px) * 0.44);
      padding-right: 20px;
      box-sizing: border-box;
      display: flex;
      height: 100%;
      align-items: center;

      &>div{
        position: relative;
        width: 100%;

        .infos {
          width: 100%;
          display: flex;
          margin-bottom: 10px;
          div:nth-child(1) {
            width: 50%;
            color: #666;
          }
          div:nth-child(2) {
            width: 50%;
            color: #111;
          }
        }
      }

      .edit{
        position: absolute;
        top: 14px;
        right: 0;
        width: 20px;
        height: 20px;
        background: url(/icon/edit.png) no-repeat center;
        background-size: 100% 100%;
        cursor: pointer;
      }

      .goods-attr{
        position: absolute;
        top: calc(100% + 14px);
        left: -10px;
        z-index: 6;
        width: 288px;
        min-height: 100px;
        background-color: #fff;
        font-size: 12px;
        display: none;

        .triangle{
          position: absolute;
          top: 0;
          left: 20px;
          background-color: #fff;
          z-index: 8;
          width: 8px;
          height: 18px;
          font-size: 0;

          span{
            position: absolute;
            left: 50%;
            width: 1px;
            height: 12px;
            background-color: #ccc;
            transform-origin: top;
            transform: translateX(-50%) rotate(20deg);
          }

          span:last-child{
            transform: translateX(-50%) rotate(-20deg);
          }
        }

        .attrs{
          position: absolute;
          top: 12px;
          left: 0;
          z-index: 7;
          width: calc(100% + 20px);
          border: 1px solid #ccc;
          background-color: #fff;

          .attrs-content{
            width: 100%;
            min-height: 60px;
            padding-right: 10px;

            .attr-list{
              min-height: 38px;

              .attr{
                width: 68px;
                height: 48px;
                padding: 6px 10px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                overflow: hidden;
              }

              .val{
                width: calc(100% - 78px);
                min-height: 38px;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
                padding: 10px 4px;

                .val-child{
                  width: 66px;
                  height: 26px;
                  line-height: 26px;
                  text-align: center;
                  border: 1px solid #ccc;
                  border-radius: 2px;
                  margin-right: 6px;
                  white-space: nowrap;
                  overflow: hidden;
                  cursor: pointer;
                }
                .val-child:hover{
                  border-color: #f29b87;
                  color: #f29b87;
                }
                .val-child.active{
                  background-color: #f29b87;
                  border-color: #f29b87;
                  color: #fff;
                }
              }
            }

            .attr-list.texture .val-child:nth-child(n+4),
            .attr-list.site .val-child:nth-child(n+7),
            .attr-list.color .val-child:nth-child(n+5){
              margin-top: 6px;
            }

            .attr-list.site .val-child{
              width: 30px;
            }

            .attr-list.site .val-child:nth-child(6n){
              margin-right: 0;
            }

            .attr-list:last-child .val{
              border-bottom: none;
            }

            .attr-list.color .val-child{
              width: 40px;
            }
          }

          .attrs-btn{
            width: 100%;
            border-top: 4px solid #eee;
            padding: 10px 10px;
            box-sizing: border-box;

            .price{
              font-size: 18px;
              line-height: 26px;
              font-weight: bold;
            }

            .btn{
              height: 26px;
              padding: 0 10px;
              background-color: #eee;
              text-align: center;
              line-height: 26px;
              border-radius: 2px;
              color: #666;
              cursor: pointer;
            }

            .btn:last-child{
              background-color: #ff6900;
              color: #fff;
              margin-left: 10px;
            }
          }
        }
      }
    }

    .good-description {
      width: 185px;
      line-height: 20px;
      max-height: 50px;
      color: #666;
      margin-right: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .good-num {
      width: 6.7%;
      text-align: center;
      font-size: 18px;
      color: #333;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .good-price {
      width: 11%;
      font-family: twCenMt;
      font-size: 18px;
      color: #99999991;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .now-price{
      width: 11%;
      font-family: twCenMt;
      font-size: 18px;
      color: #f29b87;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .btn-box{
      width: 11.3%;

      .good-btn {
        height: 21px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        i {
          display: block;
          width: 18px;
          height: 21px;
          line-height: 21px;
          color: #999999;
          font-size: 20px;
          cursor: pointer;
          margin: 0 auto;
        }
      }
    }
  }
  .cart-radio {
    position: relative;
    .free-check {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(187, 187, 187, 1);
      border-radius: 4px;
      cursor: pointer;
    }
    .icongou {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: block;
      width: 16px;
      height: 16px;
      background: rgba(170, 138, 123, 1);
      border-radius: 2px;
      color: #fff;
      font-size: 16px;
      line-height: 16px;
      cursor: pointer;
    }
  }
  .img-bord {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: rgba(102, 102, 102, 0.4);
  }
  .lose-btn {
    display: block;
    width: 100px;
    height: 21px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    text-align: center;

    div:nth-child(1) {
      /*width: 43px;*/
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      color: #aa8a7b;
      cursor: pointer;
    }
    div:nth-child(2) {
      width: 1px;
      height: 21px;
      background-color: rgba(166, 166, 166, 1);
    }
    i {
      display: block;
      width: 18px;
      height: 21px;
      line-height: 21px;
      color: #999999;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.action .goods-attr{
  display: block !important;
}
</style>
