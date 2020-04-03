<template>
  <layout>
    <div class="content">
      <div class="article-title">文章标题</div>
     
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/news/news-classify.vue'
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
  padding-left: 60px;
  padding-right: 60px;
  border: 1px solid rgba(215, 215, 215, 1);
}

</style>
