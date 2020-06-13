<template>
  <div class="fix-box">
    <div class="fix-m">
      <detail-body @step="doStep" style="min-height: 320px;"></detail-body>
      <footer-bar></footer-bar>
    </div>
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
      melo.steps[1].goodsType = data.goodsType
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

.fix-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 90px;
}
.fix-m{
  height: 100%;
  overflow: auto;
}

</style>
