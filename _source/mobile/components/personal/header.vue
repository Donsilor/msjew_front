<template>
  <div class="header">
    <i class="icon iconfont iconfanhuiicon-" @click="back">{{ lang.back }}</i>
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    tips: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.personal
    }
  },
  methods: {
    back() {
      if (this.tips === '1') {
        this.$ConfirmBox({
          title: this.lang.tips,
          message: this.lang.text,
          buttons: [
            {
              text: this.lang.cancel,
              callback: () => {
                console.log('点击了取消')
              }
            },
            {
              text: this.lang.clear,
              callback: () => {
                this.$router.push({
                  name: 'index'
                })
              }
            }
          ]
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 44px;
  background: #ffffff;
  i {
    float: left;
    padding-left: 15px;
    font-size: 14px;
    color: #666666;
    line-height: 44px;
  }
  h4 {
    margin: 0 50px;
    font-size: 16px;
    line-height: 44px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
