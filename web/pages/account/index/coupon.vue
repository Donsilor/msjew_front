<template>
  <div class="account">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.title`) }}</div>
    </div>
    <div class="base-info">
      <div class="coupon_box clf">
        <!-- 优惠券列表 -->
        <div class="list fl" v-for="(item, index) in couponList" :key="index">
           <div class="line-box">
             <div class="point-box">
               <i></i><i></i><i></i><i></i>
             </div>
           </div>

           <div class="price">
             <span class="price-icon">￥</span>
             <span class="price-num">{{item.money}}</span>
             <span class="currency">(usd {{item.money}})</span>
           </div>

           <div class="rule">满{{item.atLeast}}元使用</div>
           <!-- <div class="btn">{{ $t(`${lang}.use`) }}</div> -->
           <div class="use">(限项链使用)</div>
           <div class="time">{{ $t(`${lang}.time`) }}：2020.2.1- 2020.2.2</div>

           <!-- 失效 class="lose-efficacy" -->
           <div :class="['lose-efficacy', {fontSize: language === 'en_US'}]" v-if="item.loseEfficacy">{{ $t(`${lang}.loseEfficacy`) }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const lang = 'coupon'
export default {
  name: 'Index',
  data() {
    return {
      lang,
      language: '',
      couponList: []
    }
  },
  mounted(){
	  this.language = this.getCookie('language')

    // 获取优惠券
    this.$axios.get('web/member/coupon/index', {
      })
      .then(res => {
        this.ifLoading = false;
        this.couponList = res.data.data
      })
      .catch(err => {
        this.ifLoading = false;
        console.log('emmmm')
      })
  },
  methods: {
	  getCookie(cname) {
	    const name = cname + '='
	    const ca = document.cookie.split(';')
	    for (let i = 0; i < ca.length; i++) {
	      const c = ca[i].trim()
	      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
	    }
	    return ''
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
  position: relative;
  width: 284px;
  height: 226px;
  border: 1px solid rgb(205,173,118);
  background-image: linear-gradient(to right, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
  border-bottom: 0;
  margin-right: 43px;
  color: #cdad75;
  border-radius: 5px;
  box-shadow: 0 1px 0 #9C999C,0 2px 0 #D6D5D6,0 3px 0 #E3E1E3,0 4px 0 #D6D5D6,0 5px 0 #EDECED,0 6px 0 #F9F9F9;
  margin-bottom: 30px;

  .line-box{
    width: 258px;
    height: 1px;
    background-color: #A6937C;
    margin: 30px auto 24px;
    position: relative;

    .point-box{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      background-image: linear-gradient(to right, #fcfafb, #f9f7f8);

      i{
        width: 6px;
        height: 6px;
        background-color: #A6937C;
        border-radius: 50%;
      }
    }
  }
  .price{
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;

    .price-icon{
      font-size: 27px;
    }

    .price-num{
      font-size: 67px;
      color: #cdad75;
      margin: -9px 0 0 -4px;
      padding-right: 10px;
    }

    .currency{
      margin-top: 40px;
      font-size: 12px;
    }
  }
  .rule{
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    text-align: center;
    margin-top: -30px;
  }
  .btn{
    width: 190px;
    height: 28px;
    margin: 0 auto;
    background-color: #cdad75;
    font-size: 13px;
    color: #fff;
    text-align: center;
    line-height: 28px;
    border-radius: 2px;
    cursor: pointer;
  }
  .use{
    text-align: center;
    color: #f00;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .time{
    font-size: 13px;
    color: #cdad75;
    text-align: center;
    margin-top: 4px;
  }

  .lose-efficacy{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background-color: #a0a0a0;
    border-radius: 50%;
    font-size: 25px;
    text-align: center;
    line-height: 120px;
    color: #fff;
    opacity: 0.9;
  }
}
.list:nth-child(3n){
  margin-right: 0;
}

.list .lose-efficacy.fontSize{
	font-size: 16px;
}
</style>
