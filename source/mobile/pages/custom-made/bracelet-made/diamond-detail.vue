<template>
  <div>
    <detail-body @step="doStep"></detail-body>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import DetailBody from '../diamond-factory/diamonds-body'
export default {
  layout: `no-bar`,
  components: {
    DetailBody
  },
  methods: {
    doStep(data = {}) {
      // goodInfo
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      melo.steps[1].goodsDetailsId = data.detailsId
      melo.steps[1].goodsId = data.goodsId
      melo.steps[1].ct = 1
      this.$router.push({
        name: `custom-made-bracelet-made-diamond-detail`,
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
