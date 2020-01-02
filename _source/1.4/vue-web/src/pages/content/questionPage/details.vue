<template>
	<div class="questions-content">
		
		<el-container>
			<headerTopNav></headerTopNav>
			<el-main class="list-content">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import headerTopNav from "../questionPage/index";
	export default {
		components: {
			headerTopNav
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>

<style lang="less" scoped>
	.questions-content {
		padding-top: 60px;
		.title {
			text-align: left;
			font-size: 12px;
			color: #000000;
			margin-top: 26px;
			margin-bottom: 26px;
		}
		.list-content {
			width: 1140px;
			margin: 0;
			padding: 0;
			margin-left: 17px;
		}
		width: 1360px;
		margin: 0px auto 60px auto;
		.el-aside-nav {
			border: 1px solid rgba(215, 215, 215, 1);
			height: 750px;
			box-sizing: border-box;
		}
	}
</style>