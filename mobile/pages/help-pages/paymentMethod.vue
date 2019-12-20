<template>
  <div class="paymentMethod">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          <p>
            {{ lang.advice }}
          </p>
        </dd>
        <dd>
          <section class="remind">
            <p class="ol">
              {{ lang.remind }}
            </p>
          </section>
        </dd>
        <dd>
          <p>
            {{ lang.protect }}
          </p>
          <p>
            {{ lang.more }}<a class="link" @click="go()">{{ lang.here }}</a>
          </p>
        </dd>
        <dt>{{ lang.payment }}</dt>
        <dd>
          <p>
            <strong>{{ lang.paypal }}</strong>
            {{ lang.thePaypal }}
          </p>
          <p>
            <strong>{{ lang.creditcard }}</strong>
            {{ lang.theCreditcard }}
          </p>
          <p>
            <strong>{{ lang.remittance }}</strong>
            {{ lang.theRemittance }}
          </p>
          <section class="remind">
            <p class="ol">
              {{ lang.tip1 }}
            </p>
            <p class="ol">
              {{ lang.tip2 }}
            </p>
            <p class="ol">
              {{ lang.tip3 }}
            </p>
          </section>
          <p>
            <strong>{{ lang.unionpay }}</strong>
            {{ lang.theUnionpay }}
          </p>
        </dd>
        <dt>{{ lang.about }}</dt>
        <dd>
          <p>
            {{ lang.con1 }}
          </p>
        </dd>
        <img
          class="payment"
          src="~/static/help-pages/payment-paypal.png"
          alt=""
        />
        <dd>
          <p>
            {{ lang.con2 }}
          </p>
          <p>
            {{ lang.con3 }}
          </p>
          <p>
            {{ lang.pro1 }}
          </p>
          <p>
            {{ lang.pro2 }}
          </p>
          <p>
            {{ lang.pro3 }}
          </p>
          <p>
            {{ lang.know }}
            <a class="link" @click="go()">www.paypal.com</a>
          </p>
        </dd>
        <dt>{{ lang.use }}</dt>
        <dd>
          <p>
            {{ lang.check }}
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com
            </a>
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'PaymentMethod',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].paymentMethod,
      go() {
        window.open('https://www.paypal.com')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.payment {
  width: 170px;
}
</style>
