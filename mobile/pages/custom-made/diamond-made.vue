<template>
  <div class="diamond-made-component">
    <scroll-box @arrivalBottom="arrivalBottom">
      <div v-clickOutSide="closeBoard" class="steps">
        <!--step 1-->
        <div
          :class="['step-begin', { active: active === 1 }, { done: doneBegin }]"
          @click="judgeStep(1)"
        >
          {{ lang.chooseDiamond }}
          <i v-show="doneBegin" class="iconfont icongou"></i>
        </div>
        <!--step 2-->
        <div
          :class="['step-middle', { done: doneFinish }]"
          @click="judgeStep(2)"
        >
          <div :class="['board-top', { 'block-active': active === 2 }]"></div>
          <div
            :class="['board-bottom', { 'block-active': active === 2 }]"
          ></div>
          <div class="middle-content">
            <span v-if="diamondTag === 2">{{ lang.chooseRing }}</span>
            <span v-else-if="diamondTag === 4">{{ lang.chooseNecklace }}</span>
            <span v-else-if="diamondTag === 8">{{ lang.chooseBracelet }}</span>
            <span v-else>{{ lang.chooseMade }}</span>
            <i v-show="doneFinish" class="iconfont icongou"></i>
          </div>
        </div>
        <!--step 3-->
        <div
          :class="[
            'step-finish',
            { active: active === 3 },
            { done: doneFinish }
          ]"
          @click="judgeStep(3)"
        >
          {{ lang.finish }} <i v-show="doneFinish" class="iconfont icongou"></i>
        </div>
        <!--点击弹出层-->
        <div v-show="isBoard" class="down-board">
          <div class="board-img" @click="switchStep">
            <img :src="boardDesc.url" />
          </div>
          <div class="board-content" @click="switchStep">
            <div class="board-title ow-h2">
              {{ boardDesc.title }}
            </div>
            <div class="board-price">{{ boardDesc.price }}</div>
          </div>
          <div class="board-line"></div>
          <i class="iconfont iconzhongzhi" @click="resetStep"></i>
        </div>
      </div>
      <!--组件引入-->
      <router-view v-if="active !== 3" ref="routerView" />
      <!--完成页-->
      <finish
        v-if="active === 3"
        :bd-arr="boardArr"
        @addCart="addCart"
      ></finish>
    </scroll-box>
  </div>
</template>

<script>
import Mixin from './data-transform.js'
export default {
  layout: 'no-footer-bar',
  mixins: [Mixin],
  methods: {
    arrivalBottom() {
      if (this.$refs.routerView.getNextPage) {
        this.$refs.routerView.getNextPage()
      }
    }
  }
}
</script>

<style scoped lang="less">
.diamond-made-component {
  .custom-made-step();
  position: relative;
  width: 100vw;
  height: 100%;
}
</style>
