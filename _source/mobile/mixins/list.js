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
      pageSize: 20,

      canSearchWithoutKeyword: true,
      pageInfo: null,

      requestings: {}, // 正在请求的页码
      listData: {}
    }
  },
  computed: {
    // 所有已请求的页码的数据集合
    showData() {
      const totalPage =
        this.pageInfo && this.pageInfo.totalPage ? this.pageInfo.totalPage : 0
      const listData = this.listData
      let result = []

      if (!totalPage) {
        return result
      }
      for (let n = 1; n < totalPage + 1; n++) {
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
      if (!this.pageInfo || typeof this.pageInfo.totalPage !== 'number') {
        result = false
      } else if (
        Object.keys(this.listData).length ===
          parseInt(this.pageInfo.totalPage) &&
        this.pageInfo.totalCount > 0
      ) {
        result = true
      }
      return result
    },
    // 列表是否无数据
    noListData() {
      return (
        this.pageInfo &&
        this.pageInfo.totalCount === 0 &&
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
        totalCount: 0, // 数据总数量
        pageSize: 10, // 每页数量
        totalPage: null, // 最大页码
        currPage: 0 // 当前页码
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
      let currPage =
        this.pageInfo && this.pageInfo.currPage ? this.pageInfo.currPage : 1
      if (this.pageInfo === null || this.pageInfo.totalPage === null) {
        // 首次请求
        currPage = 1
      } else if (currPage < this.pageInfo.totalPage) {
        currPage++
      } else {
        console.log('已到最后一页')
        return
      }
      console.log('currPage=======>', currPage)
      this.getPageInfo(currPage)
    },
    // 请求当前页数据
    getPageInfo(currPage = 1) {
      const _this = this
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$toast('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${currPage}-${keyword}`

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
          currPage: currPage,
          pageSize: _this.pageSize,
          sortType: _this.sortType,
          sortBy: _this.sortBy
        }
      }

      console.log(`请求页码为：${currPage}`)

      _this
        .$axios({
          method: _this.listMethod,
          url: _this.listUrl,
          headers: Object.assign(options.headers || {}, _this.specialHeaders),
          params: Object.assign(options.params || {}, _this.specialParams),
          data: Object.assign(options.data || {}, _this.specialDatas)
        })
        .then(data => {
          if (data.list) {
            _this.listData[currPage] = JSON.parse(JSON.stringify(data.list))
          }
          // _this.listData[currPage] = JSON.parse(JSON.stringify(data.list || []))
          delete data.list
          _this.setPageInfo(data)
          _this.removeRequesting(reqMark)
        })
        .catch(err => {
          console.error(err)
          if (err instanceof Error) {
            console.log('这是一个错误')
          } else {
            console.log('这是一个错误数据')
          }
          _this.removeRequesting(reqMark)
        })
    },
    clickData(data) {
      this.$emit('clickData', data)
    }
  }
}
