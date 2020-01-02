<template>
  <div
    v-show="boxShow"
    class="messageBox">
    <div class="msgBg">
      <div class="msgBox">
        <div class="title">{{ title }}</div>
        <div class="content">
          <div v-html="message" />
        </div>
        <div
          v-if="type==='two'"
          class="btn-two">
          <div
            class="btn-sure"
            @click="sure();boxShow = false;">{{ sureMsg }}</div>
          <div
            class="btn-cancel"
            @click="cancel();boxShow = false">{{ cancelMsg }}</div>
        </div>
        <div
          v-if="type==='one'"
          class="btn-one">
          <div @click="done">{{ doneMsg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    title: {
      type: [String],
      default: function () {
        return '';
      }
    },
    message: {
      type: [String],
      default: function () {
        return '';
      }
    },
    type: {
      type: [String],
      default: function () {
        return 'one';
      }
    },
    sureMsg: {
      type: [String],
      default: function () {
        return this.$LANGUAGE.components.messageBox.sure;
      }
    },
    cancelMsg: {
      type: [String],
      default: function () {
        return this.$LANGUAGE.components.messageBox.cancel;
      }
    },
    doneMsg: {
      type: [String],
      default: function () {
        return this.$LANGUAGE.components.messageBox.sure;
      }
    }
  },
  data() {
    return {
      boxShow: false
    };
  },
  methods: {
    boxShowUp() {
      this.boxShow = true;
    },
    cancel() {
      this.$emit('cancel', {});
    },
    sure() {
      this.$emit('sure', {});
    },
    done() {
      this.$emit('done', {});
    }
  }
};
</script>

<style scoped lang="less">
.messageBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  .msgBg {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    .msgBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width:480px;
      background:rgba(255,255,255,1);
      .title {
        width:480px;
        height:50px;
        background:rgba(248,240,240,1);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;color: #333;
        font-size: 18px;
        line-height: 50px;
      }
      .content {
        width: 480px;
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 370px;
          line-height: 30px;
          color: #666;
          font-size: 14px;
          text-align: center;
        }
      }
      .btn-two {
        width: 160+160+40px;
        margin: 20px auto 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          width:160px;
          height:40px;
          line-height: 40px;
          border:1px solid rgba(139,118,108,1);
          text-align: center;
          cursor: pointer;
          color: #fff;
          background:rgba(139,118,108,1);
          font-size: 14px;
        }
        div:nth-child(2) {
          background-color: #FFFFFF;
          color: #8B766C;
        }
      }
      .btn-one {
        width:160px;
        height:40px;
        line-height: 40px;
        border:1px solid rgba(139,118,108,1);
        text-align: center;
        cursor: pointer;
        background-color: #FFFFFF;
        color: #8B766C;
        font-size: 14px;
        margin: 20px auto 48px;
      }
    }
  }
}
</style>
