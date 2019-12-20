<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <div class="slide-tab noScrollBar">
        <div class="slider-window">
          <div
            v-for="(s, index) in sliders"
            :key="index"
            :class="['slider-one', { active: actIndex === index }]"
            @click="actIndex = index"
          >
            {{ s.content }}
            <div v-show="actIndex === index" class="slider-bar"></div>
          </div>
        </div>
      </div>
      <data-list
        ref="data-list"
        :send-cod="sliders[actIndex].cod"
        :active-index="actIndex"
        @clickData="clickData"
      ></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './list-body.vue'
export default {
  name: 'List',
  layout: `no-footer-bar`,
  components: {
    DataList
  },
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      sliders: [
        {
          content: this.LANGUAGE.listCommons.sliders[0],
          cod: this.CONDITION_INFO.quality.necklace
        },
        {
          content: this.LANGUAGE.listCommons.sliders[1],
          cod: this.CONDITION_INFO.quality.pendant
        },
        {
          content: this.LANGUAGE.listCommons.sliders[2],
          cod: this.CONDITION_INFO.quality.studEarring
        },
        {
          content: this.LANGUAGE.listCommons.sliders[3],
          cod: this.CONDITION_INFO.quality.earring
        },
        {
          content: this.LANGUAGE.listCommons.sliders[4],
          cod: this.CONDITION_INFO.quality.BraceletLine
        },
        {
          content: this.LANGUAGE.listCommons.sliders[5],
          cod: this.CONDITION_INFO.quality.bracelet
        }
      ],
      actIndex: 0
    }
  },
  asyncData(route) {
    return {
      actIndex: route.query.actIndex ? parseFloat(route.query.actIndex) : 0
    }
  },
  mounted() {
    if (this.$route.query.actIndex) {
      this.actIndex = parseFloat(this.$route.query.actIndex)
    }
  },
  methods: {
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      this.$router.push({
        name: 'accessories-accessories',
        query: {
          goodId: data.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  .slide-tab {
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid rgba(221, 221, 221, 1); /*no*/
    overflow-x: scroll;
    background: white;
    .slider-window {
      width: max-content;
      height: 49px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      .slider-one {
        position: relative;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-right: 56px;
        .slider-bar {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 33px;
          height: 4px;
          background: rgba(242, 155, 135, 1);
          border-radius: 2px;
        }
      }
      .slider-one.active {
        color: rgba(51, 51, 51, 1);
      }
      .slider-one:last-child {
        margin-right: 0;
      }
    }
  }
  .noScrollBar {
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
