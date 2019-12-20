<template>
  <section class="specs-info">
    <h2 class="section-name">
      {{ $t(`${lang}.specs`) }}
    </h2>
    <div class="specs-item carat">
      <h2 class="title">
        {{ $t(`${lang}.carat`) }}:{{ info.caratWeight }}-{{
          $t(`${lang}.weight`)
        }}
      </h2>
      <div class="carat-list-image">
        <img src="/diamonds/specs-info/carat.png" />
      </div>
      <div class="carat-desc">
        {{ info.caratWeight }}{{ $t(`${lang}.caratWeight`) }}<br />
        {{ $t(`${lang}.tips`) }}
        <span class="arrow" :style="{ left: caratArrowLeft + 'px' }"></span>
      </div>
    </div>
    <div class="specs-item color">
      <h2 class="title">{{ $t(`${lang}.diamondColor`) }}:{{ info.color }}</h2>
      <ul class="color-list">
        <li
          v-for="(item, index) in color"
          :key="index"
          :class="['item', { active: info.color === item.name }]"
        >
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-image">
            <img :src="item.image" />
          </div>
        </li>
      </ul>
      <ul class="rang-list">
        <li class="item">
          <div class="rang-line"></div>
          <div class="rang-name">{{ $t(`${lang}.diamondColor1`) }}</div>
        </li>
        <li class="item">
          <div class="rang-line"></div>
          <div class="rang-name">{{ $t(`${lang}.diamondColor2`) }}</div>
        </li>
        <li class="item">
          <div class="rang-line"></div>
          <div class="rang-name">
            {{ $t(`${lang}.diamondColor3`) }}<br />
            {{ $t(`${lang}.notSell`) }}
          </div>
        </li>
      </ul>
    </div>
    <div class="specs-item cut">
      <h2 class="title">{{ $t(`${lang}.cut`) }}:{{ info.cut }}</h2>
      <div class="cut-list-image">
        <img src="/diamonds/specs-info/cut.png" />
      </div>
      <div class="cut-desc">
        {{ $t(`${lang}.cutTips`) }}
        <span class="arrow" :style="{ left: cutArrowLeft + 'px' }"></span>
      </div>
    </div>
    <div class="specs-item clarity">
      <h2 class="title">{{ $t(`${lang}.clarity`) }}:{{ info.clarity }}</h2>
      <div class="clarity-info">
        <div class="left-info">
          <ul class="clarity-list">
            <li
              v-for="(item, index) in clarity"
              :key="index"
              :class="[
                'item',
                { active: item.ids.indexOf(info.clarityIndex) > -1 }
              ]"
            >
              <span class="item-name">{{ item.name }}</span>
              <div class="item-popover">
                <h2 class="clarity-name">{{ item.name }}</h2>
                <p class="clarity-desc">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="right-info">
          <div class="ten-magnification">
            {{ $t(`${lang}.tenMagnification`) }}
          </div>
          <div class="clarity-image">
            <img :src="activeClarity.image" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const lang = 'detail'
