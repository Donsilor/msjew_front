<template>
  <div class="content">
    <div class="header-text">
      <h3 class="title">{{ lang.header }}</h3>
      <p class="font-describe">{{ lang.define }}</p>
    </div>
    <div class="diamond-shape">
      <h3 class="title-1">{{ lang.choose }}</h3>
      <p class="font-describe-1">{{ lang.rate }}</p>
    </div>

    <div class="diamond-cleanliness">
      <div class="list-cleanliness">
        <ul class="tab-tilte">
          <li @click="cur=0" :class="{active:cur==0}">IDEAL</li>
          <li @click="cur=1" :class="{active:cur==1}">EX</li>
          <li @click="cur=2" :class="{active:cur==2}">VG</li>
          <li @click="cur=3" :class="{active:cur==3}">GD</li>
          <li @click="cur=4" :class="{active:cur==4}">FAIR</li>
        </ul>
        <div class="tab-content">
          <div v-show="cur==0">
            <img src="../../../../static/images/knowledge/xiajiantou.png" alt class="tiltes" />
            <div class="titie">
              <h3>IDEAL</h3>
              <p>{{ lang.tit1 }}</p>
            </div>
          </div>
          <div v-show="cur==1" class="put">
            <img src="../../../../static/images/knowledge/xiajiantou.png" alt class="tiltes-1" />
            <div class="titie">
              <h3>EX</h3>
              <p>{{ lang.tit2 }}</p>
            </div>
          </div>
          <div v-show="cur==2" class="put-2">
            <img src="../../../../static/images/knowledge/xiajiantou.png" alt class="tiltes-2" />
            <div class="titie">
              <h3>VG</h3>
              <p>{{ lang.tit3 }}</p>
            </div>
          </div>
          <div v-show="cur==3" class="put-3">
            <img src="../../../../static/images/knowledge/xiajiantou.png" alt class="tiltes-3" />
            <div class="titie">
              <h3>GD</h3>
              <p>{{ lang.tit4 }}</p>
            </div>
          </div>
          <div v-show="cur==4" class="put-4">
            <img src="../../../../static/images/knowledge/xiajiantou.png" alt class="tiltes-4" />
            <div class="titie">
              <h3>FAIR</h3>
              <p>{{ lang.tit5 }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="img-photo">
        <img v-show="cur==0" src="../../../../static/images/knowledge/IDEAL.png" alt />
        <img v-show="cur==1" src="../../../../static/images/knowledge/EX.png" alt />
        <img v-show="cur==2" src="../../../../static/images/knowledge/VG.png" alt />
        <img v-show="cur==3" src="../../../../static/images/knowledge/GD.png" alt />
        <img v-show="cur==4" src="../../../../static/images/knowledge/FAIR.png" alt />
      </div>
    </div>
    <div class="diamond-bottom">
      <h3>{{ lang.tips }}</h3>
      <p>{{ lang.tip1 }}</p>
      <p>{{ lang.tip2 }}</p>
      <p>{{ lang.tip3 }}</p>
      <p>{{ lang.tip4 }}</p>
      <p>{{ lang.tip5 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.diamondCut,
      visible: false,
      cur: 0 //默認選中第一個tab
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-family: "CTHeiTiSF";
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
  }
  .diamond-shape {
    margin-top: 60px;
    width: 1035px;
    height: 78px;
    font-size: 14px;
    line-height: 32px;
    text-align: left;
    margin-left: 63px;
    .title-1 {
      color: #666666;
    }
    .font-describe-1 {
      color: #999999;
    }
  }
  .diamond-cleanliness {
    width: 1035px;
    height: 420px;
    margin-top: 60px;
    margin-left: 63px;
    overflow: hidden;
    position: relative;
    .list-cleanliness {
      width: 680px;
      height: 396px;
      // border: 1px solid #ddb1aa;
      float: left;
      .tab-tilte {
        width: 191px;
        height: 396px;
        float: left;
        border: 1px solid #ddb1aa;
      }
      .tab-tilte li {
        width: 190px;
        height: 79px;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        border-bottom: 1px solid #ddb1aa;
        border-right: 1px solid #ddb1aa;
        line-height: 79px;
        color: #333333;
      }
      /* 點擊對應的標題添加對應的背景顏色 */
      .tab-tilte .active {
        background-color: #f7f7f7;
        color: #111111;
        .tilte-kuang {
          display: block;
          margin-top: -78px;
        }
      }
      .tab-content {
        width: 418px;
        height: 390px;
        float: right;
        // border: 1px solid #000;
        margin-right: 50px;
        .tiltes {
          background-color: #fff;
          position: absolute;
          top: 20px;
          left: 203px;
        }
        .titie {
          text-align: left;
          background: linear-gradient(90deg, #edc8d0, #e9acba);
          color: #fff;
          padding: 10px;
        }
      }
      .tab-content div {
        width: 418px;
      }
      .put {
        margin-top: 80px;
        .tiltes-1 {
          position: absolute;
          top: 102px;
          left: 203px;
        }
      }

      .put-2 {
        margin-top: 160px;
        .tiltes-2 {
          position: absolute;
          top: 183px;
          left: 203px;
        }
      }

      .put-3 {
        margin-top: 240px;
        .tiltes-3 {
          position: absolute;
          top: 262px;
          left: 203px;
        }
      }
      .put-4 {
        margin-top: 320px;
        .tiltes-4 {
          position: absolute;
          top: 342px;
          left: 203px;
        }
      }
    }
    .img-photo {
      width: 318px;
      height: 253px;
      float: right;
      img {
        width: 318px;
        height: 253px;
      }
    }
  }
  .diamond-bottom {
    background-color: #fbf8f3;
    margin: 60px;
    padding: 40px;
    text-align: left;
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
