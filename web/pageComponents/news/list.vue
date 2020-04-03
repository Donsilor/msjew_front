<template>
  <layout>
    <div class="content">
      <div class="article-title">三级分类标题</div>
      <div class="article-content">
        <div class="list active">
          <a href="/news/news-detail">
            <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
            <div class="release-time">2323.26.52</div>
          </a>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购钻石百科黄金应该怎样选购钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
        <div class="list">
          <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
          <div class="release-time">2323.26.52</div>
        </div>
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

.article-title{
  height: 90px;
  line-height: 100px;
  font-size: 28px;
  color: #8b766c;
  border-bottom: 1px solid #8B766C;
  padding-left: 40px;
}
.article-content{
  padding: 0 40px;
  margin-top: 30px;
}
.article-content .list{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #E3CFB7;
  color: #999;
  box-sizing: border-box;
  cursor: pointer;
}
.article-content .list.active{
  color: #E3CFB7;
}
.article-content .list a{
  display: block;
  height: 100%;
  color: inherit;
}
.article-content .list a:focus{
  color: inherit;
}
.article-content .list a::after{
  display: block;
  content: '.';
  width: 0;
  height: 0;
  opacity: 0;
  visibility: hidden;
  clear: both;
}

.list-text{
  width: 60%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.release-time{
  width: 10%;
  height: 50px;
  line-height: 76px;
  font-size: 14px;
  float: right;
}

</style>
