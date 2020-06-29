export default {
  mounted() {

    //facebook统计详情页
    let fbqInfo = {
      content_type: 'product', //  固定值：pruduct
      content_ids: this.info.id,  // 对应网站产品的 id或者Sku
      value:this.info.salePrice,     //对应产品的价值
      currency: this.info.coinType //对应货币类型
    };
    fbq('track', 'ViewContent', fbqInfo);
  }
}
