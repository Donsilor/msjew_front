<template>
  <div class="knowledge-content">
    <div class="title">
      {{ $t(`${lang}.home`) }}&nbsp;>&nbsp;{{ $t(`${lang}.knowledge`) }}
    </div>
    <el-container>
      <div class="nav">
        <el-aside width="205px" class="el-aside-nav">
          <ul class="list-top">
            <li
              v-for="(item, index) in list"
              :key="index"
              class="list-put"
              @click="jump(item.to)"
            >
              <h2 @click="showToggle(index)">
                <i :class="item.icon"></i>
                {{ item.name }}
                <i
                  v-if="index == 0"
                  class="icon iconfont down"
                  v-html="isSubShow ? '&#xe663;' : '&#xe652;'"
                ></i>
              </h2>
              <ul v-show="isSubShow">
                <li
                  v-for="(subItem, subIndex) in item.subItems"
                  :key="subIndex"
                  :class="{ active: nowPath === subItem.to.path }"
                >
                  <h3 @click="jump(subItem.to)">
                    <span></span>
                    {{ subItem.name }}
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
const lang = 'education.layout'
export default {
  data() {
    return {
      lang,
      isSubShow: true,
      list: [
        {
          icon: 'iconfont iconicon-zuanshi iconfont-el ',
          name: this.$t(`${lang}.diamond`),
          subItems: [
            {
              name: this.$t(`${lang}.carat`),
              to: {
                path: '/education/diamonds/carat'
              }
            },
            {
              name: this.$t(`${lang}.cut`),
              to: {
                path: '/education/diamonds/cut'
              }
            },
            {
              name: this.$t(`${lang}.color`),
              to: {
                path: '/education/diamonds/color'
              }
            },
            {
              name: this.$t(`${lang}.clarity`),
              to: {
                path: '/education/diamonds/clarity'
              }
            },
            {
              name: this.$t(`${lang}.shapes`),
              to: {
                path: '/education/diamonds/shape'
              }
            },
            {
              name: this.$t(`${lang}.certification`),
              to: {
                path: '/education/diamonds/certification'
              }
            },
            {
              name: this.$t(`${lang}.maintenance`),
              to: {
                path: '/education/diamonds/maintenance'
              }
            }
          ]
        },
        {
          icon: 'iconfont iconJewelry-made-ring iconfont-el',
          name: this.$t(`${lang}.engagementRings`),
          to: {
            path: '/education/rings/engagement-ring'
          }
        },
        {
          icon: 'iconfont icontaojie iconfont-el',
          name: this.$t(`${lang}.weddingRings`),
          to: {
            path: '/education/rings/wedding-ring'
          }
        }
      ],
      nowPath: ''
    }
  },
  watch: {
    $route(val, oldVal) {
      this.nowPath = val.path
    }
  },
  created() {
    this.nowPath = this.$route.path
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    showToggle(index) {
      if (index === 0) {
        this.isSubShow = !this.isSubShow
      }
    },
    jump(to) {
      if (!to) {
        return
      }
      this.$router.push(to)
    }
  }
}
</script>

<style lang="less" scoped>
.knowledge-content {
  width: 1360px;
  margin: 0px auto 60px auto;
  .title {
    text-align: left;
    font-size: 12px;
    color: #000000;
    margin: 26px 0px;
  }
  .nav {
    .el-aside-nav {
      overflow: hidden;
      box-sizing: border-box;
      background-color: #fafaf9;
    }

    .list-content {
      width: 1140px;
      margin: 0;
      padding: 0;
      margin-left: 17px;
    }

    .el-menu {
      border: 0;
    }

    .list-top {
      margin-top: 38px;
    }

    ul {
      width: 200px;
      height: auto;
      li {
        cursor: pointer;
        color: #999;
        margin-top: 10px;
        font-style: normal;
        font-size: 12px;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
          'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
      .iconfont-el {
        margin-right: 15px;
        font-size: 20px;
        line-height: 20px;
        position: relative;
        vertical-align: middle;
      }
      .down {
        color: #999;
        float: right;
        margin-right: 21px;
        font-size: 10px;
      }
    }

    h3 {
      height: 30px;
      line-height: 30px;
      text-align: left;
      padding-left: 50px;
      font-weight: normal;
      margin-left: 5px;
      span {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        display: inline-block;
        background-color: #999;
        vertical-align: middle;
        margin: 0 6px;
      }
    }

    .active {
      color: #8b766c;
    }
  }
  .list-content {
    width: 1140px;
    margin: 0;
    padding: 0;
    margin-left: 17px;
  }
}

/*.el-menu {*/
/*  border: 0;*/
/*}*/

/*.list-top {*/
/*  margin-top: 57px;*/
/*}*/

/*ul {*/
/*  width: 200px;*/
/*  height: auto;*/
/*  li {*/
/*    color: #999;*/
/*    margin-top: 10px;*/
/*  }*/
/*}*/

/*h2 {*/
/*  color: #8b766c;*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*  font-size: 14px;*/
/*  font-weight: normal;*/
/*}*/

/*h3 {*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*}*/

/*.active {*/
/*  color: #8b766c;*/
/*}*/
</style>
