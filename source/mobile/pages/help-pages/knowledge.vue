<template>
  <div class="knowledge">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dt>{{ lang.four }}</dt>
        <dd>
          <p>{{ lang.desc }}</p>
          <div class="line-box">
            <button class="full-btn login">
              <span class="btn-message" @click="jump('/diamond/list')">
                {{ lang.more }}
              </span>
            </button>
          </div>
        </dd>
      </dl>
    </div>
    <div class="Show">
      <dl
        v-for="(item, index) in lang.show"
        :key="index"
        @click="link(item.href)"
      >
        <dt>
          <img :src="item.src + '.png'" alt />
        </dt>
        <dt>{{ item.tip }}</dt>
        <dd>
          <p>{{ item.con }}</p>
        </dd>
      </dl>
    </div>
    <div class="View">
      <dl>
        <dd>
          <div class="line-box">
            <button class="full-btn login">
              <span
                class="btn-message"
                @click="jump('/custom-made/diamond-made/diamond-list')"
              >
                {{ lang.custom }}
              </span>
            </button>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'Knowledge',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].knowledge
    }
  },
  methods: {
    link(path) {
      this.$router.push(path)
    },
    jump(path) {
      const obj = {
        steps: [
          {
            goodsId: ``,
            goodsDetailsId: ``,
            ct: ``,
            cartId: ``,
            page: `list`
          },
          {
            goodsId: ``,
            goodsDetailsId: ``,
            ct: ``,
            cartId: ``,
            page: `list`
          }
        ]
      }
      this.$router.push({
        name: `custom-made-diamond-made-diamond-list`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(obj)),
          step: 1
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.Show {
  dl {
    img {
      width: 100%;
    }
  }
}
</style>
