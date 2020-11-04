<template>
  <layout>
    <div class="content">
      <div class="header-text">
        <h3 class="title">{{ $t(`${lang}.header`) }}</h3>
        <p class="font-describe">{{ $t(`${lang}.define`) }}</p>
      </div>

      <ul class="list-describe">
        <li>
          <div class="ring-pictures">
            <img src="/education/diamonds/list-photo.png" alt />
          </div>
          <div class="ring-text">
            <p class="text-ring">{{ $t(`${lang}.con1`) }}</p>
            <p class="text-ring">{{ $t(`${lang}.con2`) }}</p>
            <p class="text-ring">{{ $t(`${lang}.con3`) }}</p>
            <p class="text-ring">{{ $t(`${lang}.con4`) }}</p>
          </div>
        </li>
        <li>
          <div class="ring-pictures">
            <img src="/education/diamonds/lis.png" alt class="img-list" />
          </div>
          <div class="ring-text">
            <p class="text-ring">{{ $t(`${lang}.con5`) }}</p>
            <p class="text-ring">{{ $t(`${lang}.con6`) }}</p>
            <p class="text-ring">{{ $t(`${lang}.con7`) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/education/layout.vue'
const lang = 'education.diamonds.maintenance'
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
  border: 1px solid rgba(215, 215, 215, 1);
  .header-text {
    margin-bottom: 55px;
    .title {
      text-align: center;
      font-weight: normal;
      font-size: 24px;
      margin-top: 40px;
      color: #000;
    }
    .font-describe {
      width: 1035px;
      font-size: 14px;
      text-align: left;
      padding-left: 60px;
      font-weight: bold;
      margin-top: 38px;
      line-height: 32px;
      color: #666;
      margin-bottom: 27px;
    }
  }
  .list-describe {
    overflow: hidden;
    li {
      width: 1035px;
      margin-left: 60px;
      overflow: hidden;
      //   border: 1px solid #000;
      margin-bottom: 44px;
      .ring-pictures {
        float: left;
        width: 343px;
        height: 196px;
        margin: 10px 0;
        .img-list {
          width: 343px;
          height: 196px;
        }
      }
      .ring-text {
        width: 638px;
        // height: 207px;
        float: right;
        text-align: left;
        color: #999999;
        // border: 1px solid #000;
        .text-ring {
          font-size: 14px;
          line-height: 32px;
          padding: 0;
        }
      }
    }
  }
}
</style>
