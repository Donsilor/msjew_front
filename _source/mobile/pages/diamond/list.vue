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
        name: 'diamond-diamonds',
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
  width: 100vw;
  height: 100vh;
  background-color: white;
}
</style>
