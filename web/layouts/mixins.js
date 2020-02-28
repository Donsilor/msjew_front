export default {
    data () {
        return {}
    },
    computed: {
        language () {
            return `language-${this.$store.state.language}`
        }
    },
    watch: {

        // 每次切换路由，滚动到顶部
        $route (val, oldVal) {
            const layoutBox = this.$refs['layout-box']
            if (!layoutBox) {
                return
            }
            layoutBox.scrollTop = 0
        }
    },
    mounted () {
        const _this = this
        _this.$nextTick(async () => {
            if (!_this.$store.state.coin || !_this.$store.state.language) {
            }
            if (_this.$store.getters.hadLogin) {

                // 获取用户数据
                await _this.$store.dispatch('getUserInfo')
                // 同步购物车
                await _this.$store.dispatch('refreshTokenRequst')
                await _this.$store.dispatch('getOnlineCartAmount')
                //  _this.$store.dispatch('getOnlineCartAmount')
                await _this.$store.dispatch('synchronizeCart')
                // 同步心愿单 暂时屏蔽2020-2-28
                //await _this.$store.dispatch('synchronizeWish')
                // 同步对比 暂时屏蔽2020-2-28
                //await _this.$store.dispatch('synchronizeCompared')
            } else {
            }
            // _this.$store.dispatch('getOnlineCartAmount')
            // await _this.$store.dispatch('refreshTokenRequst')
            // 获取心愿单 暂时屏蔽 2020-2-28
            //_this.$store.dispatch('getWish')
            // 获取购物车
            _this.$store.dispatch('getCart')
            // console.log("layout",_this.$store.dispatch('getCart'))
            // 获取对比数据 暂时屏蔽 2020-2-28
            //_this.$store.dispatch('getCompared')
            // 获取当前ip区域设置 
			_this.$store.dispatch('getAreaSetting')

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
