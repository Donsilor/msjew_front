<template>
  <layout>
    <div class="content">
      <div class="article-title">文章标题</div>
      <div class="article-describe">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述</div>
      <div class="article-detail">内容</div>
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
.article-title{
  line-height: 30px;
  text-align: center;
  font-size: 24px;
  margin: 40px 0;
}
.article-describe{
  font-size: 14px;
  line-height: 20px;
  color: #999;
}
.article-detail{
  margin: 40px 0 80px;
}

</style>
