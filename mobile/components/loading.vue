<template>
  <div v-if="loading" class="loading-mask">
    <div class="loading-component">
      <div class="loader">
        <div class="loader-inner line-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div>{{ lang }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      lang: this.LANGUAGE.definition.lowding,
      loading: false,
      loadingTime: 0,
      loadingInterval: null
    }
  },
  methods: {
    start() {
      this.loading = true
      this.loadingInterval = setInterval(() => {
        this.loadingTime++
        if (this.loadingTime >= 2) {
          this.loadingTime = 0
          clearInterval(this.loadingInterval)
        }
      })
    },
    finish() {
      if (this.loadingTime >= 2) {
        this.loading = false
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.loading-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9998;
}
.loading-component {
  width: 120px;
  height: 120px;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 13px;
  border-radius: 5px;
  line-height: 13px;
  z-index: 9999;
}
.loader {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  transform: scale(0.7);
}
@-webkit-keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.line-spin-fade-loader {
  position: relative;
}
.line-spin-fade-loader > div:nth-child(1) {
  top: 20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(2) {
  top: 13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(3) {
  top: 0;
  left: 20px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(4) {
  top: -13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(5) {
  top: -20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(6) {
  top: -13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(7) {
  top: 0;
  left: -20px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(8) {
  top: 13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
}
.line-spin-fade-loader > div {
  width: 3px;
  height: 12px;
  background-color: #fff;
  border-radius: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
}
</style>
