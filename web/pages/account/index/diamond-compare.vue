<template>
  <div class="diamond-compare">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.diamondContrast`) }}</div>
    </div>
    <div class="content">
      <!--      <div v-if="!data || data.length === 0" style="margin: auto;">-->
      <!--        <Empty type="7" />-->
      <!--      </div>-->
      <div class="dCs">
        <div v-for="(d, index) in data" :key="index" class="dC-33">
          <div class="dC-block">
            <nuxt-link :to="goDetail(d)">
              <div class="dC-img" @click="goDetail(d)">
                <img
                  :src="IMG_URL + d.simpleGoodsEntity.goodsImages.split(',')[0]"
                />
              </div>
            </nuxt-link>
            <div class="dC-title">
              {{ d.simpleGoodsEntity.goodsName }}
            </div>
            <div class="dC-middle">
              <div class="dC-price">
                {{ d.simpleGoodsEntity.coinType }}
                {{ d.simpleGoodsEntity.salePrice }}
              </div>
              <div class="dC-btn" @click="addCarts(d)">
                {{ $t(`${lang}.addCart`) }}
              </div>
              <!--<div>已加入購物車</div>-->
            </div>
            <div
              v-for="(o, i) in d.simpleGoodsEntity.baseConfig"
              :key="i"
              class="dC-desc"
            >
              <div
                v-if="o.configId >= 31 && o.configId <= 38"
                class="dC-desc-line"
              >
                <div>{{ o.configVal }}：</div>
                <div>{{ o.configAttrIVal }}</div>
              </div>
            </div>
            <i
              class="iconfont iconicon-test1"
              @click="deleteDiamond(d.goodsId)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'personal.diamondContrast'
export default {
  name: 'DiamondCompare',
  data() {
    return {
      lang,
      data: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios
        .get('/web/collection/list', {
          params: {
            type: 2,
            currPage: 1,
            pageSize: 99
          }
        })
        .then(res => {
          // console.log(res)
          this.data = res.list
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    deleteDiamond(id) {
      this.$store
        .dispatch(`removeCompared`, id)
        .then(res => {
          // console.log(res)
          this.getList()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    addCarts(d) {
      console.log(d)
      const goodInfo = {
        goodsCount: 1,
        goodsDetailsId: '88888888',
        goodsId: d.simpleGoodsEntity.goodId,
        groupId: null,
        groupType: null,
        serviceId: 0,
        serviceVal: 'string'
      }
      this.$store
        .dispatch(`addCart`, goodInfo)
        .then(res => {
          this.$message.success(this.$t(`detail.addCartSuccess`))
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    goDetail(d) {
      console.log(d)
      const route = {
        path: `/diamond-details/${d.simpleGoodsEntity.goodsName.replace(
          /\//g,
          ''
        )}`,
        query: {
          goodId: d.simpleGoodsEntity.goodId
        }
      }
      return this.routeDataToUrl(route)
    }
  }
}
</script>

<style scoped lang="less">
.diamond-compare {
  width: 100%;
  padding-bottom: 30px;
  .pink-title {
    display: flex;
    align-items: center;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 28px;
    }
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
        box-sizing: border-box;
        .dC-block {
          position: relative;
          width: 308px;
          border: 1px solid rgba(221, 221, 221, 1);
          transition: 0.2s linear;
          margin: 0 auto 20px;
          /*overflow: hidden;*/
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
            height: 16 * 3px;
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
              color: #f29b87;
            }
            .dC-btn {
              color: #fff;
              background-color: #aa8a7b;
              width: 80px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-size: 12px;
              cursor: pointer;
            }
          }
          .dC-desc {
            overflow: hidden;
          }
          .dC-desc-line {
            display: flex;
            width: 306px;
            height: 32px;
            padding-left: 10px;
            align-items: center;
            color: #333;
            text-align: center;
            /*box-sizing: border-box;*/
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
          .dC-desc:nth-child(2n) {
            background-color: #f8f8f8;
          }
          .iconicon-test1 {
            display: none;
            width: 28px;
            height: 28px;
            line-height: 28px;
            font-size: 28px;
            text-align: center;
            overflow: hidden;
            color: rgba(20, 20, 20, 0.3);
            position: absolute;
            top: -14px;
            right: -14px;
            cursor: pointer;
            z-index: 19;
          }
        }
        .dC-block:hover {
          box-shadow: 0px 7px 10px 0px rgba(60, 60, 60, 0.3);
        }
        .dC-block:hover .iconicon-test1 {
          display: block;
        }
      }
    }
  }
}
</style>
