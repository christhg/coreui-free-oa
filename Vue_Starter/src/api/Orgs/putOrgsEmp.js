// 更新員工基本資料清單
import request from '@/utils/request'

export function putOrgsEmp (obj) {
  return request({
    url: '/orgs/employee',
    method: 'put',
    data: obj // JSON.stringify(obj)
  })
}
