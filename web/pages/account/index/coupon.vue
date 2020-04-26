<template>
  <div class="account">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">优惠券卡包</div>
    </div>
    <div class="base-info">
      <div class="coupon_box clf">
        <div class="list fl">

        </div>
        <div class="list fl"></div>
        <div class="list fl"></div>
      </div>
    </div>

  </div>
</template>

<script>
const lang = 'personal.account'
export default {
  name: 'Index',
  data() {
    return {
      lang,

    }
  }
}
</script>

<style scoped lang="less">
.account {
  width: 100%;
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
  .base-info {
    padding: 40px 28px;
    .base-info-line {
      display: flex;
      font-size: 14px;
      color: #333;
      margin-bottom: 30px;
      .base-info-line-title {
        width: 110px;
        margin-right: 20px;
      }
      .base-name-input {
        display: block;
        width: 190px;
        height: 41px;
        line-height: 41px;
        -webkit-appearance: none;
        outline: 0;
        padding: 0;
        margin: 0 27px 0 0;
        border: 0;
        border-bottom: 1px solid #999;
        color: #999;
        font-size: 14px;
      }
      .gender-choose,
      .marriage-choose {
        display: flex;
        align-items: center;
        .single-radio {
          width: 120px;
          input[type='radio'] {
            width: 14px;
            height: 14px;
            margin-right: 10px;
            -webkit-appearance: radio;
          }
          span {
            cursor: pointer;
          }
        }
      }
      .birthday-choose {
        display: flex;
        align-items: center;
        .single-radio {
          width: 120px;
          position: relative;
          margin-right: 30px;
          border-bottom: 1px solid rgba(153, 153, 153, 1);
          font-size: 14px;
          color: #333;
          span:nth-child(1) {
            display: inline-block;
          }
          span:nth-child(2) {
            width: 50px;
            display: inline-block;
            text-align: center;
            color: #999;
            font-size: 14px;
          }
          .iconxiala {
            position: absolute;
            font-size: 12px;
            width: 12px;
            height: 12px;
            line-height: 12px;
            display: block;
            color: #999;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          select {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
          }
          .once-tell {
            /*width: max-content;*/
            white-space: nowrap;
            position: absolute;
            left: 0;
            bottom: -10px;
            transform: translateY(100%);
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  .base-btn {
    width: 190px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #8b766c;
    color: #8b766c;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-left: 28px;
    // margin-bottom: 50px;
  }
  .bind-info {
    padding: 40px 28px;
    .bind-info-title {
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 20px;
    }
    .bind-info-content {
      .bind-img {
        display: block;
        width: 130px;
        height: 36px;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .bind-input-box {
        font-size: 16px;
        color: #666;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        .bind-input {
          width: 250px;
          height: 30px;
          line-height: 30px;
          -webkit-appearance: none;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 1px solid #666;
          outline: 0;
          margin-right: 10px;
        }
        .bind-input-span {
          cursor: pointer;
        }
      }
      .bind-btn {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        margin-bottom: 30px;
        .bind-status {
          margin-right: 18px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

.list{
  width: 284px;
  height: 226px;
  border: 1px solid rgb(205,173,118);
  background-image: linear-gradient(left, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
  margin-right: 43px;
}
.list:nth-child(3n){
  margin-right: 0;
}
</style>
