<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './pair-ring-list.vue'
export default {
  layout: `no-footer-bar`,
  components: {
    DataList
  },
  data() {
    return {}
  },
  methods: {
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      // console.log('data===>', data)
      this.$router.push({
        name: 'marriage-ring-pair-ring-detail',
        query: {
          ringId: data.ringId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
