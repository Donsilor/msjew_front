<template>
  <div ref="getScroll" class="akm" @scroll="showScroll">
    <detail-body
      :good-info="data"
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
import DetailBody from './engagement-rings-body.vue'
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
      data: {},
      scrollTop: 0
    }
  },
  computed: {
    isHalf: function() {
      return this.scrollTop > 570
    }
  },
  asyncData({ app, $axios, route, store }) {
    const lang = app.$bddLanguage.detailCommons
    return $axios({
      method: `post`,
      url: `/wap/goods/goodsDetail`,
      headers: {
        token: store.state.token || ''
      },
      params: {
        goodsId: route.query.goodId
      }
    })
      .then(res => {
        const infos = res
        // let infos = null
        // if (process.server) {
        //   if (res.data.code === 200) {
        //     infos = res.data.data
        //   } else if (!res.data.code) {
        //     infos = res.data
        //   }
        // } else {
        //   infos = res
        // }
        if (!infos) return { data: {} }
        const mcArr = []
        for (const i in infos.materialsConfig) {
          const o = {
            id: infos.materialsConfig[i].configAttrId,
            name: infos.materialsConfig[i].configAttrIVal,
            image: app.$IMG_URL + infos.materialsConfig[i].configAttrImg
          }
          mcArr.push(o)
        }
        const stArr = []
        for (const i in infos.sizesConfig) {
          const o = {
            content: infos.sizesConfig[i].configAttrIVal,
            sortType: infos.sizesConfig[i].configAttrId,
            sortBy: infos.sizesConfig[i].configAttrId
          }
          stArr.push(o)
        }
        stArr.unshift({
          content: lang.stArrContent,
          sortType: ``,
          sortBy: ``
        })
        infos.sizesConfig = stArr
        infos.materialsConfig = mcArr
        infos.goodsDesc = infos.goodsDesc.includes(`<script>`)
          ? ''
          : infos.goodsDesc
        return { data: infos, seoInfo: app.$getDetailSeoInfo(infos) }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    showScroll(e) {
      // console.log(e)
      const scrollBox = e.target
      this.scrollTop = scrollBox.scrollTop
      // console.log(this.scrollTop)
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
          this.$toast(this.lang.addWishSuccess)
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
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    },
    goTop() {
      this.$refs.getScroll.scrollTop = 0
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
