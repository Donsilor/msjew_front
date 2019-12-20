<template>
  <layout :show="active" @onClose="hide">
    <template slot="content">
      <div class="addReq">
        <div>{{ lang.texShit }}</div>
        <div>
          {{ lang.texShits }}
          <a href="/help-pages/internationalPolicy" target="_blank">{{
            lang.texLink
          }}</a>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from '../index.vue'
export default {
  name: 'OrderTex',
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
