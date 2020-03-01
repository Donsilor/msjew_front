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
            //根据IP设置 默认地区，语言，货币
            _this.$store.dispatch('localAreaSetting')
            //语言弹窗 选择
            if (!_this.$store.state.coin || !_this.$store.state.language) {
            }
            if (_this.$store.getters.hadLogin) {

                // 获取用户数据
                await _this.$store.dispatch('getUserInfo')
                // 同步购物车
                await _this.$store.dispatch('')
                await _this.$store.dispatch('getOnlineCartAmount')
                //  _this.$store.dispatch('getOnlineCartAmount')
                await _this.$store.dispatch('synchronizeCart')
                // 同步心愿单 暂时屏蔽2020-2-28
                //await _this.$store.dispatch('synchronizeWish')
                // 同步对比 暂时屏蔽2020-2-28
                //await _this.$store.dispatch('synchronizeCompared')
            }
            // _this.$store.dispatch('getOnlineCartAmount')
            // 获取心愿单 暂时屏蔽 2020-2-28
            //_this.$store.dispatch('getWish')
            // 获取购物车
            _this.$store.dispatch('getCart')
            // 获取对比数据 暂时屏蔽 2020-2-28
            //_this.$store.dispatch('getCompared')            
            
        })
    }
}
