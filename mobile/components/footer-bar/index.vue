<template>
  <div class="footer-bar">
    <div class="slogan">
      MORESHINE
    </div>
    <section class="gap"></section>
    <!-- 帮助中心 -->
    <section class="help-center">
      <div v-for="(group, index) in menusCn" :key="index" class="menu-group">
        <dl>
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
              <nuxt-link :to="item.to" style="color:#000;">{{ item.name }}</nuxt-link>
            </div>
          </dd>
        </dl>
      </div>
    </section>
    <!-- 联系我们 -->
    <section class="groups">
      <div  :class="['group', { active: isActive(lang.contactUs) }]"> 
        <div class="group-top" @click="changeStatus(lang.contactUs)">
          <span class="group-name">{{ lang.contactUs }}</span>
          <i class="iconfont iconxiala status-icon"></i>
        </div>
        <ul class="group-content">
          <li >
            <div class="item">
              <span class="cont">{{ lang.AddressTile }}</span>
              <div >{{ lang.Address }}</div> 
            </div>
          </li>
          <li >
            <div class="item">
              <span >{{ lang.CallTile }}</span>
              <div >{{ lang.Call }}</div>
            </div>
          </li>
          <li >
            <div class="item">
              <span >{{ lang.EmailTile }} </span>
              <div >{{ lang.Email }}</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="social-media" style="height: 1px !important;"> 
    </section>
    <!-- 备案号 -->
    <div class="copy-right">
      <div class="record-number">{{ lang.copyrightRightMs }}</div>
      <!-- <div v-if="this.$store.state.platform === 21" style="font-size:9px;margin-top:20px;">{{ lang.copyrightRight1 }}<a target="_blank" href="http://www.beian.miit.gov.cn/">20035106</a> {{ lang.copyrightRight2}}</div>
      <span v-else class="text" >Copyright © 2020 MORESHINE</span> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.footerBar,
      activeGroups: [],
      menusCn: [
        {
          groupName: this.LANGUAGE.components.footerBar.helpCenter,
          children: [
            {
              name: this.LANGUAGE.components.footerBar.ShoppingGuide,
              to: {
                // path: '/policies/return-refund-policy'
              }
            },
            {
              name: this.LANGUAGE.components.footerBar.MemberCentre,
              to: {
                // path: '/education/rings/size'
              }
            },
            {
              name: this.LANGUAGE.components.footerBar.WorryFreeAfterSales,
              to: {
                // path: '/education/rings/size'
              }
            },
            {
              name: this.LANGUAGE.components.footerBar.ConvenientDelivery,
              to: {
                // path: '/education/rings/size'
              }
            }
          ]
        }
      ],
    }
  },
  methods: {
    isActive(groupName = '') {
      let active = 0
      if( this.activeGroups.indexOf(groupName) > -1){
        active = false
      } else {
        active = true
      }
      // console.log(active)
      return active
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
  background: #fff;
  margin-top: 20px;
}
.slogan{
  border-top: 2px solid #d4e8ec;
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.gap {
  height: 8px;
  background-color: #d4e8ec;
}

.help-center{
  padding: 40px 0 0 20px;
  .menu-group {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;

    .group-name {
      font-size: 16px;
      color: #000;
      font-weight: 700;
      font-family: CTHeiTiSF;
    }
    .item:nth-of-type(1){
      margin-top: 15px;
    }
    .item {
      margin-left: 30px;
      padding: 6px 0; 
      height: 36px;
      font-size: 14px;
      font-family: CTHeiTiSF;
      font-weight: 400;
      color: #000;
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
        font-size: 14px;
        color: #000;
        a:visited, a:hover, a:active, a:focus{
          color: #000;
        }
      }
    }
  }

  .menu-group:nth-child(even){
    width: 1px;
    height: 80px;
    // background-color: #444;
    align-self: center;
  }
  .menu-group:last-child{
    width: 460px;
  }
}
.groups{
  margin: 15px 0;
}
.group {
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  background-color: #ffffff;

  &:nth-last-of-type(1) {
    border-bottom: 0;
  }
  .group-top {
    height: 44px;
    padding: 0 20px 0 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .group-name {
      flex-grow: 1;
      flex-shrink: 1;
      height: 14px;
      font-size: 16px;
      color: #000;
      font-weight: 700;
      text-align: left;
      transition: all 0.2s linear;
    }
    .status-icon {
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 11px;
      color: #666666;
      transition: all 0.2s linear;
      transform: rotateZ(180deg);
    }
  }
  .group-content {
    padding: 10px 29px 0 50px;
    box-sizing: border-box;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s linear;

    .item {
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #000;
      display: flex;
      span{
        
        text-align: left;
      }
      .cont{
        width: 15%;
      }
      div{
        text-align: left;
        margin-left: 8px;
      }
    }
  }
}
.group.active {
  // .group-name {
  //   color: rgba(242, 155, 135, 1);
  // }
  .status-icon {
    transform: rotateZ(0);
  }
  .group-content {
    padding: 10px 29px 10px 50px;
    max-height: 300px;
  }
}

.social-media {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #000000;
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
  div,a{
     color: #000000;
  }
  .text {
    font-size: 10px;
    font-weight: 400;
    color: rgba(202, 202, 202, 1);
  }
  .record-number{
    font-size:9px;
    margin-top:20px;
    padding: 0 10px;
  }
}
</style>
