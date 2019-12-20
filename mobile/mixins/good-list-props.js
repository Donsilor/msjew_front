export default {
  data() {
    return {
      listMethod: 'post',
      listUrl: `/wap/goods/searchGoods`,

      categoryId: '', // 商品类别ID(-1表示所有)
      sortType: this.CONDITION_INFO.sortBy.default[0].sortType, // 排序1:升2:降3:默认不排序
      sortBy: this.CONDITION_INFO.sortBy.default[0].sortBy, // 排序字段->默认销量
      ev: '' // 动态参数值串
    }
  },
  computed: {
    // 列表特定header参数
    specialHeaders() {
      return {}
    },
    // 列表特定query参数
    specialParams() {
      return {
        categoryId: this.categoryId,
        selectGoodsId: this.selectGoodsId || ``,
        similarGoodsId: this.similarGoodsId || ``,
        ev: this.ev
      }
    },
    // 列表特定body参数
    specialDatas() {
      return {}
    }
  },
  methods: {}
}
