<template>
  <div ref="getScroll" class="akm" @scroll="showScroll">
    <detail-body
      :good-info="data"
      @addCart="addCart"
      @addWish="addWish"
      @removeWish="removeWish"
      @addCompared="addCompared"
      @removeCompared="removeCompared"
    ></detail-body>
    <div v-show="isHalf" class="scroll-to-top" @click="goTop()">
      <i class="iconfont iconzhiding"></i>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import DetailBody from './diamonds-body'
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
      data: {},
      lang: this.LANGUAGE.detailCommons,
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
      url: `/wap/goods/diamond/detail`,
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
        for (const i in infos.materials) {
          const o = {
            id: infos.materials[i].id,
            name: infos.materials[i].name,
            // image: app.$IMG_URL + infos.materials[i].configAttrImg
            image: infos.materials[i].image
          }
          mcArr.push(o)
        }
        const stArr = []
        for (const i in infos.sizes) {
          const o = {
            content: infos.sizes[i].name,
            sortType: infos.sizes[i].id,
            sortBy: infos.sizes[i].id
          }
          stArr.push(o)
        }
        stArr.unshift({
          content: lang.stArrContent,
          sortType: ``,
          sortBy: ``
        })
        
        infos.sizes = stArr
        infos.materials = mcArr
        infos.goodsDesc = infos.goodsDesc
        let gay = false
        let gayNum = ``
        infos.specs.forEach(item => {
          if (item.configId === 191) {
            gayNum = item.configAttrVal
          } else if (item.configId === 192 && item.configAttrId === 442) {
            gay = true
          }
        })
         
        infos.goodsGiaImage = gay
          ? `https://www.gia.edu/report-check?reportno=${gayNum}`
          : ``
        
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
          // facebook 添加购物车统计-start
          if(this.$store.state.platform == 30){
            console.log("facebook购物车数据统计")
            fbq('track', 'AddToCart');
          }
          // facebook 添加购物车统计-end
          
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
    addCompared(data = {}) {
      // this.$toast('点击了添加到购物车')
      // console.log(data)
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addCompared', data)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addComparedSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
          // this.$toast(`${this.lang.addCompareFail}：${err.message}`)
        })
    },
    removeCompared(data) {
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('removeCompared', data)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.removeComparedSuccess)
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
