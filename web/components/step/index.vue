<template>
  <div class="step-window">
    <div class="step">
      <img
        v-if="step === 1 && !$route.query.isBack"
        class="step-img"
        src="../../static/components/step/step-one.png"
      />
      <img
        v-else-if="step === 2 && !$route.query.isBack"
        class="step-img"
        src="../../static/components/step/step-two.png"
      />
      <img
        v-else
        class="step-img"
        src="../../static/components/step/step-three.png"
      />
      <div class="step-box">
        <div class="single-step">
          <div class="single-step-left-side">
            <div class="single-step-left-side-num">1</div>
            <div class="single-step-left-side-word">
              <div class="single-step-left-side-word-small">
                {{ $t(`${lang}.choose`) }}
              </div>
              <div class="single-step-left-side-word-big">
                {{
                  steps.steps[0].ct === 1
                    ? $t(`${lang}.diamond`)
                    : $t(`${lang}.ring`)
                }}
              </div>
            </div>
          </div>
          <div class="single-step-right-side">
            <div class="single-step-right-side-icon">
              <i
                v-if="steps.steps[0].ct === 1"
                class="iconfont iconicon-zuanshi"
              ></i>
              <i v-else class="iconfont iconstar-jt"></i>
            </div>
            <div
              v-if="step >= 2 || $route.query.isBack"
              class="single-step-right-side-info"
            >
              <div class="single-step-right-side-info-price">
                {{ $store.state.coin }} {{ formatMoney(price1, 0) }}
              </div>
              <div class="single-step-right-side-info-btn">
                <nuxt-link :to="stepBack(1)"
                  ><span class="single-step-right-side-info-btn-check">{{
                    $t(`${lang}.check`)
                  }}</span></nuxt-link
                >
                <nuxt-link :to="stepCheck(2)"
                  ><span class="single-step-right-side-info-btn-edit">{{
                    $t(`${lang}.edit`)
                  }}</span></nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="single-step">
          <div class="single-step-left-side">
            <div class="single-step-left-side-num">2</div>
            <div class="single-step-left-side-word">
              <div class="single-step-left-side-word-small">
                {{ $t(`${lang}.choose`) }}
              </div>
              <div class="single-step-left-side-word-big">
                {{
                  steps.steps[0].ct === 2
                    ? $t(`${lang}.diamond`)
                    : $t(`${lang}.ring`)
                }}
              </div>
            </div>
          </div>
          <div class="single-step-right-side">
            <div class="single-step-right-side-icon">
              <i
                v-if="steps.steps[0].ct === 2"
                class="iconfont iconicon-zuanshi"
              ></i>
              <i v-else class="iconfont iconstar-jt"></i>
            </div>
            <div
              v-if="step === 3 || $route.query.isBack"
              class="single-step-right-side-info"
            >
              <div class="single-step-right-side-info-price">
                {{ $store.state.coin }} {{ formatMoney(price2, 0) }}
              </div>
              <div class="single-step-right-side-info-btn">
                <nuxt-link :to="stepBack(2)"
                  ><span class="single-step-right-side-info-btn-check">{{
                    $t(`${lang}.check`)
                  }}</span></nuxt-link
                >
                <nuxt-link :to="stepCheck(2)"
                  ><span class="single-step-right-side-info-btn-edit">{{
                    $t(`${lang}.edit`)
                  }}</span></nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="single-step">
          <div class="single-step-left-side">
            <div class="single-step-left-side-num">3</div>
            <div class="single-step-left-side-word">
              <div class="single-step-left-side-word-small">
                {{ $t(`${lang}.check`) }}
              </div>
              <div class="single-step-left-side-word-big">
                {{ $t(`${lang}.cart`) }}
              </div>
            </div>
          </div>
          <div class="single-step-right-side">
            <div class="single-step-right-side-icon">
              <i class="iconfont icongouwuche"></i>
            </div>
            <div
              v-if="step === 3 || $route.query.isBack"
              class="single-step-right-side-info"
            >
              <div class="single-step-right-side-info-price">
                {{ $store.state.coin }} {{ formatMoney(price1 + price2, 0) }}
              </div>
              <div class="single-step-right-side-info-btn">
                <nuxt-link :to="toReview"
                  ><span class="single-step-right-side-info-btn-check">{{
                    $t(`${lang}.check`)
                  }}</span></nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = `components.step`
