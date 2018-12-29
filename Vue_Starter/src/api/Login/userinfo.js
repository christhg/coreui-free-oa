// 獲取用戶基本資料
// return axios.get('url',{obj:obj});     //不这么写就会报错preflight response.
// get 请求中使用params传递参数,可以使用 URLSearchParams or qs.stringify('username','sengyi')
// import axios from 'axios'
import request from '@/utils/request'

export function userInfo (username) {
  const params = new URLSearchParams()
  params.append('username', username)

  return request.get('/sys/userinfo', {params})
  // return axios.get('/api/sys/userinfo', {params})
}
