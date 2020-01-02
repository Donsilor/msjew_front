<template>
  <div>
    <div class="bannerdiv">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_01.png"
        class="banner"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_01.png"
        class="banner"
      />
    </div>
    <div class="offdiv">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_OFF.png"
        class="offMessage"
      />
      <img
        v-else
        src="../../static/activity/noun/en_OFF.png"
        class="offMessage"
      />
    </div>
    <a class="img3" href="https://www.bddco.com/custom-made/diamond-made/diamond-list"><img class="img3" src="../../static/activity/noun/christams_03.png" /></a>
    <a class="img2a" href="https://www.bddco.com/engagement/engagement-rings?goodId=611"><img class="img4" src="../../static/activity/noun/christams_04.png" /></a>
    <a class="img2a" href="https://www.bddco.com/engagement/engagement-rings?goodId=610"><img class="img5" src="../../static/activity/noun/christams_05.png" /></a>
    <a class="img2a" href="https://www.bddco.com/engagement/engagement-rings?goodId=599"><img class="img6" src="../../static/activity/noun/christams_06.png" /></a>
    <a class="img2a" href="https://www.bddco.com/engagement/engagement-rings?goodId=600"><img class="img7" src="../../static/activity/noun/christams_07.png" /></a>
    <div>
      <a class="img8" href="https://www.bddco.com/custom-made/diamond-made/diamond-list"><img class="img8" src="../../static/activity/noun/christams_08.png" /></a>
    </div>
    <img class="img9" src="../../static/activity/noun/christams_09.png" />
    <div class="offdiv">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_img10.png"
        class="offMessage"
      />
      <img
        v-else
        src="../../static/activity/noun/en_img10.png"
        class="offMessage"
      />
    </div>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12133">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_12.png"
        class="img12"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_12.png"
        class="img12"
      />
    </a>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12134">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_13.png"
        class="img13"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_13.png"
        class="img13"
      />
    </a>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12135">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_14.png"
        class="img14"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_14.png"
        class="img14"
      />
    </a>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12136">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_15.png"
        class="img15"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_15.png"
        class="img15"
      />
    </a>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12137">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_16.png"
        class="img16"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_16.png"
        class="img16"
      />
    </a>
    <a href="https://www.bddco.com/accessories/accessories?goodId=12138">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_christams_18.png"
        class="img18"
      />
      <img
        v-else
        src="../../static/activity/noun/en_christams_18.png"
        class="img18"
      />
    </a>
    <div class="more">
      <a class="img25"  href="https://www.bddco.com/accessories/list">
        <img class="img25" src="../../static/activity/noun/christams_25.png" />
      </a>
    </div>
    <img class="img17" src="../../static/activity/noun/christams_17.png" />
    <div class="offdiv">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_img11.png"
        class="offMessage"
      />
      <img
        v-else
        src="../../static/activity/noun/en_img11.png"
        class="offMessage"
      />
    </div>
    <a href="https://www.bddco.com/marriage-ring"><img class="img11" src="../../static/activity/noun/christams_11.png" /></a>
    <a href="https://www.bddco.com/seleceRightRing/1">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_ring_1.png"
        class="ring"
      />
      <img
        v-else
        src="../../static/activity/noun/en_ring_1.png"
        class="ring"
      />
    </a>
    <a href="https://www.bddco.com/marriage-ring/pair-ring-detail?ringId=2">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_ring_2.png"
        class="ring"
      />
      <img
        v-else
        src="../../static/activity/noun/en_ring_2.png"
        class="ring"
      />
    </a>
    <a href="https://www.bddco.com/marriage-ring/pair-ring-detail?ringId=4">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_ring_3.png"
        class="ring"
      />
      <img
        v-else
        src="../../static/activity/noun/en_ring_3.png"
        class="ring"
      />
    </a>
   <a href="https://www.bddco.com/marriage-ring/pair-ring-detail?ringId=3">
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/noun/zh_ring_4.png"
        class="ring"
      />
      <img
        v-else
        src="../../static/activity/noun/en_ring_4.png"
        class="ring"
      />
    </a>
    <div>
      <a href="https://www.bddco.com/marriage-ring"><img class="img_1" src="../../static/activity/noun/christams_16.png" /></a>
    </div>
    <div style="clear: both;"></div>
    <div>
      <a href="https://www.bddco.com/engagement">
        <img
          v-if="$store.state.language === `zh_TW`"
          src="../../static/activity/noun/zh_bt_1.png"
          class="zh_bt"
        />
        <img
          v-else
          src="../../static/activity/noun/en_bt_1.png"
          class="zh_bt"
        />
      </a>
      <a href="https://www.bddco.com/marriage-ring">
        <img
          v-if="$store.state.language === `zh_TW`"
          src="../../static/activity/noun/zh_bt_2.png"
          class="zh_bt"
        />
        <img
          v-else
          src="../../static/activity/noun/en_bt_2.png"
          class="zh_bt"
        />
      </a>
      <a href="https://www.bddco.com/marriage-ring/single-ring?type=gentlemen">
        <img
          v-if="$store.state.language === `zh_TW`"
          src="../../static/activity/noun/zh_bt_3.png"
          class="zh_bt"
        />
        <img
          v-else
          src="../../static/activity/noun/en_bt_3.png"
          class="zh_bt"
        />
      </a>
      <a href="https://www.bddco.com/accessories/list">
        <img
          v-if="$store.state.language === `zh_TW`"
          src="../../static/activity/noun/zh_bt_4.png"
          class="zh_bt"
        />
        <img
          v-else
          src="../../static/activity/noun/en_bt_4.png"
          class="zh_bt"
        />
      </a>
    </div>
  </div>
</template>
 <style lang="less" scoped>

  .img2a{
    width:44%;
    height:170px;
    margin:0 4% 10px 2%;
    float:left;
  }
  .img2a:nth-of-type(even){
    margin:0 2% 10px 4%;
  }
  .bannerdiv,.offdiv{
    width:375px;
    text-align:center;
  }
  .banner,.offMessage{
    width:375px;
    margin-top:-4px;
  }
  .img3{
    margin:10px auto;
    width:94%;
  }
  .img4{
    width:100%;
    float:left;
  }
  .img5{
    width:100%;
    float:left;
  }
  .img6{
    width:100%;
    float:left;
  }
  .img7{
    width:100%;
    float:left;
  }
  .img8{
    width:130px;
    height:84px;
    margin:0 auto;
  }
  .img9{
    width:100%;
  }
  .img10{
    height:52px;
    margin-top:-2px;
    background-image:url(../../static/activity/noun/christams_10.png);
  }
  .img11{
    width:375px;
  }
  .img12{
    width:46%;
    margin:10px 0px 10px 10px;
    float:left;
  }
  .img13{
    width:46%;
    margin:10px 0px 10px 10px;
    float:left;
  }
  .img14{
    width:46%;
    margin:0px 0px 0px 10px;
    float:left;
  }
  .ring,.img15{
    width:46%;
    margin:0px 0px 0px 10px;
    float:left;
  }
  .img16{
    width:46%;
    margin:10px 0px 10px 10px;
    float:left;
  }
  .img17{
	  width:375px;
  }
  .img18{
    width:46%;
    margin:10px 0px 10px 10px;
    float:left;
  }
  .more{
    width:375px;
    margin:0 auto;
    text-align:center;
  }
  .img25{
    width:100px;
  }
  .zh_bt{
    width:20%;
    margin:0px 2% 30px 2%;
  }
  .ring{
	  margin-top: 10px;
  }
  .img_1{
    width:46%;
    margin: 0 auto;
  }
  </style>
