import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
// import loading from '@/utils/loading.js'
// import NProgress from 'nprogress' // Progress 进度条

// axios實例service
// process.env.BASE_API,
const service = axios.create({
  baseURL: 'http://ssoapi.deer-group.com.cn/api/', // 後台API的BASE URL地址
  // baseURL: 'http://192.168.188.187/api/',
  timeout: 30000
  // responseType: 'json',
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // }
})

// request攔截器:加上headers[]
service.interceptors.request.use(config => {
  // Loading.start() // 加載loading圖片
  store.commit('SHOW_LOADING')
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
},
error => {
  // Loading.close()
  store.commit('HIDE_LOADING')
  return Promise.reject(error)
})

// response攔截器:先行判斷response的訊息
service.interceptors.response.use(response => {
  // Loading.close() // 取消加載loading圖片
  store.commit('HIDE_LOADING')
  const datas = response.data
  if (datas.Status === 201) {
    Message({
      message: '更新成功',
      type: 'success',
      duration: 5 * 1000
    })
    return response
  } else if (datas.Status === 204) {
    Message({
      message: '刪除成功',
      type: 'success',
      duration: 5 * 1000
    })
    return response
  } else {
    return response
  }
},
error => {
  // Loading.close() // 取消加載loading圖片
  store.commit('HIDE_LOADING')
  Message({
    message: '網路錯誤或系統錯誤:' + error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
