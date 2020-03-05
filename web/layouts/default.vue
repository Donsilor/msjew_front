<template>
  <div ref="layout-box" :class="['layout-box', language]" @scroll="layoutScroll">
    <div class="layout-header">
      <top-bar ref="top-bar"></top-bar>
    </div>
    <div class="layout-page-content">
      <nuxt />
    </div>
    <div class="layout-footer">
      <footer-bar></footer-bar>
    </div>

    <div>
      <scroll v-if="btnFlag" @goToTop = "goTo()"></scroll>
    </div>
  </div>
</template>

<script>
  import Mixin from './mixins'
  export default {
    mixins: [Mixin],
    // provide () {
    //   return {
    //     reload: this.reload,
      
    //   }
    // },
    data() {
      return {
        scrollTop: 0,
        btnFlag: false,
        // isRouterAlive: true
      }
    },
    mounted() {
      const _this = this
      _this.$nextTick(() => {
        // _this.getSetting()
        console.log(10)
        if (!_this.$store.state.coin || !_this.$store.state.language) {}
      })
    },
    methods: {
      // reload () {
      //   this.isRouterAlive = false
      //   this.$nextTick(function () {
        
      //     this.isRouterAlive = true
      //   })
      // },
      goTo(){
        const topB = document.getElementsByClassName('layout-box')[0];

        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          topB.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 22)
      },

      layoutScroll(e) {
        const topBar = this.$refs['top-bar']
        if (e.target.scrollTop > 0) {
          topBar.fixed(true)
        } else {
          topBar.fixed(false)
        }

        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏

        const that = this
        let scrollTop = e.target.scrollTop;
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

<style lang="less" scoped>
  .layout-box {
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    .layout-header {
      flex-shrink: 0;
      flex-grow: 0;
    }

    .layout-page-content {
      flex-grow: 1;
      flex-shrink: 0;
    }

    .layout-footer {
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
</style>
<style>
.el-message{
    top:250px!important;  
}
</style>