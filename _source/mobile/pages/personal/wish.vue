<template>
  <div class="wish">
    <Header :title="lang.header" />
    <div class="content">
      <ul v-for="(item, index) in list" :key="index" class="clearboth">
        <p>{{ item.time }} {{ lang.add }}</p>
        <li v-for="(val, ind) in item.data" :key="ind" @click="goDetail(val)">
          <img :src="imageStrToArray(val.goodsImages)[0]" />
          <h6 class="ow-h2">
            {{ val.name || ' ' }}
          </h6>
          <p>{{ coin }} {{ formatMoney(val.price) }}</p>
          <i
            class="icon iconfont iconicon-test2"
            @click.stop="deleteWish(val.id)"
          ></i>
        </li>
      </ul>
      <bdd-empty
        v-if="list.length === 0"
        :type="'wish'"
        @toShopping="toShopping"
      ></bdd-empty>
    </div>
  </div>
</template>

<script>
import { formatMoney } from '@/assets/js/filterUtil.js'
import Header from '@/components/personal/header.vue'
import moment from 'moment'
export default {
  name: 'Wish',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.wish,
      coin: this.$store.state.coin,
      list: []
    }
  },
  created() {
    this.getinfo()
  },
  mounted() {},
  methods: {
    formatMoney: formatMoney,
    getinfo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/collection/list`,
          params: {
            type: 1,
            currPage: 1,
            pageSize: 1000
          }
        })
        .then(res => {
          console.log('wish===>', res)
          _this.list = []
          const body = res.list
          for (const i in res.list) {
            const o = body[i]
            o.loading = false
            o.index = i
            o.time = moment(body[i].createTime).format('YYYY-MM-DD')
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
            if (_this.list.length === 0) {
              _this.list.push({ time: o.time, data: [o] })
              continue
            }
            let lock = false
            for (const j in _this.list) {
              if (_this.list[j].time === o.time) {
                lock = j
                break
              }
            }
            if (lock) {
              _this.list[lock].data.push(o)
            } else {
              const obj = {
                time: o.time,
                data: [o]
              }
              _this.list.push(obj)
            }
          }
          console.log('new Wish ===>', _this.list)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    deleteWish(id) {
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: `/wap/collection/delete`,
          params: {
            ids: id
          }
        })
        .then(res => {
          this.$toast.show(this.lang.toast)
          this.getinfo()
        })
        .catch(err => {
          this.$toast.show(err.message)
        })
    },
    goDetail(obj) {
      console.log(obj)
      if (obj.groupId) {
        console.log('有组🆔😂')
        this.$router.push({
          name: 'marriage-ring-pair-ring-detail',
          query: {
            ringId: obj.groupId
          }
        })
      } else {
        console.log('无组🆔😂')
        if (obj.simpleGoodsEntity.categoryId === 1) {
          console.log('是个钻石💎')
          this.$router.push({
            name: 'diamond-diamonds',
            query: {
              goodId: obj.simpleGoodsEntity.goodId
            }
          })
        } else if (obj.simpleGoodsEntity.categoryId === 2) {
          console.log('是个戒指💍')
          if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指💍')
            this.$router.push({
              name: 'marriage-ring-single-ring-detail',
              query: {
                goodId: obj.goodsId
              }
            })
          } else if (obj.simpleGoodsEntity.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指💍')
            this.$router.push({
              name: 'engagement-engagement-rings',
              query: {
                goodId: obj.goodsId
              }
            })
          }
        } else {
          this.$router.push({
            name: 'accessories-accessories',
            query: {
              goodId: obj.goodsId
            }
          })
        }
      }
    },
    toShopping() {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped lang="less">
.wish {
  min-height: 100%;
  background: #f5f5f5;
  .content {
    padding-bottom: 20px;
    ul {
      p {
        width: 100%;
        height: 46px;
        line-height: 46px;
        font-size: 14px;
        color: #999999;
      }
      li {
        position: relative;
        float: left;
        display: inline-block;
        width: 48%;
        height: 100%;
        margin: 0 0 5px 5px;
        background: #ffffff;
        img {
          width: 100%;
        }
        h6 {
          display: inline-block;
          width: 83.3%;
          height: 40px;
          margin: 5px auto;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
        }
        p {
          height: 20px;
          font-size: 16px;
          line-height: 20px;
          font-family: twCenMt;
          font-weight: 400;
          color: rgba(242, 155, 135, 1);
          margin-bottom: 6px;
        }
        i {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 18px;
          color: #bbbbbb;
        }
      }
    }
  }
}
</style>
