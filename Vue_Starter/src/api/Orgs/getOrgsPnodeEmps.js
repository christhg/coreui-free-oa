// 獲取該上層節點部門的員工
import request from '@/utils/request'

export function getOrgsPnodeEmps (pubCompanyId, pnodeNo) {
  return request.get('/orgs/emps/pnodeno/' + pnodeNo + '/' + pubCompanyId)
}
