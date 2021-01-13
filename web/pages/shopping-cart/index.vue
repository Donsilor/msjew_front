<template>
<div>
  <div v-if="good.length > 0">
    <div class="cart">
      <div class="cart-container">
        <div class="cart-title">{{ $t(`${lang}.title`) }}</div>
        <div class="cart-top-bar">
          <span>{{ $t(`${lang}.info`) }}</span
          ><span>{{ $t(`${lang}.number`) }}</span
          ><span>{{ $t(`${lang}.oldPrice`) }}</span
          ><span>{{ $t(`${lang}.newPrice`) }}</span
          ><span>{{ $t(`${lang}.option`) }}</span>
        </div>
        <div class="cart-goods">
          <div v-for="(g, index) in good" :key="index">
            <div v-if="g.groupType === null && Number(g.data[0].goodsType) !== 19" class="finished"> 
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
            <div v-if="g.data[0].goodsType == '19'" class="couple">
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
                  g.data[0].simpleGoodsEntity.goodsStatus === 2"
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
            {{ formatCoin(coinType) }} {{  formatNumber(totalPrice)  }}
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
          <span>({{ $t(`${lang}.freeExpress`) }})</span>
        </div>
        <div class="total-price">
          {{ formatCoin(coinType) }} {{  formatNumber(totalPrice)  }}
        </div>
        <div v-if="!banBtn" class="go-order" @click="goOrder()">
          {{ $t(`${lang}.Settlement`) }}
        </div>
        <div v-if="banBtn" class="go-order ban">
          {{ $t(`${lang}.Settlement`) }}
        </div>
      </div>
    </div>
    <login-pop v-if="ifShowLoginPop" @closeLogin="closeLogin"></login-pop>
  </div>
  <div v-else>
    <div class="cart-empty" v-if="showingData.length > 0">
      <div class="empty-icon"><img src="../../static/empty/list.png" alt=""></div>
      <div class="no-product">{{ $t(`${lang}.emptyCart`) }}</div>
      <div class="To-pick" @click="goRing"><span class="btn">{{$t(`${lang}.Pick`)}}</span></div>
      <div class="Carousel">
        <div class="guess_like">{{$t(`${lang}.guessLike`)}}</div>
        <div class="us-host-box">
          <div class="us-host-list" :style="{height:320 + 'px'}">
            <swiper2 ref="us-host-list" :item-width="25" :indicator="false" :swiper-type="2" :style="{height:320 + 'px'}">
              <div v-for="(item, n) in showingData" :key="n" class="host-item product">
                <nuxt-link :to="item.to || { path: '/' }" target="_blank">
                  <div class="product-content">
                    <div class="product-image">
                      <img class="main-image" :src="item.goodsImages[0]" />
                      <img class="sub-image" :src="item.goodsImages[1] || item.goodsImages[0]" />

                      <!-- 折扣 -->
                      <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'discount'">
                        <span>{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ $t(`${lang}.discounts2`) }}</span>
                      </div>

                      <!-- 优惠券 -->
                      <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'money'">
                        <span>{{ $t(`${lang}.discounts1`) }}</span>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </swiper2>
          </div>

          <div class="host-list-bar">
            <div class="left-button" :class="{'effects': ifEffects == 1}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(false, 1)"><i class="el-icon-arrow-left"></i></div>
            <div class="right-button" :class="{'effects': ifEffects == 2}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(true, 2)"><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Axios from 'axios'
