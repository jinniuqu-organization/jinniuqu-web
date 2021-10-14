import Vue from 'vue';
import Vuex from 'vuex';
import elementUI from 'element-ui'
import {
	getMetaDetail,
	getAllMeta,
	findAllPerson,
	findAllLegalperson,
	personHistory,
	legalpersonHistory
} from '../api/governanceIndex.js'
Vue.use(Vuex);

const state = {
	// 人口/法人 黄金、原始、历史
	personType: '人口',
	// 展示的搜索类型
	showType: '人口',
	// 黄金数据表头（人口）
	goldTableItem: {
		name: '姓名', //姓名
		sex: '性别', //性别
		idCard: '身份证号', //身份证号
		nationality: '民族', //民族
		birthDate: '出生日期', //出生日期
		eduLevel: '文化程度', //文化程度
		polity: '政治面貌', //政治面貌
		marriageType: '婚姻状态', //婚姻状态
		rprStatus: '个人户籍状态', //个人户籍状态
		rprAddress: '户籍地址', //户籍地址
		presentAddress: '现居住地址', //现居住地址
	},
	// 原始数据表头（人口）
	originalTableItem: {
		name: '姓名', //姓名
		sex: '性别', //性别
		idCard: '身份证号', //身份证号
		nationality: '民族', //民族
		birthDate: '出生日期', //出生日期
		eduLevel: '文化程度', //文化程度
		polity: '政治面貌', //政治面貌
		marriageType: '婚姻状态', //婚姻状态
		rprStatus: '个人户籍状态', //个人户籍状态
		rprAddress: '户籍地址', //户籍地址
		presentAddress: '现居住地址', //现居住地址
		updateTime: '数据更新时间'
	},
	// 原始数据表头（法人）
	originalTableItem1: {
		// orgCode: '组织机构代码', //姓名
		// regcode: '工商企业注册号', //工商企业注册号
		unifyCode: '统一社会信用代码',
		orgName: '企业名称', //企业名称
		orgType: '企业类型', //企业类型
		legalperson: '企业法人姓名', //企业法人姓名
		bussinessScope: '经营范围', //经营范围
		jylb: '行业门类', //行业门类
		clDate: '成立时间', //成立时间
		epState: '存续状态', //存续状态
		valiDate: '营业(有效)结束日期', //营业(有效)结束日期
		regAddress: '住所信息', //住所信息
		telephone: '联系电话' ,//联系电话
		updateTime: '数据更新时间'
	},
	//黄金数据
	goldData: {},
	// 历史空数据条数
	emptyCount: 0,
	// 原始数据
	originalData: [],
	//留作比对的原始数据
	realOriginalData: [],
	//历史数据
	historyData: [],
	// 元数据类型
	metaType: '人口',
	// 所有元数据信息
	metadata: [],
	// 对话框表头
	dialogItem: {
		cnName: '中文名称',
		enName: '英文名称',
		cnTranslateAbbr: '汉语拼音缩写',
		internalIdentifier: '内部标识符',
		cnTranslate: '中文全拼',
		metaType: '元数据类型',
		illustrate: '说明',
		// context: '语境',//1
		// objectWords: '对象类词', //1
		// featureWords: '特性词',  //1
		denote: '表示词',
		dataType: '数据类型',
		dataFormat: '数据格式',
		domain: '值域',
		// measureUnit: '计量单位',//1
		submitInstitutions: '提交机构',
		// remark: '备注',//1
	},
	// 对话框表格内容
	dialogData: []
};

const getters = {
	// 历史数据表头(人口)
	historyTableItem: (state) => {
		let item = state.originalTableItem
		item.dataVersion = '版本号'
		delete state.originalTableItem.dataVersion
		return item
	},
	// 历史数据表头(法人)
	historyTableItem1: (state) => {
		let item = state.originalTableItem1
		item.dataVersion = '版本号'
		delete state.originalTableItem1.dataVersion
		return item
	},
};

const mutations = {

	// 改变黄金、原始、历史数据搜索类型
	changePersonType(state, data) {
		state.personType = data
	},
	changeShowType(state) {
		state.showType = state.personType
	},
	// 对黄金数据赋值
	setGoldData(state, data) {
		state.goldData = data
	},
	// 对原始数据赋值
	setOriginalData(state, data) {

		if (data != undefined) {
			state.originalData = []
			// console.log(state.originalData)
			// console.log('对原始数据赋值')
			// console.log(data)
			for (let i = 0; i < data.length; i++) {
				state.originalData.push(data[i])
			}

		}
		// console.log(state.originalData)
	},
	// 对原始数据备份
	setRealOriginalData(state, data) {
		if (data != undefined) {
			state.realOriginalData = []
			for (let i = 0; i < data.length; i++) {
				state.realOriginalData.push(data[i])
			}
		}
	},
	// 对历史数据赋值
	setHistoryData(state, data) {
		if (data != undefined) {
			state.historyData = []
			for (var i = 0; i < data.length; i++) {
				state.historyData.push(data[i])
			}
		}
	},
	test(state){
		// console.log(state.originalData)
		// console.log(state.realOriginalData)
		// for (let key in state.originalData[0]) {
		// 	state.originalData[0][key] = '我自定义的空'
		// }
		// console.log(state.realOriginalData)
	},
	shift(state){
		state.originalData.shift()
	},
	unshift(state, param){
		state.originalData.unshift(state.originalData[state.originalData.length - 1])
	},
	pop(state){
		state.originalData.pop()
	},
	push(state, param){
		state.originalData.push(param)
	},
	// 对空历史数据数量赋值
	setEmptyCount(state, data) {
		state.emptyCount = 4 - data
	},
	// 对元数据搜索类型赋值
	setMetaType(state, metaType) {
		state.metaType = metaType
	},
	// 对元数据赋值
	setMetaData(state, data) {
		state.metadata = []
		if (data != undefined) {
			for (var i = 0; i < data.length; i++) {
				state.metadata.push(data[i])
			}
		}
	},
	// 对元数据详情赋值
	setMetaDetail(state, data) {
		state.dialogData = data
	}
};

