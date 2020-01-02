<template>
  <div class="list-page">
    <data-list ref="data-list" @clickData="clickData"></data-list>
  </div>
</template>

<script>
import DataList from '../necklace-factory/list-body.vue'
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
      melo.steps[0].page = `detail`
      this.$router.push({
        name: 'custom-made-necklace-made-necklace-detail',
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          goodId: data.id,
          step: 1
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