import single from './goodsCss/single'
import double from './goodsCss/double'
import madeUp from './goodsCss/madeUp'
import Bus from '../../assets/js/bus.js'
import List from '@/mixins/list.js'
const CancelToken = Axios.CancelToken 
const lang = 'cart'
export default {
  components: {
    single,
    double,
    madeUp
  },
  mixins: [List],
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
      soudout:'',
      coinType:'',
      isLogin:this.$store.getters.hadLogin,
      ifShowLoginPop: false,
      ifEffects: 0,
      sImgHeight: 0,
      arrowsTop: 0,
      listMethod: 'get',
      listUrl: '/web/common/search/index',
      sortOptions: this.CONDITION_INFO.sortBy.search,
      sortTypeIndex: 0,
      page_size: 999999,
      keyword: ''
    }
  },
  computed: {
    banBtn() {
      return this.tickNum === 0
    },
    // 列表特定body参数
    specialParams() {
      const sortInfo = this.usingSortInfo

      const data = {
        timeSock: new Date().getTime(),
        goodsId: '',
        categoryId: '',
        text: this.keyword,
        random:'all',
        // // 排序字段名
        // orderParam: sortInfo.sortBy,
        sortType: sortInfo.sortType,
        // 每页显示数量
        page_size: this.page_size,

        page: this.nextCurrPageNum
      }
      return data
    },
    // 处理用于显示的数据
    showingData() {
      // console.log("加载状态",this.allData)
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
          if(item.categoryId == 2){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/wedding-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'single'
              }
            }
          }else if(item.categoryId == 12){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/engagement-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'engagement'
              }
            }

          }else if(item.categoryId == 19){  //对戒
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/ring/wedding-rings/'+ item.id,
              query: {
                goodId: item.id,
                ringType: 'pair'
              }
            }
          }else if(item.categoryId == 15){
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/diamond-details/'+ item.id,
              query: {
                goodId: item.id
              }
            }

          }else{
            item.to = {
              // path: '/ring/wedding-rings/' + item.goodsName.replace(/\//g, ''),
              path: '/jewellery/necklace/'+ item.id,
              query: {
                goodId: item.id
              }
            }
          }

        }
      })
      let arr = allData
      let num = 10
      // console.log(111111111,num) 
      //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
      var temp_array = new Array();
      for (var index in arr) {
        // console.log(111111111,parseInt(arr[index].categoryId)) 
        if(arr[index].goodsImages.length > 1 && (parseInt(arr[index].categoryId) !== 15)&& (parseInt(arr[index].categoryId) !== 12)){
          // console.log(111111111,parseInt(arr[index].categoryId))
            temp_array.push(arr[index]);
        }
      }
      //取出的数值项,保存在此数组
      var return_array = new Array();
      for (var i = 0; i<num; i++) {
          //判断如果数组还有可以取出的元素,以防下标越界
          if (temp_array.length>0) {
              //在数组中产生一个随机索引
              var arrIndex = Math.floor(Math.random()*temp_array.length);
              //将此随机索引的对应的数组元素值复制出来
              return_array[i] = temp_array[arrIndex];
              //然后删掉此索引的数组元素,这时候temp_array变为新的数组
              temp_array.splice(arrIndex, 1);
          } else {
              //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
              break;
          }
      }
      // console.log("加载状态",return_array) 
      return return_array
    }
  },
  mounted(){
    const _this = this
    _this.$nextTick(() => {
      _this.onResize()
       _this.keyword = _this.$helpers.base64Decode(
        _this.$route.query.keyword || ''
      )
      _this.research()
    })

    Bus.$on('resizeFn', (val) => {
      _this.onResize()
    })
    
  },
  beforeMount() {
    if(JSON.stringify(this.$route.params) != "{}"){
      var data = this.$route.params.token;
      this.$store.commit('setToken', data.access_token)
      this.$store.commit('setUserInfo', data.member)
      this.$store.dispatch('synchronizeCart')
    }

    this.getList()
  },
  methods: {
    goRing(){
      this.$router.replace({
        path: '/wedding-rings/all',
      })
    },
    // 请求当前页数据
    getPageInfo(page = this.page) {
      const _this = this
      _this.loading = true
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$errorMessage('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${page}`
      // const reqMark = `${page}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        data: {
          page
        }
      }

      //console.log(`请求页码为：${page}`)

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
          // console.log(data)
          var data = data.data
          if (data.data) {
            _this.listData[page] = JSON.parse(JSON.stringify(data.data))
          }
          // _this.listData[page] = JSON.parse(JSON.stringify(data.list || []))
          delete data.data
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
    },
    nextHotSale (type, k) {
      this.addEffcts(k)
      this.$refs['us-host-list'].goNext(type)
    },
    addEffcts(k) {
      this.ifEffects = k;
      setTimeout(() => {
        this.ifEffects = 0
      },200)
    },
    onResize() {
      var that = this;
      var bWidth = document.body.clientWidth;

      if(bWidth < 1366){
        bWidth = 1366
      }else if(bWidth > 1520){
        bWidth = 1520
      }

      var cWidth = document.body.clientWidth;
      if(cWidth < 1200){
        cWidth = 1200
      }

      that.sImgHeight = Math.round(bWidth * 0.2) + 70;
      that.arrowsTop = Math.round(bWidth * 0.1)-2;
      that.sweetHeight = Math.round((bWidth / 1520) * 710);
      that.fontSize = Math.round((bWidth / 1366) * 38);
      that.hotHeight = Math.round(cWidth * 0.144);
      that.hotPadding = Math.round(cWidth * 0.04 + 40);
      that.diamondsPadding = Math.round(cWidth * 0.05);
      if(that.fontSize > 48){
        that.fontSize = 48
      }

      // if (that.banner[0] && that.banner[0].image) {
      //   const image = new Image()
      //   var width = 0, height = 0;
      //   image.src = that.banner[0].image
      //   image.onload = result => {
      //     width = image.width;
      //     height = image.height;
      //   }

      //   if(width && height){
      //     that.bannerHeight =
      //       Math.round((document.body.clientWidth * image.height) / image.width)
      //   }else{
      //     that.bannerHeight =
      //       Math.round((document.body.clientWidth * 640) / 1920)
      //   }
      // }
    },
    // 当勾选了一个商品以后删除另一个商品时更新底部数据
    refreshData(){
      this.totalNum=0
      this.totalPrice=0
      this.allTick=false
      this.tickNum = 0
      window.location.reload()
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
    getList() {
      this.$store
        .dispatch(`getCart`)
        .then(res => {
          for (const i in res) {
            res[i].tick = false
            this.coinType = res[i].coinType
          }
          // const result = []
          // let keys = Object.keys(res)
          // keys = keys.sort((a, b) => {
          //     return b - a
          // })
          // keys.forEach(item => {
          //     result.push(res[item])
          // })
          // this.good = result
          this.good = res
          if(this.good.length<=3){
            this.Settlement1 = true
            this.Settlement2 = false
          } else {
            window.addEventListener('scroll', this.handleScroll, true)
          }
          this.defaultAll()
        })
        .catch(err => {
          console.log(err)
        })
    },
    defaultAll(){
      if(!this.$store.getters.hadLogin){
        if (this.allTick) {
          for (const j in this.good) {
            this.good[j].tick = false
          }
          this.allTick = !this.allTick
          this.tickNum = 0
          this.totalNum = 0
          this.totalPrice = 0
        } else {
          this.tickNum = 0
          this.totalNum = 0
          this.totalPrice = 0
          for (const j in this.good) {
            this.soudout = this.good[j].data[0].simpleGoodsEntity.goodsStatus
            // if(this.good[j].groupType == 1){
            //   if(parseInt(this.good[j].data[0].ringsSimpleGoodsEntity.status) === 0){
            //       this.good[j].tick = false
            //       continue;
            //     }
            //     this.tickNum += 1
            //     this.totalNum += 1

            // }else 
            if(this.good[j].groupType == 2){
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

            if(this.good[j].groupType == 2){
              if(this.good[j].data[0].coupon.hasOwnProperty('discount')){
                // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].data[0].coupon.discount.price)
              }else{
                // this.totalPrice -=parseFloat(this.good[i].price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].data[0].simpleGoodsEntity.salePrice)
              }

              if(this.good[j].data[1].coupon.hasOwnProperty('discount')){
                // this.totalPrice -=parseFloat(this.good[i].data[1].coupon.discount.price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].data[1].coupon.discount.price)
              }else{
                // this.totalPrice -=parseFloat(this.good[i].price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].data[1].simpleGoodsEntity.salePrice)
              }
            }else{
              if(this.good[j].data[0].coupon.hasOwnProperty('discount')){
                // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].data[0].coupon.discount.price)
              }else{
                // this.totalPrice -=parseFloat(this.good[i].price)
                this.totalPrice = this.floatAdd(this.totalPrice, this.good[j].price)
              }
            }
          }

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
      if (this.allTick) {
        for (const i in this.good) {
          this.good[i].tick = false
        }
        this.allTick = !this.allTick
        this.tickNum = 0
        this.totalNum = 0
        this.totalPrice = 0
      } else {
        this.tickNum = 0
        this.totalNum = 0
        this.totalPrice = 0
        for (const i in this.good) {
          // if(this.good[i].groupType == 1){
          //   // console.log(11111)
          //    if(parseInt(this.good[i].data[0].ringsSimpleGoodsEntity.status) === 0){
          //       this.good[i].tick = false
          //       continue;
          //     }
          //     this.tickNum += 1
          //     this.totalNum += 1

          // }else 
          if(this.good[i].groupType == 2){
              this.tickNum += 1
              this.totalNum += 1

          }else{
              if(this.good[i].data[0].simpleGoodsEntity.goodsStatus!==2){
                this.good[i].tick = false
                continue;
              }
              this.tickNum += 1
              this.totalNum += 1
          }

          this.good[i].tick = true

        if(this.good[i].groupType == 2){
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[0].simpleGoodsEntity.salePrice)
          }

          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[1].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[1].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[1].simpleGoodsEntity.salePrice)
          }
        }else{
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].price)
          }
        }

          // this.totalPrice +=parseFloat(this.good[i].price)
        }
        // this.tickNum = this.good.length
        // this.totalNum = this.good.length
        this.allTick = !this.allTick
      }
      this.good = JSON.parse(JSON.stringify(this.good))
    },
    ticksCHeck(i) {
      this.good[i].tick ? this.tickNum-- : this.tickNum++
      this.good[i].tick ? this.totalNum-- : this.totalNum++

      if(this.good[i].tick){
        if(this.good[i].groupType == 2){
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].simpleGoodsEntity.salePrice)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].data[0].simpleGoodsEntity.salePrice)
          }

          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[1].coupon.discount.price)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].data[1].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].simpleGoodsEntity.salePrice)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].data[1].simpleGoodsEntity.salePrice)
          }
        }else{
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice -=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            // this.totalPrice -=parseFloat(this.good[i].price)
            this.totalPrice = this.floatSub(this.totalPrice, this.good[i].price)
          }
        }
      }else{
        if(this.good[i].groupType == 2){
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice +=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            this.totalPrice +=parseFloat(this.good[i].data[0].simpleGoodsEntity.salePrice)
          }

          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            // this.totalPrice +=parseFloat(this.good[i].data[1].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[1].coupon.discount.price)
          }else{
            // this.totalPrice +=parseFloat(this.good[i].simpleGoodsEntity.salePrice)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[1].simpleGoodsEntity.salePrice)
          }
        }else{
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            // this.totalPrice +=parseFloat(this.good[i].data[0].coupon.discount.price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].data[0].coupon.discount.price)
          }else{
            // this.totalPrice +=parseFloat(this.good[i].price)
            this.totalPrice = this.floatAdd(this.totalPrice, this.good[i].price)
          }
        }
      }

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
          this.good[i].groupType === 2 &&
          this.good[i].data[0].simpleGoodsEntity.goodsStatus !== 2 &&
          this.good[i].data[1].simpleGoodsEntity.goodsStatus !== 2
        ) {
          data.push(this.good[i].id)
        }
      }

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
      // if(this.$store.state.platform == 20 && !this.$store.state.token){
      //   this.ifShowLoginPop = true
      //   return
      // }

      const data = []
      for (const i in this.good) {
        if (this.good[i].tick) {
          data.push(this.good[i].id)
        }
      }

      if (data.length !== this.tickNum) return
      const cartIds = data.join(',')

      this.$router.push({
        path: `/billing-address`,
        query: { cartIds }
      })
    },
    closeLogin() {
      this.ifShowLoginPop = false
    }
  }
}
</script>

