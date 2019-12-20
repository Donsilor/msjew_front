<template>
  <div class="wish">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.myWish`) }}</div>
    </div>
    <div class="content">
      <div
        v-for="(ds, index) in data"
        v-show="data.length !== 0"
        :key="index"
        class="time-shock"
      >
        <div class="time-title">{{ ds.time }} {{ $t(`${lang}.join`) }}</div>
        <div class="wishes">
          <div v-for="(d, _index) in ds.data" :key="_index" class="wish-block">
            <nuxt-link :to="goDetail(d)">
              <div class="wish-img" @click="goDetail(d)">
                <div>
                  <img :src="IMG_URL + d.goodsImages.split(',')[0]" alt="" />
                </div>
              </div>
            </nuxt-link>
            <div class="wish-price">
              {{ d.coinType }} {{ formatNumber(d.price) }}
            </div>
            <div class="wish-desc">{{ d.name }}</div>
            <!--            <div class="wish-texture">-->
            <!--              <div class="texture" v-for="index in 7" :key="index">-->
            <!--                <i class="iconfont iconmaterial-big-WK1"/>-->
            <!--                <div class="texture-desc">14K白金</div>-->
            <!--              </div>-->
            <!--              <i class="iconfont iconxiala"/>-->
            <!--            </div>-->
            <i class="iconfont iconxin" @click="deleteWish(d)" />
          </div>
        </div>
        <!--        <Empty v-if="!wishLoading && data.length === 0" type="2" />-->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
const lang = 'personal.wish'
export default {
  name: 'WishList',
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
            type: 1,
            currPage: 1,
            pageSize: 1000
          }
        })
        .then(res => {
          console.log('wish===>', res)
          this.data = []
          const body = res.list
          for (const i in res.list) {
            const o = body[i]
            o.loading = false
            o.index = i
            o.time = moment(body[i].createTime).format('YYYY-MM-DD')
            if (o.groupId) {
              o.groupType = o.groupType === 2 ? 1 : null
              o.delId = o.id
              o.id = o.groupId
            } else {
              o.groupType = o.groupType === 2 ? 1 : null
              o.delId = o.id
              o.id = o.goodsId
            }
            console.log(o)
            if (body[i].simpleGoodsEntity) {
              o.price = o.simpleGoodsEntity.salePrice
              o.coinType = o.simpleGoodsEntity.coinType
              o.goodsImages = res.list[i].simpleGoodsEntity.goodsImages || ''
              o.name = o.simpleGoodsEntity.goodsName
            } else {
              o.price = o.ringsSimpleGoodsEntity.salePrice
              o.coinType = o.ringsSimpleGoodsEntity.coinType
              o.name = o.ringsSimpleGoodsEntity.name
              o.goodsImages = o.ringsSimpleGoodsEntity.ringImg
                ? o.ringsSimpleGoodsEntity.ringImg
                : ''
            }
            if (this.data.length === 0) {
              this.data.push({ time: o.time, data: [o] })
              continue
            }
            let lock = false
            for (const j in this.data) {
              if (this.data[j].time === o.time) {
                lock = j
                break
              }
            }
            if (lock) {
              this.data[lock].data.push(o)
            } else {
              const obj = {
                time: o.time,
                data: [o]
              }
              this.data.push(obj)
            }
          }
          this.wishLoading = false
          console.log('new Wish ===>', this.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goDetail(d) {
      console.log(d)
      let route = {}
      if (d.groupId) {
        route = {
          path: `/ring/wedding-rings/${d.name.replace(/\//g, '')}`,
          query: {
            goodId: d.groupId,
            ringType: 'pair'
          }
        }
        return this.routeDataToUrl(route)
      } else {
        const ct = d.simpleGoodsEntity.categoryId
        console.log(ct)
        if (ct === 1) {
          // console.log(`💎`)
          route = {
            path: `/diamond-details/${d.name.replace(/\//g, '')}`,
            query: {
              goodId: d.goodsId
            }
          }
        } else if (ct === 2) {
          // console.log(`💍`)
          route = {
            path: `/ring/wedding-rings/${d.name.replace(/\//g, '')}`,
            query: {
              goodId: d.goodsId,
              ringType: 'single'
            }
          }
        } else {
          // console.log(`饰品`)
          route = {
            path: `/jewellery/all/${d.name.replace(/\//g, '')}`,
            query: {
              goodId: d.goodsId
            }
          }
        }
        return this.routeDataToUrl(route)
      }
    },
    deleteWish(d) {
      console.log(d)
      this.$store
        .dispatch(`removeWish`, d.delId)
        .then(res => {
          this.$message({
            type: 'success',
            message: this.$t(`${lang}.deleteSuccess`)
          })
          this.getList()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
div {
  box-sizing: border-box;
}
.wish {
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

    .time-shock {
      .time-title {
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid #e6e6e6;
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
            color: #f29b87;
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
