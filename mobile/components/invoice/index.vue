<template>
    <div class="invoice">
        <div class="box">
            <div class="detail">{{ lang.InvoiceDetails }}
                <i class="quit icon iconfont iconfanhuiicon-" @click="quit()">{{lang_header.back}}</i>
            </div>
            <!-- <Header :title="lang.InvoiceDetails" @click="quit()"  class="detail"/> -->
            <div>
                <div class="select"> 
                    <div>
                        <button @click="zhizhi(0)" :class="{'active':invoice.is_electronic == '0'}">{{ lang.PaperInvoice }}</button>
                    </div>
                    <div>
                        <button @click="zhizhi(1)" :class="{'isactive':invoice.is_electronic == '1'}">{{ lang.ElectronicInvoice }}</button>
                    </div>
                    
                </div>   
            </div>
            <div class="type">
                <div class="title"><span><span class="star">*</span>&nbsp;{{ lang.HeaderType }}</span></div>
                <div class="type_select">
                    <div>
                        <i :class="{ icongou: select2 }" @click="selected(2)" class="icon iconfont "></i>
                        <span>{{ lang.UnBusinessUnit }}</span>
                    </div>
                    <div style="margin-left:25px;">
                        <i :class="{ icongou: select1 }" @click="selected(1)" class="icon iconfont"></i>
                        <span>{{ lang.BusinessUnit }}</span>
                    </div>
                </div>
            </div>
            <div class="rise">
                <div class="title"><span class="star">*</span>&nbsp;<span>{{ lang.Invoice }}</span></div>
                <div class="rise_select">
                    <input v-model="invoice.invoice_title" type="text" :placeholder="lang.holder1">
                </div>
            </div>
            <div class="rise">
                <div class="title"><span v-if="invoice.invoice_type == 1" class="star">*</span>&nbsp;<span>{{ lang.TaxID }}</span></div>
                <div class="rise_select">
                    <input v-model="invoice.tax_number" type="text" :placeholder="lang.holder2">
                </div>
            </div>
            <div class="rise" v-show="invoice.is_electronic == 1">
                <div class="title"><span class="star">*</span>&nbsp;<span>{{ lang.email }}</span></div>
                <div class="rise_select">
                    <input v-model="invoice.email" type="text" :placeholder="lang.holder3">
                </div>
            </div>
            <div class="line" :class="{'height30': invoice.is_electronic == 1}"></div>
            <div class="totle">
                <div class="title"><span>{{ lang.totalAmount }}</span></div>
                <div class="rise_select">
                    <span>{{ formatCoin(coin) }}{{ultimatelyPay}}</span>
                </div>
            </div>
            <div v-if="invoice.is_electronic == 0" class="tips">
                <p>{{ lang.tips }}</p>
            </div>
            <div class="btn" :class="{'flex':showFlex}">
                <button class="cancel" v-if="showCancel" @click="cancel">{{ lang.cancel }}</button>
                <button class="confirm" @click="submit">{{ lang.confirm }}</button>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/personal/common-header.vue'
