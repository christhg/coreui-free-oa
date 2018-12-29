// import qs from 'qs'
import request from '@/utils/request'

export function postOvertimes (obj) {
  return request({
    url: '/hr/overtimesmaster',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}
