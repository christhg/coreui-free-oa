import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // store的state永久性保存在localstorage
import user from './modules/user'
import app from './modules/app'

// 獲取state的資料ex:store.getters.token
const getters = {
  // 用戶user資料
  uid: state => state.user.uid,
  username: state => state.user.username,
  name: state => state.user.name,
  emp_no: state => state.user.emp_no,
  email: state => state.user.email,
  org_node_no: state => state.user.branch_no,
  org_node_name: state => state.user.org_node_name,
  up_org_node_no: state => state.user.up_org_node_no,
  pub_company_id: state => state.user.pub_company_id,
  company_no: state => state.user.fact_no,
  token: state => state.user.token,
  status: state => state.user.status, // 用戶資料拉取狀態,成功:true
  roles: state => state.user.roles, // 用戶角色
  // 系統app資料
  app_code: state => state.app.app_code, // 當前系統app代碼
  app_name: state => state.app.app_name,
  applists: state => state.app.applists,
  menulists: state => state.app.menulists,
  navitems: state => state.app.navitems,
  waitingcount: state => state.app.waitingcount,
  ismobile: state => state.app.ismobile,
  loading: state => state.app.loading
}

// 引用Vuex
Vue.use(Vuex)
// 創建store倉庫
const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
