export default {
  data() {
    return {}
  },
  computed: {
    language() {
      return `language-${this.$store.state.language}`
    }
  },
  watch: {
    // 每次切换路由，滚动到顶部
    $route(val, oldVal) {
      const layoutBox = this.$refs['layout-box']
      if (!layoutBox) {
        return
      }
      layoutBox.scrollTop = 0
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(async () => {
      if (!_this.$store.state.coin || !_this.$store.state.language) {
      }

      if (_this.$store.getters.hadLogin) {
        // 获取用户数据
        await _this.$store.dispatch('getUserInfo')
        // 同步购物车
        await _this.$store.dispatch('synchronizeCart')
        // 同步心愿单
        await _this.$store.dispatch('synchronizeWish')
        // 同步对比
        await _this.$store.dispatch('synchronizeCompared')
      } else {
      }
      // 获取心愿单
      _this.$store.dispatch('getWish')
      // 获取购物车
      _this.$store.dispatch('getCart')
      // 获取对比数据
      _this.$store.dispatch('getCompared')

      // _this
      //   .$axios({
      //     method: `get`,
      //     url: `/web/WebsiteSeo/webSetlist`
      //   })
      //   .then(res => {
      //     console.log(`head title=========>`)
      //     console.log(res[0].name)
      //     this.title = res[0].name
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    })
  }
}