<style lang="less" scoped>
.cart2{
    position: fixed!important;
    z-index: 999;
    bottom:0;
    width: 100%;
    min-width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    background-color: #ffffff;
    .cart-bot-bar {
      position: relative;
      max-width: 1300px;
      margin: 0 auto;
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
  }
.cart {
  max-width: 1360px;
  min-width: 1200px;
  width: 100%;
  text-align: left;
  overflow: hidden;
  margin: 0 auto;
  position: relative;

  .cart-container{
    position: relative;
    overflow: hidden;
    max-width: 1360px;
    min-width: 1200px;
    width: 100%;
    color: #000;
    font-size: 14px;
    background: rgba(248, 248, 248, 1);
    padding: 82px 30px 25px;
    box-sizing: border-box;
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
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      margin: 0 0 16px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #666;
      padding-left: 50px;
      box-sizing: border-box;
      text-align: center;

      span:nth-child(1) {
        text-align: left;
        width: 60%;
      }
      span:nth-child(2) {
        width: 6.7%;
      }
      span:nth-child(3) {
        width: 11%;
      }
      span:nth-child(4) {
        width: 11%;
      }
      span:nth-child(5) {
        width: 11.3%;
      }
    }
    .cart-goods {
      width: 100%;
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 17px;
      .finished {
        width: 100%;
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
      max-width: 1300px;
      height: 100px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 2%;
      box-sizing: border-box;
      .cart-radio {
        width: 3%;
        height: 100px;
      }
      .full-radio {
        width: 4%;
        font-size: 14px;
        color: #666;
        margin-right: 3%;
        cursor: pointer;
      }
      .delete {
        position: relative;
        font-size: 14px;
        color: #666;
        width: 6%;
        padding-left: 2%;
        box-sizing: border-box;
        cursor: pointer;
        i {
          position: absolute;
          left: 0;
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
        margin: 0 3%;
      }
      .clean-useless {
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        width: 12%;
        padding-left: 2%;
        box-sizing: border-box;
        margin-right: 8%;
        i {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 16px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          color: #999;
        }
      }
      .already-choose {
        width: 20%;
        display: flex;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #666666;
        margin-right: 2%;
        .choose-num {
          width: 24%;
          color: #666666;
          font-size: 16px;
          text-align: center;
        }
        span {
          color: #999;
        }
      }
      .total-price {
        max-width: 20%;
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
.cart-empty{
  height: 100%;
  margin-top: 30px;
  .empty-icon{
    text-align: center;
  }
  .no-product{
    line-height: 25px;
    text-align: center;
    width: 20%;
    margin: 0 auto;
  }
  .To-pick{
    text-align: center;
    .btn{
      display: inline-block;
      padding: 5px 50px;
      border-radius: 3px;
      background: #f29b87 ;
      color:#fff;
      font-size: 14px;
      margin-top: 20px;
      line-height: 25px;
      cursor: pointer;
    }
  }
  .product{
    // border: 10px solid transparent;
  }
  .host-item{
    .product-content {
      position: relative;
      padding: 10px;
      .product-image {
        position: relative;
        overflow: hidden;
        .main-image,
        .sub-image {
          /*width: 320px;*/
          width: 100%;
          max-height: 320px;
          /*transform: scale(1, 1);*/
          /*transition: all 0.2s linear;*/
          display: inline-block;
        }
        .sub-image {
          display: none;
        }
        .wish-state {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: all 0.1s linear;
  
          .iconfont {
            font-size: 24px;
            color: #aaa;
          }
          .iconxin {
            color: #EFA19F;
          }
        }
      }
  
      .product-info {
        padding: 6px 20px 20px 20px;
        box-sizing: border-box;
  
        .product-price {
          margin-bottom: 6px;
          text-align: center;
          // font-size: 24px;
          font-size: 22px;
          font-family: twCenMT;
          font-weight: 400;
          color: rgba(242, 155, 135, 1);
          display: flex;
          justify-content: center;
          .coin {
            // margin-right: 6px;
            line-height: 31px;
            font-size: 18px;
          }
  
          .price {
          }
        }
  
        .product-title {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    &:hover {
      &.product {
        // padding: 5px;
        // border: 10px solid rgba(244, 242, 243, 1);
      }
      .product-content {
        .product-image {
          .main-image {
            display: none;
          }
          .sub-image {
            display: inline-block;
          }
          .wish-state {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  .Carousel{
    margin: 100px 0;
    .guess_like{
      text-align: center;
      margin: 30px 0;
      font-size: 25px;
    }
    .us-host-box,
    .new-products-box {
      max-width: 1360px;
      min-width: 1000px;
      width: 70%;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .us-host-list,
    .new-products {
      max-width: 1360px;
      min-width: 1000px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
    }
    .host-item {
      width: 100%;
      font-size: 0;
      text-align: center;

      .item-box {
        display: inline-block;
        width: 80%;

        .product-image {
          width: 100%;
          overflow: hidden;

          img {
            width: 90%;
            height: 90%;
            margin: 5% 0;
          }
        }
        .product-image:hover img {
          transform: scale(1.11);
        }

        .price {
          font-size: 18px;
          line-height: 50px;
        }
      }
    }

    .host-list-bar {
      position: absolute;
      top: 0;
      left: -5%;
      width: 110%;
      height: 95%;
      z-index: -1;
      box-sizing: border-box;

      .left-button {
        position: absolute;
        left: 0;
        top: 30%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        // background: #ff6900 url('/index-us/icon-left.png') no-repeat 48% 48%;
        background-size: 90% 90%;
        border-radius: 2px;
        i{
          font-size: 40px;
          cursor: pointer;
          color:#ff6900;
          font-weight: bold;
        }
      }

      .right-button {
        position: absolute;
        right: 0;
        top: 30%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        // background: #ff6900 url('/index-us/icon-right.png') no-repeat 48% 48%;
        background-size: 90% 90%;
        border-radius: 2px;
        i{
          font-size: 40px;
          cursor: pointer;
          color:#ff6900;
          font-weight: bold;
        }
      }
    }

    .sweet {
      padding: 100px 0;
      box-sizing: border-box;
      background-color: #fbf8f3;

      .sweet-img {
        display: flex;
        width: 1520px;
        height: 706px;
        margin: 0 auto;

        div {
          overflow: hidden;
          position: relative;
        }

        .img-l {
          width: 276px;
          height: 100%;
        }

        .img-m {
          display: flex;
          flex-direction: column;
          width: 674px;
          height: 100%;
          margin: 0 20px;


          .img-m-t {
            display: flex;
            height: 378px;
            margin-bottom: 20px;

            .img-m-t-l {
              width: 330px;
              height: 100%;
              margin-right: 20px;
            }
            .img-m-t-r {
              width: 324px;
              height: 100%;
            }
          }
          .img-m-b {
            display: flex;
            height: 308px;

            .img-m-b-l {
              width: 357px;
              height: 100%;
              margin-right: 20px;
            }
            .img-m-b-r {
              width: 297px;
              height: 100%;
            }
          }

        }

        .img-r {
          width: 530px;
          height: 100%;
          display: flex;
          flex-direction: column;

          .img-r-t {
            height: 280px;
            margin-bottom: 20px;
          }

          .img-r-b {
            height: 406px;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .mask-layer {
        position: absolute !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        // display: none;
      }

      .mask-layer:hover {
        background-color: rgba(0, 0, 0, 0.3);
        transition: background-color 0.3s ease-in;
      }
    }

    // .effects {
    //   transform: scale(0.96) translateY(-50%) !important;
    //   background-color: #e5d5c7 !important;
    //   border-radius: 3px !important;
    // }
  }
}
</style>
