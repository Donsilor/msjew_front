<template>
  <section class="popover-content">
    <div class="active-color-image">
      <img :src="activeColorInfo.url" />
    </div>
    <div class="operate">
      <div class="operate-bg"></div>
      <ul class="colors">
        <li
          v-for="(item, index) in colorOptions"
          :key="index"
          :class="['item']"
          @click="changeActiveIndex(index)"
        >
          <div :class="['color-name', { active: activeIndex === index }]">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <p class="color-desc">
      <span class="active-name">{{ activeColorInfo.name }}:</span>
      {{ activeColorInfo.desc }}
    </p>
  </section>
</template>

<script>
const lang = 'components.diamondPopovers'
export default {
  data() {
    return {
      lang,
      colorOptions: this.CONDITION_INFO.color,
      activeIndex: 0
    }
  },
  computed: {
    activeColorInfo() {
      return this.colorOptions[this.activeIndex]
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
  width: 320px;
  padding: 20px 10px;

  .active-color-image {
    width: 160px;
    margin: 0 auto 50px auto;

    img {
      width: 100%;
    }
  }

  .operate {
    position: relative;
    width: 276px;
    height: 20px;
    padding-top: 3px;
    margin: 0 auto 20px auto;

    .operate-bg {
      position: relative;
      border-top: 10px solid transparent;
      border-left: 138px solid transparent;
      border-right: 138px solid #f4f4f4;
      border-bottom: 10px solid #f4f4f4;
    }

    .colors {
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
        width: calc(100% / 7);

        .color-name {
          margin: auto;
          cursor: pointer;

          height: 24px;
          width: 24px;
          line-height: 24px;
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

  .color-desc {
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
