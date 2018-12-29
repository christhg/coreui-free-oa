// 獲取WF設定
import request from '@/utils/request'

export function getPagesWFlowSettings (pubCompanyId, pageNo, pageSize) {
  const params = new URLSearchParams()
  params.append('pubCompanyId', pubCompanyId)
  params.append('pageNo', pageNo)
  params.append('pageSize', pageSize)
  return request.get('/wf/settings', {params})
}
