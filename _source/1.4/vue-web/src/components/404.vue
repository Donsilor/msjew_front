<template>
  <div class="pages">
  			<img src="../../static/images/404page.png"/>
        <p>{{ lang.noPage}}</p>
        <span @click="goHouePage">{{ lang.goHouePage }}</span>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
				lang: this.$LANGUAGE.components.errerPage
      }
    },
    created () {
      this.$nextTick(() => {
      })
    },
    methods: {
      goHouePage () {
				 this.$router.push({
					name: 'index',
				 });
      }
    }
  }
</script>

<style scoped>
.pages {
	 width: 100%;
	 height: 100%;
	 text-align: center;
	 padding-top: 140px;
 }
.pages span {
	display: block;
	margin: 0 auto;
	height: 40px;
	width: 180px;
	border-radius: 10px;
	background: #F8F8F8;
	border: 1px solid #DDDDDD;
	color: #666666;
	font-size: 16px;
	line-height: 40px;
 }
 .pages p {
	 font-size: 16px;
	 color: #666666;
	 margin: 40px 0 24px;
 }
</style>
