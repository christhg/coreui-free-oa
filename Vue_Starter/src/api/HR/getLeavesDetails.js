// 獲取請假單明細資料
import request from '@/utils/request'

export function getLeavesDetails (formNo) {
  const params = new URLSearchParams()
  params.append('formNo', formNo)

  return request.get('/hr/leaves/details/', {params})
}
