<template>
  <div :class="['left-menu', { active: active }]" @touchmove.stop.prevent="">
    <div class="bg" @click="hide"></div>
    <div class="menu">
      <div class="top">
        <div class="icon" @click="hide">
          <i class="iconfont iconcebianlan"></i>
        </div>
        <div class="site-info" @click="toSiteSwitch">
          <div class="flag">
            <img src="/hongkong-round.png" />
          </div>
          <div class="language">
            <span>简/繁/EN</span>
          </div>
          <span class="gap-line"></span>
          <div class="coin">
            {{ coinInfo.content }}
          </div>
        </div>
        
      </div>
      <div class="content">
        <!-- <div class="search">
          <button class="search-btn" @click="toPage('search')">
            <i class="iconfont iconicon-sousuo btn-icon"></i>
            <span class="btn-message">{{ lang.search }}</span>
          </button>
        </div> -->
        <div class="groups">
          <section  class="group">
            <div class="menus-one"  @click="one(1)">
              <span >{{lang.Rings}}</span>
              <i class="iconfont iconxiala status-icon"></i>
              <div class="menus-two" :class="{ actives: actives1 == true }">
                <div class="goback" @click.stop="goback(1)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.Rings}}</span>
                </div>
                <div v-for="(ring, r) in rings" :key="r">
                  <div class="two" @click="toPage(ring.routerName, ring.query)">
                    <span>{{ring.name}}</span>
                  </div>
                </div>
                <!-- <div class="two">
                  <span>{{lang.engagementRing}}</span>
                </div>
                <div class="two">
                  <span>{{lang.marriageRing}}</span>
                </div>
                <div class="two">
                  <span>{{lang.Ring}}</span>
                </div>
                <div class="two">
                  <span>{{lang.FashionRing}}</span>
                </div>
                 <div class="two">
                  <span>{{lang.CoupleRing}}</span>
                </div> -->
              </div>
            </div>
            <div class="menus-one" @click="one(2)">
              <span>{{lang.necklaces}}</span>
              <i class="iconfont iconxiala status-icon" ></i>
              <div class="menus-two" :class="{ actives: actives2 }">
                <div class="goback" @click.stop="goback(2)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.necklaces}}</span>
                </div>
                <div v-for="(necklace, n) in necklaces" :key="n">
                  <div class="two" @click="toPage(necklace.routerName, necklace.query)">
                    <span>{{necklace.name}}</span>
                  </div>
                </div>
                <!-- <div class="two" @click.stop="go(1)">
                  <span>{{lang.necklace}}</span>
                </div>
                <div class="two" @click.stop="go(2)">
                  <span>{{lang.Pendant}}</span>
                </div> -->

              </div>
            </div>
            <div class="menus-one" @click="one(3)">
              <span>{{lang.Bracelets}}</span>
              <i class="iconfont iconxiala status-icon" ></i>
              <div class="menus-two" :class="{ actives: actives3 }">
                <div class="goback" @click.stop="goback(3)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.Bracelets}}</span>
                </div>
                <div v-for="(bracelet, b) in Bracelets" :key="b">
                  <div class="two" @click="toPage(bracelet.routerName, bracelet.query)">
                    <span>{{bracelet.name}}</span>
                  </div>
                </div>
                <!-- <div class="two">
                  <span>{{lang.Bracelet}}</span>
                </div>
                <div class="two">
                  <span>{{lang.bracelet}}</span>
                </div> -->
              </div>
            </div>
            <div class="menus-one" @click="one(4)">
              <span>{{lang.DesignDiamondRing}}</span>
              <i class="iconfont iconxiala status-icon" ></i>
              <div class="menus-two" :class="{ actives: actives4 }">
                <div class="goback" @click.stop="goback(4)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.DesignDiamondRing}}</span>
                </div>
                <div class="two" @click.stop="goToMade(1)">
                  <span>{{lang.SelectDiamondFirst}}</span>
                </div>
                <div class="two" @click.stop="goToMade(2)">
                  <span>{{lang.DiamondRing}}</span>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="one(5)">
              <span>{{lang.activity}}</span>
              <i class="iconfont iconxiala status-icon" ></i>
              <div class="menus-two" :class="{ actives: actives5 }">
                <div class="goback" @click.stop="goback(5)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.activity}}</span>
                </div>
                <div class="two">
                  <span>{{lang.BlackFriday}}</span>
                </div>
                <div class="two">
                  <span>{{lang.coupon}}</span>
                </div>
                <div class="two">
                  <span>{{lang.SpecialDiscount}}</span>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="one(6)">
              <span>{{lang.theme}}</span>
              <i class="iconfont iconxiala status-icon" ></i>
              <div class="menus-two" :class="{ actives: actives6 }">
                <div class="goback" @click.stop="goback(6)">
                  <i class="iconfont iconxiala status-icon" ></i>
                  <span>{{lang.theme}}</span>
                </div>
               <div class="two">
                  <span>{{lang.ValentinesDay}}</span>
                </div>
                <div class="two">
                  <span>{{lang.MothersDay}}</span>
                </div>
                <div class="two">
                  <span>{{lang.birthdayPresent}}</span>
                </div>
                <div class="two">
                  <span>{{lang.ChristmasGift}}</span>
                </div>
                <div class="two">
                  <span>{{lang.HalloweenGift}}</span>
                </div>
              </div>
            </div>
            <div class="menus-one" @click="goKnowledge">
              <!-- <nuxt-link :to="{ name: 'help-pages-knowledge' }"></nuxt-link> -->
              <span >{{lang.knowledge}}</span>
            </div>
          </section>
        </div>
      </div>
      <div class="bottom">
        <div class="call-us">
          <div class="item">
              <div class="item-icon">
                <i class="iconfont icongerenzhongxin"></i>
                <!-- <img src="/user.png" alt=""> -->
              </div>
              <div class="item-name">
                {{ lang.callus }}
              </div>
            </div>
        </div>
        <div class="help">
          <a href="tel:+852 2165 3905">
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
          <a href="mailto:service@bddco.com">
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
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from '@/assets/js/helpers.js'
import Mixin from '../../pages/accessories/mixin.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-list-props.js'
export default {
  mixins: [Mixin, List, GoodListProps],
  data() {
    return {
      icon:false,
      lang: this.LANGUAGE.components.leftMenu,
      active: false,
      actives1: false,
      actives2: false,
      actives3: false,
      actives4: false,
      actives5: false,
      actives6: false,
      rings:[
        {
          stress: true,
          name: this.LANGUAGE.components.leftMenu.WeddingAnniversaryRing,
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 162
          }
        },
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
          routerName: 'marriage-ring-single-ring',
          query: {
            style: 196
          }
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
      theme:[
        {
          name: this.LANGUAGE.components.leftMenu.ValentinesDay,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.MothersDay,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.birthdayPresent,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.ChristmasGift,
          age:'20'
        },
        {
          name: this.LANGUAGE.components.leftMenu.HalloweenGift,
          age:'20'
        }
      ],
      groups: [
        [
          {
            stress: true,
            name: this.LANGUAGE.components.leftMenu.engagementRing,
            routerName: 'engagement'
          },
          {
            stress: false,
            name: this.LANGUAGE.components.leftMenu.designYourRing,
            routerName: 'custom-made-ring-made-ring-list',
            query: {
              melo: Helpers.base64Encode(
                JSON.stringify({
                  steps: [
                    {
                      goodsId: null,
                      goodsDetailsId: null,
                      ct: 2,
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
                })
              ),
              step: 1
            }
          }
          // {
          //   stress: false,
          //   name: this.LANGUAGE.components.leftMenu.allCategory,
          //   routerName: 'engagement-list'
          // }
        ],
        [
          {
            stress: true,
            name: this.LANGUAGE.components.leftMenu.marriageRing,
            routerName: 'marriage-ring'
          },
          {
            stress: false,
            name: this.LANGUAGE.components.leftMenu.pairRing,
            routerName: 'marriage-ring-pair-ring'
          },
          {
            stress: false,
            name: this.LANGUAGE.components.leftMenu.ringForGentlemen,
            routerName: 'marriage-ring-single-ring',
            query: {
              type: 'gentlemen'
            }
          },
          {
            stress: false,
            name: this.LANGUAGE.components.leftMenu.ringForLady,
            routerName: 'marriage-ring-single-ring',
            query: {
              type: 'lady'
            }
          }
        ],
        [
          {
            stress: true,
            name: this.LANGUAGE.components.leftMenu.onlyDiamond,
            routerName: 'diamond-list'
          }
        ],
        [
          {
            stress: true,
            name: this.LANGUAGE.components.leftMenu.accessories,
            routerName: 'accessories-list'
          }
        ],
        [
          {
            stress: true,
            name: this.LANGUAGE.components.leftMenu.knowledge,
            routerName: 'help-pages-knowledge'
          }
        ]
      ],
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
      for (let n = 0, length = coinOptions.length; n < length; n++) {
        if (coinOptions[n].code === coin) {
          result = coinOptions[n]
          break
        }
      }
      return result
    }
  },
  mounted(){
    console.log("sssss",this.categoryId)
  },
  methods: {
    one(id){
      if(id == 1){
        this.actives1 = true
      }
      if(id == 2){
        this.actives2 = true
      }
      if(id == 3){
        this.actives3 = true
      }
      if(id == 4){
        this.actives4 = true
      }
      if(id == 5){
        this.actives5 = true
      }
      if(id == 6){
        this.actives6 = true
      }
    },
    goback(id){
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
      console.log("obg",obj)
      if (i === 1) {
        this.$router.push({
          name: `custom-made-diamond-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 1
          }
        })
      } else if (i === 2) {
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
    toPage(routerName = '', query = {}) {
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
      this.$router.push({
        name: 'site-switch',
        query: {
          redirectUri: window.location.href
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  .groups{
    position: relative;
    overflow: hidden;
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
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding-left:20px;
      border-bottom:1px solid #fff;
      background-color: #e4ecf0;
      z-index: 99;
      color: rgb(15, 14, 14);
      span{
        line-height: 60px;
      }
      .menus-two{
        padding-top: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0;
        transform: translate(100%, 0);
        transition: all 0.2s linear;
        z-index: 100;
        .goback{
          margin: 0 10px;
          text-align: left;
          // background-color: #e4ecf0;
          border-bottom:2px solid #e4ecf0;
          .status-icon{
            margin-left: 10px;
            transform: rotate(450deg);
          }
          span{
            display: inline-block;
            width: 80%;
            text-align:center; 
          }
        }
        .two{
          display: flex;
          justify-content: space-between;
          height: 60px;
          padding: 0 20px;
        }
      }
      .actives{
        position: absolute;
        top: 0;
        left: 0;
        width: 270px;
        height: 100%;
        box-sizing: border-box;
        background-color: #ffffff;
        // transition: right .3s ease-in-out;
        // box-shadow: 0 6px 21px 1px rgba(153, 153, 153, 0.35); /*no*/
        // transform: translate(50%, 0);
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
  // height: 100vh;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transition: opacity 0.3s ease-in-out;
  width: 100vw;
  z-index: -1;
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
.bg:before,.bg:after {
  background: #fff;
  right: 10vw;
}
.bg::before,.bg:after{
  background: #fff;
  content: "";
  height: 2px;
  position: absolute;
  top: 30px;
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
  background-color: #ffffff;
  box-shadow: 0 6px 21px 1px rgba(153, 153, 153, 0.35); /*no*/
  transform: translate(-100%, 0);
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
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
  height: 44px;
  padding: 0 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.top .icon {
  // flex-grow: 1;
  // flex-shrink: 1;
  color: #A2C2D2;
  text-align: right;
  margin-right: 30px;
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
.site-info .flag {
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 0;
  margin-right: 6px;
}
.site-info .flag img {
  height: 16px;
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

/*菜单内容*/
.content {
  // flex-grow: 1;
  flex-shrink: 1;
  // padding: 0 20px;
  box-sizing: border-box;
  // overflow: auto;
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
.groups {
  // margin-bottom: 25px;
}
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
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
}
.group .item.stress {
  font-size: 14px;
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
    font-size: 14px;
    font-weight: 400;
    // color: rgba(153, 153, 153, 1);
    text-align: left;
    margin-bottom: 10px;
    .item {
      // margin: 0 30px;
      display: flex;
      .item-icon {
        margin-bottom: 3px;
        // width: 30px;
        // height: 30px;
        line-height: 30px;
        // background: rgba(179, 179, 179, 1);
        // border-radius: 50%;

        .iconfont {
          font-weight: 500;
          font-size: 20px;
          // color: rgb(15, 14, 14);
          // color: rgba(153, 153, 153, 1);
        }
      }
      .item-name {
        text-align: center;
        margin-left: 10px;
        font-size: 14px;
        line-height: 29px;
        font-weight: 400;
        color: rgb(15, 14, 14);
        // color: rgba(153, 153, 153, 1);
        // color: 000;
      }
    }
  }

  /*帮助*/
  .help {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: left; 
    // justify-content: center;

    .item {
      // margin: 0 30px;
      display: flex;
      .item-icon {
        margin-bottom: 3px;
        // width: 30px;
        // height: 30px;
        line-height: 30px;
        // background: rgba(179, 179, 179, 1);
        // border-radius: 50%;

        .iconfont {
          // font-weight: 600;
          font-size: 20px;
          color: rgb(15, 14, 14);
          // color:rgba(153, 153, 153, 1);
        }
      }
      .item-name {
        text-align: center;
        margin-left: 10px;
        font-size: 14px;
        line-height: 29px;
        font-weight: 400;
        color: rgb(15, 14, 14);
        // color: rgba(153, 153, 153, 1);
        // color: #000;
      }
    }
  }
}
</style>
