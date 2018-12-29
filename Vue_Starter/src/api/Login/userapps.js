// 讀取用戶系統清單
import request from '@/utils/request'

export function userApps (userId, pubCompanyId) {
  const params = new URLSearchParams()
  params.append('user_id', userId)
  params.append('pub_company_id', pubCompanyId)

  return request.get('/sys/apps', {params})
}
