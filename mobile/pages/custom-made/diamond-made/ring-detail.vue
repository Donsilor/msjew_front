<template>
  <div>
    <detail-body @step="doStep"></detail-body>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import DetailBody from '../ring-factory/rings-body'
export default {
  layout: `no-bar`,
  components: {
    DetailBody
  },
  methods: {
    doStep(data = {}) {
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      melo.steps[1].goodsDetailsId = data.detailsId
      melo.steps[1].goodsId = data.goodsId
      melo.steps[1].ct = 2
      this.$router.push({
        name: `custom-made-diamond-made-ring-detail`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          step: 3
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.engagementRings-component {
  .details-component(100%);
}
</style>
