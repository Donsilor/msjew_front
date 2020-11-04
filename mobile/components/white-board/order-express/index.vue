<template>
  <layout :show="active" @onClose="hide">
    <template slot="content">
      <div class="addReq">
        <div>{{ lang.expressShit }}</div>
        <div>
          {{ lang.expressShits }}
          <a href="/help-pages/deliveryPolicy" target="_blank">{{
            lang.expressLink
          }}</a>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from '../index.vue'
export default {
  name: 'OrderExpress',
  components: {
    Layout
  },
  data() {
    return {
      lang: this.LANGUAGE.components.whiteBoard,
      active: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //  show box
    show() {
      this.active = true
    },
    //  hide box
    hide() {
      this.active = false
    }
  }
}
</script>

<style scoped lang="less">
.addReq {
  width: 100%;
  /*height: 200px;*/
  box-sizing: border-box;
  padding: 40px;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 18px;
  a {
    color: #f29c88;
  }
}
</style>
