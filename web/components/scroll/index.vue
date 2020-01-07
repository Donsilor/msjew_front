<template>
  <div>
    <div v-if="btnFlag" class="to-top go-top" src="url" @click="backTop">
      <i class="iconfont iconhuidaodingbu"></i>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        btnFlag: true
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
      console.log(scroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      // 点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      }
    }
  }
</script>

<style>
  .to-top {
    position: absolute;
    bottom: 220px;
    right: 15px;
    z-index: 666;
    z-index: 9999;
    width: 50px;
    height: 50px;
    background-color: #a096b4;
    box-shadow: 4px 4px 0px 0px rgba(214, 180, 177, 0.5);
    border-radius: 6px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }

  .to-top .iconfont {
    color: #fff;
    font-size: 26px;
  }


</style>
