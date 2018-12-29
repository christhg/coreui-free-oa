import { userApps } from '@/api/Login/userapps.js'
import { userMenus } from '@/api/Login/usermenus.js'
import { getWaitingCount } from '@/api/WFlow/getWaitingCount.js'
// import jobs from '@/utils/jobs.js'

const iconlists = [
  'icon-layers', 'icon-book-open', 'icon-social-dropbox', 'icon-briefcase', 'icon-drawer', 'icon-puzzle', 'icon-shield', 'icon-badge', 'icon-tag', 'icon-heart'
]

const navs = [
  {
    name: 'Home',
    url: '/',
    icon: 'icon-grid'
  },
  {
    title: true,
    name: 'Menu系統菜單',
    class: '',
    wrapper: {
      element: '',
      attributes: {}
    }
  },
  {
    name: '說明文檔(Help Doc)', // 'Download CoreUI',
    url: 'http://coreui.io/vue/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'danger'
  },
  {
    name: '問題反映(Contact)', // 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/vue/',
    icon: 'icon-layers',
    variant: 'success'
  }
]

const app = {
  state: {
    // 當前系統基本資料
    status: false,
    app_code: '',
    app_name: '',
    applists: [],
    menulists: [],
    navitems: [],
    roles: [],
    setting: {
      articlePlatform: []
    },
    waitingcount: 0,
    ismobile: false,
    loading: false // page loading show loading image
  },
  mutations: {
    SET_APPLISTS: (state, applists) => {
      state.applists = applists
    },
    CLEAR_APPLISTS: (state) => {
      state.applists = []
    },
    SET_MENULISTS: (state, menulists) => {
      state.menulists = menulists
      // 設定nav items
      state.navitems = []
      const navitems = []
      navs[0].name = state.app_name
      navitems.push(navs[0]) // 顯示Home或系統名稱
      navitems.push(navs[1])
      if (menulists.length > 0) {
        let k = 0
        for (var i = 0; i < menulists.length; i++) {
          let item = null
          let badge = {
            variant: 'success',
            text: 'NEW'
          }

          if (menulists[i].PARENT_MENU_NO === null) {
            item = {
              name: menulists[i].MENU_NAME,
              url: menulists[i].ACTION_URL,
              icon: iconlists[k],
              children: []
            }

            for (var j = 0; j < menulists.length; j++) {
              if (menulists[j].PARENT_MENU_NO === menulists[i].MENU_NO) {
                var subitem = {
                  name: menulists[j].MENU_NAME,
                  url: menulists[j].ACTION_URL,
                  icon: null // iconlists[k]
                }
                if (subitem.name === '新建申請') {
                  subitem.badge = badge
                }
                item.children.push(subitem)
              }
            }
            k++
          }
          if (item !== null) navitems.push(item)
        }
      }
      // navitems.push(navs[2])
      // navitems.push(navs[3])
      state.navitems = navitems // 最後才附值給 state.navitems
    },
    CLEAR_MENULISTS: (state) => {
      state.menulists = []
      state.navitems = []
    },
    SET_APPCODE: (state, appcode) => {
      state.app_code = appcode
      for (var i = 0; i < state.applists.length; i++) {
        if (appcode === state.applists[i].APP_CODE) {
          state.app_name = state.applists[i].APP_NAME
        }
      }
    },
    CLEAR_APPCODE: (state) => {
      state.app_code = null
      state.app_name = null
    },
    SET_WAITING_COUNT: (state, count) => {
      state.waitingcount = count
    },
    SIDEBAR_MIN () { // 左側框最小化
      document.body.classList.toggle('sidebar-minimized')
      document.body.classList.toggle('brand-minimized')
    },
    ON_RESIZE (state) { // 判斷windows寬度,組件mounted()執行commit此方法
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          if (window.screenWidth < 400) {
            state.ismobile = true
          } else {
            state.ismobile = false
          }
        })()
      }
    },
    SHOW_LOADING (state) { // 顯示loading頁面加載
      state.loading = true
    },
    HIDE_LOADING (state) { // 隱藏loading頁面加載
      state.loading = false
    }
  },
  actions: {
    GetUserApps ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userApps(payload.userId, payload.pubCompanyId).then(response => {
          let applists = response.data.Data
          if (applists.length === 0) {
            resolve({code: 203, msg: '203.用戶沒有此APP權限!'})
          }
          commit('SET_APPLISTS', applists)
          commit('SET_APPCODE', applists[0].APP_CODE) // 預設是抓取第一個系統
          resolve({code: 100, msg: 'GetUserApps清單成功.'})
        }).catch(error => reject(error))
      })
    },
    GetAppMenus ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userMenus(payload.user_id, payload.app_code, payload.pub_company_id).then(response => {
          let menulists = response.data.Data
          if (menulists.length === 0) {
            resolve({code: 203, msg: '203.用戶沒有此MENU權限!'})
          }
          commit('SET_APPCODE', payload.app_code)
          commit('SET_MENULISTS', menulists)
          // 08/12.設定get waiting count job 300 seconds --------------->>
          // 08/14.取消..改在MyWaiting.vue讀取
          // jobs.start(() => {
          //   this.dispatch('GetWaitingCount', {userId: this.getters.uid, pubCompanyId: this.getters.pub_company_id})
          // }, 300)
          resolve({code: 100, msg: 'GetMenus菜單成功.'})
        }).catch(error => reject(error))
      })
    },
    GetWaitingCount ({commit}, payload) {
      return new Promise((resolve, reject) => {
        getWaitingCount(payload.userId, 0, payload.pubCompanyId).then(response => {
          commit('SET_WAITING_COUNT', response.data.Data)
          console.log('waitingcount:' + response.data.Data)
        }).catch(error => reject(error))
      })
    },
    ClearAppsInfo ({ commit }) {
      commit('CLEAR_APPLISTS')
      commit('CLEAR_MENULISTS')
      commit('CLEAR_APPCODE')
    }
  }
}

export default app
