<template>
  <layout :show="active" @onClose="hide">
    <template slot="title">
      <div class="eject-choose-pro-title">
        <div>{{ lang.carat }}</div>
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
        <div class="middle-input">
          <div>
            <input
              ref="ips"
              v-model="inNumStart"
              type="number"
              @blur="watchNum(`start`)"
            />
            <span v-show="opStart" @click="focusAgain(`start`)">
              {{ outNumStart | toFixs }}ct
            </span>
          </div>
          <div>
            <input
              ref="ipe"
              v-model="inNumEnd"
              type="number"
              @blur="watchNum(`end`)"
            />
            <span v-show="opEnd" @click="focusAgain(`end`)">
              {{ outNumEnd | toFixs }}ct
            </span>
          </div>
        </div>
        <div ref="lineWidth" class="middle-bar">
          <div class="line-bg">
            <div class="line"></div>
            <div class="touchLine" @click="touchLine"></div>
          </div>
          <div
            ref="ballLeft"
            class="ball-left"
            :style="[{ left: pbk(outNumStart) + '%' }]"
            @touchstart="touchStart"
          >
            <i class="iconfont iconicon-new-caozonganniuwenli"></i>
          </div>
          <div
            class="cover-left"
            :style="[{ width: pbk(outNumStart) + '%' }]"
          ></div>
          <div
            ref="ballRight"
            class="ball-right"
            :style="[{ right: 100 - pbk(outNumEnd) + '%' }]"
            @touchstart="touchEnd"
          >
            <i class="iconfont iconicon-new-caozonganniuwenli"></i>
          </div>
          <div
            class="cover-right"
            :style="[{ width: 100 - pbk(outNumEnd) + '%' }]"
          ></div>
          <i class="iconfont iconicon-zuanshi small-one"></i>
          <i class="iconfont iconicon-zuanshi big-one"></i>
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
  margin: 20px 0;
  .middle-input {
    width: 255px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    div {
      width: 110px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(187, 187, 187, 1); /*no*/
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      input {
        display: block;
        width: 108px;
        height: 30px;
        line-height: 14px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 8px 5px;
        background: #fff;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 108px;
        height: 30px;
        line-height: 30px;
        background: #fff;
      }
    }
  }
  .middle-bar {
    margin: 54px auto 63px;
    position: relative;
    width: 255-44px;
    height: 8px;
    .iconicon-zuanshi {
      display: block;
      position: absolute;
    }
    .iconicon-zuanshi.small-one {
      left: -50px;
      top: -4px;
      font-size: 16px;
      color: #999;
    }
    .iconicon-zuanshi.big-one {
      right: -60px;
      top: -10px;
      font-size: 28px;
      color: #999;
    }
    .ball-left {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(189, 189, 189, 1); /*no*/
      border-radius: 15px;
      background: white;
      transform: translateX(-95%);
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
      transform: translateX(95%);
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
    .cover-left,
    .cover-right {
      width: 0;
      height: 8px;
      background: rgba(221, 221, 221, 1);
      position: absolute;
      top: 0;
      z-index: 8;
    }
    .cover-left {
      left: 0;
    }
    .cover-right {
      right: 0;
    }
    .line-bg {
      position: relative;
      width: 255-44+20px;
      height: 8px;
      margin-left: -10px;
      background: rgba(221, 221, 221, 1);
      border-radius: 4px;
      overflow: hidden;
      .line {
        width: 255-44px;
        height: 8px;
        margin-left: 10px;
        background: @mcPink;
      }
      .touchLine {
        position: absolute;
        top: 0;
        left: 0;
        width: 255-44+20px;
        height: 8px;
        background: transparent;
        z-index: 9;
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
