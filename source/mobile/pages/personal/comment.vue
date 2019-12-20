<template>
  <div class="comment">
    <Header :title="lang.myComment" />
    <div class="content">
      <ul>
        <li
          v-for="(each, index) in commentList"
          :key="index"
          @click="toDetail(each)"
        >
          <div class="top clearboth">
            <span class="time">{{ each.createTime }}</span>
            <div class="stars">
              <i
                v-for="level in 5"
                :key="level"
                :class="[
                  'icon',
                  'iconfont',
                  'iconxing',
                  { activeicon: level <= each.commentsLevel }
                ]"
              ></i>
            </div>
          </div>
          <div class="mod">
            <div class="item-image">
              <img :src="each.image" />
              <div
                v-if="[1, 2, '1', '2'].indexOf(each.groupType) > -1"
                class="good-type"
              >
                {{ each.groupTypeText }}
              </div>
            </div>
            <div class="item-info">
              <!--              对戒1-->
              <template v-if="each.groupType === 1">
                <div>
                  <h4 class="good-name">
                    {{ each.goodsName }}
                  </h4>
                  <div
                    v-for="(good, n) in each.data"
                    :key="n"
                    class="good-params"
                  >
                    <h5 class="params-item">SKU：{{ good.code }}</h5>
                    <h5 class="params-item">
                      {{ good.detailSpace }}
                    </h5>
                  </div>
                </div>
              </template>

              <!--              定制-->
              <template v-else-if="each.groupType === 2">
                <div v-for="(good, n) in each.data" :key="n">
                  <h4 class="good-name">
                    {{ good.goodsName }}
                  </h4>
                  <div class="good-params">
                    <h5 class="params-item">
                      {{ good.detailSpace }}
                    </h5>
                  </div>
                </div>
              </template>

              <!--              单品-->
              <template v-else>
                <div>
                  <h4 class="good-name">
                    {{ each.data[0].goodsName }}
                  </h4>
                  <div class="good-params">
                    <h5 class="params-item">
                      {{ each.data[0].detailSpace }}
                    </h5>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!--          <p :class="['p-comment', { 'ow-h3': !isActiveComment(each.id) }]">-->
          <p :class="['p-comment']">
            {{ each.commentsDesc }}
          </p>
          <!--          <button @click="showComment(each.id)">-->
          <!--            {{ isActiveComment(each.id) ? lang.shrink : lang.allComment }}-->
          <!--          </button>-->
          <div v-if="each.commentsReplyDesc" class="service">
            <img src="~/static/personal/wrap.png" />
            [{{ lang.commentsReply }}] {{ each.commentsReplyDesc }}
          </div>
        </li>
      </ul>
      <bdd-empty
        v-if="noListData"
        :type="'comment'"
        @toShopping="toShopping"
      ></bdd-empty>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import List from '@/mixins/list.js'
