import request from '../utils/request.js';

// 总体情况
export function getQualityAll() {
  return request({
    url: 'quality/all',
    method: 'post'
  })
}

// 及时性
export function getTimely(){
  return request({
    url: 'quality/timeliness',
    method: 'post'
  })
}

//质量提升
export function getQualityLift(){
  return request({
    url: 'quality/lift',
    method: 'post'
  })
}

//质量报告
export function getQualityReport(){
  return request({
    url: 'quality/report',
    method: 'post'
  })
}

//及时性明细
export function getTimelyDetail(){
  return request({
    url: 'quality/detail',
    method: 'post'
  })
}

//问题看板
export function getProblem(){
  return request({
    url: 'quality/board',
    method: 'post'
  })
}
