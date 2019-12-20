<template>
  <layout>
    <div class="content">
      <div class="header-text">
        <h3 class="title">{{ $t(`${lang}.header`) }}</h3>
        <p class="font-describe">{{ $t(`${lang}.define`) }}</p>
        <p class="font-describe-1">{{ $t(`${lang}.rate`) }}</p>
      </div>
      <div class="list">
        <ul class="list-describe">
          <li>
            <div class="ring-pictures">
              <img :src="Picture" alt class="Picture" />
            </div>
            <div class="ring-text">
              <h3 class="title-riang">{{ $t(`${lang}.tit1`) }}</h3>
              <p class="text-ring">{{ $t(`${lang}.remind`) }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="diamond-interval">
        <img src="/education/diamonds/bgc.png" alt class="img" />
        <ul class="tab-tilte">
          <li :class="{ active: cur == 0 }" @click="color(0)">
            D
            <div>
              <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
            </div>
          </li>
          <li :class="{ active: cur == 1 }" @click="color(1)">
            E
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>

          <li :class="{ active: cur == 2 }" @click="color(2)">
            F
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
          <li :class="{ active: cur == 3 }" @click="color(3)">
            G
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
          <li :class="{ active: cur == 4 }" @click="color(4)">
            H
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
          <li :class="{ active: cur == 5 }" @click="color(5)">
            I
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
          <li :class="{ active: cur == 6 }" @click="color(6)">
            J
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
          <li :class="{ active: cur == 7 }" @click="color(7)">
            K-Z
            <img src="/education/diamonds/xiabiao.png" alt class="tiltes" />
          </li>
        </ul>
        <div class="tab-content">
          <div v-show="cur == 0" class="tab-list">
            <div class="contion-title">
              <h3 class="font-title">D {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con1`) }}</p>
            </div>
          </div>
          <div v-show="cur == 1">
            <!--  -->
            <!-- <img src="" alt=""> -->
            <div class="contion-title">
              <h3 class="font-title">E {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con2`) }}</p>
            </div>
          </div>
          <div v-show="cur == 2">
            <div class="contion-title">
              <h3 class="font-title">F {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con3`) }}</p>
            </div>
          </div>
          <div v-show="cur == 3">
            <div class="contion-title">
              <h3 class="font-title">G {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con4`) }}</p>
            </div>
          </div>
          <div v-show="cur == 4">
            <div class="contion-title">
              <h3 class="font-title">H {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con5`) }}</p>
            </div>
          </div>
          <div v-show="cur == 5">
            <div class="contion-title">
              <h3 class="font-title">I {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con6`) }}</p>
            </div>
          </div>
          <div v-show="cur == 6">
            <div class="contion-title">
              <h3 class="font-title">J {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con7`) }}</p>
            </div>
          </div>
          <div v-show="cur == 7">
            <div class="contion-title">
              <h3 class="font-title">K-Z {{ $t(`${lang}.level`) }}</h3>
              <p>{{ $t(`${lang}.con8`) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="diamond-bottom">
        <h3>{{ $t(`${lang}.tips`) }}</h3>
        <p>{{ $t(`${lang}.tip1`) }}</p>
        <p>{{ $t(`${lang}.tip2`) }}</p>
        <p>{{ $t(`${lang}.tip3`) }}</p>
        <p>{{ $t(`${lang}.tip4`) }}</p>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/education/layout.vue'
const lang = 'education.diamonds.color'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang,
      visible: false,
      flag: false,
      cur: 0,
      Picture: '/education/diamonds/D.png'
    }
  },
  methods: {
    color(val) {
      this.cur = val
      this.init()
    },
    init() {
      switch (this.cur) {
        case 0:
          this.Picture = '/education/diamonds/D.png'
          break
        case 1:
          this.Picture = '/education/diamonds/E.png'
          break
        case 2:
          this.Picture = '/education/diamonds/F.png'
          break
        case 3:
          this.Picture = '/education/diamonds/G.png'
          break
        case 4:
          this.Picture = '/education/diamonds/H.png'
          break
        case 5:
          this.Picture = '/education/diamonds/I.png'
          break
        case 6:
          this.Picture = '/education/diamonds/J.png'
          break
        default:
          this.Picture = '/education/diamonds/K.png'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-family: 'CTHeiTiSF';
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
