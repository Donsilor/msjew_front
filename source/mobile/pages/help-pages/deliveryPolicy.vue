<template>
  <div class="deliveryPolicy">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          <p>{{ lang.title }}</p>
          <p>
            {{ lang.define }}
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com</a
            >
          </p>
        </dd>
        <dt>{{ lang.tit1 }}</dt>
        <dd>
          {{ lang.con1 }}
          <a class="link" @click="jump('freeShipping')">{{ lang.link1 }}</a>
          {{ lang.con2 }}
        </dd>
        <dt>
          <img src="~/static/help-pages/delivery-policy.png" alt />
        </dt>
        <dt>{{ lang.tit2 }}</dt>
        <dd>
          {{ lang.con3 }}
          <a class="link" @click="jump('internationalPolicy')">
            {{ lang.link2 }}
          </a>
        </dd>
        <dt>{{ lang.tit3 }}</dt>
        <dd>{{ lang.con4 }}</dd>
        <dt>{{ lang.tit4 }}</dt>
        <dd>
          {{ lang.con5 }}
          <a class="link" href="mailto:service@bddco.com">service@bddco.com</a>
          {{ lang.mail }}
          <table>
            <thead>
              <tr>
                <th>{{ lang.country }}</th>
                <th>{{ lang.days }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in lang.delivery" :key="index">
                <td>{{ item.country }}</td>
                <td>{{ item.days }}</td>
              </tr>
            </tbody>
          </table>
        </dd>
        <dt>{{ lang.tit5 }}</dt>
        <dd>
          {{ lang.con6 }}
          <a
            class="link"
            href="https://www.fedex.com/zh-hk/home.html"
            target="_blank"
          >
            {{ lang.link3 }}
          </a>
        </dd>
        <i>{{ lang.tip1 }}</i>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'DeliveryPolicy',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].deliveryPolicy
    }
  },
  methods: {
    jump(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
table {
  width: 100%;
  margin: 20px 0;
  thead {
    tr {
      background: #f8f8f8;
    }
    th {
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: #dedede 1px solid;
      font-size: 14px;
      font-weight: bold;
    }
  }
  tbody {
    tr:nth-child(odd) {
      background: #fff;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    td {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      border: #dedede 1px solid;
    }
  }
}
</style>
