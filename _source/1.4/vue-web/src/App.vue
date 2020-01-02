<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive">
		</router-view>
<!--		<live-chat></live-chat>-->
	</div>
</template>

<script>
	// import LiveChat from '@/components/live-chat/index.vue';
	export default {
		name: 'App',
		components: {
			// LiveChat
		}
	}
</script>

<style>
	#app {
		position: relative;
	}
</style>
