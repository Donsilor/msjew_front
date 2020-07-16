<template>
    <div class="logistic-info">
        <div class="od-top">
            <nuxt-link to="/account/orders">
                <div>
                    <span>{{ $t(`${lang}.title`) }}</span> >>
                    {{ $t(`${lang}.logistic`) }}
                </div>
            </nuxt-link>
        </div>
        <div class="logistic" v-if="express.logistics !== null">
            <div class="schedule">
                <p v-for="(step, ns) in StepStatus" :key="ns">
                    <span :style="{'background-color': step.active? 'rgba(242,155,135,1)': '#E6E6E6'}">{{ ns + 1 }}</span>
                    <span :style="{ color: step.active ? 'rgba(242,155,135,1)' : '#999' }">{{ step.title }}</span>
                </p>
                <div v-for="(step, index) in StepStatus" :key="index + 'what'" class="top-line" >
                    <div :style="{ 'background-color':step.active && StepStatus[index] && StepStatus[index].active ? 'rgba(242,155,135,1)' : '#E6E6E6' }" class="top-line-line" ></div>
                </div>
            </div>
            <!-- <div class="track" >
                <div class="track-list">
                    <ul>
                        <div v-for="(a,_a) in list" :key="_a">
                            <li class="start" v-if="_a === 0">
                                <div>
                                    <i><img src="../../../static/order/finished.png" alt=""></i>
                                </div>
                                <div>
                                    <span class="time">{{a.datetime}}</span>
                                </div>
                                <div>
                                    <span class="statustxt">{{$t(`${lang}.received`)}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            
                            <li class="node-icon" v-if="_a > 0 && _a !== list.length-1">
                                <div>
                                    <i></i>
                                </div>
                                <div>
                                    <span class="time">{{a.datetime}}</span>
                                </div>
                                <div>
                                    <span class="statustxt">{{$t(`${lang}.intransit`)}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            <li v-if="_a === list.length-1" class="finall">
                                <div>
                                    <i><img src="../../../static/order/diamondgary.png" alt=""></i>
                                </div>
                                <div>
                                    <span class="time">{{a.datetime}}</span>
                                </div>
                                <div>
                                    <span class="statustxt">{{$t(`${lang}.WaitingPackage`)}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            
                        </div>
                    </ul>
                </div>
            </div> -->
            <div class="track-content" >
                <div class="content"></div>
                <!--物流跟踪-->
                <div class="follow">
                    <div class="follow-list">
                        <div>
                        <div class="track-rcol">
                            <div class="track-list">
                            <ul>
                            <div v-for="(item,index) in list" :key="index">
                                <li class="first" v-if="index===0">
                                <div></div>
                                <i class="node-icon"></i>
                                <span class="txt">{{item.remark}}</span>
                                <span class="time">{{item.datetime}}</span>
                                </li>
                                <li v-if="index > 0 && index !== list.length-1">
                                <i class="node-icon"></i>
                                <span class="txt">{{item.remark}}</span>
                                <span class="time">{{item.datetime}}</span>
                                </li>
                                <li v-if="index === list.length-1" class="finall">
                                <i class="div-spilander"></i>
                                <i class="node-icon"></i>
                                <span class="txt">{{item.remark}}</span>
                                <span class="time">{{item.datetime}}</span>
                                </li>
                            </div>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        <div v-else>
            <div class="empy-express">{{$t(`${lang}.noexpress`)}}</div>
        </div>
    </div>
  <!-- <div class="div-bg bg-white" >
    <div style="height: 0.5rem;width: 100%;background-color:#f7f7f7"></div>
    <div style="padding-bottom: 0.5rem;">
      <div class="bg-white" style="width: 92%; margin-left: 4%;margin: auto;padding-left: 15px;padding-right: 15px;">
        <div style="font-size: 1.2rem;color: #111111;">物流跟踪</div>
        <div>
          <div class="track-rcol">
            <div class="track-list">
              <ul>
                <div v-for="(item,index) in logisticsList" :key="index">
                  <li class="first" v-if="index===0">
                    <div></div>
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}</span>
                  </li>
                  <li v-if="index > 0 && index !== logisticsList.length-1">
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}</span>
                  </li>
                  <li v-if="index === logisticsList.length-1" class="finall">
                    <i class="div-spilander"></i>
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}ss</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
const lang = 'personal.logisticInfo'
export default {
  name: 'Logic',
  data () {
    return {
        lang,
        expStatus:{},
        oid: this.$route.query.orderId,
        logisticsList: [
            {
            message: '1包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '2包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '5包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '6包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            },
            {
            message: '7包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
            messageDate: '2016-03-10 18:07:15'
            }
        ],
        data: {
            address: {
            countryName: '',
            provinceName: '',
            cityName: '',
            address: '',
            realName: '',
            userMail: '',
            },
        },
        express:{},
        list:[]
    }
  },
  computed:{
      StepStatus() {
      // data.orderStatus
      const expStatus = this.expStatus
      const result = [
        {
          id: 0,
          title: this.$t(`${lang}.result`)[0],
          active: false
        },
        {
          id: 1,
          title: this.$t(`${lang}.result`)[1],
          active: false
        },
        {
          id: 2,
          title: this.$t(`${lang}.result`)[2],
          active: false
        }
      ]
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      if(expStatus.has_active == true){
          console.log(11111111)
        result[0].active = true
      }
      if(expStatus.has_active == true && expStatus.has_signed == true){
          console.log(22222222)
        result[0].active = true
        result[1].active = true
      }
      if(expStatus.has_signed == true){
          console.log(33333333)
        result[0].active = true
        result[1].active = true
        result[2].active = true
      }
      return result
    }
  },
  mounted(){ 
    this.getData()
    // console.log("ddddd",this.data.orderStatus)
  },
  methods: {
      getData() {
      var that = this;
      // console.log("id",this.oid)
      this.$axios
        .get('/web/member/order/detail', {
          params: { orderId: this.oid }
        })
        .then(res => {
          this.data = res.data
          if(res.data.express){
            this.express = res.data.express
          }
          if(res.data.express.logistics){
            this.list = res.data.express.logistics.list
            this.expStatus = res.data.express.logistics.abstract_status
          }
        //   console.log("this.data",this.data)
        //   this.invoice = res.data.invoice
        //   console.log("data", res.data.express.logistics.abstract_status)

        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
  }
}
</script>
<style lang='less' scoped>
.logistic-info{
    .logistic{
        margin-right: 40px;
    }
    .od-top {
        // width: 940px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 50px;
        div:nth-child(1) {
            height: 17px;
            line-height: 17px;
            font-size: 16px;
            color: rgba(242, 155, 135, 1);
        }
    }
    .schedule{
        width: 424+25+48+53+100px;
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-left: 46px;
        p {
            width: 112px;
            text-align: center;
            span:nth-child(1) {
                display: block;
                width: 35px;
                height: 35px;
                background: rgba(242, 155, 135, 1);
                border-radius: 50%;
                color: #ffffff;
                line-height: 35px;
                margin: 0 auto 5px;
            }
            span:nth-child(2) {
                line-height: 12px;
                height: 12px;
                font-size: 15px;
                color: rgba(242, 155, 135, 1);
            }
        }
        .top-line {
            position: absolute;
            width: 237px;
            height: 2px;
            top: 16px;
            left: 74px;
            .top-line-line {
                width: 237px;
                height: 2px;
                background: rgba(242, 155, 135, 1);
                border-radius: 1px;
            }
        }
        .top-line:nth-child(6) {
            // left: 40+80+30+22+40+6px;
            left:342px
        }
        .top-line:nth-child(8) {
            // left: 40+80+30+80+35+35+56+12px;
            left:343px
        }
        .top-line:nth-child(9) {
            // left: 40+80+30+80+30+80+40+45+75+23px;
            left:477px;
            background-color: #e6e6e6;
        }
    }
    .track{
        margin: 30px 30px 30px 50px;
        position:relative;
        width: 100%;
        text-align: center;
        .track-list{
            position: relative;
            display: inline-block;
            width:100%;
            .start{
                i{
                    width: 25px;
                    height: 25px;
                    display: inline-block;
                    line-height: 25px;
                    border-radius: 50%;
                    border:1px solid #B6B5B5;
                    background-color: green;
                    color:#fff;
                    position: relative;
                    // background-image: url(../../../static/order/finished.png);
                    // background-size:100% 100%;
                    img{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top:0px
                    }
                }
                div{
                    padding: 0;
                }
            }
            .node-icon{
                color: #9A9A9A;
                i{
                    width: 8px;
                    height: 8px;
                    background: #999999;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    display: inline-block;
                    position: relative;
                    z-index: 10;
                }
            }
            .node-icon{
                padding: 20px 0;
            }
            li{
                display: table;
                width: 100%;
               
                position: relative;
                list-style: none;
                z-index: 10;
                div {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: left;
                    span{
                        display: block;
                        line-height: 25px;
                    }
                    .statustxt{
                        font-size: 18px;
                    }
                    .txt{
                        font-size: 14px;
                        word-break:break-all
                    }
                    .time{
                        font-size: 14px ;
                    }
                }
                div:first-child {
                    width: 7%;
                    padding-left: 31px;
                    font-size: 16px;
                    text-align: center;
                }
                div:nth-child(2) {
                    width: 16%;
                    text-align: center;
                    i {
                        width: 5px;
                        height: 5px;
                        background: #999999;
                        border: 2px solid #fff;
                        border-radius: 50%;
                        display: inline-block;
                        position: relative;
                        z-index: 10;
                    }
                    
                }
                div:last-child {
                    padding-left: 8%;
                    padding-right: 2%;
                }
            }
            
            
            .node-icon:after {
                content: '';
                position: absolute;
                z-index: 9;
                left: 5%;
                top: -37px;
                // border-left: 1px solid #9A9A9A;;
                border-left: 1px solid rgb(242, 155, 135);
                height: 150%;
            }
        //    .line:after{
        //         content: '';
        //         position: absolute;
        //         z-index: 9;
        //         left: 9%;
        //         top: -19px;
        //         border-left: 1px solid #ddd;
        //         height: 194%;
        //     }
            .finall{
                color: #9A9A9A;
               i{ 
                    width: 25px;
                    height: 25px;
                    display: inline-block;
                    line-height: 25px;
                    border-radius: 50%;
                    border:1px solid #B6B5B5;
                    position: relative;
                    // background: url(../../../static/order/diamondpink.png) no-repeat  center 40%;
                    // background-size:100% 100%;
                    img{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top:1px
                    }
                } 
            } 
        }
    }
    .empy-express{
        text-align: center;
        padding: 130px;
        font-size: 24px;
        color: #999999;
    }
}


.track-content{
    .content{
    //    height: 0.5rem;
       width: 100%;
    //    background-color:#f7f7f7;
       margin: 50px 30px 30px 50px; 
    }
    .follow{
        padding-bottom: 16px;
    }
    .follow-list{
        width: 92%; 
        margin-left: 4%;
        margin: auto;
        padding-left: 15px;
        padding-right: 15px;
    }
    .message-text{
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 35px;
        letter-spacing: 0px;
        color: #333333;
        width: 50%;
    }
    .fontblack{
        color:#999999
    }
    .img2{
        width: 12px;
        height: 12px;
        float: right;
    }
    .addressshow2{
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        width: 75%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
        font-size: 16px;
    }
    .addressshow1{
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        width: 75%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
        font-size: 16px;
    }
    .orderTitle{
        font-size: 16px;
        color: #333333;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
        height: 35px;
    }
    .orderDetail{
        font-size: 14px;
        color: #666666;
        text-align:left;
    }
    .border-ceter{
        width: 92%;
        padding-left: 15px;
        padding-right: 15px;
    }
    .pay-button{
        width: 88%;
        height: 35px;
        position:relative;
        background-color: red;
        color: white;
        margin-left: 6%;
    }
    ul li{
        list-style:none;
        font-size: 16px;
    }
    ul {
        padding-left: 65px;
    }
    .track-list{
        position:relative;
    }
    .track-list li{
        position:relative;
        padding:0px 0 20px 25px;
        line-height:16px;
        border-left:1px solid #d9d9d9;
        color: #999;
    }
    .track-list li.first{
        color:red;
        padding-top:0;
        width: 100%;
        text-align: left;
        border-left:1px solid #d9d9d9;
    }
    .track-list li .node-icon{
        position: absolute;
        left: -4.5px;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        top:4px;
        background-color: #999999;
    }
    .track-list li.first .node-icon{
        background-position:0-72px;
        background-color: green;
        width: 16px;
        z-index: 2;
        height: 16px;
        position: absolute;
        left: -8px;
        top: 0;
        border-radius: 50%;
    }
    .track-list li .time{
        margin-right:20px;
        position:relative;
        top:4px;
        display:inline-block;
        vertical-align:middle;
        background-color: white;
        color: #999;
        width: 100%;
        text-align: left;
        font-size: 12px;
    }
    .track-list li .txt{
        position:relative;
        display:inline-block;
        vertical-align:top;
        color: #999;
        line-height: 25px;
        font-size: 14px;
    }
    .track-list li.first .time{
        text-align: left;
        width: 94%;
        color:green;
    }
    .track-list li.first .txt{
        color: green;
        text-align: left;
        width: 94%;
    }
    .track-list li.finall{
        position:relative;
        padding:0px 0 20px 25px;
        line-height:18px;
        border-color: white;
        border-left:1px solid #ffffff;
        color: #999;
    }
    .track-list li.finall .div-spilander{
        width: 1px;
        position: absolute;
        left: -0.5px;
        height: 8px;
        background-color: #d9d9d9;
    }
}
</style>
