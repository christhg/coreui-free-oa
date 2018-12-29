import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'

// axios實例service
// process.env.BASE_API,
const service = axios.create({
  baseURL: 'http://ssoapi.deer-group.com.cn/api/', // 後台API的BASE URL地址
  // baseURL: 'http://192.168.188.187/api/',
  timeout: 15000
})

// request攔截器:加上headers[]
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
},
error => {
  return Promise.reject(error)
})

// response攔截器:先行判斷response的訊息
service.interceptors.response.use(response => {
    return response
},
error => {
  return Promise.reject(error)
})

export default service
