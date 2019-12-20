<template>
  <div class="do-comment">
    <div class="content">
      <div class="operate-bar">
        <i class="icon iconfont iconguanbi close" @click="goBack($router)"></i>
      </div>
      <div class="page-title">
        {{ lang.orderComment }}
      </div>
      <ul>
        <li
          v-for="(detail, index) in info.allDetails"
          :key="index"
          class="product"
        >
          <div class="product-info">
            <div class="left-item">
              <div class="product-image">
                <img :src="detail.image" />
              </div>
              <div v-if="detail.groupType !== 0" class="product-type">
                <span class="item">{{ detail.groupTypeText }}</span>
              </div>
            </div>

            <div class="right-item">
              <!--              单品-->
              <template v-if="detail.groupType === 0">
                <div class="good-item">
                  <h2 class="name ow-h1">
                    {{ detail.goodsName }}
                  </h2>
                  <p class="parameter margin-bottom-15">
                    {{ detail.data[0].detailSpecs }}
                  </p>
                </div>
              </template>

              <!--              对戒-->
              <template v-if="detail.groupType === 1">
                <div class="good-item">
                  <h2 class="name ow-h1">
                    {{ detail.goodsName }}
                  </h2>
                  <p class="parameter margin-bottom-15">
                    {{ detail.data[0].detailSpecs }}
                  </p>
                  <p class="parameter margin-bottom-15">
                    {{ detail.data[1].detailSpecs }}
                  </p>
                </div>
              </template>

              <!--              定制-->
              <template v-if="detail.groupType === 2">
                <div class="good-item">
                  <h2 class="name ow-h1">
                    {{ detail.data[0].goodsName }}
                  </h2>
                  <p class="parameter margin-bottom-15">
                    {{ detail.data[0].detailSpecs }}
                  </p>
                </div>
                <div class="good-item">
                  <h2 class="name ow-h1">
                    {{ detail.data[1].goodsName }}
                  </h2>
                  <p class="parameter margin-bottom-15">
                    {{ detail.data[1].detailSpecs }}
                  </p>
                </div>
              </template>

              <div class="score">
                <span class="title">{{ lang.comment }}：</span>
                <div class="stars">
                  <i
                    v-for="m in 5"
                    :key="m"
                    :class="[
                      'iconfont',
                      'iconxing',
                      { active: m <= detail.commentsLevel }
                    ]"
                    @click="clickStar(index, m)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div class="text-area">
            <textarea
              v-model="detail.commentsDesc"
              cols="40"
              rows="4"
              maxlength="500"
              :placeholder="lang.shareYourFeeling"
            ></textarea>
            <div class="word-count">
              {{
                detail.commentsDesc &&
                detail.commentsDesc.length &&
                detail.commentsDesc.length > 0
                  ? detail.commentsDesc.length + '/'
                  : ''
              }}500
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-group">
        <button class="full-btn submit" @click="submitComment">
          {{ lang.clear }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.personal.doComment,
      info: {},
      commentsDesc: ''
    }
  },
  computed: {
    details() {
      let result = []
      const data = JSON.parse(
        JSON.stringify(this.info.outDetails ? this.info.outDetails : [])
      )
      data.forEach(item => {
        if (item.outOrderDetails && item.outOrderDetails instanceof Array) {
          result = result.concat(this.dealDetailsData(item.outOrderDetails))
        }
        // return item
      })
      console.log('result=======>', result)
      return result
    }
  },
  watch: {
    test(newName, oldName) {
      this.num = newName.length
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getInfo()
    })
  },
  methods: {
    clickStar(index, num) {
      const info = JSON.parse(JSON.stringify(this.info))
      info.allDetails[index].commentsLevel = num
      this.info = info
    },
    payChannelText(payChannel) {
      const map = {
        null: '',
        1: '電匯',
        2: 'paypal',
        3: '微信',
        4: '支付宝',
        5: 'visa/Mastercard',
        6: '銀聯',
        7: 'paydollar'
      }
      return map[payChannel]
    },
    dealDetailsData(details = []) {
      details = JSON.parse(JSON.stringify(details || []))

      // 以joinCartTime为下标，组合对戒和定制
      const groups = {}
      const result = []

      details.map(good => {
        console.log('good=====>', good)
        if (groups.hasOwnProperty(good.joinCartTime)) {
          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')
          groups[good.joinCartTime].data.push(good)
        } else {
          const newGroup = {
            id: `${good.orderId}-${good.joinCartTime}`,
            image: good.goodsImages,
            groupType: good.groupType,
            groupTypeText: this.lang.singleProduct,
            goodsName: good.goodsName
          }

          if ([null, 0, '0'].indexOf(good.groupType) > -1) {
            // 单品
            newGroup.groupType = 0
            newGroup.groupTypeText = this.lang.singleProduct
          }
          if (good.groupType === 1) {
            // 對戒
            newGroup.groupType = 1
            newGroup.groupTypeText = this.lang.pairRing
            newGroup.goodsName = good.ringName || this.lang.defaultPairRing
            newGroup.image = good.ringImg || '/marriage-ring/default.png'
          }
          if (good.groupType === 2) {
            // 定制
            newGroup.groupType = 2
            newGroup.groupTypeText = this.lang.diy
          }

          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')

          newGroup.data = [good]
          newGroup.image = this.imageStrToArray(newGroup.image)[0]

          groups[good.joinCartTime] = newGroup
        }
      })

      // 排序
      let keys = Object.keys(groups)
      keys = keys.sort((a, b) => {
        return b - a
      })
      keys.forEach(item => {
        result.push(groups[item])
      })

      // 删除钻石单品（钻石单品不能评论）
      for (let n = keys.length - 1; n >= 0; n--) {
        if (
          [null, 0, '0'].indexOf(result[n].groupType) > -1 &&
          result[n].data[0].categoryId === 1
        ) {
          // 单品钻石
          result.splice(n, 1)
        }
      }

      // 将定制的商品进行排序，钻石放在后面
      result.map(item => {
        console.log('item====>', item)
        if (item.groupType === 2) {
          // 定制
          const diamond = []
          const pedestal = []
          item.data.forEach(detail => {
            if (detail.categoryId === 1) {
              diamond.push(detail)
            } else {
              pedestal.push(detail)
            }
          })
          item.data = pedestal.concat(diamond)
          item.goodsName = pedestal[0].goodsName
          item.image = this.imageStrToArray(pedestal[0].goodsImages)[0]
        }
        return item
      })

      return result
    },
    getInfo() {
      const _this = this
      _this
        .$axios({
          method: `get`,
          url: `/wap/myOrder/getOrderDetails`,
          params: {
            orderId: _this.$route.query.orderId
          }
        })
        .then(data => {
          console.log('data====>', data)

          if (data.orderStatus !== 5) {
            this.$toast(this.lang.cannotComment)
            setTimeout(() => {
              this.$router.replace({
                name: 'personal-order'
              })
            }, 2000)
            return
          }

          data.orderTime = Moment(data.orderTime).format('YYYY/MM/DD HH:mm:ss')
          data.payChannelText = data.payChannel
            ? _this.payChannelText(data.payChannel)
            : data.orderStatus > 1
            ? this.lang.cableTransfer
            : ''
          data.payTime = data.payTime
            ? Moment(data.payTime).format('YYYY/MM/DD HH:mm:ss')
            : ''

          let allDetails = []
          data.outDetails.forEach(item => {
            if (item.outOrderDetails && item.outOrderDetails instanceof Array) {
              item.outOrderDetails = _this.dealDetailsData(item.outOrderDetails)
              allDetails = allDetails.concat(item.outOrderDetails)
            }
            // return item
          })
          // data.allDetails = allDetails
          data.allDetails = allDetails.map(item => {
            item.commentsLevel = 5
            item.commentsDesc = ''
            return item
          })
          _this.info = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitComment() {
      const allDetails = JSON.parse(JSON.stringify(this.info.allDetails))
      const goodsCommentsModel = []

      allDetails.forEach(group => {
        console.log('group=====>', group)
        group.data.forEach(good => {
          // 商品里面的组成物品
          const addData = {
            goodsDetailsId: good.goodsDetailId,
            goodsId: good.goodsId,
            groupId: good.groupId,
            commentsLevel: group.commentsLevel,
            commentsDesc: group.commentsDesc,
            orderDetailId: good.orderDetailId
          }
          goodsCommentsModel.push(addData)
        })
      })

      this.$axios({
        method: `post`,
        url: `/wap/myOrder/userComments`,
        data: {
          orderId: this.$route.query.orderId,
          goodsCommentsModel: goodsCommentsModel
        }
      })
        .then(data => {
          console.log('data=====>', data)
          this.$toast(this.lang.commentSuccess)
          setTimeout(() => {
            this.$router.replace({
              name: 'personal-order'
            })
          }, 2000)
        })
        .catch(err => {
          this.$toast(`${err.message}`)
        })
    }
  }
}
</script>

<style scoped lang="less">
.content {
  padding: 15px;
  box-sizing: border-box;
}
.operate-bar {
  height: 17px;
  text-align: right;
  margin-bottom: 30px;

  .close {
    font-size: 17px;
    color: #333333;
  }
}
.page-title {
  margin-bottom: 30px;
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.product {
  margin-bottom: 30px;
  .product-info {
    margin-bottom: 17px;
    display: flex;
    .left-item {
      flex-grow: 0;
      flex-shrink: 0;

      .product-image {
        line-height: 0;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .product-type {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        font-size: 0;
        .item {
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(148, 116, 101, 1);
          background: rgba(245, 240, 236, 1);
          border: 1px solid rgba(215, 202, 196, 1);
          border-radius: 2px;
          display: inline-block;
        }
      }
    }
    .right-item {
      flex-grow: 1;
      flex-shrink: 1;
      margin-left: 20px;

      .good-item {
        margin-bottom: 15px;
        /*&:nth-last-of-type(1) {*/
        /*  margin-bottom: 0;*/
        /*}*/
        .name {
          margin-bottom: 7px;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: rgba(51, 51, 51, 1);
          box-sizing: content-box;
        }
        .parameter {
          margin-bottom: 7px;
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: rgba(153, 153, 153, 1);

          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }
      }
      .score {
        display: flex;
        align-items: center;

        .title {
          flex-grow: 1;
          flex-shrink: 1;
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        .stars {
          flex-grow: 0;
          flex-shrink: 0;

          .iconfont {
            font-size: 22px;
            color: #dddddd;
            margin-right: 5px;
            &.active {
              color: #f29b87;
            }
            &:nth-last-of-type(1) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .text-area {
    min-height: 100px;
    background: rgba(244, 244, 244, 1);
    border-radius: 4px;

    textarea {
      width: 100%;
      padding: 16px 14px;
    }
    .word-count {
      padding: 10px;
      text-align: right;
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.btn-group {
  margin: 10px 0;
  .submit {
    /*letter-spacing: 16px;*/
    color: #ffffff;
    background: rgba(51, 51, 51, 1);
    border-radius: 8px;
  }
}
</style>
