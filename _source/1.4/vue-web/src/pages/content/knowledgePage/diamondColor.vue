<template>
  <div class="content">
    <div class="header-text">
      <h3 class="title">{{ lang.header }}</h3>
      <p class="font-describe">{{ lang.define }}</p>
      <p class="font-describe-1">{{ lang.rate }}</p>
    </div>
    <div class="list">
      <ul class="list-describe">
        <li>
          <div class="ring-pictures">
            <img :src="Picture" alt class="Picture" />
          </div>
          <div class="ring-text">
            <h3 class="title-riang">{{ lang.tit1 }}</h3>
            <p class="text-ring">{{ lang.remind }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="diamond-interval">
      <img src="../../../../static/images/knowledge/bgc.png" alt class="img" />
      <ul class="tab-tilte">
        <li @click="color(0)" :class="{active:cur==0}">
          D
          <!-- <i class="tiltes">5</i> -->
          <div>
            <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
          </div>
        </li>
        <li @click="color(1)" :class="{active:cur==1}">
          E
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>

        <li @click="color(2)" :class="{active:cur==2}">
          F
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="color(3)" :class="{active:cur==3}">
          G
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="color(4)" :class="{active:cur==4}">
          H
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="color(5)" :class="{active:cur==5}">
          I
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="color(6)" :class="{active:cur==6}">
          J
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="color(7)" :class="{active:cur==7}">
          K-Z
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-list" v-show="cur==0">
          <div class="contion-title">
            <h3 class="font-title">D {{ lang.level }}</h3>
            <p>{{ lang.con1 }}</p>
          </div>
        </div>
        <div v-show="cur==1">
          <!--  -->
          <!-- <img src="" alt=""> -->
          <div class="contion-title">
            <h3 class="font-title">E {{ lang.level }}</h3>
            <p>{{ lang.con2 }}</p>
          </div>
        </div>
        <div v-show="cur==2">
          <div class="contion-title">
            <h3 class="font-title">F {{ lang.level }}</h3>
            <p>{{ lang.con3 }}</p>
          </div>
        </div>
        <div v-show="cur==3">
          <div class="contion-title">
            <h3 class="font-title">G {{ lang.level }}</h3>
            <p>{{ lang.con4 }}</p>
          </div>
        </div>
        <div v-show="cur==4">
          <div class="contion-title">
            <h3 class="font-title">H {{ lang.level }}</h3>
            <p>{{ lang.con5 }}</p>
          </div>
        </div>
        <div v-show="cur==5">
          <div class="contion-title">
            <h3 class="font-title">I {{ lang.level }}</h3>
            <p>{{ lang.con6 }}</p>
          </div>
        </div>
        <div v-show="cur==6">
          <div class="contion-title">
            <h3 class="font-title">J {{ lang.level }}</h3>
            <p>{{ lang.con7 }}</p>
          </div>
        </div>
        <div v-show="cur==7">
          <div class="contion-title">
            <h3 class="font-title">K-Z {{ lang.level }}</h3>
            <p>{{ lang.con8 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="diamond-bottom">
      <h3>{{ lang.tips }}</h3>
      <p>{{ lang.tip1 }}</p>
      <p>{{ lang.tip2 }}</p>
      <p>{{ lang.tip3 }}</p>
      <p>{{ lang.tip4 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.diamondColor,
      visible: false,
      flag: false,
      cur: 0,
      Picture: require("../../../../static/images/knowledge/D.png")
    };
  },
  methods: {
    color(val) {
      this.cur = val;
      this.init();
    },
    init() {
      switch (this.cur) {
        case 0:
          this.Picture = require("../../../../static/images/knowledge/D.png");
          break;
        case 1:
          this.Picture = require("../../../../static/images/knowledge/E.png");
          break;
        case 2:
          this.Picture = require("../../../../static/images/knowledge/F.png");
          break;
        case 3:
          this.Picture = require("../../../../static/images/knowledge/G.png");
          break;
        case 4:
          this.Picture = require("../../../../static/images/knowledge/H.png");
          break;
        case 5:
          this.Picture = require("../../../../static/images/knowledge/I.png");
          break;
        case 6:
          this.Picture = require("../../../../static/images/knowledge/J.png");
          break;
        default:
          this.Picture = require("../../../../static/images/knowledge/K.png");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-family: "CTHeiTiSF";
  //   height: 1290px;
  border: 1px solid rgba(215, 215, 215, 1);
  .header-text {
    margin-bottom: 55px;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      margin-top: 33px;
      color: #000;
    }
    .font-describe {
      width: 1035px;
      font-size: 14px;
      color: #999999;
      text-align: left;
      padding-left: 63px;
      margin-top: 39px;
      line-height: 32px;
    }
    .font-describe-1 {
      width: 1035px;
      font-size: 14px;
      color: #999999;
      text-align: left;
      padding-left: 63px;
      margin-top: 19px;
      line-height: 32px;
    }
  }
  .list {
    margin-left: 63px;
    margin-bottom: 30px;
    .list-describe {
      width: 1035px;
      overflow: hidden;
      li {
        width: 1035px;
        height: 174px;
        .ring-pictures {
          float: left;
          width: 212px;
          height: 126px;
          .Picture {
            width: 212px;
          }
        }
        .ring-text {
          width: 783px;
          height: 143px;
          float: right;
          text-align: left;
          color: #666666;
          line-height: 32px;
          .text-ring {
            font-size: 14px;
            line-height: 32px;
            color: #999999;
          }
        }
      }
    }
  }
  .diamond-interval {
    width: 1035px;
    height: 140px;
    margin-left: 60px;
    // border: 1px solid #000;
    margin-top: 60px;
    position: relative;
    .img {
      display: block;
    }
    .tab-tilte {
      width: 1035px;
      position: absolute;
      top: 0;
      left: 0;
      .jiantou {
        width: 50px;
        height: 50px;
        border: 1px solid #000;
      }
    }
    .tab-tilte li {
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      margin-left: 90px;
      font-size: 12px;
      cursor: pointer;
      .tiltes {
        text-align: center;
        display: none;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
    /* 點擊對應的標題添加對應的背景顏色 */
    .tab-tilte .active {
      background-color: #d7889b;
      color: #fff;
      .tiltes {
        display: block;
      }
    }
    .tab-content .contion-title {
      float: left;
      width: 1016px;
      min-height: 107px;
      text-align: left;
      margin-top: 20px;
      padding: 20px;
      background: linear-gradient(
        90deg,
        rgba(237, 200, 208, 1),
        rgba(233, 172, 186, 1)
      );
    }
    .contion-title {
      font-size: 14px;
      color: #ffffff;
    }
    .font-title {
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
    }
  }
  .diamond-bottom {
    background-color: #fbf8f3;
    margin: 60px;
    text-align: left;
    padding: 40px;
    font-size: 14px;
    h3 {
      font-weight: normal;
      color: #333333;
      line-height: 34px;
    }
    p {
      line-height: 34px;
      color: #999999;
    }
  }
}
</style>
