import request from '../utils/request';
// import qs from "qs";

// 获取黄金数据(人口)
export function findAllLegalperson(query) {
    return request({
        url: 'legalperson/findAll',
        method: 'post',
        data: query
    })
}
// 获取黄金数据(法人)
export function findAllPerson(query) {

    return request({
        url: '/person/findAll',
        method: 'post',
        data: query
    })
}

// 获取历史数据(人口)
export function personHistory(query) {
    return request({
        url: 'person/history',
        method: 'post',
        data: query
    })
}
// 获取历史数据(法人)
export function legalpersonHistory(query) {
    return request({
        url: 'legalperson/history',
        method: 'post',
        data: query
    })
}

// 获取所有元数据信息
export function getAllMeta(query) {
    return request({
        url: 'meta',
        method: 'post',
        data: query
    })
}

// 获取元数据详情
export function getMetaDetail(query) {
    return request({
        url: 'meta/detail',
        method: 'post',
        data: query
    })
}

// 获取主数据列表-人口
export function getMasterPersons(query) {
    return request({
        url: 'master/person',
        method: 'post',
        data: query
    })
}

// 获取人口详情数据
export function getMasterPersonInfos(query) {
    return request({
        url: 'master/getInfo',
        method: 'post',
        data: query.idcard,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

// 获取主数据列表-法人
export function getMasterLegals(query) {
    return request({
        url: 'master/legal',
        method: 'post',
        data: query
    })
}

// 获取法人详情数据
export function getMasterLegalInfos(query) {
    return request({
        url: 'master/legalInfo',
        method: 'post',
        data: query.uniScid,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
// 获取地理信息下拉列表
export function getMasterGeographicList(query) {
    return request({
        url: 'geographic/tablename',
        method: 'get',
        // data: query.uniScid,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
// 获取地理信息查询列表
export function getMasterGeographicInfos(query) {
    return request({
        url: 'geographic/tableinfo',
        method: 'post',
        data: query,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

// API接口服务-获取所有接口
export function getAllApis() {
    return request({
        url: 'master/api',
        method: 'post'
    })
}
