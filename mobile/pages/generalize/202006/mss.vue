<template>
	<div class="container">
		<div class="box-1">
			<img src="../../../static/generalize/img_01.jpg" alt="">
			<div class="text">
				<span>匠心独具</span><span>为爱倾心</span>
			</div>
		</div>
		<div class="box-11 bg-2">
			<div class="text1">让钻戒不再遥远
				<!-- <span>MOISSANITE</span> -->
			</div>
			<div class="text2">莫桑石让克拉钻戒不再遥不可及</div>
			<div class="line"></div>
		</div>
		<!-- <img src="../../static/generalize/img_02.jpg" alt=""> -->
		<div class="box-3">
			<img src="../../../static/generalize/img_03.jpg" alt="">
			<div class="text">
				<span class="text1">莫桑石</span>
				<span class="text2">莫桑石</span>
			</div>
		</div>
		<!-- <img src="../../static/generalize/img_04.jpg" alt=""> -->
		<div class="box-4">
			<span>莫桑石拥有比莫桑石更高的折射度和光泽度，</span><br />
			<span>火彩更是南非钻的2.5倍多，更显光泽明亮，火彩惊艳！</span>
		</div>
		<div class="box-5">
			<img src="../../../static/generalize/img_05.jpg" alt="">
			<div class="text">
				<div class="text1">畅销的戒指款式</div>
				<div class="text2">精湛工艺与非凡设计见证每枚戒指的独一无二</div>
				<div class="line"></div>
			</div>
		</div>
		<div class="box-6">
			<a href="http://wap.msjew.com/marriage-ring/single-ring?style=160">
				<img src="../../../static/generalize/img_06.jpg" alt="">
			</a>
		</div>
		<div class="box-7">
			<a class="four-img" href="http://wap.msjew.com/marriage-ring/single-ring-detail?goodId=628&ringType=single">
				<img src="../../../static/generalize/img_07.jpg" alt="">
			</a>

			<a class="four-img" href="http://wap.msjew.com/marriage-ring/single-ring-detail?goodId=560&ringType=single">
				<img src="../../../static/generalize/img_08.jpg" alt="">
			</a>
			<a class="four-img" href="http://wap.msjew.com/marriage-ring/single-ring-detail?goodId=615&ringType=single">
				<img src="../../../static/generalize/img_09.jpg" alt="">
			</a>
			<a class="four-img" href="http://wap.msjew.com/marriage-ring/single-ring-detail?goodId=611&ringType=single">
				<img src="../../../static/generalize/img_10.jpg" alt="">
			</a>
		</div>
		<div class="btn-box">
			<div class="button">
				<a href="http://wap.msjew.com/marriage-ring/single-ring?style=160">{{ lang.more }}</a>
			</div>
			<div class="button bt2">
				<a href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT48608987&lng=cn">{{ lang.immediatelyConsult }}</a>
			</div>
			<div class="text">
				{{ lang.greetCall }}： <a href="tel:0755-25160872-8005">0755-25160872-8005</a>（{{ lang.ringUp }}）
			</div>
		</div>
		<div class="box-11">
			<div class="text1">更是一件艺术品</div>
			<div class="text2">MORESHINE坚持打造有温度有生命的首饰</div>
			<div class="line"></div>
		</div>
		<!-- <img src="../../static/generalize/img_11.jpg" alt=""> -->
		<div class="box-12">
			<img class="margin10" src="../../../static/generalize/img_12.jpg" alt="">
			<div class="text-12">
				<div class="text1">设计创新</div>
				<div class="text2">MORESHINE坚持创作独一无二的艺术臻品</div>
			</div>
		</div>
		<div class="box-13">
			<img class="margin10" src="../../../static/generalize/img_13.jpg" alt="">
			<div class="text-12">
				<div class="text1">分拣筛选</div>
				<div class="text2">MORESHINE专业的分拣人员严格把控每道环节</div>
			</div>
		</div>
		<div class="box-14">
			<img class="margin10" src="../../../static/generalize/img_14.jpg" alt="">
			<div class="text-12">
				<div class="text1">切割打磨</div>
				<div class="text2">MORESHINE工匠们精心雕琢，绽放出闪耀光彩</div>
			</div>
		</div>

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
				<input type="text" v-model="ipt2" :placeholder="lang.placeHolder2" @focus="clearPlaceholder(2)" @blur="restorePlaceholder(2)" @input="input(2)" ref="ipt2" maxlength="11">
				<i v-if="ifShowDel2" class="iconfont iconguanbi" @click="del(2)"></i>
			</div>
			<div class="input-box">
				<input type="text" v-model="ipt3" :placeholder="lang.placeHolder3" @focus="clearPlaceholder(3)" @blur="restorePlaceholder(3)" @input="input(3)" ref="ipt3">
				<i v-if="ifShowDel3" class="iconfont iconguanbi" @click="del(3)"></i>
			</div>
			<div class="button" @click="send">{{ lang.send }}</div>
		</div>

		<div class="box-11">
			<div class="text1">MORESHINE服务保障</div>
			<div class="text2">完善的政策服务保障客户的消费权益</div>
			<div class="line"></div>
		</div>
		<!-- <img src="../../static/generalize/img_16.jpg" alt=""> -->
		<div class="box-17">
			<img class="margin10" src="../../../static/generalize/img_17.jpg" alt="">
			<div class="text-17">
				<div class="text1">证书品质</div>
				<div class="text2">在MORESHINE购买任意一件首饰都附带相关证书说明</div>
			</div>
		</div>
		<div class="box-18">
			<img class="margin10" src="../../../static/generalize/img_18.jpg" alt="">
			<div class="text-17">
				<div class="text1">讲究性价比</div>
				<div class="text2">MORESHINE致力提供高品质的首饰，合理的价格，给客户高质量的选择</div>
			</div>
		</div>
		<div class="box-19">
			<img class="margin10" src="../../../static/generalize/img_19.jpg" alt="">
			<div class="text-17">
				<div class="text1">终身质保</div>
				<div class="text2">MORESHINE首饰高标准挑选制造，客户可安心购买并享有终身质保服务</div>
			</div>
		</div>
		<div class="box-20">
			<img class="margin10" src="../../../static/generalize/img_20.jpg" alt="">
			<div class="text-17">
				<div class="text1">售后无忧</div>
				<div class="text2">在可调整的指圈范围同时前六个月内提供免费的戒指尺寸调整服务</div>
			</div>
		</div>
		<div class="consult">
			<img src="../../../static/generalize/img_21.jpg" alt="">

			<div class="text">
				<div class="text1">{{ lang.question }}？</div>
				<div class="text2">{{ lang.contact1 }}： 0755-25160872-8005</div>
				<div class="btn-s">
					<a href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT48608987&lng=cn">{{ lang.onlineConsult }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		head() {
		  return {
        title: '结婚钻戒_莫桑石_求婚戒指_订婚女戒_婚戒定制|MORESHINE戒指',
        meta: [
          {
            name: 'description',
            content: 'MORESHINE莫桑石订婚戒指,让克拉钻戒不再遥远,点击查看更多畅销的结婚戒指款式,在线咨询专业的珠宝顾问',
          },
          {
          name: 'keywords',
            content: '钻戒,莫桑石,莫桑石,戒指,婚戒',
          }
        ]
      }
		},
		data() {
			return{
				lang: this.LANGUAGE.generalize.index,
				ipt1: '',
				ipt2: '',
				ipt3: '',
				ifShowDel1: false,
				ifShowDel2: false,
				ifShowDel3: false,
				url: [
					require('../../../static/generalize/swiper_01.jpg'),
					require('../../../static/generalize/swiper_02.jpg')
				],
        info: {
          last_name: '',
          first_name: '',
          mobile_code: '+86',
          telphone: '',
          content: '',
          book_date: '',
          book_time: '1',
          type_id: 4,

        }
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

        var len = this.ipt1.length;
        if(len == 2 || len == 3){
          this.info.first_name = this.ipt1.slice(0,1);
          this.info.last_name = this.ipt1.slice(1);;
        }else if(len == 4){
          this.info.first_name = this.ipt1.slice(0,2);
          this.info.last_name = this.ipt1.slice(2);;
        }else if(len == 1){
          this.$toast.show('请输入正确姓名')
          return
        }else if(len > 4){
          // this.$toast.show('请输入正确姓名')
          // return
        }

        var reg = /^1[3456789]\d{9}$/;
        if(!reg.test(this.ipt2)){
          this.$toast.show('请输入正确手机号')
          return
        }

        var obj = new Date(),year,mouth,date;
        year = obj.getFullYear(),
        mouth = obj.getMonth()+1,
        date = obj.getDate(),

        this.info.book_date = year+'_'+mouth+'_'+date
        this.info.telphone = this.ipt2;
        this.info.content = this.ipt3;

        var that = this;
        that
          .$axios({
            method: 'post',
            url: `/web/member/contact/add`,
            data: this.info
          })
          .then(data => {
            // console.log(data)
            this.$toast.show(this.lang.sendSuccess)
          })
          .catch(err => {
            this.$toast.show(this.lang.sendFail)
          })



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
		},
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        console.log(66,to)
        console.log(77,from)
      })
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
		background-color: transparent;
		position: relative;
		color: #333;
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

	.btn-box{
		padding: 0 3%;
		box-sizing: border-box;
		background-color: #fafafa;
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
		font-size: 14px;
		color: #333;
	}
	.contact .iconguanbi{
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		color: #999;
		font-size: 14px;
	}
	.input-box span{
		position: absolute;
		left: 2.5%;
		top: 50%;
		transform: translateY(-50%);
		color: #f00;
		font-size: 15px;
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
		color: #fff;
	}
	.consult .text2{
		width: 220px;
		line-height: 20px;
		font-size: 12px;
		color: #fff;
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
		margin-top: 20px;
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

	.box-1 .text{
		position: absolute;
		left: 0;
		bottom: 50px;
		width: 100%;
		text-align: center;
		font-size: 15px;
		letter-spacing: 4px;
	}
	.box-1 .text span:last-child{
		margin-left: 14px;
	}

	.box-3 .text{
		position: absolute;
		left: 0;
		bottom: 64px;
		width: 100%;
		color: #fff;
		font-size: 12px;
		letter-spacing: 2px;
	}
	.box-3 .text1{
		position: absolute;
		right: 50%;
		width: 130px;
		text-align: center;
	}
	.box-3 .text2{
		position: absolute;
		left: 50%;
		width: 116px;
		text-align: center;
	}
	.box-4{
		height: 116px;
		background-color: #fff;
		font-size: 12px;
		line-height: 24px;
		padding-top: 24px;
		letter-spacing: 1px;
	}
	.box-5 .text{
		position: absolute;
		top: 68px;
		left: 0;
		width: 100%;

	}
	.box-5 .text1{
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 1px;
	}
	.box-5 .text2{
		font-size: 12px;
		margin: 10px 0 14px;
		letter-spacing: 1px;
	}

	.line{
		width: 80px;
		height: 1px;
		background-color: #333;
		transform: scaleY(0.5);
		margin: 0 auto;
	}

	.box-6{
		padding: 8px 10px 0;
		background-color: #fafafa;
	}

	.box-7 {
		width: 100;
		padding: 0 10px;
		background-color: #fafafa;
		font-size: 0;
	}

	.box-7 .four-img {
		width: 49%;
		margin-top: 2%;
	}

	.box-7 .four-img:nth-child(even) {
		margin-left: 2%;
	}
	.box-11{
		height: 136px;
		background-color: #fff;
		padding-top: 52px;
		letter-spacing: 1px;
	}
	.box-11 .text1{
		font-size: 18px;
		font-weight: bold;
		z-index: 2;
	}
	.box-11 .text2{
		font-size: 12px;
		margin: 10px 0 14px;
		color: #999;
	}

	.text-12{
		position: absolute;
		left: 0;
		bottom: 26px;
		width: 100%;
		text-align: center;
		letter-spacing: 1px;
	}
	.text-12 .text1{
		font-size: 15px;
		font-weight: bold;
		color: #fff;
	}
	.text-12 .text2,
	.text-17 .text2{
		font-size: 12px;
		margin-top: 8px;
		color: #fff;
	}

	.text-17{
		position: absolute;
		left: 0;
		bottom: 24px;
		width: 100%;
		text-align: center;
	}
	.text-17 .text1{
		font-size: 12px;
		font-weight: bold;
		color: #fff;
	}

	.box-11 span{
		position: absolute;
		top: -16px;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 24px;
		color: #cce2e8;
		z-index: -1;
		letter-spacing: 4px;
	}
	.bg-2{
		background: url(../../../static/generalize/img_2a.jpg) no-repeat center;
		background-size: 100% 100%;
	}
</style>
