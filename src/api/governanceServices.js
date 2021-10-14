import request from '../utils/request.js';

// 采集统计数据(各部门)
export function getCollectionInfo() {
  return request({
    url: 'server/collect',
    method: 'post'
  })
}

//总体采集信息
export function getCollectionAll() {
  return request({
    url: 'server/all',
    method: 'post'
  })
}

//获取监管数据流(中间各部门信息)
export function getMonitorData(query) {
  return request({
    url: 'server/getInfo',
    method: 'post',
    data:query||{}
  })
}

//获取数据流
export function getChart() {
  return request({
    url: 'server/chart',
    method: 'post'
  })
}