export default {
  props: {
    specs: {
      type: Array,
      required: false,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      lang,
      color: [
        {
          id: 31,
          image: `/diamonds/specs-info/D.png`,
          name: `D`
        },
        {
          id: 32,
          image: `/diamonds/specs-info/E.png`,
          name: `E`
        },
        {
          id: 33,
          image: `/diamonds/specs-info/F.png`,
          name: `F`
        },
        {
          id: 34,
          image: `/diamonds/specs-info/G.png`,
          name: `G`
        },
        {
          id: 35,
          image: `/diamonds/specs-info/H.png`,
          name: `H`
        },
        {
          id: 36,
          image: `/diamonds/specs-info/I.png`,
          name: `I`
        },
        {
          id: 37,
          image: `/diamonds/specs-info/J.png`,
          name: `J`
        },
        {
          id: 'K',
          image: `/diamonds/specs-info/K.png`,
          name: `K`
        },
        {
          id: 'Z',
          image: `/diamonds/specs-info/Z.png`,
          name: `Z`
        }
      ],
      clarity: [
        {
          ids: [44, 45],
          name: 'FL/LF',
          desc: this.$t(`${lang}.clarityTips1`),
          image: `/diamonds/specs-info/FL.png`
        },
        {
          ids: [42, 43],
          name: 'VVS1/VVS2',
          desc: this.$t(`${lang}.clarityTips2`),
          image: `/diamonds/specs-info/VVS1.png`
        },
        {
          ids: [40, 41],
          name: 'VS1/VS2',
          desc: this.$t(`${lang}.clarityTips3`),
          image: `/diamonds/specs-info/VS1.png`
        },
        {
          ids: [38, 39],
          name: 'SI1/SI2',
          desc: this.$t(`${lang}.clarityTips4`),
          image: `/diamonds/specs-info/SI1.png`
        },
        {
          ids: [9999],
          name: 'I1/I2/I3',
          desc: this.$t(`${lang}.clarityTips5`),
          image: `/diamonds/specs-info/SI1.png`
        }
      ]
    }
  },
  computed: {
    info() {
      const showingSpecs = {}
      this.specs.forEach(item => {
        if (item.configId === 31) {
          showingSpecs.caratWeight = item.configAttrVal
        } else if (item.configId === 34) {
          showingSpecs.color = item.configAttrVal
          showingSpecs.colorIndex = item.configAttrId
        } else if (item.configId === 33) {
          showingSpecs.cut = item.configAttrVal
          showingSpecs.cutName = item.configAttrName
          if (item.configAttrId === 30) {
            showingSpecs.cutIndex = 2
          } else if (item.configAttrId === 29) {
            showingSpecs.cutIndex = 3
          } else if (item.configAttrId === 28) {
            showingSpecs.cutIndex = 4
          }
        } else if (item.configId === 35) {
          showingSpecs.clarity = item.configAttrVal
          showingSpecs.clarityName = item.configAttrName
          showingSpecs.clarityIndex = item.configAttrId
        }
      })
      console.log(showingSpecs)
      return showingSpecs
    },
    caratArrowLeft() {
      return (this.info.caratWeight / (0.25 / 2)) * 57
    },
    cutArrowLeft() {
      return this.info.cutIndex * 211 - 105
    },
    activeClarity() {
      const clarityId = this.info.clarityIndex
      const clarity = this.clarity
      let result = {}
      for (let n = 0, length = clarity.length; n < length; n++) {
        if (clarity[n].ids.includes(clarityId)) {
          result = clarity[n]
          break
        }
      }
      return result
    }
  },
  watch: {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.specs-info {
  padding: 50px 30px;
  box-sizing: border-box;

  .section-name {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(27, 27, 27, 1);
  }

  .specs-item {
    width: 1056px;
    margin: auto;
    padding: 41px 0 46px 0;
    border-bottom: 1px solid #eeeeee;

    .title {
      position: relative;
      padding-bottom: 76px;
      text-align: center;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;

      &:after {
        content: ' ';
        position: absolute;
        top: 55px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 54px;
        height: 1px;
        background-color: #aa8a7b;
      }
    }
  }

  .carat {
    .carat-list-image {
      margin: 0 auto 30px auto;
      line-height: 0;
      font-size: 0;

      img {
        width: 100%;
      }
    }

    .carat-desc {
      position: relative;
      width: 912px;
      padding: 8px;
      box-sizing: border-box;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      background: rgba(233, 199, 191, 1);

      .arrow {
        position: absolute;
        top: 0;
        left: 0;
        border: 10px solid transparent;
        border-bottom: 10px solid rgba(233, 199, 191, 1);
        transform: translate(-67px, -100%);
        display: block;
      }
    }
  }

  .color {
    border-bottom: 1px solid transparent;

    .color-list {
      margin-bottom: 30px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        width: 100px;
        flex-grow: 0;
        flex-shrink: 0;
        border: 1px solid transparent;

        &.active {
          border: 1px solid #ba7f8c;
          box-shadow: 0 1px 3px #e2c09f;
        }

        .item-name {
          text-align: center;
          font-size: 18px;
          color: #333;
          padding: 12px 0;
        }

        .item-image {
          line-height: 0;
          font-size: 0;
          text-align: center;

          img {
            width: 71px;
          }
        }
      }
    }

    .rang-list {
      list-style: none;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;

      .item {
        &:nth-of-type(1) {
          width: 340px;
        }
        &:nth-of-type(2) {
          width: 476px;
        }
        &:nth-of-type(3) {
          width: 226px;
        }

        .rang-line {
          height: 20px;
          border: 1px solid #aa8a7b;
          border-top: none;
          margin-bottom: 30px;
        }
        .rang-name {
          font-size: 18px;
          color: #333;
          text-align: center;
          line-height: 26px;
        }
      }
    }
  }

  .cut {
    .cut-list-image {
      margin: 0 auto 30px auto;
      line-height: 0;
      font-size: 0;

      img {
        width: 100%;
      }
    }

    .cut-desc {
      position: relative;
      padding: 8px;
      box-sizing: border-box;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      background: rgba(233, 199, 191, 1);

      .arrow {
        position: absolute;
        top: 0;
        left: 0;
        border: 10px solid transparent;
        border-bottom: 10px solid rgba(233, 199, 191, 1);
        transform: translate(-10px, -100%);
        display: block;
      }
    }
  }

  .clarity {
    border-bottom: 1px solid transparent;

    .clarity-info {
      display: flex;
      align-items: flex-start;

      .left-info {
        flex-grow: 1;
        flex-shrink: 1;

        .clarity-list {
          list-style: none;
          width: 183px;

          .item {
            height: 40px;
            position: relative;
            border: 1px solid rgba(170, 138, 123, 1);
            border-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            &:nth-last-of-type(1) {
              border-bottom: 1px solid rgba(170, 138, 123, 1);
            }

            .item-name {
              font-size: 18px;
              font-family: twCenMT;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }

            .item-popover {
              display: none;
              position: absolute;
              top: 0;
              left: 220px;
              width: 418px;
              padding: 17px;
              box-sizing: border-box;
              background: rgba(233, 199, 191, 1);

              &:before {
                content: ' ';
                position: absolute;
                top: 10px;
                left: 0;
                transform: translate(-100%, 0);
                border: 10px solid transparent;
                border-right: 10px solid rgba(233, 199, 191, 1);
              }

              .clarity-name {
                margin-bottom: 10px;
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }

              .clarity-desc {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }

            &.active {
              height: 60px;
              background-color: #eeeeee;

              .item-popover {
                display: block;
              }
            }
          }
        }
      }

      .right-info {
        flex-grow: 0;
        flex-shrink: 0;
        width: 300px;

        .ten-magnification {
          margin-bottom: 20px;
          text-align: center;
          font-size: 12px;
          font-family: CTHeiTiSF;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }

        .clarity-image {
          line-height: 0;
          font-size: 0;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
