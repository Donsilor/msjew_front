<template>
<div>
  <!-- 中文简体 -->
  <div v-if="language === 'zh_CN'" class="order">
    <!--    步骤模块-->
    <div class="order-step" id="step">
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.ConfirmOrder`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.finishOrder`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>2</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ $t(`${lang}.orderPay`) }}</div>
        <div class="step-desc" />
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>3</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
        <div class="step-desc" />
      </div>
      <div class="step-line" />
    </div>

    <!--    用户名称和提示登陆-->
    <div class="user-info">
      <i class="iconfont iconrentou" />
      <div>
        {{ $t(`${lang}.darling`) }}{{ $store.state.userInfo.name
        }}{{ $store.state.userInfo.firstname }}
      </div>
      <div
        v-show="!addressMore && address.length !== 0"
        @click="addressMore = true"
      >
        {{ $t(`${lang}.seeMore`) }}
      </div>
      <div
        v-show="addressMore && address.length !== 0"
        @click="addressMore = false"
      >
        {{ $t(`${lang}.seeLess`) }}
      </div>
    </div>

    <!--    地址列表模块-->
    <div
      v-show="address.length !== 0"
      :style="{
        height: addressMore
          ? `${270 * Math.ceil(address.length / 2)}px`
          : '250px'
      }"
      class="address-box"
    >
      <div class="addr-blocks">
        <div
          v-for="(a, index) in address"
          :key="index"
          :class="{ 'addr-active': addressIdx == index }"
          class="addr-block"
        >
          <div class="addr-title">
            <div>{{ a.country_name }}{{ a.province_name }}-{{ a.city_name }}</div>
            <!--              <div>CHN</div>-->
          </div>
          <div class="addr-user">
            <div>{{ a.lastname }}{{ a.firstname }}</div>
            <div>（{{ $t(`${lang}.get`) }}）</div>
          </div>
          <div class="addr-address">
           {{ a.country_name }}-{{ a.province_name }}{{ a.city_name
          }}{{ a.address_details }}
          </div>
          <div class="addr-user-phone">
            <div>{{ a.mobile_code }}</div>
            <div>{{ a.mobile }}</div>
          </div>
          <div class="font-size-14 color-333">{{ a.zip_code }}</div>
          <div class="font-size-14 color-333">{{ a.email }}</div>
          <div class="addr-board" @click="changeAddress(index)" />
          <span class="ifChoose" :class="{'on': addressIdx == index}"></span>
          <i
            class="iconfont iconlajitong"
            @click="
              deleteAddressId = a.id
              delIdx = index
              confirmBox = true
            "
          />
          <div
            v-if="a.is_default == 1"
            class="font-size-14 mrAdd"
            style="color: #f29b87; margin-top: 6px;"
          >
            {{ $t(`${langs}.mrAddress`) }}
          </div>
          <div
            v-if="a.is_default != 1 && addressIdx == index"
            class="font-size-14 mrAdd"
            style="color: #f29b87; margin-top: 6px;"
            @click="setDefaultAddr(a)"
          >
            {{ $t(`${lang}.setDefaultAddr`) }}
          </div>
          <div
            class="addr-btn"
            @click="
              newAddress = true
              changeAddressInfo(a)
            "
          >
            {{ $t(`${lang}.change`) }}
          </div>
          <img
            v-show="a.is_default == 1"
            src="../../../static/personal/account/address-bar.png"
          />
        </div>
      </div>
    </div>

    <!--    新增&修改地址模块-->
    <div
      :style="[
        { height: newAddress ? '360px' : '0px' },
        { padding: newAddress ? '20px 51px 0 36px' : '0' }
      ]"
      class="new-address"
      id="addbox"
    >
      <div class="new-address-title">
        <div class="na-line" />
        <div class="na-title">{{ $t(`${lang}.address`) }}</div>
        <div class="na-little-word">{{ $t(`${lang}.mustInput`) }}</div>
      </div>
      <div class="new-address-input">
        <!--        左边输入框-->
        <div class="left-side">
          <!--          姓名-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.firstName`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 1 },
                { 'border-wrong': wrongInput.lastname }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.lastname"
                :class="{ 'wrong-input': wrongInput.lastname }"
                type="text"
                autocomplete="off"
                @focus="
                  borderChange = 1
                  wrongInput.lastname = false
                "
                @blur="borderChange = 0"
                maxlength="30"
              />
              <div v-show="wrongInput.lastname" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          姓名-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.lastName`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 2 },
                { 'border-wrong': wrongInput.firstName }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.firstname"
                :class="{ 'wrong-input': wrongInput.firstname }"
                type="text"
                autocomplete="off"
                @focus="
                  borderChange = 2
                  wrongInput.firstname = false
                "
                @blur="borderChange = 0"
                maxlength="30"
              />
              <div v-show="wrongInput.firstname" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          电话-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.telephone`) }}</div>
            <div class="tel-special">
              <div class="tel-area">
                <input :value="pnN + ' ' + phoneNum.phone_code" type="text" autocomplete="off" />
                <select v-model="phoneNum">
                  <option
                    v-for="(p, index) in phoneJson"
                    :key="index"
                    :value="p"
                    >{{ psn ? p.en :psn ? p.cn :p.zh }}</option
                  >
                </select>
                <i class="iconfont iconxiala" />
              </div>
              <div
                :class="[
                  { 'border-change': borderChange === 3 },
                  { 'border-wrong': wrongInput.mobile }
                ]"
                class="input-box tel"
              >
                <input
                  v-model="addressData.mobile"
                  :class="{ 'wrong-input': wrongInput.mobile }"
                  type="text"
                  autocomplete="off"
                  @focus="
                    borderChange = 3
                    wrongInput.mobile = false
                  "
                  @blur="borderChange = 0"
                  :maxlength="mobileMax"
                  @input="mobileIpt"
                />
                <div v-show="wrongInput.mobile" class="wrong-alert">
                  {{ $t(`${lang}.wrongInput`) }}
                </div>
              </div>
            </div>
          </div>

          <!--          邮箱-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.email`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 4 },
                { 'border-wrong': wrongInput.email }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.email"

                type="text"
                autocomplete="off"
                @focus="
                  borderChange = 4

                "
                @blur="borderChange = 0"
                maxlength="60"
              />
              <!-- <div v-show="wrongInput.email" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div> -->
            </div>
          </div>

          <!--          确认邮箱-->
          <!-- <div class="input-line">
            <div class="label">*{{ $t(`${lang}.checkEmail`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 5 },
                { 'border-wrong': wrongInput.checkEmail }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.checkEmail"
                :class="{ 'wrong-input': wrongInput.checkEmail }"
                type="text"
                @focus="
                  borderChange = 5
                  wrongInput.checkEmail = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.checkEmail" class="wrong-alert">
                {{ $t(`${lang}.wrongInputAgain`) }}
              </div>
            </div>
          </div> -->
        </div>

        <!--        右边输入框-->
        <div class="right-side">
          <!--          国家-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.country`) }}</div>
            <div class="input-box">
              <input :value="country.areaName" type="address" autocomplete="off" />
              <select v-model="country" @change="getListTwo()">
                <option
                  v-for="(c, index) in countryList"
                  :key="index"
                  :value="c"
                  >{{ c.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          省份-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.province`) }}</div>
            <div class="input-box">
              <input :value="province.areaName" type="address" autocomplete="off" />
              <select v-model="province" @change="getListThree()">
                <option
                  v-for="(p, index) in provinceList"
                  :key="index"
                  :value="p"
                  >{{ p.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          城市-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.city`) }}</div>
            <div class="input-box">
              <input :value="city.areaName" type="address" autocomplete="off" />
              <select v-model="city">
                <option
                  v-for="(c, index) in cityList"
                  :key="index"
                  :value="c"
                  >{{ c.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          详细地址-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.longAddress`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 6 },
                { 'border-wrong': wrongInput.address_details }
              ]"
              class="input-box"
            >
              <textarea
                v-model="addressData.address_details"
                :class="{ 'wrong-input': wrongInput.address_details }"
                autocomplete="off"
                @focus="
                  borderChange = 6
                  wrongInput.address_details = false
                "
                @blur="borderChange = 0"
                maxlength="300"
              />
              <div v-show="wrongInput.address_details" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          邮编-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.zipCode`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 7 },
                { 'border-wrong': wrongInput.zip_code }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.zip_code"
                :class="{ 'wrong-input': wrongInput.zip_code }"
                type="text"
                autocomplete="off"
                maxlength="11"
                @focus="
                  borderChange = 7
                  wrongInput.zip_code = false
                "
                @blur="borderChange = 0"
                @input="keydown"
              />
              <div v-show="wrongInput.zip_code" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="new-address-btn"
        @click="isEdit ? saveAddress1() : createAddress()"
      >
        {{ $t(`${lang}.sure`)
        }}<span v-show="!isEdit">{{ $t(`${lang}.add`) }}</span
        ><span v-show="isEdit">{{ $t(`${lang}.edit`) }}</span>
      </div>
      <div
        v-show="noWay"
        class="close-new-address-btn"
        @click="
          newAddress = false
          resetAddressInp()
        "
      >
        {{ $t(`${lang}.seeLess`) }}
      </div>
    </div>

    <!--    新增地址按钮-->
    <div
      v-show="!newAddress"
      class="is-new-address"
      @click="
        newAddress = true
        isEdit = false
      "
    >
      + {{ $t(`${lang}.addAddress`) }}
    </div>

    <!--    购物车模块-->
    <div class="cart-top-bar">
      <span>{{ $t(`${lang}.info`) }}</span
      ><span>{{ $t(`${lang}.number`) }}</span
      ><span>{{ $t(`${lang}.oldPrice`) }}</span
      ><span>{{ $t(`${lang}.newPrice`) }}</span>
    </div>
    <div class="cart-goods">
      <div v-for="(g, index) in good" :key="index">
        <div v-if="g.groupType === null && g.data[0].goodsType !== 19" class="finished">
          <div class="cart-radio"></div>
          <single :g="g" :options="false"></single>
        </div>
        <div v-if="g.data[0].goodsType == '19'" class="couple">
          <div class="cart-radio"></div>
          <double :g="g" :options="false"></double>
        </div>
        <div v-if="g.groupType === 2" class="customization">
          <div class="cart-radio"></div>
          <madeUp
            :g="g"
            :options="false"
            :word="$t(`cart.customMade`)"
          ></madeUp>
        </div>
      </div>
    </div>

    <!--    订单信息模块-->
    <div class="order-info">
      <div class="clf">
        <div class="left-info">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.deliveryInformation`) }}</div>
          </div>
          <!-- <div v-if="good.length > 1" class="is-pack">
            <div
              v-show="!isAllPack"
              class="free-check"
              @click="isAllPack = !isAllPack"
            />
            <i
              v-show="isAllPack"
              class="iconfont icongou"
              @click="isAllPack = !isAllPack"
            />
            <div>
              <span>{{ $t(`${lang}.sendTogether`) }}</span
              ><span>（{{ $t(`${lang}.chatBor`) }}）</span>
            </div>
          </div> -->
          <div class="send-time">
            <div class="send-left">
              <div>{{ $t(`${lang}.sendTime`) }}</div>
              <div>
                <router-link to="/policies/shipping">{{
                  $t(`${lang}.checkDeliveryPolicy`)
                }}</router-link>
              </div>
            </div>
            <div class="send-right">
              {{ tex.planDays }}{{ $t(`${lang}.goSingKei`) }}
            </div>
          </div>
          <!-- <div class="after-sale-email">
            <div>{{ $t(`${lang}.showHouEmail`) }}</div>
            <div>
              <div
                v-show="!isSameEmail"
                class="free-check"
                @click="isSameEmail = !isSameEmail"
              />
              <i
                v-show="isSameEmail"
                class="iconfont icongou"
                @click="isSameEmail = !isSameEmail"
              />
              <span>{{ $t(`${lang}.sameTongAddress`) }}</span>
            </div>
          </div> -->
          <!-- <div
            :class="[
              { 'border-change': borderChange === 8 },
              { 'border-wrong': wrongInput.odMail }
            ]"
            class="after-sale-email-input"
          >
            <input
              v-show="!isSameEmail"
              v-model="orderEmail"
              :class="{ 'wrong-input': wrongInput.odMail }"
              type="text"
              @focus="
                borderChange = 8
                wrongInput.odMail = false
              "
              @blur="borderChange = 0"
            />
            <input
              v-show="isSameEmail"
              v-model="orderAddress.userMail"
              :class="{ 'wrong-input': wrongInput.odMail }"
              type="text"
              @focus="
                borderChange = 8
                wrongInput.odMail = false
              "
              @blur="borderChange = 0"
            />
          </div> -->
          <div class="message">
            <div class="message-title">{{ $t(`${lang}.remark`) }}</div>
            <textarea
              maxlength="500"
              v-model="remark"
              :class="[
                { 'border-change': borderChange === 9 },
                { 'wrong-input': wrongInput.remark },
                { 'border-wrong': wrongInput.remark }
              ]"
              autocomplete="off"
              @focus="
                borderChange = 9
                wrongInput.remark = false
              "
              @blur="borderChange = 0"
            />
            <span class="tex-count" :class="{'color-red':remark.length == 500}">{{texsum}}/500</span>
          </div>

          <!-- 发票按钮 -->
            <div class="invoice">

               <div class="invoice-btn" v-if="this.areaId == '1'">
                <div v-show="!iconShow" @click="show2">
                  <img style="width:30px;height:30px" src="../../../static/order/untick.png" alt="">
                  <span>{{ $t(`${lang2}.default`) }}</span>
                </div>
                <div v-show="iconShow" @click="show2">
                  <img style="width:30px;height:30px" src="../../../static/order/ticks.png" alt="">
                  <span>{{ $t(`${lang2}.Invoicing`) }}</span>
                </div>
              </div>
              <div class="invoice-box" v-show="invoiceBox">
                <div class="msg">
                  <div class="msgbox" v-show="content">
                    <div @click="close" class="cha"><i class="el-icon-circle-close "></i></div>

                    <p class="title">{{ $t(`${lang2}.Invoicings`) }}</p>
                    <div class="btn_type">
                      <button @click="zhizhi(0)" :class="{active:isactive}">{{ $t(`${lang2}.PaperInvoice`) }}</button>
                      <button @click="dianzi(1)" :class="{active:Active}">{{ $t(`${lang2}.ElectronicInvoice`) }}</button>
                    </div>
                    <!-- 纸质 -->
                    <div class="input-line" >
                      <div class="label"><span class="star"></span>{{ $t(`${lang2}.InvoiceType`) }}</div>
                      <div class="input-box" v-show="isactive == true">
                        <input
                          style="text-align:center"
                          disabled
                          v-model="aa"
                          readonly
                          :class="{ 'wrong-input': wrongInput.lastname }"
                          type="text"
                          autocomplete="off"
                        />
                      </div>
                      <div class="input-box" v-show="Active == true">
                        <input
                          style="text-align:center;"
                          disabled
                          v-model="bb"
                          readonly
                          :class="{ 'wrong-input': wrongInput.lastname }"
                          type="text"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <!-- 电子 -->
                    <!-- <div class="input-line" >
                      <div class="label"><span class="star"></span>{{ $t(`${lang2}.InvoiceType`) }}</div>
                      <div class="input-box">
                        <input
                          style="text-align:center;"
                          disabled
                          v-model="bb"
                          readonly
                          :class="{ 'wrong-input': wrongInput.lastname }"
                          type="text"
                        />
                      </div>
                    </div> -->
                    <div class="base-info-line">
                      <div class="base-info-line-title"><span class="star">*</span>{{ $t(`${lang2}.HeaderType`) }}</div>
                      <div class="base-info-line-content marriage-choose" >
                        <el-radio-group v-model="invoice.invoice_type" @change="handle">
                          <el-radio :label="2">{{ $t(`${lang2}.UnBusinessUnit`) }}</el-radio>
                          <el-radio :label="1">{{ $t(`${lang2}.BusinessUnit`) }}</el-radio>
                        </el-radio-group>
                        <div v-show="redioShow" class="emplty">
                          {{ $t(`${lang2}.hint1`) }}
                        </div>
                      </div>
                    </div>

                    <!-- 发票抬头 -->
                    <div class="input-line">
                      <div class="label"><span class="star">*</span>{{ $t(`${lang2}.Invoice`) }}</div>
                      <div
                        :class="[
                          { 'border-change': borderChange === 2 },
                          { 'border-wrong': typeShow }
                        ]"
                        class="input-box"
                      >
                        <input
                          v-model="invoice.invoice_title"
                          :class="{ 'wrong-input': typeShow }"
                          type="text"
                          autocomplete="off"
                          @focus="
                            borderChange = 2
                            typeShow = false
                          "
                          @blur="borderChange = 0"
                          maxlength="50"
                        />
                      </div>
                    </div>
                    <div v-show="typeShow" class="empltyErr">
                      {{ $t(`${lang2}.hint2`) }}
                    </div>
                    <!-- 发票税号 -->
                    <div class="input-line">
                      <div class="label"><span v-if="invoice.invoice_type==1" class="star">*</span>{{ $t(`${lang2}.TaxID`) }}</div>
                      <div
                        :class="[
                          { 'border-change': borderChange === 3 },
                          { 'border-wrong': taxShow }
                        ]"
                        class="input-box"
                      >
                        <input
                          v-model="invoice.tax_number"
                          :class="{ 'wrong-input': taxShow }"
                          type="text"
                          autocomplete="off"
                          @focus="
                            borderChange = 3
                           taxShow = false
                          "
                          @blur="borderChange = 0"
                          maxlength="50"
                        />
                      </div>
                    </div>
                    <div v-show="taxShow" class="empltyErr">
                      {{ $t(`${lang2}.hint3`) }}
                    </div>
                    <!-- 邮箱 -->
                    <div class="email-box">
                      <div class="input-line" v-show="Active == true">
                        <div class="label"><span class="star">*</span>{{ $t(`${lang2}.email`) }}</div>
                        <div
                          :class="[
                            { 'border-change': borderChange === 1 },
                            { 'border-wrong': mailShow }
                          ]"
                          class="input-box"
                        >
                          <input
                            v-model="invoice.email"
                            :class="{ 'wrong-input': mailShow }"
                            type="text"
                            autocomplete="off"
                            @focus="
                              borderChange = 1
                              mailShow = false
                            "
                            @blur="borderChange = 0"
                            maxlength="60"
                          />
                        </div>
                      </div>
                      <!-- <div v-show="emailShow" class="empltyErr">
                        {{ $t(`${lang2}.hint4`) }}
                      </div> -->
                      <div v-show="mailShow" class="empltyErr">
                        {{ $t(`${lang2}.hint5`) }}
                      </div>
                    </div>
                    <div class="total">
                      <div class="label"><span class="star"></span>{{ $t(`${lang2}.totalAmount`) }}</div>
                      <div class="totle-price">
                        <span>{{ formatCoin(coinType) }} {{ formatMoney(ultimatelyPay) }}</span>
                      </div>
                    </div>
                    <p class="tips">{{ $t(`${lang2}.tips`) }}</p>
                    <div class="btn">
                      <button @click="confirm">{{ $t(`${lang2}.confirm`) }}</button>
                    </div>
                  </div>
                  <div class="msgbox" v-show="gou">
                    <div class="gou-img">
                      <img src="../../../static/order/ticks.png" alt="">
                      <p>{{ $t(`${lang2}.Submitted`) }}</p>
                    </div>
                    <!-- <div class="btn"> Submitted
                      <button @click="complete">{{ $t(`${lang2}.carryOut`) }}</button>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>

        </div>
        <div class="right-info">
          <!-- <div v-show="!makeGay" class="coupon">
            <div class="two-on-one">
              <input
                ref="too"
                v-model="tooInp"
                :placeholder="$t(`${lang}.tooInp`)"
                :style="[{ opacity: isToo ? 0 : 1 }]"
                type="text"
                class="too-input"
                @input="fuckYouM(`mother`)"
              />
              <i class="iconfont iconxiala" />
              <div v-show="isToo" class="too-tell" @click="tooFocus">
                {{ coupon.couponCode }}
              </div>
              <select
                v-model="coupon"
                class="too-select"
                @click="
                  isToo = true
                  tooInp = ''
                  die = false
                  fuckYouM(`father`)
                "
                @change="fuckYouM(`father`)"
              >
                <option v-for="(c, index) in coupons" :key="index" :value="c"
                  >{{ c.couponCode }}
                  {{ c.discountType === 1 ? `${c.discountAmount}%` : `` }}
                  {{
                    c.discountType === 2 ? `HKD${c.discountAmount}` : ``
                  }}</option
                >
              </select>
            </div>
            <div
              :style="[
                { backgroundColor: fuckYou ? 'rgba(170,138,123,1)' : '#eee' }
              ]"
              class="too-btn"
              @click="checkCount"
            >
              {{ $t(`${lang}.exchange`) }}
            </div>
            <div v-show="die" class="too-die">{{ familyDie }}</div>
            <div class="too-wenhao">
              ?
              <div class="too-gay">
                <div>{{ $t(`${lang}.gay1`) }}</div>
                <div>{{ $t(`${lang}.gay2`) }}</div>
                <div>{{ $t(`${lang}.gay3`) }}</div>
              </div>
            </div>
          </div> -->
          <div class="new-address-title" style="width: auto;position: relative;">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.kouMaiInfo`) }}</div>
            <div class="add-shopping-card" v-if="this.$store.state.platform !== 30" @click="useCard()">{{this.cardType == 1 ? '+'+$t(`${lang}.useShoppingCard`) : $t(`${lang}.editOrUnbound`) }}</div>
          </div>
          <div class="price-detail">
            <div class="detail-line">
              <div>{{ $t(`${lang}.goodsNum`) }}</div>
              <div class="hkd">{{ productCount }}</div>
            </div>
            <div class="detail-line">
              <div>{{ $t(`${lang}.goodsNumNum`) }}</div>
              <div class="hkd">
                {{ formatCoin(coinType) }} {{ formatMoney(tex.productAmount) }}
              </div>
            </div>
            <!-- <div class="detail-line" v-for="item in useAmount">
              <div>{{ $t(`${lang}.shoppingCard`) }} (<span class="shopping-card-num">{{item.sn}}</span>)</div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(item.useAmount) }}
              </div>
            </div> -->
            <div v-show="makeGay" class="detail-line">
              <div>
                *{{ $t(`${lang}.coupon`) }}:
                <span style="color: red;">{{
                  isToo ? coupon.couponCode : tooInp
                }}</span>
                <span
                  style="color: red;text-decoration: underline;cursor: pointer;"
                  @click="removeCoupon"
                  >{{ $t(`${lang}.sc`) }}</span
                >
              </div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(preferFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.expressMoney`) }}</span>
                <div class="question">
                  <a href="/policies/free-shipping" target="_blank"><span>?</span></a>
                  <div class="answer">{{ $t(`${lang}.expressSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.logisticsFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.tex`) }}</span>
                <div class="question">
                  <a href="/policies/international" target="_blank"
                    ><span>?</span></a
                  >
                  <div class="answer">{{ $t(`${lang}.texSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.taxFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.insurance`) }}</span>
                <div class="question">
                  <span>?</span>
                  <div class="answer">{{ $t(`${lang}.insuranceSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.safeFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div class="font-size-16 color-333">
                {{ $t(`${lang}.totalMoney`) }}
              </div>
              <div class="hkd color-pink">
                {{ formatCoin(coinType) }}
                {{ formatMoney(orderTotalAmount) }}
                <!-- {{ formatMoney(tex.orderAmount || goodsPrice) }} -->
              </div>
            </div>

            <!-- 折扣金额 -->
            <div v-show="tex.discountAmount" class="detail-line">
              <div>{{$t(`${lang}.discountPrice`)}}</div>
              <div class="hkd color-pink">
                <div>- {{formatCoin(coinType)}} {{ formatMoney(tex.discountAmount) }}</div>
              </div>
            </div>

            <!-- 优惠券 -->
            <div v-if="ifShowCoupon" class="detail-line">
              <div>{{ $t(`${lang}.coupon`) }}</div>
              <!-- :class="{'under-line': !couponCodeR.couponId}" -->
              <div class="hkd color-pink under-line" style="cursor: pointer;"  @click="showUseCoupon = true">
                <div v-if="couponCodeR.couponId">- {{formatCoin(coinType)}} {{ formatMoney(couponCodeR.couponCode) }}</div>
                <div v-if="!couponCodeR.couponId">{{$t(`${lang}.notAvailable`)}}</div>
              </div>
            </div>

            <!-- 购物卡 -->
            <div class="detail-line" v-for="(item,index) in useAmount" :key="index">
              <div>{{ $t(`${lang}.shoppingCard`) }} (<span class="shopping-card-num">{{item.sn}}</span>)</div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(item.useAmount) }}
              </div>
            </div>

            <div class="detail-line amount">
              <div class="font-size-16 color-333">{{ $t(`${lang2}.NeedPay`) }}</div>
              <div v-if="this.$store.state.platform == 40" class="hkd color-pink price-big" >
                {{ formatCoin(coinType) }}
                {{ formatAmount(ultimatelyPay) }}
                <!-- {{ formatMoney(tex.payAmount || goodsPrice) }}</span -->
              </div>
              <div v-else class="hkd color-pink price-big">
                {{ formatCoin(coinType) }}
                {{ formatMoney(ultimatelyPay) }}
                <!-- {{ formatMoney(tex.payAmount || goodsPrice) }}</span -->
              </div>
            </div>
            <p class="point" v-show="this.$store.state.platform == 40 && floatStr(ultimatelyPay)>0">({{ $t(`${lang}.point`) }})</p>
          </div>
        </div>
      </div>
      <div class="info-line" />
      <div
        :class="['buy-btn', { disabled: !canSubmit }]"
        @click.stop="createOrder()"
      >
        <span v-if="this.$store.state.platform == 40">
          {{ formatCoin(coinType) }}
          {{ formatAmount(ultimatelyPay) }}
          <!-- {{ formatMoney(tex.payAmount || goodsPrice) }} -->
        </span>
        <span v-else>
          {{ formatCoin(coinType) }}
          {{ formatMoney(ultimatelyPay) }}
          <!-- {{ formatMoney(tex.payAmount || goodsPrice) }} -->
        </span>
        <span>{{ $t(`${lang}.beiQin`) }}</span>
      </div>
    </div>

    <message-box
      v-show="confirmBox"
      :title="$t(`${lang}.msgTitle1`)"
      :message="$t(`${lang}.msgContent1`)"
      type="two"
      @cancel="confirmBox = false"
      @sure="deleteAddress()"
    />
    <message-box
      v-show="alertBox"
      :message="wrongMsg"
      :title="$t(`${lang}.msgTitle1`)"
      type="one"
      @done="alertTipBox"
    />
  </div>
  <!-- 繁体 -->
  <div v-else class="order">
    <!--    步骤模块-->
    <div class="order-step" id="step">
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.ConfirmOrder`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.finishOrder`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>2</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ $t(`${lang}.orderPay`) }}</div>
        <div class="step-desc" />
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>3</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
        <div class="step-desc" />
      </div>
      <div class="step-line" />
    </div>

    <!--    用户名称和提示登陆-->
    <div class="user-info">
      <i class="iconfont iconrentou" />
      <div>
        {{ $t(`${lang}.darling`) }}{{ $store.state.userInfo.name
        }}
      </div>
      <div
        v-show="!addressMore && address.length !== 0"
        @click="addressMore = true"
      >
        {{ $t(`${lang}.seeMore`) }}
      </div>
      <div
        v-show="addressMore && address.length !== 0"
        @click="addressMore = false"
      >
        {{ $t(`${lang}.seeLess`) }}
      </div>
    </div>

    <!--    地址列表模块-->
    <div
      v-show="address.length !== 0"
      :style="{
        height: addressMore
          ? `${270 * Math.ceil(address.length / 2)}px`
          : '250px'
      }"
      class="address-box"
    >
      <div class="addr-blocks">
        <div
          v-for="(a, index) in address"
          :key="index"
          :class="{ 'addr-active': addressIdx == index }"
          class="addr-block"
        >
          <div class="addr-title">
            <div>{{ a.country_name }}{{ a.province_name }}-{{ a.city_name }}</div>
            <!--              <div>CHN</div>-->
          </div>
          <div class="addr-user">
            <div>{{ a.firstname }} {{ a.lastname }}</div>
            <div>（{{ $t(`${lang}.get`) }}）</div>
          </div>
          <div class="addr-address">
           {{ a.country_name }}-{{ a.province_name }}{{ a.city_name
          }}{{ a.address_details }}
          </div>
          <div class="addr-user-phone">
            <div>{{ a.mobile_code }}</div>
            <div>{{ a.mobile }}</div>
          </div>
          <div class="font-size-14 color-333">{{ a.zip_code }}</div>
          <div class="font-size-14 color-333">{{ a.email }}</div>

          <div class="addr-board" @click="changeAddress(index)" />
		      <span class="ifChoose" :class="{'on': addressIdx == index}"></span>
          <i
            class="iconfont iconlajitong"
            @click="
              deleteAddressId = a.id
	      delIdx = index
              confirmBox = true
            "
          />
          <div
            v-if="a.is_default == 1"
            class="font-size-14 mrAdd"
            style="color: #f29b87; margin-top: 6px;"
          >
            {{ $t(`${langs}.mrAddress`) }}
          </div>
          <div
            v-if="a.is_default != 1 && addressIdx == index"
            class="font-size-14 mrAdd"
            style="color: #f29b87; margin-top: 6px;"
          @click="setDefaultAddr(a)"
          >
          {{ $t(`${lang}.setDefaultAddr`) }}
          </div>
          <div
            class="addr-btn"
            @click="
              newAddress = true
              changeAddressInfo(a)
            "
          >
            {{ $t(`${lang}.change`) }}
          </div>
          <img
            v-show="a.is_default == 1"
            src="../../../static/personal/account/address-bar.png"
          />
        </div>
      </div>
    </div>

    <!--    新增&修改地址模块-->
    <div
      :style="[
        { height: newAddress ? '360px' : '0px' },
        { padding: newAddress ? '20px 51px 0 36px' : '0' }
      ]"
      class="new-address"
      id="addbox"
    >
      <div class="new-address-title">
        <div class="na-line" />
        <div class="na-title">{{ $t(`${lang}.address`) }}</div>
        <div class="na-little-word">{{ $t(`${lang}.mustInput`) }}</div>
      </div>
      <div class="new-address-input">
        <!--        左边输入框-->
        <div class="left-side">
          <!--          名-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.lastName`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 1 },
                { 'border-wrong': wrongInput.firstname }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.firstname"
                :class="{ 'wrong-input': wrongInput.firstname }"
                type="text"
                maxlength="30"
                autocomplete="off"
                @focus="
                  borderChange = 1
                  wrongInput.firstname = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.firstname" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          姓-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.firstName`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 2 },
                { 'border-wrong': wrongInput.lastname }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.lastname"
                :class="{ 'wrong-input': wrongInput.lastname }"
                type="text"
                maxlength="30"
                autocomplete="off"
                @focus="
                  borderChange = 2
                  wrongInput.lastname = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.lastname" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          电话-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.telephone`) }}</div>
            <div class="tel-special">
              <div class="tel-area">
                <input :value="pnN + ' ' + phoneNum.phone_code" type="text" autocomplete="off" />
                <select v-model="phoneNum">
                  <option
                    v-for="(p, index) in phoneJson"
                    :key="index"
                    :value="p"
                    >{{ psn ? p.en :psn ? p.cn :p.zh }}{{ p.phone_code }}</option
                  >
                </select>
                <i class="iconfont iconxiala" />
              </div>
              <div
                :class="[
                  { 'border-change': borderChange === 3 },
                  { 'border-wrong': wrongInput.mobile }
                ]"
                class="input-box tel"
              >
                <input
                  v-model="addressData.mobile"
                  :class="{ 'wrong-input': wrongInput.mobile }"
                  type="text"
                  autocomplete="off"
                  @focus="
                    borderChange = 3
                    wrongInput.mobile = false
                  "
                  @blur="borderChange = 0"
                  @input="mobileIpt"
                  :maxlength="mobileMax"
                />
                <div v-show="wrongInput.mobile" class="wrong-alert">
                  {{ $t(`${lang}.wrongInput`) }}
                </div>
              </div>
            </div>
          </div>

          <!--          邮箱-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.email`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 4 },
                { 'border-wrong': wrongInput.email }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.email"
                :class="{ 'wrong-input': wrongInput.email }"
                type="text"
                autocomplete="off"
                maxlength="60"
                @focus="
                  borderChange = 4
                  wrongInput.email = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.email" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          确认邮箱-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.checkEmail`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 5 },
                { 'border-wrong': wrongInput.checkEmail }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.checkEmail"
                :class="{ 'wrong-input': wrongInput.checkEmail }"
                type="text"
                maxlength="60"
                autocomplete="off"
                @focus="
                  borderChange = 5
                  wrongInput.checkEmail = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.checkEmail" class="wrong-alert">
                {{ $t(`${lang}.wrongInputAgain`) }}
              </div>
            </div>
          </div>
        </div>

        <!--        右边输入框-->
        <div class="right-side">
          <!--          国家-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.country`) }}</div>
            <div class="input-box">
              <input :value="country.areaName" type="address" autocomplete="off" />
              <select v-model="country" @change="getListTwo()">
                <option
                  v-for="(c, index) in countryList"
                  :key="index"
                  :value="c"
                  >{{ c.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          省份-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.province`) }}</div>
            <div class="input-box">
              <input :value="province.areaName" type="address" autocomplete="off" />
              <select v-model="province" @change="getListThree()">
                <option
                  v-for="(p, index) in provinceList"
                  :key="index"
                  :value="p"
                  >{{ p.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          城市-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.city`) }}</div>
            <div class="input-box">
              <input :value="city.areaName" type="address" autocomplete="off" />
              <select v-model="city">
                <option
                  v-for="(c, index) in cityList"
                  :key="index"
                  :value="c"
                  >{{ c.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>

          <!--          详细地址-->
          <div class="input-line">
            <div class="label"><span class="star">*</span>{{ $t(`${lang}.longAddress`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 6 },
                { 'border-wrong': wrongInput.address_details }
              ]"
              class="input-box"
            >
              <textarea
                v-model="addressData.address_details"
                :class="{ 'wrong-input': wrongInput.address_details }"
                maxlength="300"
                autocomplete="off"
                @focus="
                  borderChange = 6
                  wrongInput.address_details = false
                "
                @blur="borderChange = 0"
              />
              <div v-show="wrongInput.address_details" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>

          <!--          邮编-->
          <div class="input-line">
            <div class="label">{{ $t(`${lang}.zipCode`) }}</div>
            <div
              :class="[
                { 'border-change': borderChange === 7 },
                { 'border-wrong': wrongInput.zip_code }
              ]"
              class="input-box"
            >
              <input
                v-model="addressData.zip_code"
                :class="{ 'wrong-input': wrongInput.zip_code }"
                type="text"
                maxlength="11"
                autocomplete="off"
                @focus="
                  borderChange = 7
                  wrongInput.zip_code = false
                "
                @blur="borderChange = 0"
                @input="keydown"
              />
              <div v-show="wrongInput.zip_code" class="wrong-alert">
                {{ $t(`${lang}.wrongInput`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="new-address-btn"
        @click="isEdit ? saveAddress() : createAddress1()"
      >
        {{ $t(`${lang}.sure`)
        }}<span v-show="!isEdit">{{ $t(`${lang}.add`) }}</span
        ><span v-show="isEdit">{{ $t(`${lang}.edit`) }}</span>
      </div>
      <div
        v-show="noWay"
        class="close-new-address-btn"
        @click="
          newAddress = false
          resetAddressInp()
        "
      >
        {{ $t(`${lang}.seeLess`) }}
      </div>
    </div>

    <!--    新增地址按钮-->
    <div
      v-show="!newAddress"
      class="is-new-address"
      @click="
        newAddress = true
        isEdit = false
      "
    >
      + {{ $t(`${lang}.addAddress`) }}
    </div>

    <!--    购物车模块-->
    <div class="cart-top-bar">
      <span>{{ $t(`${lang}.info`) }}</span
      ><span>{{ $t(`${lang}.number`) }}</span
      ><span>{{ $t(`${lang}.oldPrice`) }}</span
      ><span>{{ $t(`${lang}.newPrice`) }}</span>
    </div>
    <div class="cart-goods">
      <div v-for="(g, index) in good" :key="index">
        <div v-if="g.groupType === null && g.data[0].goodsType !== 19" class="finished">
          <div class="cart-radio"></div>
          <single :g="g" :options="false"></single>
        </div>
        <div v-if="g.data[0].goodsType == '19'" class="couple">
          <div class="cart-radio"></div>
          <double :g="g" :options="false"></double>
        </div>
        <div v-if="g.groupType === 2" class="customization">
          <div class="cart-radio"></div>
          <madeUp
            :g="g"
            :options="false"
            :word="$t(`cart.customMade`)"
          ></madeUp>
        </div>
      </div>
    </div>

    <!--    订单信息模块-->
    <div class="order-info">
      <div class="clf">
        <div class="left-info">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.deliveryInformation`) }}</div>
          </div>
          <!-- <div v-if="good.length > 1" class="is-pack">
            <div
              v-show="!isAllPack"
              class="free-check"
              @click="isAllPack = !isAllPack"
            />
            <i
              v-show="isAllPack"
              class="iconfont icongou"
              @click="isAllPack = !isAllPack"
            />
            <div>
              <span>{{ $t(`${lang}.sendTogether`) }}</span
              ><span>（{{ $t(`${lang}.chatBor`) }}）</span>
            </div>
          </div> -->
          <div class="send-time">
            <div class="send-left">
              <div>{{ $t(`${lang}.sendTime`) }}</div>
              <div>
                <router-link to="/policies/shipping">{{
                  $t(`${lang}.checkDeliveryPolicy`)
                }}</router-link>
              </div>
            </div>
            <div class="send-right">
              {{ tex.planDays }}{{ $t(`${lang}.goSingKei`) }}
            </div>
          </div>
          <!-- <div class="after-sale-email">
            <div>{{ $t(`${lang}.showHouEmail`) }}</div>
            <div>
              <div
                v-show="!isSameEmail"
                class="free-check"
                @click="isSameEmail = !isSameEmail"
              />
              <i
                v-show="isSameEmail"
                class="iconfont icongou"
                @click="isSameEmail = !isSameEmail"
              />
              <span>{{ $t(`${lang}.sameTongAddress`) }}</span>
            </div>
          </div> -->
          <!-- <div
            :class="[
              { 'border-change': borderChange === 8 },
              { 'border-wrong': wrongInput.odMail }
            ]"
            class="after-sale-email-input"
          >
            <input
              v-show="!isSameEmail"
              v-model="orderEmail"
              :class="{ 'wrong-input': wrongInput.odMail }"
              type="text"
              @focus="
                borderChange = 8
                wrongInput.odMail = false
              "
              @blur="borderChange = 0"
            />
            <input
              v-show="isSameEmail"
              v-model="orderAddress.email"
              :class="{ 'wrong-input': wrongInput.odMail }"
              type="text"
              @focus="
                borderChange = 8
                wrongInput.odMail = false
              "
              @blur="borderChange = 0"
            />
          </div> -->
          <div class="message">
            <div class="message-title">{{ $t(`${lang}.remark`) }}</div>
            <textarea
              maxlength="500"
              v-model="remark"
              :class="[
                { 'border-change': borderChange === 9 },
                { 'wrong-input': wrongInput.remark },
                { 'border-wrong': wrongInput.remark }
              ]"
              autocomplete="off"
              @focus="
                borderChange = 9
                wrongInput.remark = false
              "
              @blur="borderChange = 0"
            />
            <span class="tex-count" :class="{'color-red':remark.length == 500}">{{texsum}}/500</span>
          </div>

          <!-- 发票按钮 -->
          <div class="invoice">
            
            <div class="invoice-btn" v-if="this.areaId == '1'">
              <div v-show="!iconShow" @click="show2">
                <img style="width:30px;height:30px" src="../../../static/order/untick.png" alt="">
                <span>{{ $t(`${lang2}.default`) }}</span>
              </div>
              <div v-show="iconShow" @click="show2">
                <img style="width:30px;height:30px" src="../../../static/order/ticks.png" alt="">
                <span>{{ $t(`${lang2}.Invoicing`) }}</span>
              </div>
            </div>
            <div class="invoice-box" v-show="invoiceBox">
              <div class="msg">
                <div class="msgbox" v-show="content">
                  <div @click="close" class="cha"><i class="el-icon-circle-close "></i></div>

                  <p class="title">{{ $t(`${lang2}.Invoicings`) }}</p>
                  <div class="btn_type">
                    <button @click="zhizhi(0)" :class="{active:isactive}">{{ $t(`${lang2}.PaperInvoice`) }}</button>
                    <button @click="dianzi(1)" :class="{active:Active}">{{ $t(`${lang2}.ElectronicInvoice`) }}</button>
                  </div>
                  <!-- 纸质 -->
                  <div class="input-line" >
                    <div class="label"><span class="star"></span>{{ $t(`${lang2}.InvoiceType`) }}</div>
                    <div class="input-box" v-show="isactive == true">
                      <input
                        style="text-align:center;"
                        disabled
                        v-model="aa"
                        readonly
                        :class="{ 'wrong-input': wrongInput.lastname }"
                        type="text"
                      />
                    </div>
                    <div class="input-box" v-show="Active == true">
                      <input
                        style="text-align:center;"
                        disabled
                        v-model="bb"
                        readonly
                        :class="{ 'wrong-input': wrongInput.lastname }"
                        type="text"
                      />
                    </div>
                  </div>
                  <!-- 电子 -->
                  <!-- <div class="input-line" >
                    <div class="label"><span class="star"></span>{{ $t(`${lang2}.InvoiceType`) }}</div>
                    <div class="input-box">
                      <input
                        style="text-align:center;"
                        disabled
                        v-model="bb"
                        readonly
                        :class="{ 'wrong-input': wrongInput.lastname }"
                        type="text"
                      />
                    </div>
                  </div> -->
                  <div class="base-info-line">
                    <div class="base-info-line-title"><span class="star">*</span>{{ $t(`${lang2}.HeaderType`) }}</div>
                    <div class="base-info-line-content marriage-choose" >
                      <el-radio-group v-model="invoice.invoice_type" @change="handle">
                        <el-radio :label="2">{{ $t(`${lang2}.UnBusinessUnit`) }}</el-radio>
                        <el-radio :label="1">{{ $t(`${lang2}.BusinessUnit`) }}</el-radio>
                      </el-radio-group>
                      <div v-show="redioShow" class="emplty">
                        {{ $t(`${lang2}.hint1`) }}
                      </div>
                    </div>
                  </div>

                  <!-- 发票抬头 -->
                  <div class="input-line">
                    <div class="label"><span class="star">*</span>{{ $t(`${lang2}.Invoice`) }}</div>
                    <div
                      :class="[
                        { 'border-change': borderChange === 2 },
                        { 'border-wrong': typeShow }
                      ]"
                      class="input-box"
                    >
                      <input
                        v-model="invoice.invoice_title"
                        :class="{ 'wrong-input': typeShow }"
                        type="text"
                        @focus="
                          borderChange = 2
                          typeShow = false
                        "
                        @blur="borderChange = 0"
                        maxlength="50"
                      />
                    </div>
                  </div>
                  <div v-show="typeShow" class="empltyErr">
                    {{ $t(`${lang2}.hint2`) }}
                  </div>
                  <!-- 发票税号 -->
                  <div class="input-line">
                    <div class="label"><span v-if="invoice.invoice_type==1" class="star">*</span>{{ $t(`${lang2}.TaxID`) }}</div>
                    <div
                      :class="[
                        { 'border-change': borderChange === 3 },
                        { 'border-wrong': taxShow }
                      ]"
                      class="input-box"
                    >
                      <input
                        v-model="invoice.tax_number"
                        :class="{ 'wrong-input': taxShow }"
                        type="text"
                        @focus="
                          borderChange = 3
                          taxShow = false
                        "
                        @blur="borderChange = 0"
                        maxlength="50"
                      />
                    </div>
                  </div>
                  <div v-show="taxShow" class="empltyErr">
                    {{ $t(`${lang2}.hint3`) }}
                  </div>
                  <!-- 邮箱 -->
                  <div class="email-box">
                    <div class="input-line" v-show="Active == true">
                      <div class="label"><span class="star">*</span>{{ $t(`${lang2}.email`) }}</div>
                      <div
                        :class="[
                          { 'border-change': borderChange === 1 },
                          { 'border-wrong': mailShow }
                        ]"
                        class="input-box"
                      >
                        <input
                          v-model="invoice.email"
                          :class="{ 'wrong-input': mailShow }"
                          type="text"
                          @focus="
                            borderChange = 1
                            mailShow = false
                          "
                          @blur="borderChange = 0"
                          maxlength="60"
                        />
                      </div>
                    </div>
                    <!-- <div v-show="emailShow" class="empltyErr">
                      {{ $t(`${lang2}.hint4`) }}
                    </div> -->
                    <div v-show="mailShow" class="empltyErr">
                      {{ $t(`${lang2}.hint5`) }}
                    </div>
                  </div>
                  <div class="total">
                    <div class="label"><span class="star"></span>{{ $t(`${lang2}.totalAmount`) }}</div>
                    <div class="totle-price">
                      <span>{{ formatCoin(coinType) }} {{ formatMoney(ultimatelyPay) }}</span>
                    </div>
                  </div>
                  <p class="tips">{{ $t(`${lang2}.tips`) }}</p>
                  <div class="btn">
                    <button @click="confirm">{{ $t(`${lang2}.confirm`) }}</button>
                  </div>
                </div>
                <div class="msgbox" v-show="gou">
                  <div class="gou-img">
                    <img src="../../../static/order/ticks.png" alt="">
                    <p>{{ $t(`${lang2}.Submitted`) }}</p>
                  </div>
                  <!-- <div class="btn"> Submitted
                    <button @click="complete">{{ $t(`${lang2}.carryOut`) }}</button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-info">
          <!-- <div v-show="!makeGay" class="coupon">
            <div class="two-on-one">
              <input
                ref="too"
                v-model="tooInp"
                :placeholder="$t(`${lang}.tooInp`)"
                :style="[{ opacity: isToo ? 0 : 1 }]"
                type="text"
                class="too-input"
                @input="fuckYouM(`mother`)"
              />
              <i class="iconfont iconxiala" />
              <div v-show="isToo" class="too-tell" @click="tooFocus">
                {{ coupon.couponCode }}
              </div>
              <select
                v-model="coupon"
                class="too-select"
                @click="
                  isToo = true
                  tooInp = ''
                  die = false
                  fuckYouM(`father`)
                "
                @change="fuckYouM(`father`)"
              >
                <option v-for="(c, index) in coupons" :key="index" :value="c"
                  >{{ c.couponCode }}
                  {{ c.discountType === 1 ? `${c.discountAmount}%` : `` }}
                  {{
                    c.discountType === 2 ? `HKD${c.discountAmount}` : ``
                  }}</option
                >
              </select>
            </div>
            <div
              :style="[
                { backgroundColor: fuckYou ? 'rgba(170,138,123,1)' : '#eee' }
              ]"
              class="too-btn"
              @click="checkCount"
            >
              {{ $t(`${lang}.exchange`) }}
            </div>
            <div v-show="die" class="too-die">{{ familyDie }}</div>
            <div class="too-wenhao">
              ?
              <div class="too-gay">
                <div>{{ $t(`${lang}.gay1`) }}</div>
                <div>{{ $t(`${lang}.gay2`) }}</div>
                <div>{{ $t(`${lang}.gay3`) }}</div>
              </div>
            </div>
          </div> -->
          <div class="new-address-title" style="width: auto;position: relative;">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.kouMaiInfo`) }}</div>
            <div class="add-shopping-card" v-if="this.$store.state.platform !== 30" @click="useCard()">{{this.cardType == 1 ? '+'+$t(`${lang}.useShoppingCard`) : $t(`${lang}.editOrUnbound`) }}</div>
          </div>
          <div class="price-detail">
            <div class="detail-line">
              <div>{{ $t(`${lang}.goodsNum`) }}</div>
              <div class="hkd">{{ productCount }}</div>
            </div>
            <div class="detail-line">
              <div>{{ $t(`${lang}.goodsNumNum`) }}</div>
              <div class="hkd">
                {{ formatCoin(coinType) }} {{ formatMoney(tex.productAmount) }}
              </div>
            </div>
            <!-- <div class="detail-line" v-for="item in useAmount">
              <div>{{ $t(`${lang}.shoppingCard`) }} (<span class="shopping-card-num">{{item.sn}}</span>)</div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(item.useAmount) }}
              </div>
            </div> -->

            <div v-show="makeGay" class="detail-line">
              <div>
                *{{ $t(`${lang}.coupon`) }}:
                <span style="color: red;">{{
                  isToo ? coupon.couponCode : tooInp
                }}</span>
                <span
                  style="color: red;text-decoration: underline;cursor: pointer;"
                  @click="removeCoupon"
                  >{{ $t(`${lang}.sc`) }}</span
                >
              </div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(preferFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.expressMoney`) }}</span>
                <div class="question">
                  <a href="/policies/free-shipping" target="_blank"><span>?</span></a>
                  <div class="answer">{{ $t(`${lang}.expressSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.logisticsFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.tex`) }}</span>
                <div class="question">
                  <a href="/policies/international" target="_blank"
                    ><span>?</span></a
                  >
                  <div class="answer">{{ $t(`${lang}.texSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.taxFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div>
                <span>{{ $t(`${lang}.insurance`) }}</span>
                <div class="question">
                  <span>?</span>
                  <div class="answer">{{ $t(`${lang}.insuranceSay`) }}</div>
                </div>
              </div>
              <div class="hkd color-gold">
                +{{ formatCoin(coinType) }} {{ formatMoney(tex.safeFee) }}
              </div>
            </div>
            <div class="detail-line">
              <div class="font-size-16 color-333">
                {{ $t(`${lang}.totalMoney`) }}
              </div>
              <div class="hkd color-pink">
                {{ formatCoin(coinType) }}
                {{ formatMoney(orderTotalAmount) }}
                <!-- {{ formatMoney(tex.orderAmount || goodsPrice) }} -->
              </div>
            </div>

            <!-- 折扣金额 -->
            <div v-show="tex.discountAmount" class="detail-line">
              <div>{{$t(`${lang}.discountPrice`)}}</div>
              <div class="hkd color-pink">
                <div>- {{formatCoin(coinType)}} {{ formatMoney(tex.discountAmount) }}</div>
              </div>
            </div>

            <!-- 优惠券 -->
            <div v-if="ifShowCoupon" class="detail-line">
              <div>{{ $t(`${lang}.coupon`) }}</div>
              <!-- :class="{'under-line': !couponCodeR.couponId}" -->
              <div class="hkd color-pink under-line" style="cursor: pointer;"  @click="showUseCoupon = true">
                <div v-if="couponCodeR.couponId">- {{formatCoin(coinType)}} {{ formatMoney(couponCodeR.couponCode) }}</div>
                <div v-if="!couponCodeR.couponId">{{$t(`${lang}.notAvailable`)}}</div>
              </div>
            </div>

            <!-- 购物卡 -->
            <div class="detail-line" v-for="(item,index) in useAmount" :key="index">
              <div>{{ $t(`${lang}.shoppingCard`) }} (<span class="shopping-card-num">{{item.sn}}</span>)</div>
              <div class="hkd color-pink">
                -{{ formatCoin(coinType) }} {{ formatMoney(item.useAmount) }}
              </div>
            </div>

            <div class="detail-line amount"> 
              <div class="font-size-14 color-333">{{ $t(`${lang2}.NeedPay`) }}</div>
              <div v-if="this.$store.state.platform == 40" class="hkd color-pink price-big">
                {{ formatCoin(coinType) }}
                {{ formatAmount(ultimatelyPay) }}
              </div>
              <div v-else class="hkd color-pink price-big">
                {{ formatCoin(coinType) }}
                {{ formatMoney(ultimatelyPay) }}
              </div>
            </div>
            <p class="point" v-show="this.$store.state.platform == 40 && floatStr(ultimatelyPay)>0">({{ $t(`${lang}.point`) }})</p>
          </div>
        </div>
      </div>
      <div class="info-line" />
      <div
        :class="['buy-btn', { disabled: !canSubmit }]"
        @click.stop="createOrder1()"
      >
        <span v-if="this.$store.state.platform == 40">
          {{ formatCoin(coinType) }}
          {{ formatAmount(ultimatelyPay) }}
          <!-- {{ formatMoney(tex.payAmount || goodsPrice) }} -->
        </span>
        <span v-else>
          {{ formatCoin(coinType) }}
          {{ formatMoney(ultimatelyPay) }}
          <!-- {{ formatMoney(tex.payAmount || goodsPrice) }} -->
        </span>
        <span>{{ $t(`${lang}.beiQin`) }}</span>
      </div>
    </div>

    <message-box
      v-show="confirmBox"
      :title="$t(`${lang}.msgTitle1`)"
      :message="$t(`${lang}.msgContent1`)"
      type="two"
      @cancel="confirmBox = false"
      @sure="deleteAddress()"
    />
    <message-box
      v-show="alertBox"
      :message="wrongMsg"
      :title="$t(`${lang}.msgTitle1`)"
      type="one"
      @done="alertTipBox"
    />
  </div>

  <div v-if="ifShowAddCard">
    <shopping-card
      @closePop="closeCardPop"
      :cardType="useAmount"
      :goodsLine ="goodsListLine"
      :currencyType = "currency"
    ></shopping-card>
  </div>

  <use-coupon v-if="showUseCoupon" @closeCoupon="closeCo" :couponAll="this.couponAll" :couponAlready="this.couponAlready" :useC="couponCodeR" :coinTypes="coinTypes"></use-coupon>
</div>
</template>

<script>
import single from '../../shopping-cart/goodsCss/single'
import double from '../../shopping-cart/goodsCss/double'
import madeUp from '../../shopping-cart/goodsCss/madeUp'
import Address from '@/assets/js/address.js'
import { Email, RegMobile, RegTelephone, RegMobiles } from '@/assets/js/require-lee.js'
import shoppingCard from '../../../pageComponents/shopping-card/index.vue'
const lang = 'order'
const langs = 'personal.account'
const lang2 = 'invoice'
export default {
  name: 'Member',
  components: {
    single,
    double,
    madeUp,
    shoppingCard
  },
  mixins: [Address],
  data() {
    return {
      texsum:0,
      aa:this.$t(`${lang2}.PaperInvoice`),
      bb:this.$t(`${lang2}.ElectronicInvoice`),
      iconShow:false,
      invoiceBox:false,
      invoiceRise:'',
      invoiceCode:'',
      gou:false,
      content:true,
      selectStatus:0,
      radio:'',
      redioShow:false,
      typeShow:false,
      taxShow:false,
      isactive:true,
      Active:false,
      emailShow:false,
      mailShow:false,
      language:'',
      lang,
      langs,
      lang2,
      pathTakeIds: this.$route.query.cartIds.split(','),
      canSubmit: false,
      address: [],
      addressMore: false,
      orderAddress:{email:''},
      // orderAddress: ,
      newAddress: false,
      isEdit: false,
      noWay: false,
      addressData: {
        lastname: '',
        firstname: '',
        mobile: '',
        email: '',
        checkEmail: '',
        address_details: '',
        zip_code: '',
        odMail: '',
        remark: ''
      },
      borderChange: 0,
      wrongInput: {
        firstname: false,
        lastname: false,
        mobile: false,
        email: false,
        checkEmail: false,
        address_details: false,
        zip_code: false,
        odMail: false,
        remark: false
      },
      confirmBox: false,
      deleteAddressId: null,
      wrongMsg: ``,
      alertBox: false,
      good: [],
      isToo: false,
      die: false,
      tooInp: '',
      makeGay: false,
      fuckYou: false,
      familyDie: ``,
      // isAllPack: false,
      isSameEmail: false,
      orderEmail: ``,
      remark: '',
      // coupons: [{ couponCode: '- - -', couponId: '' }],
      // coupon: { couponCode: '- - -', couponId: '' },
      goodsPrice: 0,
      preferFee: 0,
      tex: {
        logisticsFee: 0,
        taxFee: 0,
        safeFee: 0,
        orderAmount: 0,
        productAmount: 0,
        planDays: '5-12'
      },
      invoice:{
        invoice_type: 2,
        invoice_title:'',
        tax_number:'',
        is_electronic:"0",
        email:''
      },
      scrollTop:0,
      areaId: this.$store.state.areaId,
      ifShowAddCard: false,
      cardList: [],
      useAmount: [],
      cardType: 1,
      goodsListLine: [],
      orderTotalAmount: 0,
      ultimatelyPay: 0,
      coinType:'',
      num: 0,
      mobileMax: 20,
      currency: '',
      platform: this.$store.state.platform,
      addressIdx: -1,
      delIdx: -2,
      couponCodeR: {
        couponId: ''
      },
      showUseCoupon: false,
      // 所有可有优惠券
      couponAll: [],
      // 已领取优惠券
      couponAlready: [],
      ifShowCoupon: false,
      productCount:'',
      coinTypes:{
        coin:''
      }
    }
  },
  watch:{
    remark(){
      this.texsum = this.remark.length;
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
        // console.log("代码",this.phoneNum.zh)
    },
    psn() {
      return this.$store.state.language === 'en_US'
    }
  },
  created() {
    const promise = new Promise((resolve, reject) => {
      this.$store
        .dispatch(`getCartGoodsByCartId`, this.pathTakeIds)
        .then(res => {
          this.good = res
          // console.log("this.good",this.good)
          // console.log("this.pathTakeIds", this.pathTakeIds)
          this.productCount = this.good.length
          for(var i=0; i<res.length; i++){
            this.goodsListLine.push(res[i].data[0].goodsType)
            if(res[i].groupType === 2){
              this.productCount = this.productCount + 1
            //  console.log("ffff", this.productCount)
            }
          }

          resolve()
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
          resolve()
        })
    })
    promise
      .then(() => {
        this.getAddress()
      })
      .then(() => {
        // this.getAddress()
        // this.getCouponList()
      })
      .catch(err => {
        // if (!err.response) {
          this.$message.error(err.message)
        // } else {
        //   // console.log(err)
        // }
      })
  },
  mounted() {
    // this.getAddress();
    this.language = this.$store.state.language
  },
  methods: {
    // 点击提示修改地址确认按钮触发
    alertTipBox(){
      this.alertBox = false
      // 点击修改滚顶到地址选择模块
      document.getElementById('step').scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: 'smooth'
      })
    },
    zhizhi(or){
      // console.log("纸质",or)
      this.invoice.is_electronic = or;
      this.isactive = true
      this.Active = false
    },
    dianzi(or){
      // console.log("电子",or)
      this.invoice.is_electronic = or;
      this.isactive = false
      this.Active = true
    },
    handle(){
      // console.log("取到的值是"+this.invoice.invoice_type);
    },
    close(){
      this.invoiceBox = false
      this.iconShow = false
    },
    show2(){
      this.iconShow=!this.iconShow
      this.invoice.is_electronic = 0
      if(this.iconShow == true){
        this.invoiceBox = true
        this.content = true
      }else{
        this.invoiceBox = false
        this.content = false
      }
    },
    confirm(){
      if(this.invoice.invoice_type == ''){
        this.redioShow = true
        return
      }
      if(this.invoice.invoice_title == ''){
        this.typeShow = true
        return
      }
      if(this.invoice.invoice_type == 1){
        if(this.invoice.tax_number == ''){
          this.taxShow = true
          return
        }
      }
      if(this.invoice.is_electronic == 1){
        if(this.invoice.email == '' || !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.invoice.email))){
          this.mailShow = true
          return
        }
        // if(){
        //   this.mailShow=true
        //   this.emailShow = false
        //   return
        // }
      }
      this.gou = true
      this.content = false
      setTimeout(() => {
        this.content = false
        this.gou = false
        this.invoiceBox = false
      }, 1000);
    },
    complete(){
      this.invoiceBox = false
      // this.iconShow = false
    },
    // 获取地址
    getAddress() {
      this.$axios
        .get('/web/member/address')
        .then(res => {
          // console.log("地址",res.data)
          this.address = res.data
          if(this.address.length != 0){
            // for (const i in res.data) {
            //   if (res.data[i].is_default === 1) {
            //     this.address.unshift(res.data[i])
            //   } else {
            //     this.address.push(res.data[i])
            //   }
            // }

            this.newAddress = false
            this.isEdit = false
            this.noWay = true

            var k = [];
            if(this.cardList){
              k = this.cardList
            }
            this.getTex(k)
            this.resetAddressInp()
          }else{
            this.wrongMsg = '请添加收获地址'
            this.alertBox = true
          }
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
            // console.log(err)
          // }
        })
    },
    resetAddressInp() {
      // this.phoneNum = this.phoneJson[0]
      this.addressData = {
        lastname: '',
        firstname: '',
        mobile: '',
        email: '',
        checkEmail: '',
        address: '',
        zipCode: '',
        odMail: '',
        remark: ''
      }
      this.wrongInput = {
        firstname: false,
        lastname: false,
        mobile: false,
        email: false,
        checkEmail: false,
        address: false,
        zipCode: false,
        odMail: false,
        remark: false
      }
      this.resetAddress()
    },
    changeAddress(l) {
      this.addressIdx = l;
      
      var k = [];
      if(this.cardList){
        k = this.cardList
      }
      this.getTex(k)
    },
    setDefaultAddr(obj) {
      const setDefaultData = this.$helpers.cloneObject(obj)
      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({
            id: setDefaultData.id,
            is_default: 1
          })
        ),
        false
      )
      this.$axios
        .post('/web/member/address/edit',data)
        .then(res => {
          this.addressIdx = 0
          // console.log("设置默认地址",res)
          this.getAddress()
          this.resetAddressInp()
          this.$message({
            message: this.$t(`${lang}.setSuccess`),
            type: 'success'
          })
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })


    },
    createAddress() {
      // console.log('create')  /[^\d]/g,''
      if (this.addressData.lastname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.lastname = true
        return false
      }
      if (this.addressData.firstname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.firstname = true
        return false
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.addressData.mobile)) {
          this.wrongMsg = this.$t(`${lang}.wip2`)
          this.alertBox = true
          this.wrongInput.mobile = true
          return false
        }
      }
      if (!RegTelephone.test(this.addressData.mobile)) {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }
      // if (
      //   !RegMobile.test(this.addressData.mobile) &&
      //   !RegTelephone.test(this.addressData.mobile)
      // ) {
      //   this.wrongMsg = this.$t(`${lang}.wip2`)
      //   this.alertBox = true
      //   this.wrongInput.mobile = true
      //   return false
      // }
      // if (!Email.test(this.addressData.email)) {
      //   this.wrongMsg = this.$t(`${lang}.wip3`)
      //   this.alertBox = true
      //   this.wrongInput.email = true
      //   return false
      // }
      // if (this.addressData.email !== this.addressData.checkEmail) {
      //   this.wrongMsg = this.$t(`${lang}.wip3`)
      //   this.alertBox = true
      //   this.wrongInput.checkEmail = true
      //   return false
      // }
      if (!this.country.areaId) {
        this.wrongMsg = this.$t(`${lang}.wip4`)
        this.alertBox = true
        return false
      }
      if (!this.addressData.address_details) {
        this.wrongMsg = this.$t(`${lang}.wip5`)
        this.alertBox = true
        this.wrongInput.address_details = true
        return false
      }
      const data = {
        firstname: this.addressData.firstname,
        lastname: this.addressData.lastname,
        mobile_code: this.phoneNum.phone_code,
        mobile: this.addressData.mobile,
        email: this.addressData.email,
        country_id: this.country.areaId,
        province_id: this.province.areaId,
        city_id: this.city.areaId,
        address_details: this.addressData.address_details,
        zip_code: this.addressData.zip_code,
        is_default: 0
      }

      if(this.address.length == 0){
        data.is_default = 1
      }

      this.$axios
        .post('/web/member/address/add', data)
        .then(res => {
          this.$message({
            message: this.$t(`${lang}.success`),
            type: 'success'
          })

          if(this.address.length > 0){
            this.addressIdx = 1
          }else{
            this.addressIdx = 0
          }

          this.getAddress()
          this.resetAddressInp()
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    // 繁体
    createAddress1() {
      // console.log('create')
      if (this.addressData.firstname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.firstname = true
        return false
      }
      if (this.addressData.lastname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.lastname = true
        return false
      }
      if (this.addressData.mobile === '') {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.addressData.mobile)) {
          this.wrongMsg = this.$t(`${lang}.wip2`)
          this.alertBox = true
          this.wrongInput.mobile = true
          return false
        }
      }
      if (!RegMobile.test(this.addressData.mobile)) {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }
      // if (
      //   !RegMobile.test(this.addressData.mobile) &&
      //   !RegTelephone.test(this.addressData.mobile)
      // ) {
      //   this.wrongMsg = this.$t(`${lang}.wip2`)
      //   this.alertBox = true
      //   this.wrongInput.mobile = true
      //   return false
      // }
      if (!Email.test(this.addressData.email)) {
        this.wrongMsg = this.$t(`${lang}.wip3`)
        this.alertBox = true
        this.wrongInput.email = true
        return false
      }
      if (this.addressData.email !== this.addressData.checkEmail) {
        this.wrongMsg = this.$t(`${lang}.wip3`)
        this.alertBox = true
        this.wrongInput.checkEmail = true
        return false
      }
      if (!this.country.areaId) {
        this.wrongMsg = this.$t(`${lang}.wip4`)
        this.alertBox = true
        return false
      }
      if (!this.addressData.address_details) {
        this.wrongMsg = this.$t(`${lang}.wip5`)
        this.alertBox = true
        this.wrongInput.address_details = true
        return false
      }
      const data = {
        firstname: this.addressData.firstname,
        lastname: this.addressData.lastname,
        mobile_code: this.phoneNum.phone_code,
        mobile: this.addressData.mobile,
        email: this.addressData.email,
        country_id: this.country.areaId,
        province_id: this.province.areaId,
        city_id: this.city.areaId,
        address_details: this.addressData.address_details,
        zip_code: this.addressData.zip_code,
        is_default: 0
      }

      if(this.address.length == 0){
        data.is_default = 1
      }

      this.$axios
        .post('/web/member/address/add', data)
        .then(res => {
          // console.log("添加地址",res)
          this.$message({
            message: this.$t(`${lang}.success`),
            type: 'success'
          })

          if(this.address.length > 0){
            this.addressIdx = 1
          }else{
            this.addressIdx = 0
          }

          this.getAddress()
          this.resetAddressInp()
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    changeAddressInfo(obj) {
      // 点击修改滚顶到地址编辑模块
      document.getElementById('addbox').scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: 'smooth'
      })
      // console.log('需要修改的对象：', obj);
      this.isEdit = true
      const data = this.$helpers.cloneObject(obj)
      if(data.zip_code == null){
        data.zip_code = ''
      }
      this.addressData = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        mobile: data.mobile,
        email: data.email,
        checkEmail: data.email,
        country_id: data.country_id,
        province_id: data.province_id,
        city_id: data.city_id,
        address_details: data.address_details,
        zip_code: data.zip_code,
        is_default: data.is_default
      }
      // console.log("code",this.addressData)
      const code = data.mobile_code.split('+').reverse()
      JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
        if (o.phone_code === '+' + code[0]) {
          this.phoneNum = o
        }
      })
      const setAddr = new Promise((resolve, reject) => {
        this.setAddress(data)
        resolve()
      })
      setAddr.then(() => {
        // console.log('赋值后的B：', this.addressData);
      })
    },
    saveAddress1() {
      if (this.addressData.lastname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.lastname = true
        return false
      }
      if (this.addressData.firstname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.firstname = true
        return false
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.addressData.mobile)) {
          this.wrongMsg = this.$t(`${lang}.wip2`)
          this.alertBox = true
          this.wrongInput.mobile = true
          return false
        }
      }
      if (!RegTelephone.test(this.addressData.mobile)) {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }

      // if (
      //   !RegMobile.test(this.addressData.mobile) &&
      //   !RegTelephone.test(this.addressData.mobile)
      // ) {
      //   this.wrongMsg = this.$t(`${lang}.wip2`)
      //   this.alertBox = true
      //   this.wrongInput.mobile = true
      //   return false
      // }
      // if (!Email.test(this.addressData.email)) {
      //   this.wrongMsg = this.$t(`${lang}.wip3`)
      //   this.alertBox = true
      //   this.wrongInput.email = true
      //   return false
      // }
      // if (this.addressData.email !== this.addressData.checkEmail) {
      //   this.wrongMsg = this.$t(`${lang}.wip3`)
      //   this.alertBox = true
      //   this.wrongInput.checkEmail = true
      //   return false
      // }

      if (!this.country.areaId) {
        this.wrongMsg = this.$t(`${lang}.wip4`)
        this.alertBox = true
        return false
      }
      if (!this.addressData.address_details) {
        this.wrongMsg = this.$t(`${lang}.wip5`)
        this.alertBox = true
        this.wrongInput.address_details = true
        return false
      }
      if(this.city.areaId == ''){
        this.city.areaId = '0'
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({
            id: this.addressData.id,
            firstname: this.addressData.firstname,
            lastname: this.addressData.lastname,
            mobile_code: this.phoneNum.phone_code,
            mobile: this.addressData.mobile,
            email: this.addressData.email,
            country_id: this.country.areaId,
            province_id: this.province.areaId,
            city_id: this.city.areaId,
            address_details: this.addressData.address_details,
            zip_code: this.addressData.zip_code,
            is_default: this.addressData.is_default
          })
        ),
        false
      )
      this.$axios
        .post('/web/member/address/edit',data)
        .then(res => {
          // console.log("修改地址",res)
          this.getAddress()
          this.resetAddressInp()
          this.$message({
            message: this.$t(`${lang}.msg3`),
            type: 'success'
          })
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    // 繁体
    saveAddress() {
      // console.log('save')
      if (this.addressData.firstname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.firstname = true
        return false
      }
      if (this.addressData.lastname === '') {
        this.wrongMsg = this.$t(`${lang}.wip1`)
        this.alertBox = true
        this.wrongInput.lastname = true
        return false
      }
      if (this.addressData.mobile === '') {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.addressData.mobile)) {
          this.wrongMsg = this.$t(`${lang}.wip2`)
          this.alertBox = true
          this.wrongInput.mobile = true
          return false
        }
      }
      if (!RegMobile.test(this.addressData.mobile)) {
        this.wrongMsg = this.$t(`${lang}.wip2`)
        this.alertBox = true
        this.wrongInput.mobile = true
        return false
      }
      // if (
      //   !RegMobile.test(this.addressData.mobile) &&
      //   !RegTelephone.test(this.addressData.mobile)
      // ) {
      //   this.wrongMsg = this.$t(`${lang}.wip2`)
      //   this.alertBox = true
      //   this.wrongInput.mobile = true
      //   return false
      // }
      if (!Email.test(this.addressData.email)) {
        this.wrongMsg = this.$t(`${lang}.wip3`)
        this.alertBox = true
        this.wrongInput.email = true
        return false
      }
      if (this.addressData.email !== this.addressData.checkEmail) {
        this.wrongMsg = this.$t(`${lang}.wip3`)
        this.alertBox = true
        this.wrongInput.checkEmail = true
        return false
      }
      if (!this.country.areaId) {
        this.wrongMsg = this.$t(`${lang}.wip4`)
        this.alertBox = true
        return false
      }
      if (!this.addressData.address_details) {
        this.wrongMsg = this.$t(`${lang}.wip5`)
        this.alertBox = true
        this.wrongInput.address_details = true
        return false
      }
      if(this.city.areaId == ''){
        this.city.areaId = '0'
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({
            id: this.addressData.id,
            firstname: this.addressData.firstname,
            lastname: this.addressData.lastname,
            mobile_code: this.phoneNum.phone_code,
            mobile: this.addressData.mobile,
            email: this.addressData.email,
            country_id: this.country.areaId,
            province_id: this.province.areaId,
            city_id: this.city.areaId,
            address_details: this.addressData.address_details,
            zip_code: this.addressData.zip_code,
            is_default: this.addressData.is_default
          })
        ),
        false
      )
      this.$axios
        .post('/web/member/address/edit', data)
        .then(res => {
          // console.log("修改地址",res)
          this.getAddress()
          this.resetAddressInp()
          this.$message({
            message: this.$t(`${lang}.msg3`),
            type: 'success'
          })
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    deleteAddress() {
      this.confirmBox = false

      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ id: this.deleteAddressId })),
        false
      )
      this.$axios
        .post('/web/member/address/del', data)
        .then(res => {
          // console.log("删除地址",res)

          if(this.delIdx == 0){
            this.setDefaultAddr(this.address[this.address.length-1])
          }else{
            if(this.delIdx == this.addressIdx){
              this.addressIdx = 0
            }else if(this.delIdx < this.addressIdx){
              this.addressIdx -= 1
            }
          }

          this.getAddress()
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    fuckYouM(who) {
      this.die = false
      if (who === `mother`) {
        if (this.tooInp === '' && !this.isToo) {
          this.fuckYou = false
        } else {
          this.fuckYou = true
        }
      } else if (who === `father`) {
        if (this.coupon.couponId === '' && this.isToo) {
          this.fuckYou = false
        } else {
          this.fuckYou = true
        }
      }
    },
    removeCoupon() {
      this.tooInp = ''
      this.makeGay = false
      this.preferFee = 0
      // this.getTex()
      this.coupon = this.coupons[0]
      this.fuckYou = false
    },
    tooFocus() {
      this.isToo = false
      this.die = false
      this.tooInp = ''
      this.$refs.too.focus()
      this.coupon = this.coupons[0]
    },
    checkCount() {
      // if (this.address.length === 0) {
      //   this.$message({
      //     message: this.$t(`${lang}.msg1`),
      //     type: 'warning'
      //   })
      //   this.coupon = { couponCode: this.$t(`${lang}.coupon1`), couponId: '' }
      //   this.preferFee = 0
      //   this.tex.logisticsFee = 0
      //   this.tex.taxFee = 0
      //   this.tex.safeFee = 0
      //   this.tex.planDays = '1-12'
      //   return
      // }
      // if (
      //   (this.coupon.couponId === '' && this.isToo) ||
      //   (this.tooInp === '' && !this.isToo)
      // ) {
      //   return
      // }
      // let data = {}
      // if (this.isToo) {
      //   //  下拉选择
      //   data = {
      //     couponId: this.coupon.couponId,
      //     cartIds: this.pathTakeIds.join(',')
      //   }
      // } else {
      //   //  用户输入
      //   data = {
      //     couponCode: this.tooInp,
      //     cartIds: this.pathTakeIds.join(',')
      //   }
      // }
      // this.$axios
      //   .get('/web/order/getCouponAmount', { params: data })
      //   .then(res => {
      //     this.makeGay = true
      //     this.preferFee = res
      //     this.getTex()
      //   })
      //   .catch(err => {
      //     if (!err.response) {
      //       this.$message.error(err.message)
      //       this.preferFee = 0
      //       this.die = true
      //       this.familyDie = err.message
      //       this.getTex()
      //     } else {
      //       // console.log(err)
      //     }
      //   })
    },
    getCouponList() {
      // const data = this.$helpers.transformRequest(
      //   JSON.parse(
      //     JSON.stringify({
      //       cartIds: this.pathTakeIds.join(',')
      //     })
      //   ),
      //   false
      // )
      // this.$axios
      //   .post('/web/order/getCoupons', data)
      //   .then(res => {
      //     if (res) {
      //       this.coupons = res
      //       this.coupons.unshift({
      //         couponCode: this.$t(`${lang}.coupon1`),
      //         couponId: ''
      //       })
      //       this.coupon = {
      //         couponCode: this.$t(`${lang}.coupon1`),
      //         couponId: ''
      //       }
      //     } else {
      //       this.coupons = [{ couponCode: '- - -', couponId: '' }]
      //       this.coupon = { couponCode: '- - -', couponId: '' }
      //     }
      //   })
      //   .catch(err => {
      //     if (!err.response) {
      //       this.$message.error(err.message)
      //       this.coupons = [{ couponCode: '- - -', couponId: '' }]
      //       this.coupon = { couponCode: '- - -', couponId: '' }
      //     } else {
      //       // console.log(err)
      //     }
      //   })
    },
    getTex(k=[]) {
      const cards = k || [];
      const arr = [];
      var obj = {cart_id: '', coupon_id: ''};

      for (const i in this.good) {
        if (this.good[i].groupType === null) {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
         arr.push({...obj})
         obj.cart_id = '';
         obj.coupon_id = '';
        } else {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
          arr.push({...obj})
          obj.cart_id = '';
          obj.coupon_id = '';

          obj.cart_id = this.good[i].data[1].id
          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[1].coupon.discount.coupon_id
          }
          arr.push({...obj})
          obj.cart_id = '';
          obj.coupon_id = '';
        }

      }
      
      // console.log(778,arr)

      const datas={
        carts: arr,
        coupon_id: this.couponCodeR.couponId,
        cards: cards, 
        addressId: ''
      }
      
      if(this.addressIdx != -1){
        datas.addressId = this.address[this.addressIdx].id
      }else{
        datas.addressId = this.address[0].id
      }

      this.canSubmit = false
      this.$axios
        .post('/web/member/order/tax', datas)
        .then(res => {
          // console.log("tex",res)
          this.canSubmit = true
          this.tex = res.data

          if(res.data.cards !== undefined){
            this.useAmount = JSON.parse(JSON.stringify(res.data.cards));
          }

          this.ifShowCoupon = !!res.data.myCoupons.length

          this.orderTotalAmount = res.data.orderAmount;
          this.ultimatelyPay = res.data.payAmount;
          this.coinType = res.data.currency
          this.coinTypes.coin = res.data.currency;
          this.currency = res.data.currency

          this.couponAll = res.data.coupons;
          this.couponAlready = res.data.myCoupons;
        })
        .catch(err => {
          this.coupons = [{ couponCode: '- - -', couponId: '' }]
          this.coupon = { couponCode: '- - -', couponId: '' }
          this.canSubmit = false
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    createOrder() {
      var that = this;

      if (this.address.length == 0) {
        this.wrongMsg = this.$t(`${lang}.msg4`)
        this.alertBox = true
        return false

      }

      var address = {};
      if(this.addressIdx != -1){
        address = this.address[this.addressIdx]
      }else{
        address = this.address[0]
      }

      if(address.platforms[0] != this.platform){
        this.wrongMsg = this.$t(`${lang}.msg12`)
        this.alertBox = true
        return false
      }

      if (this.remark.length > 500) {
        this.wrongMsg = this.$t(`${lang}.msg6`)
        this.wrongInput.remark = true
        this.alertBox = true
        return false
      }
      let invoice = {}
      const arr = [];
      var obj = {cart_id: '', coupon_id: ''};
      for (const i in this.good) {
        if (this.good[i].groupType === null) {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
         arr.push({...obj})
         obj.cart_id = '';
         obj.coupon_id = '';

        } else {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
          arr.push({...obj})

          obj.cart_id = '';
          obj.coupon_id = '';
          obj.cart_id = this.good[i].data[1].id
          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[1].coupon.discount.coupon_id
          }
          arr.push({...obj})
          obj.cart_id = '';
          obj.coupon_id = '';
        }
      }

      if(this.iconShow ){
        invoice = this.invoice
      }
      // console.log("arr",arr)

      const data = {
        carts: arr,
        buyer_remark: this.remark,
        order_amount: this.tex.orderAmount,
        buyer_address_id: address.id,
        invoice:invoice,
        card: this.cardList,
        coupon_id: this.couponCodeR.couponId
      }
      // console.log("pppp",data)
      this.$axios
        .post('/web/member/order/create', data)
        .then(res => {
          // console.log("创建订单",res.data.orderAmount)
          if(res.data.payStatus == 1){
            that.$successMessage(that.$t(`${lang2}.submitSuccessfully`));
            that.$router.replace({
              path: '/account/orders',
            })
          }else{
            this.$store.dispatch('getCart')
            this.$router.replace({
              path: '/payment-options',
              query: {
                orderId: res.data.orderId,
                price: that.ultimatelyPay,
                coinType: res.data.coinType,
                priceHKD:res.data.payAmountHKD
              }
            })
          }
        })
        .catch(err => {
          if (!err.response) {
            var _this = this;
            _this.$errorMessage(err.message)
          } else {
            console.log(err)
          }
        })
    },
    createOrder1() {
      var that = this;

      if (this.address.length == 0) {
        this.wrongMsg = this.$t(`${lang}.msg4`)
        this.alertBox = true
        return false
      }

      var address = {};
      if(this.addressIdx != -1){
        address = this.address[this.addressIdx]
      }else{
        address = this.address[0]
      }

      if(address.platforms[0] != this.platform){
        this.wrongMsg = this.$t(`${lang}.msg12`)
        this.alertBox = true
        return false
      }

      // if (
      //   !Email.test(
      //     this.isSameEmail ? this.orderAddress.email : this.orderEmail
      //   )
      // ) {
      //   this.wrongMsg = this.$t(`${lang}.msg5`)
      //   this.wrongInput.odMail = true
      //   this.alertBox = true
      //   return false
      // }

      if (this.remark.length > 500) {
        this.wrongMsg = this.$t(`${lang}.msg6`)
        this.wrongInput.remark = true
        this.alertBox = true
        return false
      }

      let invoice = {};
      const arr = [];
      var obj = {cart_id: '', coupon_id: ''};
      for (const i in this.good) {
        if (this.good[i].groupType === null) {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
         arr.push({...obj})
         obj.cart_id = '';
         obj.coupon_id = '';

        } else {
          obj.cart_id = this.good[i].data[0].id
          if(this.good[i].data[0].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[0].coupon.discount.coupon_id
          }
          arr.push({...obj})
          obj.cart_id = '';
          obj.coupon_id = '';

          obj.cart_id = this.good[i].data[1].id
          if(this.good[i].data[1].coupon.hasOwnProperty('discount')){
            obj.coupon_id = this.good[i].data[1].coupon.discount.coupon_id
          }
          arr.push({...obj})
          obj.cart_id = '';
          obj.coupon_id = '';
        }
      }

      if(this.iconShow){
        invoice = this.invoice
      }
      // console.log("arr",arr)
      const data = {
        carts: arr,
        // allSend: this.isAllPack ? 1 : 2,
        buyer_remark: this.remark,
        order_amount: this.tex.orderAmount,
        buyer_address_id: address.id,
        invoice:invoice,
        card: this.cardList || '',
        coupon_id: this.couponCodeR.couponId
        // afterMail: this.isSameEmail
        // ? this.orderAddress.email
        // : this.orderEmail,
      }

      // console.log("pppp",data)
      this.$axios
        .post('/web/member/order/create', data)
        .then(res => {
          // console.log("创建订单",res.data.orderAmount)
          if(res.data.payStatus == 1){
            that.$successMessage(that.$t(`${lang2}.submitSuccessfully`));
            that.$router.replace({
              path: '/account/orders',
            })
          }else{
            this.$store.dispatch('getCart')
            this.$router.replace({
              path: '/payment-options',
              query: {
                orderId: res.data.orderId,
                price: that.ultimatelyPay,
                coinType: res.data.coinType,
                priceHKD:res.data.payAmountHKD
              }
            })
          }
        })
        .catch(err => {
          // if (!err.response) {
            this.$message.error(err.message)
          // } else {
          //   // console.log(err)
          // }
        })
    },
    // 添加购物卡
    useCard(){
      this.ifShowAddCard = true;
      if(this.cardList.length != 0){
        this.cardType = 2;
      }else{
        this.cardType = 1;
      }
    },
    // 关闭弹窗
    closeCardPop(k){
      this.ifShowAddCard = false;

      if(k !== true){
        this.cardList = k;
        this.getTex(k);

        if(k.length){
          this.cardType = 2
        }else{
          this.cardType = 1
        }
      }

    },
     keydown(){
       var reg = /^[0-9a-zA-Z\-]{1}$/;
       var k = this.addressData.zip_code.slice(-1);
       if(!reg.test(k)){
         this.addressData.zip_code = this.addressData.zip_code.slice(0,-1)
       }
     },
     mobileIpt(){
       if(this.pnN == '中国' || this.pnN == '中國' || this.pnN == 'China'){
         this.mobileMax = 11
       }else{
         this.mobileMax = 20
       }
     },
     closeCo(g){
       this.showUseCoupon = false;
      console.log("g",g)
       if(g && g!==-1){
         this.couponCodeR = JSON.parse(JSON.stringify(g));
         console.log(this.couponCodeR)
         var k = [];
         if(this.cardList){
           k = this.cardList
         }
         this.getTex(k);
       }else if(!g){
         this.couponCodeR = {}
         this.getTex();
       }
     } 

  }
}
</script>

<style lang="less" scoped>
.amount{
  margin-bottom: 8px!important;
}
.point{
  text-align: right;
  margin-bottom: 8px;
  color:#999;
}
.star{
  color: #c28c8c;
}
.clf::after{
  display: block;
  content: ' ';
  clear: both;
  height: 0;
  opacity: 0;
  visibility: hidden;
}
div {
  box-sizing: border-box;
}
.order {
  max-width: 1360px;
  min-width: 1200px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  background: rgba(248, 248, 248, 1);
  padding: 33px 30px 60px;
  box-sizing: border-box;
  .order-step {
    max-width: 1300px;
    min-width: 1200px;
    height: 182px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    position: relative;
    justify-content: center;
    padding-top: 36px;
    .one-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-right: 250-31-31px;
      position: relative;
      z-index: 9;
      .step-img {
        width: 58px;
        height: 58px;
        background: rgba(225, 225, 225, 1);
        border: 4px solid rgba(217, 217, 217, 1);
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 22px;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 4px;
        img {
          position: absolute;
          top: -4px;
          left: -4px;
          width: 58px;
          height: 58px;
          display: block;
        }
        span {
          position: relative;
          z-index: 10;
        }
      }
      .step-arrow {
        width: 12px;
        height: 6px;
        margin-bottom: 9px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .step-title {
        font-size: 18px;
        color: #666;
        line-height: 18px;
        margin-bottom: 10px;
      }
      .step-desc {
        color: #666;
        line-height: 16px;
        width: 121px;
        text-align: center;
        font-size: 12px;
      }
    }
    .one-step:nth-child(3) {
      margin-right: 0;
    }
    .step-line {
      position: absolute;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      width: 250 * 2+58+20px;
      height: 2px;
      background: rgba(231, 231, 231, 1);
      z-index: 0;
    }
  }
  .user-info {
    position: relative;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    line-height: 17px;
    font-size: 16px;
    color: #333;
    margin: 21px 0 18px 60px;
    .iconrentou {
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      color: #cfa48d;
      left: -23px;
    }
  }
  .address-box {
    position: relative;
    max-width: 1300px;
    min-width: 1200px;
    overflow: hidden;
    transition: 0.3s linear;
    margin-bottom: 22px;
    box-sizing: border-box;
    .addr-blocks {
      max-width: 1300px;
      min-width: 1200px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      .addr-block {
        position: relative;
        width: 49%;
        height: 250px;
        padding: 25px 30px 0;
        box-sizing: border-box;
        margin-bottom: 20px;
        border: 1px solid rgba(230, 230, 230, 1);
        background-color: #ffffff;
        box-sizing: border-box;
        .addr-title {
          max-width: 82%;
          display: flex;
          align-items: flex-end;
          margin-bottom: 10px;
          div {
            font-size: 20px;
            color: #333;
          }
          div:nth-child(2) {
            font-size: 14px;
            margin-left: 7px;
          }
        }
        .addr-user {
          max-width: 82%;
          display: flex;
          font-size: 22px;
          align-items: center;
          color: #333;
          div:nth-child(1) {
            min-height: 22px;
            max-height: 22 * 2px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          div:nth-child(2) {
            font-size: 16px;
            margin-left: 10px;
          }
        }
        .addr-address {
          max-width: 82%;
          color: #333;
          font-size: 14px;
          /*width: 220px;*/
          min-height: 16px;
          max-height: 16 * 2px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        .addr-user-phone {
          max-width: 82%;
          display: flex;
          align-items: flex-end;
          font-family: twCenMt;
          font-size: 18px;
          color: #333;
          margin-bottom: 5px;
          div:nth-child(1) {
            font-size: 14px;
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
        .iconlajitong {
          position: absolute;
          bottom: 36px;
          right: 28px;
          display: block;
          font-size: 21px;
          color: #999;
          z-index: 39;
          cursor: pointer;
        }
        .addr-btn {
          position: absolute;
          /*width: 50px;*/
          padding: 0 10px;
          height: 22px;
          line-height: 20px;
          border: 1px solid #aa8a7b;
          border-radius: 4px;
          background: rgba(251, 247, 245, 1);
          color: #aa8a7b;
          text-align: center;
          cursor: pointer;
          top: 30px;
          right: 28px;
          z-index: 40;
        }
        .mrAdd{
          position: absolute;
          text-align: center;
          cursor: pointer;
          background: #fff;
          top: 0px;
          right: 28px;
          z-index: 40;
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
        border: 1px solid rgba(212, 196, 188, 1);
      }
    }
  }
  .new-address {
    max-width: 1300px;
    min-width: 1200px;
    background-color: #ffffff;
    position: relative;
    margin: 0 0 22px;
    overflow: hidden;
    transition: 0.3s linear;
    box-sizing: border-box;
    .new-address-title {
      height: 20px;
      display: flex;
      align-items: flex-end;
      margin-bottom: 19px;
      .na-line {
        width: 4px;
        height: 20px;
        background: rgba(207, 164, 141, 1);
        border-radius: 2px;
        margin-right: 8px;
      }
      .na-title {
        font-size: 20px;
        color: #333;
        line-height: 20px;
        margin-right: 11px;
      }
      .na-little-word {
        font-size: 14px;
        line-height: 14px;
        color: #c28c8c;
      }
    }
    .new-address-input {
      // width: 1300-51-36px;
      display: flex;
      justify-content: space-between;
      .left-side,
      .right-side {
        width: 44%;
        height: 176+80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .input-line {
        // width: 545px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label {
          width: 20%;
          font-size: 14px;
          color: #333;
        }
        .input-box {
          width: 80%;
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 4px;
          position: relative;
          color: #111;
          input[type='text'] {
            width: 100%;
            height: 38px;
            line-height: 38px;
            display: block;
            -webkit-appearance: none;
            border-radius: 4px;
            border: 0;
            outline: 0;
            font-size: 16px;
            padding: 0 13px;
            box-sizing: border-box;
          }
          textarea {
            width: 100%;
            height: 58px;
            line-height: 29px;
            display: block;
            -webkit-appearance: none;
            border-radius: 4px;
            border: 0;
            outline: 0;
            font-size: 16px;
            padding: 0 13px;
            resize: none;
          }
          input[type='address'] {
            width: 100%;
            height: 32px;
            line-height: 32px;
            display: block;
            -webkit-appearance: none;
            border-radius: 4px;
            border: 0;
            outline: 0;
            font-size: 14px;
            padding: 0 13px;
            background: rgba(249, 249, 249, 1);
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
          .iconxiala {
            position: absolute;
            font-size: 12px;
            width: 12px;
            height: 12px;
            line-height: 12px;
            display: block;
            color: #aa8a7b;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
          }
          .wrong-input {
            color: #d9423e;
          }
          .wrong-alert {
            position: absolute;
            width: 109+7px;
            height: 23px;
            line-height: 23px;
            text-align: center;
            color: #d9423e;
            background-image: url('../../../static/order/wrong-input.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            top: 9px;
            right: 19px;
          }
        }
        .tel-special {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;
          .tel {
            width: 65%;
            input[type='text'] {
              width: 288px;
            }
          }
          .tel-area {
            width: 30%;
            height: 40px;
            background: rgba(248, 248, 248, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            input {
              width: 100%;
              height: 100%;
              line-height: 38px;
              text-align: left;
              background: rgba(248, 248, 248, 1);
              -webkit-appearance: none;
              border: 0;
              padding: 0 28px 0 14px;
              box-sizing: border-box;
              margin: 0;
              outline: 0;
            }
            select {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
            .iconxiala {
              position: absolute;
              font-size: 12px;
              width: 12px;
              height: 12px;
              line-height: 12px;
              display: block;
              color: #aa8a7b;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        .border-change {
          border: 1px solid rgba(170, 138, 123, 1);
        }
        .border-wrong {
          border: 1px solid #d9423e;
        }
      }
    }
    .new-address-btn {
      position: absolute;
      top: 15px;
      right: 51px;
      width: 160px;
      height: 30px;
      line-height: 30px;
      background: rgba(176, 160, 155, 1);
      text-align: center;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .close-new-address-btn {
      position: absolute;
      top: 15px;
      right: 231px;
      width: 160px;
      height: 30px;
      line-height: 30px;
      /*background:rgba(176,160,155,1);*/
      border: 1px solid rgba(176, 160, 155, 1);
      text-align: center;
      color: rgba(176, 160, 155, 1);
      font-size: 14px;
      cursor: pointer;
    }
  }
  .is-new-address {
    width: 480px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border: 1px dotted rgba(221, 221, 221, 1);
    font-size: 18px;
    color: #333;
    text-align: center;
    line-height: 50px;
    margin: 0 auto 20px;
    cursor: pointer;
  }
  .cart-top-bar {
    min-width: 1200px;
    height: 40px;
    line-height: 40px;
    background: rgba(255, 255, 255, 1);
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;
    padding-left: 50px;
    text-align: center;
    span:nth-child(1) {
      width: 60%;
      text-align: left;
    }
    span:nth-child(2){
      width: 6.7%;
    }
    span:nth-child(3),
    span:nth-child(4) {
      width: 11.5%;
    }
  }
  .cart-goods {
    min-width: 1200px;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 17px;
    .finished {
      max-width: 1300px;
      min-width: 1200px;
      height: 179px;
      display: flex;
      align-items: center;
      .cart-radio {
        width: 49px;
        height: 178px;
      }
      .good-info {
        position: relative;
        min-width: 1200px;
        height: 179px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        display: flex;
        align-items: center;
        .good-img {
          position: relative;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 2px;
          display: flex;
          align-items: center;
          margin-right: 20px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .good-desc {
          width: 269px;
          line-height: 18px;
          margin-right: 71px;
          div:nth-child(1) {
            max-height: 18 * 3px;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*word-break: break-all;*/
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          div:nth-child(2) {
            color: #999;
          }
        }
        .good-information {
          width: 185px;
          margin-right: 83px;
          .infos {
            width: 100%;
            display: flex;
            margin-bottom: 10px;
            div:nth-child(1) {
              width: 50%;
              color: #666;
            }
            div:nth-child(2) {
              width: 50%;
              color: #111;
            }
          }
        }
        .good-description {
          width: 185px;
          line-height: 20px;
          max-height: 60px;
          color: #666;
          margin-right: 83px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .good-num {
          width: 60px;
          text-align: center;
          font-size: 18px;
          color: #333;
          margin-right: 217-60-83px;
        }
        .good-price {
          font-family: twCenMt;
          font-size: 18px;
          color: #f29b87;
          width: 130px;
          text-align: center;
        }
        .good-btn {
          width: 80px;
          height: 21px;
          line-height: 21px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div:nth-child(2) {
            width: 1px;
            height: 21px;
            background-color: rgba(166, 166, 166, 1);
          }
          i {
            width: 18px;
            display: block;
            height: 21px;
            line-height: 21px;
            color: #999999;
            font-size: 20px;
            cursor: pointer;
          }
          div:nth-child(1) {
            cursor: pointer;
            width: 22px;
            height: 21px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .customization {
      max-width: 1300px;
      min-width: 1200px;
      height: 282px;
      display: flex;
      align-items: center;
      position: relative;
      .cart-radio {
        width: 49px;
        height: 282px;
      }
      .good-info {
        position: relative;
        min-width: 1200px;
        height: 281px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        .good-info-dotted {
          position: absolute;
          left: 142px;
          top: 140px;
          width: 956px;
          height: 1px;
          padding-left: 20px;
          border-bottom: 1px dotted rgba(221, 221, 221, 1);
        }
        .good-info-line {
          min-width: 1200px;
          height: 140px;
          display: flex;
          align-items: center;
          .good-img {
            position: relative;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 2px;
            display: flex;
            align-items: center;
            margin-right: 40px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .good-desc {
            width: 269px;
            line-height: 18px;
            margin-right: 71px;
            div:nth-child(1) {
              max-height: 18 * 3px;
              margin-bottom: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              word-break: break-all;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            div:nth-child(2) {
              color: #999;
            }
          }
          .good-information {
            width: 185px;
            margin-right: 83px;
            .infos {
              width: 100%;
              display: flex;
              margin-bottom: 21px;
              div:nth-child(1) {
                width: 50%;
                color: #666;
              }
              div:nth-child(2) {
                width: 50%;
                color: #111;
              }
            }
          }
          .good-description {
            width: 185px;
            line-height: 20px;
            max-height: 60px;
            color: #666;
            margin-right: 83px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .good-num {
            width: 60px;
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-right: 217-60-83px;
          }
          .good-price {
            font-family: twCenMt;
            font-size: 18px;
            color: #f29b87;
            width: 130px;
            text-align: center;
          }
        }
        .good-btn {
          width: 80px;
          height: 21px;
          line-height: 21px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div:nth-child(2) {
            width: 1px;
            height: 21px;
            background-color: rgba(166, 166, 166, 1);
          }
          i {
            width: 18px;
            display: block;
            height: 21px;
            line-height: 21px;
            color: #999999;
            font-size: 20px;
            cursor: pointer;
          }
          div:nth-child(1) {
            cursor: pointer;
            width: 22px;
            height: 21px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .good-dingzhi-logo {
        position: absolute;
        width: 200px;
        height: 24px;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        span {
          color: #999;
          font-size: 14px;
          line-height: 14px;
        }
        i {
          display: block;
          color: #aaa;
        }
      }
    }
    .couple {
      // width: 1300px;
      height: 174 * 2+2px;
      display: flex;
      align-items: center;
      .cart-radio {
        width: 49px;
        height: 174 * 2+2px;
      }
      .good-info {
        position: relative;
        width: 1200px;
        height: 174 * 2+2px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        display: flex;
        align-items: center;
        .good-img {
          position: relative;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 2px;
          display: flex;
          align-items: center;
          margin-right: 20px;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .good-desc {
          width: 269px;
          line-height: 18px;
          margin-right: 71px;
          div:nth-child(1) {
            max-height: 18 * 3px;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          div:nth-child(2) {
            color: #999;
          }
        }
        .couple-rings {
          position: relative;
          .one-person {
            height: 174px;
            display: flex;
            align-items: center;
            .good-information {
              width: 185px;
              margin-right: 83px;
              .infos {
                width: 100%;
                display: flex;
                margin-bottom: 10px;
                div:nth-child(1) {
                  width: 50%;
                  color: #666;
                }
                div:nth-child(2) {
                  width: 50%;
                  color: #111;
                }
              }
            }
            .good-num {
              width: 60px;
              text-align: center;
              font-size: 18px;
              color: #333;
              margin-right: 217-60-83px;
            }
            .good-price {
              font-family: twCenMt;
              font-size: 18px;
              color: #f29b87;
              width: 130px;
              text-align: center;
            }
          }
          .couple-line {
            position: absolute;
            top: 173px;
            left: -56px;
            width: 673px;
            height: 1px;
            border-bottom: 1px dotted rgba(221, 221, 221, 1);
          }
        }
        .good-btn {
          width: 80px;
          height: 21px;
          line-height: 21px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div:nth-child(2) {
            width: 1px;
            height: 21px;
            background-color: rgba(166, 166, 166, 1);
          }
          i {
            width: 18px;
            display: block;
            height: 21px;
            line-height: 21px;
            color: #999999;
            font-size: 20px;
            cursor: pointer;
          }
          div:nth-child(1) {
            cursor: pointer;
            width: 22px;
            height: 21px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .img-bord {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      background-color: rgba(102, 102, 102, 0.4);
    }
    .lose-btn {
      width: 101px;
      height: 21px;
      line-height: 21px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      div:nth-child(2) {
        width: 1px;
        height: 21px;
        background-color: rgba(166, 166, 166, 1);
      }
      i {
        display: block;
        width: 18px;
        height: 21px;
        line-height: 21px;
        color: #999999;
        font-size: 20px;
        cursor: pointer;
      }
      div:nth-child(1) {
        width: 43px;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        color: #aa8a7b;
        cursor: pointer;
      }
    }
  }
  .order-info {
    position: relative;
    max-width: 1300px;
    min-width: 1200px;
    min-height: 544px;
    background: rgba(255, 255, 255, 1);
    padding: 30px 50px 80px 35px;
    box-sizing: border-box;

    .left-info {
      float: left;
      width: 48%;
      .new-address-title {
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 25px;
        .na-line {
          width: 4px;
          height: 20px;
          background: rgba(207, 164, 141, 1);
          border-radius: 2px;
          margin-right: 8px;
        }
        .na-title {
          font-size: 20px;
          color: #333;
          line-height: 20px;
          margin-right: 11px;
        }
        .na-little-word {
          font-size: 14px;
          line-height: 14px;
          color: #c28c8c;
        }
      }
      .is-pack {
        display: flex;
        align-items: center;
        margin-bottom: 22px;
        padding-left: 10px;
        div {
          font-size: 14px;
          color: #333;
          line-height: 16px;
          span:nth-child(2) {
            color: #999;
          }
        }
      }
      .send-time {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        padding-left: 10px;
        .send-left {
          div:nth-child(1) {
            line-height: 14px;
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
          }
          div:nth-child(2) {
            line-height: 12px;
            font-size: 12px;
            color: #cfa48d;
            cursor: pointer;
            a {
              color: #cfa48d;
            }
          }
        }
        .send-right {
          line-height: 18px;
          font-size: 18px;
          color: #333;
        }
      }
      .after-sale-email {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 14px;
        padding-left: 10px;
        margin-bottom: 9px;
        div:nth-child(1) {
          color: #333;
        }
        div:nth-child(2) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .after-sale-email-input {
        width: 540px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 4px;
        margin-left: 10px;
        input {
          width: 538px;
          height: 38px;
          line-height: 38px;
          padding: 0 11px;
          font-size: 14px;
          color: #1b1b1b;
          -webkit-appearance: none;
          border: 0;
          outline: 0;
          border-radius: 4px;
        }
        .wrong-input {
          color: #d9423e;
        }
      }
      .border-wrong {
        border: 1px solid #d9423e;
      }
      .message {
        width: 100%;
        padding-left: 10px;
        margin-top: 19px;
        font-size: 14px;
        color: #333333;
        position: relative;
        textarea {
          width: 100%;
          height: 80px;
          padding: 0 12px;
          color: #111;
          -webkit-appearance: none;
          outline: 0;
          resize: none;
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 4px;
          margin: 9px 0 71px;
        }
        .border-change {
          border: 1px solid rgba(170, 138, 123, 1);
        }
        .tex-count{
          position: absolute;
          right:0;
          bottom: 50px;
        }

        .color-red{
          color: red;
        }
      }
      .border-change {
        border: 1px solid rgba(170, 138, 123, 1);
      }
      .free-check {
        width: 16px;
        height: 16px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        cursor: pointer;
        margin-right: 9px;
      }
      .icongou {
        display: block;
        width: 16px;
        height: 16px;
        background: rgba(170, 138, 123, 1);
        border-radius: 2px;
        color: #fff;
        font-size: 16px;
        line-height: 16px;
        cursor: pointer;
        margin-right: 9px;
      }
    }
    .right-info {
      float: right;
      width: 48%;
      .coupon {
        /*background: pink;*/
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
        position: relative;
        .too-input {
          width: 390px;
          height: 28px;
          line-height: 28px;
          position: absolute;
          top: 0;
          left: 0;
          -webkit-appearance: none;
          border: 1px solid rgba(221, 221, 221, 1);
          outline: 0;
          padding: 0 20px 0 60px;
          background: rgba(249, 249, 249, 1);
          text-align: right;
        }
        .too-tell {
          color: #333;
          font-size: 14px;
          width: 390px;
          height: 28px;
          line-height: 28px;
          padding: 0 20px 0 60px;
          text-align: right;
          position: absolute;
          background: rgba(249, 249, 249, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          top: 0;
          left: 0;
          z-index: 3;
        }
        .iconxiala {
          position: absolute;
          display: block;
          color: #aa8a7b;
          font-size: 12px;
          top: 7px;
          left: 21px;
          z-index: 6;
        }
        .too-select {
          position: absolute;
          display: block;
          width: 12px;
          height: 13px;
          top: 7px;
          left: 21px;
          opacity: 0;
          z-index: 7;
        }
        .too-btn {
          width: 100px;
          height: 28px;
          background: rgba(170, 138, 123, 1);
          text-align: center;
          line-height: 28px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 390+20px;
        }
        .too-die {
          color: #d9423e;
          font-size: 12px;
          position: absolute;
          left: 0;
          top: 8+28px;
        }
        .too-wenhao {
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background: rgba(221, 189, 170, 1);
          border-radius: 50%;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: 6px;
          right: 0;
          cursor: pointer;
          .too-gay {
            display: none;
            position: absolute;
            width: 535px;
            /*height:102px;*/
            top: 4+16px;
            right: -10px;
            background-image: url('../../../static/order/too-big.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: 8;
            color: #000;
            text-align: left;
            padding: 40px;
          }
        }
        .too-wenhao:hover .too-gay {
          display: block;
        }
      }
      .new-address-title {
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 30px;
        .na-line {
          width: 4px;
          height: 20px;
          background: rgba(207, 164, 141, 1);
          border-radius: 2px;
          margin-right: 8px;
        }
        .na-title {
          font-size: 20px;
          color: #333;
          line-height: 20px;
          margin-right: 11px;
        }
      }
      .price-detail {
        width: 100%;
        padding-left: 15px;
        font-size: 12px;
        color: #656565;
        .detail-line {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
          div:nth-child(1) {
            position: relative;
          }
          .hkd {
            font-family: twCenMt;
            font-size: 14px;
            color: #111;
          }
          .color-pink {
            color: #f29b87;
          }
          .color-gold {
            color: #aa8a7b;
          }
          .price-big {
            font-size: 16px;
          }
          .question {
            position: absolute;
            left: 75px;
            top: 2px;
            width: 16px;
            height: 16px;
            background: rgba(221, 189, 170, 1);
            border-radius: 50%;
            color: #ffffff;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            cursor: pointer;
            a {
              color: #ffffff;
            }
            .answer {
              display: none;
              width: 223+9px;
              height: 93px;
              color: #666;
              font-size: 12px;
              background-image: url('../../../static/order/answer.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              position: absolute;
              left: 20px;
              top: -33px;
              padding: 30px 10px 30px 20px;
              text-align: left;
              z-index: 9;
            }
          }
          .question:hover .answer {
            display: block;
          }
        }
      }
    }
    .info-line {
      // position: absolute;
      width: 1200px;
      height: 1px;
      background: rgba(221, 221, 221, 1);
      display: block;
      // top: 406px;
      // left: 50px;
      margin-top: 108px;
    }
    .buy-btn {
      // position: absolute;
      // bottom: 60px;
      // left: 410px;
      width: 480px;
      height: 40px;
      background: rgba(51, 51, 51, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      margin: 50px auto 0;
      cursor: pointer;
      span:nth-child(1) {
        font-family: twCenMt;
        margin-right: 50px;
      }
    }
  }
}
.invoice{
  .btn_type{
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    button{
      width: 145px;
      height: 35px;
      border-radius: 4px;
      color:#ccc;
      border:1px solid #ddd;
    }
    .active{
      border:1px solid #8b766c;
      color:#000;
    }
  }
  .empltyErr{
    // margin: 10px 0;
    color:red;
    margin-left: 142px;
    font-size: 12px;
  }
  .emplty{
    margin: 10px 0;
    color:red;
    font-size: 12px;
  }
  .gou-img{
      // display: flex;
      // justify-content: center;
      width: 455px;
      padding: 0px 180px;
      img{
        width: 75px;
        height: 75px;
      }
  }
  .invoice-btn{
    margin-left: 20px;
    div{
      display: flex;
    }
    span{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
    }
  }
  .tips{
    margin: 20px 0;
    font-size: 12px;
  }
  .btn{
    text-align: center;
    margin-top: 50px;
    button{
      width: 120px;
      height: 35px;
      background: #8b766c;
      border-radius: 4px;
      color:#fff;
    }
  }
  .title{
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }
  .invoice-box{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 99999999;
    top: 0;
    left: 0;
    .email-box{
      height: 60px;
    }
    .msg{
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      .msgbox{
        border-radius: 8px;
        padding: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 520px;
        // height: 80%;
        // height: 695px;
        // overflow-y: scroll;
        background: rgba(255, 255, 255, 1);
        .cha{
          text-align: right;
          i{
            font-size: 30px;
          }
        }
      }
    }
  }
  .total{
    margin-top: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    .totle-price{
      width: 70%;
      color: #f29b87;
    }
  }
  .base-info-line {
      display: flex;
      font-size: 14px;
      color: #333;
      padding-top: 15px;
      // margin-bottom: 30px;
      .base-info-line-title {
        width: 110px;
        margin-right: 20px;
      }
      .base-name-input {
        display: block;
        width: 190px;
        height: 41px;
        line-height: 41px;
        -webkit-appearance: none;
        outline: 0;
        padding: 0;
        margin: 0 27px 0 0;
        border: 0;
        border-bottom: 1px solid #999;
        color: #999;
        font-size: 14px;
      }
      .gender-choose,
      .marriage-choose {
        // display: flex;
        // align-items: center;
        margin-left: 10px;
        .single-radio {
          width: 160px;
          input[type='radio'] {
            width: 14px;
            height: 14px;
            margin-right: 10px;
            -webkit-appearance: radio;
          }
          span {
            cursor: pointer;
          }
        }
      }
      .birthday-choose {
        display: flex;
        align-items: center;
        .single-radio {
          width: 120px;
          position: relative;
          margin-right: 30px;
          border-bottom: 1px solid rgba(153, 153, 153, 1);
          font-size: 14px;
          color: #333;
          span:nth-child(1) {
            display: inline-block;
          }
          span:nth-child(2) {
            width: 50px;
            display: inline-block;
            text-align: center;
            color: #999;
            font-size: 14px;
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
          select {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
          }
          .once-tell {
            /*width: max-content;*/
            white-space: nowrap;
            position: absolute;
            left: 0;
            bottom: -10px;
            transform: translateY(100%);
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  .input-line {
    padding: 10px 0;
    width: 455px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .label {
      font-size: 14px;
      color: #333;
    }
    .input-box {
      width: 315px;
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 4px;
      position: relative;
      color: #111;
      input[type='text'] {
        width: 314px;
        height: 38px;
        line-height: 38px;
        display: block;
        -webkit-appearance: none;
        border-radius: 4px;
        border: 0;
        outline: 0;
        font-size: 16px;
        padding: 0 13px;
      }
      textarea {
        width: 315px;
        height: 58px;
        line-height: 29px;
        display: block;
        -webkit-appearance: none;
        border-radius: 4px;
        border: 0;
        outline: 0;
        font-size: 16px;
        padding: 0 13px;
        resize: none;
      }
      input[type='address'] {
        width: 315px;
        height: 32px;
        line-height: 32px;
        display: block;
        -webkit-appearance: none;
        border-radius: 4px;
        border: 0;
        outline: 0;
        font-size: 14px;
        padding: 0 13px;
        background: rgba(249, 249, 249, 1);
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
      .iconxiala {
        position: absolute;
        font-size: 12px;
        width: 12px;
        height: 12px;
        line-height: 12px;
        display: block;
        color: #aa8a7b;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
      .wrong-input {
        color: #d9423e;
      }
      .wrong-alert {
        position: absolute;
        width: 109+7px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        color: #d9423e;
        background-image: url('../../../static/order/wrong-input.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 9px;
        right: 19px;
      }
    }
    .tel-special {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 420px;
      .tel {
        width: 290px;
        input[type='text'] {
          width: 288px;
        }
      }
      .tel-area {
        width: 120px;
        height: 40px;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        input {
          width: 100%;
          height: 100%;
          line-height: 38px;
          text-align: left;
          background: rgba(248, 248, 248, 1);
          -webkit-appearance: none;
          border: 0;
          padding: 0 0 0 13px;
          margin: 0;
          outline: 0;
        }
        select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .iconxiala {
          position: absolute;
          font-size: 12px;
          width: 12px;
          height: 12px;
          line-height: 12px;
          display: block;
          color: #aa8a7b;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .border-change {
      border: 1px solid rgba(170, 138, 123, 1);
    }
    .border-wrong {
      border: 1px solid #d9423e;
    }
  }
}
</style>
<style lang="less">
.order{
  .el-radio__input.is-checked .el-radio__inner {
      border-color: #8b766c;
      background: #8b766c;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color: #606266;
  }
  .el-radio__inner:hover {
    border-color: #8b766c;
  }
  .el-select{
    width: 70%;
  }
}

.shopping-card-num{
  display: inline-block;
  // width: 18px;
  // height: 18px;
  // line-height: 18px;
  margin-left: 4px;
  font-size: 12px;
}
.add-shopping-card{
  position: absolute;
  top: 0;
  right: 0;
  height: 24px;
  line-height: 22px;
  padding: 0 14px;
  font-size: 13px;
  color: #f29b87;
  border: 1px solid #f29b87;
  border-radius: 5px;
  cursor: pointer;
}

.under-line{
  text-decoration: underline;
  cursor: pointer;
}

.ifChoose{
  position: absolute;
  top: 80px;
  right: 28px;
  font-size: 21px;
  color: #999;
  z-index: 3;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(../../../static/addShoppingCard/icon-1.png) no-repeat center;
  background-size: 100% 100%;
}

.ifChoose.on{
  background-image: url(../../../static/addShoppingCard/success.png);
}
</style>
