<template>
  <div
    v-loading="loading"
    class="do-comment">
    <div class="dm-title">{{ lang.title }}</div>
    <div class="m-title">
      <span>{{ lang.commentContent }}</span>
      <span>{{ lang.productDetails }}</span>
    </div>
    <div class="dm-top-line" />
    <div class="dm-blocks">
      <div
        v-for="(d,index) in info.allDetails"
        :key="index"
        class="dm-block">
        <div class="left-dm">
          <div class="left-dm-star">
            <div class="label">{{ lang.rateGoods }}</div>
            <div class="content">
              <i
                v-for="stars in 5"
                :key="stars"
                :class="[{iconxing1: d.commentsLevel < stars},{iconxing: stars <= d.commentsLevel}]"
                class="iconfont"
                @click="d.commentsLevel = stars"/>
            </div>
          </div>
          <div class="left-dm-desc">
            <div class="label">{{ lang.feeling }}</div>
            <div class="content">
              <textarea v-model="d.commentsDesc"/>
            </div>
          </div>
        </div>
        <div class="right-dm">
          <!--          第一个-->
          <div
            class="rdm-box"
            @click="jumpDetail(d.data[0], d.groupType, 1)">
            <div class="rdm-img">
              <img
                :src="$imageStrToArray(d.data[0].goodsImages)[0]"
                alt="">
            </div>
            <div class="rdm-desc">
              <div class="rdm-name">{{ d.data[0].goodsName }}</div>
              <div class="rdm-sku">{{ d.data[0].goodsCode }}</div>
              <div class="rdm-details">
                <span
                  v-for="(v,k) in d.data[0].detailSpecs"
                  :key="k">{{ v.name }}：{{ v.value }}</span>
              </div>
            </div>
          </div>
          <!--          第二个-->
          <div
            v-if="d.data[1]"
            class="rdm-box"
            @click="jumpDetail(d.data[1], d.groupType, 0)">
            <div class="rdm-img">
              <img
                :src="$imageStrToArray(d.data[1].goodsImages)[0]"
                alt="">
            </div>
            <div class="rdm-desc">
              <div class="rdm-name">{{ d.data[1].goodsName }}</div>
              <div class="rdm-sku">{{ d.data[1].goodsCode }}</div>
              <div class="rdm-details">
                <span
                  v-for="(v,k) in d.data[1].detailSpecs"
                  :key="k">{{ v.name }}：{{ v.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="no-name-tick">-->
    <!--      <input type="checkbox" v-model="isNoName"><span>匿名評價</span>-->
    <!--    </div>-->
    <div
      class="dm-btn"
      @click="postComment()">{{ lang.SubmitComment }}</div>
    <MessageBox
      v-show="alertBox"
      :title="alertBoxInfo.title"
      :message="alertBoxInfo.message"
      type="one"
      @done="alertBox = false"/>
  </div>
</template>

<script>
import Moment from 'moment';
import MessageBox from '../../../components/messageBox';
export default {
  name: 'DoComment',
  components: { MessageBox },
  data() {
    return {
      lang: this.$LANGUAGE.personal.doComment,
      info: {},
      data: [],
      oid: this.$route.params.orderId,
      loading: true,
      isNoName: false,
      alertBox: false,
      alertBoxInfo: {
        title: this.$LANGUAGE.personal.doComment.tips,
        message: this.$LANGUAGE.personal.doComment.msg
      }
    };
  },
  mounted() {
    this.getData();
    // console.log(this.$route.params);
  },
  methods: {
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
      };
      return map[payChannel];
    },
    dealDetailsData(details = []) {
      details = JSON.parse(JSON.stringify(details || []));

      // 以joinCartTime为下标，组合对戒和定制
      const groups = {};
      const result = [];

      details.map(good => {
        console.log('good=====>', good);
        if (groups.hasOwnProperty(good.joinCartTime)) {
          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
          // good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
          //   .map(item => {
          //     return item.value;
          //   })
          //   .join(' / ');
          groups[good.joinCartTime].data.push(good);
        } else {
          const newGroup = {
            id: `${good.orderId}-${good.joinCartTime}`,
            image: good.goodsImages,
            groupType: good.groupType,
            groupTypeText: this.lang.singleProduct,
            goodsName: good.goodsName
          };

          if ([null, 0, '0'].indexOf(good.groupType) > -1) {
            // 单品
            newGroup.groupType = 0;
            newGroup.groupTypeText = this.lang.singleProduct;
          }
          if (good.groupType === 1) {
            // 對戒
            newGroup.groupType = 1;
            newGroup.groupTypeText = this.lang.pairRing;
            newGroup.goodsName = good.ringName || this.lang.defaultPairRing;
            newGroup.image = good.ringImg || '/marriage-ring/default.png';
          }
          if (good.groupType === 2) {
            // 定制
            newGroup.groupType = 2;
            newGroup.groupTypeText = this.lang.diy;
          }

          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
          // good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
          //   .map(item => {
          //     return item.value;
          //   })
          //   .join(' / ');

          newGroup.data = [good];
          newGroup.image = this.$imageStrToArray(newGroup.image)[0];

          groups[good.joinCartTime] = newGroup;
        }
      });

      // 排序
      let keys = Object.keys(groups);
      keys = keys.sort((a, b) => {
        return b - a;
      });
      keys.forEach(item => {
        result.push(groups[item]);
      });

      // 删除钻石单品（钻石单品不能评论）
      for (let n = keys.length - 1; n >= 0; n--) {
        if (
          [null, 0, '0'].indexOf(result[n].groupType) > -1 &&
          result[n].data[0].categoryId === 1
        ) {
          // 单品钻石
          result.splice(n, 1);
        }
      }

      // 将定制的商品进行排序，钻石放在后面
      result.map(item => {
        console.log('item====>', item);
        if (item.groupType === 2) {
          // 定制
          const diamond = [];
          const pedestal = [];
          item.data.forEach(detail => {
            if (detail.categoryId === 1) {
              diamond.push(detail);
            } else {
              pedestal.push(detail);
            }
          });
          item.data = pedestal.concat(diamond);
          item.goodsName = pedestal[0].goodsName;
          item.image = this.$imageStrToArray(pedestal[0].goodsImages)[0];
        }
        return item;
      });

      return result;
    },
    getData() {
      const _this = this;
      _this.$axiosGet('/web/myOrder/getOrderDetails', {
        orderId: _this.oid
      }).then(res => {
        if (res.code === 200) {
          let data = res.data;

          try {
            if (data.orderStatus !== 5) {
              _this.$toast(_this.lang.cannotComment);
              setTimeout(() => {
                _this.$router.replace({
                  name: 'personal-order'
                });
              }, 2000);
              return;
            }

            data.orderTime = Moment(data.orderTime).format('YYYY/MM/DD HH:mm:ss');
            data.payChannelText = data.payChannel
              ? _this.payChannelText(data.payChannel)
              : data.orderStatus > 1
                ? _this.lang.cableTransfer
                : '';
            data.payTime = data.payTime
              ? Moment(data.payTime).format('YYYY/MM/DD HH:mm:ss')
              : '';

            let allDetails = [];
            data.outDetails.forEach(item => {
              if (item.outOrderDetails && item.outOrderDetails instanceof Array) {
                item.outOrderDetails = _this.dealDetailsData(item.outOrderDetails);
                allDetails = allDetails.concat(item.outOrderDetails);
              }
              // return item
            });
            // data.allDetails = allDetails
            data.allDetails = allDetails.map(item => {
              item.commentsLevel = 5;
              item.commentsDesc = '';
              return item;
            });
            _this.info = data;
            _this.loading = false;
          } catch (e) {
            console.error(e);
          }
          // console.log('ppp===>', this.data)
        } else {
          _this.$message.error(res.data);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    postComment() {
      const allDetails = JSON.parse(JSON.stringify(this.info.allDetails));
      const goodsCommentsModel = [];

      allDetails.forEach(group => {
        group.data.forEach(good => {
          // 商品里面的组成物品
          const addData = {
            goodsDetailsId: good.goodsDetailId,
            goodsId: good.goodsId,
            groupId: good.groupId,
            commentsLevel: group.commentsLevel,
            commentsDesc: group.commentsDesc,
            orderDetailId: good.orderDetailId
          };
          goodsCommentsModel.push(addData);
        });
      });
      // console.log(arr);
      this.$postJsonRequest('/web/myOrder/userComments', {
        orderId: this.oid,
        goodsCommentsModel: goodsCommentsModel
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$router.replace('/personal/user-order');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    jumpDetail(obj, type, go) {
      console.log(obj, type, go);
      if (go === 0) {
        console.log('钻石');
        this.$router.push({
          name: 'seleceDiamond',
          params: {
            id: obj.goodsId,
            key: 2
          }
        });
      } else {
        if (obj.categoryId === 2) {
          console.log('是个戒指💍');
          if (obj.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指💍');
            this.$router.push({
              name: 'seleceWedding',
              params: {
                id: obj.goodsId
              }
            });
          } else if (obj.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指💍');
            this.$router.push({
              name: 'seleceEngagement',
              params: {
                id: obj.goodsId,
                key: 2
              }
            });
          }
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
  }
};
</script>

<style scoped lang="less">
.do-comment {
  width: 936px;
  text-align: left;
  .dm-title {
    height:17px;
    line-height: 17px;
    font-size:16px;
    color:rgba(242,155,135,1);
    margin-bottom: 20px;
  }
  .m-title {
    width:936px;
    height:34px;
    line-height: 34px;
    padding-left: 20px;
    color: #333;
    font-size: 14px;
    background:rgba(254,230,226,1);
    margin-bottom: 10px;
    span:nth-child(1) {
      margin-right: 503px;
    }
  }
  .dm-top-line {
    width:936px;
    height:1px;
    background:rgba(230,230,230,1);
    margin-bottom: 20px;
  }
  .dm-blocks {
    width: 936px;
    .dm-block {
      width: 936px;
      padding: 0 0 20px 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(230,230,230,1);
      display: flex;
      justify-content: space-between;
      .left-dm {
        width: 372+12+69px;
        .left-dm-star {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .label {
            width: 12+69px;
            font-size: 14px;
            color: #333;
            line-height: 15px;
            height: 15px;
          }
          .content {
            width: 372px;
            i {
              display: inline-block;
              width: 19px;
              height: 19px;
              line-height: 19px;
              font-size: 19px;
              overflow: hidden;
              cursor: pointer;
              margin-right: 3px;
              color: #F29B87;
            }
          }
        }
        .left-dm-desc {
          display: flex;
          .label {
            width: 12+69px;
            font-size: 14px;
            color: #333;
            line-height: 15px;
            height: 15px;
          }
          .content {
            width:372px;
            height:161px;
            textarea {
              width:372px;
              height:161px;
              -webkit-appearance: none;
              border:1px solid rgba(153,153,153,1);
              outline: 0;
              resize: none;
              padding: 10px 15px;
            }

          }
        }
      }
      .right-dm {
        width: 70+20+261px;
        .rdm-box {
          box-sizing: content-box;
          width: 70+20+261px;
          padding-bottom: 20px;
          /*margin-bottom: 20px;*/
          overflow: hidden;
          display: flex;
          .rdm-img {
            width: 70px;
            height: 70px;
            border: 1px solid rgba(230,230,230,1);
            margin-right: 20px;
            img {
              width: 68px;
              height: 68px;
            }
          }
          .rdm-desc {
            width: 261px;
            .rdm-name {
              width: 261px;
              color: #333;
              font-size: 14px;
              height: 15px;
              line-height: 15px;
              text-overflow:ellipsis;
              white-space: nowrap;
              overflow: hidden;
              margin-bottom: 8px;
            }
            .rdm-sku {
              font-size: 12px;
              color: #333;
              height: 12px;
              line-height: 12px;
              margin-bottom: 22px;
            }
            .rdm-details {
              width: 261px;
              display: flex;
              flex-wrap: wrap;
              span {
                display: inline-block;
                width: 130px;
                font-size: 12px;
                height: 12px;
                line-height: 12px;
                margin-top: 9px;
                text-overflow:ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              span:nth-child(1),
              span:nth-child(2) {
                margin: 0;
              }
            }
          }
        }
        .rdm-box:nth-child(2) {
          border-top: 1px solid rgba(230,230,230,1);
          margin: 0;
          padding: 20px 0 0;
        }
      }
    }
  }
  .no-name-tick {
    color: #999;
    font-size: 14px;
    margin-bottom: 38px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    input {
      margin-right: 15px;
    }
    span {
      line-height: 14px;
    }
  }
  .dm-btn {
    width:140px;
    height:28px;
    line-height: 28px;
    margin: 0 auto;
    font-size:14px;
    text-align: center;
    color: #fff;
    background:rgba(221,177,170,1);
    cursor: pointer;
  }
}
</style>
