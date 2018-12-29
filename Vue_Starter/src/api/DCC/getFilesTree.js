// 獲取文件樹
import request from '@/utils/request'

export function getFilesTree (pubCompanyId) {
  // const params = new URLSearchParams()
  // params.append('pubCompanyId', pubCompanyId)

  return request.get('/dcc/filestree/' + pubCompanyId)
}
