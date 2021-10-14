import request from '../utils/request';

// 标准数据
export function getStandard() {
  return request({
    url: '/standard',
    method: 'post'
  })
}

// 标准标题
export function getTitle() {
  return request({
    url: '/title',
    method: 'post'
  })
}

// 二级标准标题
export function getSecondTitle(title) {
  let data = {
    firstTitle: title
  }
  return request({
    url: '/secondTitle',
    method: 'post',
    data: data
  })
}

// 获取文件
export function getPdfs(title, start) {
  let data = {
    secondTitle: title,
    pageStart: start
  }
  return request({
    url: '/standard/pdf',
    method: 'post',
    data: data
  })
}

// 获取所有符合条件的文件
export function getAllFiles(titleName) {
  let data = {
    standard: titleName
  }
  return request({
    url: '/standard/search',
    method: 'post',
    data: data
  })
}

// 获取所有的文件（树状结构）
export function getTreeFiles() {
  return request({
    url: '/standard/findAll',
    method: 'post'
  })
}

// 根据id删除文件
export function deleteById(id) {
  return request({
    url: '/standard/delete?id=' + id,
    method: 'post'
  })
}

// 文件管理-新增
export function addFile(params) {
  let body = new FormData();
  Object.keys(params).forEach(key => {
    if (key === 'file') {
      for (let value of params[key]) {
        body.append("file", value);
      }
    } else {
      body.append(key, params[key]);
    }
  });
  return request({
    url: '/file',
    method: 'post',
    data: body
  })
}

// 文件管理-更新
export function updateFile(params) {
  let body = new FormData();
  Object.keys(params).forEach(key => {
    if (key === 'file') {
      for (let value of params[key]) {
        body.append("file", value);
      }
    } else {
      body.append(key, params[key]);
    }
  });
  return request({
    url: '/update',
    method: 'post',
    data: body
  })
}
