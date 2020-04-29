<template>
<div>
  <div class="cart">
    <div class="cart-container">
      <div class="cart-title">{{ $t(`${lang}.title`) }}</div>
      <div class="cart-top-bar">
        <span>{{ $t(`${lang}.info`) }}</span
        ><span>{{ $t(`${lang}.number`) }}</span
        ><span>{{ $t(`${lang}.price`) }}</span
        ><span>{{ $t(`${lang}.option`) }}</span>
      </div>
      <div class="cart-goods">
        <div v-for="(g, index) in good" :key="index">
          <div v-if="g.groupType === null" class="finished">
            <div
              v-if="g.data[0].simpleGoodsEntity.goodsStatus === 2"
              class="cart-radio"
            >
              <div
                v-show="!g.tick"
                class="free-check"
                @click="ticksCHeck(index)"
              />
              <i
                v-show="g.tick"
                class="iconfont icongou"
                @click="ticksCHeck(index)"
              />
            </div>
            <div v-else class="cart-radio"></div>
            <!-- :num='totalNum' :price='totalPrice' @totalprice='changePrice'-->
            <single :g="g" @reloadList="getList"   @bottomData='refreshData' ></single>
          </div>
          <div v-if="g.groupType === 1" class="couple">
            <!-- <div
              v-if="
                g.data[0].ringsSimpleGoodsEntity.simpleGoodsEntity
                  .goodsStatus === 2 &&
                  g.data[1].ringsSimpleGoodsEntity.simpleGoodsEntity
                    .goodsStatus === 2
              "
              class="cart-radio"
            > -->
            <div
              v-if="
                g.data[0].ringsSimpleGoodsEntity.status === '1'"
              class="cart-radio"
            >
              <div
                v-show="!g.tick"
                class="free-check"
                @click="ticksCHeck(index)"
              />
              <i
                v-show="g.tick"
                class="iconfont icongou"
                @click="ticksCHeck(index)"
              />
            </div>
            <div v-else class="cart-radio"></div>
            <double :g="g" @reloadList="getList"  @bottomData='refreshData' ></double>
          </div>
          <div v-if="g.groupType === 2" class="customization">
            <div
              v-if="
                g.data[0].simpleGoodsEntity.goodsStatus === 2 &&
                  g.data[1].simpleGoodsEntity.goodsStatus === 2
              "
              class="cart-radio"
            >
              <div
                v-show="!g.tick"
                class="free-check"
                @click="ticksCHeck(index)"
              />
              <i
                v-show="g.tick"
                class="iconfont icongou"
                @click="ticksCHeck(index)"
              />
            </div>
            <div v-else class="cart-radio"></div>
            <madeUp
              :g="g"
              :word="$t(`${lang}.customMade`)"
              @reloadList="getList"
              @bottomData='refreshData' 
            ></madeUp>
          </div>
        </div>
      </div>
      <div class="cart-bot-bar" v-show="Settlement1">
        <div class="cart-radio">
          <div v-show="!allTick" class="free-check" @click="allTicks()" />
          <i v-show="allTick" class="iconfont icongou" @click="allTicks()" />
        </div>
        <div class="full-radio" @click="allTicks()">
          {{ $t(`${lang}.allTick`) }}
        </div>
        <div class="delete" @click="checkDelete()">
          <i class="iconfont iconlajitong" />
          {{ $t(`${lang}.delete`) }}
        </div>
        <div class="cart-bot-line" />
        <div class="clean-useless" @click="deleteLoseGoods()">
          <i class="iconfont iconqingchushixiaobaobei" />
          {{ $t(`${lang}.cleanInvalidBaby`) }}
        </div>
        <div class="already-choose">
          {{ $t(`${lang}.checked`) }}
          <div class="choose-num">{{ totalNum }}</div>
          {{ $t(`${lang}.total`) }}
          <span>（{{ $t(`${lang}.freeExpress`) }})</span>
        </div>
        <div class="total-price">
          {{ $store.state.coin }} {{  formatNumber(totalPrice)  }}
        </div>
        <div v-if="!banBtn" class="go-order" @click="goOrder()">
          {{ $t(`${lang}.Settlement`) }}
        </div>
        <div v-if="banBtn" class="go-order ban">
          {{ $t(`${lang}.Settlement`) }}
        </div>
      </div>
    </div>
    <message-box
      v-show="noGoods"
      :title="$t(`${lang}.msgTitle2`)"
      :message="$t(`${lang}.msgContent2`)"
      type="one"
      @done="noGoods = false"
    />
  </div>
  <div class="cart2">
    <div class="cart-bot-bar positons" :class="{positon:cartp}" v-show="Settlement2">
      <div class="cart-radio">
        <div v-show="!allTick" class="free-check" @click="allTicks()" />
        <i v-show="allTick" class="iconfont icongou" @click="allTicks()" />
      </div>
      <div class="full-radio" @click="allTicks()">
        {{ $t(`${lang}.allTick`) }}
      </div>
      <div class="delete" @click="checkDelete()">
        <i class="iconfont iconlajitong" />
        {{ $t(`${lang}.delete`) }}
      </div>
      <div class="cart-bot-line" />
      <div class="clean-useless" @click="deleteLoseGoods()">
        <i class="iconfont iconqingchushixiaobaobei" />
        {{ $t(`${lang}.cleanInvalidBaby`) }}
      </div>
      <div class="already-choose">
        {{ $t(`${lang}.checked`) }}
        <div class="choose-num">{{ totalNum }}</div>
        {{ $t(`${lang}.total`) }}
        <span>（{{ $t(`${lang}.freeExpress`) }})</span>
      </div>
      <div class="total-price">
        {{ $store.state.coin }} {{  formatNumber(totalPrice)  }}
      </div>
      <div v-if="!banBtn" class="go-order" @click="goOrder()">
        {{ $t(`${lang}.Settlement`) }}
      </div>
      <div v-if="banBtn" class="go-order ban">
        {{ $t(`${lang}.Settlement`) }}
      </div>
    </div>
  </div> 
