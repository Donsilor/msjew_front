<template>
  <section class="popover-content">
    <ul class="shapes">
      <li
        v-for="(item, index) in shapeOptions"
        :key="index"
        :class="['item']"
        @click="changeActiveId(item.id)"
      >
        <div :class="['shape-image', { active: activeId === item.id }]">
          <img :src="item.image" />
        </div>
      </li>
    </ul>
    <h3 class="shape-name">{{ activeShapeInfo.name }}</h3>
    <p class="shape-desc">{{ activeShapeInfo.desc }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      shapeOptions: this.CONDITION_INFO.shape,
      activeId: ''
    }
  },
  computed: {
    activeShapeInfo() {
      let result = {}
      const shapeOptions = this.shapeOptions
      for (let n = 0, length = shapeOptions.length; n < length; n++) {
        if (shapeOptions[n].id === this.activeId) {
          result = shapeOptions[n]
          break
        }
      }
      return result
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.activeId = _this.shapeOptions[0].id
    })
  },
  methods: {
    changeActiveId(id) {
      this.activeId = id
    }
  }
}
</script>

<style lang="less" scoped>
.popover-content {
  width: 420px;
  padding: 40px 5px;

  .shapes {
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: calc(100% / 5);
      margin-bottom: 20px;
      cursor: pointer;

      .shape-image {
        margin: auto;
        padding: 3px;
        width: 56px;
        height: 56px;
        border: 1px solid transparent;
        border-radius: 2px;

        &.active {
          border: 1px solid #ba7f8c;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .shape-name {
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    color: #1b1b1b;
  }
  .shape-desc {
    font-size: 12px;
    color: #333;
  }
}
</style>
