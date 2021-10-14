export const setNumber4 = function(params) {
	let data = params.toString();
	let len = data.length;
	if (len == 1) {
		return "000" + params;
	}
	if (len == 2) {
		return "00" + params;
	}
	if (len == 3) {
		return "0" + params;
	}
	if (len == 4) {
		return params;
	}
}
export const setNumber3 = function(params) {
	let data = params.toString();
	let len = data.length;
	if (len == 1) {
		return "00" + params;
	}
	if (len == 2) {
		return "0" + params;
	}
	if (len == 3) {
		return params;
	}
}

// 日期格式： 年-月-日
export const getNowDate = function(param) {

	var date = new Date(param)
	var Y = date.getFullYear()
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	return Y + '-' + M + '-' + D
}

// 日期格式： 年-月
export const getNowDate2 = function(param) {

	var date = new Date(param)
	var Y = date.getFullYear()
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	return Y + '.' + M
}


// 获取前12个月
export const getMonthArray = function() {

	var d = new Date();
	var result = [];
	for (var i = 0; i < 10; i++) {
		d.setMonth(d.getMonth() - 1);
		var m = d.getMonth() + 1;
		m = m < 10 ? "0" + m : m;
		result.push(d.getFullYear() + '.' + m);
	}
	return result;
}

// 验证身份证
export const testIdCard = function(param) {

	var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	return reg.test(param)
}
// 验证统一社会信用代码
export const testUnifyCode = function(param) {

	var reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
	return reg.test(param)
}
// 对象复制
export const cloneObjectFn = function(param) {
	return JSON.parse(JSON.stringify(param))
}
