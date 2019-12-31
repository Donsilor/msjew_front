<template>
  <div class="single">
    <div class="good-info">
      <nuxt-link :to="getJumpLink(g)">
        <div class="good-img" @click="goDetail()">
          <img :src="imageStrToArray(g.image)[0]" alt="" />
          <div
            v-if="g.data[0].simpleGoodsEntity.goodsStatus !== 2"
            class="img-bord"
          >
            <span>{{ $t(`cart.Invalid`) }}</span>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link :to="getJumpLink(g)">
        <div class="good-desc" @click="goDetail()">
          <div>
            {{ g.goodsName }}
          </div>
          <div>
            SKU：{{
              g.data[0].simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode
            }}
          </div>
        </div>
      </nuxt-link>
      <div
        v-if="g.data[0].simpleGoodsEntity.categoryId !== 1"
        class="good-information"
      >
        <div
          v-for="(i, k) in g.data[0].simpleGoodsEntity.detailConfig"
          :key="k"
          class="infos"
        >
          <div>{{ i.configVal }}</div>
          <div>{{ i.configAttrIVal }}</div>
        </div>
      </div>
      <div
        v-if="g.data[0].simpleGoodsEntity.categoryId === 1"
        class="good-description"
      >
        <span v-for="(i, k) in g.data[0].simpleGoodsEntity.baseConfig" :key="k">
          <span v-if="k != g.data[0].simpleGoodsEntity.baseConfig.length - 1"
            >{{ i.configAttrIVal }},
          </span>
          <span
            v-else-if="k == g.data[0].simpleGoodsEntity.baseConfig.length - 1"
            >{{ i.configAttrIVal }}</span
          >
        </span>
      </div>

      <div class="good-num">{{ g.data[0].goodsCount }}</div>
      <div class="good-price">
        {{ g.coinType }}
        {{
          formatNumber(
            g.data[0].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
          )
        }}
      </div>
      <div
        v-show="options"
        v-if="g.data[0].simpleGoodsEntity.goodsStatus === 2"
        class="good-btn"
      >
        <div class="wish-img">
          <i class="iconfont" @click="addWish(g)">&#xe645;</i>
        </div>
        <div />
        <i class="iconfont iconlajitong" @click="deleteGood()" />
      </div>
      <div v-show="options" v-else class="lose-btn">
        <div @click="searchSimilar()">
          {{ $t(`cart.searchSimilar`) }}
        </div>
        <div />
        <i class="iconfont iconlajitong" @click="deleteGood()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Single',
  props: {
    g: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {
    goDetail() {},
    addWish() {
      const data = {
        goodsId: this.g.goodsId,
        groupId: null,
        groupType: null,
        type: 1
      }
      this.$store
        .dispatch('addWish', data)
        .then(data => {
          this.$successMessage(this.$t(`cart.addWishSuccess`))
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    deleteGood() {
      const data = [this.g.id]
      this.$store
        .dispatch(`removeCart`, data)
        .then(data => {
          this.$successMessage(this.$t(`cart.deleteSuccess`))
          this.$emit(`reloadList`)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    searchSimilar() {
      //  用分类id和商品id去搜索
    }
  }
}
</script>

<style scoped lang="less">
.single {
  .good-info {
    position: relative;
    width: 1200px;
    height: 179px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    align-items: center;
    .good-img {
      position: relative;
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 2px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .good-desc {
      width: 269px;
      line-height: 18px;
      margin-right: 71px;
      div:nth-child(1) {
        max-height: 18 * 3px;
        margin-bottom: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /*word-break: break-all;*/
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      div:nth-child(2) {
        color: #999;
      }
    }
    .good-information {
      width: 185px;
      margin-right: 83px;
      .infos {
        width: 100%;
        display: flex;
        margin-bottom: 21px;
        div:nth-child(1) {
          width: 50%;
          color: #666;
        }
        div:nth-child(2) {
          width: 50%;
          color: #111;
        }
      }
    }
    .good-description {
      width: 185px;
      line-height: 20px;
      max-height: 60px;
      color: #666;
      margin-right: 83px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .good-num {
      width: 60px;
      text-align: center;
      font-size: 18px;
      color: #333;
      margin-right: 217-60-83px;
    }
    .good-price {
      font-family: twCenMt;
      font-size: 18px;
      color: #f29b87;
      width: 130px;
      text-align: center;
    }
    .good-btn {
      width: 80px;
      height: 21px;
      line-height: 21px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      div:nth-child(2) {
        width: 1px;
        height: 21px;
        background-color: rgba(166, 166, 166, 1);
      }
      i {
        width: 18px;
        display: block;
        height: 21px;
        line-height: 21px;
        color: #999999;
        font-size: 20px;
        cursor: pointer;
      }
      div:nth-child(1) {
        cursor: pointer;
        width: 22px;
        height: 21px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .cart-radio {
    position: relative;
    .free-check {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(187, 187, 187, 1);
      border-radius: 4px;
      cursor: pointer;
    }
    .icongou {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: block;
      width: 16px;
      height: 16px;
      background: rgba(170, 138, 123, 1);
      border-radius: 2px;
      color: #fff;
      font-size: 16px;
      line-height: 16px;
      cursor: pointer;
    }
  }
  .img-bord {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: rgba(102, 102, 102, 0.4);
  }
  .lose-btn {
    width: 120px;
    height: 21px;
    line-height: 21px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    div:nth-child(2) {
      width: 1px;
      height: 21px;
      background-color: rgba(166, 166, 166, 1);
    }
    i {
      display: block;
      width: 18px;
      height: 21px;
      line-height: 21px;
      color: #999999;
      font-size: 20px;
      cursor: pointer;
    }
    div:nth-child(1) {
      /*width: 43px;*/
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      color: #aa8a7b;
      cursor: pointer;
    }
  }
}
</style>
