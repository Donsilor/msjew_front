<template>
  <div class="comment">
    <div class="header-title">
      <img src="../../../../static/images/personal/comment.png" >
      <h3>{{ lang.myComment }}</h3>
    </div>
    <div class="content">
      <!--内容标题-->
      <div class="content-title">
        <div>{{ lang.commentContent }}</div>
        <div>{{ lang.productDetail }}</div>
      </div>

      <Empty
        v-if="emptyList"
        type="5"/>

      <!--内容-->
      <div
        v-loading="isloading"
        class="comment-content">
        <!--评论块-->
        <div
          v-for="(data,index) in commentList"
          :key="index"
          class="comment-block">
          <div class="comments">
            <div class="star-time">
              <div class="star">
                <i
                  v-for="indexs in 5"
                  :key="indexs"
                  :class="[{'iconxing': indexs>data.commentsLevel?false:true},{'iconxing1': indexs>data.commentsLevel?true:false}]"
                  class="iconfont"/>
              </div>
              <div class="time">
                {{ data.createTime }}
              </div>
            </div>
            <div
              class="comment-title"
              hidden>
              {{ lang.goodForYou }}
            </div>
            <div class="comment-word">
              {{ data.commentsDesc }}
            </div>
            <!--<div class="comment-img">-->
            <!--<img src="../../../../static/images/index/many-m-2.png" alt="" v-for="indexk in 5" :key="indexk">-->
            <!--</div>-->
            <div
              v-show="data.commentsReplyDesc"
              class="comment-response">
              {{ lang.BDDReply }}：{{ data.commentsReplyDesc }}
            </div>
            <div
              class="comment-connect"
              hidden>
              {{ lang.BDDCustomerService }}
            </div>
          </div>
          <div class="info">
            <div
              v-for="good in data.data"
              class="info-block">
              <div
                class="info-img"
                @click="jumpDetail(good)">
                <img
                  :src="$imageStrToArray(good.goodsImage)[0]"
                  alt="">
              </div>
              <div
                class="info-content"
                @click="jumpDetail(good)">
                <div class="info-title">{{ good.goodsName }}</div>
                <div class="info-sku">SKU: {{ good.code || '' }}</div>
                <div class="infos">
                  <div v-for="specs in good.detailSpace">
                    {{ specs.name }}： {{ specs.value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
import Empty from '@/components/empty.vue';
export default {
  name: 'Comment',
  components: { Empty },
  data() {
    return {
      lang: this.$LANGUAGE.personal.comment,
      isloading: true,
      info: []
    };
  },
  computed: {
    emptyList() {
      if (this.isloading) {
        return false;
      }
      if (this.info.length > 0) {
        return false;
      }
      return true;
    },
    commentList() {
      const data = JSON.parse(JSON.stringify(this.info));
      const result = [];
      const groups = {};

      data.forEach(item => {
        if (groups.hasOwnProperty(item.joinCartTime)) {
          // 将数据处理为直接可用的数据
          item.detailSpace = JSON.parse(item.detailSpace || '[]')
          // item.detailSpace = JSON.parse(item.detailSpace || '[]')
          //   .map(item => {
          //     return item.value;
          //   })
          //   .join(' / ');
          if (!groups[item.joinCartTime].commentsReplyDesc) {
            groups[item.joinCartTime].commentsReplyDesc =
              item.goodsCommentsEntity &&
              item.goodsCommentsEntity.commentsReplyDesc
                ? item.goodsCommentsEntity.commentsReplyDesc
                : '';
          }
          groups[item.joinCartTime].data.push(item);
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
          };

          if ([null, 0, '0'].indexOf(item.groupType) > -1) {
            // 单品
            newGroup.image = item.goodsImage;
            newGroup.groupType = item.groupType;
          }
          if (item.groupType === 1 && item.goodsRingModelList) {
            // 對戒
            newGroup.groupTypeText = this.lang.pairRing;
            newGroup.goodsName = item.goodsRingModelList.name;
            newGroup.image = item.goodsRingModelList.ringImg;
          }
          if (item.groupType === 2) {
            // 定制
            newGroup.groupTypeText = this.lang.diy;
          }

          // 设置分组的创建时间和评分
          if (item.goodsCommentsEntity) {
            newGroup = Object.assign(newGroup, {
              createTimestamp: item.goodsCommentsEntity.createTime,
              createTime: Moment(item.goodsCommentsEntity.createTime).format(
                'YYYY.MM.DD'
              ),
              commentsLevel: item.goodsCommentsEntity.commentsLevel
            });
          } else {
            newGroup = Object.assign(newGroup, {
              createTime: '',
              commentsLevel: 0
            });
          }

          // 将数据处理为直接可用的数据
          item.detailSpace = JSON.parse(item.detailSpace || '[]')
          // item.detailSpace = JSON.parse(item.detailSpace || '[]')
          //   .map(item => {
          //     return item.value;
          //   })
          //   .join(' / ');

          newGroup.data = [item];
          newGroup.image = this.$imageStrToArray(newGroup.image)[0];

          groups[item.joinCartTime] = newGroup;
        }
      });

      let keys = Object.keys(groups);
      keys = keys.sort((a, b) => {
        return groups[b].createTimestamp - groups[a].createTimestamp;
      });
      keys.forEach(item => {
        result.push(groups[item]);
      });

      // 将定制的商品进行排序，钻石放在后面
      result.map(item => {
        if (item.groupType === 2) {
          // 定制
          const diamond = [];
          const pedestal = [];
          item.data.forEach(detail => {
            if (detail.purposeEntiy.categoryId === 1) {
              diamond.push(detail);
            } else {
              pedestal.push(detail);
            }
          });
          item.data = pedestal.concat(diamond);
          item.goodsName = pedestal[0].goodsName;
          item.image = this.$imageStrToArray(pedestal[0].goodsImage)[0];
        }
        return item;
      });

      console.log('result=========>', result)

      return result;
    }
  },
  created() {
    this.isloading = true;
    this.$axiosGet('/web/myComments/getUserComments', {
      currPage: 1,
      pageSize: 999
    }).then(res => {
      this.isloading = false;
      if (res.data.code !== 200) {
      }
      this.info = res.data.list || [];
    }).catch(err => {
      console.log(err);
      this.isloading = false;
    });
  },
  methods: {
    jumpDetail(obj) {
      console.log(obj);
      if (obj.purposeEntiy === null) return;
      if (obj.purposeEntiy.categoryId === 2) {
        console.log('是个戒指💍');
        if (obj.purposeEntiy.configAttrId === 60) {
          console.log('还是个訂婚戒指💍');
          this.$router.push({
            name: 'seleceEngagement',
            params: {
              id: obj.goodsId,
              key: 2
            }
          });
        } else if (obj.purposeEntiy.configAttrId === 59) {
          console.log('还是个結婚戒指💍');
          this.$router.push({
            name: 'seleceWedding',
            params: {
              id: obj.goodsId
            }
          });
        }
      } else if (obj.purposeEntiy.categoryId === 1) {
        console.log('是个钻石💎');
      } else {
        this.$router.push({
          name: 'seleceJewellery',
          params: {
            id: obj.goodsId,
            key: 2
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.comment {
  .content {
    padding-top: 20px;
    .content-title {
      display: flex;
      width: 936px;
      height: 32px;
      align-items: center;
      background-color: #FEE6E2;
      font-size: 14px;
      color: #333;
      text-align: left;
      margin-bottom: 10px;
      div:nth-child(1) {
        padding-left: 20px;
        width: 579px;
      }
    }
    .comment-content {
      width: 936px;
      .comment-block {
        width: 936px;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
        margin-bottom: 20px;
        padding: 20px 0 20px 20px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        text-align: left;
        .comments {
          width: 531px;
          color: #333;
          .star-time {
            width: 531px;
            display: flex;
            align-items: flex-end;
            margin-bottom: 20px;
            .star {
              color: #F29B87;
              font-size: 20px;
              line-height: 20px;
              margin-right: 50px;
              i {
                margin-right: 4px;
              }
            }
            .time {
              font-size: 14px;
              line-height: 14px;
            }
          }
          .comment-title {
            font-size: 14px;
            margin-bottom: 30px;
          }
          .comment-word {
            font-size: 12px;
            margin-bottom: 20px;
            word-break: break-word;
          }
          .comment-img {
            width: 531px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 30px;
            img {
              display: block;
              width: 72px;
              height: 72px;
              margin-right: 20px;
              cursor: pointer;
              border: 1px solid #fff;
            }
          }
          .comment-response {
            padding-left: 51px;
            font-size: 12px;
            color: #8B766C;
            margin-bottom: 10px;
          }
          .comment-connect {
            padding-left: 51px;
            font-size: 12px;
            color: #F29B87;
          }
        }
        .info-block {
          width: 936-531-29-20px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 20px;
          border-top: 1px solid #E6E6E6;
          padding-top: 20px;
          .info-img {
            width: 71px;
            height: 71px;
            border: 1px solid #E6E6E6;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .info-content {
            width: 261px;
            color: #333;
            .info-title {
              font-size: 14px;
            }
            .info-sku {
              font-size: 12px;
              margin-bottom: 26px;
            }
            .infos {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              div {
                width: 48%;
                font-size: 12px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .info-block:nth-of-type(1) {
          border-top: 0;
          padding-top: 0;
        }
        .info-block:nth-last-of-type(1) {
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>
