<template>
  <div class="diamond-component">
    <div class="swiper-box">
      <div v-if="has360" class="btn360" @click="is360 = !is360">
        <i
          :class="[
            `iconfont`,
            `iconicon-test3`,
            `${is360 ? 'cpink' : 'cgary'}`
          ]"
        ></i>
        <span v-show="is360" :class="`${is360 ? 'cpink' : 'cgary'}`">{{
          lang.diamondClose360
        }}</span>
        <span v-show="!is360" :class="`${is360 ? 'cpink' : 'cgary'}`">{{
          lang.diamondOpen360
        }}</span>
      </div>
      <div v-show="is360" class="box360">
        <iframe
          v-if="has360"
          :src="
            'https://spins0.arqspin.com/iframe.html?spin=' +
              goodInfo.goods3ds +
              '&is=0.16'
          "
          width="100%"
          height="100%"
          scrolling="no"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
      <swiper v-show="!is360" :auto="true" :duration="5000">
        <div v-for="(each, n) in goodsImages" :key="n">
          <nuxt-link
            :to="
              `/image-view?path=${$helpers.base64Encode(
                JSON.stringify(goodsImages)
              )}`
            "
            ><img :src="each"
          /></nuxt-link>
        </div>
      </swiper>
    </div>
    <div class="title">
      <a :href="goodInfo.goodsGiaImage" target="_blank"
        ><img
          v-show="goodInfo.goodsGiaImage"
          src="~/static/GIA.png"
          class="gia-certificate"
          align="right"
      /></a>
      {{ goodInfo.goodsName }}
    </div>
    <div class="price">{{ goodInfo.coinType }} {{ formatNumber(showPi) }}</div>
    <div class="promise-box">
      <div
        v-for="(c, index) in goodInfo.goodsServicesJsons"
        :key="index"
        class="promise-info"
      >
        <div class="promise-img">
          <img :src="$IMG_URL + c.img" alt="" />
        </div>
        <span>{{ c.name }}</span>
      </div>
    </div>
    <!--首次进入-->
    <div
      v-if="
        parseInt($route.query.step) === 1 &&
          !$route.query.isBack &&
          inSale &&
          canAddCart
      "
      class="custom-made-word"
    >
      {{ lang.cmw }}
      <div class="triangle" />
    </div>
    <div
      v-if="
        parseInt($route.query.step) === 1 &&
          !$route.query.isBack &&
          inSale &&
          canAddCart
      "
      class="btn-common btn-pink"
      @click="emitStep(`ring`)"
    >
      {{ lang.addToRingTuo }}
    </div>
    <!--    <div-->
    <!--      v-if="-->
    <!--        parseInt($route.query.step) === 1 &&-->
    <!--          !$route.query.isBack &&-->
    <!--          inSale &&-->
    <!--          canAddCart-->
    <!--      "-->
    <!--      class="btn-common btn-pink"-->
    <!--      @click="addWay = true"-->
    <!--    >-->
    <!--      {{ lang.addTo }} >-->
    <!--    </div>-->
    <div
      v-if="parseInt($route.query.step) === 1 && !$route.query.isBack"
      :class="['btn-common', inSale && canAddCart ? 'btn-white' : 'btn-gray']"
      @click="addCart"
    >
      {{
        inSale
          ? canAddCart
            ? lang.addCart
            : lang.noTotalStock
          : lang.notInSale
      }}
    </div>
    <div
      v-if="parseInt($route.query.step) === 2 && !$route.query.isBack"
      :class="['btn-common', inSale && canAddCart ? 'btn-pink' : 'btn-gray']"
      @click="emitStep(2)"
    >
      <span>{{
        inSale
          ? canAddCart
            ? lang.sureCheck
            : lang.noTotalStock
          : lang.notInSale
      }}</span>
    </div>
    <!--步骤返回-->
    <div
      v-if="$route.query.isBack"
      :class="['btn-common', inSale && canAddCart ? 'btn-pink' : 'btn-gray']"
      @click="emitStep(`hold`)"
    >
      <span>{{
        inSale
          ? canAddCart
            ? lang.sureCheck
            : lang.noTotalStock
          : lang.notInSale
      }}</span>
    </div>
    <div class="wish-and-share">
      <i
        :class="[
          'iconfont',
          { 'iconicon-xinyuandan': !inWish },
          { 'iconxinyuandan-dianji': inWish },
          { active: inWish }
        ]"
        @click="setWish"
      />
      <div />
      <i
        :class="[
          'iconfont',
          { iconduibi1: !inCompared },
          { 'iconduibi-shi': inCompared },
          { active: inCompared }
        ]"
        @click="setCompared"
      />
      <div />
      <i class="iconfont iconfb" @click="$shareFacelook()" />
    </div>
    <div class="ring-details">
      <div class="details-title">
        {{ lang.goodsDetail }}
      </div>
      <div class="details-sku">
        {{ lang.goods }}ID：{{ goodInfo.goodsCode }}
      </div>
      <div class="sku-table">
        <div v-for="(b, index) in goodInfo.baseConfig" :key="index">
          <span>{{ b.configVal }}</span>
          <span>{{ b.configAttrIVal }}</span>
        </div>
      </div>
    </div>
    <div class="details">
      <div class="details-title">
        <div>{{ lang.now4c }}</div>
        <div @click="goTo4C()">{{ lang.getMore4c }} ></div>
      </div>
      <div class="details-4c-box">
        <!--克拉-->
        <div v-show="force.carat" class="box-4c-title">
          {{ lang.diamondWight }}：{{ force.carat.toFixed(2) }}-{{ lang.carat }}
        </div>
        <div v-show="force.carat" class="box-4c-carat">
          <div class="carat-flex">
            <div class="carat-sao-flex">
              <div class="radius">(4.1mm)</div>
              <div class="carat">0.25ct</div>
              <img src="~/static/diamond-details-carat.jpg" class="p18" />
            </div>
            <div class="carat-sao-flex">
              <div class="radius">(6.4mm)</div>
              <div class="carat">1ct</div>
              <img src="~/static/diamond-details-carat.jpg" class="p45" />
            </div>
            <div class="carat-sao-flex">
              <div class="radius">(8.1mm)</div>
              <div class="carat">2ct</div>
              <img src="~/static/diamond-details-carat.jpg" class="p60" />
            </div>
          </div>
          <div class="carat-line-and-arrow">
            <div class="correspondence-line" />
            <div class="correspondence-line" />
            <div class="correspondence-line" />
            <div class="triangle" :style="{ left: caratLeft + '%' }" />
          </div>
          <div class="carat-num mcPink">
            {{ force.carat.toFixed(2) }}{{ lang.caratDiamond }}
          </div>
          <div class="carat-desc cl666">
            {{ lang.remember }}
          </div>
        </div>
        <!--颜色-->
        <div v-show="force.color" class="box-4c-title">
          {{ lang.color }}：
          <span
            v-for="(c, index) in CONDITION_INFO.color"
            v-show="c.id === force.color"
            :key="index"
          >
            {{ c.name }}</span
          >
        </div>
        <div v-show="force.color" class="box-4c-color">
          <img
            v-for="(c, index) in CONDITION_INFO.color"
            v-show="c.id === force.color"
            :key="index"
            :src="c.url"
            class="diamond-details-4c-picture"
          />
          <div class="triangle-letter">
            <div class="triangle" />
            <div class="letter">
              <div
                v-for="(c, index) in CONDITION_INFO.color"
                :key="index"
                :class="{ active: c.id === force.color }"
              >
                {{ c.name }}
              </div>
            </div>
          </div>
          <div class="color-desc">
            <div
              v-for="(c, index) in CONDITION_INFO.color"
              v-show="c.id === force.color"
              :key="index"
            >
              <span class="mcPink">{{ c.name }}:</span>
              <span class="cl666">
                {{ c.desc }}
              </span>
            </div>
          </div>
        </div>
        <!--切割-->
        <div v-show="force.cut" class="box-4c-title">
          {{ lang.cut }}：
          <span
            v-for="(c, index) in CONDITION_INFO.cut"
            v-show="c.id === force.cut"
            :key="index"
          >
            {{ c.name }}</span
          >
        </div>
        <div v-show="force.cut" class="box-4c-cut">
          <img
            v-for="(c, index) in CONDITION_INFO.cut"
            v-show="c.id === force.cut"
            :key="index"
            :src="c.url"
            class="diamond-details-4c-picture"
          />
          <div class="triangle-letter">
            <div class="triangle" />
            <div class="letter">
              <div
                v-for="(c, index) in CONDITION_INFO.cut"
                :key="index"
                :class="{ active: c.id === force.cut }"
              >
                {{ c.sortCut }}
              </div>
            </div>
          </div>
          <div class="cut-desc">
            <div
              v-for="(c, index) in CONDITION_INFO.cut"
              v-show="c.id === force.cut"
              :key="index"
            >
              <span class="mcPink">{{ c.sortCut }}:</span>
              <span class="cl666">
                {{ c.desc }}
              </span>
            </div>
          </div>
        </div>
        <!--净度-->
        <div v-show="force.clarity" class="box-4c-title">
          {{ lang.clarity }}：
          <span
            v-for="(c, index) in CONDITION_INFO.clarity"
            v-show="c.id === force.clarity"
            :key="index"
          >
            {{ c.name }}</span
          >
          <div class="goDown">{{ lang.tenTimes }}</div>
        </div>
        <div v-show="force.clarity" class="box-4c-clarity">
          <img
            v-for="(c, index) in CONDITION_INFO.clarity"
            v-show="c.id === force.clarity"
            :key="index"
            :src="c.url"
            class="diamond-details-4c-picture"
          />
          <div class="triangle-letter">
            <div class="triangle" />
            <div class="letter">
              <div
                v-for="(c, index) in CONDITION_INFO.clarity"
                :key="index"
                :class="{ active: c.id === force.clarity }"
              >
                {{ c.name }}
              </div>
            </div>
          </div>
          <div class="clarity-desc">
            <div
              v-for="(c, index) in CONDITION_INFO.clarity"
              v-show="c.id === force.clarity"
              :key="index"
            >
              <span class="mcPink">{{ c.name }}:</span>
              <span class="cl666">
                {{ c.desc }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="addWay" class="addWayMask">
      <div class="addWayBoard">
        <i class="iconfont iconguanbi close" @click="addWay = false"></i>
        <div class="clickLineBox">
          <div class="clickLine" @click="emitStep(`ring`)">
            <i class="iconfont iconstar-jt"></i>
            <span>{{ lang.addToRing }}</span>
          </div>
          <!--          <div class="clickLine" @click="emitStep(`necklace`)">-->
          <!--            <i class="iconfont icondiamond-pendant"></i>-->
          <!--            <span>{{ lang.addToNecklace }}</span>-->
          <!--          </div>-->
          <!--          <div class="clickLine" @click="emitStep(`bracelet`)">-->
          <!--            <i class="iconfont iconJewelry-bracelet"></i>-->
          <!--            <span>{{ lang.addToBracelet }}</span>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mx from './diamond-mixin'
export default {
  mixins: [Mx],
  computed: {
    canAddCart() {
      return this.goodInfo.totalStock > 0
    },
    inSale() {
      return this.goodInfo.goodsStatus === 2
    }
  }
}
</script>

<style scoped lang="less">
.diamond-component {
  position: relative;
  .details-component(100%, 63px);
  .title {
    .gia-certificate {
      width: 60px;
      height: 60px;
      border: 1px solid rgba(221, 221, 221, 1); /*no*/
      margin-left: 10px;
    }
  }
  .details {
    width: 100%;
    margin: 0 auto;
    padding: 0 15px 20px;
    text-align: left;
    border-bottom: 8px solid rgba(245, 245, 245, 1);
    .details-title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(221, 221, 221, 1); /*no*/
      margin-bottom: 70px;
      div {
        height: 50px;
        line-height: 50px;
        overflow: hidden;
      }
      div:nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        color: rgba(147, 116, 102, 1);
      }
    }
    .details-4c-box {
      .mcPink {
        font-size: 14px;
        line-height: 16px;
        color: @mcPink;
      }
      .cl666 {
        font-size: 14px;
        line-height: 16px;
        color: #666;
      }
      .box-4c-title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        div {
          font-size: 12px;
          line-height: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-top: 10px;
        }
      }
      .box-4c-carat {
        margin: 80px 0 135px;
        .carat-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 14px;
          .carat-sao-flex {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            .radius {
              font-size: 12px;
              line-height: 12px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              margin-top: 6px;
            }
            .carat {
              font-size: 14px;
              line-height: 14px;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              margin-top: 8px;
            }
            .p18 {
              display: block;
              width: 18px;
              height: 18px;
            }
            .p45 {
              display: block;
              width: 45px;
              height: 45px;
            }
            .p60 {
              display: block;
              width: 60px;
              height: 60px;
            }
          }
        }
        .carat-line-and-arrow {
          width: 280px;
          height: 11px;
          border-bottom: 1px solid @mcPink; /*no*/
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          margin: 6px auto 30px;
          .correspondence-line {
            width: 1px; /* no */
            height: 10px;
            background: @mcPink;
            background: @mcPink;
          }
          .triangle {
            width: 0;
            height: 0;
            border-bottom: 12px solid @mcPink;
            border-right: 8px solid transparent;
            border-left: 8px solid transparent;
            position: absolute;
            bottom: -15px;
            transform: translateX(-50%);
          }
        }
        .carat-num {
          margin: 0 38-15px 7px;
        }
        .carat-desc {
          margin: 0 38-15px;
        }
      }
      .box-4c-color {
        .diamond-details-4c(12px);
      }
      .box-4c-cut {
        .diamond-details-4c(10px);
        .triangle-letter {
          .letter {
            top: -30px;
            div {
              width: 80px;
              height: 80px;
              line-height: 80px;
              border-radius: 40px;
            }
          }
        }
        .cut-desc {
          position: relative;
          top: 20px;
        }
      }
      .box-4c-clarity {
        .diamond-details-4c(10px);
        margin-bottom: 60px;
      }
    }
  }
  .GIA-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    background: black;
    padding-top: 120px;
    .GIA-body {
      width: 100%;
    }
  }
}
.addWayMask {
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  .addWayBoard {
    position: absolute;
    width: percentage(275 / 375);
    height: 280px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .close {
      display: block;
      width: 14px;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      position: absolute;
      top: 14px;
      right: 14px;
    }
    .clickLineBox {
      width: percentage(200 / 275);
      height: 70 * 3px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .clickLine {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(234, 234, 234, 1); /* no */
        i {
          display: block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          color: #fff;
          font-size: 30px;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .clickLine:last-child {
        border: 0;
      }
    }
  }
}
.swiper-box {
  position: relative;
}
.btn360 {
  position: absolute;
  top: 10px;
  right: 11px;
  z-index: 2;
  i {
    display: block;
    font-size: 54px;
  }
  span {
    font-size: 16px;
    position: relative;
    top: -20px;
  }
}
.box360 {
  width: 100%;
  height: 100%;
}
.cpink {
  color: #f29b87;
}
.cgary {
  color: #666;
}
</style>
<style scoped>
.desc-content >>> p,
.desc-content >>> div,
.desc-content >>> img {
  width: 100%;
}
.goDown {
  position: relative;
  top: 80px;
}
</style>
