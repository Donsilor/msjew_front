<template>
  <layout>
    <div class="content">
      <div class="header-text">
        <h3 class="title">{{ $t(`${lang}.header`) }}</h3>
        <p class="font-describe">{{ $t(`${lang}.define`) }}</p>
      </div>
      <ul class="list-describe">
        <li v-for="(item, index) in $t(`${lang}.list`)" :key="index">
          <div class="ring-pictures">
            <img :src="'/education/ring/' + item.src + '.png'" alt />
          </div>
          <div class="ring-text">
            <h3 class="title-riang">{{ item.tip }}</h3>
            <p class="text-ring">{{ item.con }}</p>
          </div>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/education/layout.vue'
const lang = 'education.rings.engagementRing'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang
    }
  },
  created() {
    const _this = this
    _this.$nextTick(() => {})
  }
}
</script>

<style lang="less" scoped>
.content {
  color: #666666;
  font-size: 14px;
  font-family: 'CTHeiTiSF';
  border: 1px solid rgba(215, 215, 215, 1);
  .header-text {
    margin-bottom: 34px;
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
      padding-left: 40px;
      margin-top: 47px;
      line-height: 32px;
    }
  }
  .list-describe {
    overflow: hidden;
    li {
      width: 1035px;
      margin-bottom: 24px;
      margin-left: 30px;
      overflow: auto;
      .ring-pictures {
        float: left;
        width: 212px;
        margin: 6px 0;
      }
      .ring-text {
        width: 783px;
        line-height: 32px;
        float: right;
        color: #666666;
        padding-top: 20px;
        text-align: left;
        .text-ring {
          color: #999999;
          font-size: 14px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
