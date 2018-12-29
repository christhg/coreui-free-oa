
// 用戶登入
import qs from 'qs'
import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}
