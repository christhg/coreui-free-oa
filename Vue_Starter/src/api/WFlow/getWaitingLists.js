// 獲取表單狀態列表清單 listType：1,2,3,4,5
import request from '@/utils/request'

export function getWaitingLists (userId, listType) {
  const params = new URLSearchParams()
  params.append('userId', userId)
  params.append('listType', listType)
  return request.get('/wflow/waitinglists/', {params})
}
