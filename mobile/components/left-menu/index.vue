<template>
  <div :class="['left-menu', { active: active }]" @touchmove.stop.prevent="">
    <div class="bg" @click="hide"></div>
    <div class="menu">
      <div class="top">
        <div class="site-info" @click="toSiteSwitch">
          <div class="flag">
            <img src="/hongkong-round.png" />
          </div>
          <div class="language">
            <span>繁/EN</span>
          </div>
          <span class="gap-line"></span>
          <div class="coin">
            {{ coinInfo.content }}
          </div>
        </div>
        <div class="icon" @click="hide">
          <i class="iconfont iconcebianlan"></i>
        </div>
      </div>
      <div class="content">
        <div class="search">
          <button class="search-btn" @click="toPage('search')">
            <i class="iconfont iconicon-sousuo btn-icon"></i>
            <span class="btn-message">{{ lang.search }}</span>
          </button>
        </div>
        <div class="groups">
          <section v-for="(group, n) in groups" :key="n" class="group">
            <div
              v-for="(item, m) in group"
              :key="m"
              :class="[
                'item',
                { stress: item.stress, 'small-gap': group.length === 1 }
              ]"
              @click="toPage(item.routerName, item.query)"
            >
              {{ item.name }}
            </div>
          </section>
        </div>
      </div>
      <div class="bottom">
        <div class="call-us">{{ lang.callus }}</div>
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
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.leftMenu,
      active: false,
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
      ]
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
  methods: {
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
}
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
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
  justify-content: flex-end;
}
.top .icon {
  flex-grow: 1;
  flex-shrink: 1;
  color: #f29b87;
  text-align: right;
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
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;
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
  margin-bottom: 25px;
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

  .call-us {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-bottom: 20px;
  }

  /*帮助*/
  .help {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .item {
      margin: 0 30px;

      .item-icon {
        margin-bottom: 3px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background: rgba(179, 179, 179, 1);
        border-radius: 50%;

        .iconfont {
          font-size: 18px;
          color: #ffffff;
        }
      }
      .item-name {
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>
