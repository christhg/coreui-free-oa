// 獲取類別目錄資料清單
import request from '@/utils/request'

export function getCategories (categoryNo) {
  // const params = new URLSearchParams()
  // params.append('pubCompanyId', pubCompanyId)

  return request.get('/dcc/categories/' + categoryNo)
}
