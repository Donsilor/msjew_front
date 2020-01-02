<template>
  <div class="selece-diamond">
    <Header
      :title="lang.title"
      icon="&#xe644;"
      typeId="1"
      @refresh="infoCustom()"/>
    <div class="d-header clearfix">
      <h4 @click="back">{{ lang.back }}</h4>
      <div class="r-img">
        <div
          v-if="goods.goods3ds"
          :class="imgIndex==0?'img':''"
          @click="open360"><img
            src="../../../../static/images/diamond/360.png"
            class="360-img" ></div>
        <div
          v-for="(item,index) in goods.goodsImages.split(',')"
          v-if="goods.goodsImages"
          :class="((imgIndex==index && !goods.goods3ds) || (goods.goods3ds && imgIndex==index+1))?'img':''"><img
            :src="IMG_URL+item"
            @click="imgIndex=goods.goods3ds?index+1:index,show360=false" ></div>
        <div
          v-if="goods.goodsGiaImage">
          <a
            :href="goods.goodsGiaImage"
            target="_blank">
            <img
              src="../../../../static/images/diamond/gia-img.png"
              class="gia-img" >
          </a>
        </div>
      </div>
      <div class="m-img">
        <div>
          <img
            v-if="goods.goodsImages && !show360"
            :src="IMG_URL+goods.goodsImages.split(',')[goods.goods3ds?imgIndex-1:imgIndex]" >
          <iframe
            v-if="show360"
            id="inner360frame"
            :src="'https://spins0.arqspin.com/iframe.html?spin='+goods.goods3ds+'&is=0.16'"
            scrolling="no"
            frameborder="0"/>
        </div>
      </div>
      <div class="r-title">
        <h3>{{ goods.goodsName }}</h3>
        <p class="sku">{{ lang.goodsCode }}{{ goods.goodsCode }}</p>
        <ul class="four-c">
          <li
            v-for="item in goods.goodsServicesJsons"
            v-if="goods.goodsServicesJsons">
            <img
              :src="IMG_URL+item.img"
              class="img">
            <em>{{ item.name }}</em>
          </li>
        </ul>
        <b class="price">{{ goods.coinType }} {{ formatMoney(goods.salePrice) }}</b>
        <div
          v-if="goods.goodsStatus==2"
          class="btn">
          <ul
            v-if="!step1"
            :class="isAdd?'':'no-card'"
            class="clearfix ">
            <li @click="addCustomization(0,1)">{{ lang.addToRing }}</li>
