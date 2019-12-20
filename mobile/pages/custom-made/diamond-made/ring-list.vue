<template>
  <div class="list-page">
    <data-list ref="data-list" @clickData="clickData"></data-list>
  </div>
</template>

<script>
import DataList from '../ring-factory/list-body.vue'
export default {
  name: 'List',
  layout: `no-bar`,
  components: {
    DataList
  },
  methods: {
    getNextPage() {
      if (this.$refs[`data-list`].getNextPage) {
        this.$refs[`data-list`].getNextPage()
      }
    },
    clickData(data) {
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      melo.steps[1].page = `detail`
      this.$router.push({
        name: 'custom-made-diamond-made-ring-detail',
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          goodId: data.id,
          step: 2
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
  background-color: #f5f5f5;
}
</style>
