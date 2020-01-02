<template>
  <div
    v-loading="wishLoading"
    class="wish">
    <div class="header-title">
      <img src="../../../../static/images/personal/wish.png">
      <h3>{{ lang.myWish }}</h3>
    </div>
    <div class="content">
      <div
        v-for="(ds,index) in data"
        v-show="data.length!==0"
        :key="index"
        class="time-shock">
        <div class="time-title">{{ ds.time }} {{ lang.join }}</div>
        <div class="wishes">
          <div
            v-for="(d,_index) in ds.data"
            :key="_index"
            class="wish-block">
            <div
              class="wish-img"
              @click="goDetail(d)">
              <div>
                <img
                  :src="IMG_URL + d.goodsImages.split(',')[0]"
                  alt="">
              </div>
            </div>
            <div class="wish-price">{{ d.coinType }} {{ formatMoney(d.price) }}</div>
            <div class="wish-desc">{{ d.name }}</div>
            <!--            <div class="wish-texture">-->
            <!--              <div class="texture" v-for="index in 7" :key="index">-->
            <!--                <i class="iconfont iconmaterial-big-WK1"/>-->
            <!--                <div class="texture-desc">14K白金</div>-->
            <!--              </div>-->
            <!--              <i class="iconfont iconxiala"/>-->
            <!--            </div>-->
            <i
              class="iconfont iconxin"
              @click="delObj = d;deleteWish()"/>
          </div>
        </div>
        <Empty
          v-if="!wishLoading && data.length===0"
          type="2"/>
      </div>

    </div>
    <MessageBox
      v-show="isDel"
      :title="lang.areYouSure"
      :message="lang.areYouSureToDelete"
      type="two"
      @sure="deleteWish()"
      @cancel="isDel = false"/>
  </div>
</template>

<script>
import {setWishNum, getWishNum} from '@/api/cache.js';
import MessageBox from '@/components/messageBox';
import Empty from '@/components/empty.vue';
import { formatMoney } from '@/api/filterUtil.js';
import moment from 'moment';
export default {
  name: 'Wish',
  components: { MessageBox, Empty },
  data() {
    return {
      lang: this.$LANGUAGE.personal.wish,
      wishLoading: true,
      data: [],
      delObj: {},
      isDel: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formatMoney: formatMoney,
    getList() {
      this.$axiosGet('/web/collection/list', {
        type: 1,
        currPage: 1,
        pageSize: 1000
      }).then(res => {
        console.log('wish===>', res);
        if (res.code === 200) {
          this.data = [];
          let body = res.data.list;
          for (let i in res.data.list) {
            let o = body[i];
            o.loading = false;
            o.index = i;
            o.time = moment(body[i].createTime).format('YYYY-MM-DD');
            if (body[i].simpleGoodsEntity) {
              o.price = o.simpleGoodsEntity.salePrice;
              o.coinType = o.simpleGoodsEntity.coinType;
              o.goodsImages = res.data.list[i].simpleGoodsEntity.goodsImages || '';
              o.name = o.simpleGoodsEntity.goodsName;
            } else {
              o.price = o.ringsSimpleGoodsEntity.salePrice;
              o.coinType = o.ringsSimpleGoodsEntity.coinType;
              o.name = o.ringsSimpleGoodsEntity.name;
              o.goodsImages = o.ringsSimpleGoodsEntity.ringImg ? o.ringsSimpleGoodsEntity.ringImg : '';
            }
            if (this.data.length === 0) {
              this.data.push({time: o.time, data: [o]});
              continue;
            }
            let lock = false;
            for (let j in this.data) {
              if (this.data[j].time === o.time) {
                lock = j;
                break;
              }
            }
            if (lock) {
              this.data[lock].data.push(o);
            } else {
              let obj = {
                time: o.time,
                data: [o]
              };
              this.data.push(obj);
            }
          }
          this.wishLoading = false;
          console.log('new Wish ===>', this.data);
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    deleteWish() {
      // this.data[this.delObj.index].loading = true;
      this.$axiosPost('/web/collection/delete', {
        ids: this.delObj.id
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          // this.isDel = false;
          this.$store.dispatch('getWishGoodsNum');
          this.$message({
            type: 'success',
            message: this.lang.deleteSuccess
          });
          this.getList();
        } else {
          this.$message.error(res.data);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goDetail(obj) {
      console.log(obj);
      if (obj.groupId) {
        console.log('有组🆔😂');
        this.$router.push({
          name: 'seleceRightRing',
          params: {
            id: obj.groupId
          }
        });
      } else {
        console.log('无组🆔😂');
        if (obj.simpleGoodsEntity.categoryId === 1) {
          console.log('是个钻石💎');
          this.$router.push({
            name: 'seleceDiamond',
            params: {
              id: obj.simpleGoodsEntity.goodId,
              key: 2
            }
          });
        } else if (obj.simpleGoodsEntity.categoryId === 2) {
          console.log('是个戒指💍');
          if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指�');
            this.$router.push({
              name: 'seleceWedding',
              params: {
                id: obj.goodsId
              }
            });
          } else if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指�');
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
  .wish {
    .content {
      text-align: left;
      padding-top: 20px;

      .time-shock {
        .time-title {
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #E6E6E6;
          padding-bottom: 5px;
        }

        .wishes {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
          padding-top: 10px;

          .wish-block {
            position: relative;
            width: 310px;
            transition: 0.2s linear;
            border: 10px solid #fff;
            text-align: center;
            padding-bottom: 70px;
            margin-right: 5px;

            .wish-img {
              width: 290px;
              height: 290px;
              overflow: hidden;
              cursor: pointer;
              img {
                display: block;
                width: 100%;
              }
            }

            .wish-price {
              font-family: twCenMt;
              color: #F29B87;
              font-size: 24px;
              margin-top: 8px;
            }

            .wish-desc {
              font-size: 12px;
              color: #333;
              margin-top: 8px;
            }

            .wish-texture {
              /*transition: 0.2s linear;*/
              display: none;
              width: max-content;
              position: absolute;
              z-index: 19;
              bottom: 50px;
              left: 20px;
              color: #999;
              transform: translateY(100%);
              background-color: white;
              padding: 10px 40px 0 10px;
              border: 1px solid #fff;
              border-radius: 5px;

              .texture {
                cursor: pointer;
                transition: 0.2s linear;
                display: none;
                align-items: center;
                margin-bottom: 10px;
                line-height: 14px;

                i {
                  font-size: 14px;
                  margin-right: 10px;
                }

                .texture-desc {
                  font-size: 12px;
                }
              }

              .texture:nth-child(1) {
                display: flex;
              }

              .iconxiala {
                position: absolute;
                right: 10px;
                top: 12px;
                font-size: 12px;
                transition: 0.2s linear;
              }
            }

            .wish-texture:hover {
              border: 1px solid #999;
            }

            .wish-texture:hover .texture {
              display: flex;
            }

            .wish-texture:hover .iconxiala {
              transform: rotate(180deg);
              transform-origin: center center;
            }

            .iconxin,
            .iconkongxin {
              display: none;
              font-size: 20px;
              position: absolute;
              top: 20px;
              right: 20px;
              color: #aaa;
              cursor: pointer;
            }
          }

          .wish-block:nth-child(3n) {
            margin-right: 0;
          }

          .wish-block:hover {
            border: 10px solid #f4f2f3;
          }

          .wish-block:hover .wish-texture {
            display: block;
          }

          .wish-block:hover .iconxin,
          .wish-block:hover .iconkongxin {
            display: block;
          }
        }
      }
    }
  }
</style>
