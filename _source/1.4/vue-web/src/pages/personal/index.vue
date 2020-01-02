<template>
  <div class="personal clearfix">
    <div class="container">
      <div class="left">
        <div class="header">
          <img :src="headerImage">
          <!-- <b>積分：<p>2634</p></b> -->
          <div class="bottom-text clearfix">
            <p>{{ lang.bddco }}</p>
            <img
              src="../../../static/images/personal/edit.png"
              @click="toPersonalAccount">
          </div>
<!--          <p class="pqq">{{ userInfo.email }}</p>-->
          <p class="pqq">{{ showEmail }}</p>
        </div>
        <ul class="clearfix">
          <li v-for="item in leftlist">
            <router-link :to="{path:item.url}">
              <img :src="item.img">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view v-if="token"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken, clearTwoCustom, clearCustom} from '@/api/cache.js';

export default {
  data() {
    return {
      lang: this.$LANGUAGE.personal.index,
      token: '',
      leftlist: [
        {
          img: require('../../../static/images/personal/order.png'),
          url: '/personal/user-order',
          name: this.$LANGUAGE.personal.index.order
        },
        {
          img: require('../../../static/images/personal/account.png'),
          url: '/personal/account',
          name: this.$LANGUAGE.personal.index.account
        },
        // {
        //   img: require('../../../static/images/personal/comment.png'),
        //   url: '/personal/comment',
        //   name: this.$LANGUAGE.personal.index.comment
        // },
        {
          img: require('../../../static/images/personal/wish.png'),
          url: '/personal/wish',
          name: this.$LANGUAGE.personal.index.wish
        },
        {
          img: require('../../../static/images/personal/diamondContrast.png'),
          url: '/personal/diamondContrast',
          name: this.$LANGUAGE.personal.index.compare
        }
      ]
    };
  },
	created() {
		clearCustom();
		clearTwoCustom ();
	},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    showEmail() {
      let hidenLength = 4;
      let result = this.userInfo.email;
      if (result) {
        result = result.split('@');
        if (result[0].length < (hidenLength + 1)) {
          let newstr = '';
          for (let n = 0; n < result[0].length; n++) {
            newstr += '*';
          }
          result[0] = newstr;
        } else {
          result[0] = result[0].slice(0, result[0].length - hidenLength) + ((new Array(hidenLength)).fill('*')).join('');
        }
      } else {
        result = [];
      }
      if (!result.length) {
        result = '';
      } else {
        result = result.join('@');
      }
      return result;
    },
    headerImage() {
      let header = {
        1: require('../../../static/images/personal/account/men.png'),
        2: require('../../../static/images/personal/account/women.png')
      };
      return header[this.userInfo.gender] || require('../../../static/images/personal/account/unknown.png');
    }
  },
  mounted() {
    // console.log(this.$route);
    // console.log(!getToken());
    this.token = getToken();
    if (!this.token) {
      this.$router.replace({
        name: 'login'
      });
    }
  },
  methods: {
    toPersonalAccount() {
      this.$router.replace({
        name: 'account'
      });
    }
  }
};
</script>

<style lang="less">
  .personal {
    width: 1360px;
    margin: 0 auto;
    padding: 20px 40px;
    background: #f5f3f1;
    border-top: 1px solid #000000;

    .container {
      .left {
        float: left;
        width: 264px;
        background: #ffffff;
        text-align: left;
        padding: 40px 30px;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50px;
        }

        b {
          float: right;
          font-size: 12px;
          color: #333333;
          font-weight: 400;
          margin-top: 52px;

          p {
            display: inline-block;
            font-size: 18px;
            color: #f29b87;
            text-align: left;
          }
        }

        .bottom-text {
          font-size: 14px;
          margin-top: 25px;
          color: #666666;

          p {
            float: left;
          }

          img {
            float: left;
            width: 18px;
            height: 18px;
            margin-left: 20px;
            cursor: pointer;
          }
        }

        .pqq {
          font-size: 14px;
          line-height: 36px;
          color: #666666;
          padding-bottom: 20px;
          border-bottom: 1px solid #ececec;
        }

        ul {
          padding: 10px 0;
          border-bottom: 1px solid #ececec;

          .router-link-active {
            color: #f29b87;
          }

          li {
            font-size: 16px;
            color: #666666;
            padding: 20px 0;

            img {
              float: left;
              width: 20px;
              height: 20px;
              margin-top: 2px;
              margin-right: 25px;
              border-radius: 0;
            }

          }
        }
      }

      .right {
        float: right;
        width: 1000px;
        padding: 40px 30px 20px;
        min-height: 1100px;
        background: #ffffff;

        .header-title {
          text-align: left;

          img {
            float: left;
            width: 26px;
            height: 26px;
          }

          h3 {
            display: inline-block;
            margin-left: 20px;
            font-size: 24px;
            line-height: 26px;
            font-weight: 400;
            color: #f29b87;
          }
        }
      }
    }
  }
</style>
