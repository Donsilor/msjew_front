<template>
  <div class="step-window">
    <div class="step">
      <!-- <img
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
      /> -->

      <div class="step-bg clf">
        <div class="list fl list-a" :class="[step === 1 && !$route.query.isBack ? 'active' : '']">
          <div class="bg-color"></div>
          <div class="img-box img-a">
            <img class="img-a-l-a" src="../../static/components/step/img-a.png" alt="">
            <img class="img-a-l-b" src="../../static/components/step/img-d.png" alt="">
          </div>
        </div>

        <div class="list fl list-b" :class="[step === 2 && !$route.query.isBack ? 'active' : '']">
          <div class="bg-color"></div>
          <div class="img-box img-b-l">
            <img class="img-b-l-a" src="../../static/components/step/img-b.png" alt="">
          </div>
          <div class="img-box img-b-r">
            <img class="img-b-r-a" src="../../static/components/step/img-a.png" alt="">
            <img class="img-b-r-b" src="../../static/components/step/img-d.png" alt="">
          </div>
        </div>

        <div class="list fl list-c" :class="[step === 3 && !$route.query.isBack ? 'active' : '']">
          <div class="bg-color"></div>
          <div class="img-box img-c">
            <img class="img-c-l" src="../../static/components/step/img-b.png" alt="">
          </div>
        </div>
      </div>

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
                    ?$t(`${lang}.diamond`)
                    :$t(`${lang}.ring`)
                }}
              </div>
            </div>
          </div>
          <div class="single-step-right-side">
            <div class="single-step-right-side-icon" :class="[step === 1 ? 'active' : '']">
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
            <div class="single-step-right-side-icon" :class="[step === 2 ? 'active' : '']">
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
            <div class="single-step-right-side-icon" :class="[step === 3 ? 'active' : '']">
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
      this.getPrice(this.steps.steps[0].goodsId, this.steps.steps[1].goodsId,this.steps.steps[0].ct)
    }
  },
  methods: {
    async getPrice(id1, id2 = null,ct = null) {
      console.log(id1, !id2)
      const data1 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id1 })),
        false
      )
      const data2 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id2 })),
        false
      )
      console.log(888,ct,id1,id2);
      if (!id2) {
        if(ct === 1){
          var url = `/web/goods/diamond/detail`
        }else{
          var url = `/web/goods/style/detail`
        }
        this.$axios
          .post(url, data1)
          .then(res => {
            let data = res.data;
            this.name1 = data.goodsName
            for (const i in data.details) {
              if (
                this.steps.steps[0].goodsDetailsId ===
                data.details[i].id
              ) {
                this.price1 = data.details[i].retailMallPrice
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

        if(ct === 1){
          var url1 = `/web/goods/diamond/detail`
          var url2 = `/web/goods/style/detail`
        }else{
          var url1 = `/web/goods/style/detail`
          var url2 = `/web/goods/diamond/detail`
        }
        console.log(999,url1,url2)
        await this.$axios
          .post(url1, data1)
          .then(res => {
            let data = res.data;
            this.name1 = data.goodsName
            for (const i in data.details) {
              if (
                this.steps.steps[0].goodsDetailsId ===
                data.details[i].id
              ) {
                this.price1 = data.details[i].retailMallPrice
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
          .post(url2, data2)
          .then(res => {
            let data = res.data;
            this.name2 = data.goodsName
            for (const i in data.details) {
              if (
                this.steps.steps[1].goodsDetailsId ===
                data.details[i].id
              ) {
                this.price2 = data.details[i].retailMallPrice
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
          return `/build-your-own-ring/diamond-details/${this.steps.steps[0].goodsId}?goodId=${
            this.steps.steps[0].goodsId
          }&step=1&steps=${this.$helpers.base64Encode(
            JSON.stringify(this.steps)
          )}&isBack=true`
        } else {
          return `/build-your-own-ring/setting-details/${this.steps.steps[0].goodsId}?goodId=${
            this.steps.steps[0].goodsId
          }&step=1&steps=${this.$helpers.base64Encode(
            JSON.stringify(this.steps)
          )}&ringType=engagement&isBack=true`
        }
      } else if (this.steps.steps[0].ct === 1) {
        return `/build-your-own-ring/setting-details/${this.steps.steps[0].goodsId}?goodId=${
          this.steps.steps[1].goodsId
        }&step=2&steps=${this.$helpers.base64Encode(
          JSON.stringify(this.steps)
        )}&isBack=true`
      } else {
        return `/build-your-own-ring/diamond-details/${this.steps.steps[0].goodsId}?goodId=${
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
            background: #d1d1d1;
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

.step-bg{
  width: 1360px;
  height: 80px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 0;
}
.step-bg .list{
  height: 100%;
  float: left;
  box-sizing: box-sizing;
  position: relative;
}
.step-bg img{
  width: 100%;
  height: 100%;
}

.step-bg .list-a{
  width: 453px;
}
.step-bg .list-b{
  width: 454px;
}
.step-bg .list-c{
  width: 453px;
}

.step-bg .list-a .bg-color{
  width: 433px;
  height: 100%;
}
.step-bg .list-b .bg-color{
  width: 414px;
  height: 100%;
  margin-left: 20px;
}
.step-bg .list-c .bg-color{
  width: 433px;
  height: 100%;
  margin-left: 20px;
}


.step-bg .active .bg-color{
  border: 1px solid #f7b5a1;
  -webkit-box-shadow: 2px 4px 0 #fadfd7;
  box-shadow: 2px 4px 0 #fadfd7;
  background-color: #fff;
  height: 88px;
  z-index: 0;
  box-sizing: border-box;
}

.step-bg .list-a.active .bg-color,
.step-bg .list-b.active .bg-color{
  border-right: 0;
}
.step-bg .list-c.active .bg-color{
  border-left: 0;
}

.step-bg .list-a .img-box{
  width: 40px;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 0px;
  right: -20px;
  z-index: 2;
}

.step-bg .list-a.active .img-box{
  height: 92px;
}
.step-bg .list-a .img-a-l-a{
  display: none;
}

.step-bg .list-a.active .img-a-l-a{
  display: block;
}
.step-bg .list-a.active .img-a-l-b{
  display: none;
}

.step-bg .img-b-l{
  width: 40px;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 0px;
  left: -18px;
  z-index: 2;
}

.step-bg .img-b-r{
  width: 40px;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 0px;
  right: -20px;
}

.step-bg .list-b.active .list-b-l,
.step-bg .list-b.active .list-b-r,
.step-bg .list-c.active .list-c-l{
  height: 92px;
}
.step-bg .list-b .img-b-r-a{
  display: none;
}

.step-bg .list-b.active .img-box{
  height: 92px;
}
.step-bg .list-b.active .img-b-r-a{
  display: block;
}
.step-bg .list-b.active .img-b-r-b{
  display: none;
}
.list-b .img-b-l-a{
  display: none;
}
.list-b.active .img-b-l-a{
  display: block;
}

.step-bg .list-c .img-box{
  width: 40px;
  height: 92px;
  margin: 0;
  position: absolute;
  top: 0px;
  left: -20px;
  display: none;
}
.step-bg .list-c.active .img-box{
  display: block;
}

.step-window .step .step-box .single-step{
  padding-right: 20px;
}

.single-step-right-side-icon.active{
  background-color: #ddb1aa !important;
}
</style>
