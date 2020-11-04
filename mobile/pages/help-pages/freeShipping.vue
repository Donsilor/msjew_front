<template>
  <div class="freeShipping">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          {{ lang.define }}
          <table>
            <thead>
              <tr>
                <th>{{ lang.country }}</th>
                <th>{{ lang.value }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in lang.delivery" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'FreeShipping',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].freeShipping
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
