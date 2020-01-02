<template>
  <div class="content">
    <div class="header-text">
      <h3 class="title">{{ lang.header }}</h3>
      <p class="font-describe">{{ lang.define }}</p>
    </div>
    <div class="list">
      <ul class="list-describe">
        <li>
          <div class="ring-pictures">
            <img src="../../../../static/images/knowledge/hand.png" alt class="Picture" />
            <img
              ref="diamondCut"
              src="../../../../static/images/knowledge/diamond-cut.png"
              alt
              class="Picture Picture2"
            />
          </div>
          <div class="ring-text">
            <h3 class="title-riang">{{ lang.choose }}</h3>
            <p class="text-ring">{{ lang.important }}</p>
            <p class="text-ring">{{ lang.rate }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="diamond-interval">
      <img src="../../../../static/images/knowledge/bgc.png" alt class="img" />
      <ul class="tab-tilte">
        <li @click="cut(0)" :class="{active:cur==0}">
          0.3ct
          <div>
            <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
          </div>
        </li>
        <li @click="cut(1)" :class="{active:cur==1}">
          0.5ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>

        <li @click="cut(2)" :class="{active:cur==2}">
          0.7ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="cut(3)" :class="{active:cur==3}">
          1ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="cut(4)" :class="{active:cur==4}">
          1.5ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="cut(5)" :class="{active:cur==5}">
          2ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="cut(6)" :class="{active:cur==6}">
          3ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
        <li @click="cut(7)" :class="{active:cur==7}">
          5ct
          <img src="../../../../static/images/knowledge/xiabiao.png" alt class="tiltes" />
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-list">
          <div class="contion-title">
            <h3 v-show="cur==0" class="font-title">{{ lang.tip1 }}</h3>
            <h3 v-show="cur==1" class="font-title">{{ lang.tip2 }}</h3>
            <h3 v-show="cur==2" class="font-title">{{ lang.tip3 }}</h3>
            <h3 v-show="cur==3" class="font-title">{{ lang.tip4 }}</h3>
            <h3 v-show="cur==4" class="font-title">{{ lang.tip5 }}</h3>
            <h3 v-show="cur==5" class="font-title">{{ lang.tip6 }}</h3>
            <h3 v-show="cur==6" class="font-title">{{ lang.tip7 }}</h3>
            <h3 v-show="cur==7" class="font-title">{{ lang.tip8 }}</h3>
            <p>{{ lang.remind }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="diamond-show">
      <div class="show">
        <ul>
          <li v-for="(item,index) in lang.list" :key="index">
            <img :src="'../../../../static/images/diamond/' + item.src + '.png'" alt />
            <em>{{ item.con }}</em>
          </li>
        </ul>
      </div>
      <div class="tips">
        <dl>
          <dt>{{ lang.tip }}</dt>
          <dd>
            <p>{{ lang.tips }}</p>
            <p>{{ lang.tips1 }}</p>
          </dd>
          <dd>
            <p>{{ lang.tips2 }}</p>
          </dd>
          <dd>
            <p>{{ lang.tips3 }}</p>
          </dd>
          <dd>
            <p>{{ lang.tips4 }}</p>
          </dd>
        </dl>
      </div>
      <div class="imgs">
        <img src="../../../../static/images/knowledge/diamond-carat.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.diamondCarat,
      visible: false,
      flag: false,
      cur: 3
    };
  },
  methods: {
    cut(val) {
      this.cur = val;
      this.$refs.diamondCut.style.width = 8 + val * 2 + "px";
      this.$refs.diamondCut.style.height = 8 + val * 2 + "px";
      this.$refs.diamondCut.style.top = 123 - val + "px";
      this.$refs.diamondCut.style.left = 60 - val + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-family: "CTHeiTiSF";
  border: 1px solid rgba(215, 215, 215, 1);
  position: relative;
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
        height: 200px;
        .ring-pictures {
          position: relative;
          float: left;
          width: 212px;
          height: 300px;
          .Picture {
            width: 200px;
            height: 300px;
          }
          .Picture2 {
            position: absolute;
            width: 14px;
            height: 14px;
            top: 120px;
            left: 57px;
          }
        }
        .ring-text {
          width: 783px;
          height: 143px;
          float: right;
          text-align: left;
          color: #666666;
          line-height: 32px;
          margin-top: 50px;
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
    margin-left: 63px;
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
      width: 1020px;
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
      padding-left: 10px;
    }
    .font-title {
      font-weight: normal;
      margin-bottom: 10px;
    }
  }
  .list-therr {
    width: 1018px;
    height: 200px;
    // background-color: red;
    position: absolute;
    top: 8px;
    left: 0;
    overflow: hidden;
    li {
      width: 35px;
      height: 20px;
      // border: 1px solid #000;
      float: left;
      margin-left: 80px;
      font-size: 14px;
      color: #666666;
    }
  }
  .diamond-show {
    width: 1024px;
    margin: 60px 0 40px 60px;
    overflow: hidden;
    .show {
      width: 512px;
      float: left;
      ul {
        overflow: hidden;
        li {
          width: 256px;
          padding: 10px;
          float: left;
          display: flex;
          justify-content: flex-start;
          img {
            width: 100px;
            height: 100px;
            margin-right: 25px;
          }
          em {
            line-height: 100px;
            font-size: 16px;
          }
        }
      }
    }
    .tips {
      line-height: 35px;
      padding: 10px 0;
      text-align: left;
      font-size: 16px;
      dt {
        color: #ddb1aa;
      }
      dd {
        margin: 30px 0;
        color: #666;
      }
    }
    .imgs {
      img {
        width: 984px;
        margin: 20px;
      }
    }
  }
}
</style>