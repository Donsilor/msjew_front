// 格式化金额显示
/* eslint-disable*/
export function formatMoney1(number, places, symbol, thousand, decimal) {
	//formatMoney(12345678)=> $ 12,345,678
	//formatMoney(12345678,0, "$ ")=> $ 12,345,678
	//formatMoney(12345678,0, "$ ")=> $4.999,99
	//formatMoney(1999.99,2, "$", ".", ",") => $4.999,99
	//formatMoney(-1000,0, "$")=> $ -100,000
	    
	places = !isNaN(places = Math.abs(places)) ? places : 2;   
	symbol = symbol !== undefined ? symbol : "";    
	thousand = thousand || ",";    
	decimal = decimal || ".";    
	negative = number < 0 ? "-" : "",     i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",     j = (j = i.length) > 3 ? j % 3 : 0;    
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

/**
 *	分页对象
 */
export function Page(curPage, pageSize, totalCount) {
	this.curPage = curPage; //当前页
	this.pageSize = pageSize; //每页数据量
	this.totalCount = totalCount; //总数量
	this.pageNum = Math.ceil(totalCount / pageSize); //总页数
	this.isFirst = curPage === 1; //是否第一页
	this.isLast = curPage === this.pageNum || this.pageNum === 0; //是否最后一页
	this.nextPage = !this.isLast; //是否有下一页
	this.prePage = !this.isFirst; //是否有上一页
}

//返回數字
export function removeFormatMoney(num) {
	return parseFloat(num.replace(/[^\d\.-]/g, ""));
}

/*
 * 金額按千位逗號分隔
 * @param	num		需要格式化的金额数值.需要格式化的金額數值
 * @param	type	判斷格式化後的金額是否需要小數位，0需要
 * return	格式化後的數值字符串
 */
export function formatMoney(num, type) {
	if(!num) {
		return '0.00';
	}
	num = num.toString().replace(/^(\d*)$/, "$1.");
	num = (num + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	num = num.replace(".", ",");
	var reg = /(\d)(\d{3},)/;
	while(reg.test(num))
		num = num.replace(reg, "$1,$2");
	num = num.replace(/,(\d\d)$/, ".$1");
	if(type === 0 && num.split(".")[1] === "00")
		num = num.split(".")[0];
	return num;
}

// 格式化金额显示 24400 单位分 转换为 244.00
export function filterFormatMoney2(moneyNumber) {
	let r = moneyNumber % 100
	moneyNumber = '' + parseInt(moneyNumber / 100)
	let s = moneyNumber.replace(/[^\d]/g, '')
	let l = s.split('').reverse()
	let t = ''
	for(let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
	}
	// return t.split('').reverse().join('') + '.' + r
	// console.log('dafad', t.split('').reverse().join('') + '.' + (r > 9 ? r : '0' + r))
	return t.split('').reverse().join('') + '.' + (r > 9 ? r : '0' + r)
}

// 保留2为小数四舍五入
export function get2FixedRound(n) {
	let r = ''
	n = n * 100
	n = Math.round(n)
	// console.log(n)
	r = n / 100
	// console.log(r)
	return r
}

/*
 @parm: date 数据类型
 @fmt: 格式化 yyyy-MM-dd hh:mm:ss
 @lg: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
 默认格式化格式为 2018-05-01
 * */

// export function filterFormatDate (date, fmt) {
export function filterFormatDate(dateStr, format) {
	var date = new Date(dateStr);
	if(dateStr.toString().indexOf('-') > 0)
		date = new Date(dateStr.replace(/-/g, '/'));
	var o = {
		"M+": date.getMonth() + 1, //月
		"d+": date.getDate(), //日
		"H+": date.getHours(), //时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	}
	if(/(y+)/.test(format))
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

export function getNumberToRMB(m) {
	// 金錢數字转换文字算法主函数
	let patten = new RegExp(/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/)
	if(!patten.test(m)) {
		return
	}
	/* eslint-disable no-new */
	let unit = new Array('仟', '佰', '拾', '', '仟', '佰', '拾', '', '仟', '佰', '拾', '', '角', '分')
	let toDx = function(n) { // 阿拉伯数字转换函数
		switch(n) {
			case '0':
				return '零'
			case '1':
				return '壹'
			case '2':
				return '贰'
			case '3':
				return '叁'
			case '4':
				return '肆'
			case '5':
				return '伍'
			case '6':
				return '陆'
			case '7':
				return '柒'
			case '8':
				return '捌'
			case '9':
				return '玖'
		}
	}
	m *= 100
	m += ''
	let length = m.length
	let result = ''
	for(let i = 0; i < length; i++) {
		if(i === 2) {
			result = '元' + result
		} else if(i === 6) {
			result = '万' + result
		} else if(i === 10) {
			result = '亿' + result
		}
		if(m.charAt(length - i - 1) === 0) {
			if(i !== 0 && i !== 1) {
				if(result.charAt(0) !== '零' && result.charAt(0) !== '元' && result.charAt(0) !== '万') {
					result = '零' + result
				}
			}
			continue
		}
		result = toDx(m.charAt(length - i - 1)) + unit[unit.length - i - 1] + result
	}
	result += result.charAt(result.length - 1) === '元' ? '整' : ''
	return result
}