<template>
	<div class="slider">
		<div class="title">
			<div @click="cutRangChange2(index)" class="title" :class="{titleselcet: item.id == -1}">{{item.val}}</div>
		</div>
				
			
		<div class="content">
			<div class="range">
				<div class="rang-bg">
					<div @click="cutRangChange(1)" :class="{stop1: cutMin <= 1 }" class="stop first-span"><span v-if="cutMin == 1"><div class="img"></div></span></div>
					<div @click="cutRangChange(2)" :class="{stop2: cutMin <= 2 && 2 < cutMax}" class="stop"><span v-if="cutMin == 2 || cutMax == 2"><div class="img"></div></span></div>
					<div @click="cutRangChange(3)" :class="{stop3: cutMin <= 3 && 3 < cutMax}" class="stop"><span v-if="cutMin == 3 || cutMax == 3"><div class="img"></div></span></div>
					<div @click="cutRangChange(4)" :class="{stop4: cutMin <= 4 && 4 < cutMax}" class="stop"><span v-if="cutMin == 4 || cutMax == 4"><div class="img"></div></span></div>
					<div @click="cutRangChange(5)" :class="{stop5: 6 <= cutMax}" class="stop last-span"><span v-if="cutMin == 5 || cutMax == 5"><div class="img"></div></span><span v-if="cutMax==6" class="last-span"><div class="img"></div></span></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
name: 'slider',
props: {
	list: { // 是否可编辑
	  type: Array,
	  default: true
	},
	max: {
		type: String,
		default: true
	},
	min: {
		type: String,
		default: true
	}
},
 data() {
    return {
			datalist: this.list,
			cutMin: this.min,
			cutMax: this.max
    };
},
created() {
},
  methods: {
	//切工发生改变
	cutRangChange (val) {
		console.log('val:',val)
		if (val>=this.cutMax) {
			this.cutMax = val+1
		} else if (2==(this.cutMax-this.cutMin)) {
			if (val == this.cutMin) {
				console.log('tt',val)
				this.cutMax = val+1
			} else {
				console.log('yy',val)
				this.cutMin = val
			}
		}
		else if (val*2>=(this.cutMax+this.cutMin)) {
			this.cutMax = val
		} else if (val <= this.cutMin) {
			this.cutMin = val
		} else {
			this.cutMin = val
		}
	}
  }
};
</script>

<style lang="less" scoped="scoped">
.slider {
	.range-title {
		li {
			float: left;
			.title {
				color: #D17B8F;
			}
			.titleselcet {
				color: aqua;
			}
				
		}
	}
	.content {
		.range {
			.rang-bg {
				height: 12px;
				width: 100%;
				background: #E4E4E4;
				border-radius: 6px;
				.stop {
					position: relative;
					float: left;
					height: 12px;
					width: 20%;
					background: #E4E4E4;
					border-right: 1px solid #FFFFFF;
					span {
						position: absolute;
						top: -4px;
						left: -11px;
						height: 20px;
						width: 20px;
						margin: 0;
						border-radius: 10px;
						border: 1px solid #E4E4E4;
						background-color: #FFFFFF;
						.img {
							width: 10px;
							height: 10px;
							margin: 5px;
							background: url(../../static/images/diamond/icon-dot.png) no-repeat;
							background-size: cover;
						}
					}
					.last-span {
						left: 68px;
					}
				}
				.first-span {
					border-radius: 6px 0 0 6px;
				}
				.last-span {
					border-radius: 0 6px 6px 0;
				}
				.stop1 {
					background: linear-gradient(to right, #F0BDC7 , #D17B8F);
				}
				.stop2 {
					background: linear-gradient(to right, red , #D17B8F);
				}
				.stop3 {
					background: linear-gradient(to right, #F0BDC7 , red);
				}
				.stop4 {
					background: linear-gradient(to right, #F0BDC7 , #D17B8F);
				}
				.stop5 {
					background: linear-gradient(to right, #F0BDC7 , #D17B8F);
				}
			}
		}
	}
}
</style>
