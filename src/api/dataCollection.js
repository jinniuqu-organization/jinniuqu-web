import request from '../utils/request.js';

// 采集统计数据(各部门)
export function getCollectionInfo() {
  return request({
    url: 'new/tableName',
    method: 'post'
  })
}

//总体采集信息
export function getCollectionAll() {
  return request({
    url: 'new/all',
    method: 'post'
  })
}

//获取数据归集情况
export function getMonitorData(query) {
  return request({
    url: 'new/getInfo',
    method: 'post',
    data:query||{}
  })
}

//获取文档列表
export function getDocList(query) {
  return request({
    url: '/new/word',
    method: 'post',
    data:query||{}
  })
}

//数据更新情况
export function getUpdate(query) {
  return request({
    url: 'new/update',
    method: 'post',
    data:query||{}
  })
}

//获取数据流
export function getChart() {
  return request({
    url: 'new/chart',
    method: 'post'
  })
}

// 获取文档的详细信息
export function getDocInfo(query) {
  return request({
    url: 'new/wordInfo',
    method: 'post',
    data:query||{}
  })
}