const actions = {

	// 获取黄金数据和原始数据（人口）
	findAllPerson({
		commit
	}, query) {
		findAllPerson(query).then(res => {

			commit('changeShowType')
			if (res.code == 200 && res.data != null) {
				commit('setGoldData', res.data.gold[0])
				let a = [...res.data.original]
				let empty = {}
				
				empty.department = '我自定义的空'
				empty.name = '我自定义的空'
				empty.sex = '我自定义的空'
				empty.idCard = '我自定义的空'
				empty.nationality = '我自定义的空'
				empty.birthDate = '我自定义的空'
				empty.eduLevel = '我自定义的空'
				empty.marriageType = '我自定义的空'
				empty.rprStatus = '我自定义的空'
				empty.rprAddress = '我自定义的空'
				empty.presentAddress = '我自定义的空'
				empty.polity = '我自定义的空'
				empty.updateTime = '我自定义的空'
				if(a.length == 1){
					a.push(empty)
					a.push(empty)
				}else if(a.length == 2){
					a.push(empty)
				}
				let b = [...res.data.original]
				if(b.length == 1){
					b.push(empty)
					b.push(empty)
				}else if(b.length == 2){
					b.push(empty)
				}
				// b.push({})
				commit('setOriginalData', a)
				commit('setRealOriginalData', b)

			} else if (res.code == 201) {
				let empty = []
				commit('setOriginalData', empty)
				commit('setRealOriginalData', empty)
				elementUI.Message(res.msg == ''?'数据库不存在此信息':res.msg)
			}
		})
	},
	// 获取黄金数据和原始数据（法人）
	findAllLegalperson({
		commit
	}, query) {
		findAllLegalperson(query).then(res => {

			commit('changeShowType')
			if (res.code == 200 && res.data != null) {
				commit('setGoldData', res.data.gold[0])
				let a = [...res.data.original]
				let empty = {}
				empty.department = '我自定义的空'
				empty.unifyCode = '我自定义的空'
				empty.orgName = '我自定义的空'
				empty.orgType = '我自定义的空'
				empty.legalperson = '我自定义的空'
				empty.bussinessScope = '我自定义的空'
				empty.jylb = '我自定义的空'
				empty.clDate = '我自定义的空'
				empty.epState = '我自定义的空'
				empty.valiDate = '我自定义的空'
				empty.regAddress = '我自定义的空'
				empty.telephone = '我自定义的空'
				empty.updateTime = '我自定义的空'
				if(a.length == 1){
					a.push(empty)
					a.push(empty)
				}else if(a.length == 2){
					a.push(empty)
				}
				let b = [...res.data.original]
				if(b.length == 1){
					b.push(empty)
					b.push(empty)
				}else if(b.length == 2){
					b.push(empty)
				}
				commit('setOriginalData', a)
				commit('setRealOriginalData', b)
			} else if (res.code == 201) {
				let empty = []
				commit('setOriginalData', empty)
				commit('setRealOriginalData', empty)
				elementUI.Message(res.msg == ''?'数据库不存在此信息':res.msg)
			}
		})
	},
	// 获取历史数据（人口）
	personHistory({
		commit
	}, query) {
		personHistory(query).then(res => {

			commit('changeShowType')
			if (res.code == 200 && res.data != null) {
				commit('setHistoryData', res.data)
				commit('setEmptyCount', res.data.length)
			} else if (res.code == 201) {
				// elementUI.Message(res.msg == ''?'数据库不存在此信息':res.msg)
			}
		})
	},
	// 获取历史数据（法人）
	legalpersonHistory({
		commit
	}, query) {
		legalpersonHistory(query).then(res => {

			commit('changeShowType')
			if (res.code == 200 && res.data != null) {
				commit('setHistoryData', res.data)
				commit('setEmptyCount', res.data.length)
			} else if (res.code == 201) {
				// elementUI.Message(res.msg == ''?'数据库不存在此信息':res.msg)
			}
		})
	},
	// 获取所有元数据信息
	getAllMeta({
		commit
	}, query) {
		getAllMeta(query).then(res => {

			if (res.code == 200) {
				commit('setMetaData', res.data)
			}
		})
	},
	// 获取元数据详情
	getMetaInfo({
		commit
	}, query) {
		getMetaDetail(query).then(res => {

			if (res.code == 200) {

				commit('setMetaDetail', res.data)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
