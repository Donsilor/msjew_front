<template>
	<div class="container">
		<img src="../../static/generalize/img_01.jpg" alt="">
		<img src="../../static/generalize/img_02.jpg" alt="">
		<img src="../../static/generalize/img_03.jpg" alt="">
		<img src="../../static/generalize/img_04.jpg" alt="">
		<img src="../../static/generalize/img_05.jpg" alt="">
		<div class="box-5">
			<a href="https://wap.bddco.cn/marriage-ring/single-ring?style=160">
				<img src="../../static/generalize/img_06.jpg" alt="">
			</a>
		</div>
		<div class="box-6">
			<a class="four-img" href="https://wap.bddco.cn/marriage-ring/single-ring-detail?goodId=628&ringType=single">
				<img src="../../static/generalize/img_07.jpg" alt="">
			</a>
			
			<a class="four-img" href="https://wap.bddco.cn/marriage-ring/single-ring-detail?goodId=560&ringType=single">
				<img src="../../static/generalize/img_08.jpg" alt="">
			</a>
			<a class="four-img" href="https://wap.bddco.cn/marriage-ring/single-ring-detail?goodId=615&ringType=single">
				<img src="../../static/generalize/img_09.jpg" alt="">
			</a>
			<a class="four-img" href="https://wap.bddco.cn/marriage-ring/single-ring-detail?goodId=611&ringType=single">
				<img src="../../static/generalize/img_10.jpg" alt="">
			</a>
		</div>
		<div class="btn-box">
			<div class="button">
				<a href="https://wap.bddco.cn/marriage-ring/single-ring?style=160">{{ lang.more }}</a>
			</div>
			<div class="button bt2">
				<a href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT48608987&lng=cn">{{ lang.immediatelyConsult }}</a>
			</div>
			<div class="text">
				{{ lang.greetCall }}： <a href="tel:0755-25169121">0755 - 25169121</a>（{{ lang.ringUp }}）
			</div>
		</div>
		<img src="../../static/generalize/img_11.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_12.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_13.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_14.jpg" alt="">
		
		<div class="swiper-box">
			<swiper auto="auto" :duration="3000">
			  <div v-for="(each, n) in url" :key="n" class="swiper-child">
				<nuxt-link to="">
				  <img :src="each"/>
				</nuxt-link>
			  </div>
			</swiper>
			</div>
			<div class="promise-box">
			<div
			  v-for="(c, index) in url"
			  :key="index"
			  class="promise-info"
			></div>
		</div>
		  
		<div class="contact">
			<div class="text">{{ lang.chooseHappiness }}</div>
			<div class="input-box">
				<span>*</span>
				<input type="text" v-model="ipt1" :placeholder="lang.placeHolder1" @focus="clearPlaceholder(1)" @blur="restorePlaceholder(1)" @input="input(1)" ref="ipt1">
				<i v-if="ifShowDel1" class="iconfont iconguanbi" @click="del(1)"></i>
			</div>
			<div class="input-box">
				<span>*</span>
				<input type="text" v-model="ipt2" :placeholder="lang.placeHolder2" @focus="clearPlaceholder(2)" @blur="restorePlaceholder(2)" @input="input(2)" ref="ipt2">
				<i v-if="ifShowDel2" class="iconfont iconguanbi" @click="del(2)"></i>
			</div>
			<div class="input-box">
				<input type="text" v-model="ipt3" :placeholder="lang.placeHolder3" @focus="clearPlaceholder(3)" @blur="restorePlaceholder(3)" @input="input(3)" ref="ipt3">
				<i v-if="ifShowDel3" class="iconfont iconguanbi" @click="del(3)"></i>
			</div>
			<div class="button" @click="send">{{ lang.send }}</div>
		</div>
		<img src="../../static/generalize/img_16.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_17.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_18.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_19.jpg" alt="">
		<img class="margin10" src="../../static/generalize/img_20.jpg" alt="">
		<div class="consult">
			<img src="../../static/generalize/img_21.jpg" alt="">
			
			<div class="text">
				<div class="text1">{{ lang.question }}？</div>
				<div class="text2">{{ lang.contact1 }}： 0755 - 25169121</div>
				<div class="btn-s">
					<a href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT48608987&lng=cn">{{ lang.onlineConsult }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				lang: this.LANGUAGE.generalize.index,
				plac: 123,
				ipt1: '',
				ipt2: '',
				ipt3: '',
				ifShowDel1: false,
				ifShowDel2: false,
				ifShowDel3: false,
				url: [
					require('../../static/generalize/swiper_01.jpg'),
					require('../../static/generalize/swiper_02.jpg')
				]
			}
		},
		methods:{
			clearPlaceholder(k) {
				switch (k){
					case 1: this.$refs.ipt1.placeholder = ''
						break;
					case 2: this.$refs.ipt2.placeholder = ''
						break;
					case 3: this.$refs.ipt3.placeholder = ''
						break;
					default:
						break;
				}
			},
			restorePlaceholder(k) {
				switch (k){
					case 1:
						if(!this.ipt1){
							this.$refs.ipt1.placeholder = this.lang.placeHolder1
						}
						break;
					case 2:
						if(!this.ipt2){
							this.$refs.ipt2.placeholder = this.lang.placeHolder2
						}
						break;
					case 3:
						if(!this.ipt3){
							this.$refs.ipt3.placeholder = this.lang.placeHolder3
						}
						break;
					default:
						break;
				}
			},
			send() {
				if(!this.ipt1 || !this.ipt2){
					this.$toast.show(this.lang.fillMessage)
					return
				}
				
				if(1){
					this.$toast.show(this.lang.sendSuccess)
				}else{
					this.$toast.show(this.lang.sendfail)
				}
			},
			input(k) {
				switch (k){
					case 1:
						if(this.ipt1){
							this.ifShowDel1 = true
						}else{
							this.ifShowDel1 = false
						}
						break;
					case 2:
						if(this.ipt2){
							this.ifShowDel2 = true
						}else{
							this.ifShowDel2 = false
						}
						break;
					case 3:
						if(this.ipt3){
							this.ifShowDel3 = true
						}else{
							this.ifShowDel3 = false
						}
						break;
					default:
						break;
				}
			},
			del(k) {
				switch (k){
					case 1:
						this.ipt1 = '';
						this.ifShowDel1 = false;
						this.$refs.ipt1.placeholder = this.lang.placeHolder1
						break;
					case 2:
						this.ipt2 = '';
						this.ifShowDel2 = false;
						this.$refs.ipt2.placeholder = this.lang.placeHolder2
						break;
					case 3:
						this.ipt3 = '';
						this.ifShowDel3 = false;
						this.$refs.ipt3.placeholder = this.lang.placeHolder3
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
	body{
		background-color: #fafafa;
		box-sizing: border-box;
		white-space: nowrap;
	}
	div{
		width: 100%;
		background-color: #fafafa;
	}
	a{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	img {
		width: 100%;
	}
	input::placeholder{
		color: #c8c8c8;
	}
	input::-webkit-input-placeholder{
		color: #c8c8c8;
	}
	input:-moz-placeholder{
		color: #c8c8c8;
	}
	input::-moz-placeholder{
		color: #c8c8c8;
	}
	input:-ms-input-placeholder{
		color: #c8c8c8;
	}
	
	.margin10{
		margin-bottom: 10px;
	}

	.box-5{
		padding: 2px 3% 0;
	}
	
	.box-6 {
		width: 100;
		padding: 0 3%;
	}

	.box-6 .four-img {
		width: 49%;
		margin-top: 1%;
	}

	.box-6 .four-img:nth-child(even) {
		margin-left: 1%;
	}
	
	.btn-box{
		padding: 0 3%;
		box-sizing: border-box;
	}
	.button{
		width: 100%;
		height: 40px;
		background-color: #6f9eb1;
		margin-top: 30px;
		line-height: 40px;
		color: #fff;
	}
	.button a{
		color: #fff;
	}
	.bt2{
		background-color: #e4ecf0;
		margin: 20px 0;
	}
	.bt2 a{
		color: #333;
	}
	.btn-box .text{
		font-size: 12px;
		color: #333;
		padding-bottom: 30px;
	}
	.btn-box .text a{
		width: auto;
		color: #6f9eb1;
	}
	
	.margin-top-30{
		margin-top: 30px;
	}
	
	.contact{
		padding: 30px 3%;
		background-color: #e4ecf0;
	}
	.contact .text{
		font-size: 18px;
		font-weight: bold;
		color: #333;
		margin-bottom: 24px;
		text-align: center;
		background-color: inherit;
		letter-spacing: 1px;
	}
	.contact .input-box{
		width: 100%;
		height: 40px;
		background-color: #fff;
		margin-bottom: 10px;
		padding: 0 40px 0 6%;
		position: relative;
	}
	.contact input{
		width: 100%;
		height: 100%;
		font-size: 18px;
		color: #333;
	}
	.contact .iconguanbi{
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		color: #999;
	}
	.input-box span{
		position: absolute;
		left: 2.5%;
		top: 50%;
		transform: translateY(-50%);
		color: #f00;
		font-size: 18px;
	}
	
	.consult{
		position: relative;
		text-align: left;
		margin-top: 20px;
	}
	.consult .text{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
		padding: 50px 12% 0;
		color: #fff;
	}
	
	.consult .text1{
		font-size: 18px;
		background-color: transparent;
	}
	.consult .text2{
		width: 220px;
		line-height: 20px;
		font-size: 12px;
		background-color: transparent;
		margin-top: 12px;
	}
	.btn-s{
		width: 150px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		margin: 20px auto;
		background-color: transparent;
		border: 1px solid #fff;
		border-radius: 4px;
	}
	.btn-s a{
		color: #fff;
	}
	
	.swiper-box{
		width: 100%;
		height: 240px;
	}
	.swiper-child{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.swiper-box img{
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
	}
</style>
