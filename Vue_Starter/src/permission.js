import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单
// const routelist = store.getters.navitems // 用戶可路由list清單,url屬性

router.beforeEach((to, from, next) => {
  NProgress.start() // Start the route progress bar.
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // 01.登入後讀取用戶訊息
      if ((store.getters.uid === '') && (store.getters.status === false)) {
        // 使用async/await同步操作
        // 1.先獲取到userinfo後才能獲取到store.getters.uid...參數,
        // 2.再去獲取applists,menulists
        (async function () {
          try {
            var p1 = await store.dispatch('GetUserInfo', store.getters.username)
            console.log(p1)
            if (p1.code !== 100) throw p1.msg
            var p2 = await store.dispatch('GetUserApps', {userId: store.getters.uid, pubCompanyId: store.getters.pub_company_id})
            if (p2.code !== 100) throw p2.msg
            console.log(p2)
            var p3 = await store.dispatch('GetAppMenus', {user_id: store.getters.uid, app_code: store.getters.app_code, pub_company_id: store.getters.pub_company_id})
            if (p3.code !== 100) throw p3.msg
            console.log(p3)
            next()
          } catch (error) {
            Message.error('用戶基本資料有誤!!錯誤訊息：' + error)
            // MessageBox.alert('用戶基本資料有誤,請聯繫管理員!!' + error, '錯誤訊息')
            store.commit('CLEAR_TOKEN') // 清空token
            store.commit('CLEAR_USER') // 清空store
            next({ path: '/login' }) // 重定向到login頁面
            NProgress.done()
          }
        }())
      } else {
        // 02.每次頁面路由時,讀取用戶待簽筆數 >> 取消
        // store.dispatch('GetWaitingCount', {userId: store.getters.uid, pubCompanyId: store.getters.pub_company_id})
        // --------------------------------------------------------

        // 03.APP頁面路由權限檢查 >> 忽略了APPLIST的檢查
        // console.log(store.getters.applists.some(x => '/' + x.APP_CODE === to.path))
        // 04.菜單頁面路由權限檢查
        // 0401.router的mata.requiresAuth = false 則忽略 next()
        // 0402.menulists中url與to.path比對 = true 則 next()
        // console.log(store.getters.menulists.some(x => x.ACTION_URL === to.path))
        // console.log(to.path)
        //

        if (store.getters.applists.some(x => '/' + x.APP_CODE === to.path)) {
          // APP頁面路由權限檢查
          next()
        } else if (to.matched.some(record => record.meta.requiresAuth === false) || store.getters.menulists.some(x => x.ACTION_URL === to.path)) {
          // 菜單頁面路由權限檢查
          next()
        } else {
          // 無權限404
          next('/404')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next() // login頁面
    } else {
      next('/login') // 重導向到login頁面
    }
    store.dispatch('ClearUserInfo') // 清空 user
    store.dispatch('ClearAppsInfo') // 清空 app
    NProgress.done() // 出錯後
  }
})

router.afterEach((to, from, next) => {
  NProgress.done() // 完成路由後,Complete the animation of the route progress bar.
})
