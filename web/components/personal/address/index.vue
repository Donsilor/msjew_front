<template>
  <div class="address">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.address`) }}</div>
    </div>
    <div class="clf" style="padding: 0 28px; width: 100%">
      <div class="add-btn fr" @click="newAddress()">+ {{ $t(`${lang}.newAddress`) }}</div>
    </div>
    <div class="addr-blocks" :class="{'en': language == 'en_US'}">
      <div
        v-for="(a, index) in address"
        :key="index"
        :class="{ 'addr-active': a.is_default == 1 }"
        class="addr-block"
      >
        <div class="box-left">
          <div class="addr-user">
              <span v-if="language == 'zh_CN'">{{ a.lastname }}{{ a.firstname }}</span>
              <span v-else>{{ a.firstname }} {{ a.lastname }}</span>
          </div>

          <div class="addr-user-phone">
            <div>{{ a.mobile_code }}</div>
            <div>{{ a.mobile }}</div>
          </div>

          <div class="user-email">{{ a.email }}</div>

          <div class="addr-address">
            <div v-if="language == 'zh_CN'">
              <div>{{ a.country_name }} {{ a.province_name }} {{ a.city_name }}</div>
              <div>{{ a.address_details }}</div>
            </div>
            <div v-else>
              <div>{{ a.address_details }}</div>
              <div>{{ a.city_name }} {{ a.province_name }} {{ a.country_name }}</div>
            </div>
          </div>
          <div class="font-size-14 color-333">{{ a.zip_code }}</div>
          
          <!-- <div class="addr-board" @click="changeDefaultAddress(a.id)" /> -->
                    
          <img
            v-show="a.is_default == 1"
            src="../../../static/personal/account/address-bar.png"
          />
        </div>

        <div class="box-right">
          <div
            v-if="a.is_default == 1"
            class="default-address active"
          >
            {{ $t(`${lang}.mrAddress`) }}
          </div>
          <div
            v-else
            class="default-address"
            @click="changeDefaultAddress(a.id)"
          >
            {{ $t(`${lang}.setDefaultAddress`) }}
          </div>

          <div class="addr-btn" @click="changeAddress(a)">
            {{ $t(`${lang}.change`) }}
          </div>

          <i
            class="iconfont iconlajitong"
            @click="
              isDel = true
              delId = a.id
              delIdx = index
            "
          />
        </div>
      </div>
    </div>

    <message-box
      v-show="isDel"
      :title="$t(`${lang}.tips`)"
      :message="$t(`${lang}.deleteConfirm`)"
      type="two"
      @sure="deleteAddress"
      @cancel="isDel = false"
    />
    <add-address v-if="ifShowPop" @close="closePop" :editData="popData" @addSuccess="addSuccess" @editSuccess="editSuccess" @anewDefault="anewDefault"></add-address>
  </div>
</template>

<script>
import Address from '@/assets/js/address.js'
import { Email, RegMobile, RegTelephone, RegMobiles } from '@/assets/js/require-lee.js'
import termsAndConditionsVue from '../../../pages/policies/terms-and-conditions.vue'
const lang = 'personal.account'
export default {
  name: 'Index',
  mixins: [Address],
  data() {
    return {
      lang,
      address: [],
      isDel: false,
      delId: ``,
      delIdx: -1,
      isEdit: false,
      isNew: true,
      isShow: false,
      using: {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      },
      clone: {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      },
      checkEmail: ``,
      language:'',
      mobileMax: 20,
      ifShowPop: false,
      popData: null
    }
  },
  computed: {
    pnN() {
      if (this.$store.state.language === 'en_US') {
        return this.phoneNum.en
      }else if(this.$store.state.language === 'zh_TW'){
        return this.phoneNum.cn
      }else
        return this.phoneNum.zh
    },
    psn() {
      return this.$store.state.language === 'en_US'
    }
  },
  created() {
    this.getData()
  },
  mounted(){
    this.language = this.$store.state.language
  },
  methods: {
    closePop() {
      this.ifShowPop = false;
      this.popData = null;
    },
    // 获取地址
    getData() {
      this.$axios
        .get('/web/member/address')
        .then(res => {
            this.address = res.data;
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    // 新建地址
    newAddress() {
      this.popData = null;
      this.ifShowPop = true;
    },
    // 修改地址
    changeAddress(obj) {
      this.popData = obj;
      this.ifShowPop = true;
    },
    // 修改默认地址
    changeDefaultAddress(id) {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ id:id,is_default: 1 })),
        false
      )
      this.$axios
        .post('/web/member/address/edit',data)
        .then(res => {      
            this.$message({
              message: this.$t(`${lang}.setSuccess`),
              type: 'success'
            })

            this.getData()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    // 新增地址以后清空新建地址模板
    resetAddress() {
      this.isShow = false
      this.isNew = true
      this.isEdit = false
      this.using = {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      }
      this.clone = {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      }
      this.checkEmail = ``
      this.delId = ``
    },
    // 删除地址
    deleteAddress() {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ id: this.delId })),
        false
      )
      this.$axios
        .post('/web/member/address/del', data)
        .then(res => {
          if(res.code==200){
            this.isDel = false

            if(this.address.length > 1 && this.delIdx == 0){
              this.changeDefaultAddress(this.address[this.address.length-1].id)
            }else{
              this.getData()
            }

            this.resetAddress()
            // console.log("删除",res)
          }else {
            throw new Error (res.message)
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
          this.isDel = false
        })
    },
    addSuccess() {
      this.ifShowPop = false;
      this.getData()
      this.resetAddress()
    },
    editSuccess() {
      this.ifShowPop = false;
      this.getData()
      this.resetAddress()
    },
    anewDefault(noId) {
      var index;
      for(let i=0; i<this.address.length;i++){
        if(this.address[i].id == noId){
          index = i;
        }
      }

      if(this.address.length != 1){
        if(index == (this.address.length-1)){
          this.changeDefaultAddress(this.address[this.address.length-2].id)
        }else{
          this.changeDefaultAddress(this.address[this.address.length-1].id)
        }
      }else{
        this.changeDefaultAddress(this.address[0].id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.address {
  width: 100%;
  padding: 30px 0;
  .pink-title {
    display: flex;
    align-items: center;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 28px;
    }
  }
  .addr-blocks {
    width: 100%;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
    padding: 40px 28px;
    .addr-block {
      position: relative;
      width: 46%;
      height: 250px;
      padding: 25px 20px 0;
      margin: 0 3% 20px 0;
      border: 1px solid rgba(230, 230, 230, 1);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      
      .box-left{
        width: calc(100% - 160px);
      }
      .box-right{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 140px;
        text-align: right;
        position: relative;

        .default-address{
          font-size: 14px;
          color: #f29b87;
          margin-top: 6px;
          cursor: pointer;
          border-bottom: 1px solid #f29b87;
        }

        .default-address.active{
          cursor: initial;
          border-bottom-color: transparent;
        }

        .addr-btn {
          width: 50px;
          height: 22px;
          line-height: 20px;
          border: 1px solid #aa8a7b;
          border-radius: 4px;
          background: rgba(251, 247, 245, 1);
          color: #aa8a7b;
          text-align: center;
          cursor: pointer;
          position: absolute;
          right: 50px;
          bottom: 40px;
        }

        .iconlajitong {
          display: block;
          font-size: 21px;
          color: #999;
          z-index: 39;
          cursor: pointer;
          position: absolute;
          right: 4px;
          bottom: 41px;
        }
      }

      .addr-title {
        display: flex;
        align-items: flex-end;
        margin-bottom: 2px;

        div {
          font-size: 13px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(2) {
          font-size: 14px;
          margin-left: 7px;
        }
      }
      .addr-user {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
        min-height: 22px;
        max-height: 22 * 2px;
        line-height: 22px;
        word-break: break-all;
        overflow: hidden;
      }
      .user-email{
        margin-bottom: 14px;
        font-size: 14px;
        color: #333;
      }
      .addr-address {
        color: #333;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 2px;
      }
      .addr-user-phone {
        display: flex;
        align-items: flex-end;
        font-family: twCenMt;
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
        div:nth-child(1) {
          margin-right: 5px;
        }
      }
      .addr-board {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 10;
      }
      img {
        display: block;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .addr-active {
      border-color: #d4c4bc;
    }
  }
  .addr-middle-btn {
    padding: 0 28px;
    .middle-btn-show {
      cursor: pointer!important;
      display: inline-block;
    }
    .middle-btn-title {
      width: 407px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .middle-btn-title-name {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(242, 155, 135, 1);
        cursor: pointer!important;
      }
      .middle-btn-title-hide {
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
      }
    }
  }
  .new-addr {
    min-height: 400px;
    .new-addr-name {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        width: 190px;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .new-addr-email {
      width: 407px;
      height: 37px;
      border-bottom: 1px solid rgba(153, 153, 153, 1);
      margin-bottom: 10px;
      input {
        width: 100%;
        height: 36px;
        line-height: 36px;
        -webkit-appearance: none;
        outline: 0;
        border: 0;
        padding: 0;
        font-size: 14px;
        color: #999;
      }
    }
    .new-addr-phone {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        position: relative;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #999;
        }
      }
      div:nth-child(1) {
        width: 139px;
        select {
          position: absolute;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      div:nth-child(2) {
        width: 228px;
      }
    }
    .new-addr-address {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        position: relative;
        width: 109px;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #999;
        }
        select {
          position: absolute;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
    .new-addr-btn {
      width: 190px;
      height: 40px;
      line-height: 40px;
      color: #8b766c;
      border: 1px solid #8b766c;
      text-align: center;
      margin: 40px 0 190px;
      cursor: pointer;
    }
    .iconxiala {
      position: absolute;
      font-size: 12px;
      width: 12px;
      height: 12px;
      line-height: 12px;
      display: block;
      color: #999;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.en .addr-title>div{
  font-size: 16px !important;
}

.en .addr-user>div{
  font-size: 16px !important;
}

.en .addr-btn{
  font-size: 13px !important;
}

.add-btn{
  height: 30px;
  line-height: 30px;
  margin-right: 5%;
  background-color: #fbf7f5;
  text-align: center;
  color: #aa8a7b;
  border: 1px solid #aa8a7b;
  border-radius: 4px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
