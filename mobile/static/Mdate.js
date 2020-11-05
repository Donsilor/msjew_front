;(function() {
  const d = document
  const includeCss = function(url) {
    const link = d.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    d.getElementsByTagName('head')[0].appendChild(link)
  }
  includeCss('Mdate/needcss/Mdate.css')
  const dateopts = {
    beginYear: '1970',
    beginMonth: 1,
    beginDay: 1,
    endYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 1,
    endDay: new Date().getDate(),
    format: 'YMD'
  }
  const MdSelectId = ''
  const MdAcceptId = ''
  let dateContentBox = ''
  const datePlugs = ''
  let yearTag = ''
  let monthTag = ''
  let dayTag = ''
  let indexY = 1
  let indexM = 1
  let indexD = 1
  let initM = null
  let initD = null
  let yearScroll = null
  let monthScroll = null
  let dayScroll = null
  const Mdate = function(el, opts) {
    if (!opts) {
      opts = {}
    }
    this.id = el
    this.okTxt = opts.okTxt
    this.year = opts.year
    this.month = opts.month
    this.day = opts.day
    this.selectorId = d.getElementById(this.id)
    this.acceptId = d.getElementById(opts.acceptId) || d.getElementById(this.id)
    this.beginYear = opts.beginYear || dateopts.beginYear
    this.beginMonth = opts.beginMonth || dateopts.beginMonth
    this.beginDay = opts.beginDay || dateopts.beginDay
    this.endYear = opts.endYear || dateopts.endYear
    this.endMonth = opts.endMonth || dateopts.endMonth
    this.endDay = opts.endDay || dateopts.endDay
    this.format = opts.format || dateopts.format
    this.cb = opts.cb
    this.dateBoxShow()
  }
  Mdate.prototype = {
    constructor: Mdate,
    dateBoxShow: function() {
      const that = this
      that.selectorId.onclick = function() {
        that.createDateBox()
        that.dateSure()
      }
    },
    createDateBox: function() {
      const that = this
      MdatePlugin = d.getElementById('MdatePlugin')
      if (!MdatePlugin) {
        dateContentBox = d.createElement('div')
        dateContentBox.id = 'MdatePlugin'
        d.body.appendChild(dateContentBox)
        MdatePlugin = d.getElementById('MdatePlugin')
      }
      MdatePlugin.setAttribute('class', 'slideIn')
      that.createDateUi()
      const yearUl = d.getElementById('yearUl')
      const monthUl = d.getElementById('monthUl')
      const dayUl = d.getElementById('dayUl')
      yearUl.innerHTML = that.createDateYMD('year')
      that.initScroll()
      that.refreshScroll()
    },
    createDateUi: function() {
      const str =
        '' +
        '<section class="getDateBg"></section>' +
        '<section class="getDateBox" id="getDateBox">' +
        '<div class="choiceDateTitle">' +
        '<button id="dateCancel" class="fl">X</button>' +
        '<button id="dateSure" class="fr">' +
        this.okTxt +
        '</button>' +
        '</div>' +
        '<div class="dateContent">' +
        '<div class="checkeDate"></div>' +
        '<div id="yearwrapper">' +
        '<ul id="yearUl"></ul>' +
        '</div>' +
        '<div id="monthwrapper">' +
        '<ul id="monthUl"></ul>' +
        '</div>' +
        '<div id="daywrapper">' +
        '<ul id="dayUl"></ul>' +
        '</div>' +
        '</div>' +
        '</section>'
      MdatePlugin.innerHTML = str
    },
    createDateYMD: function(type) {
      const that = this
      let str = '<li>&nbsp;</li><li>&nbsp;</li>'
      let beginNum = null
      let endNum = null
      let unitName = this.year
      let dataStyle = 'data-year'
      if (type == 'year') {
        beginNum = that.beginYear
        endNum = that.endYear
      }
      if (type == 'month') {
        unitName = this.month
        dataStyle = 'data-month'
        beginNum = that.beginMonth
        endNum = 12
        if (yearTag != that.beginYear) {
          beginNum = 1
        }
        if (yearTag == dateopts.endYear) {
          endNum = that.endMonth
        }
      }
      if (type == 'day') {
        unitName = this.day
        dataStyle = 'data-day'
        beginNum = 1
        endNum = new Date(yearTag, monthTag, 0).getDate()
        if (yearTag == that.beginYear && monthTag == that.beginMonth) {
          beginNum = that.beginDay
        }
        if (yearTag == that.endYear && monthTag == that.endMonth) {
          endNum = that.endDay
        }
      }
      for (let i = beginNum; i <= endNum; i++) {
        str +=
          '<li ' +
          dataStyle +
          '=' +
          i +
          '>' +
          that.dateForTen(i) +
          unitName +
          '</li>'
      }
      return str + '<li>&nbsp;</li><li>&nbsp;</li>'
    },
    initScroll: function() {
      const that = this
      yearScroll = new iScroll('yearwrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function() {
          indexY = Math.ceil((this.y / 40) * -1 + 2)
          yearTag = yearUl
            .getElementsByTagName('li')
            [indexY].getAttribute('data-year')
          monthUl.innerHTML = that.createDateYMD('month')
          monthScroll.refresh()
          try {
            monthTag = monthUl
              .getElementsByTagName('li')
              [indexM].getAttribute('data-month')
          } catch (err) {
            return true
          }
          dayUl.innerHTML = that.createDateYMD('day')
          dayScroll.refresh()
          try {
            dayTag = dayUl
              .getElementsByTagName('li')
              [indexD].getAttribute('data-day')
          } catch (err) {
            return true
          }
        }
      })
      monthScroll = new iScroll('monthwrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function() {
          indexM = Math.ceil((this.y / 40) * -1 + 2)
          if (indexM == 1 && yearTag != that.beginYear) {
            monthTag = 1
          } else {
            monthTag = monthUl.getElementsByTagName('li')[indexM]
              ? monthUl
                  .getElementsByTagName('li')
                  [indexM].getAttribute('data-month')
              : 1
          }
          dayUl.innerHTML = that.createDateYMD('day')
          dayScroll.refresh()
          try {
            dayTag = dayUl
              .getElementsByTagName('li')
              [indexD].getAttribute('data-day')
          } catch (err) {
            return true
          }
        }
      })
      dayScroll = new iScroll('daywrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function() {
          indexD = Math.ceil((this.y / 40) * -1 + 2)
          if (indexD == 1 && monthTag != that.beginMonth) {
            dayTag = 1
          } else {
            dayTag = dayUl.getElementsByTagName('li')[indexD]
              ? dayUl
                  .getElementsByTagName('li')
                  [indexD].getAttribute('data-day')
              : 1
          }
        }
      })
    },
    refreshScroll: function() {
      const that = this
      let inputYear = that.acceptId.getAttribute('data-year')
      let inputMonth = that.acceptId.getAttribute('data-month')
      let inputDay = that.acceptId.getAttribute('data-day')
      inputYear = inputYear || that.beginYear
      inputMonth = inputMonth || that.beginMonth
      inputDay = inputDay || that.beginDay
      initM = that.beginMonth
      initD = that.beginDay
      if (inputYear != that.beginYear && initM != 1) {
        initM = 1
      }
      if (inputMonth != that.beginMonth && initD != 1) {
        initD = 1
      }
      inputYear -= that.beginYear
      inputMonth -= initM
      inputDay -= initD
      yearScroll.refresh()
      yearScroll.scrollTo(0, inputYear * 40, 300, true)
      monthScroll.scrollTo(0, inputMonth * 40, 300, true)
      setTimeout(() => {
        dayScroll.scrollTo(0, inputDay * 40, 1, true)
      }, 300)
    },
    dateSure: function() {
      const that = this
      const sureBtn = d.getElementById('dateSure')
      const cancelBtn = d.getElementById('dateCancel')
      sureBtn.onclick = function() {
        let value = ''
        if (that.format == 'YMD') {
          value = yearTag + '年' + monthTag + '月' + dayTag + '日'
        } else {
          value =
            yearTag +
            that.format +
            that.dateForTen(monthTag) +
            that.format +
            that.dateForTen(dayTag)
        }
        that.acceptId.setAttribute('data-year', yearTag)
        that.acceptId.setAttribute('data-month', monthTag)
        that.acceptId.setAttribute('data-day', dayTag)
        that.cb && that.cb(value)
        that.dateCancel()
      }
      cancelBtn.onclick = function() {
        that.dateCancel()
      }
    },
    dateForTen: function(n) {
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    },
    dateCancel: function() {
      MdatePlugin.setAttribute('class', 'slideOut')
      setTimeout(function() {
        MdatePlugin.innerHTML = ''
      }, 200)
    }
  }
  window.Mdate = Mdate
})()