<!--            <li>{{ lang.addTo }}<i class="icon iconfont margin-left-10">&#xe652;</i></li>-->
<!--            <li @click="addCustomization(0,1)">{{ lang.customRing }}</li>-->
<!--            <li @click="addCustomization(206,2)">{{ lang.customNecklace }}</li>-->
<!--            <li @click="addCustomization(210,2)">{{ lang.customBracelet }}</li>-->
          </ul>
          <a
            v-if="isAdd && !step1"
            class="add-card"
            @click="addCardList">{{ lang.addCard }}</a>
          <a
            v-if="!isAdd && !step1"
            class="add-card no-card">{{ lang.addCard }}</a>
          <a
            v-if="step1"
            :class="isAdd?'':'no-card'"
            class="add-card"
            @click="addMoreTow">{{ lang.confirmSelection }}</a>
        </div>
        <div
          v-if="goods.goodsStatus!=2"
          class="btn">
          <a class="add-card no-card">{{ lang.removed }}</a>
        </div>
        <div class="more clearfix">
          <a
            v-if="goods.isJoin"
            class="a1"
            @click="addWishList(1,$route.params.id)"><i class="icon iconfont">&#xe65b;</i><span>{{ lang.wish }}</span></a>
          <a
            v-if="!goods.isJoin"
            class="a1"
            @click="addWishList(1,$route.params.id)"><i class="icon iconfont">&#xe645;</i><span>{{ lang.wish }}</span></a>
          <a
            class="a2"
            @click="addWishList(2,$route.params.id)"><i class="icon iconfont">&#xe64c;</i><span>{{ lang.contrast }}</span></a>
          <a
            class="a4"
            @click="share"><i class="icon iconfont">&#xe655;</i></a>
        </div>
      </div>
    </div>
    <div class="d-footer">
      <ul class="f-title">
        <div class="b-r">
          <li @click="toScroll(0)">{{ lang.goodsDetails }}</li>
          <span/>
          <li @click="toScroll(1)">{{ lang.fore }}</li>
        </div>
      </ul>
      <div class="details clearfix scroll-title">
        <div class="clearfix">
          <div class="d1 d">
            <h5>{{ lang.goodsDetails }}</h5>
            <p>{{ lang.goodsCode }}{{ goods.goodsCode }}</p>
            <a @click="goDiamondCarat">{{ lang.lookMore }}</a>
          </div>
          <div class="d2 d">
            <p>{{ lang.diamondInformation }}</p>
            <ul>
              <li v-for="item in goods.specs"><span>{{ item.configName }}：</span><span>{{ item.configAttrName || item.configAttrVal }}</span></li>
            </ul>
          </div>
        </div>
        <div class="bg-foot">
          <div>{{ lang.service }}</div>
          <ul>
            <li>- {{ lang.service1 }}</li>
            <li>- {{ lang.service2 }}</li>
            <li>- {{ lang.service3 }}</li>
            <li>- {{ lang.service4 }}</li>
            <li>- {{ lang.service5 }}</li>
            <li>- {{ lang.service6 }}</li>
          </ul>
        </div>
      </div>
      <div
        v-if="goods.specs"
        class="four-c scroll-title">
        <p class="p-title">{{ lang.specs }}</p>
        <div
          v-show="caratWeight"
          class="carat c-content">
          <h6>{{ lang.weight }}: {{ caratWeight }}-{{ lang.carat }}</h6>
          <p class="tips"/>
          <div class="c-body">
            <img
              class="img"
              src="../../../../static/images/diamond/carat.png" >
            <div class="test">
              <p>{{ caratWeight }}{{ lang.caratWeight }}</p>
              <p>{{ lang.tips }}</p>
              <img
                ref="carat"
                :style="{left:(caratWeight*456 - 66)+'px'}"
                src="../../../../static/images/diamond/up.png" >
            </div>
          </div>
        </div>
        <div
          v-show="color"
          class="color c-content">
          <h6>{{ lang.color }}: {{ color }}</h6>
          <p class="tips"/>
          <div class="c-body">
            <ul class="clearfix">
              <li :class="{active: colorIndex == 31}"><span>D</span><img src="../../../../static/images/diamond/D.png" ></li>
              <li :class="{active: colorIndex == 32}"><span>E</span><img src="../../../../static/images/diamond/E.png" ></li>
              <li :class="{active: colorIndex == 33}"><span>F</span><img src="../../../../static/images/diamond/F.png" ></li>
              <li :class="{active: colorIndex == 34}"><span>G</span><img src="../../../../static/images/diamond/G.png" ></li>
              <li :class="{active: colorIndex == 35}"><span>H</span><img src="../../../../static/images/diamond/H.png" ></li>
              <li :class="{active: colorIndex == 36}"><span>I</span><img src="../../../../static/images/diamond/I.png" ></li>
              <li :class="{active: colorIndex == 37}"><span>J</span><img src="../../../../static/images/diamond/J.png" ></li>
              <li><span>K</span><img src="../../../../static/images/diamond/K.png" ></li>
              <li><span>Z</span><img src="../../../../static/images/diamond/Z.png" ></li>
            </ul>
            <div class="clearfix color-explain">
              <div class="explain-1">
                <div/>
                <p>{{ lang.color1 }}</p>
              </div>
              <div class="explain-2">
                <div/>
                <p>{{ lang.color2 }}</p>
              </div>
              <div class="explain-3">
                <div/>
                <p>{{ lang.color3 }}<br>{{ lang.color0 }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="cut"
          class="cut c-content">
          <h6>{{ lang.cut }}: {{ cut }}</h6>
          <p class="tips"/>
          <div class="c-body margin-top-50">
            <img
              class="img"
              src="../../../../static/images/diamond/cut.png" >
            <div class="test">
              <p>{{ cutName }}</p>
              <p>{{ lang.cutTips }}</p>
              <img
                ref="img"
                :style="{left:(cutIndex*200 - 80)+'px'}"
                src="../../../../static/images/diamond/up.png" >
            </div>
          </div>
        </div>
        <div
          v-show="carat"
          class="carat c-content">
          <h6>{{ lang.caratTip }}: {{ carat }}</h6>
          <p class="tips"/>
          <div class="c-body clearfix margin-top-40">
            <div class="left">
              <ul>
                <li :class="{active:caratIndex == 44 || caratIndex == 45}">
                  <span>FL/LF</span>
                  <div>
                    <b>FL/LF</b>
                    <p>{{ lang.caratTips1 }}</p>
                    <img src="../../../../static/images/diamond/left.png" >
                  </div>
                </li>
                <li :class="{active:caratIndex == 42 || caratIndex == 43}">
                  <span>VVS1/VVS2</span>
                  <div>
                    <b>VVS1/VVS2</b>
                    <p>{{ lang.caratTips2 }}</p>
                    <img src="../../../../static/images/diamond/left.png" >
                  </div>
                </li>
                <li :class="{active:caratIndex == 40 || caratIndex == 41}">
                  <span>VS1/VS2</span>
                  <div>
                    <b>VS1/VS2</b>
                    <p>{{ lang.caratTips3 }}</p>
                    <img src="../../../../static/images/diamond/left.png" >
                  </div>
                </li>
                <li :class="{active:caratIndex == 38 || caratIndex == 39}">
                  <span>SI1/SI2</span>
                  <div>
                    <b>SI1/SI2</b>
                    <p>{{ lang.caratTips4 }}</p>
                    <img src="../../../../static/images/diamond/left.png" >
                  </div>
                </li>
                <li>
                  <span>I1/I2/I3</span>
                  <div>
                    <b>I1/I2/I3</b>
                    <p>{{ lang.caratTips5 }}</p>
                    <img src="../../../../static/images/diamond/left.png" >
                  </div>
                </li>
              </ul>
            </div>
            <div class="right">
              <p>{{ lang.big }}</p>
              <img
                v-if="caratIndex == 44 || caratIndex == 45"
                src="../../../../static/images/diamond/FL.png" >
              <img
                v-if="caratIndex == 43 || caratIndex == 42"
                src="../../../../static/images/diamond/VVS1.png" >
              <img
                v-if="caratIndex == 40 || caratIndex == 41"
                src="../../../../static/images/diamond/VS1.png" >
              <img
                v-if="caratIndex == 38 || caratIndex == 39"
                src="../../../../static/images/diamond/SI1.png" >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney } from '@/api/filterUtil.js';
