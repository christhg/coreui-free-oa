// 獲取員工基本資料清單
import request from '@/utils/request'

export function getPagesEmps (pubCompanyId, pageNo, pageSize) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  params.append('pageNo', pageNo)
  params.append('pageSize', pageSize)
  return request.get('/orgs/employees', {params})
}

export function getPagesEmpsBySearch (pubCompanyId, pageNo, pageSize, where) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  params.append('pageNo', pageNo)
  params.append('pageSize', pageSize)
  params.append('where', where)
  return request.get('/orgs/employees', {params})
}
