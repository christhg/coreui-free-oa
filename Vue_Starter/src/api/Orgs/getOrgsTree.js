// 獲取組織樹
import request from '@/utils/request'

export function getOrgsTree (pubCompanyId) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)

  return request.get('/orgs/tree', {params})
}
