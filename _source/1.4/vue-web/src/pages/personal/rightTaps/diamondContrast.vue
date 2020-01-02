<template>
  <div
    v-loading="loading"
    class="dC">
    <div class="header-title">
      <img src="../../../../static/images/personal/diamondContrast.png" >
      <h3>{{ lang.diamondContrast }}</h3>
    </div>
    <div class="content">
      <div
        v-if="!data || data.length===0"
        style="margin: auto;">
        <Empty
          type="7"/>
      </div>
      <div class="dCs">
        <div
          v-for="(d,index) in data"
          :key="index"
          class="dC-33">
          <div class="dC-block">
            <div
              class="dC-img"
              @click="goDetail(d)">
              <img
                :src="IMG_URL + d.simpleGoodsEntity.goodsImages.split(',')[0]"
                alt="">
            </div>
            <div class="dC-title">
              {{ d.simpleGoodsEntity.goodsName }}
            </div>
            <div class="dC-middle">
              <div class="dC-price">{{ d.simpleGoodsEntity.coinType }} {{ d.simpleGoodsEntity.salePrice }}</div>
              <div
                class="dC-btn"
                @click="addCarts(d)">{{ lang.addCart }}</div>
                <!--<div>已加入購物車</div>-->
            </div>
            <div class="dC-desc">
              <!-- <div class="dC-desc-line">
               <div>GIA：</div>
                <div>{{ d.simpleGoodsEntity.goodsCode }}</div>
              </div> -->
              <div
                v-for="(o,i) in d.simpleGoodsEntity.baseConfig"
                v-if="o.configId>=31&&o.configId<=38"
                :key="i"
                class="dC-desc-line">
                <div>{{ o.configVal }}：</div>
                <div>{{ o.configAttrIVal }}</div>
              </div>
            </div>
            <i
              class="iconfont iconicon-test1"
              @click="deleteDiamond(d.id)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addCard } from '../../../api/func.js';
import Empty from '@/components/empty.vue';

export default {
  name: 'DiamondContrast',
  components: {
    Empty
  },
  data() {
    return {
      lang: this.$LANGUAGE.personal.diamondContrast,
      loading: true,
      data: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axiosGet('/web/collection/list', {
        type: 2,
        currPage: 1,
        pageSize: 99
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.data = res.data.list;
          this.loading = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    deleteDiamond(id) {
      this.loading = true;
      this.$axiosPost('/web/collection/delete', {
        ids: id
      }).then(res => {
        console.log(res);
        if (res.data === 'success') {
          this.getList();
        } else {
          this.$message.error(res.data);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    addCarts(obj) {
      console.log(obj);
      let o = {goodsId: obj.simpleGoodsEntity.goodId, goodsDetailsId: '88888888', groupType: null, groupId: null};
      addCard(1, o);
    },
    goDetail(obj) {
      this.$router.push({
        name: 'seleceDiamond',
        params: {
          id: obj.goodsId,
          key: 2
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.dC {
  .header-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
  }
  .content {
    text-align: left;
    padding-top: 20px;
    .dCs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .dC-33 {
        width: percentage(1/3);
        .dC-block {
          position: relative;
          width: 308px;
          border: 1px solid rgba(221,221,221,1);
          transition: 0.2s linear;
          margin: 0 auto 20px;
          .dC-img {
            width: 308px;
            height: 308px;
            cursor: pointer;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .dC-title {
            width: 290px;
            height: 16*3px;
            line-height: 16px;
            margin: 10px;
            font-size: 12px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .dC-middle {
            width: 290px;
            margin: 0 auto 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333;
            .dC-price {
              font-family: twCenMt;
              font-size: 24px;
              color: #F29B87;
            }
            .dC-btn {
              color: #fff;
              background-color: #AA8A7B;
              width: 80px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              cursor: pointer;
            }
          }
          .dC-desc-line {
            display: flex;
            width:306px;
            height: 32px;
            padding-left: 10px;
            align-items: center;
            color: #333;
            text-align: center;
            div:nth-child(1) {
              font-size: 12px;
              width: 60px;
              text-align: left;
            }
            div:nth-child(2) {
              width: 236px;
              font-size: 14px;
            }
          }
          .dC-desc-line:nth-child(2n+1) {
            background-color: #F8F8F8;
          }
          .iconicon-test1 {
            display: none;
            width: 28px;
            height: 28px;
            line-height: 28px;
            font-size: 28px;
            text-align: center;
            overflow: hidden;
            color: rgba(20,20,20,0.3);
            position: absolute;
            top: -14px;
            right: -14px;
            cursor: pointer;
            z-index: 19;
          }
        }
        .dC-block:hover {
          box-shadow: 0px 7px 10px 0px rgba(60,60,60,0.3);
        }
        .dC-block:hover .iconicon-test1 {
          display: block;
        }
      }
    }
  }
}
</style>
