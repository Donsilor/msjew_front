<template>
  <div class="address">
    <div class="box">
      <!-- <Header :title="lang.header" /> -->
      <div class="detail">{{ lang.header }}
        <i class="quit icon iconfont iconfanhuiicon-" @click="quit()">{{lang_header.back}}</i>
      </div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in address"
            :key="index"
            v-swipeleft="{ fn: moveLeft, name: index }"
            v-swiperight="moveRight"
            v-tap="touch"
            :class="moveIndex === index && move ? 'moveActive' : 'moveNo'"
          >
            <div class="left" @click="selectAddress(item)">
            <!-- <div class="left"> -->
              <p class="p1 ow-h1">{{ item.firstname }} {{ item.lastname }}</p>
              <p class="p2">{{ item.mobile_code }} {{ item.mobile }}</p>
              <p class="p3">{{ item.email }}</p>
              <p class="p4 ellipsis-address ow-h2">
                {{ item.country_name}}-{{ item.province_name }}-{{
                  item.city_name
                }}-{{ item.address_details }}
              </p>
              <span v-if="item.is_default == 1 || is_default == 1" class="btn btn-active">{{
                lang.default
              }}</span>
              <span
                v-else
                class="btn btn-no"
                @click.stop="setDefaultAddress(item.id)"
                >{{ lang.setDefault }}</span
              >
              <i
                class="icon iconfont iconyou "
                @click.stop="editAddress(item)"
              ></i>
            </div>
            <div class="right" @click="deleteAddress(item.id)">
              {{ lang.remove }}
            </div>
          </li>
        </ul>
        <bdd-empty v-if="address.length == 0" :type="'address'"></bdd-empty>
      </div>
      <div v-if="isLogin" class="btn-fixed">
        <div class="btn-common btn-white" @click="editAddress(null)">
          <i class="icon iconfont iconicon-test"></i>
          {{ lang.add }}
        </div>
      </div>
      <div v-else v-show="address.length !== 1 " class="btn-fixed">
        <div class="btn-common btn-white" @click="editAddress(null)">
          <i class="icon iconfont iconicon-test"></i>
          {{ lang.add }}
        </div>
      </div>
      <AditAddress v-if="ifShowAditAddress" @closeADP="closeAditAddressPop" :editVal="editVal"  :addVal="addVal"></AditAddress>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import AditAddress from '@/components/address/editAddress.vue'
const storage = process.client ? require('good-storage').default : {}
export default {
  name: 'Address',
  layout: 'no-bar',
  components: {
    Header,
    AditAddress
    // Touch
  },
  props: ['id','queryId'],
  data() {
    return {
      lang: this.LANGUAGE.personal.address,
      lang_header: this.LANGUAGE.components.personal,
      moveIndex: -1,
      move: false,
      name: '',
      isLogin: !!this.$store.state.token,
      address: [],
      ifShowAditAddress:false,
      editVal:'',
      addVal:'',
      myAddr:{},
      is_default:''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    touch() {
      this.move = false
      this.moveIndex = -1
    },
    getData() {
      const _this = this
      if(this.isLogin){
        _this
          .$axios({
            method: 'get',
            url: `/web/member/address`
          })
          .then(res => {
            _this.address = res
  
            if(res[0].is_default !=1){
              this.setDefaultAddress(res[res.length-1].id)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.is_default = 1
        let myAddress = []
        this.myAddr = (storage.get('myAdders'))
        if(this.myAddr){
          myAddress.push(this.myAddr)
          this.address = myAddress
        }
      }
    },
    moveLeft(val) {
      // console.log("move",this.move)
      if (this.move) {
        this.move = false
        this.moveIndex = -1
      } else {
        this.move = true
        this.moveIndex = val.name
      }
      // console.log('moveLeft', val.name)
    },
    moveRight(val) {
      this.move = false
      this.moveIndex = -1
    },
    // 設值默認地址
    setDefaultAddress(id) {
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: `/web/member/address/edit`,
          data: {
            id:id,
            is_default:1
          }
        })
        .then(res => {
          this.$toast.show(this.lang.setSuccess)
          this.getData()
          
          // this.$router.go(-1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 刪除地址
    deleteAddress(id) {
      const _this = this
      if(this.isLogin){
        _this
          .$axios({
            method: 'post',
            url: `/web/member/address/del`,
            data: {
              id: id
            }
          })
          .then(res => {
            this.getData()
            this.$toast.show(this.lang.toast)
          })
          .catch(err => {
            this.$toast.show(err.message)
          })
      } else {
        storage && storage.remove('myAdders')
        this.address = []
        this.getData()
      }
    },
    selectAddress(val) {
      // if (this.id == '1') {
        this.$emit('closeAP',val.id); 
      // }
    },
    editAddress(val) {
      if (val) {
        this.ifShowAditAddress = true
        this.editVal = val
      } else if (val === null){
        if(this.isLogin){
          this.ifShowAditAddress = true
          this.addVal = 'add'
        } else {
          this.ifShowAditAddress = true
          this.addVal = 'TouristAdd'
        }
      }
    },
    closeAditAddressPop(){
      this.ifShowAditAddress = false
      this.getData()
    },
    // 返回
    quit(){
      this.$emit('closeAP',this.queryId); 
      this.getData() 
      // this.getAddr()
    },
  }
}
</script>

<style scoped lang="less">
.address {
  min-height: 100%;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
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
    font-size: 16px;
    position: relative;
    color: #333;
    // color:#eee;
  }
  .iconicon-test {
    font-size: 12px;
    line-height: 40px;
    margin-right: 4px;
    vertical-align: 1px;
  }
  .btn-fixed {
    position: fixed;
    bottom: 0px;
    left: 0;
    height: 60px;
    width: 100%;
    background: #ffffff;
    padding-top: 10px;
  }
  .content {
    border-bottom: 60px solid #f5f5f5;
    ul {
      width: 100%;
      background: #ffffff;
      border-top: 8px solid #f5f5f5;
      overflow: hidden;
      .moveActive {
        margin-left: -24.6%;
        transition: 0.3s ease-out;
      }
      .moveNo {
        margin-left: 0px;
        transition: 0.3s ease-out;
      }
      li {
        width: 124%;
        height: 144px;
        text-align: left;
        border-bottom: 1px solid #f5f5f5;
        .left {
          position: relative;
          float: left;
          width: 81%;
          height: 144px;
          padding: 14px 15px 0;
          .p1 {
            font-size: 16px;
            width: 70%;
            line-height: 26px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .p2 {
            font-size: 16px;
            line-height: 26px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .p3 {
            font-size: 14px;
            line-height: 24px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
          .p4 {
            display: inline-block;
            width: 72%;
            max-height: 36px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 18px;
          }
          .btn {
            position: absolute;
            top: 18px;
            right: 15px;
            width: 24%;
            height: 30px;
            border-radius: 3px;
            font-size: 12px;
            line-height: 30px;
            font-weight: 400;
            text-align: center;
          }
          .btn-active {
            background: #f29b87;
            width: 26%;
            color: #ffffff;
          }
          .btn-no {
            border: 1px solid #f29b87;
            color: #f29b87;
          }
          .iconyou {
            float: right;
            font-size: 18px;
            color: #bbbbbb;
          }
        }
        .right {
          float: right;
          width: 19%;
          height: 144px;
          line-height: 144px;
          background: #f34b4b;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
