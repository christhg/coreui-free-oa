// 使用 requestnative.js 不加載loading圖片,以及message.
// 獲取表單待簽筆數
import request from '@/utils/requestnative.js'

export function getWaitingCount (userId, formKindId, pubCompanyId) {
  const params = new URLSearchParams()
  params.append('userId', userId)
  params.append('formKindId', formKindId)
  params.append('pubCompanyId', pubCompanyId)
  return request.get('/wflow/waitingcount/', {params})
}
