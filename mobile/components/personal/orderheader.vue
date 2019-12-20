<template>
  <div class="order-header">
    <ul class="content">
      <li v-for="(item, index) in list" :key="index">
        <span
          :class="{ activeold: stepindex > index, active: stepindex == index }"
        >
          <i
            class="icon iconfont"
            :class="[
              { icongou: stepindex > index, last: index == list.length - 1 }
            ]"
            >{{ back(index, item.step) }}</i
          >
          <p>{{ item.title }}</p>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    stepindex: {
      type: Number,
      required: false,
      default: 0
    },
    list: {
      type: Array,
      required: false,
      default() {
        return [
          { step: '1', title: '第一步' },
          { step: '2', title: '第二步' },
          { step: '3', title: '第三步' },
          { step: '4', title: '第四步' },
          { step: '5', title: '第五步' }
        ]
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.personal
    }
  },
  methods: {
    back(ind, val) {
      if (ind >= this.stepindex) {
        return val
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.order-header {
  .content {
    justify-content: center;
    li {
      display: inline-block;
      width: 20%;
      span {
        i {
          position: relative;
          display: inline-block;
          width: 24px;
          height: 24px;
          background: rgba(233, 233, 233, 1);
          border-radius: 50%;
          font-size: 14px;
          line-height: 24px;
          font-family: SFProText-Light;
          font-weight: 300;
          color: rgba(153, 153, 153, 1);
        }
        i::after {
          position: absolute;
          top: 50%;
          left: 32px;
          content: '';
          width: 34px;
          height: 1px; /*no*/
          background: #e9e9e9;
          /*-webkit-transform: scale(1, 0.5);*/
          /*-moz-transform: scale(1, 0.5);*/
          /*-o-transform: scale(1, 0.5);*/
        }
        .last::after {
          width: 0px !important;
        }
        .icongou {
          font-size: 18px;
          font-weight: 500;
        }
        p {
          font-size: 12px;
          line-height: 44px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .activeold {
        i {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(242, 155, 135, 1); /*no*/
          color: rgba(242, 155, 135, 1);
          border-radius: 50%;
        }
        i::after {
          background: #f29b87;
        }
        p {
          color: #333333;
        }
      }
      .active {
        i {
          width: 32px;
          height: 32px;
          font-size: 16px;
          line-height: 32px;
          margin-bottom: -4px;
          background: #f29b87;
          color: #ffffff;
          border-radius: 50%;
        }
        i::after {
          left: 38px;
          background: #e9e9e9;
        }
        p {
          color: #333333;
        }
      }
    }
  }
}
</style>
