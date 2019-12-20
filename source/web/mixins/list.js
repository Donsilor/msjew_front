import Axios from 'axios'
const CancelToken = Axios.CancelToken

export default {
  data() {
    return {
      listMethod: 'post',
      listUrl: ``,

      keyword: '', // 搜索关键词
      sortOptions: this.CONDITION_INFO.sortBy.default,
      sortTypeIndex: null,
      pageSize: 10,

      canSearchWithoutKeyword: true,
      pageInfo: null,

      requestings: {}, // 正在请求的页码
      listData: {}
    }
  },
  computed: {
    usingSortInfo() {
      const sortOptions = JSON.parse(JSON.stringify(this.sortOptions))
      const index = this.sortTypeIndex
      const result = sortOptions[index]
        ? sortOptions[index]
        : {
            content: '',
            sortType: '',
            sortBy: ''
          }
      result.index = index
      return result
    },
    // 所有已请求的页码的数据集合
    allData() {
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
      const result = Object.keys(this.requestings).length
      return result > 0
    },
    isDefaultPageInfo() {
      return (
        JSON.stringify(this.defaultPageInfo) === JSON.stringify(this.pageInfo)
      )
    },
    // 是否显示下一页按钮
    showNextPageButton() {
      let result = true
      const pageInfo = this.pageInfo

      if (
        pageInfo &&
        pageInfo.currPage > 0 &&
        pageInfo.currPage >= pageInfo.totalPage
      ) {
        result = false
      }
      return result
    },
    // 没有更多数据了
    noMoreListData() {
      const pageInfo = this.pageInfo

      // console.log(pageInfo)

      if (this.noListData) {
        return false
      }

      if (
        !this.requestingListData &&
        pageInfo &&
        pageInfo.currPage >= pageInfo.totalPage &&
        !this.isDefaultPageInfo
      ) {
        console.log('最后一页了')
        return true
      }
      return false
    },
    // 列表是否无数据
    noListData() {
      return (
        this.pageInfo &&
        this.pageInfo.totalCount === 0 &&
        !this.requestingListData
      )
    },
    totalCount() {
      return this.pageInfo && this.pageInfo.totalCount
        ? this.pageInfo.totalCount
        : 0
      // return this.pageInfo && this.pageInfo.totalCount
      //   ? this.pageInfo.totalCount
      //   : ''
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
    },
    // 下一页码
    nextCurrPageNum() {
      let currPage =
        this.pageInfo && this.pageInfo.currPage ? this.pageInfo.currPage : 1
      if (this.pageInfo === null || this.pageInfo.totalPage === null) {
        // 首次请求
        currPage = 1
      } else if (currPage < this.pageInfo.totalPage) {
        currPage++
      } else {
        console.log('已到最后一页')
        currPage = null
      }
      return currPage
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
    // 改变排序方式，重新搜索
    changeSort(index) {
      this.sortTypeIndex = index
      this.research()
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
      // console.log('添加===>', reqMark, cancel)
      if (this.isRequesting(reqMark)) {
        console.log('重复获取页码数据')
        return
      }
      const requestings = JSON.parse(JSON.stringify(this.requestings))
      requestings[reqMark] = cancel
      this.requestings = requestings
    },
    removeRequesting(reqMark) {
      // console.log('删除===>', reqMark)
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
      if (this.nextCurrPageNum === null) {
        console.log('已到最后一页')
        return
      }
      this.getPageInfo(this.nextCurrPageNum)
    },
    // 请求当前页数据
    getPageInfo(currPage = 1) {
      const _this = this
      const keyword = _this.keyword

      if (!_this.canSearchWithoutKeyword && !keyword) {
        _this.$errorMessage('keyword is required')
        return
      }

      // 此次请求标识
      const reqMark = `${currPage}`
      // const reqMark = `${currPage}-${keyword}`

      if (this.isRequesting(reqMark)) {
        console.log('不重复请求')
        return
      }

      const options = {
        cancelToken: new CancelToken(cancel => {
          _this.addRequesting(reqMark, cancel)
        }),
        data: {
          currPage
        }
      }

      console.log(`请求页码为：${currPage}`)

      _this
        .$axios({
          method: _this.listMethod,
          url: _this.listUrl,
          headers: Object.assign(options.headers || {}, _this.specialHeaders),
          params: Object.assign(options.params || {}, _this.specialParams),
          data: Object.assign(options.data || {}, _this.specialDatas),
          cancelToken: options.cancelToken
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
