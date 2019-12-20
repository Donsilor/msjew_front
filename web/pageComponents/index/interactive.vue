<template>
  <div class="interactive">
    <div v-show="!showVideo" ref="card-container" class="card-container">
      <div class="bg">
        <img src="/index/card-bg.png" />
      </div>
      <img
        v-for="index in 4"
        :key="index"
        :ref="'card-img-' + index"
        :src="'/index/card-' + index + '.png'"
        :data-index="index"
        :style="getCardImageStyle(index)"
        :class="['card-img', { 'can-hover': cardCanHover(index) }]"
        @mousedown="cardMove"
      />
      <div class="card-box"></div>
    </div>
    <div class="video-show">
      <!--      <video v-show="showVideo" ref="brand-video" src="/index/mv.mp4" />-->
      <video
        v-show="showVideo"
        ref="brand-video"
        src="/index/mv.mp4"
        webkit-playsinline
        playsinline
        x5-playsinline
        @click="clickVideo"
        @ended="videoEnded"
      ></video>
    </div>
  </div>
</template>

<script>
const lang = 'index'
export default {
  data() {
    return {
      lang,
      showVideo: false,
      cardImages: this.cardImagesDefault()
    }
  },
  computed: {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    cardImagesDefault() {
      return {
        1: {
          moveX: 0,
          moveY: 0
        },
        2: {
          moveX: 0,
          moveY: 0
        },
        3: {
          moveX: 0,
          moveY: 0
        },
        4: {
          moveX: 0,
          moveY: 0
        }
      }
    },
    resetcardImagesStyle() {
      this.cardImages = this.cardImagesDefault()
    },
    finishCardImageMove(index) {
      const _this = this
      const cardImages = JSON.parse(JSON.stringify(_this.cardImages))
      const cardContainer = _this.$refs['card-container']
      const cardImage = _this.$refs[`card-img-${index}`][0]
      const finishX = cardContainer.offsetWidth * 0.5 - cardImage.offsetLeft
      const finishY = cardContainer.offsetHeight * 0.27 - cardImage.offsetTop

      // console.log('cardImage---->', cardImage)
      // console.log('finishX====>', cardImage.offsetLeft)
      // console.log('finishY====>', cardImage.offsetTop)

      cardImages[index].moveX = finishX
      cardImages[index].moveY = finishY
      _this.cardImages = cardImages
      setTimeout(() => {
        _this.playVideo()
      }, 200)
    },
    playVideo() {
      this.showVideo = true
      const video = this.$refs['brand-video']
      video.play()
    },
    cardMove(e) {
      e.preventDefault()
      e.stopPropagation()
      console.log(e)

      const _this = this
      const index = e.target.dataset.index
      const startX = e.clientX
      const startY = e.clientY

      const target = e.target
      const cardContainer = _this.$refs['card-container']
      const cardContainerWidth = cardContainer.offsetWidth
      const cardContainerHeight = cardContainer.offsetHeight

      const cardImages = JSON.parse(JSON.stringify(_this.cardImages))

      const oldX = cardImages[index].moveX
      const oldY = cardImages[index].moveY

      function mouseMove(event) {
        event.preventDefault()
        event.stopPropagation()

        requestAnimationFrame(() => {
          const endX = event.clientX
          const endY = event.clientY

          const moveX = oldX + endX - startX
          const moveY = oldY + endY - startY

          cardImages[index].moveX = moveX
          cardImages[index].moveY = moveY
          // cardImages[index].moveX = (endX - startX) / parentWidth
          // cardImages[index].moveY = (endY - startY) / parentHeight
          _this.cardImages = cardImages
          // console.log(cardImages)
          // console.log(event)
        })
      }
      function mouseUp(event) {
        console.log('mouseUp')
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        const endX = event.clientX
        const endY = event.clientY

        const moveX = oldX + endX - startX
        const moveY = oldY + endY - startY

        const newX = target.offsetLeft + moveX
        const newY = target.offsetTop + moveY

        if (
          cardContainerWidth * 0.5 - target.offsetWidth * 0.75 < newX &&
          newX < cardContainerWidth * 0.64 + target.offsetWidth * 0.75 &&
          cardContainerHeight * 0.27 - target.offsetHeight * 0.35 < newY &&
          newY < cardContainerHeight * 0.73 + target.offsetHeight * 0.35
        ) {
          setTimeout(() => {
            _this.finishCardImageMove(index)
          }, 100)
        } else {
          setTimeout(() => {
            _this.resetcardImagesStyle()
          }, 100)
        }
      }

      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
    },
    getCardImageStyle(index) {
      const cardMove = this.cardImages[index]
      if (this.cardCanHover(index)) {
        const rotate = -30 + (index - 1) * 20
        return {
          transform: `rotate(${rotate}deg)`
        }
      } else {
        return {
          transform: `translate(${cardMove.moveX}px, ${cardMove.moveY}px)`
        }
      }
    },
    cardCanHover(index) {
      const info = this.cardImages[index]
      return !(info.moveX || info.moveY)
    },
    clickVideo() {
      const video = this.$refs['brand-video']
      this.fullScreen(video)
    },
    videoEnded() {
      const video = this.$refs['brand-video']
      video.pause()
      this.exitFullscreen()
      this.resetcardImagesStyle()
      this.showVideo = false
    },
    isFullscreen() {
      return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
      )
    },
    // 进入全屏
    fullScreen(el) {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    exitFullscreen() {
      if (!this.isFullscreen()) {
        return
      }
      const de = document
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.interactive {
  position: relative;
  width: 80%;
  margin: auto;
  padding: 57px 0 100px 0;

  .card-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .bg {
      width: 100%;
      font-size: 0;
      line-height: 0;

      img {
        width: 100%;
      }
    }

    .card-img {
      position: absolute;
      left: 11%;
      bottom: 9.5%;
      width: 14.2%;
      cursor: pointer;
      z-index: 1;
      transform-origin: bottom center;
      transition: all 0.1s;

      &:nth-of-type(1) {
        transform: rotate(-30deg);
      }
      &:nth-of-type(2) {
        transform: rotate(-10deg);
      }
      &:nth-of-type(3) {
        transform: rotate(10deg);
      }
      &:nth-of-type(4) {
        transform: rotate(30deg);
      }

      &.can-hover {
        transition: all 0.5s;

        &:nth-of-type(1):hover {
          /*transform: rotate(-30deg) translate(0, -30%);*/
          bottom: 20%;
        }
        &:nth-of-type(2):hover {
          /*transform: rotate(-10deg) translate(0, -30%);*/
          bottom: 20%;
        }
        &:nth-of-type(3):hover {
          /*transform: rotate(10deg) translate(0, -30%);*/
          bottom: 20%;
        }
        &:nth-of-type(4):hover {
          /*transform: rotate(30deg) translate(0, -30%);*/
          bottom: 20%;
        }
      }
    }
  }

  .video-show {
    width: 100%;

    video {
      width: 100%;
    }
  }
}
</style>
