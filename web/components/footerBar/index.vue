<template>
  <div :class="['footer-bar']">
    <div class="foot-menus">
      <div class="menus">
        <dl v-for="(group, index) in menus" :key="index" class="menu-group">
          <dt class="group-name">{{ group.groupName }}</dt>
          <dd
            v-for="(item, itemIndex) in group.children"
            :key="itemIndex"
            class="item"
          >
            <div v-if="item.icon" class="item-icon">
              <i :class="['iconfont', item.icon]"></i>
            </div>
            <div class="item-name">
              <nuxt-link :to="item.to">{{ item.name }}</nuxt-link>
            </div>
          </dd>
        </dl>
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
    <footer class="copy-right">
      <div class="copy-right-content">
        <div>{{ $t(`${lang}.copyrightLeft`) }}</div>
        <div>{{ $t(`${lang}.copyrightRight`) }}</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
const lang = 'components.footerBar'
export default {
  data() {
    return {
      lang,
      menus: [
        {
          groupName: this.$t(`${lang}.chooseBDD`),
          children: [
            {
              icon: '',
              name: this.$t(`${lang}.qualityAndValue`),
              to: {
                path: '/policies/quality-value'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.returnAndRefundPolicy`),
              to: {
                path: '/policies/return-refund-policy'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.findYourRingSize`),
              to: {
                path: '/education/rings/size'
              }
            }
          ]
        },
        {
          groupName: this.$t(`${lang}.aboutBDD`),
          children: [
            // {
            //   icon: '',
            //   name: this.$t(`${lang}.BDDBrandStory`),
            //   to: {
            //     path: '/brand-story'
            //   }
            // },
            {
              icon: '',
              name: this.$t(`${lang}.diamondKnowledge`),
              to: {
                path: '/education/diamonds/carat'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.paymentMethods`),
              to: {
                path: '/policies/payment-methods'
              }
            }
          ]
        },
        {
          groupName: this.$t(`${lang}.BDDPolicy`),
          children: [
            {
              icon: '',
              name: this.$t(`${lang}.freeShippingService`),
              to: {
                path: '/policies/free-shipping'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.deliveryPolicy`),
              to: {
                path: '/policies/shipping'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.internationalPolicy`),
              to: {
                path: '/policies/international'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.privacyPolicy`),
              to: {
                path: '/policies/privacy-policy'
              }
            },
            {
              icon: '',
              name: this.$t(`${lang}.termsAndConditions`),
              to: {
                path: '/policies/terms-and-conditions'
              }
            }
          ]
        },
        {
          groupName: this.$t(`${lang}.contact`),
          children: [
            {
              icon: 'iconicon-xiaoxi',
              name: this.$t(`${lang}.contactTime`),
              to: {
                path: '/contact-us'
              }
            },
            {
              icon: 'iconphone',
              name: this.$t(`${lang}.contactTel`),
              to: {
                path: '/contact-us'
              }
            },
            {
              icon: 'iconyouxiang',
              name: this.$t(`${lang}.contactEmail`),
              to: {
                path: '/contact-us'
              }
            }
          ]
        }
      ],
      socials: [
        {
          image: '/components/footerBar/facebook.png',
          href: 'https://m.facebook.com/bddco.hk'
        },
        {
          image: '/components/footerBar/ins.png',
          href: 'https://www.instagram.com/bddco_jewelry/'
        }
      ],
      friendLinks: [
        {
          image: '/components/footerBar/paypal.png',
          grayImage: '/components/footerBar/paypal-gray.png'
        },
        {
          image: '/components/footerBar/visa.png',
          grayImage: '/components/footerBar/visa-gray.png'
        },
        {
          image: '/components/footerBar/master-card.png',
          grayImage: '/components/footerBar/master-card-gray.png'
        },
        {
          image: '/components/footerBar/union-pay.png',
          grayImage: '/components/footerBar/union-pay-gray.png'
        },
        {
          image: '/components/footerBar/alipay.png',
          grayImage: '/components/footerBar/alipay-gray.png'
        },
        {
          image: '/components/footerBar/wechat.png',
          grayImage: '/components/footerBar/wechat-gray.png'
        },
        {
          image: '/components/footerBar/bank-wire-transfer.png',
          grayImage: '/components/footerBar/bank-wire-transfer-gray.png'
        }
      ],
      otherLinks: [
        {
          image: '/components/footerBar/getseal.png',
          href:
            'https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=www.bddco.com&lang=en'
        }
      ]
    }
  },
  computed: {
    ...mapState(['cartAmount', 'wishAmount']),
    ...mapGetters(['userInfo', 'hadLogin'])
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    ...mapMutations(['setCoin', 'setLanguage'])
  }
}
</script>

<style lang="less" scoped>
.footer-bar {
  .foot-menus {
    background-color: #ececec;
  }
  .menus {
    min-width: 1360px;
    max-width: 1366px;
    margin: 0 auto;
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .menu-group {
      position: relative;
      flex-grow: 0;
      flex-shrink: 0;

      .group-name {
        margin-bottom: 20px;
        font-size: 14px;
        color: #333;
        font-weight: 700;
        font-family: CTHeiTiSF;
      }
      .item {
        padding: 6px 0;
        font-size: 12px;
        font-family: CTHeiTiSF;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        display: flex;
        align-items: center;

        .item-icon {
          width: 50px;
          flex-grow: 0;
          flex-shrink: 0;
          min-width: 0;

          .iconfont {
            font-size: 23px;
          }
        }
        .item-name {
          flex-grow: 1;
          flex-shrink: 1;
          min-width: 0;
        }
      }

      &:after {
        content: '';
        position: absolute;
        top: 30px;
        right: -100px;
        width: 1px;
        height: calc(100% - 60px);
        background-color: #999999;
      }

      &:nth-last-of-type(1) {
        &:after {
          display: none;
        }
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
  .copy-right {
    background: #666;

    .copy-right-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      min-width: 1360px;
      max-width: 1366px;
      margin: 0 auto;
      padding: 0 40px;
      height: 52px;
      box-sizing: border-box;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
