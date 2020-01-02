<template>
  <div class="footer-bar">
    <div class="m1">
      <dl v-for="item in lang.footBar">
        <dt>{{ item.title }}</dt>
        <dd v-for="items in item.list" @click="jump(items.path)">{{ items.name }}</dd>
      </dl>
      <div class="contact">
        <div>{{ lang.contact }}</div>
        <p @click="jump('/contact')">
          <i class="icon iconfont">&#xe641;</i>
          <span>{{ lang.contact1 }}</span>
        </p>
        <p @click="jump('/contact')">
          <i class="icon iconfont">&#xe66a;</i>
          <span>{{ lang.contact2 }}</span>
        </p>
        <p @click="jump('/contact')">
          <i class="icon iconfont">&#xe66e;</i>
          <span>{{ lang.contact3 }}</span>
        </p>
      </div>
    </div>
    <div class="links">
      <ul class="social-links">
        <li v-for="(item, index) in socials" :key="index" class="item">
          <a :href="item.href" target="_blank">
            <div class="item-image">
              <img :src="item.image" />
            </div>
          </a>
        </li>
      </ul>
      <ul class="friend-links">
        <li v-for="(item, index) in friendLinks" :key="index" class="item">
          <a :href="item.href" target="_blank">
            <div class="item-image">
              <img class="default-image" :src="item.grayImage" />
              <img class="active-image" :src="item.image" />
            </div>
          </a>
        </li>
      </ul>
      <ul class="other-links">
        <li v-for="(item, index) in otherLinks" :key="index" class="item">
          <a :href="item.href" target="_blank">
            <div class="item-image">
              <img :src="item.image" />
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="foot clearfix">
      <span class="foot-left">{{ lang.footAbout1 }}</span>
      <span class="foot-right">{{ lang.footAbout2 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarFooter",
  data() {
    return {
      lang: this.$LANGUAGE.components.footer,
      radio: "",
      eamil: "",

      socials: [
        {
          image: require('../../static/images/footerBar/facebook.png'),
          href: 'https://www.facebook.com/bddco.hk'
        },
        {
          image: require('../../static/images/footerBar/ins.png'),
          href: 'https://www.instagram.com/bddco_jewelry/'
        }
      ],
      friendLinks: [
        {
          image: require('../../static/images/footerBar/paypal.png'),
          grayImage: require('../../static/images/footerBar/paypal-gray.png')
        },
        {
          image: require('../../static/images/footerBar/visa.png'),
          grayImage: require('../../static/images/footerBar/visa-gray.png')
        },
        {
          image: require('../../static/images/footerBar/master-card.png'),
          grayImage: require('../../static/images/footerBar/master-card-gray.png')
        },
        {
          image: require('../../static/images/footerBar/union-pay.png'),
          grayImage: require('../../static/images/footerBar/union-pay-gray.png')
        },
        {
          image: require('../../static/images/footerBar/alipay.png'),
          grayImage: require('../../static/images/footerBar/alipay-gray.png')
        },
        {
          image: require('../../static/images/footerBar/wechat.png'),
          grayImage: require('../../static/images/footerBar/wechat-gray.png')
        },
        {
          image: require('../../static/images/footerBar/bank-wire-transfer.png'),
          grayImage: require('../../static/images/footerBar/bank-wire-transfer-gray.png')
        }
      ],
      otherLinks: [
        {
          image: require('../../static/images/footerBar/getseal.png'),
          href:
            'https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=www.bddco.com&lang=en'
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    jump(path) {
      this.$router.push({
        path: path
      });
    }
  }
};
</script>

<style lang="less">
.footer-bar {
  min-width: 1360px;
  background: #ffffff;
  margin: 0 auto;
  .top {
    width: 720px;
    height: 180px;
    margin: 0 auto;
    padding-top: 50px;
    text-align: left;
    .span1 {
      font-size: 18px;
      color: #111111;
      margin-right: 70px;
    }
    p {
      font-size: 12px;
      line-height: 20px;
      margin-top: 16px;
      color: #111111;
    }
    input {
      width: 340px;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      text-align: center;
      font-style: oblique;
      color: #a0a0a0;
      border: none;
      outline: none;
      border-bottom: 1px solid #111111;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #666666;
      background: #ffffff;
    }
    .el-radio__inner::after {
      background-color: #333333;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #666666;
    }
  }
  .contact {
    display: inline-block;
    text-align: left;
    div {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 24px;
    }
    p {
      height: 23px;
      line-height: 23px;
      color: #666666;
      cursor: pointer;
      margin-bottom: 15px;
      i {
        font-size: 23px;
        vertical-align: middle;
        margin-right: 18px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .m1 {
    width: 100%;
    height: 246px;
    background: #ececec;
    margin: 0 auto;
    padding: 40px 0 0 0;
    dl {
      width: 200px;
      display: inline-block;
      vertical-align: top;
      margin-right: 90px;
      text-align: left;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        width: 1px;
        height: 116px;
        top: 11px;
        right: 0px;
        background: #999;
      }

      dt {
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 28px;
      }
      dd {
        font-size: 12px;
        cursor: pointer;
        color: #666666;
        margin-bottom: 10px;
      }
    }
  }
  .links {
    min-width: 1360px;
    max-width: 1366px;
    margin: 0 auto;
    padding: 10px 40px 12px 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .social-links,
    .friend-links,
    .other-links {
      list-style: none;
      display: flex;
      align-items: center;
    }

    .social-links {
      margin-right: 50px;
      flex-grow: 1;
      flex-shrink: 1;

      .item-image {
        margin: 0 4px;
        font-size: 0;
        line-height: 0;

        img {
          height: 30px;
        }
      }
    }

    .friend-links {
      margin-right: 50px;
      flex-grow: 0;
      flex-shrink: 0;

      .item-image {
        margin: 0 10px;
        font-size: 0;
        line-height: 0;

        img {
          height: 33px;
        }

        .default-image {
          display: inline;
        }
        .active-image {
          display: none;
        }

        &:hover {
          .default-image {
            display: none;
          }
          .active-image {
            display: inline;
          }
        }
      }
    }

    .other-links {
      flex-grow: 0;
      flex-shrink: 0;

      .item-image {
        margin: 0 4px;
        font-size: 0;
        line-height: 0;

        img {
          height: 33px;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 52px;
    background: #666666;
    span {
      margin: 0 180px;
      font-size: 12px;
      line-height: 52px;
      color: #ffffff;
    }
  }
}
</style>
