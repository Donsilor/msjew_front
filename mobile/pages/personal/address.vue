<template>
  <div class="address">
    <Header :title="lang.header" />
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
            <p class="p1 ow-h1">
              <span v-if="language == 'zh_CN'">{{ item.lastname }}{{ item.firstname }}</span>
              <span v-else>{{ item.firstname }} {{ item.lastname }}</span>
            </p>
            <p class="p2">{{ item.mobile_code }} {{ item.mobile }}</p>
            <p class="p3">{{ item.email }}</p>
            <p class="p4 ellipsis-address ow-h2">
              {{ item.country_name}}-{{ item.province_name }}-{{
                item.city_name
              }}-{{ item.address_details }}
            </p>
            <span v-if="item.is_default == 1" class="btn btn-active">{{
              lang.default
            }}</span>
            <span
              v-else
              class="btn btn-no"
              @click.stop="changeDefaultAddress(item.id)"
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
      <bdd-empty v-if="address.length == 0 && ifLoadFinish" :type="'address'"></bdd-empty>
    </div>
    <div class="btn-fixed">
      <div class="btn-common btn-pink" @click="editAddress(null)">
        <i class="icon iconfont iconicon-test"></i>
        {{ lang.add }}
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'Address',
  layout: 'no-bar',
  components: {
    Header
    // Touch
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.address,
      moveIndex: -1,
      move: false,
      name: '',
      isLogin: !!this.$store.state.token,
      language: this.$store.state.language,
      address: [],
      ifLoadFinish: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    touch() {
      this.move = false
      this.moveIndex = -1
    },
    getData() {
      const _this = this
      this.$nuxt.$loading.start()
      _this
        .$axios({
          method: 'get',
          url: `/web/member/address`
        })
        .then(res => {
          this.$nuxt.$loading.finish()
          this.ifLoadFinish = true;
          // console.log("address",res)
          _this.address = []
          if (res && res.length > 0) {
            res.map((item, index) => {
              if (item.is_default === 0) {
                _this.address.unshift(item)
              } else {
                _this.address.push(item)
              }
            })
          }
          // console.log("ad", _this.address)

          if (res && res[0].is_default != 1) {
            _this.address[0].is_default = 1;

            _this
              .$axios({
                method: 'post',
                url: `/web/member/address/edit`,
                data: {
                  id:res[0].id,
                  is_default:1
                }
              })
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err)
              })

          }
        })
        .catch(err => {
          console.log(err)
        })
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
    // 設為默認
    changeDefaultAddress(id) {
      // console.log("id",id)
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
          // console.log("address",_this.address)
          // let addressarr = []
          // let i = 0;
          // for(i;i < _this.address.length;i++){
          //   addressarr.push(_this.address[i+index])
          //   if(i+index >= _this.address.length-1){
          //     index = 0-(i+1);
          //   }
          // }
          // console.log(addressarr)
          // return addressarr;
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
    },
    selectAddress(val) {
      if (this.$route.query.id === '1') {
        this.$router.push({
          name: 'cart-sureOrder',
          query: {
            id: val.id
          }
        })
      }
    },
    editAddress(val) {
      if (val) {
        this.$router.push({
          name: 'personal-editAddress',
          query: val
        })
      } else {
        this.$router.push({
          name: 'personal-editAddress',
          query: {
            type: 'add'
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.address {
  min-height: 100%;
  background: #f5f5f5;
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

.btn-pink {
  background-color: #f29b87;
  color: #fff;
}
</style>
