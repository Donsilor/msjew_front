<template>
  <section class="popover-content">
    <div class="active-carat-image">
      <img :src="activeCaratInfo.url" />
    </div>
    <div class="operate">
      <div class="operate-bg"></div>
      <ul class="carats">
        <li
          v-for="(item, index) in caratOptions"
          :key="index"
          :class="['item']"
          @click="changeActiveIndex(index)"
        >
          <div :class="['carat-name', { active: activeIndex === index }]">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <p class="operate-message">{{ $t(`${lang}.caratMessage`) }}</p>
  </section>
</template>

<script>
const lang = 'components.diamondPopovers'
export default {
  data() {
    return {
      lang,
      caratOptions: this.CONDITION_INFO.carat,
      activeIndex: 0
    }
  },
  computed: {
    activeCaratInfo() {
      return this.caratOptions[this.activeIndex]
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
  width: 400px;
  padding: 20px 10px;

  .active-carat-image {
    width: 300px;
    margin: 0 auto 50px auto;

    img {
      width: 100%;
    }
  }

  .operate {
    position: relative;
    width: 356px;
    height: 20px;
    padding-top: 5px;
    margin: 0 auto 20px auto;

    .operate-bg {
      position: relative;
      border-top: 10px solid transparent;
      border-left: 178px solid transparent;
      border-right: 178px solid #f4f4f4;
      border-bottom: 10px solid #f4f4f4;
    }

    .carats {
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

        .carat-name {
          margin: auto;
          cursor: pointer;

          height: 28px;
          width: 28px;
          line-height: 28px;
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

  .operate-message {
    font-size: 12px;
    color: #606266;
    line-height: 1.4;
  }
}
</style>
