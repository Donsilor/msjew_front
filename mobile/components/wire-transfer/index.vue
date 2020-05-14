<template>
    <div class="uploadContent">
        <!-- <Header :title="lang.pleaseSelectAccount" @back="goBack" class="detail"/> -->
        <div class="uploadMsg">
            <div class="Amount">
              <span class="title1">{{ lang.paidAmount}}</span>
              <span><span class="coin">{{ $store.state.coin }}</span> <span class="price">{{ formatMoney(price) }}</span></span>
            </div>
            <div class="account">
                <ul>
                    <li v-for="(item, index) in accountlist" :key="index">
                        <div >
                        <div class="right" :class="typeIndex === index ? 'bg' : ''" @click="changeType(index)" >
                            <span v-show="typeIndex === index"  class="icon iconfont icongou"  ></span>
                            <div class="Account">
                                <div class="box bank">
                                    <span>{{lang.Account}} </span>
                                    <span> {{ item.bank_name }}</span>
                                </div>
                                <div class="box number">
                                    <span>{{lang.AccountNumber}} </span>
                                    <span> {{ item.account }}</span>
                                </div>
                                <div class="box name">
                                    <span>{{lang.AccountName}} </span>
                                    <span> {{ item.account_name }}</span>
                                </div>
                                <div class="box name">
                                    <span>{{lang.bankAddress}} </span>
                                    <span> {{ item.bank_address }}</span>
                                </div>
                                <div class="box name">
                                    <span>{{lang.SwiftCode}}</span>
                                    <span> {{ item.swift_code }}</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="uploadImg">
                <p class="title2"><span class="star">*</span>{{lang.UploadPayVoucher}}</p>
                <div class="upload">
                    <div class="up">
                        <el-upload
                        :class="{hided:hideUpload}"
                        action="#"
                        accept ='.jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp'
                        :before-upload="beforeUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove" 
                        :limit="1"
                        :on-change = "onchange"
                        >
                        <i class="el-icon-plus"></i>
                        <span class="up-text">{{lang.uploadPhotos}}</span>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    </div>
                </div>
                <p class="tips">{{lang.Note1}}</p>
            </div>
            <div class="transactionNum">
                <p class="title3">{{lang.PayTransactionNumber}} <span class="can-select">{{lang.Optional}}</span></p>
                <input class="num-input" type="text" v-model="number">
            </div>
            <div class="prompt">
              <p>{{lang.Note2}}</p>
            </div>
            <div class="btn">
                <div class="btn-white" @click="Cancel">
                    {{ lang.CancelPayment }} 
                </div>
                <div class="btn-block" @click.stop="Finished" >
                    {{ lang.PaymentCompleted }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/personal/common-header.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
    name:"upload",
    layout: 'no-footer-bar',
    components: {
        Header,
    },
    data(){
        return{
            lang: this.LANGUAGE.cart.pay,
            price: JSON.parse(this.$route.query.info).payAmount,
            orderId: JSON.parse(this.$route.query.info).orderId,
            accountlist: [],
            typeIndex:'',
            fileList: {},
            dialogImageUrl: '',
            dialogVisible: false,
            hideUpload: false,
            account:'',
            imgs:'',
            number:'',
        }
    },
    props: [],
    mounted(){
        this.getAccount()
    },
    methods:{
        // 获取账户信息
        getAccount(){
            this.$axios
                .get('/web/pay/collection-account-info')
                .then(res => {
                    this.accountlist = res
                    console.log("ssss",res)
                })
                .catch(err => {
                this.$message.error(err.message)
            })
        },
        // 取消支付
        Cancel(){
            this.$emit('cancel', true);
        },
         // 上传图片
        beforeUpload(file) {
            console.log("file2222",file)
            const isJPG = 
                file.type == 'image/jpeg'||
                file.type == 'image/png'||
                file.type == 'image/jpg'||
                file.type == 'image/gif'||
                file.type == 'image/tiff'||
                file.type == 'image/raw'||
                file.type == 'image/pcx'||
                file.type == 'image/tga'||
                file.type == 'image/exif'||
                file.type == 'image/fpx'||
                file.type == 'image/svg'||
                file.type == 'image/psd'||
                file.type == 'image/cdr'||
                file.type == 'image/pcd'||
                file.type == 'image/dxf'||
                file.type == 'image/ufo'||
                file.type == 'image/eps'||
                file.type == 'image/ai'||
                file.type == 'image/WMF'||
                file.type == 'image/webp'||
                file.type == 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$toast.show(this.lang.imgFomat);
                return isJPG
            } 
            if (!isLt2M) {
                this.$toast.show(this.lang.imgSize);
                return isLt2M
            }
            // return isJPG && isLt2M;
            var fd = new window.FormData();
            fd.append('file', file, file.name)
            this.$axios.post("/web/file/images",fd)
            .then(res => {
                this.imgs = res.url
                console.log("上传图片",this.imgs);
                //  return res.data.url
            }).catch(err => {
                this.$toast.show(err.message)
            });
            // return false // 返回false不会自动上传
        },
        // 完成支付
        Finished(){
            if(this.account === ''){ 
                this.$toast.show(this.lang.selectAccount)
                return false
            }
            if(this.imgs === '' ){
                this.$toast.show(this.lang.selectVoucher)
                return false
            }
            const data ={
                order_id: this.orderId,
                account:this.account,
                payment_serial_number:this.number,
                payment_voucher:this.imgs
            }
            this.$axios
            .post('/web/pay/wire-transfer',data)
            .then(res => {
                this.$toast.show(this.lang.transferSuccessful)
                this.Cancel()
                setTimeout(() => {
                    this.$router.replace({
                        name: 'personal-order',
                    })
                }, 2000)
            })
            .catch(err => {
                this.$toast.show(err.message)
            })
        },
        formatMoney: formatMoney,
        // 切换账户
        changeType(ind) {
            this.account = this.accountlist[ind].account
            console.log("选择",ind)
            this.typeIndex = ind
        },
       
        // 删除图片
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            if(fileList){
                setTimeout(() => {
                    this.hideUpload = false
                }, 100);
            }
        },
        // 放大图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 上传时触发
        onchange(fileList){
            // console.log(fileList.length)
            if(fileList !==''){
                this.hideUpload = true
            }
        },
    }
}
</script>
<style lang="less" scoped>
.uploadContent{
    .uploadMsg{
        .Amount{
            padding: 20px 0;
            color: #f29b87;
            .title1{
                font-size: 20px;
                line-height: 25px;
            }
            .coin{
                font-size: 20px;
                line-height: 25px;
            }
            .price{
                font-size: 23px;
                line-height: 25px;
            }
        }
        .account{
            padding: 0 20px;
            background-color: #f6f6f6;
            padding-top: 20px;
           padding-bottom: 5px;
            ul {
                li {
                width: 100%;
                img {
                    width: 32px;
                    height: 32px;
                    margin: 16px;
                    float: left;
                }
                .bg{
                    background-color: #ffffff!important;    
                    .bank{
                        font-size: 15px;
                        color: #ba7f8c!important;
                        font-weight: 600;
                    }
                    .number{
                        font-size: 14px;
                        color: #ba7f8c!important;
                    }
                    .name{
                        font-size: 14px;
                        color: #ba7f8c!important;
                    }
                }
                .right {
                    position: relative;
                    text-align: left;
                    // margin-left: 64px;
                    padding: 10px 15px;
                    // border-bottom: 1px solid #dddddd; /*no*/
                    // background-color: #ffffff;
                    box-shadow: 0px 2px 4px 0px #dcdcdc;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    background-color: #ececec;
                    .Account{
                        .box{
                            // display: flex;
                            span{
                                // display: inline-block;
                                line-height: 20px;
                            }
                        }
                        .bank{
                            font-size: 12px;
                            color: #999999;
                            margin-bottom: 10px;
                            font-weight: 600;
                        }
                        .number{
                            font-size: 11px;
                            color: #999999;
                        }
                        .name{
                            font-size: 11px;
                            color: #999999;
                        }
                    }
                    .support{
                        position: absolute;
                        top: 48%;
                        left: 0;
                        transform: translateY(-50%);
                        margin-left: 150px;
                        font-size: 10px;
                        color: #333;
                        }
                        .icon {
                            // float: right;
                            position: absolute;
                            right:20px;
                            top: 45px;
                            width: 30px;
                            height: 30px; 
                            // margin: 12px 12px 0 0;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(187, 187, 187, 1); /*no*/
                            border-radius: 50%;
                        }
                        .ph {
                            display: inline-block;
                            float: none;
                            width: 16px;
                            height: 16px;
                            background: rgba(242, 155, 135, 1);
                            border-radius: 50%;
                            font-size: 12px;
                            line-height: 16px;
                            color: #ffffff;
                            text-align: center;
                            border: none;
                        }
                        .icongou {
                            // background: rgba(242, 155, 135, 1);
                            background-color: #e2a8b4;
                            border-radius: 50%;
                            font-size: 30px;
                            line-height: 30px;
                            color: #ffffff;
                            text-align: center;
                            // border: 1px solid rgba(242, 155, 135, 1); /*no*/
                            border: 1px solid #e2a8b4;
                        }
                        .box-a {
                            font-size: 14px;
                            line-height: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                        p {
                            font-size: 12px;
                            line-height: 20px;
                            width: 86%;
                            word-break: keep-all;
                            font-family: PingFangHK-Regular;
                            font-weight: 400;
                            color: rgba(153, 153, 153, 1);
                        }
                    }
                }
            } 
        }
        .uploadImg{
            padding: 30px 20px 0 20px;
            .title2{
                text-align: left;
                font-size: 16px;
                .star{
                    color:red;
                }
            }
            .upload{
                margin: 20px;
                // margin: 20px 90px;
                // width: 148px;
                // height: 148px;
                position: relative;
                display: flex;
                justify-content: center; 
                // height: 140px;
                // background-color: #f6f6f6;
                // border-radius: 10px;
                .up{
                    width: 235px;
                    height: 120px;
                }
                .up-text{
                    width: 235px;
                    text-align: center;
                    display: block;
                    position: absolute;
                    bottom: -36px;
                    // left: 120px;
                    color: #777777;
                    font-size: 14px;
                }
            }
            .tips{
                font-size: 14px;
                color: #ff6b6b;
            }
        }
        .transactionNum{
            padding: 20px;
            .title3{
                text-align: left;
                font-size: 16px;
                line-height: 45px;
                .can-select{
                    color: #999999;
                }
            }
            .num-input{
                width: 345px;
                height: 40px;
                background-color: #f6f6f6;
                border-radius: 8px;
                padding-left: 15px;
            }
        }
        .prompt{
            color: #f29b87;
        }
        .btn {
            width: 100%;
            margin-bottom: 50px;
            .btn-white {
                width: 345px;
                height: 40px;
                margin: 20px 20px 0px;
                background: rgba(250, 250, 250, 1);
                border: 1px solid rgba(187, 187, 187, 1);
                border-radius: 8px;
                font-size: 14px;
                line-height: 40px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .btn-block {
                width: 345px;
                height: 40px;
                margin: 20px 20px 0px;
                background: rgba(51, 51, 51, 1);
                border-radius: 8px;
                font-size: 14px;
                line-height: 40px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>
<style>
.el-upload--picture-card i{
    background-color: #ffffff;
	border-radius: 50px;
	border: solid 1px #cdcdcd;
    padding: 10px;
}
.el-upload-list__item {
    transition: none !important;
}
.el-upload{
  width: 235px;
  height: 120px;
  line-height: 120px;
  background-color: #f6f6f6;
  border: solid 0.5px #cdcdcd!important;
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 235px;
    height: 120px;
    border: solid 0.5px #cdcdcd!important;
}
.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{
  display: none;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}
.hided .el-upload--picture-card {
    display: none;
}
.el-upload-list--picture-card .el-upload-list__item-actions span{
    display: block;
}
.el-upload-list--picture-card .el-upload-list__item-actions{
    opacity: 1;
    display: flex;
    justify-content: center;
    padding-top: 50px;
}
.el-dialog{
    margin-top: 10vh!important;
    margin: 0;
    width: 80%!important;
    top:0;
    left: 10%;
}

</style>