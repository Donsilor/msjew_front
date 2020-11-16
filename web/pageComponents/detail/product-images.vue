<template>
  <div class="product-images">
    <div class="thumbnails">
      <li v-if="maxLength > 0" class="img-btn btn-up" @click="upward()">
        <i class="el-icon el-icon-arrow-up" :class="{'non': showIndex == 0}"></i>
      </li>
      
      <div class="scroll-wrap">
        <ul class="scroll">
          <li v-if="goods3ds" class="item">
            <img src="/diamonds/360.png" />
          </li>
          <li
            v-for="(item, index) in images"
            :key="index"
            :class="['item', { active: index === activeIndex }]"
            @click="changeActiveIndex(index)"
          >
            <img :src="item" />
          </li>
          <li v-if="giaNumber" class="item">
            <a
              :href="'https://www.gia.edu/report-check?reportno=' + giaNumber"
              target="_blank"
            >
              <img src="/diamonds/gia.png" />
            </a>
          </li>
          <li v-if="showCode" class="item hand" @mouseover="showEwm = true, getEwm()" @mouseout="showEwm = false">
            <img src="/icon/hand.png" />
          </li>
        </ul>
      </div>

      <li v-if="maxLength > 0" class="img-btn btn-down" @click="downward()">
        <i class="el-icon el-icon-arrow-down" :class="{'non': showIndex >= (maxLength-1)}"></i>
      </li>
    </div>

    <div class="main-pic">
      <img :src="images[activeIndex]" />

      <!-- 活动图标 -->
      <div class="discount-icon2" v-if="this.coupon == 'money'">
        <div class="icon">{{ $t(`${lang}.discounts1`) }}</div>
      </div>

      <div class="discount-icon2" v-if="this.coupon !== 'money' && this.coupon != ''">
        <div class="icon">{{ language == 'en_US' ? discountUs(this.coupon)+'%' : discountConversion(this.coupon)}} {{ $t(`${lang}.discounts2`) }}</div>
      </div>

      <div v-show="showEwm" class="QR-code">
        <div class="code-box">
          <div id="qrcode"></div>
          <div class="code-text">
            <span>{{ $t(`${lang}.scan`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'detail'
export default {
  props: {
    images: {
      type: Array,
      required: false,
      default() {
        return [this.ERROR_IMAGE]
      },
      validator(value) {
        return value.length > 0 ? value : [this.ERROR_IMAGE]
      }
    },
    goods3ds: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    },
    giaNumber: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    },
    coupon: {
      type: [Boolean, String, Number],
      required: false,
      default() {
        return ''
      }
    },
    ifCode: {
      type: [Boolean],
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      lang,
      activeIndex: 0,
      language: this.$store.state.language,
      qrcodeObj: {}, // 二维码配置
      showEwm: false, //是否显示二维码弹窗
      showIndex: 0
    }
  },
  computed: {
    activeImage() {
      return this.images[this.activeIndex] || ''
    },
    showCode(){
      return this.ifCode
    },
    maxLength() {
      var max;
      if(!!this.showCode){
        max = (+this.images.length + 1)-5
      }else{
        max = this.images.length-5
      }

      return max
    }
  },
  methods: {
    changeActiveIndex(index) {
      this.activeIndex = index;
	    this.$emit('getIdx',index)
    },
    // 获取二维码
    getEwm(){
      document.getElementById("qrcode").innerHTML = "";

      var goodsId = this.$route.query.goodId,path = '';

      if(location.href.indexOf('/ring/wedding-rings/') != -1 && location.href.indexOf('ringType=single') != -1){
        path = '/marriage-ring/single-ring-detail?goodId=' + goodsId + '&ringType=single';
      }else if(location.href.indexOf('/ring/wedding-rings/') != -1 && location.href.indexOf('ringType=pair') != -1){
        path = '/marriage-ring/single-ring-detail?goodId=' + goodsId + '&ringType=pair';
      }

      let headerHost = location.host;
      //生产环境
      let host = 'https://wap.msjew.com';
      if ((/^(hk|us|tw)\.msjew\.com/).test(headerHost)) {
          //生产环境
          host = 'https://wap-' + headerHost;
      } else if ((/bddco.cn/).test(headerHost)) {
          
          if ((/^(hk|us|tw)-msjew.bddco.cn/).test(headerHost)) {
              host = 'https://wap-' + headerHost;
          } else if (headerHost == 'www-msjew.bddco.cn') {
              host = 'https://wap-msjew.bddco.cn'
          }
      }
      
      var url = host + path;

      console.log('uuu',url)

      this.qrcodeObj = new QRCode('qrcode', {
        text: url,    
        width: 140,
        height: 140,
        colorDark : '#000', // 0f0绿色 30AB37
        colorLight : '#fff',
        correctLevel : QRCode.CorrectLevel.H
      })
    },
    upward() {
      var max = this.images.length-5-1;
      if(!!this.showCode){
        max+=1
      }
      if(this.showIndex <= max && this.showIndex > 0){
        var scroll = document.getElementsByClassName('scroll')[0];
        this.showIndex--;
        scroll.style.top = this.showIndex * -85 + 'px';
        scroll.style.transition = 'top .2s ease-in';
      }
    },
    downward() {
      var max = this.images.length-5-1;
      if(!!this.showCode){
        max+=1
      }
      if(this.showIndex < max && this.showIndex >= 0){
        var scroll = document.getElementsByClassName('scroll')[0];
        this.showIndex++;
        scroll.style.top = this.showIndex * -85 + 'px';
        scroll.style.transition = 'top .2s ease-in';
      }
    }
  }
}
</script>

<style lang="less" scoped>
.product-images {
  display: flex;

  .thumbnails {
    height: 500px;
    list-style: none;
    margin-right: 33px;
    display: flex;
    flex-direction: column;
    position: relative;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .scroll-wrap{
      width: 72px;
      height: 100%;
      position: relative;
      overflow: hidden;

      .scroll{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .item {
          flex-grow: 0;
          flex-shrink: 0;
          position: relative;
          margin-bottom: 13px;
          width: 72px;
          height: 72px;
          border: 1px solid #dddddd;
          box-sizing: border-box;
          font-size: 0;
          line-height: 0;
          overflow: hidden;
          transition: all 0.1s linear;

          &.active {
            border: 1px solid rgba(170, 138, 123, 1);
          }

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 95%;
            max-height: 95%;
          }
        }
      }
    } 

    .img-btn{
      position: absolute;
      left: 50%;
      top: -30px;
      transform: translateX(-50%);
      width: 24px;
      height: 20px;
      cursor: pointer;
      text-align: center;
      color: #444;
      font-size: 18px;

      .non{
        color: #ccc;
        cursor: initial;
      }
    }

    .btn-down{
      top: initial;
      bottom: -30px;
    }
  }

  .main-pic {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid #ddd;
    font-size: 0;
    line-height: 0;
    // overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }

    .QR-code{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 6;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      .code-box{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 220px;
        background-color: #fff;

        #qrcode{
          width: 140px;
          height: 140px;
          margin: 40px auto 0;
          text-align: center;
        }

        .code-text{
          position: relative;
          font-size: 14px;
          color: #ff6900;
          text-align: center;
          line-height: 16px;
          padding: 14px 6px 16px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
