export default {
  data() {
    return {
      data: {},
      pair: {},
      goodInfo: {},
      infos: {}
    }
  },
  methods: {},
  mounted() {

    //facebook统计详情页
    let infos = this.data;

    if(Object.keys(this.pair).length > 0) {
      infos = this.pair;
    }

    let fbqInfo = {
      content_type: 'product', //  固定值：pruduct
      content_ids: infos.id,  // 对应网站产品的 id或者Sku
      value:infos.salePrice,     //对应产品的价值
      currency: infos.coinType //对应货币类型
    };
    fbq('track', 'ViewContent', fbqInfo);
  }
}
