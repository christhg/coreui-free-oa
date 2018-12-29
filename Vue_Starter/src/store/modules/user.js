import { setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/Login/login'
import { userInfo } from '@/api/Login/userinfo.js'
import { Message } from 'element-ui'
// import jobs from '@/utils/jobs.js'

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
    org_node_name: '',
    up_org_node_no: '',
    email: '',
    status: false,
    auth_type: '',
    token: '', // getToken(),
    avatar: '',
    sidebar: ''
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
      state.org_node_name = user.org_node_name
      state.up_org_node_no = user.up_org_node_no
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
      state.org_node_name = ''
      state.up_org_node_no = ''
      state.email = ''
      state.status = false
      // 當前系統基本資料
      // state.app_code = ''
      // state.app_name = ''
      // state.applists = []
      // state.menulists = []
      // state.navitems = []
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
              resolve({code: 100, msg: username + '登入成功.'})
            } else {
              resolve({code: 201, msg: '帳密錯誤.'})
              Message.error('201,帳號或密碼錯誤!')
            }
          }).catch(error => {
            reject(error)
          })
      })
    },
    Logout ({ commit }) {
      // clear user
      this.dispatch('ClearUserInfo')
      // clear apps
      this.dispatch('ClearAppsInfo')
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
        org_node_name: '',
        up_org_node_no: '',
        email: '',
        status: false
      }
      return new Promise((resolve, reject) => {
        userInfo(username).then(response => {
          let userdata = response.data.Data
          if (userdata.length === 0) {
            resolve({code: 202, msg: '202.用戶沒有員工基本資料!'})
          }
          let data = response.data.Data[0]
          user.username = data.LDAP_UID
          user.name = data.EMP_NAME
          user.uid = data.ID
          user.emp_no = data.EMP_NO
          user.fact_no = data.COMPANY_NO
          user.pub_company_id = data.PUB_COMPANY_ID
          user.branch_no = data.ORG_NODE_NO
          user.org_node_name = data.ORG_NODE_NAME
          user.up_org_node_no = data.UP_ORG_NODE_NO
          user.email = data.MAIL
          user.status = true
          // console.log(user)
          commit('SET_USER', user)
          // resolve({code: '100', msg: 'success', userId: user.uid, pubCompanyId: user.pub_company_id})
          resolve({code: 100, msg: 'GetUserInfor成功'})
        }).catch(error => reject(error))
      })
    },
    ClearUserInfo ({ commit }) {
      commit('CLEAR_USER')
      commit('CLEAR_TOKEN')
      // jobs.stop() // stop job
    }

  }
}

export default user
