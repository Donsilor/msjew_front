<template>
  <layout :show="active" @onClose="hide">
    <template slot="content">
      <div class="total-box">
        <span class="ten-times">
          {{ lang.tenTimesMagnification }}
        </span>
        <img :src="content[actIndex].url" class="diamond-details-4c-picture" />
        <div class="triangle-letter">
          <div class="triangle" />
          <div class="letter">
            <div
              v-for="(c, index) in content"
              :key="index"
              :class="{ active: actIndex === index }"
              @click="actIndex = index"
            >
              {{ c.name }}
            </div>
          </div>
        </div>
        <div class="that-desc">
          <span class="mcPink">{{ content[actIndex].name }}:</span>
          <span class="cl666">
            {{ content[actIndex].desc }}
          </span>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  name: 'ColorChoose',
  mixins: [Mixins],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.total-box {
  padding: 40px 0;
  .ten-times {
    margin-top: 5px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .diamond-details-4c-picture {
    display: block;
    width: 200px;
    height: 200px;
    margin: 23-5-14px auto 40px;
  }
  .triangle-letter {
    position: relative;
    width: 330px;
    margin: 0 auto 30px;
    .triangle {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-right: 330/2px solid rgba(244, 244, 244, 1);
      border-bottom: 10px solid rgba(244, 244, 244, 1);
      border-left: 330/2px solid transparent;
    }
    .letter {
      position: absolute;
      top: -4px;
      left: 0;
      width: 330px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 30px;
      div {
        width: 30px;
        height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-radius: 14px;
        text-align: center;
      }
      .active {
        color: #fff;
        background: @mcPink;
      }
    }
  }
  .that-desc {
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 18px;
    min-height: 3 * 18px;
    padding: 0 16px;
    text-align: left;
  }
}
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
</style>
