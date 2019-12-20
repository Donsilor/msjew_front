<template>
  <layout :show="active" @onClose="hide">
    <template slot="title">
      <div class="eject-choose-pro-title">
        <div>{{ lang.cleaness }}</div>
        <div @click="showHelp">?</div>
      </div>
    </template>
    <template slot="button">
      <div class="button">
        <i class="iconfont iconzhongzhi" @click="resetChoose"></i>
      </div>
    </template>
    <template slot="content">
      <div class="middle">
        <div ref="lineWidth" class="middle-bar">
          <div class="line-bg">
            <div class="touchLine" @click="touchLine"></div>
            <div
              v-for="(o, index) in options"
              ref="singleLine"
              :key="index"
              class="line"
              :style="{
                background:
                  index >= startNum && index < endNum
                    ? 'rgba(242,155,135,1)'
                    : 'rgba(221,221,221,1)'
              }"
            >
              <span
                :style="{
                  color:
                    index >= startNum && index < endNum
                      ? 'rgba(51,51,51,1)'
                      : 'rgba(153,153,153,1)'
                }"
              >
                {{ o.name }}
              </span>
            </div>
          </div>
          <div
            ref="ballLeft"
            class="ball-left"
            :style="[{ left: leftArray[inStartNum] * 100 + '%' }]"
            @touchstart="touchStart"
          >
            <i class="iconfont iconicon-new-caozonganniuwenli"></i>
          </div>
          <div
            ref="ballRight"
            class="ball-right"
            :style="[{ left: leftArray[inEndNum] * 100 + '%' }]"
            @touchstart="touchEnd"
          >
            <i class="iconfont iconicon-new-caozonganniuwenli"></i>
          </div>
        </div>
      </div>
      <div class="button-group" @click="backOption">
        <button class="clear-btn">{{ lang.checkResult }}</button>
      </div>
    </template>
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  mixins: [Mixins]
}
</script>

<style scoped lang="less">
@lineWidth: 375-80px;
.clear-btn {
  width: 345px;
  height: 40px;
  line-height: 40px;
  background: rgba(242, 155, 135, 1);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.middle {
  margin: 0 auto;
  width: @lineWidth;
  .middle-bar {
    margin: 74px 0 53px;
    position: relative;
    width: @lineWidth;
    height: 8px;
    .ball-left {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(189, 189, 189, 1); /*no*/
      border-radius: 15px;
      background: white;
      transform: translateX(-50%);
      position: absolute;
      top: -11px;
      left: 0;
      z-index: 10;
      overflow: hidden;
      i {
        display: block;
        width: 29px;
        height: 29px;
        font-size: 9px;
        line-height: 29px;
        color: rgba(199, 199, 199, 1);
      }
    }
    .ball-right {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(189, 189, 189, 1); /*no*/
      border-radius: 15px;
      background: white;
      transform: translateX(-50%);
      position: absolute;
      top: -11px;
      right: 0;
      z-index: 10;
      overflow: hidden;
      i {
        display: block;
        width: 29px;
        height: 29px;
        font-size: 9px;
        line-height: 29px;
        color: rgba(199, 199, 199, 1);
      }
    }
    .line-bg {
      position: relative;
      width: @lineWidth;
      height: 8px;
      background: rgba(221, 221, 221, 1);
      border-radius: 4px;
      /*overflow: hidden;*/
      display: flex;
      .line {
        flex: 1;
        height: 8px;
        background: @mcPink;
        position: relative;
        border-left: 1px solid #fff; /*no*/
        border-right: 1px solid #fff; /*no*/
        span {
          display: inline-block;
          width: max-content;
          position: absolute;
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          top: -13-11-8px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .line:nth-child(2) {
        border-left: 0;
        border-radius: 4px 0 0 4px;
      }
      .line:last-child {
        border-right: 0;
        border-radius: 0 4px 4px 0;
      }
      .touchLine {
        position: absolute;
        top: 0;
        left: 0;
        width: @lineWidth;
        height: 8px;
        background: transparent;
        z-index: 9;
        border-radius: 4px;
      }
    }
  }
}
.eject-choose-pro-title {
  display: flex;
  align-items: center;
  justify-content: center;
  div:nth-child(1) {
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-right: 3px;
  }
  div:nth-child(2) {
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(242, 155, 135, 1);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
