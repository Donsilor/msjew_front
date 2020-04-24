import CryptoJs from 'crypto-js'

class Helpers {
  // 测试功能
  test(str) {
    console.log(`This is a helpers's test ===> ${str}`)
  }

  // post请求json转换 type为true时，过滤空元素，反之不过滤
  transformRequest(data, type) {
    let ret = ''
    for (const it in data) {
      if (type && (data[it] === '' || data[it] === null)) {
        continue
      }
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }

  // 是否为空对象
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0
  }

  // 克隆对象
  cloneObject(obj) {
    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== 'object') return obj

    // Handle Date
    if (obj instanceof Date) {
      const copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }

    // Handle Array
    if (Array.isArray(obj)) {
      const copy = []
      for (let i = 0, len = obj.length; i < len; ++i) {
        copy[i] = this.cloneObject(obj[i])
      }
      return copy
    }

    // Handle Object
    if (obj instanceof Object) {
      const copy = {}
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObject(obj[attr])
      }
      return copy
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
  }

  // 将字符串转换为base64字符串
  base64Encode(str) {
    return CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(str))
  }

  base64Decode(base64) {
    return CryptoJs.enc.Utf8.stringify(CryptoJs.enc.Base64.parse(base64))
  }

  // 判断email格式
  trueEmail(str = '') {
    const regExp = new RegExp(/^[0-9a-z]+[@][0-9a-z]+[.][0-9a-z]+/)
    return regExp.test(str)
  }

  // 过敏处理
  showEmail(str) {
    const hidenLength = 4
    let result = str
    if (result) {
      result = result.split('@')
      if (result[0].length < hidenLength + 1) {
        let newstr = ''
        for (let n = 0; n < result[0].length; n++) {
          newstr += '*'
        }
        result[0] = newstr
      } else {
        result[0] =
          result[0].slice(0, result[0].length - hidenLength) +
          new Array(hidenLength).fill('*').join('')
      }
    } else {
      result = []
    }
    if (!result.length) {
      result = ''
    } else {
      result = result.join('@')
    }
    return result
  }
  // 多行文字隐藏
  overflowHiddon(el) {
    const s = el.textContent || el.textContent
    const n = el.offsetHeight
    for (let i = 0; i < s.length; i++) {
      el.innerHTML = s.substr(0, i)
      if (n < el.scrollHeight) {
        el.style.overflow = 'hidden'
        el.innerHTML = s.substr(0, i - 3) + '...'
        break
      }
    }
  }

  // 解决js浮点计算时出现的不精确问题
  mathAdd(a = 0, b = 0) {
    let c, d
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    const e = 10 ** Math.max(c, d)
    return (this.mathMul(a, e) + this.mathMul(b, e)) / e
  }

  mathSub(a = 0, b = 0) {
    let c, d
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    const e = 10 ** Math.max(c, d)
    return (this.mathMul(a, e) - this.mathMul(b, e)) / e
  }

  mathMul(a = 0, b = 0) {
    let c = 0
    const d = a.toString()
    const e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) {}
    try {
      c += e.split('.')[1].length
    } catch (f) {}
    return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / 10 ** c
  }

  mathDiv(a = 0, b = 0) {
    let e = 0
    let f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {}
    const c = Number(a.toString().replace('.', ''))
    const d = Number(b.toString().replace('.', ''))
    return this.mathMul(c / d, 10 ** (f - e))
  }

  makeQueryStr(obj = {}) {
    if (!(obj instanceof Object)) {
      return ''
    }
    const result = []
    for (const n in obj) {
      result.push(`${n}=${obj[n]}`)
    }
    return result.join('&')
  }

  /*
   * 金額按千位逗號分隔
   * @param	num		需要格式化的金额数值.需要格式化的金額數值
   * @param	type	判斷格式化後的金額是否需要小數位，0需要
   * return	格式化後的數值字符串
   */
  formatMoney(num, type) {
    if (!num) {
      return '0.00'
    }
    num = num.toString().replace(/^(\d*)$/, '$1.')
    num = (num + '00').replace(/(\d*\.\d\d)\d*/, '$1')
    num = num.replace('.', ',')
    const reg = /(\d)(\d{3},)/
    while (reg.test(num)) num = num.replace(reg, '$1,$2')
    num = num.replace(/,(\d\d)$/, '.$1')
    if (type === 0 && num.split('.')[1] === '00') num = num.split('.')[0]
    return num
  }
}

export default new Helpers()
