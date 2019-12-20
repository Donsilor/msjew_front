<template>
  <div class="questions-content">
    <div class="title">
      {{ $t(`${lang}.homepage`) }}&nbsp;>&nbsp;{{
        $t(`${lang}.QAndA`)
      }}&nbsp;>&nbsp;{{ list[parentNum].subItems[num].name }}
    </div>
    <el-container>
      <div class="nav">
        <el-aside width="205px" class="el-aside-nav">
          <ul class="list-top">
            <li v-for="(item, index) in list" :key="index" class="list-put">
              <h2 @click="showToggle(item)">
                <i class="icon iconfont">&#xe66d;</i>
                {{ item.name }}
                <i
                  class="icon iconfont down"
                  v-html="item.isSubShow ? '&#xe663;' : '&#xe652;'"
                ></i>
              </h2>
              <ul v-show="item.isSubShow">
                <li
                  v-for="(subItem, sindex) in item.subItems"
                  :key="sindex"
                  :class="{ active: index == parentNum && sindex == num }"
                >
                  <h3 @click="Jump(subItem.to, index, sindex)">
                    <span v-if="index > 0"></span>
                    <i v-if="index == 0 && sindex == 0" class="icon iconfont"
                      >&#xe641;</i
                    >
                    <i v-if="index == 0 && sindex == 1" class="icon iconfont"
                      >&#xe66a;</i
                    >
                    <i v-if="index == 0 && sindex == 2" class="icon iconfont"
                      >&#xe66e;</i
                    >
                    <em>{{ subItem.name }}</em>
                  </h3>
                </li>
              </ul>
            </li>
          </ul>
        </el-aside>
      </div>
      <el-main class="list-content">
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const lang = 'policies.layout'
export default {
  data() {
    return {
      lang,
      parentNum: 0,
      num: 0,
      list: [
        {
          name: this.$t(`${lang}.BDDService`),
          isSubShow: true,
          subItems: [
            {
              name: this.$t(`${lang}.workTime`),
              to: {
                path: '/contact-us'
              }
            },
            {
              name: this.$t(`${lang}.workTel`),
              to: {
                path: '/contact-us'
              }
            },
            {
              name: this.$t(`${lang}.workEmail`),
              to: {
                path: '/contact-us'
              }
            }
          ]
        },
        {
          name: this.$t(`${lang}.chooseBDD`),
          isSubShow: true,
          subItems: [
            {
              name: this.$t(`${lang}.qualityAndValue`),
              to: {
                path: '/policies/quality-value'
              }
            },
            {
              name: this.$t(`${lang}.returnAndRefundPolicy`),
              to: {
                path: '/policies/return-refund-policy'
              }
            },
            {
              name: this.$t(`${lang}.findYourRingSize`),
              to: {
                path: '/education/rings/size'
              }
            }
          ]
        },
        {
          name: this.$t(`${lang}.aboutBDD`),
          isSubShow: true,
          subItems: [
            // {
            //   name: this.$t(`${lang}.BDDBrandStory`),
            //   to: {
            //     path: '/brand-story'
            //   }
            // },
            {
              name: this.$t(`${lang}.diamondKnowledge`),
              to: {
                path: '/education/diamonds/carat'
              }
            },
            {
              name: this.$t(`${lang}.paymentMethods`),
              to: {
                path: '/policies/payment-methods'
              }
            }
          ]
        },
        {
          name: this.$t(`${lang}.BDDPolicy`),
          isSubShow: true,
          subItems: [
            {
              name: this.$t(`${lang}.freeShippingService`),
              to: {
                path: '/policies/free-shipping'
              }
            },
            {
              name: this.$t(`${lang}.deliveryPolicy`),
              to: {
                path: '/policies/shipping'
              }
            },
            {
              name: this.$t(`${lang}.internationalPolicy`),
              to: {
                path: '/policies/international'
              }
            },
            {
              name: this.$t(`${lang}.privacyPolicy`),
              to: {
                path: '/policies/privacy-policy'
              }
            },
            {
              name: this.$t(`${lang}.termsAndConditions`),
              to: {
                path: '/policies/terms-and-conditions'
              }
            }
          ]
        }
      ]
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.curPath = '/' + val.path
        for (let j = 0; j < this.list.length; j++) {
          for (let i = 0, len = this.list[j].subItems.length; i < len; i++) {
            if (this.list[j].subItems[i].to.path === this.curPath) {
              this.num = i
              this.parentNum = j
            }
          }
        }
      }
    }
  },
  created() {
    this.curPath = this.$router.history.current.path
    for (let j = 0; j < this.list.length; j++) {
      for (let i = 0, len = this.list[j].subItems.length; i < len; i++) {
        if (this.list[j].subItems[i].to.path === this.curPath) {
          this.num = i
          this.parentNum = j
        }
      }
    }
  },
  methods: {
    showToggle(item) {
      item.isSubShow = !item.isSubShow
    },
    tab(index) {
      this.num = index
    },
    Jump(to, index, sindex) {
      this.num = sindex
      this.parentNum = index
      this.$router.push(to)
    }
  }
}
</script>

<style lang="less" scoped>
.questions-content {
  width: 1360px;
  margin: 0px auto 60px auto;
  .title {
    text-align: left;
    font-size: 12px;
    color: #000000;
    margin-top: 26px;
    margin-bottom: 26px;
  }
  .list-content {
    width: 1140px;
    margin: 0;
    padding: 0;
    margin-left: 17px;
  }
  .el-aside-nav {
    /*height: 750px;*/
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fafaf9;

    .nav {
      position: relative;
    }
    .title {
      position: absolute;
      top: -50px;
      width: 500px;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      text-align: left;
    }

    .el-menu {
      border: 0;
    }

    .list-top {
      margin-top: 25px;
    }

    ul {
      width: 200px;
      margin-bottom: 15px;
      height: auto;
      li {
        cursor: pointer;
        color: #999;
        margin-top: 10px;
      }
    }

    h2 {
      color: #8b766c;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: normal;
      text-align: left;
      padding-left: 21px;
      i {
        &:first-child {
          margin-right: 18px;
          font-size: 18px;
          line-height: 18px;
          position: relative;
          top: -2px;
          vertical-align: middle;
        }
        &:last-child {
          color: #999;
          float: right;
          margin-right: 21px;
          font-size: 10px;
          margin-top: 2px;
        }
      }
    }

    h3 {
      line-height: 30px;
      text-align: left;
      font-weight: normal;
      margin-left: 44px;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      &:hover {
        color: #8b766c;
      }
      span {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: #999;
        margin-right: 6px;
        position: relative;
        top: -3px;
      }
      i {
        font-size: 18px;
        position: relative;
        top: 2px;
        left: -5px;
      }
      em {
        font-style: normal;
        font-size: 12px;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
          'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      }
    }

    .active {
      color: #8b766c;
    }
  }
}
</style>
