import request from '../utils/request';
// import qs from "qs";


//登录
export const login = (query) => {
    return request({
        url: '/lmp/api/loginIn',
        method: 'post',
        data: qs.stringify(query)
    })
}
// 公共-获取更新时间及指标解释
// 2  汇集监控   3 运行监控01   4 运行监控02   7  质量监控
export function getTimeAndIndex (params) {
  return request({
    url: '/timeAndIndex',
    method: 'post',
    params: params
  })
}
