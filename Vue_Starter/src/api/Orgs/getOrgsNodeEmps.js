// 獲取該上層節點部門的員工
import request from '@/utils/request'

export function getOrgsNodeEmps (pubCompanyId, nodeNo) {
  return request.get('/orgs/emps/nodeno/' + nodeNo + '/' + pubCompanyId)
}
