<template>
  <div class="container">
    <div class="box" v-loading="ifLoading" element-loading-text="验证中..." element-loading-background="rgba(0, 0, 0, 0.3)">
      <div class="title">{{ $t(`${lang}.title`) }}
        <div class="quit" @click="quit()"></div>
      </div>
      <div class="card-box clf">
        <!-- 购物卡列表 -->
        <div class="list" v-for="(item, index) in cardList" ref="list" @input="inputInfo(index)">
          <div class="card-info">
            <span class="choose" :class="item.ifChoose ? 'active' : ''" @click="chooseList(index)"></span>
            <div class="list-content">
              <div class="child clf">
                <span class="icon fl"></span>
                <span class="text fl">{{ $t(`${lang}.cardNumber`) }}</span>
                <div class="ipt-box fl">
                  <input type="text" class="ipt" autocomplete="off" v-model.trim="cardList[index].account">
                </div>
              </div>
              <div class="child clf">
                <span class="icon fl"></span>
                <span class="text fl">{{ $t(`${lang}.cardPassword`) }}</span>
                <div class="ipt-box fl">
                  <input type="text" class="ipt" autocomplete="off" v-model.trim="cardList[index].conversionNum">
                </div>
              </div>
            </div>
          </div>

          <div class="btn-box" style="max-width: 416px;">
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
                <div class="text">{{ $t(`${lang}.balance`) }}¥ {{item.balance}}</div>
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
            <div class="btn" style="margin: 0 0 0 50px;cursor: pointer" v-if="cardType.length != 0 && item.ifShowRemove" @click="removeBinding(index)">{{ $t(`${lang}.unbound`) }}</div>
          </div>

          <div class="btn-box" style="max-width: 416px;margin-top: 0;" v-if="item.type == 1">
            <div class="productLine"><span>({{ $t(`${lang}.msg7`) }}{{item.usableRange}}{{ $t(`${lang}.msg8`) }})</span></div>
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

    <!-- 验证弹窗 -->
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

    <!-- 确认解除购物卡 -->
    <div class="affirm-eliminate" v-if="ifShowPop2">
      <div class="wrap">
        <div class="whether">{{ $t(`${lang}.confirmUnbinding`) }}</div>
        <div class="box-r">
          <div class="quit btn" @click="closePop2()">{{ $t(`${lang}.cancle`) }}</div>
          <div class="confirm btn" @click="confirmUnbinding()">{{ $t(`${lang}.confirm`) }}</div>
        </div>
      </div>
    </div>
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
            usableRange: '',
            ifAllowedToUse: false,
            ifShowRemove: false,
            startTime: 0,
            endTime: 0,
          },
          {
            account: '',
            conversionNum: '',
            balance: '',
            type: 0,
            ifChoose: false,
            usableRange: '',
            ifAllowedToUse: false,
            ifShowRemove: false,
            startTime: 0,
            endTime: 0,
          }
        ],
        ifShowPop: false,
        verifyStatus: 1,
        nowIndex: 0,
        submit: [],
        ifChooseAll: false,
        ifLoading: false,
        ifShowPop2: false,
        removeIndex: -1,
        currency: '',
        arr5: []
      }
    },
    props: ['cardType','goodsLine'],
    mounted(){
      if(this.cardType.length != 0){
        var that = this, arr4 = [];
        for(var i=0, len=this.cardType.length; i<len; i++){
          if(len > 2 && i > 1){
            this.addCard();
          }

          this.cardList[i].account = this.cardType[i].sn;
          this.cardList[i].conversionNum = this.cardType[i].pw;
          this.cardList[i].balance = this.cardType[i].balanceCny;
          this.cardList[i].type = 1;
          this.cardList[i].ifChoose = true;
          this.cardList[i].ifShowRemove = true;

          arr4[i] = this.cardType[i].goodsTypes;
        }

        for(var i=0, len=arr4.length; i<len; i++){
          this.arr5[i] = '';
          for(var j in arr4[i]){
            this.arr5[i] += (arr4[i][j]+'.');
          }
        }

        for(var k=0, len=this.arr5.length; k<len; k++){
          this.cardList[k].usableRange = this.arr5[k];
        }
      }
    },
    methods:{
      // 添加更多
      addCard(){
        var card = {
          account: '',
          conversionNum: '',
          balance: '',
          type: 0,
          ifChoose: false,
          usableRange: '',
          ifAllowedToUse: false,
          ifShowRemove: false
        };
        this.cardList.push(card);
        this.ifChooseAll = false;
      },
      // 取消
      quit(){
        this.$emit('closePop', true);
      },
      // 确定
      confirm(){
        var arr3 = [], //除去无效购物卡
            flag7 = false; //判断是否有被选中购物卡

        for(var i=0, len=this.cardList.length; i<len; i++){
          if(!this.cardList[i].ifChoose){
            arr3.push(i);
          }else{
            flag7 = true
          }
        }

        arr3 = arr3.reverse();


        if(flag7){
          var that = this;
          // for(var i=0, len=arr3.length; i<len; i++){
          //   this.cardList.splice(arr3[i], 1)
          // }

          this.$successMessage(this.$t(`${lang}.msg10`));

          var Timer = setTimeout(function(){
            that.send()
            Timer = null;
          },1500)

        }else{
          this.$errorMessage(this.$t(`${lang}.msg9`));
        }

      },
      // 发送
      send(){
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

        console.log(9999, that.submit)
        this.$emit('closePop', that.submit);
      },
      // 验证
      verification(k){
        var that = this, flag = true;
        this.nowIndex = k;

        if(this.cardList[k].account == '' || this.cardList[k].conversionNum == ''){
          this.$errorMessage(that.$t(`${lang}.msg1`));
        }else{
          var ifRepetition = true;
          for(var i=0,len=this.cardList.length; i<len; i++){
            if(i != k && this.cardList[i].account == this.cardList[k].account){
              ifRepetition = false;
              break
            }
          }

          if(!ifRepetition){
            this.$errorMessage(that.$t(`${lang}.msg5`));
          }else{
            this.ifLoading = true;
            this.$axios.post('web/member/card/verify', {
              sn: that.cardList[k].account,
              pw: that.cardList[k].conversionNum,
            })
            .then(res => {
              that.ifLoading = false;
              that.ifShowPop = true;
              that.cardList[that.nowIndex].balance = res.data.balanceCny-0;
              that.currency = res.data.currency;
              that.startTime = res.data.startTime * 1000;
              that.endTime = res.data.endTime * 1000;

              var c = 0, arr = [];
              for(var n in res.data.goodsTypes){
                arr[c] = res.data.goodsTypes[n];
                c++;
              }

              that.cardList[that.nowIndex].usableRange = arr.join('.');

              that.verifyLine(res.data.goodsTypeAttach, k);

              var time = new Date().getTime();
              // console.log(888,time,999,that.startTime,0,that.endTime)
              if(time > that.startTime && time < that.endTime){
                that.verifyStatus = 1;

                if(that.cardList[that.nowIndex].balance !== 0 && that.cardList[that.nowIndex].ifAllowedToUse){
                  that.cardList[that.nowIndex].ifChoose = true;
                }

                for(var i=0,len=that.cardList.length; i<len; i++){
                  if(that.cardList[i].ifChoose != true){
                    flag = false;
                  }
                }

                if(flag){
                  that.ifChooseAll = true;
                }
              }else if(time < that.startTime){
                that.verifyStatus = 2;
                that.$errorMessage(that.$t(`${lang}.msg12`));
              }else if(time > that.endTime){
                that.verifyStatus = 2;
                that.$errorMessage(that.$t(`${lang}.msg13`));
              }

            })
            .catch(err => {
              that.ifLoading = false;
              that.ifShowPop = true;
              that.verifyStatus = 2;
            })
          }
        }


      },
      // 验证产品线
      verifyLine(element, k){
        for(var i=0, len=this.goodsLine.length; i<len; i++){
          for(var j=0, lek=element.length; j<lek; j++){
            if(this.goodsLine[i] == element[j]){
              this.cardList[k].ifAllowedToUse = true;
            }
          }
        }
      },
      // 关闭弹窗
      closePop(){
        this.ifShowPop = false;
        if(this.verifyStatus == 1){
          this.cardList[this.nowIndex].type = 1;
        }else if(this.verifyStatus == 2){
          this.cardList[this.nowIndex].type = 2;
          var list = this.$refs.list[this.nowIndex];
          var ipt = list.getElementsByClassName('ipt')[0];
          ipt.focus();
          // this.cardList[this.nowIndex].account = '';
          // this.cardList[this.nowIndex].conversionNum = '';
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
        var that=this, flag=true, flag2=true;
          if(this.cardList[k].ifChoose == false){
            if(this.cardList[k].account == '' || this.cardList[k].conversionNum == ''){
              this.$errorMessage(that.$t(`${lang}.msg1`));
            }else{
              if(this.cardList[k].type == 0){
                this.$errorMessage(that.$t(`${lang}.msg2`));
              }else if(this.cardList[k].type == 1){
                var time = new Date().getTime();
                // console.log(888,time,999,that.startTime,0,that.endTime)
                if(time > that.startTime && time < that.endTime){
                  if(this.cardList[k].balance !== 0){
                    if(this.cardList[k].ifAllowedToUse){
                      this.cardList[k].ifChoose = true;
                    }else{
                      this.$errorMessage(that.$t(`${lang}.msg7`)+" ("+that.cardList[that.nowIndex].usableRange+") "+that.$t(`${lang}.msg8`));
                    }
                  }else{
                    this.$errorMessage(that.$t(`${lang}.msg6`));
                  }
                }else if(time < that.startTime){
                  that.verifyStatus = 2;
                  that.$errorMessage(that.$t(`${lang}.msg12`));
                }else if(time > that.endTime){
                  that.verifyStatus = 2;
                  that.$errorMessage(that.$t(`${lang}.msg13`));
                }

              }else if(this.cardList[k].type == 2){
                this.$errorMessage(that.$t(`${lang}.msg3`));
              }
            }

            for(var i=0,len=this.cardList.length; i<len; i++){
              if(!this.cardList[i].ifChoose){
                flag = false;
              }
              if(!this.cardList[i].ifAllowedToUse){
                flag2 = false;
              }
            }

            if(flag && flag2){
              this.ifChooseAll = true;
            }

          }else{
            this.cardList[k].ifChoose = false;
            this.ifChooseAll = false;
          }
      },
      // 选择全部购物卡
      allChoose(){
        var that = this,
            flag = false,      //账号密码是否为空
            flag2 = true,     //是否全部通过验证
            flag3 = true,     //是否有余额为零
            flag4 = true;     //是否可以使用的产品线
        if(this.ifChooseAll == false){
          for(var i of this.cardList){
            if(i.account !== '' && i.conversionNum !== ''){
              flag = true;
            }

            if(i.type != 1){
              flag2 = false;
            }

            if(i.balance === 0){
              flag3 = false;
            }

            if(!i.ifAllowedToUse){
              flag4 = false;
            }
          }

          if(!flag3 || !flag2 || !flag || !flag4){
            this.$errorMessage(that.$t(`${lang}.msg4`));
          }

          if(flag && flag2 && flag3 && flag4){
            this.ifChooseAll = true;
            for(var i of this.cardList){
              i.ifChoose = true
            }
          }
        }else{
          this.ifChooseAll = false;

          for(var i of this.cardList){
            i.ifChoose = false;
          }
        }
      },
      // 输入时改变状态
      inputInfo(k){
        this.cardList[k].type = 0;
        this.cardList[k].ifChoose = false;
        this.ifChooseAll = false;
        this.cardList[k].ifShowRemove = false;
      },
      // 解除绑定
      removeBinding(n){
        // this.cardList[n].account = '';
        // this.cardList[n].conversionNum = '';
        // this.cardList[n].balance = '';
        // this.cardList[n].type = 0;
        // this.cardList[n].ifChoose = false;
        this.removeIndex = n;
        this.ifShowPop2 = true;
      },
      // 关闭弹窗
      closePop2(){
        this.ifShowPop2 = false;
      },
      // 确认解除绑定
      confirmUnbinding(){
        var that = this;
        this.ifShowPop2 = false;
        this.cardList[this.removeIndex].account = '';
        this.cardList[this.removeIndex].conversionNum = '';
        this.cardList[this.removeIndex].balance = '';
        this.cardList[this.removeIndex].type = 0;
        this.cardList[this.removeIndex].ifChoose = false;

        this.$successMessage(that.$t(`${lang}.msg11`));

        var Timer2 = setTimeout(function(){
          that.send()
          Timer2 = null;
        },1500)
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
    display: flex;
    align-items: ;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list{
    margin-bottom: 20px;
  }
  .list:nth-child(even) .card-info{
    border-left: 1px solid #aaa;
  }
  .card-info{
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
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
    width: 58px;
    margin-left: 6px;
    font-size: 14px;
    color: #666;
  }
  .ipt-box{
    width: 246px;
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

  .btn-box{
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .btn-box .btn{
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

  .productLine{
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: #444;
    line-height: 18px;
  }
  .productLine span{
    color: #888;
  }

  .add-card{
    width: 160px;
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
    width: 86px;
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
    position: fixed;
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
    width: 180px;
    height: 162px;
    border: 1px solid #bfbfbf;
    font-size: 16px;
    background-color: #fff;
    padding: 0 20px;
    box-sizing: border-box;
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
    font-size: 14px;
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

  .affirm-eliminate{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    /* display: none; */
  }
  .affirm-eliminate .wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: #fff;
    border-radius: 6px;
  }
  .whether{
    height: 80px;
    line-height: 80px;
    text-align: center;
    background-color: #fff;
    border-radius: 6px;
  }
  .affirm-eliminate .box-r{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .affirm-eliminate .box-r .btn{
    width: 100px;
    height: 26px;
    background-color: #efefef;
    border: 1px solid #a0a0a0;
    text-align: center;
    line-height: 26px;
    font-size: 13px;
    color: #615959;
    margin: 0 auto;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