</div>
</template>

<script>
import single from './goodsCss/single'
import double from './goodsCss/double'
import madeUp from './goodsCss/madeUp'
const lang = 'cart'
export default {
  components: {
    single,
    double,
    madeUp
  },
  data() {
    return {
      lang,
      good: [],
      allTick: false,
      tickNum: 0,
      totalNum: 0,
      totalPrice: 0,
      noGoods: false,
      cartp:false,
      Settlement1:true,
      Settlement2:false,
      scroll: '',
      soudout:''
    }
  },
  computed: {
    banBtn() {
      return this.tickNum === 0
    }
    
  },
  beforeMount() {
    this.getList()
    
  },

  created(){
    
  },
  mounted(){
    
    this.$nextTick(() => {
    })
  },

  methods: {
    // 当勾选了一个商品以后删除另一个商品时更新底部数据
    refreshData(){
      this.totalNum=0
      this.totalPrice=0
      this.allTick=false  
      this.tickNum = 0  
    },
    handleScroll(e){
        // 为了计算距离顶部的高度，当高度大于150显示回顶部图标，小于150则隐藏
        const that = this
        let scrollTop = e.target.scrollTop;
        // console.log("scrollTop",scrollTop)
        that.scrollTop = scrollTop
        if (that.scrollTop > 150) {
          this.Settlement1 = false
          this.Settlement2 = true
        } else {
          this.Settlement1 = true
          this.Settlement2 = false
        }
    },
    // handleScroll(){
    //   console.log('滚动条发生滚动了')
    //   this.Settlement1 = false
    //   this.Settlement2 = true
    // },
    getList() {
      this.$store
        .dispatch(`getCart`)
        .then(res => {
          // console.log("1230",res)
          for (const i in res) {
            res[i].tick = false
          }
          this.good = res
          if(this.good.length<=3){
            console.log(11111111111,this.good.length)
            this.Settlement1 = true
            this.Settlement2 = false
          } else {
            console.log(2222222)
            window.addEventListener('scroll', this.handleScroll, true)
          }
          this.defaultAll()
        })
        .catch(err => {
          console.log(err)
        })
    },
    defaultAll(){
      // console.log(this.good)
      if(!this.$store.getters.hadLogin){
        // console.log("全选",this.allTick)
        if (this.allTick) {
          for (const j in this.good) {
            this.good[j].tick = false
          }
          this.allTick = !this.allTick
          this.tickNum = 0
          this.totalNum = 0
          this.totalPrice = 0
          console.log(1111111)
        } else {
           console.log(22222)
          this.tickNum = 0
          this.totalNum = 0
          this.totalPrice = 0
          for (const j in this.good) {
            this.soudout = this.good[j].data[0].simpleGoodsEntity.goodsStatus
            if(this.good[j].groupType == 1){
              if(parseInt(this.good[j].data[0].ringsSimpleGoodsEntity.status) === 0){
                  this.good[j].tick = false
                  continue;
                }
                this.tickNum += 1
                this.totalNum += 1

            }else if(this.good[j].groupType == 2){
                this.tickNum += 1
                this.totalNum += 1

            }else{
                if(this.good[j].data[0].simpleGoodsEntity.goodsStatus!==2){
                  this.good[j].tick = false
                  continue;
                }
                this.tickNum += 1
                this.totalNum += 1
            }

            this.good[j].tick = true
            // console.log("tick",this.good[i].tick)
          
            // console.log("price=====1",this.good[i].data[0].simpleGoodsEntity.goodsStatus)
            this.totalPrice +=parseFloat(this.good[j].price) 
          }
          // console.log("price=====2",this.good)
          // this.tickNum = this.good.length
          // this.totalNum = this.good.length
          if(this.good.length !== 0){
            this.allTick = !this.allTick
          }
          if(this.good.length == 1 && this.soudout !== 2){
            this.allTick = false
          }
        }
        this.good = JSON.parse(JSON.stringify(this.good))
      }
    },
    allTicks() {
      // console.log("全选",this.allTick)
      if (this.allTick) {
        for (const i in this.good) {
          this.good[i].tick = false
        }
        this.allTick = !this.allTick
        this.tickNum = 0
        this.totalNum = 0
        this.totalPrice = 0
        // console.log(3333333)
      } else {
        // console.log(44444)
        this.tickNum = 0
        this.totalNum = 0
        this.totalPrice = 0
        for (const i in this.good) {
          if(this.good[i].groupType == 1){
            // console.log(11111)
             if(parseInt(this.good[i].data[0].ringsSimpleGoodsEntity.status) === 0){
                this.good[i].tick = false
                continue;
              }
              this.tickNum += 1
              this.totalNum += 1

          }else if(this.good[i].groupType == 2){
            // console.log(22222)
              this.tickNum += 1
              this.totalNum += 1

          }else{
            // console.log(333333)
              if(this.good[i].data[0].simpleGoodsEntity.goodsStatus!==2){
                this.good[i].tick = false
                continue;
              }
              this.tickNum += 1
              this.totalNum += 1
          }

          this.good[i].tick = true
          // console.log("tick",this.good[i].tick)
         
          // console.log("price=====1",this.good[i].data[0].simpleGoodsEntity.goodsStatus)
          this.totalPrice +=parseFloat(this.good[i].price) 
        }
        // console.log("price=====2",this.good)
        // this.tickNum = this.good.length
        // this.totalNum = this.good.length
        this.allTick = !this.allTick
      }
      this.good = JSON.parse(JSON.stringify(this.good))
    },
    ticksCHeck(i) {
      if(this.good[i].groupType == 1&&this.good[i].groupType == 2){
          this.good[i].tick ? this.tickNum -= 1  : this.tickNum += 1
          this.good[i].tick ? this.totalNum -= 1 : this.totalNum +=1
      }else{
         this.good[i].tick ? this.tickNum-- : this.tickNum++
         this.good[i].tick ? this.totalNum-- : this.totalNum++
      }

     
      this.good[i].tick
        ? (this.totalPrice -=parseFloat(this.good[i].price) )
        : (this.totalPrice += parseFloat(this.good[i].price))
      this.good[i].tick = !this.good[i].tick
      this.good = JSON.parse(JSON.stringify(this.good))
      if (this.tickNum == this.good.length) {
        this.allTick = true
      } else {
        this.allTick = false
      }
    },
    checkDelete() {
      if (this.tickNum === 0) {
        this.noGoods = true
        return
      }
      const data = []
      for (const i in this.good) {
        if (this.good[i].tick) {
          data.push(this.good[i].id)
        }
      }
      this.$store
        .dispatch(`removeCart`, data)
        .then(data => {
          this.totalNum=0
          this.totalPrice=0
          this.allTick=false  
          this.$successMessage(this.$t(`${lang}.deleteSuccess`))
          this.getList()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    deleteLoseGoods() {
      const data = []
      for (const i in this.good) {
        if (
          this.good[i].groupType === null &&
          this.good[i].data[0].simpleGoodsEntity.goodsStatus !== 2
        ) {
          data.push(this.good[i].id)
        } else if (
          this.good[i].data[0].simpleGoodsEntity.goodsStatus !== 2 &&
          this.good[i].data[1].simpleGoodsEntity.goodsStatus !== 2
        ) {
          data.push(this.good[i].id)
        }
      }
      // console.log("下架", this.good[i].data[0].simpleGoodsEntity.goodsStatus)
      if (data.length === 0) return
      this.$store
        .dispatch(`removeCart`, data)
        .then(data => {
          this.$successMessage(this.$t(`cart.deleteSuccess`))
          this.getList()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    goOrder() {
      const data = []
      for (const i in this.good) {
        if (this.good[i].tick) {
          data.push(this.good[i].id)
        }
      // console.log("length",this.good[i].tick)
      }
      //  console.log("length333",this.tickNum)
      //  console.log("data.length",data.length,this.tickNum)
      if (data.length !== this.tickNum) return
      const cartIds = data.join(',')
      this.$router.push({
        path: `/billing-address`,
        query: { cartIds }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.positons{
  position: fixed!important;
  z-index: 999;
  bottom:0;
}
.cart2{
    .cart-bot-bar {
      position: relative;
      // width: 1300px;
      width: 100%;
      height: 100px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      .cart-radio {
        width: 40px;
        height: 100px;
      }
      .full-radio {
        font-size: 14px;
        color: #666;
        margin-right: 68px;
        cursor: pointer;
      }
      .delete {
        position: relative;
        font-size: 14px;
        color: #666;
        margin-right: 55px;
        cursor: pointer;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 20px;
          width: 18px;
          height: 21px;
          line-height: 21px;
          top: -3px;
          color: #999;
        }
      }
      .add-wish {
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-right: 28px;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 20px;
          width: 20px;
          height: 19px;
          line-height: 19px;
          top: -1px;
          color: #999;
        }
      }
      .cart-bot-line {
        width: 1px;
        height: 20px;
        background: rgba(221, 221, 221, 1);
        margin-right: 49px;
      }
      .clean-useless {
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-right: 156px;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 16px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          top: 0;
          color: #999;
        }
      }
      .already-choose {
        width: 61+92+117px;
        display: flex;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #666666;
        margin-right: 24px;
        .choose-num {
          width: 72px;
          color: #666666;
          font-size: 16px;
          text-align: center;
        }
        span {
          color: #999;
        }
      }
      .total-price {
        font-family: twCenMt;
        font-size: 22px;
        color: #f29b87;
      }
      .go-order {
        width: 170px;
        height: 40px;
        line-height: 40px;
        background: rgba(170, 138, 123, 1);
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        text-align: center;
        position: absolute;
        right: 49px;
        top: 30px;
      }
      .ban {
        background: #ccc;
      }
    }
  }
.cart {
  width: 1360px;
  text-align: left;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  
  .cart-container{
    position: relative;
    overflow: hidden;
    width: 1360px;
    color: #000;
    font-size: 14px;
    background: rgba(248, 248, 248, 1);
    padding: 82px 30px 25px;
    .cart-title {
      height: 24px;
      line-height: 24px;
      color: #1b1b1b;
      font-size: 24px;
      position: absolute;
      left: 28px;
      top: 32px;
    }
    .cart-top-bar {
      box-sizing: border-box;
      width: 1300px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      margin: 0 0 16px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #666;
      padding-left: 50px;
      span {
        display: block;
      }
      span:nth-child(1) {
        width: 140+269+71+185+83px;
      }
      span:nth-child(2) {
        width: 60+120px;
      }
      span:nth-child(3) {
        width: 207px;
      }
    }
    .cart-goods {
      width: 1300px;
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 17px;
      .finished {
        width: 1300px;
        height: 179px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        .cart-radio {
          width: 49px;
          height: 178px;
        }
      }
      .couple {
        width: 1300px;
        height: 174 * 2+2px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        .cart-radio {
          width: 49px;
          height: 174 * 2+2px;
        }
      }
      .customization {
        width: 1300px;
        height: 282px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        .cart-radio {
          width: 49px;
          height: 282px;
        }
      }
    }
    .cart-bot-bar {
      position: relative;
      width: 1300px;
      height: 100px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      .cart-radio {
        width: 40px;
        height: 100px;
      }
      .full-radio {
        font-size: 14px;
        color: #666;
        margin-right: 68px;
        cursor: pointer;
      }
      .delete {
        position: relative;
        font-size: 14px;
        color: #666;
        margin-right: 55px;
        cursor: pointer;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 20px;
          width: 18px;
          height: 21px;
          line-height: 21px;
          top: -3px;
          color: #999;
        }
      }
      .add-wish {
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-right: 28px;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 20px;
          width: 20px;
          height: 19px;
          line-height: 19px;
          top: -1px;
          color: #999;
        }
      }
      .cart-bot-line {
        width: 1px;
        height: 20px;
        background: rgba(221, 221, 221, 1);
        margin-right: 49px;
      }
      .clean-useless {
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-right: 156px;
        i {
          display: block;
          position: absolute;
          left: -9px;
          transform: translateX(-100%);
          font-size: 16px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          top: 0;
          color: #999;
        }
      }
      .already-choose {
        width: 61+92+117px;
        display: flex;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #666666;
        margin-right: 24px;
        .choose-num {
          width: 72px;
          color: #666666;
          font-size: 16px;
          text-align: center;
        }
        span {
          color: #999;
        }
      }
      .total-price {
        font-family: twCenMt;
        font-size: 22px;
        color: #f29b87;
      }
      .go-order {
        width: 170px;
        height: 40px;
        line-height: 40px;
        background: rgba(170, 138, 123, 1);
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        text-align: center;
        position: absolute;
        right: 49px;
        top: 30px;
      }
      .ban {
        background: #ccc;
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
  .good-img,
  .good-desc {
    cursor: pointer;
  }
}
</style>
