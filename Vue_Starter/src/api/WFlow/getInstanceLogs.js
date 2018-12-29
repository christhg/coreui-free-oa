// 獲取表單簽核各關卡狀態
import request from '@/utils/request'

export function getInstanceLogs (formNo) {
  const params = new URLSearchParams()
  params.append('formNo', formNo)
  return request.get('/wflow/instancestatus/', {params})
}
