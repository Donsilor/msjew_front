<template>
  <div class="container">
    <div class="back" @click="goback">返回</div>
    <div class="title">文章标题</div>
    <div class="describe">这是一篇文章这是一篇是一文章这是一篇文章这是一篇是一文章这是一篇文章这是一篇是一文章这是一篇文章这是一篇是一文章这是一篇文章这是一篇是一文章这是一篇文章这是一篇是一文章这是一篇文章</div>
    <div class="detail">文章内容</div>
  </div>
</template>

<script>
  export default{
    methods:{
      goback(){
        history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .container{
    font-family: SourceHanSansCN-N;
  }
  .container{
    position: relative;
    padding: 0 20px 40px;
    min-height: 300px;
  }
  .back{
    width: 40px;
    height: 24px;
    background-color: sandybrown;
    border-radius: 2px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .title{
    width: 100%;
    height: 60px;
    line-height: 78px;
    font-size: 18px;
    text-align: center;
    color: #333;
  }
  .describe{
    text-align: left;
    font-size: 12px;
    color: #A6A6A6;
    line-height: 18px;
  }
  .detail{
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
</style>
