<template>
  <div class="list-page all-comments">
    <div class="comments-title title-with-back">
      {{ lang.allComments }}({{ totalCount }})
      <div class="go-back-btn" @click="goBack($router)">
        <span>< {{ lang.back }}</span>
      </div>
    </div>
    <div class="comments-stars">
      <div class="about-stars">
        <i
          v-for="index in 5"
          :key="index"
          :class="[
            `iconfont`,
            `iconxing`,
            { light: index <= Math.round(avgLevel) },
            { dark: index > Math.round(avgLevel) }
          ]"
        ></i>
      </div>
      <span>{{ avgLevel }}</span>
    </div>
    <div class="comments-btn">
      <div :class="{ active: type === 1 }" @click="switchType(1)">
        {{ lang.allComments }}
      </div>
      <div :class="{ active: type === 2 }" @click="switchType(2)">
        {{ lang.fiveStarComments }}
      </div>
    </div>
    <div class="comments-box">
      <div v-for="c in commentData" :key="c.id" class="single-comment">
        <div class="single-comment-user">{{ c.userAccount }}</div>
        <div class="time-and-stars">
          <div class="about-time">{{ c.createTime }}</div>
          <div class="about-stars">
            <i
              v-for="index in 5"
              :key="index"
              :class="[
                `iconfont`,
                `iconxing`,
                { light: index <= Math.round(c.commentsLevel) },
                { dark: index > Math.round(c.commentsLevel) }
              ]"
            ></i>
          </div>
        </div>
        <!--        <div class="single-content" :class="[{ 'ow-h3': !isActive(c.id) }]">-->
        <div class="single-content">
          {{ c.commentsDesc }}
        </div>
        <!--        <div class="single-see-more" @click="showComment(c.id)">-->
        <!--          <span v-show="!isActive(c.id)">{{ lang.checkAll }}</span>-->
        <!--          <span v-show="isActive(c.id)">{{ lang.shrink }}</span>-->
        <!--        </div>-->
        <div v-if="c.commentsReplyDesc" class="customer-service-reply">
          [{{ lang.commentsReply }}] {{ c.commentsReplyDesc }}
          <div class="triangle"></div>
        </div>
      </div>
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
export default {
  layout: 'no-bar',
  mixins: [List],
  data() {
    return {
      lang: this.LANGUAGE.comments,
      avgLevel: 5,
      type: 1,

      listMethod: 'get',
      listUrl: `/wap/goodsComments/getGoodsComments`,
      activeIds: []
    }
  },
  computed: {
    specialParams() {
      return {
        goodsId: this.$route.query.goodId,
        groupId: this.$route.query.groupId,
        shouType: this.type
      }
    },
    commentData() {
      const showData = JSON.parse(JSON.stringify(this.showData))
      for (const i in showData) {
        showData[i].userAccount = this.showEmail(showData[i].userAccount)
        showData[i].createTime = Moment(showData[i].createTime).format(
          'YYYY.MM.DD'
        )
        // showData[i].createTime = showData[i].createTime.split(' ')[0]
      }
      return showData
    },
    totalCount() {
      return this.pageInfo && this.pageInfo.totalCount
        ? this.pageInfo.totalCount
        : 0
    }
  },
  mounted() {
    this.research()
    this.getAvgLevel()
  },
  methods: {
    toShopping() {
      this.$router.push({
        name: 'index'
      })
    },
    getAvgLevel() {
      this.$axios
        .get(`/wap/goodsComments/getAvgLevel`, {
          params: {
            goodsId: this.$route.query.goodId,
            groupId: this.$route.query.groupId
          }
        })
        .then(res => {
          this.avgLevel = res.avgLevel ? res.avgLevel : 5
        })
        .catch(err => {
          console.log(err)
        })
    },
    switchType(i) {
      this.type = i
      this.research()
    },
    isActive(id) {
      return this.activeIds.indexOf(id) > -1
    },
    showComment(id) {
      const activeIds = JSON.parse(JSON.stringify(this.activeIds))
      const start = activeIds.indexOf(id)
      console.log('start========>', start)
      if (start > -1) {
        activeIds.splice(start, 1)
      } else {
        activeIds.push(id)
      }
      this.activeIds = activeIds
    }
  }
}
</script>

<style scoped lang="less">
.all-comments {
  position: relative;
  width: 100%;
  height: 100%;
  background: #eeeeee;

  .comments-stars {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px 0;
    background: #ffffff;
    .about-stars {
      display: flex;
      height: 14px;
      align-items: center;
      i {
        display: block;
        font-size: 15px;
        line-height: 14px;
        margin-right: 9px;
      }
      .light {
        color: @mcPink;
      }
      .dark {
        color: #ccc;
      }
    }
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .comments-btn {
    width: 375px;
    height: 50px;
    background: rgba(246, 246, 246, 1);
    display: flex;
    align-items: center;
    padding-left: 22px;
    div {
      /*width: 65px;*/
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1); /*no*/
      border-radius: 5px;
      margin-right: 18px;
      padding: 0 10px;
    }
    .active {
      background: rgba(251, 248, 246, 1);
      border: 1px solid rgba(148, 116, 101, 1); /*no*/
      color: #947465;
    }
  }
  .comments-box {
    min-height: 300px;
    .single-comment {
      text-align: left;
      padding: 16px 22px 21px;
      border-bottom: 8px solid #eeeeee;
      /*border-bottom: 8px solid rgba(239, 239, 239, 1);*/
      margin-bottom: 8px;
      background-color: #ffffff;
      .single-comment-user {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 12px;
      }
      .time-and-stars {
        width: 100%;
        height: 12px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        .about-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .about-stars {
          display: flex;
          height: 12px;
          align-items: center;
          i {
            display: block;
            font-size: 11px;
            line-height: 12px;
            margin-left: 7px;
          }
          .light {
            color: @mcPink;
          }
          .dark {
            color: #ccc;
          }
        }
      }
      .single-content {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .single-see-more {
        width: max-content;
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
        border-bottom: 1px solid rgba(242, 155, 135, 1); /*no*/
        color: rgba(242, 155, 135, 1);
        margin: 9px 0 12px;
      }
      .customer-service-reply {
        position: relative;
        width: 335px;
        height: 65px;
        top: 12px;
        line-height: 16px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(148, 116, 101, 1);
        background: rgba(248, 244, 241, 1);
        border-radius: 5px;
        padding: 18px 13.5px;
        .triangle {
          position: absolute;
          top: 0;
          left: 19px;
          width: 0;
          height: 0;
          border-bottom: 8px solid rgba(248, 244, 241, 1);
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          transform: translateY(-100%);
        }
      }
    }
  }
}
</style>
