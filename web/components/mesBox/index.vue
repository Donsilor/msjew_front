<template>
  <!-- <div v-show="boxShow" class="messageBox"> -->
  <div v-show="1" class="messageBox">
    <div class="msgBg">
      <div class="icon"></div>
    </div>

    <!-- 未登录状态 -->
    <div class="msgNc" v-if="0">
      <div class="msgNcTop">
        <div class="msgNcTopL"></div>
        <div class="msgNcTopR"></div>
        <div class="msgTitle">Welcome to LiveChat</div>
      </div>

      <div class="msgNcContent">
        <div class="megNcConM">
          <div class="icon"></div>
          <div class="text">Welcome to our LiveChat! Please fill in the form below before starting the chat.</div>

          <div class="list">
            <label for="name" class="label">
              <span>Name:</span>
            </label>
            <div class="inputBox">
              <input type="text">
            </div>
            <div class="hint"></div>
          </div>

          <div class="list">
            <label for="name" class="label">
              <span>E-mail:</span>
            </label>
            <div class="inputBox">
              <input type="text">
            </div>
            <div class="hint"></div>
          </div>

          <div class="send">Start the chat</div>
        </div>
      </div>

      <div class="megBottom">
        <div class="megBottomText">
          Powered by <span class="colorA">Live</span><span class="colorB">Chat</span>
        </div>
      </div>
    </div>

    <!-- 已登录状态 -->
    <div class="msgNc" v-else>
      <div class="msgNcTop">
        <div class="msgNcTopL"></div>
        <div class="msgNcTopR"></div>
        <div class="msgTitle">Welcome to LiveChat</div>
      </div>

      <div class="giveLike">
        <div class="topLine">
          <div class="giveLikeL">
            <div class="companyName">BDD Co珠寶專家</div>
            <div class="nameEn">jewelry consultant</div>
          </div>
          <div class="giveLikeR">
            <div class="icon iconA"></div>
            <div class="icon iconB"></div>
          </div>
        </div>
      </div>

      <div class="msgNcContent">
        <div class="megNcConM">
          <div class="icon"></div>

          <div class="userList">
            <div class="userListU">Name:</div>
            <div class="userListD">asga</div>
          </div>
          <div class="userList">
            <div class="userListU">E-mail:</div>
            <div class="userListD">fsf@qq.com</div>
          </div>
        </div>

      <div class="mesBox">
        <div class="official">
          <span class="officialName">BDD Co珠寶專家</span>
          <span class="time">17:00</span>
        </div>
        <div class="officialMess"></div>
      </div>
      </div>

      <div class="megBottom">
        <div class="megBottomText">
          Powered by <span class="colorA">Live</span><span class="colorB">Chat</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const lang = 'components.messageBox'
export default {
  name: 'MessageBox',
  props: {
    title: {
      type: [String],
      default() {
        return ''
      }
    },
    message: {
      type: [String],
      default() {
        return ''
      }
    },
    type: {
      type: [String],
      default() {
        return 'one'
      }
    },
    sureMsg: {
      type: [String],
      default() {
        return this.$t(`${lang}.sure`)
      }
    },
    cancelMsg: {
      type: [String],
      default() {
        return this.$t(`${lang}.cancel`)
      }
    },
    doneMsg: {
      type: [String],
      default() {
        return this.$t(`${lang}.sure`)
      }
    }
  },
  data() {
    return {
      boxShow: false
    }
  },
  methods: {
    boxShowUp() {
      this.boxShow = true
    },
    cancel() {
      this.$emit('cancel', {})
    },
    sure() {
      this.$emit('sure', {})
    },
    done() {
      this.$emit('done', {})
    }
  }
}
</script>

<style scoped lang="less">
.messageBox {
  width: 84px;
  height: 84px;
  position: fixed;
  z-index: 99999;
  bottom: 120px;
  right: 10px;
}
.msgBg{
  width: 60px;
  height: 60px;
  background-color: #F4F4F6;
  border-radius: 50%;
  margin: 10px auto;
  box-shadow: 0 3px 5px 2px #cecece;
  padding-top: 15px;
  box-sizing: border-box;
}
.msgBg .icon{
  width: 34px;
  height: 34px;
  background: url(../../static/message-box/message.png) no-repeat center;
  background-size: 100% 100%;
  margin: 0 auto;
}
.msgNc{
  width: 320px;
  height: 490px;
  background: #fff;
  position: absolute;
  bottom: 0;
  right: 12px;
  border-radius: 10px;
  box-shadow: 0 3px 3px 1px #CFCFCF, 0 5px 3px 1px #FBFBFB;
}
.msgNcTop{
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
}
.msgNcTopL{
  width: 32px;
  height: 32px;
  position: absolute;
  left: 15px;
  top: 9px;
  background: url(../../static/message-box/more.png) no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
.msgNcTopR{
  width: 32px;
  height: 32px;
  position: absolute;
  right: 15px;
  top: 9px;
  background: url(../../static/message-box/quit.png) no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
.msgTitle{
  width: 200px;
  height: 50px;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
}
.msgNcContent{
  width: 100%;
  height: 410px;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
  overflow: scroll;
  padding-top: 50px;
}
.megNcConM{
  width: 280px;
  margin: 0 auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  padding: 30px 15px 15px;
  box-sizing: border-box;
}
.megNcConM .icon{
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #F29B87 url(../../static/message-box/personal.png) no-repeat center 40%;
  background-size: 60% 60%;
}
.megBottom{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: #F5F5F5;
  border-radius: 0 0 12px 12px;
  line-height: 30px;
  text-align: center;
  font-size: 13px;
  color: #999;
}
.megBottomText{
  display: inline-block;
  cursor: pointer;
}
.megBottom .colorA{
  font-weight: bold;
}
.megBottom .colorB{
  font-weight: bold;
  color: #F29B87;
}
.megNcConM .text{
  width: 100%;
  font-size: 14px;
  color: #333;
  line-height: 20px;

}
.list{
  margin-top: 10px;
}
.list .label{
  font-size: 14px;
  color: #666;
}
 .list .inputBox{
   width: 100%;
   height: 34px;
   margin-top: 6px;
 }
 .list .inputBox input{
   width: 100%;
   height: 100%;
   border: 1px solid #ccc;
   border-radius: 4px;
   padding: 0 10px;
   box-sizing: border-box;
 }
 .send{
   width: 100%;
   height: 44px;
   background-color: #F29B87;
   margin-top: 10px;
   line-height: 44px;
   text-align: center;
   color: #fff;
   font-size: 14px;
   border-radius: 4px;
   cursor: pointer;
 }

.giveLike{
  height: 70px;
  box-shadow: 0 3px 2px #f2f2f2;
}
.topLine{
  width: 280px;
  height: 100%;
  border-top: 1px solid #e2e2e2;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.giveLikeL{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
 .companyName{
   font-weight: bold;
   font-size: 14px;
   color: #222;
 }
 .nameEn{
   font-size: 14px;
   color: #666;
   margin-top: 4px;
 }
 .giveLikeR {
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .giveLikeR .icon{
   width: 40px;
   height: 40px;
   margin-left: 10px;
   background-color: #f2f2f2;
   border-radius: 4px;
 }

 .userList{
   margin-bottom: 10px;
 }
 .userListU{
    font-size: 14px;
    color: #aaa;
 }
 .userListD{
   font-size: 14px;
   margin-top: 6px;
 }

 .mesBox{
   width: 296px;
   margin: 30px auto 0;
 }

</style>
