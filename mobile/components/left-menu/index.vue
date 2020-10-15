<template>
  <div :class="['left-menu', { active: active }]" @touchmove.stop.prevent="">
    <div class="bg" @click="hide"></div>
    <div class="menu">
      <div class="top">
        <!-- <div class="icon" @click="hide">
          <i class="iconfont iconcebianlan"></i>
        </div> -->
        <div class="site-info" @click="toSiteSwitch">
          <div class="flag">
            <!-- <img v-show="hkIcon" src="/hongkong-square.png" />
            <img v-show="cnIcon" src="/china-square.png" />
            <img v-show="enIcon" src="/USA-square.png" /> -->
            <i class="iconfont icon_xuanzeyuyanhuobi"></i>
          </div>
          <!-- <div class="language">
            <span>简/繁/EN</span>
          </div> -->
          <div class="coin">
            {{ coinInfo.content }}
          </div>
          <span class="gap-line"></span>
        </div>
        <div class="icon" >
          <div class="log-in" @click="menu" v-show="showa">
            <i class="iconfont icongerenzhongxin" ></i>
            <span class="pl-login">{{lang.login}}</span>
          </div>
          <div class="logined" v-show="showb" @click="toPersonal">
            <span class="coloricon" ><i class="iconfont icongerenzhongxin" ></i></span>
            <span class="pl-login">{{ replacepos(date.username, 2, 6, '***') }}</span>
          </div>
        </div>

      </div>
      <div :class="['content', {'height': !bottom}]">
        <!-- <div class="search">
          <button class="search-btn" @click="toPage('search')">
            <i class="iconfont iconicon-sousuo btn-icon"></i>
            <span class="btn-message">{{ lang.search }}</span>
          </button>
        </div> -->
        <div class="groups">
          <section  class="group">
            <div class="menus-one"  @click="one(1)">
              <span :class="{changeColor:changeColor1}">{{lang.Rings}}</span>
              <!-- <i class="iconfont iconxiala status-icon"></i> -->
              <div class="menus-two" :class="{ actives: actives1 == true }">
                <div class="goback" @click.stop="goback(1)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.Rings}}</span>
                </div>
                <span class="login-border"></span>
                <div v-for="(ring, r) in rings" :key="r" @click="toPage(ring.routerName, ring.query,r)" :class='{changeColor:r==isactive}'>
                  <div class="two" >
                    <span>{{ring.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="one(2)">
              <span :class="{changeColor:changeColor2}">{{lang.necklaces}}</span>
              <!-- <i class="iconfont iconxiala status-icon" ></i> -->
              <div class="menus-two" :class="{ actives: actives2 }">
                <div class="goback" @click.stop="goback(2)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.necklaces}}</span>
                </div>
                <div v-for="(necklace, n) in necklaces" :key="n" @click="toPage(necklace.routerName, necklace.query,n)" :class='{changeColor:n==isactive}'>
                  <div class="two" >
                    <span>{{necklace.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="one(3)">
              <span :class="{changeColor:changeColor3}">{{lang.Bracelets}}</span>
              <!-- <i class="iconfont iconxiala status-icon" ></i> -->
              <div class="menus-two" :class="{ actives: actives3 }">
                <div class="goback" @click.stop="goback(3)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.Bracelets}}</span>
                </div>
                <div v-for="(bracelet, b) in Bracelets" :key="b" @click="toPage(bracelet.routerName, bracelet.query,b)" :class='{changeColor:b==isactive}'>
                  <div class="two" >
                    <span>{{bracelet.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="one(4)">
              <span :class="{changeColor:changeColor4}">{{lang.DesignDiamondRing}}</span>
              <!-- <i class="iconfont iconxiala status-icon" ></i> -->
              <div class="menus-two" :class="{ actives: actives4 }">
                <div class="goback" @click.stop="goback(4)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.DesignDiamondRing}}</span>
                </div>
                <div class="two" @click.stop="goToMade(1)">
                  <span :class="{changeColor:change1}">{{lang.SelectDiamondFirst}}</span>
                </div>
                <div class="two" @click.stop="goToMade(2)">
                  <span :class="{changeColor:change2}">{{lang.DiamondRing}}</span>
                </div>
              </div>
            </div>
            <!-- <div class="menus-one" @click="one(5)">
              <span :class="{changeColor:changeColor5}">{{lang.activity}}</span>
              <div class="menus-two" :class="{ actives: actives5 }">
                <div class="goback" @click.stop="goback(5)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.activity}}</span>
                </div>
                <div v-for="(activity, a) in activity" :key="a" @click="toPage(activity.routerName, activity.query,a)" :class='{changeColor:a==isactive}'>
                  <div class="two" >
                    <span>{{activity.name}}</span>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="menus-one" @click="one(6)">
              <span :class="{changeColor:changeColor6}">{{lang.theme}}</span>
              <!-- <i class="iconfont iconxiala status-icon" ></i> -->
              <div class="menus-two" :class="{ actives: actives6 }">
                <div class="goback" @click.stop="goback(6)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.theme}}</span>
                </div>
                <div v-for="(theme, t) in themes" :key="t" @click="toPage(theme.routerName, theme.query,t)" :class='{changeColor:t==isactive}'>
                  <div class="two" >
                    <span>{{theme.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="goKnowledge" >
              <!-- <nuxt-link :to="{ name: 'help-pages-knowledge' }"></nuxt-link> -->
              <span :class="{changeColor:changeColor7}">{{lang.knowledge}}</span>
            </div>
          </section>
        </div>
      </div>
      <div class="bottom" v-show="bottom">
        <div class="call-us">
          <!-- <div class="item">
            <div class="item-icon">
              <i class="iconfont icongerenzhongxin"></i>
            </div>
            <div class="item-name">
              {{ lang.callus }}
            </div>
          </div> -->
        </div>
        <div class="help">
          <a v-if="this.$store.state.platform === 21" href="tel:19925412336">
            <div class="item">
              <div class="item-icon">
                <i class="iconfont iconphone"></i>
              </div>
              <div class="item-name">
                {{ lang.tel }}
              </div>
            </div>
          </a>
          <a v-else href="tel:+852 2165 3908">
            <div class="item">
              <div class="item-icon">
                <i class="iconfont iconphone"></i>
              </div>
              <div class="item-name">
                {{ lang.tel }}
              </div>
            </div>
          </a>
        </div>
        <div class="help">
          <a v-if="this.$store.state.platform === 21" href="mailto:e-service@bddco.com">
            <div class="item">
              <div class="item-icon">
                <i class="iconfont iconyouxiang"></i>
              </div>
              <div class="item-name">
                {{ lang.mail }}
              </div>
            </div>
          </a>
          <a v-else href="mailto:service@bddco.com">
            <div class="item">
              <div class="item-icon">
                <i class="iconfont iconyouxiang"></i>
              </div>
              <div class="item-name">
                {{ lang.mail }}
              </div>
            </div>
          </a>
        </div>

        <div class="help" @click="toPersonal">
          <div class="item">
            <div class="item-icon">
              <i class="iconfont icongerenzhongxin"></i>
            </div>
            <div class="item-name">{{ lang.personalCenter }}</div>
          </div>
        </div>

        <div class="help" v-if="isLogin" @click="logout">
          <div class="item">
            <div class="item-icon quit"></div>
            <div class="item-name">{{ lang.logout }}</div>
          </div>
        </div>
      </div>
      <site-switch ref="site-switch"></site-switch>
    </div>
  </div>
</template>

<script>
import Helpers from '@/assets/js/helpers.js'
import Mixin from '../../pages/accessories/mixin.js'
import List from '@/mixins/list.js'
// import GoodListProps from '@/mixins/good-list-props.js'
export default {
  mixins: [Mixin, List],
  data() {
    return {
      cnIcon:true,
      enIcon:false,
      hkIcon:false,
      isactive:'a',
      changeColor1:false,
      changeColor2:false,
      changeColor3:false,
      changeColor4:false,
      changeColor5:false,
      changeColor6:false,
      changeColor7:false,
      change1:false,
      change2:false,
      icon:false,
      lang: this.LANGUAGE.components.leftMenu,
      active: false,
      actives1: false,
      actives2: false,
      actives3: false,
      actives4: false,
      actives5: false,
      actives6: false,
      showa:true,
      showb:false,
      bottom:true,
      isLogin: !!this.$store.state.token,
      rings:[

        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.engagementRing,
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 160
          }
        },
        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.marriageRing,
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 161
          }
        },
        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.Ring,
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 164
          }
        },
        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.FashionRing,
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 163
          }
        },
        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.CoupleRing,
          routerName: 'marriage-ring-pair-ring',
          // query: {
          //   style: 1
          // }

        },
      ],
      necklaces:[
        {
          name: this.LANGUAGE.components.leftMenu.necklace,
          routerName: 'accessories-list',
          query:  {
            actIndex: 0
          },
        },
        {
          name: this.LANGUAGE.components.leftMenu.Pendant,
          routerName: 'accessories-list',
           query:  {
            actIndex: 1
          },
        }
      ],
      Bracelets:[
        {
          name: this.LANGUAGE.components.leftMenu.Bracelet,
          routerName: 'accessories-list',
           query:  {
            actIndex: 4
          },
        },
        {
          name: this.LANGUAGE.components.leftMenu.bracelet,
          routerName: 'accessories-list',
           query:  {
            actIndex: 5
          },
        }
      ],
      activity:[
        {
          name: this.LANGUAGE.components.leftMenu.BlackFriday,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.coupon,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.SpecialDiscount,
          age:'20'
        }
      ],
      themes:[
        {
          name: this.LANGUAGE.components.leftMenu.rings,
          routerName: 'marriage-ring-single-ring',
        },
        {
          name: this.LANGUAGE.components.leftMenu.CoupleRings,
          routerName: 'marriage-ring-pair-ring',
        },
        {
          name: this.LANGUAGE.components.leftMenu.NecklaceAndPendant,
          routerName: 'accessories-list',
          query:  {
            actIndex: 0
          },
        },
        {
          name: this.LANGUAGE.components.leftMenu.EarringsAndStuds,
          routerName: 'accessories-list',
          query:  {
            actIndex: 3
          },
        },
        {
          name: this.LANGUAGE.components.leftMenu.DecorationAndPendant,
          routerName: 'accessories-list',
          query:  {
            actIndex: 6
          },
        },
        {
          name: this.LANGUAGE.components.leftMenu.others,
          routerName: 'accessories-list',
          query:  {
            actIndex: 8
          },
        }
      ],
      // zhishi:[
      //   {
      //     name: this.LANGUAGE.components.leftMenu.knowledge,
      //     routerName: 'help-pages-knowledge',
      //   }
      // ],
      date:''
    }
  },
  computed: {
    languageInfo() {
      let result = ''
      const language = this.$store.state.language
      const languageOptions = this.$bddDefinition.languageOptions
      for (let n = 0, length = languageOptions.length; n < length; n++) {
        if (languageOptions[n].code === language) {
          result = languageOptions[n]
          break
        }
      }
      return result
    },
    coinInfo() {
      let result = ''
      const coin = this.$store.state.coin
      const coinOptions = this.$bddDefinition.coinOptions
      const coinOptionsCn = this.$bddDefinition.coinOptionsCn
      const coinOptionsTw = this.$bddDefinition.coinOptionsTw

      if(this.$store.state.platform === 21){
        for (let n = 0, length = coinOptionsCn.length; n < length; n++) {
          if (coinOptionsCn[n].code === coin) {
            result = coinOptionsCn[n]
            break
          }
        }
        return result
      } else if(this.$store.state.platform === 41){
        for (let n = 0, length = coinOptionsTw.length; n < length; n++) {
          if (coinOptionsTw[n].code === coin) {
            result = coinOptionsTw[n]
            break
          }
        }
        return result
      } else {
        for (let n = 0, length = coinOptions.length; n < length; n++) {
          if (coinOptions[n].code === coin) {
            result = coinOptions[n]
            break
          }
        }
        return result
      }
    }
  },
  // created() {
  //   this.$store.dispatch('getUserInfo')
  //   this.getinfo()
  // },
  mounted(){
    if(this.$store.state.coin == 'CNY'){
      this.cnIcon = true
      this.enIcon = false
      this.hkIcon = false
    }
    if(this.$store.state.coin == 'HKD'){
      this.hkIcon = true
      this.enIcon = false
      this.cnIcon = false
    }
    if(this.$store.state.coin == 'USD'){
      this.enIcon = true
      this.cnIcon = false
      this.hkIcon = false
    }
    const _this = this
    if(_this.$store.getters.hadLogin){
      this.showa=false
      this.showb=true
      this.$store.dispatch('getUserInfo')
      this.getinfo()
      // this.isActive=true
      // this.show=true
    }
    // console.log("sssss",this.categoryId)
  },
  methods: {
    getinfo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/web/member/member/me`
        })
        .then(res => {
          this.date = res
          if (this.date === 1) {
            this.headImg = require('~/static/personal/men.png')
          } else if (this.date === 2) {
            this.headImg = require('~/static/personal/women.png')
          } else {
            this.headImg = require('~/static/personal/unknown.png')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
     // 加密显示
    replacepos(text, start, stop, replacetext) {
      if (text) {
        const mystr =
          text.substring(0, stop - 3) + replacetext + text.substring(stop + 3)
        return mystr
      }
    },
    menu(){
      this.hide()
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
        name: 'login'
      })
    },
    toPersonal() {
     this.hide()
      this.$router.push({
        name: 'personal'
      })
    },
    one(id){
      this.bottom = false
      if(id == 1){
        this.actives1 = true
        this.changeColor2 = false
        this.changeColor3 = false
        this.changeColor4 = false
        this.changeColor5 = false
        this.changeColor6 = false
        this.changeColor7 = false
        this.changeColor1 = true
      }
      if(id == 2){
        this.actives2 = true
        this.changeColor1 = false
        this.changeColor3 = false
        this.changeColor4 = false
        this.changeColor5 = false
        this.changeColor6 = false
        this.changeColor7 = false
        this.changeColor2 = true
      }
      if(id == 3){
        this.actives3 = true
        this.changeColor1 = false
        this.changeColor2 = false
        this.changeColor4 = false
        this.changeColor5 = false
        this.changeColor6 = false
        this.changeColor7 = false
        this.changeColor3 = true
      }
      if(id == 4){
        this.actives4 = true
        this.changeColor1 = false
        this.changeColor3 = false
        this.changeColor2 = false
        this.changeColor5 = false
        this.changeColor6 = false
        this.changeColor7 = false
        this.changeColor4 = true
      }
      if(id == 5){
        this.actives5 = true
        this.changeColor1 = false
        this.changeColor3 = false
        this.changeColor4 = false
        this.changeColor2 = false
        this.changeColor6 = false
        this.changeColor7 = false
        this.changeColor5 = true
      }
      if(id == 6){
        this.actives6 = true
        this.changeColor1 = false
        this.changeColor3 = false
        this.changeColor4 = false
        this.changeColor5 = false
        this.changeColor2 = false
        this.changeColor7 = false
        this.changeColor6 = true
      }
    },
    goback(id){
      this.bottom = true
      this.actives1 = false
      this.actives2 = false
      this.actives3 = false
      this.actives4 = false
      this.actives5 = false
      this.actives6 = false
    },
    goToMade(i) {
      this.hide()
      const obj = {
        steps: [
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: i,
            cartId: ``,
            page: `list`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: null,
            cartId: ``,
            page: `list`
          }
        ]
      }
      // console.log("obg",obj)
      if (i === 1) {
        this.change1 = true
        this.change2 = false
        this.$router.push({
          name: `custom-made-diamond-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 1
          }
        })
      } else if (i === 2) {
        this.change1 = false
        this.change2 = true
        this.$router.push({
          name: `custom-made-ring-made-ring-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 1
          }
        })
      }
    },
    goKnowledge(){
      this.hide()
      this.changeColor1 = false
      this.changeColor3 = false
      this.changeColor4 = false
      this.changeColor5 = false
      this.changeColor6 = false
      this.changeColor2 = false
      this.changeColor7 = true
      this.$router.push({
        name: 'help-pages-knowledge',
      })
    },

    show() {
      this.active = true
    },
    hide() {
      this.active = false
    },
    toPage(routerName = '', query = {},index) {
      this.isactive = index;
      if (!routerName) {
        return
      }
      this.hide()
      this.$router.push({
        name: routerName,
        query: query
      })
    },
    toSiteSwitch() {
      this.hide()
      // this.$refs['site-switch'].show()
      // if(this.active = false){
      //   this.$refs['site-switch'].show()
      // }
      this.$router.push({
        name: 'site-switch',
        query: {
          redirectUri: window.location.href
        }
      })
    },
    logout() {
      const _this = this
      _this.$ConfirmBox({
        title: this.lang.tips,
        message: this.lang.text,
        buttons: [
          {
            text: this.lang.cancel,
            callback: () => {
              console.log('点击了取消')
            }
          },
          {
            text: this.lang.course,
            callback: () => {
              _this.$store.dispatch('logout')
              window.location.href = '/'
            }
          }
        ]
      })
    }
  }
}
</script>
<style >
.coloricon .icongerenzhongxin:before{
  color:#A2C2D2;
}
</style>
<style lang="less" scoped>
.log-in{
  display:flex;
}
.logined{
  display:flex;
  width: 100%;
}
.changeColor{
  color: #6f9eb1;
}
.content{
  overflow: hidden;
  .groups{
    position: relative;
    .status-icon {
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 16px;
      color: #666666;
      transition: all 0.2s linear;
      transform: rotate(270deg);
      display: inline-block;
    }

    .menus-one{
      display: flex;
      justify-content: space-between;
      padding: 16px 0 16px 20px;
      color: rgb(15, 14, 14);
      >span:hover{
        color: #6f9eb1;
      }
      .menus-two{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0;
        transform: translate(100%, 0);
        transition: all 0.2s linear;
        z-index: 999;
        background-color: #F5F5F5;
        .goback{
          margin: 0 10px;
          text-align: left;
          padding: 18px 0px;
          border-bottom:1px solid #A9C6D5;
          .status-icon{
            margin-left: 5px;
            transform: rotate(450deg);
          }
          span{
            display: inline-block;
            width: 80%;
            text-align:center;
          }
        }
        .two{
          padding: 15px 15px;
          display: flex;
          justify-content: space-between;
          >span:hover{
            color: #6f9eb1;
          }
        }
      }
      .actives{
        position: absolute;
        top: 0;
        left: 0;
        width: 270px;
        height: 100%;
        box-sizing: border-box;
        background-color: #F5F5F5;
        transform: translate(0, 0);
        transition: all 0.3s linear;
        display: flex;
        flex-direction: column;
      }
    }
  }
}


.left-menu {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  visibility: hidden;
  z-index: 100;
}
.left-menu.active {
  visibility: visible;
  background: rgba(0,0,0,0.8);
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transition: opacity 0.3s ease-in-out;
  width: 100vw;
  opacity: 1;
  pointer-events: all;
  z-index: 0;
}
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.bg::before,.bg:after{
  background: #fff;
  content: "";
  height: 2px;
  position: absolute;
  top: 30px;
  right: 10vw;
  transform: rotate(45deg);
  width: 25px;
}
.bg:after{
  transform: rotate(-45deg);
}
.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 270px;
  height: 100%;
  box-sizing: border-box;
  background-color: #F5F5F5;
  box-shadow: 0 6px 21px 1px rgba(153, 153, 153, 0.35); /*no*/
  transform: translate(-100%, 0);
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.active .menu {
  transform: translate(0, 0);
}

/*顶部关闭按钮*/
.top {
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 50px;
  padding-left:15px;
  border-top:4px solid #a2c2d2;
  background-color: #e4ecf0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.top .icon {
  display: flex;
  text-align: right;
  margin-right: 3px;
  .iconfont {
    font-size: 20px;
  }
}

/*站点信息*/
.site-info {
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
}
.site-info .icon{
  position: relative;
}
.pl-login{
  color: #6f9eb1;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.site-info .flag {
  margin-right: 4px;
}
.site-info .flag i {
  color: #d72923;
  font-size: 15px;
}
.site-info .language {
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
.site-info .gap-line {
  margin: 0 23px 0 30px;
  width: 1px;
  height: 16px;
  font-size: 12px;
  background-color: #a2c2d2;
}
.site-info .coin {
  flex-grow: 0;
  flex-shrink: 0;
  height: 22px;
  line-height: 22px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  box-sizing: border-box;
}

/*菜单内容*/
.content {
  flex-shrink: 1;
  box-sizing: border-box;
}

/*搜索栏*/
.search {
  height: 24px;
  background: rgba(238, 238, 238, 1);
  border-radius: 4px;
}
.search-btn {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

/*分组*/
.group {
  padding: 10px 0;
  border-bottom: 1px solid rgba(221, 221, 221, 0.8); /*no*/
}
.group:nth-last-of-type(1) {
  border-bottom: 0;
}
.group .item {
  padding: 10px 0;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.group .item.stress {
  color: rgba(220, 165, 152, 1);
}
.group .item.small-gap {
  padding: 4px 0;
}

/*底部固定*/
.bottom {
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 15px;
  .call-us {
    font-weight: 400;
    text-align: left;
    margin-bottom: 10px;
    .item {
      display: flex;
      .item-icon {
        margin-bottom: 3px;
        line-height: 30px;
        .iconfont {
          font-weight: 500;
          font-size: 20px;
        }
      }
      .item-name {
        text-align: center;
        margin-left: 10px;
        line-height: 29px;
        font-weight: 400;
        color: rgb(15, 14, 14);
      }
    }
  }

  /*帮助*/
  .help {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: left;

    .item {
      display: flex;
      align-items: center;
      .item-icon {
        margin-bottom: 3px;
        line-height: 30px;

        .iconfont {
          font-size: 20px;
          color: rgb(15, 14, 14);
        }
      }
      .item-name {
        text-align: center;
        margin-left: 10px;
        line-height: 29px;
        font-weight: 400;
        color: rgb(15, 14, 14);
      }
    }

    .quit{
      width: 20px;
      height: 20px;
      background: url('/icon/quit.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}

.height{
  height: 100%;
}
</style>
