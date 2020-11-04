<template>
  <div class="view-box">
    <div class="goBack" @click="$router.go(-1)">
      < {{ LANGUAGE.singleDog.back }}
    </div>
    <div
      class="swiper-box"
      :style="[
        { height: `${bannerHeight}px` },
        { transform: `translateY(-${autoFix}%)` }
      ]"
    >
      <swiper :auto="true" :duration="5000" @change="resetBannerSize">
        <div v-for="(each, n) in akm" :key="n">
          <img ref="" :src="each" />
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageView',
  layout: `no-bar`,
  data() {
    return {
      akm: [],
      bannerHeight: 0,
      autoFix: 50
    }
  },
  mounted() {
    this.akm = JSON.parse(this.$helpers.base64Decode(this.$route.query.path))
    this.resetBannerSize(0)
    document.addEventListener(`touchmove`, this.stopProp, false)
  },
  beforeDestroy() {
    document.removeEventListener(`touchmove`, this.stopProp, false)
  },
  methods: {
    resetBannerSize(i) {
      // console.log(this.akm[i])
      const _this = this
      const image = new Image()
      image.src = this.akm[i]
      image.onload = result => {
        // console.log(image.width, image.height)
        _this.autoFix = 50
        _this.bannerHeight =
          (document.body.clientWidth * image.height) / image.width
      }
    },
    stopProp(e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang="less">
.view-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000000;
  /*position: relative;*/
  overflow: hidden;
  color: white;
  .goBack {
    width: 150px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: 10px;
    left: 20px;
    text-align: left;
  }
  .swiper-box {
    transition: all 0.5s linear;
    width: 100%;
    position: absolute;
    top: 50%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
