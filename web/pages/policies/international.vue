<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dd>
          {{ $t(`${lang}.define`) }}
          <br />
          {{ $t(`${lang}.mail`) }}
          <span>service@bddco.com</span>
          {{ $t(`${lang}.know`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit1`) }}</dt>
        <dd>
          {{ $t(`${lang}.con1`) }}
          <br />
          {{ $t(`${lang}.con2`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit2`) }}</dt>
        <dd>{{ $t(`${lang}.con3`) }}</dd>
        <dt>{{ $t(`${lang}.tit3`) }}</dt>
        <dd>{{ $t(`${lang}.con4`) }}</dd>
        <dt>{{ $t(`${lang}.tit4`) }}</dt>
        <dd>{{ $t(`${lang}.con5`) }}</dd>
        <dt>{{ $t(`${lang}.tit5`) }}</dt>
        <dd>{{ $t(`${lang}.con6`) }}</dd>
        <dt>{{ $t(`${lang}.tit6`) }}</dt>
        <dd>
          {{ $t(`${lang}.con7`) }}
          <br />
          {{ $t(`${lang}.con8`) }}
          <br />
          {{ $t(`${lang}.con9`) }}
          {{ $t(`${lang}.con10`) }}
          <span @click="go('freeShipping')">{{ $t(`${lang}.link1`) }}</span>
        </dd>
        <dt>{{ $t(`${lang}.tit7`) }}</dt>
        <dd>{{ $t(`${lang}.con11`) }}</dd>
        <dt>{{ $t(`${lang}.tit8`) }}</dt>
        <dd>
          {{ $t(`${lang}.con12`) }}
          <br />
          {{ $t(`${lang}.con13`) }}
          <br />
          {{ $t(`${lang}.con14`) }}
          <br />
          {{ $t(`${lang}.con15`) }}
          <!-- <br/> 具體內容參照BDD網站：
          <a href='https://www.bddco.com/en/policy/international/' target="_blank"><span>https://www.bddco.com/en/policy/international/</span></a>-->
        </dd>
      </dl>
      <div class="country-name">{{ $t(`${lang}.table1`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              {{ $t(`${lang}.table1`).tbody11 }}
              <br />
              {{ $t(`${lang}.table1`).tbody12 }}
              <br />
              {{ $t(`${lang}.table1`).tbody13 }}
            </td>
            <td rowspan="2">
              {{ $t(`${lang}.table1`).tbody21 }}
              <br />
              {{ $t(`${lang}.table1`).tbody22 }}
            </td>
            <td>{{ $t(`${lang}.table1`).tbody31 }}</td>
            <td>{{ $t(`${lang}.table1`).tbody41 }}</td>
            <td rowspan="2">{{ $t(`${lang}.table1`).tbody51 }}</td>
          </tr>
          <tr>
            <td>{{ $t(`${lang}.table1`).tbody32 }}</td>
            <td>{{ $t(`${lang}.table1`).tbody42 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table1`).tip }}</div>
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.gov.au" target="_blank">
            <span>{{ $t(`${lang}.table1`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table1`).tel }}</div>
      </div>
      <div class="country-name">{{ $t(`${lang}.table2`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table2`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table2`).tbody21 }}</td>
            <td>{{ $t(`${lang}.table2`).tbody31 }}</td>
            <td>{{ $t(`${lang}.table2`).tbody41 }}</td>
            <td>{{ $t(`${lang}.table2`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.cqa.guam.gov" target="_blank">
            <span>{{ $t(`${lang}.table2`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table2`).tel }}</div>
      </div>
      <div class="country-name">{{ $t(`${lang}.table3`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table3`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table3`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table3`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.gov.hk" target="_blank">
            <span>{{ $t(`${lang}.table3`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table3`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table4`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height: 110px;">
              {{ $t(`${lang}.table4`).tbody11 }}
              <br />
              {{ $t(`${lang}.table4`).tbody12 }}
            </td>
            <td>{{ $t(`${lang}.table4`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table4`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table4`).tip }}</div>
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.go.jp " target="_blank">
            <span>{{ $t(`${lang}.table4`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table4`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table5`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table5`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table5`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table5`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.gov.mo" target="_blank">
            <span>{{ $t(`${lang}.table5`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table5`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table6`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height: 110px;">
              {{ $t(`${lang}.table6`).tbody11 }}
              <br />
              {{ $t(`${lang}.table6`).tbody12 }}
            </td>
            <td>{{ $t(`${lang}.table6`).tbody21 }}</td>
            <td>{{ $t(`${lang}.table6`).tbody31 }}</td>
            <td style="width: 172px;">
              {{ $t(`${lang}.table6`).tbody41 }}
              <br />
              {{ $t(`${lang}.table6`).tbody42 }}
            </td>
            <td>{{ $t(`${lang}.table6`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table6`).tip }}</div>
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.govt.nz" target="_blank">
            <span>{{ $t(`${lang}.table6`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table6`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table7`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table7`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table7`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table7`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.cnmidof.net/customs" target="_blank">
            <span>{{ $t(`${lang}.table7`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table7`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table8`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table8`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table8`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table8`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.cbp.gov" target="_blank">
            <span>{{ $t(`${lang}.table8`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table8`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table9`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table9`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table9`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table9`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table9`).tip }}</div>
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.customs.gov.sg" target="_blank">
            <span>{{ $t(`${lang}.table9`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table9`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table10`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table10`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table10`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table10`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table10`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table11`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ $t(`${lang}.table11`).tbody11 }}
              <br />
              {{ $t(`${lang}.table11`).tbody12 }}
              <br />
              {{ $t(`${lang}.table11`).tbody13 }}
              <br />
              {{ $t(`${lang}.table11`).tbody14 }}
            </td>
            <td>{{ $t(`${lang}.table11`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table11`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>{{ $t(`${lang}.table11`).tip }}</div>
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.sharjahcustoms.gov.ae" target="_blank">
            <span>{{ $t(`${lang}.table11`).web }}</span>
          </a>
        </div>
        <div>{{ $t(`${lang}.table11`).tel }}</div>
      </div>

      <div class="country-name">{{ $t(`${lang}.table12`).country }}</div>
      <table>
        <thead>
          <tr>
            <td>{{ $t(`${lang}.thead1`) }}</td>
            <td>{{ $t(`${lang}.thead2`) }}</td>
            <td>{{ $t(`${lang}.thead3`) }}</td>
            <td>{{ $t(`${lang}.thead4`) }}</td>
            <td>{{ $t(`${lang}.thead5`) }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t(`${lang}.table12`).tbody11 }}</td>
            <td>{{ $t(`${lang}.table12`).tbody21 }}</td>
            <td></td>
            <td></td>
            <td>{{ $t(`${lang}.table12`).tbody51 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="remark">
        <div>
          {{ $t(`${lang}.site`) }}
          <a href="http://www.cbp.gov" target="_blank">
            <span>{{ $t(`${lang}.table12`).web }}</span>
          </a>
        </div>
      </div>
      <dl>
        <dt>{{ $t(`${lang}.tit9`) }}</dt>
        <dd>{{ $t(`${lang}.con17`) }}</dd>
        <dt>{{ $t(`${lang}.tit10`) }}</dt>
        <dd>{{ $t(`${lang}.con18`) }}</dd>
        <dt>{{ $t(`${lang}.tit11`) }}</dt>
        <dd>{{ $t(`${lang}.con19`) }}</dd>
        <dd>{{ $t(`${lang}.tip1`) }}</dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.international'
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
  .remark {
    text-align: left;
    font-size: 14px;
    line-height: 32px;
    color: rgba(153, 153, 153, 1);
    margin-top: 20px;
    margin-bottom: 57px;
    span {
      text-decoration: underline;
      cursor: pointer;
      color: #ddb1aa;
    }
  }
  .country-name {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 19px;
  }
  table {
    word-break: break-all;
    border: 1px solid #999999;
    border-left: none;
    width: 100%;
    thead {
      td {
        height: 55px;
        text-align: left;
        text-indent: 11px;
        font-size: 14px;
        font-weight: bold;
        border-left: 1px solid #999999;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #999999;
        &:nth-child(1) {
          width: 235px;
        }
        &:nth-child(2) {
          width: 268px;
        }
        &:nth-child(3) {
          width: 220px;
        }
        &:nth-child(4) {
          width: 132px;
        }
        &:nth-child(5) {
          width: 161px;
        }
      }
    }
    tbody {
      td {
        height: 55px;
        background: #f9f9f9;
        color: #999999;
        font-size: 14px;
        border-left: 1px solid #999999;
        border-bottom: 1px solid #999999;
        padding-left: 11px;
        line-height: 24px;
      }
    }
  }
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
  }
}
</style>
