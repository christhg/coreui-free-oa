// 獲取表單已簽核的紀錄
import request from '@/utils/request'

export function getSignedRecords (formNo) {
  const params = new URLSearchParams()
  params.append('formNo', formNo)
  // return request.get('/wflow/signrecords/', {params})
  return request.get('/wflow/signrecords/' + formNo)
}
