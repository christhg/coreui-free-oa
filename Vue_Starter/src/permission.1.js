import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // 登入後讀取用戶訊息
      if ((store.getters.uid === '') && (store.getters.status === false)) {
        // 使用async/await同步操作
        // 1.先獲取到userinfo後才能獲取到store.getters.uid...參數,
        // 2.再去獲取applists,menulists
        (async function () {
          try {
            var p1 = await store.dispatch('GetUserInfo', store.getters.username)
            console.log('get userinfo ok:' + p1)
            var p2 = await store.dispatch('GetUserApps', {userId: store.getters.uid, pubCompanyId: store.getters.pub_company_id})
            console.log('get apps ok: ' + p2)
            var p3 = await store.dispatch('GetAppMenus', {user_id: store.getters.uid, app_code: store.getters.app_code, pub_company_id: store.getters.pub_company_id})
            console.log('get menus ok: ' + p3)
            next()
          } catch (err) {
            Message.error('拉取用戶資料錯誤,請重新登入or聯繫管理員!!')
            store.commit('CLEAR_TOKEN') // 清空token
            store.commit('CLEAR_USER') // 清空store
            next({ path: '/login' })
            NProgress.done()
          }
        }())
      } else {
        // 每次頁面路由時,讀取用戶待簽筆數
        store.dispatch('GetWaitingCount', {userId: store.getters.uid, pubCompanyId: store.getters.pub_company_id})
        // --------------------------------------------------------
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
    store.dispatch('ClearUserInfo')
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
})
