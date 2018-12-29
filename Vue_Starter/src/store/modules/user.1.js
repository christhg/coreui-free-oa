import { setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/Login/login'
import { userInfo } from '@/api/Login/userinfo.js'
import { userApps } from '@/api/Login/userapps.js'
import { userMenus } from '@/api/Login/usermenus.js'
import { Message } from 'element-ui'
// icons
const iconlists = [
  'icon-star', 'icon-cursor', 'icon-fire', 'icon-tag', 'icon-heart', 'icon-puzzle', 'icon-shield'
]
// sidebar navitem lists
const navs = [
  {
    name: 'Home',
    url: '/dashboard',
    icon: 'icon-speedometer'
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
// store.user 基本資料
const user = {
  state: {
    // 當前用戶基本資料
    username: '',
    uid: '',
    emp_no: '',
    name: '',
    fact_no: '',
    pub_company_id: '',
    branch_no: '',
    email: '',
    status: false,
    auth_type: '',
    token: '', // getToken(),
    avatar: '',
    sidebar: '',
    // 當前系統基本資料
    app_code: '',
    app_name: '',
    applists: [],
    menulists: [],
    navitems: [],
    roles: [],
    setting: {
      articlePlatform: []
    },
    waitingcount: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    },
    CLEAR_TOKEN: (state) => {
      removeToken()
      state.token = ''
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USER: (state, user) => {
      state.username = user.username
      state.name = user.name
      state.uid = user.uid
      state.emp_no = user.emp_no
      state.fact_no = user.fact_no
      state.pub_company_id = user.pub_company_id
      state.branch_no = user.branch_no
      state.email = user.email
      state.status = user.status
      state.app_code = user.app_code
    },
    CLEAR_USER: (state) => {
      // 當前用戶基本資料
      state.username = ''
      state.name = ''
      state.uid = ''
      state.emp_no = ''
      state.fact_no = ''
      state.pub_company_id = ''
      state.branch_no = ''
      state.email = ''
      state.status = false
      // 當前系統基本資料
      state.app_code = ''
      state.app_name = ''
      state.applists = []
      state.menulists = []
      state.navitems = []
    },
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
                  icon: iconlists[k]
                }
                item.children.push(subitem)
              }
            }
            k++
          }
          if (item !== null) navitems.push(item)
        }
      }
      navitems.push(navs[2])
      // navitems.push(navs[3])
      state.navitems = navitems // 最後才附值給 state.navitems
    },
    SET_APPCODE: (state, appcode) => {
      state.app_code = appcode
      for (var i = 0; i < state.applists.length; i++) {
        if (appcode === state.applists[i].APP_CODE) {
          state.app_name = state.applists[i].APP_NAME
        }
      }
    }
  },
  actions: {
    // context.commit 解構後寫成 commit
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      // 返回Promise對象,成功返回resolve(),失敗返回reject()
      return new Promise((resolve, reject) => {
        login(username, password)
          .then(response => {
            const token = response.data.Data
            if (token) {
              // setToken(token)
              commit('SET_TOKEN', token) // 觸發mutations
              commit('SET_USERNAME', username)
              resolve('登入成功.')
            } else {
              Message.error('帳號或密碼錯誤!')
              resolve('帳密錯誤.')
            }
          }).catch(error => {
            reject(error)
          })
      })
    },
    Logout ({ commit }) {
      commit('CLEAR_TOKEN')
      removeToken()
      commit('CLEAR_USER')
      Message.success('你已登出!!')
    },
    GetUserInfo ({ commit }, username) {
      let user = {
        username: '',
        name: '',
        uid: '',
        emp_no: '',
        fact_no: '',
        pub_company_id: '',
        branch_no: '',
        email: '',
        status: false
      }
      return new Promise((resolve, reject) => {
        userInfo(username).then(response => {
          let data = response.data.Data[0]
          user.username = data.LDAP_UID
          user.name = data.EMP_NAME
          user.uid = data.ID
          user.emp_no = data.EMP_NO
          user.fact_no = data.COMPANY_NO
          user.pub_company_id = data.PUB_COMPANY_ID
          user.branch_no = data.ORG_NODE_NO
          user.email = data.MAIL
          user.status = true
          commit('SET_USER', user)
          resolve({userId: user.uid, pubCompanyId: user.pub_company_id})
        }).catch(error => reject(error))
      })
    },
    GetUserApps ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userApps(payload.userId, payload.pubCompanyId).then(response => {
          let applists = response.data.Data
          user.status = true
          commit('SET_APPLISTS', applists)
          commit('SET_APPCODE', applists[0].APP_CODE) // 預設是抓取第一個系統
          resolve('GetUserApps清單成功.')
        }).catch(error => reject(error))
      })
    },
    GetAppMenus ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userMenus(payload.user_id, payload.app_code, payload.pub_company_id).then(response => {
          let menulists = response.data.Data
          commit('SET_APPCODE', payload.app_code)
          commit('SET_MENULISTS', menulists)
          resolve('GetMenus菜單成功.')
        }).catch(error => reject(error))
      })
    },
    ClearUserInfo ({ commit }) {
      commit('CLEAR_USER')
    },
    GetWaitingCount ({commit}, payload) {
      return new Promise((resolve, reject) => {
        userApps(payload.userId, payload.pubCompanyId).then(response => {
          let applists = response.data.Data
          user.status = true
          commit('SET_APPLISTS', applists)
          commit('SET_APPCODE', applists[0].APP_CODE) // 預設是抓取第一個系統
          resolve('GetUserApps清單成功.')
        }).catch(error => reject(error))
      })
    }
  }
}

export default user
