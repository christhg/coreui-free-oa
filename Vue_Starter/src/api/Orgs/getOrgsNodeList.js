// 所有組織節點清單
import request from '@/utils/request'

export function getOrgsNodeList (pubCompanyId, nodeNo) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  return request.get('/orgs/nodelist/', {params})
}
