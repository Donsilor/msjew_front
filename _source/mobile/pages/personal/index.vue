<template>
  <div class="personal">
    <div class="top" @click="toAccount('personal-account')">
      <img :src="headImg" />
      <p>{{ date.name }} {{ date.surname }}</p>
      <p>{{ replacepos(date.email, 2, 4, '***') }}</p>
      <i
        class="icon iconfont icongerenzhongxin-_xiugai font-size-18 color-999 margin-bottom-10"
      ></i>
    </div>
    <div class="content">
      <ul class="clearboth">
        <li class="border-top" @click="toNext('personal-order')">
          <i class="icon iconfont left-icon icongerenzhongxin-_dingdan"></i>
          <div class="right">
            <p>{{ lang.p1 }}</p>
            <i class="icon iconfont iconyou"></i>
            <span v-if="orderCount > 0">{{ orderCount }}</span>
          </div>
        </li>
        <li @click="toNext('personal-wish')">
          <i class="icon iconfont left-icon iconicon-xinyuandan"></i>
          <div class="right">
            <p>{{ lang.p2 }}</p>
            <i class="icon iconfont iconyou"></i>
          </div>
        </li>
        <li @click="toNext('personal-comment')">
          <i class="icon iconfont left-icon icongerenzhongxin-_pinglun"></i>
          <div class="right">
            <p>{{ lang.p3 }}</p>
            <i class="icon iconfont iconyou"></i>
          </div>
        </li>
        <li @click="toNext('personal-diamondContrast')">
          <i class="icon iconfont left-icon icongerenzhongxin_duibi"></i>
          <div class="right border-none">
            <p>{{ lang.p4 }}</p>
            <i class="icon iconfont iconyou"></i>
          </div>
        </li>
        <li class="border-top" @click="toNext('personal-address')">
          <i
            class="icon iconfont left-icon icongerenzhongxin-_shouhuodizhi"
          ></i>
          <div class="right">
            <p>{{ lang.p5 }}</p>
            <i class="icon iconfont iconyou"></i>
          </div>
        </li>
        <li @click="toNext('personal-coupon')">
          <i class="icon iconfont left-icon icongerenzhongxin-_youhuiquan"></i>
          <div class="right">
            <p>{{ lang.p6 }}</p>
            <i class="icon iconfont iconyou"></i>
            <span v-if="couponCount > 0">{{ couponCount }}</span>
          </div>
        </li>
        <li @click="toNext('personal-password')">
          <i class="icon iconfont left-icon icongerenzhongxin-_mimaanquan"></i>
          <div class="right">
            <p>{{ lang.p7 }}</p>
            <i class="icon iconfont iconyou"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn" @click="logout">{{ lang.loginOut }}</div>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  layout: 'no-footer-bar',
  middleware: 'mustLogin',
  data() {
    return {
      lang: this.LANGUAGE.personal.index,
      headImg: require('~/static/personal/unknown.png'),
      orderCount: 0,
      couponCount: 0,
      date: ''
    }
  },
  created() {
    this.$store.dispatch('getUserInfo')
    this.getinfo()
  },
  methods: {
    toNext(name) {
      console.log(name)
      this.$router.push({
        name: name
      })
    },
    toAccount(name) {
      this.$router.push({
        name: name,
        query: {
          surname: this.date.surname,
          name: this.date.name,
          marStatus: this.date.marStatus,
          email: this.date.email,
          gender: this.date.gender,
          birthday: this.date.birthday ? this.date.birthday : null
        }
      })
    },
    // 加密显示
    replacepos(text, start, stop, replacetext) {
      if (text) {
        const mystr =
          text.substring(0, stop - 1) + replacetext + text.substring(stop + 1)
        return mystr
      }
    },
    getinfo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/user/me`
        })
        .then(res => {
          this.date = res
          if (this.date === 1) {
            this.headImg = require('~/static/personal/men.png')
          } else if (this.date === 2) {
            this.headImg = require('~/static/personal/women.png')
          } else {
            this.headImg = require('~/static/personal/unknown.png')
          }
        })
        .catch(err => {
          console.log(err)
        })
      _this
        .$axios({
          method: 'get',
          url: `/wap/myAccount/OrderCount`
        })
        .then(res => {
          this.orderCount = res.orderCount
          this.couponCount = res.couponCount
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 退出登录
    logout() {
      const _this = this
      _this.$ConfirmBox({
        title: this.lang.tips,
        message: this.lang.text,
        buttons: [
          {
            text: this.lang.cancel,
            callback: () => {
              console.log('点击了取消')
            }
          },
          {
            text: this.lang.course,
            callback: () => {
              _this.$store.dispatch('logout')
              window.location.href = '/'
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
.personal {
  width: 100%;
  .top {
    width: 100%;
    height: 90px;
    padding: 22px 18px 20px;
    img {
      float: left;
      width: 44px;
      height: 44px;
      margin-right: 14px;
      border-radius: 22px;
    }
    p {
      float: left;
      width: 70%;
      font-size: 16px;
      line-height: 20px;
      text-align: left;
      font-family: PingFangHK-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-child(3) {
      font-size: 14px;
      margin-top: 6px;
    }
    i {
      float: right;
    }
  }
  .content {
    width: 100%;
    .border-top {
      border-top: 8px solid #f6f6f6;
      height: 58px;
    }

    li {
      display: block;
      width: 100%;
      height: 50px;
      padding: 0 18px 28px;
      justify-content: space-around;
      .left-icon {
        float: left;
        width: 6%;
        height: 6%;
        font-size: 18px;
        margin-top: 15px;
        color: #333333;
      }
      .right {
        width: 89%;
        float: right;
        border-bottom: 1px solid #dddddd; /*no*/
        p {
          float: left;
          font-size: 14px;
          line-height: 48px;
          font-family: PingFangHK-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        span {
          float: right;
          width: 20px;
          height: 20px;
          margin-top: 15px;
          background: rgba(242, 155, 135, 1);
          border-radius: 10px;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          font-family: SFProText-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        i {
          float: right;
          width: 20px;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          margin-top: 16px;
          margin-left: 5px;
          color: #999999;
        }
      }
      .border-none {
        border-bottom: none;
      }
    }
  }
  .btn {
    width: 69.33%;
    height: 32px;
    margin: 32px auto 60px;
    line-height: 32px;
    font-weight: 400;
    background: #f8f8f8;
    color: rgba(102, 102, 102, 1);
    border-radius: 4px;
  }
}
</style>
