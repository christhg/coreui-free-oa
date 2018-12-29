// 組織節點明細
import request from '@/utils/request'

export function getOrgsNode (pubCompanyId, nodeNo) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  params.append('nodeNo', nodeNo)
  return request.get('/orgs/node/', {params})
}
