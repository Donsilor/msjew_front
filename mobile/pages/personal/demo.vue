<template>
  <div class="address">
    <Header title="我的demo" />
    <div id="wrapper" class="wrapper">time</div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  head: {
    script: [{ src: '/Mdate.js' }, { src: '/iScroll.js' }],
    link: [{ rel: 'stylesheet', href: '/Mdate.css' }]
  },
  name: 'Demo',
  layout: 'no-bar',
  components: {
    Header
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    showSelect() {
      console.log('6767')
    }
  }
}
</script>

<style scoped lang="less"></style>
