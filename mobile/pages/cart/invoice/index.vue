<template>
    <div class="invoice">
        <div class="detail">{{ lang.InvoiceDetails }}</div>
        <div class="type">
            <div class="title"><span><span class="star">*</span>&nbsp;{{ lang.HeaderType }}</span></div>
            <div class="type_select">
                <div>
                    <i :class="{ icongou: select1 }" @click="selected(1)" class="icon iconfont"></i>
                    <span>{{ lang.BusinessUnit }}</span>
                </div>
                <div>
                    <i :class="{ icongou: select2 }" @click="selected(2)" class="icon iconfont "></i>
                    <span>{{ lang.UnBusinessUnit }}</span>
                </div>
            </div>
        </div>
        <div class="rise">
            <div class="title"><span class="star">*</span>&nbsp;<span>{{ lang.Invoice }}</span></div>
            <div class="rise_select">
                <input v-model="invoice.invoice_title" type="text" placeholder="填写发票抬头">
            </div>
        </div>
        <div class="rise">
            <div class="title"><span v-if="invoice.invoice_type == 1" class="star">*</span>&nbsp;<span>{{ lang.TaxID }}</span></div>
            <div class="rise_select">
                <input v-model="invoice.tax_number" type="text" placeholder="填写纳税人识别号">
            </div>
        </div>
        <div class="line">
            
        </div>
        <div class="totle">
            <div class="title"><span>{{ lang.totalAmount }}</span></div>
            <div class="rise_select">
                <span>{{ coin }} {{totolPrice}}</span>
            </div>
        </div>
        <div class="tips">
           <p>{{ lang.tips }}</p>
        </div>
        <div class="btn">
            <button @click="submit">{{ lang.confirm }}</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"invoice",
    layout: 'no-footer-bar',
    data(){
        return{
            select1:false,
            select2:false,
            title:'',
            tax:'',
            selectType:'',
            invoice:{
                invoice_type:'',
                invoice_title:'',
                tax_number:'',
                is_electronic:'0'
            },
            info:{},
            totolPrice:this.$route.query.price,
            kai:this.$route.query.kai,
            coin: this.$store.state.coin,
            lang: this.LANGUAGE.cart.invoice,
            isLogin: !!this.$store.state.token,
        }
    },
    mounted(){
        this.invoice = this.info
        console.log(this.totolPrice)
    },
    methods:{
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
            // this.invoice.invoice_type = this.selectType
            // this.invoice.invoice_title = this.title
            // this.invoice.tax_number = this.tax
            if(this.kai == true){
                let info = this.info
            }
            this.$router.push({
                name: 'cart-sureOrder',
                query:{
                    invoice:info
                }
            })
            // if(this.isLogin){

            //     this.$router.push({
            //         name: 'cart-sureOrder',
            //         query:{
            //             invoice:{info}
            //         }
            //     })
            // }
        }
    }
}
</script>
<style scoped lang="less">
.invoice{
    .title{
        font-size: 13px;
    }
    .detail{
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding-left: 15px;
        background: #ddd;
        font-size: 20px;
        // color:#eee;
    }
    .type{
        padding: 20px;
        // height: 20px;
        display: flex;
        // justify-content: space-between;
        border-bottom:1px solid #ddd;
        .type_select{
            // display: flex;
            // height: 20px;
            margin-left: 30px;
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
        // margin-left: 35px;
        cursor: pointer;
        display: block;
    }
    .icongou{
        background: #f29b87;
        color: #fff;
        border: .026667rem solid #f29b87;
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
        // justify-content: space-between
    }
    .tips{
        margin: 15px 0;
        color:#bbb;
    }
    .btn{
      padding: 60px 20px;  
      button{
        width: 130px;
        height: 30px;
        background: rgba(170, 138, 123, 1);
        border-radius: 4px;
        color:#FFF;
        cursor: pointer;
      }
    }
    .star{
        display: inline-block;
        line-height: 20px;
        color: #f29b87;
    }
}
</style>