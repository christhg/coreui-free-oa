// import qs from 'qs'
// 更新已送審的加班單主表明細表
import request from '@/utils/request'

export function postOvertimesSignUpdate (obj) {
  return request({
    url: '/hr/overtimesformsign/update',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}
