<template>
  <section class="mask">
    <div class="message" :class="[visible ? 'slideDown' : 'slideUp']">
      {{ message }}
    </div>
  </section>
</template>
<style scoped>
@keyframes slideDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.mask {
  height: 100vh;
  width: 100vw;
  background: transparent;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mask .message {
  min-width: 210px;
  max-width: 75vw;
  width: max-content;
  /*height: max-content;*/
  color: #fff;
  font-size: 14px;
  text-align: center;
  background: rgba(17, 17, 17, 0.8);
  border-radius: 5px;
  padding: 13px 20px;
  box-sizing: border-box;
  /*position: absolute;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*bottom: 0;*/
  /*margin: auto;*/
}

.mask .message.slideDown {
  animation: slideDown;
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;
  -o-animation-duration: 0.3s;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

.mask .message.slideUp {
  animation: slideUp;
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;
  -o-animation-duration: 0.3s;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}
</style>
<script>
export default {
  name: 'Toast',
  data() {
    return {
      visible: true,
      message: 'hello toast'
    }
  }
}
</script>
