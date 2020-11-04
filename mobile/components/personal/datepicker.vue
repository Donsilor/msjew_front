<template>
  <div class="datepicker">
    <div class="demo">
      {{ demo2 ? demo2 : lang.setBirthday }}
      <i class="icon iconfont iconriqi" @click="showDatePicker(2, 3)"> </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    birthday: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.personal,
      demo1: '',
      demo2: this.birthday,
      demo3: '',
      demo4: '',
      demo5: '',
      demo6: '',
      demo7: '',
      time: [2015, 1, 1, 0, 0],
      minTime: [2006, 1, 1, 0, 0],
      maxTime: [],
      showChinese: false,
      resetTime: [],
      type: null
    }
  },
  mounted() {
    this.getCurTime()
  },
  methods: {
    // 获取当前时间
    getCurTime(minTime) {
      let date
      if (minTime) {
        const newMinTime = []
        minTime.forEach((item, ind) => {
          if (ind < 3) {
            newMinTime.push(item)
          }
        })
        date = new Date(newMinTime.join('/'))
      } else {
        date = new Date()
      }

      const dafultTiemEnd = new Date(date)
      dafultTiemEnd.setDate(date.getDate() + 30)
      const y1 = dafultTiemEnd.getFullYear()
      const m1 = this.dealTimeFormat(dafultTiemEnd.getMonth() + 1)
      const d1 = this.dealTimeFormat(dafultTiemEnd.getDate())
      const h1 = date.getHours()
      const min1 = date.getMinutes()
      this.maxTime = [y1 * 1, m1 * 1, d1 * 1, h1 * 1, min1 * 1]
    },
    dealTimeFormat(data) {
      return data > 9 ? data : '0' + data
    },
    // 选择时间
    showDatePicker(demo, type) {
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      const h = date.getHours()
      const min = date.getMinutes()
      this.time = this.showChinese
        ? [
            y + this.lang.year,
            m + this.lang.month,
            d + this.lang.day,
            h + this.lang.hour,
            min + this.lang.minute
          ]
        : [y * 1, m * 1, d * 1, h * 1, min * 1]
      let dataObj = {}
      if (demo < 6) {
        dataObj = {
          type: type,
          min: this.minTime,
          max: this.maxTime,
          showChinese: this.showChinese
        }
        if (demo === 5) {
          this.time = this.showChinese
            ? [
                y + this.lang.year,
                m + this.lang.month,
                d + this.lang.day,
                h + this.lang.hour,
                '00' + this.lang.minute
              ]
            : [y * 1, m * 1, d * 1, h * 1, '00']
          dataObj.quarter = true
        }
      } else {
        if (demo === 6) {
          this.minTime = [2016, 1, 1, 0, 0]
        }
        if (demo === 7) {
          if (!this.resetTime[0]) return alert(this.lang.chooseStartTime)
          const resetTime = []
          if (this.showChinese) {
            this.resetTime.forEach((item, index) => {
              resetTime.push(item.substr(0, item.length - 1) * 1)
            })
          }
          this.time = this.resetTime
          this.minTime = this.showChinese ? resetTime : this.resetTime
          this.getCurTime(this.minTime)
        }
        dataObj = {
          type: type,
          min: this.minTime,
          max: this.maxTime,
          showChinese: this.showChinese
        }
      }
      const init = JSON.parse(JSON.stringify(this.time))
      dataObj.value = init
      const datePicker = require('multifunctional-datepicker').default
      datePicker(dataObj)
        .then(e => {
          const y = e[0]
          const m = e[1]
          const d = e[2]
          const h = e[3]
          const mm = e[4]
          if (demo === 1) {
            this.demo1 = dataObj.showChinese
              ? y + m
              : y + this.lang.year + m + this.lang.month
          } else if (demo === 2) {
            this.demo2 = dataObj.showChinese
              ? y + m + d
              : y + this.lang.year + m + this.lang.month + d + this.lang.day
          } else if (demo === 3) {
            this.demo3 = dataObj.showChinese
              ? y + m + d + h
              : y +
                this.lang.year +
                m +
                this.lang.month +
                d +
                this.lang.day +
                h +
                this.lang.hour
          } else if (demo === 4) {
            this.demo4 = dataObj.showChinese
              ? y + m + d + h + mm
              : y +
                this.lang.year +
                m +
                this.lang.month +
                d +
                this.lang.day +
                h +
                this.lang.hour +
                mm +
                this.lang.minute
          } else if (demo === 5) {
            this.demo5 = dataObj.showChinese
              ? y + m + d + h + mm
              : y +
                this.lang.year +
                m +
                this.lang.month +
                d +
                this.lang.day +
                h +
                this.lang.hour +
                mm +
                this.lang.minute
          } else if (demo === 6) {
            this.resetTime = e
            this.demo6 = dataObj.showChinese
              ? y + m + d + h + mm
              : y +
                this.lang.year +
                m +
                this.lang.month +
                d +
                this.lang.day +
                h +
                this.lang.hour +
                mm +
                this.lang.minute
            this.demo7 = ''
          } else if (demo === 7) {
            this.demo7 = dataObj.showChinese
              ? y + m + d + h + mm
              : y +
                this.lang.year +
                m +
                this.lang.month +
                d +
                this.lang.day +
                h +
                this.lang.hour +
                mm +
                this.lang.minute
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped lang="less">
.datepicker {
  width: 100%;
  .demo {
    width: 100%;
    height: 40px;
    padding: 0 14px;
    background: rgba(249, 249, 249, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .icon {
      float: right;
      font-size: 18px;
    }
  }
}
</style>
