<template>
  <div ref="getScroll" class="akm" @scroll="showScroll">
    <detail-body
      :good-info="pair"
      :average-scores="averageScores"
      @addCart="addCart"
      @addWish="addWish"
      @removeWish="removeWish"
    ></detail-body>
    <div v-show="isHalf" class="scroll-to-top" @click="goTop()">
      <i class="iconfont iconzhiding"></i>
    </div>
  </div>
</template>

<script>
import DetailBody from './pair-ring-detail-body.vue'
export default {
  layout: `no-footer-bar`,
  head() {
    return this.seoInfo || {}
  },
  components: {
    DetailBody
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      pair: {},
      averageScores: 0,
      scrollTop: 0
    }
  },
  computed: {
    isHalf: function() {
      return this.scrollTop > 570
    }
  },
  asyncData({ $axios, route, store, app }) {
    const request = $axios({
      method: `post`,
      url: `/wap/goods/ringsDetail`,
      headers: {
        token: store.state.token || ''
      },
      params: {
        ringId: route.query.ringId
      }
    })
      .then(res => {
        const pair = res
        // console.log('infos==========>', res)
        // let pair = null
        // if (process.server) {
        //   if (res.data.code === 200) {
        //     pair = res.data.data
        //   } else if (!res.data.code) {
        //     pair = res.data
        //   }
        // } else {
        //   pair = res
        // }
        return { pair: pair, seoInfo: app.$getDetailSeoInfo(pair) }
      })
      .catch(err => {
        return Promise.reject(err)
      })

    return request
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      const options = {
        params: { groupId: _this.$route.query.ringId }
      }
      _this.$store
        .dispatch('getGoodAvgLevel', options)
        .then(data => {
          console.log(data)
          _this.averageScores = data.hasOwnProperty('avgLevel')
            ? data.avgLevel.toString()
            : '5.0'
        })
        .catch(err => {
          console.error(err)
        })
    })
  },
  methods: {
    showScroll(e) {
      // console.log(e)
      const scrollBox = e.target
      this.scrollTop = scrollBox.scrollTop
      // console.log(this.scrollTop)
    },
    goTop() {
      this.$refs.getScroll.scrollTop = 0
    },
    addCart(data = {}) {
      // this.$toast('点击了添加到购物车')
      // console.log(data)
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addCart', data)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addCartSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    },
    addWish(data = {}) {
      // this.$toast('点击了添加到购物车')
      // console.log(data)
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addWish', data)
        .then(data => {
          this.$nuxt.$loading.finish()
          const pair = JSON.parse(JSON.stringify(this.pair))
          this.$toast(this.lang.addWishSuccess)
          pair.colletion = 1
          this.pair = pair
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    },
    removeWish(data) {
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('removeWish', data)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.removeWishSuccess)
          const pair = JSON.parse(JSON.stringify(this.pair))
          pair.colletion = 0
          this.pair = pair
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    }
  }
}
</script>

<style scoped lang="less">
.akm {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .scroll-to-top {
    position: fixed;
    bottom: 152px;
    right: 17px;
    z-index: 8;
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    .iconzhiding {
      display: block;
      width: 44px;
      height: 44px;
      line-height: 44px;
      color: white;
      font-size: 22px;
    }
  }
}
.engagementRings-component {
  .details-component(100%);
}
</style>
