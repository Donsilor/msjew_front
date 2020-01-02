<template>
  <div class="cart">
    <div
      v-loading="loading"
      class="cart-container">
      <div class="cart-title">{{ lang.title }}</div>
      <div class="cart-top-bar">
        <span>{{ lang.info }}</span><span>{{ lang.number }}</span><span>{{ lang.price }}</span><span>{{ lang.option }}</span>
      </div>
      <div class="cart-goods">
        <!--有效商品-->

        <!--成品样式-->
        <div
          v-loading="g.loading"
          v-for="(g,index) in goods.full"
          :key="index"
          class="finished">
          <div class="cart-radio">
            <div
              v-show="!g.tick"
              class="free-check"
              @click="ticksCHeck(g)"/>
            <i
              v-show="g.tick"
              class="iconfont icongou"
              @click="ticksCHeck(g)"/>
          </div>
          <div class="good-info">
            <div
              class="good-img"
              @click="goDetail(g.data, g.type)">
              <img
                :src="IMG_URL + g.data.simpleGoodsEntity.goodsImages"
                alt="">
            </div>
            <div
              class="good-desc"
              @click="goDetail(g.data, g.type)">
              <div>
                {{ g.data.simpleGoodsEntity.goodsName }}
              </div>
              <div>SKU：{{ g.data.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
            </div>
            <div
              v-if="g.data.simpleGoodsEntity.categoryId !== 1"
              class="good-information">
              <div
                v-for="(i,k) in g.data.simpleGoodsEntity.detailConfig"
                :key="k"
                class="infos">
                <div>{{ i.configVal }}</div>
                <div>{{ i.configAttrIVal }}</div>
              </div>
            </div>
            <div
              v-if="g.data.simpleGoodsEntity.categoryId === 1"
              class="good-description">
              <span
                v-for="(i,k) in g.data.simpleGoodsEntity.baseConfig"
                :key="'info-' + k">
                <span v-if="k !== g.data.simpleGoodsEntity.baseConfig.length-1">{{ i.configAttrIVal }},</span>
                <span v-if="k === g.data.simpleGoodsEntity.baseConfig.length-1">{{ i.configAttrIVal }}</span>
              </span>
            </div>
            <div class="good-num">{{ g.data.goodsCount }}</div>
            <div class="good-price">{{ coinType }} {{ formatMoney(g.data.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}</div>
            <div class="good-btn">
              <i
                class="iconfont iconlajitong"
                @click="deleteGood(0, 1, g)"/>
            </div>
          </div>
        </div>

        <!--定制样式-->
        <div
          v-loading="g.loading"
          v-for="(g) in goods.single"
          class="customization">
          <div class="cart-radio">
            <div
              v-show="!g.tick"
              class="free-check"
              @click="ticksCHeck(g)"/>
            <i
              v-show="g.tick"
              class="iconfont icongou"
              @click="ticksCHeck(g)"/>
          </div>
          <div class="good-info">
            <div class="good-info-line">
              <div
                class="good-img"
                @click="goDetail(g.data.first, g.type)">
                <img
                  :src="IMG_URL + g.data.first.simpleGoodsEntity.goodsImages"
                  alt="">
              </div>
              <div
                class="good-desc"
                @click="goDetail(g.data.first, g.type)">
                <div>
                  {{ g.data.first.simpleGoodsEntity.goodsName }}
                </div>
                <div>SKU：{{ g.data.first.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
              </div>
              <div class="good-information">
                <div
                  v-for="s in g.data.first.simpleGoodsEntity.detailConfig"
                  class="infos">
                  <div>{{ s.configVal }}</div>
                  <div>{{ s.configAttrIVal }}</div>
                </div>
              </div>
              <div class="good-num">{{ g.data.first.goodsCount }}</div>
              <div class="good-price">{{ coinType }} {{ formatMoney(g.data.first.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}</div>
            </div>
            <div class="good-info-dotted" />
            <div class="good-info-line">
              <div
                class="good-img"
                @click="goDetail(g.data.second, g.type)">
                <img
                  :src="IMG_URL + g.data.second.simpleGoodsEntity.goodsImages"
                  alt="">
              </div>
              <div
                class="good-desc"
                @click="goDetail(g.data.second, g.type)">
                <div>
                  {{ g.data.second.simpleGoodsEntity.goodsName }}
                </div>
                <div>SKU：{{ g.data.second.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
              </div>
              <div class="good-description">
                <span v-for="(i, k) in g.data.second.simpleGoodsEntity.baseConfig">
                  <span v-if="k !== g.data.second.simpleGoodsEntity.baseConfig.length-1">{{ i.configAttrIVal }},</span>
                  <span v-if="k === g.data.second.simpleGoodsEntity.baseConfig.length-1">{{ i.configAttrIVal }}</span>
                </span>
              </div>
              <div class="good-num">{{ g.data.second.goodsCount }}</div>
              <div class="good-price">{{ coinType }} {{ formatMoney(g.data.second.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}</div>
            </div>
            <div class="good-btn">
              <i
                class="iconfont iconlajitong"
                @click="deleteGood(0, 2, g)"/>
            </div>
            <div class="good-dingzhi-logo">
              <i class="iconfont iconstar-jt"/>
              <span>{{ lang['custom-made'] }}</span>
            </div>
          </div>
        </div>

        <!--对戒样式-->
        <div
          v-loading="g.loading"
          v-for="g in goods.couple"
          class="couple">
          <div class="cart-radio">
            <div
              v-show="!g.tick"
              class="free-check"
              @click="ticksCHeck(g)"/>
            <i
              v-show="g.tick"
              class="iconfont icongou"
              @click="ticksCHeck(g)"/>
          </div>
          <div class="good-info">
            <div
              class="good-img"
              @click="goDetail(g.data, g.type)">
              <img
                :src="IMG_URL + g.data.first.ringsSimpleGoodsEntity.ringImg.split(',')[0]"
                alt="">
            </div>
            <div
              class="good-desc"
              @click="goDetail(g.data, g.type)">
              <div>
                {{ g.data.first.ringsSimpleGoodsEntity.name }}
              </div>
              <div>SKU：{{ g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
              <div>SKU：{{ g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
            </div>
            <div class="couple-rings">
              <div class="one-person">
                <div class="good-information">
                  <div v-for="i in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.baseConfig">
                    <div
                      v-if="i.configId === 196"
                      class="infos">
                      <div>{{ i.configVal }}</div>
                      <div>{{ i.configAttrIVal }}</div>
                    </div>
                  </div>
                  <div
                    v-for="s in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.detailConfig"
                    class="infos">
                    <div>{{ s.configVal }}</div>
                    <div>{{ s.configAttrIVal }}</div>
                  </div>
                </div>
                <div class="good-num">{{ g.data.first.goodsCount }}</div>
                <div class="good-price">{{ coinType }} {{ formatMoney(g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}</div>
              </div>
              <div class="one-person">
                <div class="good-information">
                  <div v-for="i in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.baseConfig">
                    <div
                      v-if="i.configId === 196"
                      class="infos">
                      <div>{{ i.configVal }}</div>
                      <div>{{ i.configAttrIVal }}</div>
                    </div>
                  </div>
                  <div
                    v-for="i in g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.detailConfig"
                    class="infos">
                    <div>{{ i.configVal }}</div>
                    <div>{{ i.configAttrIVal }}</div>
                  </div>
                </div>
                <div class="good-num">{{ g.data.second.goodsCount }}</div>
                <div class="good-price">{{ coinType }} {{ formatMoney(g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}</div>
              </div>
              <div class="couple-line" />

            </div>
            <div class="good-btn">
              <i
                class="iconfont iconlajitong"
                @click="deleteGood(0, 3, g)"/>
            </div>
          </div>
        </div>

        <Empty
          v-if="emptyList"
          type="3"/>

      </div>

      <div class="cart-bot-bar">
        <div class="cart-radio">
          <div
            v-show="!allTick"
            class="free-check"
            @click="allTicks()"/>
          <i
            v-show="allTick"
            class="iconfont icongou"
            @click="allTicks()"/>
        </div>
        <div
          class="full-radio"
          @click="allTicks()">{{ lang['all-tick'] }}</div>
        <div
          class="delete"
          @click="checkDelete()">
          <i class="iconfont iconlajitong"/>
          {{ lang.delete }}
        </div>
        <div class="cart-bot-line" />
        <div class="already-choose">
          {{ lang.checked }}
          <div class="choose-num">{{ totalNum }}</div>
          {{ lang.total }}
          <span>（{{ lang.freeExpress }})</span>
        </div>
        <div class="total-price">{{ coinType }} {{ formatMoney(totalPrice) }}</div>
        <div
          v-if="!banBtn"
          class="go-order"
          @click="goOrder()">{{ lang.Settlement }}</div>
        <div
          v-if="banBtn"
          class="go-order ban">{{ lang.Settlement }}</div>
      </div>
    </div>
    <MessageBox
      v-show="emptyMsg"
      :title="lang.msgTitle1"
      :message="lang.msgContent1"
      type="one"
      @done="emptyMsg = false"/>
    <MessageBox
      ref="confirmOne"
      :title="lang.msgTitle3"
      :message="lang.msgContent3"
      type="two"/>
    <MessageBox
      v-show="noGoods"
      :title="lang.msgTitle2"
      :message="lang.msgContent2"
      type="one"
      @done="noGoods = false"/>
  </div>
</template>

<script>
import MessageBox from '@/components/messageBox';
import Empty from '@/components/empty.vue';
import { settleList } from '@/api/func.js';
import { getCookie, getCartList, clearCartGoods, setCartList, setCartGoods, setCartLeftGoods, clearCartLeftGoods, clearCartList, clearTwoCustom, clearCustom } from '@/api/cache.js';
import { setCartNum, getCartNum } from '@/api/cache';
import { formatMoney } from '@/api/filterUtil.js';

export default {
  name: 'CartOut',
  components: { MessageBox, Empty },
  data() {
    return {
      lang: this.$LANGUAGE.cart,
      loading: true,
      localArr: [],
      usingArr: [],
      lastArr: [],
      coinType: null,
      emptyMsg: false,
      noGoods: false,
      totalPrice: 0,
      totalNum: 0,
      allTick: false,
      goods: {
        full: [],
        single: [],
        couple: []
      },
      banBtn: false
    };
  },
  computed: {
    emptyList() {
      if (this.loading) {
        return false;
      }
      let num = 0;
      for (let n in this.goods) {
        num += this.goods[n] ? this.goods[n].length : 0;
      }
      // console.log('num===>', num);
      return !num;
    }
  },
  created() {
    clearTwoCustom();
    clearCustom();
    this.coinType = localStorage.getItem('coin') ? localStorage.getItem('coin') : 'HKD';
    let token = getCookie('token');
    if (token) {
      // 在cookie存在token的话，获取用户信息，改变用户状态
      this.$router.replace({
        name: 'Cart'
      });
    } else {

    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    formatMoney: formatMoney,
    getList() {
      this.localArr = getCartList();
      // console.log('no1===>', this.localArr);

      //  判断本地购物车列表是否为空
      if (this.localArr === null) {
        this.loading = false;
        this.banBtn = true;
        setCartNum(0);
        return;
      }
      //  制作获取购物车数据发送的列表
      this.usingArr = [];
      let i = 0;
      this.localArr.forEach(obj => {
        obj.updateTime = i++;
        obj.goodsCount = 1;
        this.usingArr.push(obj);
      });
      this.loading = true;
      this.$postJsonRequest('/web/goodsCart/postCart', this.usingArr)
        .then(res => {
          // console.log('what===>', res, res.data.code, res.data.code === 500);
          this.loading = false;
          // 清空数据组
          this.goods = {
            full: [],
            single: [],
            couple: []
          };
          this.allTick = false;
          if (res.data.code === 500) {
            this.$message.error(res.data.msg);
            clearCartList();
            setCartNum(0);
            return;
          }
          //  清除本地存储中购物车失效商品
          let arr = [];
          this.lastArr = [];
          for (let i in res.data) {
            for (let j = i; j < this.localArr.length; j++) {
              if (res.data[i].localSn === this.localArr[j].updateTime) {
                try {
                  if (res.data[i].simpleGoodsEntity.categoryId === 1) {
                    this.localArr[j].goodsDetailsId = res.data[i].goodsDetailsId;
                  }
                } catch (e) {
                  console.log(e);
                }
                this.lastArr.push(this.localArr[j]);
                let o = Object.assign({}, this.localArr[j]);
                delete o.updateTime;
                delete o.goodsCount;
                arr.push(o);
                break;
              }
            }
          }
          clearCartList();
          setCartList(arr);
          //  转换返回的数据格式
          let data = settleList(res.data);
          this.goods = data.goods;
          console.log(this.goods);
          //  设置导航栏购物车显示数量
          let cartNum = this.goods.full.length + this.goods.single.length + this.goods.couple.length;
          setCartNum(cartNum);
          // this.$store.commit('setCartGoodsNum', cartNum);
          this.totalPrice = 0;
          this.totalNum = 0;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    allTicks() {
      let akm = Object.keys(this.goods);
      let num = 0;
      let price = 0;
      for (let k in akm) {
        this.goods[akm[k]].forEach(tick => {
          this.allTick ? tick.tick = false : tick.tick = true;
          price += tick.price;
          num++;
        });
      }
      this.allTick = !this.allTick;
      this.allTick ? this.totalNum = num : this.totalNum = 0;
      this.allTick ? this.totalPrice = price : this.totalPrice = 0;
    },
    ticksCHeck(g) {
      let lock = false;
      g.tick = !g.tick;
      g.tick ? this.totalNum++ : this.totalNum--;
      g.tick ? this.totalPrice += g.price : this.totalPrice -= g.price;
      let akm = Object.keys(this.goods);
      for (let k in akm) {
        this.goods[akm[k]].forEach(tick => {
          if (!tick.tick) {
            lock = true;
          }
        });
      }
      if (lock) {
        this.allTick = false;
        return;
      }
      this.allTick = true;
    },
    checkDelete() {
      let arr = [];
      let akm = Object.keys(this.goods);
      for (let k in akm) {
        this.goods[akm[k]].forEach(tick => {
          if (tick.tick) {
            if (tick.type === 1) {
              arr.push(tick.data.localSn);
            } else {
              arr.push(tick.data.first.localSn);
              arr.push(tick.data.second.localSn);
            }
          }
        });
      }
      if (arr.length === 0) {
        // this.$message.error('未選擇任何商品');
        this.noGoods = true;
        return;
      }
      this.deleteGood(1);
    },
    deleteGood(type, life, obj) {
      const biu = this.$msgBoxing('confirmOne', this);
      biu.then(res => {
        if (res) {
          if (type === 0) {
            //  单个删除
            obj.loading = true;
            let index = null;
            if (life === 1) {
              for (let i in this.lastArr) {
                if (this.lastArr[i].updateTime === obj.data.localSn) {
                  index = i;
                  break;
                }
              }
              this.lastArr.splice(index, 1);
            } else {
              let index = null;
              let _index = null;
              for (let i in this.lastArr) {
                if (this.lastArr[i].updateTime === obj.data.first.localSn) {
                  index = i;
                }
              }
              this.lastArr.splice(index, 1);
              for (let i in this.lastArr) {
                if (this.lastArr[i].updateTime === obj.data.second.localSn) {
                  _index = i;
                }
              }
              this.lastArr.splice(_index, 1);
            }
            let cartNum = getCartNum() - 1;
            setCartNum(cartNum > -1 ? cartNum : 0);
            setCartList(this.lastArr);
            this.getList();
          } else {
            this.loading = true;
            //  type = 1 勾选删除
            let arr = [];
            let delNum = 0;
            let akm = Object.keys(this.goods);
            for (let k in akm) {
              this.goods[akm[k]].forEach(tick => {
                if (tick.tick) {
                  // console.log('tick===>', tick);
                  delNum++;
                  if (tick.type === 1) {
                    arr.push(tick.data.localSn);
                  } else {
                    arr.push(tick.data.first.localSn);
                    arr.push(tick.data.second.localSn);
                  }
                }
              });
            }
            if (arr.length === 0) {
              this.$message.error(this.lang.msgContent2);
              this.loading = false;
              return;
            }
            let middleArr = [];
            for (let i in this.lastArr) {
              let _index = null;
              for (let j in arr) {
                if (this.lastArr[i].updateTime === arr[j]) {
                  _index = true;
                  break;
                }
              }
              if (!_index) {
                middleArr.push(this.lastArr[i]);
              }
            }
            // console.log('mda===>', middleArr);
            let cartNum = getCartNum() - delNum;
            setCartNum(cartNum > -1 ? cartNum : 0);
            setCartList(middleArr);
            this.getList();
          }
        }
      });
    },
    goOrder() {
      this.loading = true;
      let arr = [];
      let goGoods = [];
      let leftGoods = [];
      let middleArr = [];
      let akm = Object.keys(this.goods);
      for (let k in akm) {
        this.goods[akm[k]].forEach(tick => {
          if (tick.tick) {
            if (tick.type === 1) {
              arr.push(tick.data.localSn);
            } else {
              arr.push(tick.data.first.localSn);
              arr.push(tick.data.second.localSn);
            }
          }
        });
      }
      if (arr.length === 0) {
        this.emptyMsg = true;
        this.loading = false;
        return;
      }
      for (let i in this.lastArr) {
        for (let j in arr) {
          if (this.lastArr[i].updateTime === arr[j]) {
            goGoods.push(this.lastArr[i]);
            break;
          }
        }
      }
      for (let i in this.lastArr) {
        let _index = null;
        for (let j in arr) {
          if (this.lastArr[i].updateTime === arr[j]) {
            _index = true;
            break;
          }
        }
        if (!_index) {
          middleArr.push(this.lastArr[i]);
        }
      }
      for (let i in middleArr) {
        let o = Object.assign({}, middleArr[i]);
        delete o.updateTime;
        delete o.goodsCount;
        leftGoods.push(o);
      }
      this.loading = false;
      clearCartGoods();
      clearCartLeftGoods();
      setCartLeftGoods(leftGoods);
      setCartGoods(goGoods);
      this.$router.push({
        name: 'orderOut'
      });
    },
    goDetail(obj, type) {
      if (type === 3) {
        console.log('对戒');
        this.$router.push({
          name: 'seleceRightRing',
          params: {
            id: obj.first.groupId
          }
        });
      } else if (type === 1 || type === 2) {
        if (obj.simpleGoodsEntity.categoryId === 1) {
          this.$router.push({
            name: 'seleceDiamond',
            params: {
              id: obj.simpleGoodsEntity.goodId,
              key: 2
            }
          });
        } else if (obj.simpleGoodsEntity.categoryId === 2) {
          if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 59) {
            this.$router.push({
              name: 'seleceWedding',
              params: {
                id: obj.goodsId
              }
            });
          } else if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
            this.$router.push({
              name: 'seleceEngagement',
              params: {
                id: obj.goodsId,
                key: 2
              }
            });
          }
        } else {
          this.$router.push({
            name: 'seleceJewellery',
            params: {
              id: obj.goodsId,
              key: 2
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
  .cart {
    width: 1360px;
    text-align: left;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    .cart-container {
      position: relative;
      overflow: hidden;
      width: 1360px;
      color: #000;
      font-size: 14px;
      background: rgba(248,248,248,1);
      padding: 82px 30px 25px;
      .cart-title {
        height: 24px;
        line-height: 24px;
        color: #1B1B1B;
        font-size: 24px;
        position: absolute;
        left: 28px;
        top: 32px;
      }
      .cart-top-bar {
        width: 1300px;
        height: 40px;
        line-height: 40px;
        background: rgba(255,255,255,1);
        margin: 0 auto 16px;
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
        width:1300px;
        position: relative;
        overflow: hidden;
        background:rgba(255,255,255,1);
        margin-bottom: 17px;
        .finished {
          width: 1300px;
          height: 179px;
          display: flex;
          align-items: center;
          .cart-radio {
            width: 49px;
            height: 178px;
          }
          .good-info {
            position: relative;
            width: 1200px;
            height: 179px;
            border-bottom: 1px solid rgba(239,239,239,1);
            display: flex;
            align-items: center;
            .good-img {
              position: relative;
              width:120px;
              height:120px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(221,221,221,1);
              border-radius:2px;
              display: flex;
              align-items: center;
              margin-right: 20px;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .good-desc {
              width: 269px;
              line-height: 18px;
              margin-right: 71px;
              div:nth-child(1) {
                max-height: 18*3px;
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
            .good-information {
              width: 185px;
              margin-right: 83px;
              .infos {
                width: 100%;
                display: flex;
                margin-bottom: 21px;
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
            .good-description {
              width: 185px;
              line-height: 20px;
              max-height: 60px;
              color: #666;
              margin-right: 83px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              word-break: break-all;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .good-num {
              width: 60px;
              text-align: center;
              font-size: 18px;
              color: #333;
              margin-right: 217-60-83px;
            }
            .good-price {
              font-family: twCenMt;
              font-size: 18px;
              color: #F29B87;
              width: 130px;
              text-align: center;
            }
            .good-btn {
              width: 80px;
              height: 21px;
              line-height: 21px;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              justify-content: space-between;
              div:nth-child(2) {
                width: 1px;
                height: 21px;
                background-color: rgba(166,166,166,1);
              }
              i {
                width: 18px;
                display: block;
                height: 21px;
                line-height: 21px;
                color: #999999;
                font-size: 20px;
                cursor: pointer;
              }
              div:nth-child(1) {
                cursor: pointer;
                width: 22px;
                height: 21px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .customization {
          width: 1300px;
          height: 282px;
          display: flex;
          align-items: center;
          position: relative;
          .cart-radio {
            width: 49px;
            height: 282px;
          }
          .good-info {
            position: relative;
            width: 1200px;
            height: 281px;
            border-bottom: 1px solid rgba(239,239,239,1);
            .good-info-dotted {
              position: absolute;
              left: 142px;
              top: 140px;
              width: 956px;
              height: 1px;
              padding-left: 20px;
              border-bottom: 1px dotted rgba(221,221,221,1);
            }
            .good-info-line {
              width: 1200px;
              height: 140px;
              display: flex;
              align-items: center;
              .good-img {
                position: relative;
                width:100px;
                height:100px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(221,221,221,1);
                border-radius:2px;
                display: flex;
                align-items: center;
                margin-right: 40px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              .good-desc {
                width: 269px;
                line-height: 18px;
                margin-right: 71px;
                div:nth-child(1) {
                  max-height: 18*3px;
                  margin-bottom: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  word-break: break-all;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                }
                div:nth-child(2) {
                  color: #999;
                }
              }
              .good-information {
                width: 185px;
                margin-right: 83px;
                .infos {
                  width: 100%;
                  display: flex;
                  margin-bottom: 21px;
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
              .good-description {
                width: 185px;
                line-height: 20px;
                max-height: 60px;
                color: #666;
                margin-right: 83px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                word-break: break-all;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              .good-num {
                width: 60px;
                text-align: center;
                font-size: 18px;
                color: #333;
                margin-right: 217-60-83px;
              }
              .good-price {
                font-family: twCenMt;
                font-size: 18px;
                color: #F29B87;
                width: 130px;
                text-align: center;
              }
            }
            .good-btn {
              width: 80px;
              height: 21px;
              line-height: 21px;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              justify-content: space-between;
              div:nth-child(2) {
                width: 1px;
                height: 21px;
                background-color: rgba(166,166,166,1);
              }
              i {
                width: 18px;
                display: block;
                height: 21px;
                line-height: 21px;
                color: #999999;
                font-size: 20px;
                cursor: pointer;
              }
              div:nth-child(1) {
                cursor: pointer;
                width: 22px;
                height: 21px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .good-dingzhi-logo {
            position: absolute;
            width: 200px;
            height: 24px;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            span {
              color: #999;
              font-size: 14px;
              line-height: 14px;
            }
            i {
              display: block;
              color: #aaa;
            }
          }
        }
        .couple {
          width: 1300px;
          height: 174*2+2px;
          display: flex;
          align-items: center;
          .cart-radio {
            width: 49px;
            height: 174*2+2px;
          }
          .good-info {
            position: relative;
            width: 1200px;
            height: 174*2+2px;
            border-bottom: 1px solid rgba(239,239,239,1);
            display: flex;
            align-items: center;
            .good-img {
              position: relative;
              width:120px;
              height:120px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(221,221,221,1);
              border-radius:2px;
              display: flex;
              align-items: center;
              margin-right: 20px;
              overflow: hidden;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .good-desc {
              width: 269px;
              line-height: 18px;
              margin-right: 71px;
              div:nth-child(1) {
                max-height: 18*3px;
                margin-bottom: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                word-break: break-all;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              div:nth-child(2) {
                color: #999;
              }
              div:nth-child(3) {
                color: #999;
              }
            }
            .couple-rings {
              position: relative;
              .one-person {
                height: 174px;
                display: flex;
                align-items: center;
                .good-information {
                  width: 185px;
                  margin-right: 83px;
                  .infos {
                    width: 100%;
                    display: flex;
                    margin-bottom: 21px;
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
                .good-num {
                  width: 60px;
                  text-align: center;
                  font-size: 18px;
                  color: #333;
                  margin-right: 217-60-83px;
                }
                .good-price {
                  font-family: twCenMt;
                  font-size: 18px;
                  color: #F29B87;
                  width: 130px;
                  text-align: center;
                }
              }
              .couple-line {
                position: absolute;
                top: 173px;
                left: -56px;
                width: 673px;
                height: 1px;
                border-bottom: 1px dotted rgba(221,221,221,1);
              }
            }
            .good-btn {
              width: 80px;
              height: 21px;
              line-height: 21px;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              justify-content: space-between;
              div:nth-child(2) {
                width: 1px;
                height: 21px;
                background-color: rgba(166,166,166,1);
              }
              i {
                width: 18px;
                display: block;
                height: 21px;
                line-height: 21px;
                color: #999999;
                font-size: 20px;
                cursor: pointer;
              }
              div:nth-child(1) {
                cursor: pointer;
                width: 22px;
                height: 21px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
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
          background-color: rgba(102,102,102,0.4);
        }
        .lose-btn {
          width: 101px;
          height: 21px;
          line-height: 21px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div:nth-child(2) {
            width: 1px;
            height: 21px;
            background-color: rgba(166,166,166,1);
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
          div:nth-child(1) {
            width: 43px;
            height: 15px;
            line-height: 15px;
            font-size: 14px;
            color: #AA8A7B;
            cursor: pointer;
          }
        }
      }
      .cart-bot-bar {
        position: relative;
        width: 1300px;
        height: 100px;
        background-color: #FFFFFF;
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
          width:1px;
          height:20px;
          background:rgba(221,221,221,1);
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
          color: #F29B87;
        }
        .go-order {
          width:170px;
          height:40px;
          line-height:40px;
          background:rgba(170,138,123,1);
          cursor: pointer;
          color: #fff;
          font-size: 16px;
          text-align: center;
          position: absolute;
          right: 49px;
          top: 30px;
        }
        .ban {
          background:#ccc;
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
        width:16px;
        height:16px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(187,187,187,1);
        border-radius:4px;
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
        width:16px;
        height:16px;
        background:rgba(170,138,123,1);
        border-radius:2px;
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
