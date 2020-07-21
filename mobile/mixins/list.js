import Axios from 'axios'
const CancelToken = Axios.CancelToken

export default {
  data() {
    return {
      listMethod: 'post',
      listUrl: ``,

      keyword: '', // 搜索关键词
      sortType: this.CONDITION_INFO.sortBy.default[0].sortType, // 排序1:升2:降3:默认不排序
      sortBy: this.CONDITION_INFO.sortBy.default[0].sortBy, // 排序字段->默认销量
      page_size: 9999,

      canSearchWithoutKeyword: true,
      pageInfo: null,

      requestings: {}, // 正在请求的页码
      listData: {}
    }
  },
  computed: {
    // 所有已请求的页码的数据集合
    showData() {
      if(this.listData.length == 0){
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000);
      }else if(this.listData.length > 0){
        this.loading = false
      }
      const page_count =
        this.pageInfo && this.pageInfo.page_count ? this.pageInfo.page_count : 0
      const listData = this.listData
      let result = []

      if (!page_count) {
        return result
      }
      for (let n = 1; n < page_count + 1; n++) {
        if (!listData.hasOwnProperty(n)) {
          continue
        }
        result = result.concat(listData[n])
      }
      return result
    },
    requestingListData() {
      return Object.keys(this.requestings).length > 0
    },
    // 是否是最后一页
    noMoreListData() {
      let result = false
      if (!this.pageInfo || typeof this.pageInfo.page_count !== 'number') {
        result = false
      } else if (
        Object.keys(this.listData).length ===
          parseInt(this.pageInfo.page_count) &&
        this.pageInfo.total_count > 0
      ) {
        result = true
      }
      return result
    },
    // 列表是否无数据
    noListData() {
      return (
        this.pageInfo &&
        this.pageInfo.total_count === 0 &&
        !this.requestingListData
      )
    },
    // 列表特定header参数
    specialHeaders() {
      return {}
    },
    // 列表特定query参数
    specialParams() {
      return {}
    },
    // 列表特定body参数
    specialDatas() {
      return {}
    }
  },
  methods: {
    defaultPageInfo() {
      return {
        total_count: 0, // 数据总数量
        page_size: 6, // 每页数量
        page_count: null, // 最大页码
        page: 0 // 当前页码
      }
    },
    setPageInfo(info = {}) {
      // console.log('setPageInfo============>', JSON.stringify(info))
      this.pageInfo = JSON.parse(JSON.stringify(info))
    },
    // 检查是否在请求中
    isRequesting(reqMark) {
      return this.requestings.hasOwnProperty(reqMark)
    },
    addRequesting(reqMark, cancel) {
      if (this.isRequesting(reqMark)) {
        return
      }
      const requestings = JSON.parse(JSON.stringify(this.requestings))
      requestings[reqMark] = cancel
      this.requestings = requestings
    },
    removeRequesting(reqMark) {
      const requestings = JSON.parse(JSON.stringify(this.requestings))
      if (!this.isRequesting(reqMark)) {
        return
      }
      if (requestings.hasOwnProperty(reqMark)) {
        if (typeof requestings[reqMark] === 'function') {
          requestings[reqMark]()
          console.log('执行中止请求')
        }
        delete requestings[reqMark]
      }
      this.requestings = requestings
    },
    // 重新搜索
    research() {
      this.setPageInfo(this.defaultPageInfo())
      this.listData = {}

      const requestings = this.requestings
      for (const n in requestings) {
        if (
          requestings.hasOwnProperty(n) &&
          typeof requestings[n] === 'function'
        ) {
          requestings[n]()
        }
      }
      this.requestings = {}
      this.getNextPage()
    },
    getNextPage() {
      // console.log("page",this.pageInfo,page)
      let page =
        this.pageInfo && this.pageInfo.page ? this.pageInfo.page : 1
      if (this.pageInfo === null || this.pageInfo.page_count === null) {
        // 首次请求
        page = 1
      } else if (page < this.pageInfo.page_count) {
        page++
      } else {
        console.log('已到最后一页')
        return
      }
      // console.log('page=======>', page)
      this.getPageInfo(page)
    },
    // 请求当前页数据
    getPageInfo(page = 1) {
      const _this = this
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$toast('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${page}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        params: {
          keyword: keyword,
          page: page,
          page_size: _this.page_size,
          sortType: _this.sortType,
          sortBy: _this.sortBy
        }
      }

      //console.log(`请求页码为：${page}`)
      _this
        .$axios({
          method: _this.listMethod,
          url: _this.listUrl,
          headers: Object.assign(options.headers || {}, _this.specialHeaders),
          params: Object.assign(options.params || {}, _this.specialParams),
          data: Object.assign(options.data || {}, _this.specialDatas)
        })
        .then(res => {
          _this.$nuxt.$loading.finish()
          if (res.data) {
            _this.listData[page] = JSON.parse(JSON.stringify(res.data))
          }
          // _this.listData[page] = JSON.parse(JSON.stringify(res.data || []))
          // delete res.data
          _this.setPageInfo(res)
          _this.removeRequesting(reqMark)
        })
        .catch(err => {
          // console.error(err)
          if (err instanceof Error) {
            // console.log('这是一个错误')
          } else {
            // console.log('这是一个错误数据')
          }
          _this.removeRequesting(reqMark)
        })
    },
    clickData(data) {
      this.$emit('clickData', data)
    }
  }
}
