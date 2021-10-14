import request from '../utils/request';

//流动原因TOP5
export function getFloatReason(query) {
  return request({
    url: '/personNew/perFloat',
    method: 'post',
    data: query
  })
}

// 人口年龄情况
export function getAgeStruct(query) {
  return request({
    url: '/personNew/sex',
    method: 'post',
    data: query
  })
}

// 性别情况查询
export function getPersonSex(query) {
	return request({
		url: 'person/sex',
		method: 'post',
		data: query
	})
}

// 婚姻情况查询
export function getPersonMarriage(query) {
	return request({
		url: 'person/marriage',
		method: 'post',
		data: query
	})
}

// 残疾、党员情况查询
export function getPersonPersonLabel(query) {
	return request({
		url: 'person/personLabel',
		method: 'post',
		data: query
	})
}

// 学历情况查询
export function getPersonEducation(query) {
	return request({
		url: 'person/education',
		method: 'post',
		data: query
	})
}

// 街道疫苗预约占比(柱状图)
export function getPersonYm(query) {
	return request({
		url: 'personNew/ym',
		method: 'post',
		data: query
	})
}
// 人口总量查询(有参)updateTime
export function getPersonStatistics(query) {
	return request({
		url: 'person/statistics',
		method: 'post',
		data: query
	})
}
// 各街道技防注册人员占比查询
export function getPersonJf(query) {
	return request({
		url: 'personNew/jf',
		method: 'post',
		data: query
	})
}

// 时间轴查询
export function getPersonTime(query) {
	return request({
		url: 'personNew/time',
		method: 'post',
		data: query
	})
}

// 人口详情查询
export function getPersonDetail(query) {
	return request({
		url: 'person/detail',
		method: 'post',
		data: query
	})
}

// 街道人口总量查询
export function getPersonGross(query) {
	return request({
		url: 'personNew/gross',
		method: 'post',
		data: query
	})
}

// 街道企业总量查询
export function getCompanyComArea(query) {
	return request({
		url: 'companyNew/comArea',
		method: 'post',
		data: query
	})
}

// 街道企业数量查询
export function getCompanyArea(query) {
	return request({
		url: 'companyNew/comArea',
		method: 'post',
		data: query
	})
}
// 企业行业分布查询
export function getCompanyCategory(query) {
	return request({
		url: 'companyNew/economic',
		method: 'post',
		data: query
	})
}
// 企业类型查询
export function getCompanyCompanyType(query) {
	return request({
		url: 'companyNew/industry',
		method: 'post',
		data: query
	})
}
// 企业详情查询
export function getCompanyDetail(query) {
	return request({
		url: 'company/detail',
		method: 'post',
		data: query
	})
}
// 企业总量查询
export function getCompanyGross(query) {
	return request({
		url: 'company/gross',
		method: 'post',
		data: query
	})
}
// 企业异常趋势查询
export function getCompanyNumber(query) {
	return request({
		url: 'companyNew/unusual',
		method: 'post',
		data: query
	})
}
// 企业时间轴查询
export function getCompanyTime(query) {
	return request({
		url: 'companyNew/time',
		method: 'post',
		data: query
	})
}

// 自然人-地址位置查询
// 工作地
export function getWorkInfo(query) {
  return request({
    url: '/label/gz',
    method: 'post',
    data: query
  })
}

// 居住地
export function getResidenceInfo(query) {
  return request({
    url: '/label/jz',
    method: 'post',
    data: query
  })
}

// 户籍地
export function getRegisterInfo(query) {
  return request({
    url: '/label/hj',
    method: 'post',
    data: query
  })
}

// 个人标签详细信息
export function getPersonInfo(query) {
  return request({
    url: '/label/la',
    method: 'post',
    data: query
  })
}

// 关系标签-信息
export function getRelation(query) {
  return request({
    url: '/label/relation',
    method: 'post',
    data: query
  })
}

export function getHealthCode(query) {
  return request({
    url: '/label/auth',
    method: 'post',
    data: query
  })
}

// 关系标签-表格
export function getRelationExcel(query) {
  return request({
    url: '/label/relationExcel',
    method: 'post',
    data: query
  })
}

// 关系标签-详细
export function getRelationDetail(query) {
  return request({
    url: '/label/relationDetail',
    method: 'post',
    data: query
  })
}

// 事件链
export function getChainInfo(query) {
  return request({
    url: '/label/chain',
    method: 'post',
    data: query
  })
}

//个性化新闻推荐
export function getNews(query) {
  return request({
    url: '/label/news',
    method: 'post',
    data: query
  })
}
