<template>
  <div class="container">
    <div class="box" v-loading="ifLoading" element-loading-text="验证中..." element-loading-background="rgba(0, 0, 0, 0.3)">
      <div class="title">{{ $t(`${lang}.title`) }}
        <div class="quit" @click="quit()"></div>
      </div>
      <div class="card-box clf">
        <!-- 购物卡列表 -->
        <div class="list fl" v-for="(item, index) in cardList" ref="list" @input="inputInfo(index)">
          <div class="card-info">
            <span class="choose" :class="item.ifChoose ? 'active' : ''" @click="chooseList(index)"></span>
            <div class="list-content">
              <div class="child clf">
                <span class="icon fl"></span>
                <span class="text fl">{{ $t(`${lang}.cardNumber`) }}</span>
                <div class="ipt-box fl">
                  <input type="text" class="ipt" v-model="cardList[index].account">
                </div>
              </div>
              <div class="child clf">
                <span class="icon fl"></span>
                <span class="text fl">{{ $t(`${lang}.cardPassword`) }}</span>
                <div class="ipt-box fl">
                  <input type="text" class="ipt" v-model="cardList[index].conversionNum">
                </div>
              </div>
            </div>
          </div>

          <div class="verify">
            <!-- 默认状态 -->
            <div v-if="item.type == 0">
              <div class="btn verify-btn" @click="verification(index)">{{ $t(`${lang}.clickVerify`) }}</div>
              <div class="text"></div>
            </div>
            <!-- 成功状态 -->
            <div v-else-if="item.type == 1" class="verify-success">
              <div class="btn">
                <span class="icon"></span>
                <span>{{ $t(`${lang}.verifySucceed`) }}</span>
              </div>
              <div class="text">{{ $t(`${lang}.balance`) }}￥{{item.balance}}</div>
            </div>
            <!-- 失败状态 -->
            <div v-else-if="item.type == 2" class="verify-failing">
              <div class="btn">
                <span class="icon"></span>
                <span>{{ $t(`${lang}.verifyFailing`) }}</span>
              </div>
              <div class="text" @click="eliminate(index)">{{ $t(`${lang}.eliminateCard`) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加 -->
      <div class="add-card" @click="addCard()">
        <span class="icon"></span>
        <span class="text">{{ $t(`${lang}.addCard`) }}</span>
      </div>

      <!-- 全选 -->
      <div class="all-choose" :class="ifChooseAll ? 'active' : ''" @click="allChoose()">
        <span class="icon"></span>
        <span class="text">{{ $t(`${lang}.chooseAll`) }}</span>
      </div>

      <div class="annotation">{{ $t(`${lang}.annotation`) }}</div>

      <div class="submit-box">
        <div class="btn" @click="quit()">{{ $t(`${lang}.cancle`) }}</div>
        <div class="btn" @click="confirm()">{{ $t(`${lang}.confirm`) }}</div>
      </div>
    </div>

    <!-- 验证中... -->
    <div class="verify-loading" v-if="0">
      <div class="verify-loading-box">
        <div>
          <img src="" alt="">
        </div>
        <div>验证中...</div>
      </div>
    </div>

    <div class="popup" v-if="ifShowPop" :class="verifyStatus == 2 ? 'invalid' : ''" @click="closePop()">
      <div class="pop-box" v-if="verifyStatus == 1">
        <div class="icon"></div>
        <div class="status">{{ $t(`${lang}.verifyValid`) }}</div>
        <div class="btn">{{ $t(`${lang}.alreadyAdd`) }}</div>
      </div>

      <div class="pop-box" v-if="verifyStatus == 2">
        <div class="icon"></div>
        <div class="status">{{ $t(`${lang}.verifyInvalid`) }}</div>
        <div class="btn">{{ $t(`${lang}.anewAdd`) }}</div>
      </div>
    </div>

    <div class="affirm-eliminate"></div>
  </div>
</template>

<script>
  const lang = 'shoppingCard'
  export default{
    data(){
      return{
        lang,
        cardList:[
          {
            account: '',
            conversionNum: '',
            balance: '',
            type: 0,
            ifChoose: false,
          },
          {
            account: '',
            conversionNum: '',
            // account: 'BDD2020123456', // 测试账号
            // conversionNum: 'ab', // 测试密码
            balance: '',
            type: 0,
            ifChoose: false
          }
        ],
        ifShowPop: false,
        verifyStatus: '1',
        nowIndex: 0,
        submit: [],
        ifChooseAll: false,
        ifLoading: false
      }
    },
    methods:{
      // 添加更多
      addCard(){
        var card = {
          account: '',
          conversionNum: '',
          type: 0,
          ifChoose: false
        };
        this.cardList.push(card);
      },
      // 取消
      quit(){
        this.$emit('closePop', true);
      },
      // 确定
      confirm(){
        var that = this,j = 0,item = {sn: '',pw: ''};

        for(var i=0, len=this.cardList.length; i<len; i++){
          if(this.cardList[i].ifChoose == true){
            this.submit.push(item);
            this.submit[j].sn = this.cardList[i].account;
            this.submit[j].pw = this.cardList[i].conversionNum;
            this.submit = JSON.parse(JSON.stringify(this.submit));
            j++;
          }
        }

        this.$emit('closePop', that.submit);
      },
      // 验证
      verification(k){
        var that = this;
        that.nowIndex = k;

        if(this.cardList[k].account == '' || this.cardList[k].conversionNum == ''){
          this.$errorMessage(that.$t(`${lang}.msg1`));
        }else{
          this.ifLoading = true;
          this.$axios.post('web/member/card/verify', {
            sn: that.cardList[k].account,
            pw: that.cardList[k].conversionNum,
          })
          .then(res => {
            this.ifLoading = false;
            that.ifShowPop = true;
            that.verifyStatus = 1;
            that.cardList[that.nowIndex].balance = res.data.balance;
            that.cardList[that.nowIndex].ifChoose = true;
          })
          .catch(err => {
            this.ifLoading = false;
            that.ifShowPop = true;
            that.verifyStatus = 2;
          })
        }
      },
      // 关闭弹窗
      closePop(){
        var that = this;
        that.ifShowPop = false;
        if(that.verifyStatus == 1){
          that.cardList[that.nowIndex].type = 1;
        }else if(that.verifyStatus == 2){
          that.cardList[that.nowIndex].type = 2;
          var list = this.$refs.list[this.nowIndex];
          var ipt = list.getElementsByClassName('ipt')[0];
          ipt.focus();
          // that.cardList[that.nowIndex].account = '';
          // that.cardList[that.nowIndex].conversionNum = '';
        }
      },
      // 消除此卡
      eliminate(k){
        // 提示是否清除？？？？
        this.cardList.splice(k,1)
        // this.cardList[k]
      },
      // 选择单个购物卡
      chooseList(k){
        var that = this;
        if(this.cardList[k].account == '' || this.cardList[k].conversionNum == ''){
          that.$errorMessage(that.$t(`${lang}.msg1`));
        }else{
          if(that.cardList[k].type == 0){
            that.$errorMessage(that.$t(`${lang}.msg2`));
          }else if(that.cardList[k].type == 1){
            that.cardList[k].ifChoose = true;
          }else if(that.cardList[k].type == 2){
            that.$errorMessage(that.$t(`${lang}.msg3`));
          }
        }
      },
      // 选择全部购物卡
      allChoose(){
        var flag = false;
        var that = this;
        for(var i of that.cardList){
          if(i.account !== '' && i.conversionNum !== ''){
            flag = true;
          }

          if(i.type != 1){
            that.$errorMessage(that.$t(`${lang}.msg4`));
          }else{
            i.ifChoose = true;
            this.ifChooseAll = true;
          }

        }

        if(!flag){
          that.$errorMessage(that.$t(`${lang}.msg1`));
        }
      },
      // 输入时改变状态
      inputInfo(k){
        this.cardList[k].type = 0;
      }

    }
  }
</script>

<style scoped>
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clf::after{
    display: block;
    content: '.';
    height: 0;
    width: 0;
    visibility: hidden;
    opacity: 0;
    clear: both;
  }

  .container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1210;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .box{
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 60px;
    width: 962px;
    height: 700px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .title{
    height: 100px;
    line-height: 110px;
    text-align: center;
    position: relative;
    font-size: 20px;
    color: #666;
    border-bottom: 1px solid rgba(110,112,110,0.2);
  }
  .title .quit{
    position: absolute;
    top: 20%;
    right: 0px;
    width: 30px;
    height: 30px;
    background: url(../../static/addShoppingCard/quit.png) no-repeat center;
    background-size: 100% 100%;
  }

  .card-box{
    margin-top: 80px;
  }

  .list{
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .list:nth-child(odd) .card-info{
    border-right: 1px solid #aaa;
  }
  .card-info{
    display: flex;
    align-items: center;
    padding-right: 20px;
  }
  .choose{
    width: 20px;
    height: 20px;
    border: 1px solid #a0a0a0;
    margin-right: 16px;
    border-radius: 50%;
    cursor: pointer;
  }
  .choose.active{
    background: url(../../static/addShoppingCard/success.png) no-repeat center;
    background-size: 100% 100%;
    border-color: #157f12;
  }
  .child{
    display: flex;
    align-items: center;
  }
  .child:first-child{
    margin-bottom: 12px;
  }
  .child>.icon{
    width: 20px;
    height: 20px;
  }
  .child:first-child>.icon{
    background: url(../../static/addShoppingCard/card.png) no-repeat center;
    background-size: 80% auto;
  }
  .child>.text{
    width: 54px;
    margin-left: 6px;
    font-size: 16px;
    color: #666;
  }
  .ipt-box{
    width: 250px;
    height: 36px;
    border: 1px solid rgba(170, 170, 170, 0.5);
    margin-left: 6px;
  }
  .ipt-box .ipt{
    width: 100%;
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
  }

  .verify{
    margin-top: 30px;
  }
  .verify .btn{
    width: 100px;
    height: 26px;
    background-color: #efefef;
    border: 1px solid #a0a0a0;
    text-align: center;
    line-height: 26px;
    font-size: 13px;
    color: #615959;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .verify-btn{
    cursor: pointer;
  }

  .verify-success .btn{
    background-color: #147f12;
    border-color: #147f12;
    color: #fff;
  }

  .verify .text{
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    color: #332323;
    margin-top: 6px;
    text-decoration: underline;
  }

  .verify-success .text{
    color: #147f12;
  }

  .verify-failing .btn{
    background-color: #ae1010;
    border-color: #ae1010;
    color: #fff;
  }

  .verify-failing .text{
    cursor: pointer;
  }

  .verify .icon{
    width: 16px;
    height: 16px;
    background: url(../../static/addShoppingCard/icon-1.png) no-repeat center;
    background-size: 100% 100%;
    margin-right: 6px;
  }

  .verify-failing .icon{
    background-image: url(../../static/addShoppingCard/icon-2.png);
  }

  .add-card{
    height: 40px;
    border-bottom: 1px solid rgba(110,112,110,0.2);
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    cursor: pointer;
  }
  .add-card .icon{
    width: 20px;
    height: 20px;
    border: 1px solid #f5af93;
    border-radius: 50%;
    background: url(../../static/addShoppingCard/add.png) no-repeat center;
    background-size: 80% 80%;
  }
  .add-card .text{
    font-size: 16px;
    color: #f5af93;
    margin-left: 12px;
    text-decoration: underline;
  }
  .all-choose{
    margin-top: 24px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 16px;
    color: #8d8c8c;
    text-decoration: underline;
  }
  .all-choose .icon{
    width: 20px;
    height: 20px;
    border: 1px solid #a0a0a0;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }
  .all-choose.active .icon{
    background: url(../../static/addShoppingCard/success.png) no-repeat center;
    background-size: 100% 100%;
  }

  .annotation{
    font-size: 16px;
    color: #f5af93;
    padding-left: 50px;
    margin-top: 20px;
  }
  .submit-box{
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px auto;
  }
  .submit-box .btn{
    width: 114px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #aaa;
    border-radius: 5px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
  }

  .popup{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .pop-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 162px;
    height: 162px;
    border: 1px solid #bfbfbf;
    font-size: 17px;
    background-color: #fff;
  }
  .pop-box .icon{
    width: 46px;
    height: 46px;
    margin: 22px auto 0;
    background: url(../../static/addShoppingCard/success.png) no-repeat center;
    background-size: 100% 100%;
  }
  .pop-box .status{
    margin-top: 12px;
    text-align: center;
    color: #157f12;
  }
  .pop-box .btn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #157f12;
    line-height: 40px;
    text-align: center;
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }

  .popup.invalid .pop-box .status{
    color: #e19510;
  }
  .popup.invalid .icon{
    background-image: url(../../static/addShoppingCard/failed.png);
  }
  .popup.invalid .btn{
    background-color: #e19510;
  }
</style>
