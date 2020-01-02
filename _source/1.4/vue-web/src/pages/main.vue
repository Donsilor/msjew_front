<template>
  <div class="main">
    <NavTop/>
    <Nav/>
    <NavFooter/>
    <div class="container clearfix">
      <router-view/>
    </div>
    <!--<div>
<span style="font-size: 18px;" class="icon iconfont">&#xe611;</span>
<span style="font-size: 18px;" class="icon iconfont">&#xe607;</span>
</div> -->
    <BarFooter/>
    <NavRight/>
  </div>
</template>

<script>
import Nav from '@/components/nav';
import NavTop from '@/components/navTop';
import NavFooter from '@/components/navFooter';
import BarFooter from '@/components/footer';
import NavRight from '@/components/navRight';
import {
  getToken,
  getCartList,
  clearCartList,
  getWishList,
  clearWishList,
  getDiamondList,
  clearDiamondList,
  setToken
} from '@/api/cache.js';
import {addCard, addWish} from '@/api/func.js';

export default {
  components: {Nav, NavTop, NavFooter, BarFooter, NavRight},
  data() {
    return {
      products: this.$store.state.switchLang
    };
  },
  created() {
    this.hasLogin();
  },
  methods: {
    async hasLogin() {
      let token = getToken() || this.$route.query.token;
      if (token) {
        setToken(token);
        // 在cookie存在token的话，获取用户信息，改变用户状态
        this.$axiosGet(`web/user/me`).then(res => {
          // console.log('akm===>', res)
          if (res.code === 200) {
            this.$store.commit('setToken', res.data, token);
            let cartList = getCartList(); // 购物车
            let wishList = getWishList(); // 心愿单
            let diamondList = getDiamondList(); // 钻石对比

            if (cartList && cartList.length > 0) {
              clearCartList();
              addCard(2, cartList, cartList);
            }

            if (wishList && wishList.length > 0) {
              clearWishList();
              addWish(2, 1, wishList);
            }
            if (diamondList && diamondList.length > 0) {
              clearDiamondList();
              addWish(2, 2, diamondList);
            }
          } else {
            this.$message.error(this.$LANGUAGE.index.mainTips);
          }
        });
      } else {
        this.$store.commit('unsetToken');
      }
    }
  }
};
</script>

<style lang="less">
  h1 {
    font-size: 50px;
  }

  .main {
    margin-top: 30px;
  }

  .el-loading-mask .el-loading-spinner .path {
    stroke: rgba(176, 160, 155, 1);
  }
</style>
