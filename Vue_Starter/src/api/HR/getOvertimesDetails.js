// 獲取加班單明細資料
import request from '@/utils/request'

export function getOvertimesDetails (formNo) {
  const params = new URLSearchParams()
  params.append('formNo', formNo)

  return request.get('/hr/overtimes/details/', {params})
}
