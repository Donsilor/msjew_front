<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <DetailPair v-if="this.info.categoryId == 19"></DetailPair>
    <DetailSingle v-else-if="this.info.categoryId == 2"></DetailSingle>
    <DetailJewellery v-else></DetailJewellery>
  </div>
</template>

<script>
import Detail from '@/mixins/detail.js'
import Operate from '@/mixins/operate.js'
import TopNav from '@/pageComponents/detail/top-nav.vue'
import ProductImages from '@/pageComponents/detail/product-images.vue'
import OrderInclude from '@/pageComponents/detail/order-include.vue'
import Comments from '@/pageComponents/detail/comments.vue'
import RecommendData from '@/pageComponents/detail/recommend.vue'
import DetailPair from '@/pageComponents/designer/detailPair.vue'
import DetailSingle from '@/pageComponents/designer/detailSingle.vue'
import DetailJewellery from '@/pageComponents/designer/detailJewellery.vue'

const lang = 'detail'
export default {
  head() {
    return {
      title: this.info.goodsName,
      meta: [
        {
          name: 'title',
          content: this.info.goodsName,
        },
        {
          name: 'description',
          content: this.info.goodsName,
        },
        {
          name: 'keywords',
          content: this.info.goodsName,
        }
      ]
    }
  },
  components: {
    TopNav,
    ProductImages,
    OrderInclude,
    Comments,
    RecommendData,
    DetailPair,
    DetailSingle,
    DetailJewellery
  },
  mixins: [Detail, Operate],
  data() {
    const _this = this
    return {
      lang,
      
    }
  },
 
}
</script>

<style lang="less" scoped>
.recommend{
  margin: 110px 0; 
}
.detail-page {
  margin: auto;
}
.sku2 {
  width: 720px;
  padding: 15px 25px;
  box-sizing: border-box;
  background: rgba(250, 250, 246, 1);
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;

  .left-properties {
    width: 230px;
  }
  .right-properties {
    width: 420px;
  }

  .left-properties,
  .right-properties {
    flex-grow: 0;
    flex-shrink: 0;

    .property-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }

      .item-name {
        width: 65px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .property {
        position: relative;
        width: 160px;
        height: 28px;
        margin-right: 10px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        box-sizing: border-box;

        .had-checked {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          cursor: pointer;

          .color-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
          }
          .name {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .drop-down-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;

            font-size: 12px;
            color: #8b766c;
            font-weight: bold;
          }
        }

        .options {
          list-style: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 100%;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1);
          box-sizing: border-box;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s linear;
          z-index: 5;

          .item {
            width: 100%;
            height: 36px;
            padding: 5px 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.2s linear;

            &:hover {
              background-color: rgba(245, 243, 241, 1);
              color: #8b766c;
            }

            &.active {
              background-color: #cebeb0;
              color: #ffffff;
            }

            .color-icon {
              flex-grow: 0;
              flex-shrink: 0;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
            }
            .name {
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              white-space: nowrap;
            }
          }
        }

        &:hover {
          .options {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  .one{
    display: flex;
  }
  .two{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .helper-popover {
      white-space: nowrap;

      .helper-name {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin: 0 6px 0 10px;
      }

      .prompt-icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        font-size: 14px;
        background: #debeab;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        display: inline-block;
        line-height: 14px;
        margin-left: -5px;
      }
    }
    .choose-size{
      text-decoration: underline;
      font-size: 12px;
      color: #aa8a7b;
      cursor: pointer;
      margin-left: 6px;
      line-height: 20px;
    }
  }
}
</style>
