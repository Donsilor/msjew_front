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
      melo.steps[0].goodsDetailsId = data.detailsId
      melo.steps[0].goodsId = data.goodsId
      if (data.type === `ring`) {
        melo.steps[1].ct = 2
        this.$router.push({
          name: `custom-made-diamond-made-ring-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      } else if (data.type === `necklace`) {
        melo.steps[1].ct = 4
        this.$router.push({
          name: `custom-made-diamond-made-necklace-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      } else if (data.type === `bracelet`) {
        melo.steps[1].ct = 8
        this.$router.push({
          name: `custom-made-diamond-made-bracelet-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      } else {
        this.$router.push({
          name: this.$route.query.name,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 3
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
