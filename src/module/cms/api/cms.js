import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre
export const page_list = (pageNo,pageSize,params) => {
  let query = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + pageNo + '/' + pageSize + '/?' + query)
}
