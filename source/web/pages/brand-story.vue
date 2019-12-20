<template>
  <div class="brand-story">
    <div class="title">{{ $t(`${lang}.header`) }}</div>
    <div class="desc">{{ $t(`${lang}.found`) }}</div>
    <div class="first">
      <div class="left">
        <div></div>
        <img src="/brandStory/first.png" />
      </div>
      <div class="right">
        {{ $t(`${lang}.prove`) }}
        <br />
        {{ $t(`${lang}.with`) }}
        <br />
        {{ $t(`${lang}.moment`) }}
        <br />
      </div>
    </div>
    <div class="second">
      <div class="left">
        {{ $t(`${lang}.diffent`) }}
        <br />
        {{ $t(`${lang}.choose`) }}
        <br />
        {{ $t(`${lang}.understand`) }}
        <br />
        {{ $t(`${lang}.right`) }}
      </div>
      <div class="right">
        <img src="/brandStory/second.png" />
      </div>
    </div>
    <div class="third">
      <div class="left">
        <img src="/brandStory/third.png" />
      </div>
      <div class="right">
        {{ $t(`${lang}.dream`) }}
        <br />
        {{ $t(`${lang}.summary`) }}
        <br />
        {{ $t(`${lang}.slogan`) }}
      </div>
    </div>
    <div class="title">BDD的4大優勢</div>
    <ul class="advantage">
      <li v-for="(item, index) in $t(`${lang}.show`)" :key="index">
        <img :src="'/brandStory/' + item.src + '.png'" alt />
        <div>{{ item.tip }}</div>
        <div>{{ item.con }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const lang = 'brandStory'
export default {
  data() {
    return {
      lang
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.brand-story {
  text-align: center;
  width: 1360px;
  margin: 0 auto;
  .third {
    overflow: auto;
    height: 498px;
    position: relative;
    margin-left: 62px;
    .left {
      div {
        height: 327px;
        width: 272px;
        background: white;
      }
      img {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 1;
        height: 422px;
        width: 426px;
      }
    }
    .right {
      float: right;
      width: 600px;
      margin: 150px 50px;
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
    }
  }
  .second {
    margin-left: 61px;
    height: 400px;
    margin-right: 61px;
    position: relative;
    overflow: auto;
    .right {
      div {
        height: 300px;
        width: 272px;
        background: white;
      }
      img {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 1;
        width: 600px;
        height: 300px;
      }
    }
    .left {
      width: 616px;
      float: left;
      margin-top: 97px;
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
      padding-left: 17px;
    }
  }
  .first {
    height: 540px;
    overflow: auto;
    .left {
      margin-left: 62px;
      margin-top: 58px;
      position: relative;
      div {
        background: white;
        height: 343px;
        width: 272px;
      }
      img {
        position: absolute;
        height: 400px;
        width: 500px;
        top: 20px;
        left: 20px;
        z-index: 1;
      }
    }
    .right {
      float: left;
      margin-left: 344px;
      width: 416px;
      margin-top: 151px;
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
    }
  }
  .advantage {
    padding-left: 61px;
    padding-right: 61px;
    margin-top: 39px;
    overflow: auto;
    padding-bottom: 60px;
    li {
      float: left;
      width: 250px;
      height: 290px;
      text-align: left;
      margin-right: 79px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
      &:nth-child(4) {
        margin-right: 0px;
      }
      img {
        height: 160px;
        width: 100%;
        display: block;
        margin-bottom: 20px;
      }
      div {
        margin-left: 24px;
        &:nth-child(2) {
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
        }
        &:nth-child(3) {
          margin-top: 15px;
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }
  .nav-title {
    margin-top: 27px;
    color: #000000;
    font-size: 14px;
    text-align: left;
  }
  .title {
    margin-top: 23px;
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
  }
  .desc {
    margin-left: 63px;
    margin-right: 63px;
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    text-align: left;
    line-height: 36px;
    margin-top: 39px;
  }
}
</style>