import { addCard, addWish } from '@/api/func.js';
import Header from '@/pages/content/header.vue';
import { IMG_URL } from '@/api/paramsConfig.js';
import { getCustom, clearCustom, setCustom, setTwoCustom, getTwoCustom, clearTwoCustom, setDiamondList, setDiamondDetails } from '@/api/cache.js';
export default {
  components: {
    Header
  },
  data() {
    return {
      lang: this.$LANGUAGE.diamond.seleceDiamond,
      IMG_URL: IMG_URL,
      show360: false,
      imgIndex: 0,
      caratWeight: 0,
      color: null,
      colorIndex: null,
      cut: null,
      cutName: null,
      cutIndex: 0,
      carat: null,
      caratName: null,
      caratIndex: null,
      isAdd: false,
      goods: {
        goodsImages: ''
      },
      // 定制
      firstdata: null,
      twodata: null,
      step1: false,
      step1Lock: false,
      step2: false
    };
  },
  watch: {
    $route() {
      this.show360 = false;
      this.imgIndex = 0;
      this.init();
      this.infoCustom();
    }
  },
  created() {
    this.init();
    this.infoCustom();
  },
  methods: {
    formatMoney: formatMoney,
    open360() {
      this.imgIndex = 0;
      this.show360 = true;
    },
    init() {
      document.documentElement.scrollTop = 0;
      this.$axiosPost('web/goods/goodsDetail', {
        goodsId: this.$route.params.id
      }).then(res => {
        if (res.code === 200) {
          let gay = false;
          let gayNum = ``;
          res.data.specs.forEach(item => {
            if (item.configId === 191) {
              gayNum = item.configAttrVal;
            } else if (item.configId === 192 && item.configAttrId === 442) {
              gay = true;
            }
          });
          res.data.goodsGiaImage = gay ? 'https://www.gia.edu/report-check?reportno=' + gayNum : ``;
          this.goods = res.data;
          if (this.goods.goods3ds) {
            this.show360 = true;
          }
          if (this.goods.details[0].stock > 0) {
            this.isAdd = true;
          }
          for (let i = 0; i < this.goods.specs.length; i++) {
            if (this.goods.specs[i].configId == 31) {
              this.caratWeight = this.goods.specs[i].configAttrVal;
            } else if (this.goods.specs[i].configId == 34) {
              this.color = this.goods.specs[i].configAttrVal;
              this.colorIndex = this.goods.specs[i].configAttrId;
            } else if (this.goods.specs[i].configId == 33) {
              this.cut = this.goods.specs[i].configAttrVal;
              this.cutName = this.goods.specs[i].configAttrName;
              if (this.goods.specs[i].configAttrId == 30) {
                this.cutIndex = 2;
              } else if (this.goods.specs[i].configAttrId == 29) {
                this.cutIndex = 3;
              } else if (this.goods.specs[i].configAttrId == 28) {
                this.cutIndex = 4;
              }
            } else if (this.goods.specs[i].configId == 35) {
              this.carat = this.goods.specs[i].configAttrVal;
              this.caratName = this.goods.specs[i].configAttrName;
              this.caratIndex = this.goods.specs[i].configAttrId;
            }
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 分享
    share() {
      window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href), 'newWindow', 'width=1000, height=800', 'center');
    },
    infoCustom() {
      let firstInfo = getCustom();
      let twoInfo = getTwoCustom();
      if (this.$route.params.key !== 'look1' && this.$route.params.key !== 'look2') {
        clearTwoCustom();
        twoInfo = getTwoCustom();
        if (firstInfo && firstInfo.categoryId == 1) {
          clearCustom();
          firstInfo = getCustom();
        }
      }
      if (firstInfo) {
        this.step1 = true;
        this.firstdata = firstInfo;
        if (firstInfo.categoryId == 1) {
          this.step1Lock = true;
        }
      } else {
        this.step1 = false,
        this.firstdata = null;
      }
      if (twoInfo) {
        this.step2 = true,
        this.twodata = twoInfo;
      } else {
        this.step2 = false,
        this.twodata = null;
      }
    },
    goDiamondCarat(id) {
      document.documentElement.scrollTop = 0;
      this.$router.push({
        name: 'diamondCarat'
      });
    },
    // 打开pdf证书
    openPdf() {
      window.open(IMG_URL + this.goods.goodsGiaImage);
    },
    back() {
      history.go(-1);
    },
    /**
			 * 添加定制(第一步)
			 */
    addCustomization(id, key) {
      if (this.isAdd) {
        this.setDiamond();
        setCustom(this.goods.details[0]);
        clearTwoCustom();
        this.$router.push({
          name: key == 1 ? 'engagementRing' : 'jewelleryAccessories',
          params: {
            id: id,
            key: key
          }
        });
      }
    },
    // 添加定制第二步
    addMoreTow() {
      if (this.isAdd) {
        let id = null;
        let first = getCustom();
        let tow = getTwoCustom();
        if (first && first.categoryId != 1) {
          id = first.goodsId;
          setTwoCustom(this.goods.details[0]);
        } else {
          id = tow.goodsId;
          setCustom(this.goods.details[0]);
        }
        this.setDiamond();
        this.$router.push({
          name: 'custom',
          params: {
            id: id
          }
        });
      }
    },
    setDiamond() {
      let diamondDetails = {
        goodsImages: this.goods.goodsImages,
        goodsName: this.goods.goodsName,
        sku: this.goods.goodsCode,
        carat: '',
        shape: '',
        color: '',
        cleanliness: '',
        cut: '',
        salePrice: this.goods.salePrice
      };
      for (let i = 0; i < this.goods.specs.length; i++) {
        if (this.goods.specs[i].configId == 31) {
          diamondDetails.carat = this.goods.specs[i].configAttrVal;
        } else if (this.goods.specs[i].configId == 32) {
          diamondDetails.shape = this.goods.specs[i].configAttrVal;
        } else if (this.goods.specs[i].configId == 33) {
          diamondDetails.cut = this.goods.specs[i].configAttrVal;
        } else if (this.goods.specs[i].configId == 34) {
          diamondDetails.color = this.goods.specs[i].configAttrVal;
        } else if (this.goods.specs[i].configId == 35) {
          diamondDetails.cleanliness = this.goods.specs[i].configAttrVal;
        }
      }
      setDiamondDetails(diamondDetails);
    },
    // 添加心愿单
    addWishList(type, id) {
      let data = {
        goodsId: id, // 商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
        groupId: null // 组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
      };
      addWish(1, type, data);
      /* if(type==1){
					this.goods.isJoin=true;
					this.goods= Object.assign({},this.goods,this.goods);
				} */
    },
    // 加入购物车
    addCardList() {
      let data = {
        goodsId: this.$route.params.id,
        goodsDetailsId: this.goods.details[0].id,
        groupType: null, // (1-对戒类型,2-定制类型) ,
        groupId: null // 对戒（组id）和定制时传（自定义时间戳）
      };
      addCard(1, data);
    },
    /**
			 * 平滑滾動锚点
			 */
    toScroll(index) {
      this.anchorPoint = index;
      let jump = document.querySelectorAll('.scroll-title');
      let scrollContent = document.documentElement.scrollTop ? document.documentElement : document.body;
      let total = jump[index].offsetTop - 75; // 去除頂部高度
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
    }
  }
};
</script>
<style lang="less" scoped>
	.selece-diamond {
		width: 1360px;
		margin: 0 auto;
		.d-header {
			h4 {
				font-size: 12px;
				color: #666666;
				text-align: left;
				margin: 10px 0 20px;
				font-weight: normal;
				cursor: pointer;
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
				.gia-img {
					width: 64px;
					height: 21px;
					margin-top: 25px;
				}
			}
			.m-img {
				float: left;
				width: 500px;
				height: 500px;
				overflow: hidden;
				border: 1px solid #DDDDDD;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
				iframe {
					width: 498px;
					height:498px;
					z-index: 100;
				}
			}
			.r-title {
				float: left;
				width: 700px;
				margin-left: 26px;
				h3 {
					text-align: left;
					font-size: 24px;
					line-height: 30px;
					color: #333333;
					font-weight: 400;
					margin-bottom: 40px;
				}
				.sku {
					font-size: 18px;
					color: #AAAAAA;
					margin-bottom: 30px;
					text-align: left;
				}
				.four-c {
					height: 115px;
					li {
						font-size: 12px;
						color: #999999;
						line-height: 16px;
						margin-top: 8px;
						display: flex;
						justify-content: start;
						.img {
							width: 16px;
							height: 16px;
							float: left;
							margin-right: 4px;
						}
					}
				}
				.price {
					display: block;
					margin: 140px 0 10px;
					font-size: 30px;
					text-align: left;
					font-weight: 300;
					color: #F29B87;
					font-weight: 300;
					font-family: twCenMt;
				}
				.btn {
					float: left;
					width: 100%;
					height: 40px;
					ul {
						float: left;
						width: 240px;
						height: 40px;
						overflow: hidden;
						margin: 0 18px 0 0;
						border: 1px solid #AA8A7B;
						cursor: pointer;
						background: white;
						position: relative;
						/*&:hover {*/
						/*	height: 152px;*/
						/*}*/
						li {
							font-size: 16px;
							line-height: 37px;
							color: #666666;
							&:hover {
								color: #333333;
								background: #fdf5f1;
							}
						}
						li:first-child {
							color: #AA8A7B;
							font-size: 18px;
							&:hover {
								color: #AA8A7B;
								background: #FFFFFF;
							}
						}
					}
					.add-card {
						float: left;
						width: 320px;
						margin-right: 20px;
						height: 40px;
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
						border: none;
						li {
							color: #AAAAAA!important;
							&:hover {
								background: #DDDDDD!important;
							}
						}
						&:hover {
							height: 40px;
						}
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
						border-right: 1px dashed #D1D1D1;
						.icon {
							color: #AAAAAA;
							float: left;
							margin-right: 4px;
							font-size: 20px;
						}
						span {
							float: left;
						}
					}
					.a2 {
						float: left;
						/*width: 150px;*/
						height: 20px;
						overflow: hidden;
						cursor: pointer;
						font-size: 14px;
						line-height: 20px;
						.icon {
							color: #AAAAAA;
							float: left;
							margin-right: 6px;
							padding-left: 20px;
							font-size: 36px;
						}
						span {
							float: left;
						}
					}
					.a3 {
						display: inline-block;
						margin-left: 66px;
						padding-right: 8px;
						cursor: pointer;
						height: 20px;
						border-right: 1px dashed #D1D1D1;
						.icon {
							display: inline-block;
							margin-top: -10px;
							font-size: 36px;
							color: #d1a18f;
						}
					}
					.a4 {
						margin-left: 5px;
						cursor: pointer;
						.icon {
							display: inline-block;
							margin-top: -10px;
							font-size: 36px;
							color: #d1a18f;
						}
					}
				}
			}
		}
		.d-footer {
			display: block;
			width: 100%;
			.f-title {
				margin-top: 40px;
				height: 57px;
				border-bottom: 1px solid #E8E8E8;
				.b-r {
					display: inline-block;
					width: 345px;
					margin: 0 auto;
					li {
						float: left;
						width: 160px;
						height: 56px;
						font-size: 16px;
						line-height: 56px;
						cursor: pointer;
						color: #999999;
					}
					span {
						float: left;
						margin: 18px 12px 0;
						height: 20px;
						width: 1px;
						background: #E8E8E8;
					}
					.active {
						color: #333333;
						border-bottom: 1px solid #111111;
					}
				}
			}
			.details {
				.clearfix {
					position: relative;
					margin-bottom: 83px;
				}
				.d {
					float: left;
					width: 300px;
					margin-top: 60px;
				}
				.d1 {
					margin-left: 30px;
					text-align: left;
					h5 {
						font-size: 26px;
						color: #333333;
						text-align: left;
						font-weight: 400;
						margin-bottom: 20px;
						line-height: 26px;
						height: 26px;
					}
					p {
						display: inline-block;
						width: 180px;
						height: 50px;
						font-size: 12px;
						line-height: 16px;
						color: #333333
					}
					a {
						position: absolute;
						bottom: 5px;
						height: 20px;
						line-height: 20px;
						display: block;
						font-size: 12px;
						text-decoration: underline;
						color: #AA8A7B;
						cursor: pointer;
					}
				}
				.d2,
				.d3 {
					width: 700px;
					margin-right: 20px;
					font-size: 12px;
					line-height: 20px;
					color: #333333;
					text-align: left;
					p {
						margin-bottom: 17px;
					}
					ul {
						li {
							float: left;
							width: 50%;
							margin-bottom: 5px;
							span {
								display: inline-block;
								width: 50%;
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
						margin-bottom: 17px;
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
				.bg-foot {
					width: 1360px;
					height: 460px;
					text-align: left;
					background-image: url('../../../../static/images/diamond/pack.png');
					background-size: cover;
					padding-left: 89px;
					padding-top: 143px;
					div {
						font-size: 26px;
						margin-bottom: 33px;
						color: #333333;
					}
					ul {
						overflow: auto;
						width: 740px;
						li {
							width: 270px;
							height: 16px;
							font-size: 16px;
							float: left;
							margin-bottom: 16px;
							line-height: 16px;
							color: #333333;
						}
					}
				}
			}
			.four-c {
				padding: 40px;
				.p-title {
					margin-bottom: 40px;
					font-size: 24px;
					color: #1B1B1B;
					text-align: left;
				}
				.c-content {
					border-bottom: 1px solid #EEEEEE;
					padding-bottom: 40px;
					margin-bottom: 40px;
					h6 {
						font-size: 24px;
						color: #333333;
						margin-bottom: 20px;
						span{
							font-weight: normal;
							font-size: 20px;
						}
					}
					.tips {
						width: 54px;
						height: 1px;
						background: #AA8A7B;
						margin: 0 auto;
					}
					.c-body {
						.img {
							width: 1056px;
							height: 146px;
						}
						.test {
							width: 910px;
							height: 70px;
							margin: 20px 0 0 110px;
							background: #E9C7BF;
							font-size: 12px;
							line-height: 24px;
							text-align: left;
							padding-left: 12px;
							color: #FFFFFF;
						}
					}
				}
				.color {
					margin-top: 40px;
					border-top: 1px solid #EEEEEE;
					padding-top: 40px;
					.c-body {
						ul {
							display: inline-block;
							margin: 40px auto 0;
							li {
								float: left;
								width: 100px;
								height: 105px;
								margin: 0 10px;
								span {
									display: block;
									text-align: center;
									font-size: 18px;
									color: #333333;
									margin: 12px 0;
								}
								img {
									width: 71px;
									height: 58px;
								}
							}
							.active {
								border: 1px solid #BA7F8C;
								box-shadow: 0px 1px 3px #E2C09F;
							}
						}
						.color-explain {
							display: inline-block;
							width: 1080px;
							height: 100px;
							margin: 20px auto 0;
							.explain-1 {
								float: left;
								width: 340px;
								height: 100px;
								margin-left: 10px;
								div {
									width: 340px;
									height: 20px;
									border: 1px solid #AA8A7B;
									border-top: none;
									margin-bottom: 30px;
								}
								p {
									font-size: 18px;
									color: #333333;
								}
							}
							.explain-2 {
								float: left;
								width: 476px;
								height: 100px;
								margin-left: 10px;
								div {
									width: 476px;
									height: 20px;
									border: 1px solid #AA8A7B;
									border-top: none;
									margin-bottom: 30px;
								}
								p {
									font-size: 18px;
									color: #333333;
								}
							}
							.explain-3 {
								float: left;
								width: 226px;
								height: 100px;
								margin-left: 10px;
								div {
									width: 224px;
									height: 20px;
									border: 1px solid #AA8A7B;
									border-top: none;
									margin-bottom: 30px;
								}
								p {
									font-size: 18px;
									color: #333333;
								}
							}
						}
					}
				}
				.cut {
					.c-body {
						.img {
							width: 1056px;
							height: 180px;
						}
						.test {
							position: relative;
							width: 1056px;
							img {
								position: absolute;
								top: -10px;
								left: 10px;
								height: 10px;
								width: 20px;
							}
						}
					}
				}
				.carat {
					padding-bottom: 0px;
					margin-bottom: 0px;
					border-bottom: none;
					.c-body {
						.test {
							position: relative;
							img {
								position: absolute;
								top: -10px;
								left: 10px;
								height: 10px;
								width: 20px;
							}
						}
						.left {
							float: left;
							width: 350px;
							ul {
								display: inline-block;
								height: 220px;
								width: 183px;
								border-bottom: 1px solid #AA8A7B;
								li {
									position: relative;
									width: 100%;
									height: 40px;
									font-size: 18px;
									line-height: 40px;
									border: 1px solid #AA8A7B;
									border-bottom: none;
									&:last-child {
										border-bottom: 1px solid #AA8A7B;
									}
									span {}
									div {
										display: none;
										position: absolute;
										top: 0;
										left: 210px;
										width: 420px;
										padding: 8px 10px;
										background: #E9C7BF;
										color: #FFFFFF;
										text-align: left;
										border-radius: 2px;
										b {
											float: left;
											font-size: 24px;
											line-height: 26px;
											margin-bottom: 10px;
											font-weight: 300;
										}
										p {
											float: left;
											width: 100%;
											font-size: 14px;
											line-height: 18px;
										}
										img {
											position: absolute;
											top: 20px;
											left: -9px;
											width: 10px;
											height: 20px;
										}
									}
								}
								.active {
									height: 60px;
									line-height: 60px;
									background: #EEEEEE;
									div {
										display: block;
									}
								}
							}
						}
						.right {
							float: right;
							width: 360px;
							margin-right: 100px;
							p {
								font-size: 12px;
								color: #666666;
								margin-bottom: 24px;
							}
							img {
								width: 300px;
								height: 200px;
							}
						}
					}
				}
			}
		}
	}
</style>
