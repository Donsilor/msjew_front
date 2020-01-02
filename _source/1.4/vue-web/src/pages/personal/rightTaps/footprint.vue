<template>
  <div class="wish">
    <div class="header-title">
      <img src="../../../../static/images/personal/footprint.png" />
      <h3>我的足跡</h3>
    </div>
    <div class="content">
      <div class="wishes">
        <div class="wish-block" v-for="indexk in 4" :key="indexk">
          <div class="wish-img">
            <div>
              <img src="../../../../static/images/index/rings.png" alt="">
            </div>
          </div>
          <div class="wish-price">HKD 14,157.00</div>
          <div class="wish-desc">14K白金2.0毫米传统微弯曲求婚钻指</div>
          <div class="wish-texture">
            <div class="texture" v-for="index in 7" :key="index">
              <i class="iconfont iconmaterial-big-WK1"/>
              <div class="texture-desc">14K白金</div>
            </div>
            <i class="iconfont iconxiala"/>
          </div>
          <i class="iconfont iconxin"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footprint'
}
</script>

<style scoped lang="less">
.wish {
  .header-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
  }
  .content {
    text-align: left;
    padding-top: 20px;
    .wishes {
      display: flex;
      justify-content: space-between;
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
        .wish-img {
          width: 290px;
          height: 290px;
          img {
            display: block;
            width: 100%;
          }
        }
        .wish-price {
          font-family: twCenMt;
          color: #F29B87;
          font-size: 24px;
        }
        .wish-desc {
          font-size: 12px;
          color: #333;
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
</style>
