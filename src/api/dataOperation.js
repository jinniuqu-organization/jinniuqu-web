import request from '../utils/request';


//数据标准化
export const standard = (query) => {
    return request({
        url: '/operation/standard',
        method: 'post',
        data:query||{}
    })
};;
// 数据治理基础库
export const basis = (query) => {
    return request({
        url: '/basis',
        method: 'post',
       data:query||{}
    })
};
//获取详情pdf
export const getPdf = (query) => {
    return request({
        url: '/basis/pdf',
        method: 'post',
       data:query||{}
    })
}
// 数据治理服务库
export const server = (query) => {
    return request({
        url: '/server',
        method: 'post',
       data:query||{}
    })
};
// 标准编码服务
export const standardServer = (query) => {
    return request({
        url: '/standard/server',
        method: 'post',
       data:query||{}
    })
};
//  标准化数据TOP
export const standardTop = (query) => {
    return request({
        url: '/standard/top',
        method: 'post',
       data:query||{}})
};
// 重点编码Top
export const standardCode = (query) => {
    return request({
        url: '/standard/code',
        method: 'post',
       data:query||{}
    })
};
//编码标准化列表
export const standardWord = (query) => {
    return request({
        url: '/standard/word',
        method: 'post',
       data:query||{}
    })
};

// 右侧单位信息
export const getUnitInfos = (query) => {
  return request({
    url: '/operation/application',
    method: 'post',
    data:query||{}
  })
};

// 运行02-编码映射
export const transform = (query) => {
  return request({
    url: '/operation/transform',
    method: 'post',
    data:query||{}
  })
};

export const getTransformInfo = (query) => {
  return request({
    url: '/operation/manage',
    method: 'post',
    data:query||{}
  })
};


export const getAllStandardService = () => {
  return request({
    url: 'operation/service',
    method: 'post'
  })
};
