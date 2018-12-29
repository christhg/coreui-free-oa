// import qs from 'qs'
// 請假單主表明細表送審
import request from '@/utils/request'

export function postLeavesSign (obj) {
  return request({
    url: '/hr/leavesformsign',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}
