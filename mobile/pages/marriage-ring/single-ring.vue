<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './single-ring-list.vue'
export default {
  layout: 'no-footer-bar',
  components: {
    DataList
  },
  data() {
    return {}
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      this.$router.push({
        name: 'marriage-ring-single-ring-detail',
        query: {
          goodId: data.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
