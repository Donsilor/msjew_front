<template>
  <div class="internationalPolicy">
    <Header :title="lang.header" />
    <div :class="{ isFixed: isFixed, Nav: true }">
      <div class="Skip">
        <span :class="active == false ? 'active' : ''" @click="toPolicy()">
          {{ lang.tab1 }}
        </span>
        <span :class="active == true ? 'active' : ''" @click="toCharge()">
          {{ lang.tab2 }}
        </span>
      </div>
    </div>
    <div class="View">
      <dl>
        <dd id="policy">
          {{ lang.policy }}
        </dd>
        <dt>
          <img src="~/static/help-pages/international-policy1.png" alt="" />
        </dt>
        <dd>
          <p>
            {{ lang.define }}
          </p>
          <p>
            {{ lang.mail }}
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com
            </a>
            {{ lang.know }}
          </p>
        </dd>
        <dt>{{ lang.tit1 }}</dt>
        <dd>
          <p>
            {{ lang.con1 }}
          </p>
          <p>
            {{ lang.con2 }}
          </p>
        </dd>
        <dt>{{ lang.tit2 }}</dt>
        <dd>
          {{ lang.con3 }}
        </dd>
        <dt>{{ lang.tit3 }}</dt>
        <dd>
          {{ lang.con4 }}
        </dd>
        <dt>{{ lang.tit4 }}</dt>
        <dd>
          {{ lang.con5 }}
        </dd>
        <dt>{{ lang.tit5 }}</dt>
        <dd>
          {{ lang.con6 }}
        </dd>
        <dt>{{ lang.tit6 }}</dt>
        <dd>
          <p>
            {{ lang.con7 }}
          </p>
          <p>
            {{ lang.con8 }}
          </p>
          <p>
            {{ lang.con9 }}
          </p>
          <p>
            {{ lang.con10 }}
            <a class="link" @click="jump('freeShipping')">
              {{ lang.link1 }}
            </a>
          </p>
        </dd>
        <dt>{{ lang.tit7 }}</dt>
        <dd>
          {{ lang.con11 }}
        </dd>
        <dt>
          <img
            id="charge"
            src="~/static/help-pages/international-policy2.png"
            alt=""
          />
        </dt>
        <dt>{{ lang.tit8 }}</dt>
        <dd>
          <p>
            {{ lang.con12 }}
          </p>
          <p>
            {{ lang.con13 }}
          </p>
          <p>
            {{ lang.con14 }}
          </p>
          <p>
            {{ lang.con15 }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table1.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{{ lang.table1.tbody11 }}</p>
                  <p>{{ lang.table1.tbody12 }}</p>
                  <p>{{ lang.table1.tbody13 }}</p>
                </td>
                <td>
                  <p>{{ lang.table1.tbody21 }}</p>
                  <p>{{ lang.table1.tbody22 }}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead3 }}</th>
                <th>{{ lang.thead4 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table1.tbody31 }}</td>
                <td>{{ lang.table1.tbody32 }}</td>
              </tr>
              <tr>
                <td>{{ lang.table1.tbody41 }}</td>
                <td>{{ lang.table1.tbody42 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table1.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table1.tip }}
          </p>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.gov.au" target="_blank">{{
              lang.table1.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table1.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table2.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table2.tbody11 }}</td>
                <td>{{ lang.table2.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead3 }}</th>
                <th>{{ lang.thead4 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table2.tbody31 }}</td>
                <td>{{ lang.table2.tbody41 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table2.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.cqa.guam.gov" target="_blank">{{
              lang.table2.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table2.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table3.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table3.tbody11 }}</td>
                <td>{{ lang.table3.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table3.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.gov.hk" target="_blank">{{
              lang.table3.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table3.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table4.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{{ lang.table4.tbody11 }}</p>
                  <p>{{ lang.table4.tbody12 }}</p>
                </td>
                <td>{{ lang.table4.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table4.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table4.tip }}
          </p>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.go.jp" target="_blank">{{
              lang.table4.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table4.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table5.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table5.tbody11 }}</td>
                <td>{{ lang.table5.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table5.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.gov.mo" target="_blank">{{
              lang.table5.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table5.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table6.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{{ lang.table6.tbody11 }}</p>
                  <p>{{ lang.table6.tbody12 }}</p>
                </td>
                <td>{{ lang.table6.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead3 }}</th>
                <th>{{ lang.thead4 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table6.tbody31 }}</td>
                <td>
                  <p>{{ lang.table6.tbody41 }}</p>
                  <p>{{ lang.table6.tbody42 }}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table6.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table6.tip }}
          </p>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.govt.nz" target="_blank">{{
              lang.table6.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table6.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table7.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table7.tbody11 }}</td>
                <td>{{ lang.table7.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table7.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a
              class="link"
              href="http://www.cnmidof.net/customs"
              target="_blank"
            >
              {{ lang.table7.web }}
            </a>
          </p>
          <p class="tip">
            {{ lang.table7.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table8.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table8.tbody11 }}</td>
                <td>{{ lang.table8.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table8.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.cbp.gov" target="_blank">{{
              lang.table8.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table8.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table9.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table9.tbody11 }}</td>
                <td>{{ lang.table9.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table9.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table9.tip }}
          </p>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.customs.gov.sg" target="_blank">{{
              lang.table9.web
            }}</a>
          </p>
          <p class="tip">
            {{ lang.table9.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table10.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table10.tbody11 }}</td>
                <td>{{ lang.table10.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table10.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table10.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table11.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{{ lang.table11.tbody11 }}</p>
                  <p>{{ lang.table11.tbody12 }}</p>
                  <p>{{ lang.table11.tbody13 }}</p>
                  <p>{{ lang.table11.tbody14 }}</p>
                </td>
                <td>{{ lang.table11.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table11.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.table11.tip }}
          </p>
          <p class="tip">
            網址：
            <a
              class="link"
              href="http://www.sharjahcustoms.gov.ae"
              target="_blank"
            >
              {{ lang.table11.web }}
            </a>
          </p>
          <p class="tip">
            {{ lang.table11.tel }}
          </p>
        </dd>
        <dd>
          <table>
            <caption>
              {{
                lang.table12.country
              }}
            </caption>
            <thead>
              <tr>
                <th>{{ lang.thead1 }}</th>
                <th>{{ lang.thead2 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table12.tbody11 }}</td>
                <td>{{ lang.table12.tbody21 }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{{ lang.thead5 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ lang.table12.tbody51 }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tip">
            {{ lang.site }}
            <a class="link" href="http://www.cbp.gov" target="_blank">{{
              lang.table12.web
            }}</a>
          </p>
        </dd>
        <dt>{{ lang.tit9 }}</dt>
        <dd>
          {{ lang.con16 }}
        </dd>
        <dt>{{ lang.tit10 }}</dt>
        <dd>
          {{ lang.con17 }}
        </dd>
        <dt>{{ lang.tit11 }}</dt>
        <dd>
          <p>
            {{ lang.con18 }}
          </p>
          <p>
            {{ lang.con19 }}
            <a class="link" @click="jump('returnedGoods')">
              {{ lang.link2 }}
            </a>
          </p>
        </dd>
        <i>
          {{ lang.tip1 }}
        </i>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'InternationalPolicy',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].internationalPolicy,
      active: false,
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const high = document.documentElement.scrollTop || document.body.scrollTop
      if (high < 90) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
    },
    toPolicy() {
      this.active = false
      document.getElementById('policy').scrollIntoView()
    },
    toCharge() {
      this.active = true
      document.getElementById('charge').scrollIntoView()
    },
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
.Nav {
  width: 100%;
  height: 50px;
  padding: 10px;
  background: #fff;
  border-bottom: #eee 0.5px solid;
  position: relative;
}
.Nav.isFixed {
  position: fixed;
  top: 0;
}
.Skip {
  width: 230px;
  height: 30px;
  line-height: 28px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  span {
    width: 50%;
    text-align: center;
    color: #666;
    background: rgba(251, 251, 251, 1);
    font-size: 13px;
    border: 1px solid rgba(221, 221, 221, 1);
    &.active {
      color: #fff;
      background: #f29b87;
      border: 1px solid rgba(242, 155, 135, 1);
    }
    &:first-child {
      border-radius: 15px 0px 0px 15px;
      border-right: none;
    }
    &:last-child {
      border-radius: 0px 15px 15px 0px;
      border-left: none;
    }
  }
}
table {
  width: 100%;
  margin: 15px 0;
  caption {
    text-align: center;
    line-height: 35px;
    background: #000;
    color: #fff;
    font-size: 16px;
  }
  thead {
    tr {
      background: #f8f8f8;
    }
    th {
      width: 50%;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      text-align: left;
      border: #dedede 1px solid;
      font-size: 14px;
      font-weight: bold;
    }
  }
  tbody {
    tr {
      background: #fff;
    }
    td {
      line-height: 22px;
      padding: 10px;
      text-align: left;
      font-size: 13px;
      border: #dedede 1px solid;
    }
  }
}
.tip {
  line-height: 25px;
  font-size: 12px;
}
</style>
