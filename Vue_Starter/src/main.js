// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store' // 引入vuex組件
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'bulma/css/bulma.min.css'
import '@/permission.js' // 驗證是否有token
import 'vue-orgchart/dist/style.min.css'// 引用orgchart
// 引用easytable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'
// 引用htmltopdf
import htmlToPdf from '@/utils/htmlToPdf.js'
// 註冊easytable表格
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
// 註冊BootstrapVue
Vue.use(BootstrapVue)
// 註冊Scroll滾動條
// 註冊htmlToPdf
Vue.use(htmlToPdf)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 註冊router
  store, // 註冊store
  template: '<App/>',
  components: {
    App
  }
})