import Header from '@/components/personal/header.vue'
export default {
  name: 'Comment',
  layout: 'no-footer-bar',
  components: {
    Header
  },
  mixins: [List],
  data() {
    return {
      lang: this.LANGUAGE.personal.comment,
      listMethod: 'get',
      listUrl: '/wap/myComments/getUserComments',
      pageSize: 9999,

      activeComments: []
    }
  },
  computed: {
    commentList() {
      const data = JSON.parse(JSON.stringify(this.showData))
      const result = []
      const groups = {}

      data.forEach(item => {
        if (groups.hasOwnProperty(item.joinCartTime)) {
          // 将数据处理为直接可用的数据
          item.detailSpace = JSON.parse(item.detailSpace || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')
          if (!groups[item.joinCartTime].commentsReplyDesc) {
            groups[item.joinCartTime].commentsReplyDesc =
              item.goodsCommentsEntity &&
              item.goodsCommentsEntity.commentsReplyDesc
                ? item.goodsCommentsEntity.commentsReplyDesc
                : ''
          }
          groups[item.joinCartTime].data.push(item)
        } else {
          let newGroup = {
            id: `${item.orderId}-${item.joinCartTime}`,
            image: item.goodsImage,
            groupType: item.groupType,
            groupTypeText: this.lang.singleProduct,
            goodsName: item.goodsName,
            commentsDesc:
              item.goodsCommentsEntity && item.goodsCommentsEntity.commentsDesc
                ? item.goodsCommentsEntity.commentsDesc
                : this.lang.none,
            commentsReplyDesc:
              item.goodsCommentsEntity &&
              item.goodsCommentsEntity.commentsReplyDesc
                ? item.goodsCommentsEntity.commentsReplyDesc
                : ''
          }

          if ([null, 0, '0'].indexOf(item.groupType) > -1) {
            // 单品
            newGroup.image = item.goodsImage
            newGroup.groupType = item.groupType
          }
          if (item.groupType === 1 && item.goodsRingModelList) {
            // 對戒
            newGroup.groupTypeText = this.lang.pairRing
            newGroup.goodsName = item.goodsRingModelList.name
            newGroup.image = item.goodsRingModelList.ringImg
          }
          if (item.groupType === 2) {
            // 定制
            newGroup.groupTypeText = this.lang.diy
          }

          // 设置分组的创建时间和评分
          if (item.goodsCommentsEntity) {
            newGroup = Object.assign(newGroup, {
              createTimestamp: item.goodsCommentsEntity.createTime,
              createTime: Moment(item.goodsCommentsEntity.createTime).format(
                'YYYY.MM.DD'
              ),
              commentsLevel: item.goodsCommentsEntity.commentsLevel
            })
          } else {
            newGroup = Object.assign(newGroup, {
              createTime: '',
              commentsLevel: 0
            })
          }

          // 将数据处理为直接可用的数据
          item.detailSpace = JSON.parse(item.detailSpace || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')

          newGroup.data = [item]
          newGroup.image = this.imageStrToArray(newGroup.image)[0]

          groups[item.joinCartTime] = newGroup
        }
      })

      let keys = Object.keys(groups)
      keys = keys.sort((a, b) => {
        return groups[b].createTimestamp - groups[a].createTimestamp
      })
      keys.forEach(item => {
        result.push(groups[item])
      })

      // 将定制的商品进行排序，钻石放在后面
      result.map(item => {
        if (item.groupType === 2) {
          // 定制
          const diamond = []
          const pedestal = []
          item.data.forEach(detail => {
            if (detail.purposeEntiy.categoryId === 1) {
              diamond.push(detail)
            } else {
              pedestal.push(detail)
            }
          })
          item.data = pedestal.concat(diamond)
          item.goodsName = pedestal[0].goodsName
          item.image = this.imageStrToArray(pedestal[0].goodsImage)[0]
        }
        return item
      })

      return result
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.research()
    })
  },
  methods: {
    isActiveComment(id) {
      return this.activeComments.indexOf(id) > -1
    },
    showComment(id) {
      const activeComments = JSON.parse(JSON.stringify(this.activeComments))
      const start = activeComments.indexOf(id)
      if (start > -1) {
        activeComments.splice(start, 1)
      } else {
        activeComments.push(id)
      }
      this.activeComments = activeComments
    },
    toShopping() {
      this.$router.push({
        name: 'index'
      })
    },
    switchName(i) {
      const num = parseInt(i)
      switch (num) {
        case 1:
          return `diamond`
        case 2:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    toDetail(info) {
      // console.log('info====>', info)

      // info.data[0].purposeEntiy = {
      //   categoryId: 2,
      //   configAttrId: 59
      // }

      let routerName = ''
      let routerQuery = {}

      if ([null, 0, ''].indexOf(info.groupType) > -1) {
        console.log('单品')

        const goodId = info.data[0].goodsId
        const ringRouter = configAttrId => {
          if (configAttrId === 60) {
            // 訂婚戒指
            routerName = 'engagement-engagement-rings'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 461 || configAttrId === 462) {
            // 男女戒
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 59) {
            // 結婚戒指
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 61) {
            // 裝飾戒指
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          console.log('都不是-')
        }

        switch (info.data[0].purposeEntiy.categoryId) {
          case 1:
            // 钻石
            routerName = 'diamond-diamonds'
            routerQuery = {
              goodId: goodId
            }
            break
          case 2:
            // 戒指
            ringRouter(info.data[0].purposeEntiy.configAttrId)
            break
          case 3:
            // 珠宝饰品
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 4:
            // 项链
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 5:
            // 吊坠
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 6:
            // 耳钉
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 7:
            // 耳环
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 8:
            // 手链
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 9:
            // 手镯
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
        }
      }
      if ([1].indexOf(info.groupType) > -1) {
        console.log('对戒')
        routerName = 'marriage-ring-pair-ring-detail'
        routerQuery = {
          ringId: info.data[0].goodsRingModelList.id
        }
      }
      if ([2].indexOf(info.groupType) > -1) {
        console.log('定制')
        const obj = {
          steps: [
            {
              goodsId: info.data[0].goodsId,
              goodsDetailsId: null,
              ct: info.data[0].purposeEntiy.categoryId,
              cartId: ``,
              page: `detail`
            },
            {
              goodsId: null,
              goodsDetailsId: null,
              ct: null,
              cartId: ``,
              page: `list`
            }
          ]
        }

        const typeName = this.switchName(info.data[0].purposeEntiy.categoryId)
        routerName = `custom-made-${typeName}-made-${typeName}-detail`
        routerQuery = {
          melo: this.$helpers.base64Encode(JSON.stringify(obj)),
          step: 1,
          goodId: info.data[0].goodsId
        }
      }

      this.$router.push({
        name: routerName,
        query: routerQuery
      })
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .content {
    ul {
      li {
        border-top: 8px solid #efefef;
        padding: 15px;
        text-align: left;
        background-color: #ffffff;
        .top {
          .time {
            float: left;
            font-size: 14px;
            /*font-family: SFProText-Regular;*/
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          .stars {
            float: right;
            .iconxing {
              font-size: 14px;
              color: #cccccc;
            }
            .activeicon {
              color: #f29b87;
            }
          }
        }
        .mod {
          position: relative;
          margin-top: 20px;
          width: 100%;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
          display: flex;
          align-items: flex-start;

          .item-image {
            flex-grow: 0;
            flex-shrink: 0;
            width: 110px;
            line-height: 0;
            font-size: 0;
            text-align: center;
            img {
              width: 70px;
              height: 70px;
              margin: 0 20px;
            }
            .good-type {
              margin: 0px auto 0 auto;
              display: inline-block;
              height: 18px;
              padding: 0 4px;
              background: rgba(245, 240, 236, 1);
              border: 1px solid rgba(215, 202, 196, 1);
              border-radius: 2px;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              font-weight: 400;
              color: rgba(148, 116, 101, 1);
            }
          }
          .item-info {
            flex-grow: 0;
            flex-shrink: 0;
            position: relative;
            width: calc(100% - 90px);
            .good-name {
              width: 100%;
              margin-bottom: 5px;
              text-align: left;
              font-size: 14px;
              line-height: 18px;
              height: 18px;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .good-params {
              width: 100%;
              margin: 0 0 14px 0;
              .params-item {
                text-align: left;
                font-size: 12px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 20px;
              }
            }
          }
        }
        button {
          width: 58px;
          height: 14px;
          margin-top: 8px;
          font-size: 14px;
          line-height: 14px;
          font-weight: 400;
          text-decoration: underline;
          color: rgba(242, 155, 135, 1);
        }
        .p-comment {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          text-align: left;
          margin: 10px 0 2px;
        }
        .service {
          position: relative;
          width: 100%;
          /*min-height: 76px;*/
          padding: 18px 12px;
          margin-top: 12px;
          background: rgba(248, 244, 241, 1);
          border-radius: 5px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(148, 116, 101, 1);
          line-height: 20px;
          img {
            position: absolute;
            top: -8px;
            left: 20px;
            width: 16px;
            height: 8px;
          }
        }
      }
      li:first-child {
        border-top: 1px solid #efefef;
      }
    }
  }
}
</style>
