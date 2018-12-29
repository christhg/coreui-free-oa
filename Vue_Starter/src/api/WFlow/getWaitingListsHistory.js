// 查詢當前時間30天前紀錄
import request from '@/utils/request'

export function getWaitingListsHistory (userId, listType, pageNo, pageSize, begin, end) {
  if (begin === null) begin = -90
  if (end === null) end = 1
  const params = new URLSearchParams()
  params.append('userId', userId)
  params.append('listType', listType)
  params.append('pageNo', pageNo)
  params.append('pageSize', pageSize)
  params.append('begin', begin)
  params.append('end', end)
  return request.get('/wf/waitinglist/historypages', {params})
}
