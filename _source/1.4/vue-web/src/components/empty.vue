<template>
  <div class="empty-container">
    <div
      v-for="item in list"
      v-if="type==item.type"
      class="box">
      <img :src="'../../static/images/empty/'+item.icon+'.png'" >
      <div class="desc">{{ item.desc }}</div>
      <div
        v-if="item.btn"
        class="btn"
        @click="item.click">{{ item.btn }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Empty',
  props: {
    'type': [String], // 0：產品，1:訂單,2:心願單，3：購物車，4：搜索，5：评论，6：地址，7：对比
    'click':[Function]
  },
  data() {
    var _this = this;
    return {
      list: [{
        desc: this.$LANGUAGE.components.empty.product,
        icon: 'product',
        type: 0
      }, {
        desc: this.$LANGUAGE.components.empty.order,
        icon: 'order',
        type: 1
      }, {
        desc: this.$LANGUAGE.components.empty.wish,
        icon: 'wish',
        type: 2,
        btn: this.$LANGUAGE.components.empty.btn1,
        click: function () {
          _this.$router.push({
            name: 'engagementRingDetails'
          });
        }
      }, {
        desc: this.$LANGUAGE.components.empty.cart,
        icon: 'cart',
        btn: this.$LANGUAGE.components.empty.btn1,
        type: 3,
        click: function () {
          _this.$router.push({
            name: 'engagementRingDetails'
          });
        }
      }, {
        desc: this.$LANGUAGE.components.empty.search,
        icon: 'search',
        btn: this.$LANGUAGE.components.empty.btn2,
        type: 4,
       	click:this.click 
      }, {
        desc: this.$LANGUAGE.components.empty.eva,
        icon: 'eva',
        type: 5
      }, {
        desc: this.$LANGUAGE.components.empty.address,
        icon: 'address',
        type: 6
      }, {
        desc: this.$LANGUAGE.components.empty.contrast,
        icon: 'contrast',
        type: 7
      }]
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="less" scoped="scoped">
	.empty-container {
		.box {
			padding-bottom: 50px;
			padding-top: 30px;
		}
		img {
			max-width: 100%;
			display: block;
			margin: 0 auto;
			margin-bottom: 18px;
		}
		.desc {
			height: 14px;
			font-size: 14px;
			color: #999;
			text-align: center;
		}
		.btn {
			text-align: center;
			color: #E4C1BB;
			text-decoration: underline;
			cursor: pointer;
			font-size: 14px;
			margin-top: 8px;
		}
	}
</style>
