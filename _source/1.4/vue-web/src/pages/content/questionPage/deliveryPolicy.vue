<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <dl>
      <dd>
        {{ lang.title }}
        <br />
        {{ lang.define }}
      </dd>
      <dt>{{ lang.tit1 }}</dt>
      <dd>
        {{ lang.con1 }}
        <span @click="go('freeShipping')">{{ lang.link1 }}</span>
        {{ lang.con2 }}
        <span @click="go('freeShipping')">{{ lang.link2 }}</span>
        {{ lang.con3 }}
      </dd>
      <dt>{{ lang.tit2 }}</dt>
      <dd>
        {{ lang.con4 }}
        <span @click="go('internationalPolicy')">{{ lang.link3 }}</span>
      </dd>
      <dt>{{ lang.tit3 }}</dt>
      <dd>{{ lang.con5 }}</dd>
      <dt>{{ lang.tit4 }}</dt>
      <dd>
        {{ lang.con6 }}
        <div class="country">
          <div class="head">
            <div>{{ lang.country }}</div>
            <div>{{ lang.days }}</div>
            <div>{{ lang.country }}</div>
            <div>{{ lang.days }}</div>
          </div>
          <ul>
            <li v-for="(item,index) in lang.delivery" :key="index">
              <div>{{ item.country }}</div>
              <div>{{ item.days }}</div>
            </li>
          </ul>
        </div>
      </dd>
      <dt>{{ lang.tit5 }}</dt>
      <dd>
        {{ lang.con7 }}
        <a href="https://www.fedex.com/zh-hk/home.html" target="_blank">
          <span>{{ lang.link4 }}</span>
        </a>
        <br />
        {{ lang.tip1 }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.deliveryPolicy
    };
  },
  methods: {
    go(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding-left: 60px;
  padding-right: 60px;
  border: 1px solid rgba(215, 215, 215, 1);
  .title {
    font-size: 24px;
    margin: 40px 0px;
    text-align: center;
    color: #000000;
  }
  dt {
    font-weight: bold;
    font-size: 14px;
    color: #666666;
    text-align: left;
  }
  dd {
    text-align: left;
    font-size: 14px;
    color: #999999;
    margin-top: 18px;
    margin-bottom: 59px;
    line-height: 32px;
    span {
      color: #ddb1aa;
      cursor: pointer;
      text-decoration: underline;
    }
    .country {
      margin-top: 10px;
      width: 1019px;
      height: 583px;
      background-image: url("../../../../static/images/knowledge/country.png");
      background-size: 1018px 531px;
      background-position-y: 50px;
      background-repeat: no-repeat;
      border: 1px solid #d7d7d7;
      .head {
        height: 52px;
        line-height: 52px;
        color: #000000;
        font-weight: bold;
        font-size: 16px;
        div {
          float: left;
          width: 25%;
          text-align: left;
          padding-left: 10px;
        }
      }
      ul {
        height: 531px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        li {
          float: left;
          width: 50%;
          padding-left: 50px;
          height: 31px;
          line-height: 32px;
          div {
            float: left;
            &:nth-child(1) {
              width: 215px;
            }
          }
        }
      }
    }
  }
}
</style>