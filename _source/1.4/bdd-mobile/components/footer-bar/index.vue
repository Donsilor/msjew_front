<template>
  <div class="footer-bar">
    <section class="gap"></section>
    <section class="groups">
      <div :class="['group', { active: isActive(lang.custoService) }]">
        <div class="group-top" @click="changeStatus(lang.custoService)">
          <span class="group-name">{{ lang.custoService }}</span>
          <i class="iconfont iconxiala status-icon"></i>
        </div>
        <ul class="group-content">
          <li class="item">
            <span>{{ lang.custoServiceTime }}</span>
          </li>
          <li class="item">
            <span>
              {{ lang.callUs }}：
              <a href="tel:(852) 2165 3905">(852) 2165 3905</a>
            </span>
          </li>
          <li class="item">
            <span>
              {{ lang.emailUs }}：
              <a href="mailto:service@bddco.com">service@bddco.com</a>
            </span>
          </li>
        </ul>
      </div>
      <div :class="['group', { active: isActive(lang.aboutBDD) }]">
        <div class="group-top" @click="changeStatus(lang.aboutBDD)">
          <span class="group-name">{{ lang.aboutBDD }}</span>
          <i class="iconfont iconxiala status-icon"></i>
        </div>
        <ul class="group-content">
          <!--          <li class="item">-->
          <!--            <span @click="jump('/help-pages/brandStory')">-->
          <!--              {{ lang.BDDStory }}-->
          <!--            </span>-->
          <!--          </li>-->
          <li class="item">
            <span @click="jump('/help-pages/knowledge')">
              {{ lang.diamondKnowledge }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/paymentMethod')">
              {{ lang.payType }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/qualityValue')">
              {{ lang.qualityAndValue }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/returnedGoods')">
              {{ lang.aboutRefund }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/sizeguide')">
              {{ lang.findRingSize }}
            </span>
          </li>
        </ul>
      </div>
      <div :class="['group', { active: isActive(lang.BDDPolicy) }]">
        <div class="group-top" @click="changeStatus(lang.BDDPolicy)">
          <span class="group-name">{{ lang.BDDPolicy }}</span>
          <i class="iconfont iconxiala status-icon"></i>
        </div>
        <ul class="group-content">
          <li class="item">
            <span @click="jump('/help-pages/freeShipping')">
              {{ lang.freeShipping }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/deliveryPolicy')">
              {{ lang.shippingPolicy }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/internationalPolicy')">
              {{ lang.internationalPolicy }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/privacyPolicy')">
              {{ lang.privacyPolicy }}
            </span>
          </li>
          <li class="item">
            <span @click="jump('/help-pages/clause')">
              {{ lang.termsAndConditions }}
            </span>
          </li>
        </ul>
      </div>
    </section>
    <section class="social-media">
      <!--      <div class="item">-->
      <!--        <i class="iconfont icon_weibo"></i>-->
      <!--      </div>-->
      <!--      <div class="item">-->
      <!--        <i class="iconfont icon_Twitter"></i>-->
      <!--      </div>-->
      <a href="https://www.instagram.com/bddco_jewelry" class="item">
        <span>Instagram</span>
        <i class="iconfont icon_ins"></i>
      </a>
      <div class="line-item"></div>
      <a href="https://www.facebook.com/bddco.hk" class="item">
        <span>Facebook</span>
        <i class="iconfont icon_fb"></i>
      </a>
    </section>
    <section class="page-info">
      <span class="text">{{ lang.onlineStore }}</span>
      <span class="column-line"></span>
      <span class="text">{{ lang.handicraftExpert }}</span>
    </section>
    <div class="copy-right">
      <span class="text">Copyright © 2019 BDD Co.</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.footerBar,
      activeGroups: []
    }
  },
  methods: {
    isActive(groupName = '') {
      return this.activeGroups.indexOf(groupName) > -1
    },
    changeStatus(groupName = '') {
      const activeGroups = JSON.parse(JSON.stringify(this.activeGroups))
      const start = activeGroups.indexOf(groupName)
      if (start > -1) {
        activeGroups.splice(start, 1)
      } else {
        activeGroups.push(groupName)
      }
      this.activeGroups = activeGroups
    },
    jump(path) {
      this.activeGroups = []
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="less" scoped>
.footer-bar {
  position: relative;
  width: 100%;
}
.gap {
  height: 8px;
  background-color: #f5f5f5;
}
.group {
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  background-color: #ffffff;

  &:nth-last-of-type(1) {
    border-bottom: 0;
  }
  .group-top {
    height: 44px;
    padding: 0 20px 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .group-name {
      flex-grow: 1;
      flex-shrink: 1;
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #666666;
      transition: all 0.2s linear;
    }
    .status-icon {
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 11px;
      color: #666666;
      transition: all 0.2s linear;
      transform: rotateZ(0);
    }
  }
  .group-content {
    padding: 0 29px;
    box-sizing: border-box;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s linear;

    .item {
      height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      display: flex;
      align-items: center;
    }
  }
}
.group.active {
  .group-name {
    color: rgba(242, 155, 135, 1);
  }
  .status-icon {
    transform: rotateZ(180deg);
  }
  .group-content {
    padding: 0 29px 10px 29px;
    max-height: 300px;
  }
}

.social-media {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;

  .item {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);

    .iconfont {
      margin-left: 10px;
      font-size: 22px;
      color: #a3a3a3;
    }
  }
  .line-item {
    width: 1px;
    height: 11px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(221, 221, 221, 1);
  }
}
.page-info {
  height: 35px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .column-line {
    width: 1px;
    height: 13px;
    background-color: #999999;
    margin: 0 11px;
  }
}
.copy-right {
  padding-bottom: 20px;
  /*margin-bottom: 20px;*/
  background-color: #ffffff;

  .text {
    font-size: 10px;
    font-weight: 400;
    color: rgba(202, 202, 202, 1);
  }
}
</style>
