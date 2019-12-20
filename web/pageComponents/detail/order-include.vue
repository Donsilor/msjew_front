<template>
  <section class="order-include">
    <div class="bg">
      <img src="/common/pack.png" />
    </div>
    <div class="content">
      <h1>{{ $t(`${lang}.yourOrderIncludes`) }}</h1>
      <ul>
        <li v-for="(item, index) in services" :key="index" class="item">
          -{{ item.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
const lang = 'detail'
export default {
  data() {
    return {
      lang,
      services: [
        {
          name: this.$t(`${lang}.service1`)
        },
        {
          name: this.$t(`${lang}.service2`)
        },
        {
          name: this.$t(`${lang}.service3`)
        },
        {
          name: this.$t(`${lang}.service4`)
        },
        {
          name: this.$t(`${lang}.service5`)
        },
        {
          name: this.$t(`${lang}.service6`)
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.order-include {
  position: relative;

  .bg {
    font-size: 0;
    line-height: 0;

    img {
      width: 100%;
    }
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translate(0, -50%);

    h1 {
      margin-bottom: 30px;
      font-size: 26px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    ul {
      width: 600px;
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      li {
        margin-bottom: 16px;
        width: 50%;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
