<template>
  <layout :show="active" @onClose="hide">
    <template slot="content">
      <div class="total-box">
        <div class="diamond-choose-list">
          <div
            v-for="(c, index) in content"
            :key="index"
            class="diamond-choose-list-one"
          >
            <div
              :class="['that-box', { active: actIndex === index }]"
              @click="actIndex = index"
            >
              <img :src="c.url" alt="" />
            </div>
          </div>
        </div>
        <div class="diamond-choose-desc">
          <div class="that-title">
            {{ content[actIndex].name }}
          </div>
          <div class="that-desc">
            {{ content[actIndex].desc }}
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  name: 'DiamondChoose',
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
  padding: 40px 22px;
}
.diamond-choose-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .diamond-choose-list-one {
    width: 25%;
    height: 60px;
    margin-bottom: 30px;
    .that-box {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      border-radius: 4px;
      padding: 4px 0;
      border: 1px solid rgba(242, 155, 135, 0); /*no*/
      transition: all 0.2s linear;
      img {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
      }
    }
    .active {
      border: 1px solid rgba(242, 155, 135, 1); /*no*/
    }
  }
}
.that-title {
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  color: rgba(27, 27, 27, 1);
  margin-bottom: 12px;
}
.that-desc {
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 18px;
  text-align: left;
}
</style>
