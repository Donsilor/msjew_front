<!-- 選擇飾品 -->

<template>
  <div class="selece-engagement">
    <Header
      :title="title"
      :icon="icon"
      @refresh="infoCustom()"/>
    <div class="d-header clearfix">
      <h4 @click="back">
        {{ lang.back }}
      </h4>
      <div class="r-img">
        <div
          v-for="(item,index) in goods.goodsImages.split(',')"
          v-if="goods.goodsImages"
          :class="imgIndex==index?'img':''"><img
            :src="IMG_URL+item"
            @click="imgIndex=index" ></div>
      </div>
      <div class="m-img">
        <div>
          <img
            v-if="goods.goodsImages"
            :src="IMG_URL+goods.goodsImages.split(',')[imgIndex]" >
        </div>
      </div>
      <div
        v-if="goods && diamond"
        class="r-title">
        <div class="goods-info">
          <div class="goods">
            <img
              v-if="diamond.goodsImages"
              :src="IMG_URL+diamond.goodsImages.split(',')[0]" >
            <div>
              <div>{{ diamond.goodsName }}</div>
              <div>SKU：{{ diamond.sku }}</div>
              <div><span>{{ lang.color }}{{ diamond.color }}</span><span>{{ lang.cleanliness }}{{ diamond.cleanliness }}</span><span>{{ lang.cut }}{{ diamond.cut }}</span></div>
              <label>{{ goods.coinType }} {{ formatMoney(diamond.salePrice) }}</label>
            </div>
          </div>
          <div class="goods">
            <img :src="IMG_URL+goods.goodsImages.split(',')[0]" >
            <div>
              <div>{{ goods.goodsName }}</div>
              <div> SKU：{{ goods.goodsCode }}</div>
              <div><span>{{ lang.color }}{{ materials }}</span><span v-if="sizes">{{ sizesName }}{{ sizes }}</span></div>
              <label>{{ goods.coinType }}  {{ formatMoney(firstdata.retailMallPrice+twodata.retailMallPrice-diamond.salePrice) }}</label>
            </div>
          </div>
        </div>
        <ul class="four-c">
          <li
            v-for="item in goods.goodsServicesJson"
            v-if="goods.goodsServicesJson"><i class="icon iconfont">&#xe653;</i><em>{{ item }}</em></li>
        </ul>
        <b class="price">{{ goods.coinType }} {{ formatMoney(firstdata.retailMallPrice+twodata.retailMallPrice) }}</b>
        <div class="btn">
          <a
            class="add-card"
            @click="addCardList">{{ lang.addCard }}</a>
        </div>
        <div class="more clearfix">
          <a
            class="a4"
            @click="share"><i class="icon iconfont">&#xe655;</i></a>
        </div>
      </div>
    </div>
    <div class="m-title">
      {{ lang.recommend }}
    </div>
    <ul class="recommend-list">
      <li
        v-for="(item, index) in goods.recommends"
        class="li"
        @mouseenter="productMouseEnter"
        @mouseleave="productMouseLeave"
        @click="goSelece(item.id,item.categoryId)">
        <div>
          <img
            v-if="item.goodsImages && item.goodsImages.split(',').length>=3"
            :src="IMG_URL+item.goodsImages.split(',')[2]"
            class="img1" >
          <img
            :src="IMG_URL+item.goodsImages.split(',')[0]"
            class="img2" >
          <b>{{ item.coinType }} {{ formatMoney(item.salePrice) }}</b>
          <p>{{ item.goodsName }}</p>
          <i
            v-if="item.isJoin"
            class="icon iconfont wish">&#xe651;</i>
          <i
            v-if="!item.isJoin"
            class="icon iconfont wish"
            @click.stop="addWishList(item.id)">&#xe650;</i>
        </div>
      </li>
    </ul>
    <menu>
      <li
        :class="anchorPoint==0?'active':''"
        @click="toScroll(0)">{{ lang.goodsDetails }}</li>
      <li
        :class="anchorPoint==2?'active':''"
        @click="toScroll(2)">{{ lang.customerReviews }}</li>
        <!--<li :class="anchorPoint==1?'active':''" @click="toScroll(1)">售後保障</li>-->
    </menu>
    <div class="d-footer">
      <div class="details clearfix scroll-title">
        <div class="clearfix">
          <div class="d1 d">
            <h5>{{ lang.goodsDetails }}</h5>
            <p>{{ lang.goodsCode }}{{ goods.goodsCode }}</p>
          </div>
          <div class="d2 d">
            <p>{{ lang.productParameters }}</p>
            <ul>
              <li v-for="item in goods.specs"><span>{{ item.configName }}:</span><span>{{ item.configAttrName || item.configAttrVal }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detilas-content"
      v-html="goods.goodsDesc"/>
    <div class="bg-foot scroll-title">
      <b>{{ lang.service }}</b>
      <div class="bk">
        <span>- {{ lang.service1 }}</span>
        <span>- {{ lang.service2 }}</span>
        <span>- {{ lang.service3 }}</span>
        <span>- {{ lang.service4 }}</span>
        <span>- {{ lang.service5 }}</span>
        <span>- {{ lang.service6 }}</span>
      </div>
    </div>
    <div class="scroll-title">
      <evaluate/>
    </div>
  </div>
</template>
<script>
import Header from '@/pages/content/header.vue';
import evaluate from '@/components/evaluate.vue';
import { formatMoney } from '@/api/filterUtil.js';
import { getCustom, clearCustom, setCustom, setTwoCustom, getTwoCustom, clearTwoCustom, getDiamondDetails } from '@/api/cache.js';
import { addCard, addWish } from '@/api/func.js';
export default {
  components: {
    evaluate,
    Header
  },
  data() {
    return {
      lang: this.$LANGUAGE.custom,
      anchorPoint: 0, // 锚点索引
      imgIndex: 0, // 图片索引
      detail: null,
      isAdd: true, // 是否可以加入购物车
      goods: {
        goodsImages: ''
      }, // 产品,
      diamond: {
        goodsImages: ''
      },
      // 定制
      firstdata: null,
      twodata: null,
      diamond: null,
      materials: null,
      sizes: null,
      sizesName: null,
      title: '',
      icon: '&#xe61c;'
    };
  },
  watch: {
    $route() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  updated() {
    var eles = document.getElementsByClassName('detilas-content')[0].querySelectorAll('img');
    for (var i = 0; i < eles.length; i++) {
      eles[i].style.width = '100%';
      eles[i].style.display = 'block';
    }
  },
  methods: {
    formatMoney: formatMoney,
    init() {
      this.$axiosPost('web/goods/goodsDetail', {
        goodsId: this.$route.params.id
      }).then(res => {
        if (res.code === 200) {
          this.goods = res.data;
          this.infoCustom(this.goods);
          switch (res.data.categoryId) {
          case 1:
            this.title = this.lang.title1;
            this.icon = '&#xe644;';
            break;
          case 2:
            this.title = this.lang.title2;
            this.icon = '&#xe621;';
            break;
          case 4:
            this.title = this.lang.title4;
            this.icon = '&#xe62c;';
            break;
          case 5:
            this.title = this.lang.title5;
            this.icon = '&#xe612;';
            break;
          case 6:
            this.title = this.lang.title6;
            this.icon = '&#xe631;';
            break;
          case 7:
            this.title = this.lang.title7;
            this.icon = '&#xe614;';
            break;
          case 8:
            this.title = this.lang.title8;
            this.icon = '&#xe61f;';
            break;
          case 9:
            this.title = this.lang.title9;
            this.icon = '&#xe668;';
            break;
          default:
            this.title = this.lang.title0;
            this.icon = '&#xe61c;';
            break;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    infoCustom(data) {
      let firstInfo = getCustom();
      let twoInfo = getTwoCustom();
      this.diamond = getDiamondDetails();
      if (firstInfo) {
        this.firstdata = firstInfo;
      } else {
        this.firstdata = null;
      }
      if (twoInfo) {
        this.twodata = twoInfo;
      } else {
        this.twodata = null;
      }
      if (firstInfo.categoryId == 1) {
        for (let i = 0; i < data.materials.length; i++) {
          if (data.materials[i].id == twoInfo.material) {
            this.materials = data.materials[i].name;
          }
        }
        for (let i = 0; i < data.sizes.length; i++) {
          if (data.sizes[i].id == twoInfo.size) {
            this.sizes = data.sizes[i].name;
          }
        }
        if (twoInfo.categoryId == 2) {
          this.sizesName = this.lang.son;
        } else {
          this.sizesName = `${this.lang.size}：`;
        }
      } else {
        for (let i = 0; i < data.materials.length; i++) {
          if (data.materials[i].id == firstInfo.material) {
            this.materials = data.materials[i].name;
          }
        }
        if (data.sizes) {
          for (let i = 0; i < data.sizes.length; i++) {
            if (data.sizes[i].id == firstInfo.size) {
              this.sizes = data.sizes[i].name;
            }
          }
        }
        if (firstInfo.categoryId == 2) {
          this.sizesName = this.lang.son;
        } else {
          this.sizesName = `${this.lang.size}：`;
        }
      }
    },
    back() {
      history.back();
    },
    moreDetails(ind) {
      this.moreIndex = ind;
    },
    // 分享
    share() {
      window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href), 'newWindow', 'width=1000, height=800', 'center');
    },
    /**
			 * 鼠標進入商品
			 */
    productMouseEnter(e) {
      e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 1;
      if (e.currentTarget.querySelectorAll('.img1').length > 0) {
        e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 1;
      }
    },
    /**
			 * 鼠標離開商品
			 */
    productMouseLeave(e) {
      e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 0;
      if (e.currentTarget.querySelectorAll('.img1').length > 0) {
        e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 0;
      }
    },
    // 查看详情
    goSelece(id, categoryId) {
      document.documentElement.scrollTop = 0;
      clearTwoCustom();
      clearCustom();
      if (categoryId == 4 || categoryId == 8) {
        this.$router.push({
          name: 'seleceJewellery',
          params: {
            id: id,
            key: 2
          }
        });
      } else {
        this.$router.push({
          name: 'seleceEngagement',
          params: {
            id: id,
            key: 888
          }
        });
      }
    },
    /**
			 * 平滑滾動锚点
			 */
    toScroll(index) {
      this.anchorPoint = index;
      let jump = document.querySelectorAll('.scroll-title');
      let scrollContent = document.documentElement.scrollTop ? document.documentElement : document.body;
      let total = jump[index].offsetTop - 110; // 去除頂部高度
      let distance = scrollContent.scrollTop; // 获取需要滚动的距离
      // 平滑滚动，时长300ms，每10ms一跳，共30跳
      let step = total / 30;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 30;
        smoothUp();
      }

      function smoothDown() {
        if (distance < total) {
          distance += step;
          scrollContent.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          scrollContent.scrollTop = total;
        }
      }

      function smoothUp() {
        if (distance > total) {
          distance -= step;
          scrollContent.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          scrollContent.scrollTop = total;
        }
      }
    },

    // 加入购物车
    addCardList() {
      if (this.isAdd) {
        let time = (new Date()).getTime();
        let data = [
          {
            goodsId: this.firstdata.goodsId,
            goodsDetailsId: this.firstdata.id,
            groupType: 2, // (1-对戒类型,2-定制类型) ,
            groupId: time // 对戒（组id）和定制时传（自定义时间戳）
          },
          {
            goodsId: this.twodata.goodsId,
            goodsDetailsId: this.twodata.id,
            groupType: 2, // (1-对戒类型,2-定制类型) ,
            groupId: time // 对戒（组id）和定制时传（自定义时间戳）
          }
        ];
        addCard(1, data, data);
      }
    },
    // 添加心愿单
    addWishList(val) {
      let data = {
        goodsId: val, // 商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
        groupId: null // 组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
      };
      addWish(1, 1, data);
    }

  }
};
</script>
<style lang="less" scoped>
	.selece-engagement {
		width: 1360px;
		margin: 0 auto;
		.d-header {
			h4 {
				font-size: 12px;
				color: #666666;
				text-align: left;
				margin: 20px 0 20px;
				cursor: pointer;
				font-weight: normal;
			}
			.r-img {
				float: left;
				width: 72px;
				height: 500px;
				margin-right: 20px;
				div {
					border: 1px solid #DDDDDD;
					margin-bottom: 14px;
					width: 72px;
					height: 72px;
					border-radius: 2px;
					img {
						cursor: pointer;
						width: 100%;
						height: 100%;
					}
				}
				.img {
					border-color: #DDB1AB;
				}
			}
			.m-img {
				float: left;
				width: 500px;
				height: 500px;
				border: 1px solid #DDDDDD;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.r-title {
				float: left;
				width: 740px;
				margin-left: 26px;
				.goods-info {
					margin-bottom: 20px;
					text-align: left;
					.goods {
						padding-bottom: 17px;
						position: relative;
						border-bottom: 1px solid #EAEAEA;
						&:nth-child(2){
							padding-top: 11px;
						}
						label{
							position: absolute;
							color: #F29B87;
							height: 20px;
							line-height: 20px;
							font-size: 20px;
							top: 50%;
							margin-top: -10px;
							right: 10px;
						}
						img {
							width: 60px;
							height: 60px;
							border-radius: 2px;
							border: 1px solid #dddddd;
							float: left;
						}
						>div{
							margin-left: 74px;
							div{
								&:nth-child(1){
									font-size: 18px;
									color: #333333;
									margin-bottom: 3px;
								}
								&:nth-child(2){
									color: #999999;
									font-size: 14px;
									margin-bottom: 3px;
								}
								&:nth-child(3){
									color: #666666;
									font-size: 14px;
									span{
										margin-right: 14px;
									}
								}
							}
						}
					}
				}
				h3 {
					text-align: left;
					font-size: 24px;
					line-height: 30px;
					color: #333333;
					font-weight: 300;
					margin-bottom: 40px;
				}
				.sku {
					font-size: 18px;
					color: #AAAAAA;
					margin-bottom: 14px;
					text-align: left;
				}
				.four-c {
					height: 110px;
					li {
						font-size: 12px;
						text-align: left;
						color: #999999;
						.icon {
							font-size: 12px;
							line-height: 24px;
							color: #D2D2D2;
							margin-right: 14px;
						}
					}
				}
				.price {
					display: block;
					margin: 55px 0 10px;
					font-size: 30px;
					text-align: left;
					color: #F29B87;
					font-weight: 300;
					font-family: twCenMt;
				}
				.btn {
					float: left;
					width: 100%;
					height: 40px;
					.add-card {
						float: left;
						width: 340px;
						height: 40px;
						margin-right: 20px;
						font-size: 18px;
						line-height: 40px;
						color: #FFFFFF;
						text-align: center;
						cursor: pointer;
						background: #AA8A7B;
					}
					.no-card {
						background: #DDDDDD;
						color: #AAAAAA;
					}
					.add-card-more {
						background: #ffffff;
						border: 1px solid #AA8A7B;
						color: #AA8A7B;
						margin-right: 0;
					}
				}
				.more {
					display: block;
					margin-top: 70px;
					height: 20px;
					text-align: left;
					.a1 {
						float: left;
						height: 20px;
						overflow: hidden;
						font-size: 14px;
						line-height: 20px;
						padding-right: 20px;
						cursor: pointer;
						color: #666666;
						.icon {
							float: left;
							margin-right: 4px;
							font-size: 20px;
						}
						span {
							float: left;
						}
					}
					.a3 {
						display: inline-block;
						padding-right: 8px;
						cursor: pointer;
						height: 20px;
						float: left;
						border-right: 1px dashed #D1D1D1;
						.icon {
							margin-top: -10px;
							display: inline-block;
							font-size: 36px;
							color: #d1a18f;
						}
					}
					.a4 {
						cursor: pointer;
						float: left;
						.icon {
							margin-top: -10px;
							display: inline-block;
							margin-left: -6px;
							font-size: 36px;
							color: #d1a18f;
						}
					}
				}
			}
		}
		.m-title {
			margin-top: 58px;
			padding-left: 27px;
			padding-bottom: 21px;
			font-size: 26px;
			color: #1B1B1B;
			border-bottom: 1px solid #E6E6E6;
			text-align: left;
			span {
				float: right;
				font-size: 12px;
				color: #666666;
				margin-top: 10px;
				cursor: pointer;
			}
		}
		.recommend-list {
			border-top: 1px solid #F4F2F3;
			padding-top: 30px;
			.li {
				position: relative;
				float: left;
				width: 25%;
				height: 480px;
				cursor: pointer;
				border: 10px solid white;
				-webkit-transition: all 0.2s ease-in-out;
				-moz-transition: all 0.2s ease-in-out;
				-ms-transition: all 0.2s ease-in-out;
				transition: all 0.2s ease-in-out;
				margin-bottom: 30px;
				&:hover {
					border-color: #F8F8F8;
				}
				div {
					.img1 {
						opacity: 0;
						position: absolute;
						top: 0;
						left: 0;
						width: 320px;
						height: 320px;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
					}
					.img2 {
						margin-bottom: 10px;
						width: 320px;
						height: 300px;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
					}
					b {
						color: #F29B87;
						font-size: 24px;
						line-height: 40px;
						font-weight: 300;
						font-family: twCenMt;
					}
					.p {
						font-size: #333333;
						color: #333333;
					}
					.wish {
						position: absolute;
						top: 20px;
						left: 280px;
						font-size: 24px;
						opacity: 0;
						color: #AAAAAA;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
					}
					.material-list:hover {
						overflow: visible!important;
					}
					.material-list {
						background: white;
						z-index: 11;
						position: absolute;
						width: 120px;
						top: 400px;
						left: 10px;
						height: 24px;
						overflow: hidden;
						opacity: 0;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
						.list-icon {
							float: right;
							font-size: 14px;
							line-height: 28px;
							color: #999999;
							margin-right: 6px;
						}
						li {
							div>div:hover {
								background: #FAF5F1;
								span {
									color: #333333;
								}
							}
							.icon {
								margin: 0 6px 0 16px;
							}
							span {
								font-size: 12px;
								color: #999999;
							}
							div>div {
								height: 24px;
								line-height: 24px;
								text-align: left;
								background: #ffffff;
							}
						}
						li:nth-child(2) {
							.icon {
								color: #b7b7b7;
							}
						}
						li:nth-child(3) {
							.icon {
								color: #b7b7b7;
							}
						}
						li:nth-child(4) {
							.icon {
								color: #cfb255;
							}
						}
						li:nth-child(5) {
							.icon {
								color: #d9bd63;
							}
						}
						li:nth-child(6) {
							.icon {
								color: #cfdad9;
							}
						}
						li:nth-child(7) {
							.icon {
								color: #ffb496;
							}
						}
					}
				}
			}
		}
		menu {
			text-align: center;
			clear: both;
			margin: 0;
			padding-bottom: 20px;
			li {
				display: inline-block;
				list-style: none;
				width: 202px;
				height: 19px;
				line-height: 19px;
				color: #999999;
				font-size: 16px;
				cursor: pointer;
				position: relative;
			}
			li:not(:last-child) {
				border-right: 1px solid #E8E8E8;
			}
			.active {
				color: #333333;
			}
			.active:after {
				content: '';
				height: 2px;
				background: #000000;
				width: 100%;
				position: absolute;
				left: 0px;
				bottom: -20px;
			}
		}
		.d-footer {
			display: block;
			width: 100%;
			padding-top: 60px;
			clear: both;
			border-top: 1px solid #E6E6E6;
			.details {
				.d {
					float: left;
					width: 300px;
					padding-bottom: 110px;
				}
				.d1 {
					margin-left: 30px;
					text-align: left;
					h5 {
						font-size: 26px;
						color: #333333;
						text-align: left;
						margin-bottom: 13px;
					}
					p {
						display: inline-block;
						width: 180px;
						height: 50px;
						font-size: 18px;
						line-height: 16px;
						color: #333333
					}
					a {
						display: block;
						font-size: 12px;
						text-decoration: underline;
						color: #AA8A7B;
						margin-top: 150px;
					}
				}
				.d2,
				.d3 {
					width: 600px;
					margin-right: 20px;
					font-size: 12px;
					line-height: 20px;
					color: #333333;
					text-align: left;
					p {
						margin-bottom: 30px;
					}
					ul {
						li {
							cursor: pointer;
							color: #1b1b1b;
							float: left;
							margin-bottom: 10px;
							width: 50%;
							span {
								display: inline-block;
								width: 40%;
							}
						}
						.active {
							color: #CFA48D;
							background: #F9EAE7;
						}
					}
				}
				.d4 {
					font-size: 12px;
					line-height: 20px;
					color: #333333;
					text-align: left;
					p {
						margin-bottom: 30px;
					}
					.text {
						width: 230px;
						height: 220px;
						padding: 18px 20px;
						font-size: 14px;
						line-height: 20px;
						color: #333333;
						background: #FFF7F5;
						border: 1px solid #F9EAE7;
						border-radius: 10px;
					}
				}
			}
		}
		.detilas-content {
			text-align: left;
			margin-bottom: 60px;
			img {
				width: 100%;
				display: block;
			}
		}
		.bg-foot {
			margin-bottom: 61px;
			height: 460px;
			padding: 140px 0 0 90px;
			text-align: left;
			background-image: url('../../../static/images/diamond/pack.png');
			background-size: cover;
			b {
				display: block;
				font-size: 26px;
				color: #333333;
				margin-bottom: 25px;
				font-weight: 300;
			}
			.bk {
				width: 740px;
				span {
					display: inline-block;
					width: 30%;
					height: 32px;
					font-size: 16px;
					line-height: 32px;
				}
			}
		}
	}
</style>
