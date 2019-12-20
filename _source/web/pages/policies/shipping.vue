<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dd>
          {{ $t(`${lang}.title`) }}
          <br />
          {{ $t(`${lang}.define`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit1`) }}</dt>
        <dd>
          {{ $t(`${lang}.con1`) }}
          <span @click="go('freeShipping')">{{ $t(`${lang}.link1`) }}</span>
          {{ $t(`${lang}.con2`) }}
          <span @click="go('freeShipping')">{{ $t(`${lang}.link2`) }}</span>
          {{ $t(`${lang}.con3`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit2`) }}</dt>
        <dd>
          {{ $t(`${lang}.con4`) }}
          <span @click="go('internationalPolicy')">{{
            $t(`${lang}.link3`)
          }}</span>
        </dd>
        <dt>{{ $t(`${lang}.tit3`) }}</dt>
        <dd>{{ $t(`${lang}.con5`) }}</dd>
        <dt>{{ $t(`${lang}.tit4`) }}</dt>
        <dd>
          {{ $t(`${lang}.con6`) }}
          <div class="country">
            <div class="head">
              <div>{{ $t(`${lang}.country`) }}</div>
              <div>{{ $t(`${lang}.days`) }}</div>
              <div>{{ $t(`${lang}.country`) }}</div>
              <div>{{ $t(`${lang}.days`) }}</div>
            </div>
            <ul>
              <li v-for="(item, index) in $t(`${lang}.delivery`)" :key="index">
                <div>{{ item.country }}</div>
                <div>{{ item.days }}</div>
              </li>
            </ul>
          </div>
        </dd>
        <dt>{{ $t(`${lang}.tit5`) }}</dt>
        <dd>
          {{ $t(`${lang}.con7`) }}
          <a href="https://www.fedex.com/zh-hk/home.html" target="_blank">
            <span>{{ $t(`${lang}.link4`) }}</span>
          </a>
          <br />
          {{ $t(`${lang}.tip1`) }}
        </dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.shipping'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang
    }
  },
  methods: {
    go(url) {
      this.$router.push({
        path: url
      })
    }
  }
}
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
      background-image: url('/policies/country.png');
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
