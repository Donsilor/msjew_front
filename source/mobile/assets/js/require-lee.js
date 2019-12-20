// 用于email
export const Email = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
// 用于以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
export const RegPassword = new RegExp(
  /(^[0-9]{6,20}$)|(^[a-zA-Z]{6,20}$)|(^[0-9a-zA-Z]{6,20}$)/
)

const _mobil = /^1+[0-9]{10}$/

// const _pw = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&-_*?]+)$)^[\w~!@#$%\^&-_*?]{7,20}$/
const _pw = /(^[0-9]{6,20}$)|(^[a-zA-Z]{6,20}$)|(^[0-9a-zA-Z]{6,20}$)/
export const Reg = { _mobil, _pw }

// 验证金额必须为大于零的数字组合，可以包含小数点
export const RegMoney = /(^[1-9]{1}\d*$)|(^0.\d+$)|(^[1-9]\d*.\d+$)/

// 验证是否大于零的数字组合，可以保留2位小数
export const RegNumOrDecimal = /(^[1-9]{1}\d*$)|(^0.\d{1,2}$)|(^[1-9]\d*.\d{1,2}$)/

// 验证是否大于等于零的数字组合，可以保留2位小数
export const RegNumOrDecimal2 = /(^[1-9]{1}\d*$)|(^0.\d{1,2}$)|(^[1-9]\d*.\d{1,2}$|^[0]{1}$)/

// 数字与字母
export const RegAlphaNum = /(^[0-9]+$)|(^[a-zA-Z]+$)|(^[0-9a-zA-Z]+$)/

// 手机号码
export const RegMobile = /^1[\d]{10}$/

// 固话号码
export const RegTelephone = /^[0-9]{1,20}$/

// 只能是数字且大于零
export const RegInter = /^[1-9]{1}\d*$/

// 当前楼层
export const RegCurrentFloor = /(^[1-9]{1}\d*$)|(^-[1-9]{1}\d*$)/
// 密码
// export const RegPassword = /(^[0-9]{6,20}$)|(^[a-zA-Z]{6,20}$)|(^[0-9a-zA-Z]{6,20}$)/

// 数字、字母、汉字
export const RegAlphaNumZh = /(^[0-9]$)|(^[a-zA-Z]$)|(^[\u2E80-\u9FFF]+$)|(^[0-9a-zA-Z\u2E80-\u9FFF]+$)/

// 身份证
export const RegIdCard = /^([1-9]{1}[\d]{5})([1|2][\d]{3})([0|1][\d]{1})([0|1|2|3][\d]{1})([\d]{3}[\d|x|X])$/

// 银行账户
export const RegBankAccount = /^\d{1,30}$/

// after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
// alpha - 只包含英文字符
// alpha_dash - 可以包含英文、数字、下划线、破折号
// alpha_num - 可以包含英文和数字
// before:{target} - 和after相反
// between:{min},{max} - 在min和max之间的数字
// confirmed:{target} - 必须和target一样
// date_between:{min,max} - 日期在min和max之间
// date_format:{format} - 合法的format格式化日期
// decimal:{decimals?} - 数字，而且是decimals进制
// digits:{length} - 长度为length的数字
// dimensions:{width},{height} - 符合宽高规定的图片
// email - 不解释
// ext:[extensions] - 后缀名
// image - 图片
// in:[list] - 包含在数组list内的值
// ip - ipv4地址
// max:{length} - 最大长度为length的字符
// mimes:[list] - 文件类型
// min - max相反
// mot_in - in相反
// numeric - 只允许数字
// regex:{pattern} - 值必须符合正则pattern
// required - 不解释
// size:{kb} - 文件大小不超过
// url:{domain?} - (指定域名的)url
