import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre

export const page_list = (pageNo,pageSize,params) => {
  let query = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + pageNo + '/' + pageSize + '/?' + query)
}

export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add',params)
}

export const page_get = pageId => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + pageId);
}

export const page_edit = (pageId,params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + pageId,params);
}

export const page_del = pageId => {
  return http.requestDelete(apiUrl + "/cms/page/del/" + pageId);
}
