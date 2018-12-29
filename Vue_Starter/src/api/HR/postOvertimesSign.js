// import qs from 'qs'
// 加班單主表明細表送審
import request from '@/utils/request'

export function postOvertimesSign (obj) {
  return request({
    url: '/hr/overtimesformsign',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}
