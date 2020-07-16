<template>
    <div class="logistic-info">
        <Header :title="lang.logistic" />
        <div class="logistic" v-if="express.logistics">
            <div class="schedule">
                <div class="left">
                    <div class="title">订单配送中</div>
                    <div class="address">
                        <span>收货地址：</span>
                        <span>
                            {{data.address.countryName}}
                            {{data.address.provinceName}}
                            {{data.address.cityName}}
                            {{data.address.address}}
                        </span>
                    </div>
                    <div class="deliveryNo">
                        <span>顺丰快递：</span>
                        <span>{{data.express.expressNo}}</span>
                        <i class="icon iconfont iconcopy copy-btn" :data-clipboard-text="data.express.expressNo" @click="copy"></i>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <img src="../../static/personal/user.png" alt=""> 
                        <p>联系商家</p>
                    </div>
                </div>
            </div>
            <!-- <div class="track" >
                <div class="track-list">
                    <ul>
                        <div v-for="(a,_a) in list" :key="_a">
                            <li class="start" v-if="_a === 0">
                                <div>
                                    <span class="time">{{a.datetime.slice(5,16)}}</span>
                                </div>
                                <div>
                                    <i><img src="../../static/personal/finished.png" alt=""></i>
                                </div>
                                <div>
                                    <span class="statustxt">{{lang.received}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            
                            <li class="node-icon" v-if="_a > 0 && _a !== list.length-1">
                                <div>
                                    <span class="time">{{a.datetime.slice(5,16)}}</span>
                                </div>
                                <div>
                                    <i></i>
                                </div>
                                <div>
                                    <span class="statustxt">{{lang.intransit}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            <li v-if="_a === list.length-1" class="finall">
                                <div>
                                    <span class="time">{{a.datetime.slice(5,16)}}</span>
                                </div>
                                <div>
                                    <i><img src="../../static/personal/diamondgary.png" alt=""></i>
                                </div>
                                <div>
                                    <span class="statustxt">{{lang.WaitingPackage}}</span>
                                    <span class="txt">{{a.remark}}</span>
                                </div>
                            </li>
                            
                        </div>
                    </ul>
                </div>
            </div> -->

            <div class="track-content" >
                <!-- <div class="content"></div> -->
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
            <div class="empy-express">{{lang.noexpress}}</div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/personal/header.vue'
import Clipboard from 'clipboard'
export default {
  name: 'Logic',
  layout: 'no-footer-bar',
  components: {
    Header,
  },
  data () {
    return {
        lang:this.LANGUAGE.personal.logisticInfo,
        expStatus:{},
        oid: this.$route.query.orderId, 
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
        list:[],
    }
  },
  mounted(){
    const _this = this
    _this.$nextTick(() => {
      _this.getData()
    })
  },
  methods: {
    getData() {
      this.$axios({
        method: `get`,
        url: `/web/member/order/detail`,
        params: {
          orderId: this.$route.query.orderId
        }
      })
        .then(data => {
        console.log("this.data",data)
          this.data = data
          this.express = data.express
          if(data.express.logistics){
            this.list = data.express.logistics.list
            this.expStatus = data.express.logistics.abstract_status
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    copy() {
      const clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', e => {
        this.$toast.show(this.lang.toast1)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$toast.show(this.lang.toast2)
        clipboard.destroy()
      })
    },
  }
}
</script>
<style lang='less' scoped>
.logistic-info{
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
        border-radius: 6px;
        border:1px solid #ddd;
        margin: 15px;
        padding: 10px 0 10px 10px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        .left{
            .title{
                font-size: 16px;
                font-weight: 700;
                color: #666666;
                padding: 10px 0;
            }
            .address{
                font-size: 14px;
                padding: 5px 0;
                color: #999999;
            }
            .deliveryNo{
                font-size: 14px;
                padding: 5px 0;
                color: #999999;
            }
        }
        .right{
            width: 28%;
            text-align: right;
            div{
                text-align: center;
            }
            p{
                text-align: center;
                color: #999999;
            }
        }
    }
    .track{
        border-radius: 6px;
        border:1px solid #ddd;
        margin: 15px;
        padding: 30px 10px;
        position:relative;
        text-align: center;
        .track-list{
            position: relative;
            display: inline-block;
            width:100%;
            .start{
                div:nth-child(2) {
                    width: 7%;
                    padding-left: 4px;
                    font-size: 16px;
                    text-align: center;
                }
                i{
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    line-height: 20px;
                    border-radius: 50%;
                    border:1px solid #B6B5B5;
                    background-color: green;
                    color:#fff;
                    position: relative;
                    img{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top:0px
                    }
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
                div:nth-child(2) {
                    width: 7%;
                    padding-left: 7px;
                    font-size: 16px;
                    text-align: center;
                }
                div:last-child {
                    padding-left: 3%;
                    padding-right: 2%;
                }
            }
            
            
            .node-icon:after {
                content: '';
                position: absolute;
                z-index: 9;
                left:65px;
                top: 0;
                // top: -87px;
                // border-left: 1px solid #9A9A9A;;
                border-left: 1px solid rgb(242, 155, 135);
                height: 100%; 
                // height: 180%;
            }
            // .node-icon:last-child{
            //     position: relative;
            // }
            .finall{
                color: #9A9A9A;
                // div{
                //     position: absolute;
                //     top:10px
                // }
                div:nth-child(2) {
                    width: 7%;
                    padding-left: 4px;
                    font-size: 16px;
                    text-align: center;
                }
               i{ 
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    line-height: 20px;
                    border-radius: 50%;
                    border:1px solid #B6B5B5;
                    position: relative;
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
        padding: 50px;
        font-size: 24px;
        color: #999999;
    }
}
  

.track-content{
    border-radius: 6px;
    border:1px solid #ddd;
    margin: 15px;
    padding: 30px 10px;
    .content{
       height: 0.5rem;
       width: 100%;
       background-color:#f7f7f7;
       margin: 30px 30px 30px 50px; 
    }
    .follow{
        padding-bottom: 0.5rem;
    }
    .follow-list{
        width: 92%; 
        margin-left: 4%;
        // margin: auto;
        // padding-left: 15px;
        // padding-right: 15px;
    }
    .message-text{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 3rem;
        letter-spacing: 0rem;
        color: #333333;
        width: 50%;
    }
    .fontblack{
        color:#999999
    }
    .img2{
        width: .81rem;
        height: .8rem;
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
        font-size: 1rem;
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
        font-size: 1rem;
    }
    .orderTitle{
        font-size: 1rem;
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
        height: 2.5rem;
    }
    .orderDetail{
        font-size: 0.8rem;
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
        height: 2.6rem;
        position:relative;
        background-color: red;
        color: white;
        margin-left: 6%;
    }
    ul li{
        list-style:none;
        font-size: 13px;
    }
    ul {
        padding-left: 80px
    }
    .track-list{
        position:relative;
    }
    .track-list li{
        position:relative;
        padding:0px 0 16px 25px;
        line-height:1rem;
        border-left:1px solid #d9d9d9;
        color: #999;
        text-align: left;
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
        left: -4px;
        border-radius: 0.25rem;
        width: 8px;
        height: 9px; 
        top:4px;
        background-color: #999999;
    }
    .track-list li.first .node-icon{
        background-position:0-72px;
        background-color: green;
        width: 15px;
        z-index: 2;
        height: 15px;
        position: absolute;
        left: -7px;
        top: 0;
        border-radius: 50%;
    }
    .track-list li .time{
        // margin-right:20px;
        line-height: 20px;
        position: absolute;
        width: 34%;
        left:-85px;
        top: 0; 
        // top:-10px;
        display:inline-block;
        vertical-align:middle;
        background-color: white;
        color: #999;
        text-align: left;
        font-size: 12px;
    }
    .track-list li .txt{
        position:relative;
        display:inline-block;
        vertical-align:top;
        color: #999;
        line-height: 25px;
        font-size: 13px;
    }
    .track-list li.first .time{
        text-align: left;
        // width: 94%;
        color:green;
    }
    .track-list li.first .txt{
        color: green;
        text-align: left;
        // width: 94%;
    }
    .track-list li.finall{
        position:relative;
        padding:0px 0 1.5rem 25px;
        line-height:18px;
        border-color: white;
        border-left:1px solid #ffffff;
        color: #999;
    }
    .track-list li.finall .div-spilander{
        width: 1px;
        position: absolute;
        position: absolute;
        left: -1px;
        height:4px;
        background-color: #d9d9d9;
    }
}
</style>