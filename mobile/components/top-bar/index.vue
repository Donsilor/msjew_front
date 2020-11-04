<template>
  <div :class="['top-bar', { fixed: fixed }]">
    <div class="left">
      <div class="icon" @click="showMenu">
        <i class="iconfont iconcebianlan"></i>
      </div>
      <div class="site-info" @click="toSiteSwitch" v-if="this.$store.state.platform == 11 ||this.$store.state.platform == 31">
          <div class="flag">
            <!-- <img v-show="hkIcon" src="/hongkong-round.png" /> -->
            <!-- <img v-show="cnIcon" src="/china-round.png" /> -->
            <!-- <img v-show="enIcon" src="/USA-round.png" /> -->
            <i class="iconfont icon_xuanzeyuyanhuobi"></i>
          </div>
          <div class="language">
            <span>{{language}}</span>
            <!-- <span >|</span>
            <span>cny</span> -->
          </div>
          <!-- <span class="gap-line"></span> 简/繁/EN
          <div class="coin">
            {{ coinInfo.content }}
          </div> -->
        </div> 

    </div>
    <div class="center">
      <img src="/logo-ms.png" class="logo" @click="toIndex" />
    </div>
    <div class="right">
      <div class="icon search" @click="toPage('search')">
        <!-- <i class="iconfont iconweizhiyuyan"></i> -->
        <i class="iconfont iconicon-sousuo btn-icon" ></i>
      </div>
      <!-- <div class="icon" @click="toPersonal">
        <i class="iconfont icongerenzhongxin" v-show="showa"></i>
        <span class="coloricon" v-show="showb"><i class="iconfont icongerenzhongxin" ></i></span>
      </div> -->
      <div class="icon" @click="toCart">
        <i class="iconfont icongouwuche"></i>
        <span v-if="cartAmount > 0" class="cart-amount">{{ cartAmount }}</span>
      </div>
    </div>

    <left-menu ref="left-menu"></left-menu>
    <site-switch ref="site-switch"></site-switch>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LeftMenu from '../left-menu/index.vue'
export default {
  components: {
    LeftMenu
  },
  props: {
    fixed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return{
      showa:true,
      showb:false,
      url:'',
      language: '',
      cnIcon:true,
      enIcon:false,
      hkIcon:false
    }
  },
  computed: {
    ...mapGetters(['cartAmount'])
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getCartAmount()
    })
    if(_this.$store.getters.hadLogin){
      this.showa=false
      this.showb=true
      // this.isActive=true
      // this.show=true
    }
    if(this.$store.state.language == 'zh_CN'){
      this.language = '简'
      this.cnIcon = true
      this.enIcon = false
      this.hkIcon = false
    }
    if(this.$store.state.language == 'zh_TW'){
      this.language = '繁'
      this.hkIcon = true
      this.enIcon = false
      this.cnIcon = false
    }
    if(this.$store.state.language == 'en_US'){
      this.language = 'EN'
      this.enIcon = true
      this.cnIcon = false
      this.hkIcon = false
    }
    // console.log("language",this.$store.state.language)
  },
  methods: {
    ...mapActions(['getCartAmount']),
    showMenu() {
      this.$refs['left-menu'].show()
    },
    toSiteSwitch() {
      this.$refs['site-switch'].show()
      // this.$router.push({
      //   name: 'site-switch',
      //   query: {
      //     redirectUri: window.location.href
      //   }
      // })
    },
    toIndex() {
      this.$router.push({
        name: 'index'
      })
    },
    toPersonal() {
      // 点击登入获取上页url
      let oldurl=window.location.pathname
      let params=window.location.search
      //如果是订单确认页面，返回到购物车
      if((/^\/cart\/sureOrder/).test(oldurl)){
          oldurl = '/cart'
          params = ''
      }
      console.log(oldurl);
      const url=oldurl+params
      localStorage.setItem('url',url)
      // setTimeout(() => {
      //   this.$router.push({
      //       path: `/login`,
      //       // query: {url}
      //   })
      // },0)
      this.$router.push({
        name: 'personal'
      })
    },
    toCart() {
      this.$router.push({
        name: 'cart'
      })
    },
    toPage(routerName = '', query = {}) {
      if (!routerName) {
        return
      }
      // this.hide()
      this.$router.push({
        name: routerName,
        query: query
      })
    },
  }
}
</script>
<style >
.coloricon .icongerenzhongxin:before{
  color:#A2C2D2;
}
</style>
<style scoped>
/* .active{
  color:#f29b87;
} */
/*站点信息*/
.site-info {
  border-radius: 20px;
  padding-right: 2px;
  background-color: #a2c2d2;
  padding: 0 2px 0 4px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.site-info .flag {
  margin: 1px 0 0 0;
}
.site-info .flag i {
  color: #d72923;
  font-size: 14px;
}
.site-info .language {
  font-size: 13px;
  font-weight: 400;
  color:#fff;
  width: 26px;
}
.site-info .gap-line {
  margin: 0 13px;
  width: 1px;
  height: 16px;
  background: rgba(221, 221, 221, 1);
}
.site-info .coin {
  flex-grow: 0;
  flex-shrink: 0;
  height: 22px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  box-sizing: border-box;
}

.top-bar {
  position: relative;
  width: 100%;
  height: 44px;
  padding: 0 18px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(187, 187, 187, 0.35); /*no*/
  display: flex;
  align-items: stretch;
  justify-content: center;
}
.top-bar.fixed {
  position: fixed;
}
.left,
.right {
  position: relative;
  flex-basis: 50px;
  flex-grow: 1;
  flex-shrink: 1;
  /*background-color: #3b5998;*/
  display: flex;
  align-items: center;
}
.left{
  justify-content: flex-start;
}
.left .iconfont{
    color:#a2c2d2;
  }
.right {
  justify-content: flex-end;
}
.center {
  position: relative;
  flex-basis: 40px; 
  flex-grow: 0;
  flex-shrink: 0;
  /*background-color: #f29b88;*/
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  max-width: 100%;
  max-height: 100%;
}
.iconfont {
  font-size: 20px;
  color: #333333;
}
.icon {
  position: relative;
}
.search{
  font-weight: 700;
}
.left .icon:nth-of-type(1) {
  margin-right: 25px;
}
.right .icon:nth-of-type(1) {
  margin-right: 33px;
}
.cart-amount {
  position: absolute;
  top: 0;
  left: 50%;
  width: 18px;
  height: 18px;
  line-height: 19px;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  font-size: 9px;
  font-weight: 400;
  background-color: #A2C2D2;
}
</style>
