<template>
  <div class="container">
    <div class="logo">
      <img src="../../static/cart/ticks.png" alt="">
    </div>

    <div class="article-box">
      <div class="title">三级分类标题</div>
      <div class="article-info">
        <div class="list">
          <a href="/news/news-detail">
            <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
            <div class="time">2010.02.13</div>
          </a>
        </div>
        <div class="list">
          <a href="/news/news-detail">
            <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
            <div class="time">2010.02.13</div>
          </a>
        </div>
        <div class="list">
          <a href="/news/news-detail">
            <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
            <div class="time">2010.02.13</div>
          </a>
        </div>
        <div class="list">
          <a href="/news/news-detail">
            <div class="list-text">(文章标题)钻石百科黄金应该怎样选购？</div>
            <div class="time">2010.02.13</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  a:link,a:visited,a:hover,a:active{
      color: inherit;
  }
  .logo{
    width: 100%;
    height: 120px;
    border-bottom: 2px solid #C0A8A1;
  }
  .logo img{
    width: 100%;
    height: 100%;
  }
  .article-box{
    padding: 0 20px 80px;
    box-sizing: border-box;
    min-height: 200px;
  }
  .title{
    padding-left: 14px;
    box-sizing: border-box;
    height: 50px;
    line-height: 58px;
    font-size: 14px;
    color: #C0A8A1;
    text-align: left;
    border-bottom: 1px solid #C0A8A1;
  }
  .article-info{
    margin-top: 20px;
    padding: 0 20px;
  }
  .article-info .list{
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #999;
    border-bottom: 1px solid #C0A8A1;
  }
  .article-info .list a{
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
  }
  .article-info .list a::after{
    display: block;
    content: '.';
    opacity: 0;
    visibility: hidden;
    clear: both;
    height: 0;
  }
  .list-text{
    float: left;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .time{
    float: right;
    width: 22%;
    text-align: left;
  }

</style>
