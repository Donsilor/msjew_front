<template>
  <div class="navTop">
    <div class="navTopDiv">
      <ul>
        <li v-for="item in ads">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
export default {
  name: 'NavTop',
  data() {
    return {
      products: '',
      ads: []
    };
  },
  created() {
  },
  mounted() {
    // 11月1日凌晨--11月30日  23時59分
    const nowTime = Moment().format('X');
    const activityStartTime = Moment('2019-11-01 00:00').format('X');
    const activityEndTime = Moment('2019-12-01 00:00').format('X');

    const activityStart = (activityStartTime <= nowTime) && (nowTime <= activityEndTime);

    this.ads = activityStart ? this.$LANGUAGE.components.nav.doubleElevenActivity : this.$LANGUAGE.components.nav.top;
  },
  methods: {}

};
</script>

<style lang="less" scoped>
  .navTop {
    width: 100%;
    height: 30px;
    padding: 3px 0;
    background: #1b1b1b;
    position: fixed;
    z-index: 999;
    top: 0;
    color: red;

    .navTopDiv {
      width: 100%;
      height: 24px;
      background: #000000;

      ul {
        display: flex;
        justify-content: space-around;
        width: 1360px;
        height: 24px;
        margin: 0 auto;
        padding: 0 250px;

        li {
          cursor: pointer;
          color: #ffffff;
          margin: 0px;
          font-size: 12px;
          line-height: 24px;
          float: left;
        }
      }
    }
  }

</style>