export default {
    name:"invoice",
    layout: 'no-footer-bar',
    components: {
        Header,
    },
    props: ['kai','totlePrice','ultimatelyPay','invoiceInfo'],
    data(){
        return{
            select1:false,
            select2:false,
            title:'',
            tax:'',
            selectType:'',
            invoice:{
                invoice_type:2,
                invoice_title:'',
                tax_number:'',
                is_electronic:'0',
                email:''
            },
            coin: this.$store.state.coin,
            lang: this.LANGUAGE.cart.invoice,
            lang_header: this.LANGUAGE.components.personal,
            isLogin: !!this.$store.state.token,
            // ultimatelyPay: this.$route.query.ultimatelyPay,
            isactive:true,
            Active:false,
            showFlex:false,
            showCancel:false
        }
    },
    mounted(){
        // if(this.invoice.invoice_type == 2){
        //     this.select2 = true
        // }
        if(this.invoiceInfo.invoice_type == 1){
            this.select1 = true
        } else if(this.invoiceInfo.invoice_type == 2){
            this.select2 = true
        } else {
            this.select2 = true
            this.select1 = false
        }

        if(this.invoiceInfo){
            this.invoice.invoice_type = this.invoiceInfo.invoice_type
            this.invoice.invoice_title = this.invoiceInfo.invoice_title
            this.invoice.tax_number = this.invoiceInfo.tax_number
            this.invoice.is_electronic = this.invoiceInfo.is_electronic
            this.invoice.email = this.invoiceInfo.email
        }

        if(this.invoice.is_electronic == 1){
            if(this.invoiceInfo.invoice_title &&this.invoiceInfo.tax_number&&this.invoiceInfo.email){
                this.showFlex = true
                this.showCancel = true
            }
        }else if(this.invoice.is_electronic == 0){
            if(this.invoiceInfo.invoice_title &&this.invoiceInfo.tax_number){
                this.showFlex = true
                this.showCancel = true
            }
        }
    },
    methods:{
        zhizhi(or){
            // console.log("纸质",this.isactive,this.Active)
            this.invoice.is_electronic = or;
            console.log(this.invoice.is_electronic)
            // if(or == '0'){
            //     this.isactive != this.Active
            //     // this.Active = false
            // }
        },
        dianzi(or){
            // if(or == '1'){
            //     this.isactive != this.Active
            //     // this.Active = true
            // }
            // console.log("电子",this.isactive,this.Active)
            this.invoice.is_electronic = or;
        },
        // goBack() {
        //     this.$router.replace({
        //         name: 'cart-sureOrder'
        //     })
        // },
        selected(ind){
            if(ind == 1){
                this.select1 = true
                this.select2 = false;
            }else if(ind == 2){
                this.select2 = true
                // this.select2 = !this.select2
                this.select1 = false;
            }
            this.invoice.invoice_type = ind
            console.log("ind",ind)
        },
        submit(){
            if(this.invoice.invoice_type == ''){
               this.$toast.show(this.lang.hint1) 
               return
            }
            if(this.invoice.invoice_title == ''){
               this.$toast.show(this.lang.hint2) 
               return
            }
            if(this.invoice.invoice_type == 1){
                if(this.invoice.tax_number == ''){
                   this.$toast.show(this.lang.hint3) 
                   return
                }
            }
            
            if(this.invoice.is_electronic == 1){
                if(this.invoice.email == '' || !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.invoice.email))){
                    this.$toast.show(this.lang.hint4) 
                    return
                }
            }
            this.$emit('closeIP',this.invoice); 
        },
         // 取消发票
        cancel(){
            // console.log("ssss",this.invoice)
            this.invoice.invoice_title = ''
            this.invoice.tax_number = ''
            this.invoice.email = ''
            this.invoice.invoice_type = 2
            this.invoice.is_electronic = 0
            // this.invoice = {}
            this.$emit('closeIP',this.invoice);
        },
        // 返回
        quit(){
            this.$emit('closeIP');
        },
    }
}
</script>
<style scoped lang="less">
.invoice{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    .box{
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .quit{
        position: absolute;
        top: 0%;
        left: 8%;
        font-size: 14px;
        color: #666;
    }
   
    .detail{
        height: 50px;
        line-height: 50px;
        text-align: center;
        padding-left: 15px;
        background: #ddd;
        font-size: 16px;
        position: relative;
        color: #333;
    }
    .select{
        display: flex;
        justify-content:space-around;
        padding-top:10px;
        div{
            display: flex;
            button{
                width: 140px;
                border:1px solid #ddd;
                height: 35px;
                border-radius: 6px;
                font-size: 15px;
                color: #bbb;
            }
            .active{
                border:1px solid #8b766c;
                color:#000;
            }
            .isactive{
                border:1px solid #8b766c;
                color:#000;
            }
        }
    }
    .type{
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #ddd;
        .type_select{
            width:220px;
            display: flex;
            margin-top: 10px;
            div:first-child{
                margin-bottom: 10px;
            }
            div{
                display: flex;
                span{
                    display: inline-block;
                    line-height: 20px;
                    margin-left: 5px;
                }
            }
        }
        i {
            width: 18px;
            height: 18px;
            text-align: center;
            font-size: 15px;
            line-height: 18px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 50%;
            cursor: pointer;
            display: block;
        }
        .icongou{
            background: #f29b87;
            color: #fff;
            border: .026667rem solid #f29b87;
        }
    }
    
    .rise{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #ddd;
    }
    .title{
        line-height: 45px;
    }
    .rise_select{
        line-height: 45px;
        input{
            width:230px;
            height: 45px;
            cursor: pointer;
            padding-left: 8px;
        }
    }
    .line{
        height: 65px;
        border-bottom: 10px solid #ddd;
    }

    .line.height30{
        height: 30px;
    }
    .totle{
        padding: 10px 20px;
        display: flex;
        border-bottom: 1px solid #ddd;
        .title{
            margin-right: 55px;
        }
        .rise_select{
            color: #f29b87;
            font-size: 16px;
        }
    }
    .tips{
        margin-top: 15px;
        color:#bbb;
    }
    .flex{
        display: flex;
        justify-content: space-between;
    }
    .btn{
      padding: 30px 20px;  
      .confirm{
        width: 130px;
        height: 30px;
        line-height: 30px;
        background: rgba(170, 138, 123, 1);
        border-radius: 4px;
        color:#FFF;
        cursor: pointer;
      } 
      .cancel{
        width: 130px;
        height: 32px;
        line-height: 30px;
        background: #F2F2F2;
        border-radius: 4px;
        color:#000;
        cursor: pointer;
      }
    //   button{
    //     width: 130px;
    //     height: 30px;
    //     background: rgba(170, 138, 123, 1);
    //     border-radius: 4px;
    //     color:#FFF;
    //     cursor: pointer;
    //   }
    }
    .star{
        display: inline-block;
        line-height: 20px;
        color: #f29b87;
    }
}
</style>