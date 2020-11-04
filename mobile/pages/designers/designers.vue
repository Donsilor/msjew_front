<template>
  <div ref="getScroll" class="akm" @scroll="showScroll">
    <DetailBodyPair
      v-if="this.$route.query.ringType == 'pair'"
      :good-info="pair"
      :average-scores="averageScores"
      @addCart="addCart"
      @addWish="addWish"
      @removeWish="removeWish"
    ></DetailBodyPair>
    <DetailBodySingle
      v-else-if="this.$route.query.ringType == 'single'"
      :good-info="data"
      @addCart="addCart"
      @addWish="addWish"
      @removeWish="removeWish"
    ></DetailBodySingle>
    <DetailBodyJew
      v-else
      :good-info="data"
      @addCart="addCart"
      @addWish="addWish"
      @removeWish="removeWish"
    ></DetailBodyJew>
    <div v-show="isHalf" class="scroll-to-top" @click="goTop()">
      <i class="iconfont iconzhiding"></i>
    </div>
  </div>
</template>

<script>
import DetailBodySingle from './designers-body-single.vue'
import DetailBodyPair from './designers-body-pair.vue'
import DetailBodyJew from './designers-body-jewelry.vue'
import detail from '../../mixins/detail'

export default {
  layout: `no-footer-bar`,
  head() {
    return this.seoInfo || {}
  },
  components: {
    DetailBodySingle,
    DetailBodyPair,
    DetailBodyJew
  },
  mixins: [detail],
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      data: {},
      scrollTop: 0,
      pair: {},
      averageScores: 0
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
      url: `/wap/goods/style/detail`,
      headers: {
        token: store.state.token || ''
      },
      params: {
        goodsId: route.query.goodId || ''
      }
    })
      .then(res => {
        console.log("res",res)
        if(res.categoryId == 2){
          const Spec = res.specs
          let colors = []
          let colorSpec = ''
          let colorId = ''
          let configId = ''
          if(Spec){
            Spec.forEach(item => {
              if (item.configId === '63') {
                colorSpec = item.configAttrVal
                colorId = item.configAttrId
                configId = item.configId
              }
              if((colorId && colorSpec)!== ""){
                let ids = colorId.split("|")
                let specs = colorSpec.split("|")
                if((ids && specs) !== ''){
                  colors = ids.map((id,i) => ({
                    id, 
                    image: null,
                    name: specs[i]
                  }));
                }
              }
            })
          }
          let info = {colors:[]}
          info = res
          info.colors = colors
          const infos = info
          
          
          // this.clDetail = res
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
          const carats = []
          const stArr = []
          for (const i in infos.sizes) {
            const o = {
              content: infos.sizes[i].name,
              sortType: infos.sizes[i].id,
              sortBy: infos.sizes[i].id
            }
            stArr.push(o)
          }
          // stArr.unshift({
          //   content: lang.stArrContent,
          //   sortType: ``,
          //   sortBy: ``
          // })
          if(infos.carats){
            for (const i in infos.carats) {
              const o = {
                content: infos.carats[i].name,
                sortType: infos.carats[i].id,
                sortBy: infos.carats[i].id
              }
              carats.push(o)
            }
            infos.carats = carats
          }
          const clArr = []
          if(infos.colors){ //色彩
            for (const i in infos.colors) {
              const o = {
                content: infos.colors[i].name,
                sortType: infos.colors[i].id,
                sortBy: infos.colors[i].id
              }
              clArr.push(o)
            }
            infos.colors = clArr
          }
          infos.sizes = stArr
          infos.materials = mcArr
          infos.goodsDesc = infos.goodsDesc.includes(`<script>`)
            ? ''
            : infos.goodsDesc
          return { data: infos, seoInfo: app.$getDetailSeoInfo(infos) }
        } else if(res.categoryId == 19){
          const pair = res
          return { pair: pair, seoInfo: app.$getDetailSeoInfo(pair) }
        }else {
          const Spec = res.specs
          let colors = []
          let colorSpec = ''
          let colorId = ''
          let configId = ''
          if(Spec){
            Spec.forEach(item => {
              if (item.configId === '63') {
                colorSpec = item.configAttrVal
                colorId = item.configAttrId
                configId = item.configId
              }
              if((colorId && colorSpec)!== ""){
                let ids = colorId.split("|")
                let specs = colorSpec.split("|")
                if((ids && specs) !== ''){
                  colors = ids.map((id,i) => ({
                    id, 
                    image: null,
                    name: specs[i]
                  }));
                }
              }
            })
          }
          let info = {colors:[]}
          info = res
          info.colors = colors
          const infos = info
          if (!infos) return { data: {} }
          const mcArr = []
          for (const i in infos.materials) {
            const o = {
              id: infos.materials[i].id,
              name: infos.materials[i].name,
              image: infos.materials[i].image
            }
            mcArr.push(o)
          }
          if (infos.carats) {
            const carats = []
            for (const i in infos.carats) {
              const o = {
                content: infos.carats[i].name,
                sortType: infos.carats[i].id,
                sortBy: infos.carats[i].id
              }
              carats.push(o)
            }
            infos.carats = carats
          }
          const clArr = [] 
          if(infos.colors){
            for (const i in infos.colors) {
              const o = {
                content: infos.colors[i].name,
                sortType: infos.colors[i].id,
                sortBy: infos.colors[i].id
              }
              clArr.push(o)
            }
            infos.colors = clArr
            // console.log('ggggg',clArr) 
          }
          infos.materials = mcArr
          if (res.sizes) {
            const stArr = []
            for (const i in res.sizes) {
              const o = {
                content: res.sizes[i].name,
                sortType: res.sizes[i].id,
                sortBy: res.sizes[i].id
              }
              stArr.push(o)
            }
            stArr.unshift({
              content: lang.stArrContent,
              sortType: ``,
              sortBy: ``
            })
            res.sizes = stArr
          }
          infos.goodsDesc = infos.goodsDesc.includes(`<script>`)
            ? ''
            : infos.goodsDesc
          return {
            data: infos,
            seoInfo: app.$getDetailSeoInfo('Jewellery')
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    // console.log(88888,this.clDetail)
    this.$nextTick(() => {
      const options = {
        params: { groupId: this.$route.query.goodId }
      }
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
          fbq('track', 'AddToCart');
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
