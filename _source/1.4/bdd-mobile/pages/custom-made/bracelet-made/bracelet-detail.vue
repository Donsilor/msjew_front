<template>
  <div>
    <detail-body @step="doStep"></detail-body>
  </div>
</template>

<script>
import DetailBody from '../bracelet-factory/bracelet-body'
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
      melo.steps[0].goodsDetailsId = data.detailsId
      melo.steps[0].goodsId = data.goodsId
      if (parseInt(data.type) === 2) {
        this.$router.push({
          name: this.$route.query.name,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 3
          }
        })
      } else {
        this.$router.push({
          name: `custom-made-bracelet-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.engagementRings-component {
  .details-component(100%);
}
</style>
