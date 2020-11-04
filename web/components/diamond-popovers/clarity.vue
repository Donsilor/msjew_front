<template>
  <section class="popover-content">
    <div class="active-clarity-image">
      <img :src="activeClarityInfo.url" />
    </div>
    <div class="operate">
      <div class="operate-bg"></div>
      <ul class="claritys">
        <li
          v-for="(item, index) in clarityOptions"
          :key="index"
          :class="['item']"
          @click="changeActiveIndex(index)"
        >
          <div :class="['clarity-name', { active: activeIndex === index }]">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <p class="clarity-desc">
      <span class="active-name">{{ activeClarityInfo.name }}:</span>
      {{ activeClarityInfo.desc }}
    </p>
  </section>
</template>

<script>
const lang = 'components.diamondPopovers'
export default {
  data() {
    return {
      lang,
      clarityOptions: this.CONDITION_INFO.clarity,
      activeIndex: 0
    }
  },
  computed: {
    activeClarityInfo() {
      return this.clarityOptions[this.activeIndex]
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    changeActiveIndex(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.popover-content {
  width: 420px;
  padding: 20px 10px;

  .active-clarity-image {
    width: 160px;
    margin: 0 auto 50px auto;

    img {
      width: 100%;
    }
  }

  .operate {
    position: relative;
    width: 380px;
    height: 20px;
    padding-top: 5px;
    margin: 0 auto 20px auto;

    .operate-bg {
      position: relative;
      border-top: 10px solid transparent;
      border-left: 190px solid transparent;
      border-right: 190px solid #f4f4f4;
      border-bottom: 10px solid #f4f4f4;
    }

    .claritys {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      list-style: none;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;

      .item {
        width: calc(100% / 8);

        .clarity-name {
          margin: auto;
          cursor: pointer;

          height: 34px;
          width: 34px;
          line-height: 34px;
          border-radius: 50%;
          font-size: 12px;
          text-align: center;
          overflow: hidden;

          &.active {
            color: #fff;
            background: linear-gradient(90deg, #eabac4, #d7889b 97%);
          }
        }
      }
    }
  }

  .clarity-desc {
    font-size: 12px;
    color: #606266;
    line-height: 1.4;

    .active-name {
      margin-right: 5px;
      color: #aa8a7b;
    }
  }
}
</style>
