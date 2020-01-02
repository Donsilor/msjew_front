<template>
  <div
    class="nav-right"
    @click.stop="">
    <ul :class="showBox?'box-ul-show':''">
      <li @click="goPersonal">
        <span>{{ store.state.isLogin?'個人中心':'<<&nbsp;&nbsp;請登入' }}</span>
        <label><i class="icon iconfont">&#xe643;</i></label>
      </li>
      <li
        :class="{active:showIndex==0}"
        @click.stop="openBox(0)">
        <span>我的購物車</span>
        <label><i class="icon iconfont">&#xe642;</i></label>
      </li>
      <li
        :class="{active:showIndex==1}"
        @click.stop="openBox(1)">
        <span>我的心願單</span>
        <label><i class="icon iconfont">&#xe645;</i></label>
      </li>
      <li
        :class="{active:showIndex==2}"
        @click.stop="openBox(2)">
        <span>鑽石對比</span>
        <label><i class="icon iconfont">&#xe64c;</i></label>
      </li>
      <li>
        <label><i class="icon iconfont">&#xe641;</i></label>
      </li>
      <li @click="backTop">
        <label><i class="icon iconfont">&#xe66b;</i></label>
      </li>
    </ul>
    <div
      :class="showBox?'box-show':''"
      class="nav-right-box">
      <!--购物车-->
      <div
        v-if="activeIndex==0"
        class="car-box">
        <div class="title">
          <div @click="close"><i class="icon iconfont">&#xe656;</i></div>
          我的購物車
        </div>
        <div class="checkall">
          <!--          <input-->
          <!--            :checked="checkall"-->
          <!--            type="checkbox"-->
          <!--            @click="checkAll">-->
          <!--<span @click="checkAll">全選</span>-->
          <label @click="goCar">全屏查看</label>
        </div>

        <!--已登陆-->
        <ul
          v-loading="loading"
          v-if="store.state.isLogin">

          <!--有效商品-->
          <!--成品样式-->
          <li v-for="(item,index) in cartList.goods.full">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <!--            <section>-->
            <!--              <img :src="IMG_URL+item.data.simpleGoodsEntity.goodsImages">-->
            <!--              <article class="img-bord">-->
            <!--                已失效-->
            <!--              </article>-->
            <!--            </section>-->
            <img
              :src="IMG_URL+item.data.simpleGoodsEntity.goodsImages"
              @click="goProducts(item.data, item.type)">
            <div>{{ item.data.simpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->

          </li>

          <!--定制样式-->
          <li
            v-for="(item,index) in cartList.goods.single">
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <img
                :src="IMG_URL+item.data.first.simpleGoodsEntity.goodsImages"
                @click="goProducts(item.data.first, item.type)">
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
            <div class="iconSingle">
              <i class="iconfont iconstar-jt"/>
              <span>定制</span>
            </div>
            <div class="middle-line" />
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <img
                :src="IMG_URL+item.data.second.simpleGoodsEntity.goodsImages"
                @click="goProducts(item.data.second, item.type)">
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
          </li>

          <!--对戒样式-->
          <li v-for="(item,index) in cartList.goods.couple">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <section><img
              :src="IMG_URL+item.data.first.ringsSimpleGoodsEntity.ringImg.split(',')[0]"
              @click="goProducts(item.data, item.type)"></section>
            <div>{{ item.data.first.ringsSimpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
          </li>

          <!--失效商品-->
          <!--成品样式-->
          <li v-for="(item,index) in cartList.loseGoods.full">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <section>
              <img :src="IMG_URL+item.data.simpleGoodsEntity.goodsImages">
              <article class="img-bord">
                已失效
              </article>
            </section>
            <div>{{ item.data.simpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->

          </li>

          <!--定制样式-->
          <li
            v-for="(item,index) in cartList.loseGoods.single">
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <section>
                <img :src="IMG_URL+item.data.first.simpleGoodsEntity.goodsImages">
                <article class="img-bord">
                  已失效
                </article>
              </section>
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
            <div class="iconSingle">
              <i class="iconfont iconstar-jt"/>
              <span>定制</span>
            </div>
            <div class="middle-line" />
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <section>
                <img :src="IMG_URL+item.data.second.simpleGoodsEntity.goodsImages">
                <article class="img-bord">
                  已失效
                </article>
              </section>
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
          </li>

          <!--对戒样式-->
          <li v-for="(item,index) in cartList.loseGoods.couple">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <section>
              <img :src="IMG_URL+item.data.first.ringsSimpleGoodsEntity.ringImg.split(',')[0]">
              <article class="img-bord">
                已失效
              </article>
            </section>
            <div>{{ item.data.first.ringsSimpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
          </li>

        </ul>

        <!--未登陆-->
        <ul
          v-loading="loading"
          v-if="!store.state.isLogin">

          <!--成品样式-->
          <li v-for="(item,index) in cartList.goods.full">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <img
              :src="IMG_URL+item.data.simpleGoodsEntity.goodsImages"
              @click="goProducts(item.data, item.type)">
            <div>{{ item.data.simpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->

          </li>

          <!--定制样式-->
          <li
            v-for="(item,index) in cartList.goods.single">
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <img
                :src="IMG_URL+item.data.first.simpleGoodsEntity.goodsImages"
                @click="goProducts(item.data.first, item.type)">
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
            <div class="iconSingle">
              <i class="iconfont iconstar-jt"/>
              <span>定制</span>
            </div>
            <div class="middle-line" />
            <div class="single">
              <!--            <input-->
              <!--              :checked="item.check"-->
              <!--              type="checkbox"-->
              <!--              @click.stop="chose(index)">-->
              <img
                :src="IMG_URL+item.data.second.simpleGoodsEntity.goodsImages"
                @click="goProducts(item.data.second, item.type)">
              <div>{{ item.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
              <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
            </div>
          </li>

          <!--对戒样式-->
          <li v-for="(item,index) in cartList.goods.couple">
            <!--            <input-->
            <!--              :checked="item.check"-->
            <!--              type="checkbox"-->
            <!--              @click.stop="chose(index)">-->
            <img
              :src="IMG_URL+item.data.first.ringsSimpleGoodsEntity.ringImg.split(',')[0]"
              @click="goProducts(item.data, item.type)">
            <div>{{ item.data.first.ringsSimpleGoodsEntity.coinType }} <span>{{ formatMoney(item.price) }}</span></div>
            <!--            <label @click.stop="deletePro(index,item.goodId)"><i class="icon iconfont">&#xe664;</i></label>-->
          </li>

        </ul>

        <!--        <div class="total">-->
        <!--          <div>已選擇&nbsp;{{ cartChoseCount }}&nbsp;件</div>-->
        <!--          <div>{{ coin }}&nbsp;{{ formatMoney(cartTotalPrice) }}</div>-->
        <!--        </div>-->
        <div
          class="search-btn"
          @click="goCart()">查看購物車</div>
      </div>

      <!--心愿单-->
      <div
        v-if="activeIndex==1"
        class="wish-box">
        <div class="title">
          <div @click="close"><i class="icon iconfont">&#xe656;</i></div>
          我的心願單
        </div>
        <div
          v-loading="loading"
          class="wish-container">

          <dl
            v-for="(item,index) in wishList"
            v-if="!store.state.isLogin">

            <dt>{{ item.date }}</dt>

            <dd
              v-for="(pro,proIndex) in item.list"
              v-if="pro.simpleGoodsEntity"
              @click="goProduct(pro.simpleGoodsEntity.categoryId,pro.simpleGoodsEntity.goodId, pro)">
              <img :src="IMG_URL+pro.simpleGoodsEntity.goodsImages.split(',')[0]">
              <div>{{ pro.simpleGoodsEntity.coinType }}<span>{{ formatMoney(pro.simpleGoodsEntity.salePrice) }}</span></div>
              <label @click.stop="deleteWishPro(index,proIndex,pro.simpleGoodsEntity.goodId)"><i class="icon iconfont">&#xe664;</i></label>
            </dd>

            <dd
              v-else="pro.ringsSimpleGoodsEntity"
              @click="goRing(pro.ringsSimpleGoodsEntity.id)">
              <img :src="IMG_URL+pro.ringsSimpleGoodsEntity.ringImg.split(',')[0]">
              <div>{{ pro.ringsSimpleGoodsEntity.coinType }}<span>{{ formatMoney(pro.ringsSimpleGoodsEntity.salePrice) }}</span></div>
              <label @click.stop="deleteWishPro(index,proIndex,pro.ringsSimpleGoodsEntity.goodId)"><i class="icon iconfont">&#xe664;</i></label>
            </dd>
          </dl>

          <dl
            v-for="(item,index) in wishList"
            v-if="store.state.isLogin">

            <dt>{{ item.date }}</dt>

            <dd
              v-for="(pro,proIndex) in item.list"
              v-if="pro.simpleGoodsEntity"
              @click="goProduct(pro.simpleGoodsEntity.categoryId,pro.simpleGoodsEntity.goodId, pro)">
              <img :src="IMG_URL+pro.simpleGoodsEntity.goodsImages.split(',')[0]">
              <div>{{ pro.simpleGoodsEntity.coinType }}<span>{{ formatMoney(pro.simpleGoodsEntity.salePrice) }}</span></div>
              <label @click.stop="deleteWishPro(index,proIndex,pro.id)"><i class="icon iconfont">&#xe664;</i> </label>
            </dd>

            <dd
              v-else="pro.ringsSimpleGoodsEntity"
              @click="goRing(pro.ringsSimpleGoodsEntity.id)">
              <img :src="IMG_URL+pro.ringsSimpleGoodsEntity.ringImg.split(',')[0]">
              <div>{{ pro.ringsSimpleGoodsEntity.coinType }}<span>{{ formatMoney(pro.ringsSimpleGoodsEntity.salePrice) }}</span></div>
              <label @click.stop="deleteWishPro(index,proIndex,pro.id)"><i class="icon iconfont">&#xe664;</i> </label>
            </dd>

          </dl>

        </div>
        <div
          class="search-btn"
          @click="goWish">查看心願單</div>
      </div>

      <!--鑽石对比-->
      <div
        v-if="activeIndex==2"
        class="contrast-box">
        <div class="title">
          <div @click="close"><i class="icon iconfont">&#xe656;</i></div>
          鑽石對比
        </div>

        <ul
          v-loading="loading"
          v-if="!store.state.isLogin">
          <li
            v-for="(item,index) in diamondList"
            @click="goProduct(item.categoryId,item.goodId)">
            <img :src="IMG_URL+item.goodsImages.split(',')[0]">
            <div>{{ item.coinType }}<span>{{ formatMoney(item.salePrice) }}</span></div>
            <ol>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==191">GIA<span>{{ conf.configAttrIVal }}</span></li>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==31">克拉<span>{{ conf.configAttrIVal }}</span></li>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==34">顔色<span>{{ conf.configAttrIVal }}</span></li>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==35">淨度<span>{{ conf.configAttrIVal }}</span></li>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==33">切工<span>{{ conf.configAttrIVal }}</span></li>
              <li
                v-for="conf in item.baseConfig"
                v-if="conf.configId==38">熒光<span>{{ conf.configAttrIVal }}</span></li>
            </ol>
            <div @click.stop="addCar(item)">加入購物車</div>
            <label @click.stop="deletePro(index,item.goodId)"> <i class="icon iconfont">&#xe664;</i></label>
          </li>
        </ul>

        <ul
          v-loading="loading"
          v-if="store.state.isLogin">
          <li
            v-for="(item,index) in diamondList"
            @click="goProduct(item.simpleGoodsEntity.categoryId,item.simpleGoodsEntity.goodId)">
            <img :src="IMG_URL+item.simpleGoodsEntity.goodsImages.split(',')[0]">
            <div>{{ item.simpleGoodsEntity.coinType }}<span>{{ formatMoney(item.simpleGoodsEntity.salePrice) }}</span></div>
            <ol>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==191">GIA<span>{{ conf.configAttrIVal }}</span>
              </li>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==31">克拉<span>{{ conf.configAttrIVal }}</span>
              </li>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==34">顔色<span>{{ conf.configAttrIVal }}</span>
              </li>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==35">淨度<span>{{ conf.configAttrIVal }}</span>
              </li>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==33">切工<span>{{ conf.configAttrIVal }}</span>
              </li>
              <li
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==38">熒光<span>{{ conf.configAttrIVal }}</span>
              </li>
            </ol>
            <div @click.stop="addCar(item)">加入購物車</div>
            <label @click.stop="deletePro(index,item.id)"><i class="icon iconfont">&#xe664;</i></label>
          </li>
        </ul>

        <div
          class="search-btn"
          @click="goContrast">查看鑽石對比</div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney, filterFormatDate } from '@/api/filterUtil.js';
import { setWishNum, getWishNum, getCartList, setCartList, clearCartList, setCartNum, clearTwoCustom, clearCustom } from '@/api/cache.js';
import { addCard, settleList } from '@/api/func.js';
import store from '@/store/index';

export default {
  name: 'NavRight',
  data() {
    return {
      coin: localStorage.getItem('coin') || 'HKD',
      store: store,
      loading: true,
      showIndex: -1,
      activeIndex: -1,
      showBox: false,
      wishList: [], // 心愿单列表
      diamondList: [], // 钻石对比列表
      cartList: {
        goods: {
          full: [],
          single: [],
          couple: []
        },
        loseGoods: {
          full: [],
          single: [],
          couple: []
        }
      }, // 购物车列表
      cartChoseCount: 0, // 購物車已選數量
      cartTotalPrice: 0, // 購物車总价
      checkall: false, // 全选
      localArr: [],
      usingArr: [],
      lastArr: []
    };
  },
  watch: {
    $route() {
      this.close();
    },
    showIndex() {
      this.loading = true;
      var _this = this;
      document.body.onclick = function () {
        _this.showBox = false;
        _this.showIndex = -1;
      };
      this.cartChoseCount = 0;
      this.cartTotalPrice = 0;
      this.checkall = false;
      if (store.state.isLogin) { // 已登录
        if (this.showIndex == 0) { // 購物車
          this.$axiosGet('/web/goodsCart/list', {}).then(res => {
            this.loading = false;
            this.cartList = settleList(res);
            console.log('boss===>', this.cartList);
          });
        } else if (this.showIndex == 1) { // 心願單
          this.$axiosGet('/web/collection/list', {
            type: 1,
            currPage: 1,
            pageSize: 60
          }).then(res => {
            this.loading = false;
            var wishList = res.data.list;
            this.wishList = [];
            for (let i = 0; i < wishList.length; i++) {
              var dateStr = this.filterFormatDate(wishList[i].createTime, 'yyyy/MM/dd');
              var index = -1;
              for (var j = 0, jlen = this.wishList.length; j < jlen; j++) {
                if (this.wishList[j].date == dateStr) {
                  index = j;
                }
              }
              var wish = wishList[i];
              if (index == -1) {
                this.wishList.push({
                  date: dateStr,
                  list: [wish]
                });
              } else {
                this.wishList[index].list.push(wish);
              }
            }
          });
        } else if (this.showIndex == 2) { // 鑽石對比
          this.$axiosGet('/web/collection/list', {
            type: 2,
            currPage: 1,
            pageSize: 60
          }).then(res => {
            this.loading = false;
            this.diamondList = res.data.list;
          });
        }
      } else { // 未登录，查询本地
        let ids = [];
        this.cartList = [];
        this.wishList = [];
        this.diamondList = [];
        if (this.showIndex == 0) { // 購物車
          this.searchGoodss();
        } else if (this.showIndex == 1) { // 心願單
          let wishList = localStorage.getItem('__WISH_LIST__') ? JSON.parse(localStorage.getItem('__WISH_LIST__')) : [];
          for (let i = 0, len = wishList.length; i < len; i++) {
            ids.push({
              'goodsDetailsId': null,
              'goodsId': wishList[i].goodsId,
              'groupId': wishList[i].groupId,
              'groupType': wishList[i].groupId ? 1 : null
            });
          }
          this.$postJsonRequest('/web/goodsCart/postBDD', ids).then(res => {
            this.wishList = [];
            let wishList = res.data;
            let locWishList = localStorage.getItem('__WISH_LIST__') ? JSON.parse(localStorage.getItem('__WISH_LIST__')) : [];
            for (let i = locWishList.length - 1; i >= 0; i--) {
              var dateStr = this.filterFormatDate(locWishList[i].createTime, 'yyyy/MM/dd');
              var index = -1;
              for (var j = 0, jlen = this.wishList.length; j < jlen; j++) {
                if (this.wishList[j].date == dateStr) {
                  index = j;
                }
              }
              var wish;
              for (var j = 0, jlen = wishList.length; j < jlen; j++) {
                if ((wishList[j].ringsSimpleGoodsEntity && wishList[j].ringsSimpleGoodsEntity.id == locWishList[i].groupId) ||
                  (wishList[j].simpleGoodsEntity && wishList[j].simpleGoodsEntity.goodId == locWishList[i].goodsId)) {
                  wish = wishList[j];
                }
              }
              if (wish) {
                if (index == -1) {
                  this.wishList.push({
                    date: dateStr,
                    list: [wish]
                  });
                } else {
                  this.wishList[index].list.push(wish);
                }
              }
            }
            this.loading = false;
          });
        } else if (this.showIndex == 2) { // 鑽石對比
          let diamondList = localStorage.getItem('__DIAMOND_LIST__') ? JSON.parse(localStorage.getItem('__DIAMOND_LIST__')) : [];
          for (let i = 0, len = diamondList.length; i < len; i++) {
            ids.push(diamondList[i].goodsId);
          }
          this.searchGoods(ids.toString());
        }
      }
    }
  },
  created() {},
  mounted() {
    var _this = this;
    document.body.onclick = function () {
      _this.showBox = false;
      _this.showIndex = -1;
    };
  },
  methods: {
    filterFormatDate: filterFormatDate,
    formatMoney: formatMoney,
    // 前往购物车
    goCart() {
      this.close();
      this.$router.push({
        name: 'Cart'
      });
    },
    // 删除心愿单商品
    deleteWishPro(index, proIndex, id) {
      this.wishList[index].list.splice(proIndex, 1);
      if (this.wishList[index].list.length == 0) {
        this.wishList.splice(index, 1);
      }
      //  已登陆
      if (store.state.isLogin) {
        this.$axiosPost('/web/collection/delete', {
          ids: id
        }).then(res => {
          if (res.code === 200) {
            this.$store.dispatch('getWishGoodsNum');
          } else {}
        }).catch(err => {
          console.error(err);
        });
      } else {
        //  未登陆
        let wishList = localStorage.getItem('__WISH_LIST__') ? JSON.parse(localStorage.getItem('__WISH_LIST__')) : [];
        for (let i = 0, len = wishList.length; i < len; i++) {
          if (wishList[i].goodsId == id || wishList[i].groupId == id) {
            wishList.splice(i, 1);
            localStorage.setItem('__WISH_LIST__', JSON.stringify(wishList));
            break;
          }
        }
        if (wishList.length == 0) {
          localStorage.removeItem('__WISH_LIST__');
        }
        let wishNum = getWishNum() - 1;
        setWishNum((wishNum > -1) ? wishNum : 0);
      }
    },
    // 删除
    deletePro(index, id) {
      if (this.showIndex == 0) {
        this.cartList.splice(index, 1);
        if (store.state.isLogin) {
          this.$axiosPost('/web/goodsCart/delete', {
            ids: id
          });
        } else {
          let cartList = localStorage.getItem('__CART_LIST__') ? JSON.parse(localStorage.getItem('__CART_LIST__')) : [];
          for (let i = 0, len = cartList.length; i < len; i++) {
            if ((cartList[i].length > 0 && cartList[i][0].goodsId == id) || cartList[i].goodsId == id) {
              cartList.splice(i, 1);
              localStorage.setItem('__CART_LIST__', JSON.stringify(cartList));
              break;
            }
          }
          if (cartList.length == 0) {
            localStorage.removeItem('__CART_LIST__');
          }
        }
        this.calculate();
      } else if (this.showIndex == 2) {
        this.diamondList.splice(index, 1);
        if (store.state.isLogin) {
          this.$axiosPost('/web/collection/delete', {
            ids: id
          });
        } else {
          let diamondList = localStorage.getItem('__DIAMOND_LIST__') ? JSON.parse(localStorage.getItem('__DIAMOND_LIST__')) : [];
          for (let i = 0, len = diamondList.length; i < len; i++) {
            if (diamondList[i].goodsId == id) {
              diamondList.splice(i, 1);
              localStorage.setItem('__DIAMOND_LIST__', JSON.stringify(diamondList));
              break;
            }
          }
          if (diamondList.length == 0) {
            localStorage.removeItem('__DIAMOND_LIST__');
          }
        }
      }
    },
    // 加入购物车
    addCar(obj) {
      console.log(obj);
      if (store.state.isLogin) {
        let data = {
          goodsId: obj.simpleGoodsEntity.goodId,
          goodsDetailsId: '88888888',
          groupType: null, // (1-对戒类型,2-定制类型) ,
          groupId: null // 对戒（组id）和定制时传（自定义时间戳）
        };
        addCard(1, data);
      } else {
        this.$router.push({
          name: 'seleceDiamond',
          params: {
            id: obj.goodId,
            key: 2
          }
        });
      }
    },
    goRing(id) {
      clearCustom();
      clearTwoCustom();
      this.$router.push({
        name: 'seleceRightRing',
        params: {
          id: id
        }
      });
    },
    // 去产品详情
    goProducts(obj, type) {
      clearCustom();
      clearTwoCustom();
      if (type === 3) {
        console.log('对戒');
        this.$router.push({
          name: 'seleceRightRing',
          params: {
            id: obj.first.groupId
          }
        });
      } else if (type === 1 || type === 2) {
        console.log('单品');
        if (obj.simpleGoodsEntity.categoryId === 1) {
          console.log('是个钻石💎');
          this.$router.push({
            name: 'seleceDiamond',
            params: {
              id: obj.simpleGoodsEntity.goodId,
              key: 2
            }
          });
        } else if (obj.simpleGoodsEntity.categoryId === 2) {
          console.log('是个戒指💍');
          if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指💍');
            this.$router.push({
              name: 'seleceWedding',
              params: {
                id: obj.goodsId
              }
            });
          } else if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指💍');
            this.$router.push({
              name: 'seleceEngagement',
              params: {
                id: obj.goodsId,
                key: 2
              }
            });
          }
        } else {
          console.log('zhubao');
          this.$router.push({
            name: 'seleceJewellery',
            params: {
              id: obj.goodsId,
              key: 2
            }
          });
        }
      }
    },
    goProduct(type, id, obj) {
      clearCustom();
      clearTwoCustom();
      if (type == 2) { // 戒指
        if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
        //  订婚
          this.$router.push({
            name: 'seleceEngagement',
            params: {
              id: id,
              key: 2
            }
          });
        } else {
        //  结婚
          this.$router.push({
            name: 'seleceWedding',
            params: {
              id: id,
              key: 2
            }
          });
        }
      } else if (type == 1) { // 钻石
        this.$router.push({
          name: 'seleceDiamond',
          params: {
            id: id,
            key: 2
          }
        });
      } else { // 珠宝
        this.$router.push({
          name: 'seleceJewellery',
          params: {
            id: id,
            key: 2
          }
        });
      }
    },
    // 全选
    checkAll() {
      this.checkall = !this.checkall;
      for (let i = 0, len = this.cartList.length; i < len; i++) {
        this.cartList[i].check = this.checkall;
      }
      this.calculate();
    },
    // 选择
    chose(index) {
      this.cartList[index].check = !this.cartList[index].check;
      this.calculate();
    },
    // 计算价格
    calculate() {
      this.cartChoseCount = 0;
      this.cartTotalPrice = 0;
      this.checkall = true;
      for (let i = 0, len = this.cartList.length; i < len; i++) {
        if (this.cartList[i].check) {
          this.cartChoseCount++;
          this.cartTotalPrice += (store.state.isLogin ? (this.cartList[i].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice ? this.cartList[i].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice : 0) : this.cartList[i].salePrice);
        } else {
          this.checkall = false;
        }
      }
    },
    /**
			 * 搜索產品
			 */
    searchGoodss() {
      this.localArr = getCartList();
      //  判断本地购物车列表是否为空
      if (this.localArr === null) {
        // 清空数据组
        this.cartList.goods = {
          full: [],
          single: [],
          couple: []
        };
        setCartNum(0);
        this.loading = false;
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
      // 清空数据组
      this.cartList.goods = {
        full: [],
        single: [],
        couple: []
      };
      this.$postJsonRequest('/web/goodsCart/postCart', this.usingArr)
        .then(res => {
          console.log('what===>', res, res.data.code, res.data.code === 500);
          this.loading = false;
          if (res.data.code === 500) {
            this.$message.error(res.data.msg);
            clearCartList();
            setCartNum(0);
            return;
          }
          //  清除本地存储中购物车失效商品
          let arr = [];
          for (let i in res.data) {
            for (let j = i; j < this.localArr.length; j++) {
              if (res.data[i].localSn === this.localArr[j].updateTime) {
                this.lastArr.push(this.localArr[j]);
                let o = Object.assign({}, this.localArr[j]);
                delete o.updateTime;
                delete o.goodsCount;
                arr.push(o);
                break;
              }
            }
          }
          // console.log(arr);
          clearCartList();
          setCartList(arr);
          let data = settleList(res.data);
          this.cartList.goods = data.goods;
          console.log('unknow===>', this.cartList.goods);
          //  设置导航栏购物车显示数量
          let cartNum = this.cartList.goods.full.length + this.cartList.goods.single.length + this.cartList.goods.couple.length;
          setCartNum(cartNum);
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    },
    searchGoods(ids) {
      console.log(ids);
      if (ids.length > 0) {
        this.$axiosPost('/web/goodsCart/zhu', {
          goodsIds: ids
        }).then(res => {
          this.loading = false;
          if (this.showIndex == 0) {
            this.cartList = res;
          } else if (this.showIndex == 2) {
            this.diamondList = res;
          }
        });
      } else {
        this.loading = false;
      }
    },
    /**
			 * 個人中心
			 */
    goPersonal() {
      this.close();
      if (!store.state.isLogin) {
        this.$router.push({
          name: 'login'
        });
      } else {
        this.$router.push({
          path: '/personal/account'
        });
      }
    },
    /**
			 * 查看心願單
			 */
    goWish() {
      this.close();
      this.$router.push({
        name: 'wish'
      });
    },
    /**
			 * 查看鑽石對比
			 */
    goContrast() {
      this.close();
      this.$router.push({
        name: 'diamondContrast'
      });
    },
    /**
			 * 全屏查看購物車
			 */
    goCar() {
      this.close();
      this.$router.push({
        name: 'Cart'
      });
    },
    /**
			 * 关闭
			 */
    close() {
      this.showBox = false;
      this.showIndex = -1;
      this.activeIndex = -1;
    },
    /**
			 * 展开
			 */
    openBox(index) {
      if (this.showIndex == index) {
        this.close();
      } else {
        this.activeIndex = index;
        this.showIndex = index;
        this.showBox = true;
      }
    },
    /**
			 * 返回頂部
			 */
    backTop() {
      var timer = setInterval(function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-scrollTop / 8);
        if (scrollTop == 0) {
          clearInterval(timer);
        }
        if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = scrollTop + ispeed;
        } else {
          document.body.scrollTop = scrollTop + ispeed;
        }
      }, 10);
    }
  }
};
</script>

<style lang="less">
	// 此处css隐藏侧边栏
	.nav-right {
		ul {
			li {
				display: none;
			}
			li:last-child {
				display: block;
				margin-top: 480px;
			}
		}
	}
	// 此处css隐藏侧边栏
	
	
	.nav-right {
		position: fixed;
		right: 0px;
		top: 0px;
		height: 100vh;
		z-index: 10001;
		.nav-right-box {
			position: absolute;
			top: 0px;
			height: 100%;
			width: 274px;
			background: white;
			right: -284px;
			border-left: 6px solid #F0EBE1;
			-webkit-transition: all 0.2s ease-in-out;
			-moz-transition: all 0.2s ease-in-out;
			-ms-transition: all 0.2s ease-in-out;
			transition: all 0.2s ease-in-out;
			&:after {
				content: '';
				position: absolute;
				left: 0px;
				height: 100%;
				width: 6px;
				top: 0px;
				z-index: 1;
				box-shadow: -3px 0px 4px -2px #D1D1D1;
			}
			.title {
				height: 48px;
				line-height: 48px;
				background: #CEBEB0;
				text-align: center;
				font-size: 14px;
				color: white;
				position: relative;
				>div {
					position: absolute;
					left: 0px;
					width: 40px;
					cursor: pointer;
					text-align: center;
					height: 48px;
					top: 0px;
				}
			}
			.search-btn {
				margin-left: 10px;
				clear: both;
				height: 48px;
				cursor: pointer;
				font-size: 14px;
				line-height: 48px;
				color: white;
				background: rgba(139, 118, 108, 1);
				margin-right: 10px;
			}
			.car-box {
				ul {
					margin-left: 10px;
					padding-right: 10px;
					text-align: left;
					overflow: auto;
					margin-bottom: 20px;
					height: calc(100vh - 180px);
					&::-webkit-scrollbar {
						width: 3px;
					}
					li {
            position: relative;
						min-height: 110px;
						padding-top: 10px;
						line-height: 90px;
						position: relative;
						font-weight: 300;
						font-family: twCenMt;
						padding-bottom: 10px;
						border-bottom: 1px solid #E6E6E6;
						&:hover {
							label {
								display: block;
							}
						}
						input {
							float: left;
							height: 14px;
							margin-right: 20px;
							margin-top: 38px;
							cursor: pointer;
						}
						img {
							float: left;
							width: 90px;
							height: 90px;
							border: 1px solid rgba(230, 230, 230, 1);
							cursor: pointer;
						}
						div {
							float: right;
							color: #666666;
							font-size: 12px;
						}
						label {
							display: none;
							color: #999;
							cursor: pointer;
							right: 0px;
							top: 10px;
							height: 15px;
							line-height: 15px;
							position: absolute;
							i {
								font-size: 14px;
							}
						}
            .single {
              width: 100%;
              height: 92px;
              float: none;
            }
            .middle-line {
              float: none;
              margin: 15px 0;
              width: 40%;
              height: 1px;
              border: 1px dashed #E6E6E6;
              transform: translateX(150%);
            }
            .iconSingle {
              float: none;
              position: absolute;
              width: 80px;
              height: 24px;
              left: 94px;
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
            section {
              position: relative;
              width: 90px;
              height: 90px;
              float: left;
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
					}
				}
				input[type="checkbox"] {
					display: inline-block;
					text-align: center;
					vertical-align: middle;
					line-height: 12px;
					position: relative;
					width: 12px;
					height: 12px;
					cursor: pointer;
				}
				input[type="checkbox"]::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					background: #fff;
					width: 100%;
					height: 100%;
					border: 1px solid #d9d9d9
				}
				input[type="checkbox"]:checked::before {
					content: "\2713";
					background-color: #fff;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					border: 1px solid #8B766C;
					color: #8B766C;
					font-size: 12px;
					font-weight: bold;
				}
				.checkall {
					height: 31px;
					line-height: 31px;
					margin-left: 10px;
					margin-right: 10px;
					border-bottom: 1px solid #E6E6E6;
					text-align: left;
					font-size: 12px;
					input {
						float: left;
						margin-right: 20px;
						margin-top: 9px;
					}
					span {
						color: #666666;
						cursor: pointer;
					}
					label {
						float: right;
						color: #8B766C;
						cursor: pointer;
					}
				}
				.total {
					overflow: auto;
					font-size: 14px;
					margin-bottom: 10px;
					margin-left: 10px;
					margin-top: 10px;
					margin-right: 10px;
					div {
						&:nth-child(1) {
							color: #8B766C;
							float: left;
						}
						&:nth-child(2) {
							float: right;
							color: #D36767;
						}
					}
				}
			}
			.contrast-box {
				ul {
					overflow: auto;
					height: calc(100vh - 150px);
					margin-top: 10px;
					margin-bottom: 10px;
					&::-webkit-scrollbar {
						width: 3px;
					}
					>li {
						&:hover {
							label {
								display: block;
							}
						}
						float: left;
						width: 110px;
						color: #666666;
						text-align: left;
						margin-bottom: 17px;
						margin-left: calc((100% - 220px)/3);
						position: relative;
						img {
							cursor: pointer;
							display: block;
							width: 110px;
							height: 110px;
							margin-bottom: 10px;
							border: 1px solid #e6e6e6;
						}
						div {
							&:nth-child(2) {
								font-size: 12px;
								height: 15px;
								line-height: 15px;
								margin-bottom: 9px;
								color: #F09B9B;
								font-weight: 300;
								font-family: twCenMt;
								span {
									margin-left: 10px;
								}
							}
							&:nth-child(4) {
								text-align: center;
								line-height: 30px;
								color: white;
								font-size: 12px;
								cursor: pointer;
								height: 30px;
								background: rgba(206, 190, 176, 1);
							}
						}
						ol {
							height: 180px;
							li {
								height: 30px;
								color: #999999;
								font-size: 12px;
								padding-left: 5px;
								padding-right: 5px;
								line-height: 30px;
								span {
									float: right;
								}
								&:nth-child(odd) {
									background: #F8F8F8;
								}
							}
						}
						label {
							color: white;
							display: none;
							position: absolute;
							top: 2px;
							right: 2px;
						}
					}
				}
			}
			.wish-box {
				.wish-container {
					overflow: auto;
					height: calc(100vh - 130px);
					&::-webkit-scrollbar {
						width: 3px;
					}
				}
				dl {
					margin-right: 10px;
					dt {
						margin: 10px 0px;
						margin-left: 10px;
						height: 31px;
						color: white;
						font-size: 16px;
						clear: both;
						line-height: 31px;
						background: rgba(220, 213, 207, 1);
					}
					dd {
						margin-left: calc((100% - 217px)/3);
						float: left;
						color: #666666;
						text-align: left;
						cursor: pointer;
						margin-bottom: 17px;
						position: relative;
						&:hover {
							label {
								display: block;
							}
						}
						img {
							width: 110px;
							height: 110px;
							margin-bottom: 10px;
							border: 1px solid #e6e6e6;
						}
						span {
							margin-left: 10px;
							font-weight: 300;
							font-family: twCenMt;
						}
						label {
							color: #999999;
							display: none;
							position: absolute;
							top: 2px;
							right: 2px;
						}
					}
				}
			}
		}
		.box-show {
			right: 0px;
		}
		.box-ul-show {
			margin-right: 274px;
		}
		>ul {
			position: relative;
			z-index: 11;
			-webkit-transition: all 0.2s ease-in-out;
			-moz-transition: all 0.2s ease-in-out;
			-ms-transition: all 0.2s ease-in-out;
			transition: all 0.2s ease-in-out;
			margin-right: 0px;
			height: 520px;
			margin-top: calc((100vh - 220px) / 2);
			.active {
				color: #CEBEB0;
				width: 46px;
				padding-right: 6px;
				margin-right: -6px;
				background: white;
				border: 1px solid #ddd;
				border-right: none;
				box-shadow: -1px 0px 3px 0px #ddd;
				&:hover {
					padding-left: 0px;
					color: #CEBEB0;
					background: white;
				}
			}
			li {
				color: white;
				height: 40px;
				background: #CEBEB0;
				overflow: hidden;
				position: relative;
				cursor: pointer;
				float: right;
				width: 40px;
				clear: both;
				line-height: 40px;
				margin-bottom: 10px;
				font-size: 14px;
				-webkit-transition: all 0.1s ease-in-out;
				-moz-transition: all 0.1s ease-in-out;
				-ms-transition: all 0.1s ease-in-out;
				transition: all 0.1s ease-in-out;
				border-radius: 6px 0px 0px 6px;
				&:hover {
					padding-left: 129px;
					background: #8B766C;
					color: white;
				}
				&:nth-child(6):hover {
					padding: 0px;
				}
				&:nth-child(5) {
					opacity: 0;
					margin-top: 190px;
				}
				&:nth-child(5):hover {
					padding: 0px;
				}
				label {
					float: right;
					width: 40px;
					text-align: center;
					i {
						font-size: 20px;
					}
				}
				span {
					width: 89px;
					text-align: left;
					text-indent: 12px;
					position: absolute;
					right: 44px;
				}
				&:nth-child(4) {
					i {
						font-size: 25px;
					}
				}
			}
		}
	}
</style>
