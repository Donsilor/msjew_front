<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './list-body.vue'
export default {
  name: 'List',
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
      this.$router.push({
        name: 'engagement-engagement-rings',
        query: {
          goodId: data.id
        }
      })
    }
  }
}
</script>

<style scoped>
.list-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
