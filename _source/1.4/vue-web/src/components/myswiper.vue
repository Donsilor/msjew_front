<template>
  <div class="myswiper-container">
    <div class="advert-swiper-container" v-if="advBanner.length>0" :id='id'>
    	<ul class="my-swiper-wrapper">
    		<li ref="diamondCut" style="color: #000000;" v-for="(item, index) in advBanner" class="my-swiper-slide">
    			<img  @click="openAddress(index)" :src="IMG_URL+item" :style="{cursor:advAddress[index] != 'null'?'pointer':'initial'}" />
    		</li>
    	</ul>
    	<div class="my-swiper-pagination" v-if="advBanner.length>1" data-num='0'>
    		<span v-for="(item,index) in advBanner" :class="advertIndex==index?'advert-active':''" @click.stop="goSlide(index,$event)"></span>
    	</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myswiper',
  props: {
    date: {
    		type: [Object,String],
    		default: function () {
    		  return ''
    		}
    }
  },
  data() {
    return {
    	advAddress: '',
    	slideIndex: 0,
    	advBanner: [],
    	advertIndex: 0,
    	tdOpenType: 1,
			id: 0,
		}
  },
  created() {
		this.getAddres(this.date)
  },
  methods: {
		getAddres(item) {
			this.advAddress = item.ds ? item.ds[0].tdAddres : '';
			this.advBanner = item.ds && item.ds[0].tdImg ? item.ds[0].tdImg : item.dsImg;
			this.advBanner = this.advBanner ? this.advBanner.split(',') : [];
			this.advAddress = this.advAddress ? this.advAddress.split(',') : [];
			this.tdOpenType = item.ds ? item.ds[0].tdOpenType : 1;
		},
		
		openAddress(ind) {
			let openType = this.tdOpenType == 1? "_blank" : "_parent";
			if(this.advAddress[ind] && this.advAddress[ind] != 'null' ) {
				window.open(this.advAddress.indexOf('http') == -1 ? 'http://' + this.advAddress[ind] : this.advAddress[ind],openType)
			}
		},
		goSlide(index,item) {
			let key = "key"+this.id;
			console.log('qwer',this.kai)
			this.kai.slideTo(index + 1);
		}
  },
	
	mounted(){
	let myswiper = document.getElementsByClassName('advert-swiper-container');
	
	for (let i=0; i<myswiper.length; i++) {
			let swiperWrapper = myswiper[i].getElementsByClassName('my-swiper-slide');
			console.log(myswiper,swiperWrapper)
			var timer =setInterval(()=>{
					let j=0;
					j++;
				
						if (i==0) {
							swiperWrapper[0].style.left = swiperWrapper[0].style.left -60*j + "px";
							console.log(swiperWrapper[0].style.left)
						}
					
				},2000)
		}
	}
};
</script>

<style lang="less" scoped="scoped">
	.myswiper-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.my-swiper-wrapper {
			width: 100%;
			height: 100%;
			li {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.my-swiper-pagination {
			position: absolute;
			width: 100%;
			bottom: 20px;
			span {
				cursor: pointer;
				width: 12px;
				margin: 0 14px;
				height: 12px;
				background: rgba(255, 255, 255, 1);
				opacity: 0.5;
				border-radius: 50%;
				display: inline-block;
			}
			.advert-active {
				opacity: 1;
			}
		}
	}
</style>
