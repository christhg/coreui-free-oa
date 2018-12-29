// 獲取員工基本資料清單
import request from '@/utils/request'

export function getPagesOrgs (pubCompanyId, pageNo, pageSize) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  params.append('pageNo', pageNo)
  params.append('pageSize', pageSize)
  return request.get('/orgs/orgs', {params})
}
