export default {
  data() {
    return {
      title: `BDD Co.`
    }
  },
  computed: {
    language() {
      return `language-${this.$store.state.language}`
    }
  },
  watch: {
    // 每次切换路由，滚动到顶部
    $route(val, oldVal) {
      const layoutMain = this.$refs['layout-main']
      if (!layoutMain) {
        return
      }
      layoutMain.scrollTop = 0
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(async () => {
      if (!_this.$store.state.coin || !_this.$store.state.language) {
        _this.$refs['site-switch'].show()
      }

      if (_this.$store.getters.hadLogin) {
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

      // document.body.addEventListener('touchstart', e => {
      //   e.preventDefault()
      //   e.stopPropagation()
      // })
      // document.body.addEventListener('touchmove', e => {
      //   e.preventDefault()
      //   e.stopPropagation()
      // })
    })
  }
}
