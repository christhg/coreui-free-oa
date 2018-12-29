// 獲取表單編號
import request from '@/utils/request'

export function getFormNo (formKindId, pubCompanyId) {
  const params = new URLSearchParams()
  params.append('formKindId', formKindId)
  params.append('pubCompanyId', pubCompanyId)

  return request.get('/wflow/getformno/', {params})
}
