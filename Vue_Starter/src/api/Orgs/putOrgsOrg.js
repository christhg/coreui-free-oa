// 更新員工基本資料清單
import request from '@/utils/request'

export function putOrgsOrg (obj) {
  return request({
    url: '/orgs/org',
    method: 'put',
    data: obj // JSON.stringify(obj)
  })
}
