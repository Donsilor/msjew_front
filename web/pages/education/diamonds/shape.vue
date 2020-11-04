<template>
  <layout>
    <div class="content">
      <div class="header-text">
        <h3 class="title">{{ $t(`${lang}.header`) }}</h3>
        <p class="font-describe">{{ $t(`${lang}.define`) }}</p>
      </div>
      <div class="diamond-shape">
        <h3 class="title-1">{{ $t(`${lang}.choose`) }}</h3>
      </div>
      <div class="list-photo">
        <ul>
          <li v-for="(item, index) in $t(`${lang}.list`)" :key="index">
            <p class="title">{{ item.tip }}</p>
            <div class="icon">
              <i class="icon-font iconfont" :class="item.src"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul class="list-describe">
          <li v-for="(item, index) in $t(`${lang}.show`)" :key="index">
            <div class="ring-pictures">
              <img :src="'/diamonds/shape/' + item.src + '.png'" alt />
            </div>
            <div class="ring-text">
              <h3 class="title-riang">{{ item.tip }}</h3>
              <p class="text-ring">{{ item.con }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/education/layout.vue'
const lang = 'education.diamonds.shape'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang
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
  }
  .diamond-shape {
    margin-top: 60px;
    width: 1035px;
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
  .list-photo {
    width: 1035px;
    height: 75px;
    margin: 50px auto;
    ul {
      height: 100%;
      display: flex;
      justify-content: space-around;
      li {
        height: 75px;
        .title {
          font-size: 14px;
          color: #999999;
          margin-bottom: 16px;
          text-align: center;
        }
        .icon {
          text-align: center;
          i {
            font-size: 37px;
          }
        }
      }
    }
  }
  .list {
    margin-left: 63px;
    .list-describe {
      width: 1035px;

      overflow: hidden;
      li {
        width: 1035px;
        height: 250px;
        // border: 1px solid #000;
        margin-bottom: 60px;
        .ring-pictures {
          float: left;
          width: 212px;
          height: 174px;
          img {
            width: 174px;
            height: 174px;
            margin: 0 auto;
          }
          .Picture {
            width: 212px;
            // height: 126px;
          }
        }
        .ring-text {
          width: 783px;
          height: 143px;
          float: right;
          text-align: left;
          color: #666666;
          .text-ring {
            font-size: 14px;
            line-height: 32px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
