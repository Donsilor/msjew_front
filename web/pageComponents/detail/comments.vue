<template>
  <section class="comments">
    <h2 class="section-name">
      {{ $t(`${lang}.customerReviews`) }}（{{ totalCount || 0 }}）
    </h2>
    <h3 class="average-score">
      <span class="num">{{ avgLevel }}</span>
      <div class="stars">
        <i
          v-for="n in 5"
          :key="n"
          :class="['iconfont', n <= avgLevel ? 'iconxing' : 'iconxing1']"
        ></i>
      </div>
    </h3>
    <div class="tab">
      <label>
        <input v-model="shouType" type="radio" name="evaType" value="1" />
        <span>{{ $t(`${lang}.allReviews`) }}</span>
      </label>
      <label>
        <input v-model="shouType" type="radio" name="evaType" value="2" />
        <span>{{ $t(`${lang}.fiveStarReviews`) }}</span>
      </label>
    </div>
    <div class="list-data">
      <div v-for="(item, index) in showingData" :key="index" class="item">
        <div class="left-info">
          <p class="comment-desc">{{ item.commentsDesc }}</p>
          <p class="comment-time">{{ item.createTime }}</p>
          <p v-if="item.commentsReplyDesc" class="comment-reply">
            {{ $t(`${lang}.BDDReply`) }}：{{ item.commentsReplyDesc }}
          </p>
        </div>
        <div class="right-info">
          <div class="stars">
            <i
              v-for="n in 5"
              :key="n"
              :class="[
                'iconfont',
                n <= item.commentsLevel ? 'iconxing' : 'iconxing1'
              ]"
            ></i>
          </div>
          <div class="account">{{ showEmail(item.userAccount) }}</div>
        </div>
      </div>
    </div>
    <div v-show="showNextPageButton" class="more-list-data">
      <button
        v-loading="requestingListData"
        class="check-more"
        @click="getNextPage"
      >
        {{ $t(`${lang}.loadingMore`) }}
      </button>
    </div>
    <!--    <no-more-data v-show="noMoreListData"></no-more-data>-->
    <bdd-empty v-show="noListData" :type="'comment'"></bdd-empty>
  </section>
</template>

<script>
import Moment from 'moment'
import Axios from 'axios'
import List from '@/mixins/list.js'
const CancelToken = Axios.CancelToken
const lang = 'detail'
export default {
  mixins: [List],
  props: {
    // 单品时使用
    goodId: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    },
    // 对戒时使用
    groupId: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      lang,
      listMethod: 'get',
      listUrl: '/web/goodsComments/getGoodsComments',
      pageSize: 13,
      // 显示类型(1-所有，2-五星好评)
      shouType: 1,
      avgLevel: 0
    }
  },
  computed: {
    // 处理用于显示的数据
    showingData() {
      const _this = this
      const allData = JSON.parse(JSON.stringify(_this.allData))
      allData.forEach(item => {
        item.createTime = Moment(item.createTime).format('YYYY.MM.DD HH:mm')
      })
      return allData
    }
  },
  watch: {
    shouType(val, oldVal) {
      this.research()
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getAvgLevel()
      _this.research()
    })
  },
  methods: {
    // 获取平均分
    getAvgLevel() {
      this.$axios
        .get(`/web/goodsComments/getAvgLevel`, {
          params: {
            timeSock: new Date().getTime(),
            goodsId: this.goodId,
            groupId: this.groupId
          }
        })
        .then(res => {
          this.avgLevel = res.avgLevel ? res.avgLevel : 5
        })
        .catch(err => {
          console.log(err)
        })
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
        },
        params: {
          goodsId: this.goodId,
          groupId: this.groupId,
          currPage,
          pageSize: this.pageSize,
          shouType: this.shouType
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
    }
  }
}
</script>

<style lang="less" scoped>
.comments {
  position: relative;
  padding: 60px 0 40px 0;
  /*min-height: 550px;*/

  .section-name {
    margin-bottom: 9px;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .average-score {
    margin-bottom: 25px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .num {
      margin-right: 10px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .stars {
      display: flex;
      align-items: center;

      .iconfont {
        margin-right: 6px;
        font-size: 20px;
        color: #f29b87;
      }
    }
  }
  .tab {
    padding: 0 35px;
    height: 60px;
    box-sizing: border-box;
    background: rgba(248, 248, 248, 1);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    label {
      margin-right: 34px;
      input[type='radio'] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
        display: inline-block;
        top: -2px;
        margin-right: 6px;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        border: 1px solid #bbbbbb;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        box-sizing: border-box;
      }
      input[type='radio']:after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        display: block;
        left: 50%;
        top: 50%;
        margin: auto;
        background: #f29b87;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.2s linear;
      }
      input[type='radio']:checked:after {
        transform: translate(-50%, -50%) scale(1);
      }

      span {
        font-size: 14px;
      }
    }
  }
  .list-data {
    .item {
      padding: 30px 30px 20px 30px;
      border-bottom: 1px solid #e6e6e6;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .left-info {
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 0;
        margin-right: 168px;

        .comment-desc {
          margin-bottom: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        .comment-time {
          margin-bottom: 20px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .comment-reply {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(139, 118, 108, 1);
        }
      }
      .right-info {
        flex-grow: 0;
        flex-shrink: 0;
        width: 332px;
        min-width: 0;
        border-left: 1px solid #999;
        padding-left: 78px;

        .stars {
          margin-bottom: 14px;
          display: flex;
          align-items: center;

          .iconfont {
            margin-right: 6px;
            font-size: 20px;
            color: #f29b87;
          }
        }
        .account {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }
}
</style>