export default {
  name: 'Demo',
  data() {
    return {
      lang,
      step: 1,
      steps: {
        steps: [{ ct: null }, {}]
      },
      price1: ``,
      price2: ``,
      name1: ``,
      name2: ``
    }
  },
  computed: {
    toReview() {
      return `/build-your-own-ring/review?&step=3&steps=${this.$helpers.base64Encode(
        JSON.stringify(this.steps)
      )}`
    }
  },
  mounted() {
    this.steps = JSON.parse(this.$helpers.base64Decode(this.$route.query.steps))
    // console.log(this.steps, `<=========`)
    this.step = parseInt(this.$route.query.step)
    if (this.step !== 1) {
      this.getPrice(this.steps.steps[0].goodsId, this.steps.steps[1].goodsId)
    }
  },
  methods: {
    async getPrice(id1, id2 = null) {
      console.log(id1, !id2)
      const data1 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id1 })),
        false
      )
      const data2 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id2 })),
        false
      )
      if (!id2) {
        this.$axios
          .post(`/wap/goods/goodsDetail`, data1)
          .then(res => {
            this.name1 = res.goodsName
            for (const i in res.simpleGoodsDetailsList) {
              if (
                this.steps.steps[0].goodsDetailsId ===
                res.simpleGoodsDetailsList[i].id
              ) {
                this.price1 = res.simpleGoodsDetailsList[i].retailMallPrice
              }
            }
          })
          .catch(err => {
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
          })
      } else {
        await this.$axios
          .post(`/wap/goods/goodsDetail`, data1)
          .then(res => {
            this.name1 = res.goodsName
            for (const i in res.simpleGoodsDetailsList) {
              if (
                this.steps.steps[0].goodsDetailsId ===
                res.simpleGoodsDetailsList[i].id
              ) {
                this.price1 = res.simpleGoodsDetailsList[i].retailMallPrice
              }
            }
          })
          .catch(err => {
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
          })
        await this.$axios
          .post(`/wap/goods/goodsDetail`, data2)
          .then(res => {
            this.name2 = res.goodsName
            for (const i in res.simpleGoodsDetailsList) {
              if (
                this.steps.steps[1].goodsDetailsId ===
                res.simpleGoodsDetailsList[i].id
              ) {
                this.price2 = res.simpleGoodsDetailsList[i].retailMallPrice
              }
            }
          })
          .catch(err => {
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
          })
      }
    },
    stepBack(step) {
      if (step === 1) {
        if (this.steps.steps[0].ct === 1) {
          return `/build-your-own-ring/diamond-details/${this.name1.replace(
            /\//g,
            ''
          )}?goodId=${
            this.steps.steps[0].goodsId
          }&step=1&steps=${this.$helpers.base64Encode(
            JSON.stringify(this.steps)
          )}&isBack=true`
        } else {
          return `/build-your-own-ring/setting-details/${this.name1.replace(
            /\//g,
            ''
          )}?goodId=${
            this.steps.steps[0].goodsId
          }&step=1&steps=${this.$helpers.base64Encode(
            JSON.stringify(this.steps)
          )}&ringType=engagement&isBack=true`
        }
      } else if (this.steps.steps[0].ct === 1) {
        return `/build-your-own-ring/setting-details/${this.name2.replace(
          /\//g,
          ''
        )}?goodId=${
          this.steps.steps[1].goodsId
        }&step=2&steps=${this.$helpers.base64Encode(
          JSON.stringify(this.steps)
        )}&isBack=true`
      } else {
        return `/build-your-own-ring/diamond-details/${this.name2.replace(
          /\//g,
          ''
        )}?goodId=${
          this.steps.steps[1].goodsId
        }&step=2&steps=${this.$helpers.base64Encode(
          JSON.stringify(this.steps)
        )}&ringType=engagement&isBack=true`
      }
    },
    stepCheck(step) {
      if (step === 1) {
        const copy = this.$helpers.cloneObject(this.steps)
        // console.log(`akmakma=======>`, copy)
        const newSets = [
          copy.steps[1],
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: null,
            cartId: copy.steps[0].cartId,
            page: `list`
          }
        ]
        copy.steps = newSets
        // console.log(`akmakma=======>`, copy)
        const strStep = JSON.stringify(copy)
        const urlStep = this.$helpers.base64Encode(strStep)
        return `/build-your-own-ring/${
          copy.steps[0].ct === 1 ? 'settings' : 'diamonds'
        }?steps=${urlStep}&selectGoodsId=${copy.steps[0].goodsId}&step=2`
      } else {
        const copy = this.$helpers.cloneObject(this.steps)
        // console.log(`akmakma=======>`, copy)
        copy.steps[1].goodsId = null
        copy.steps[1].goodsDetailsId = null
        copy.steps[1].ct = null
        // console.log(`akmakma=======>`, copy)
        const strStep = JSON.stringify(copy)
        const urlStep = this.$helpers.base64Encode(strStep)
        return `/build-your-own-ring/${
          copy.steps[0].ct === 1 ? 'settings' : 'diamonds'
        }?steps=${urlStep}&selectGoodsId=${copy.steps[0].goodsId}&step=2`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.step-window {
  width: 100%;
  .step {
    min-width: 1360px;
    max-width: 1366px;
    width: 100%;
    position: relative;
    margin: 0 auto;
    .step-img {
      display: block;
      width: 100%;
    }
    .step-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      .single-step {
        box-sizing: border-box;
        flex: 1;
        padding: 0 42px 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .single-step-left-side {
          display: flex;
          height: 100%;
          align-items: center;
          .single-step-left-side-num {
            font-size: 44px;
            font-family: twCenMt;
          }
          .single-step-left-side-word {
            margin-left: 15px;
            color: rgba(51, 51, 51, 1);
            .single-step-left-side-word-small {
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 5px;
            }
            .single-step-left-side-word-big {
              font-size: 22px;
              line-height: 22px;
            }
          }
        }
        .single-step-right-side {
          display: flex;
          height: 100%;
          align-items: center;
          .single-step-right-side-icon {
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #ffffff;
            background: rgba(221, 176, 170, 1);
            border-radius: 50%;
            margin-right: 22px;
            .iconfont {
              display: block;
              font-size: 22px;
              width: 40px;
              height: 40px;
              text-align: center;
              line-height: 40px;
            }
          }
          .single-step-right-side-info {
            .single-step-right-side-info-price {
              font-size: 24px;
              line-height: 24px;
              font-family: twCenMt;
              margin-bottom: 5px;
            }
            .single-step-right-side-info-btn {
              text-align: center;
              font-size: 14px;
              .single-step-right-side-info-btn-check {
                color: #9e8b79;
                margin: 0 3px;
                cursor: pointer;
              }
              .single-step-right-side-info-btn-edit {
                color: #666666;
                margin: 0 3px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
