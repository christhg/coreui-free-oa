import Vue from 'vue'
import Router from 'vue-router'
//
import {
  OA, // 用於子組件路由
  Myclosed, Myapproved, Mywaiting, Mysubmit, Myapply, PublishBoard, MyHistoryApproved, MyHistorySubmit,
  Overtime, OvertimeView, OvertimeApprove, Leave, LeaveView, LeaveApprove,
  Table1, Table2, Scroll, Full,
  Dashboard, SystemApps, Trees,
  OrgsView, OrgsChartView, OrgsEdit, EmpsList, OrgsList, WFList,
  DccApply, DccCurrent, DccExpired
} from '@/views'
//
// import HRRouter from './hr'

Vue.use(Router)

// OA 相關路由
var OARouter = {
  path: 'OA',
  name: 'OA應用',
  component: OA,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'Myapply',
      name: '我的申請單',
      component: Myapply
    },
    {
      path: 'Mysubmit',
      name: '我的申請',
      component: Mysubmit
    },
    {
      path: 'Myclosed',
      name: '已結案文件',
      component: Myclosed
    },
    {
      path: 'Mywaiting',
      name: '我的審批',
      component: Mywaiting,
      meta: { requiresAuth: false }
    },
    {
      path: 'Myapproved',
      name: '已審核文件',
      component: Myapproved
    },
    {
      path: 'MyHistoryApproved',
      name: '歷史審核查詢',
      component: MyHistoryApproved
    },
    {
      path: 'MyHistorySubmit',
      name: '歷史申請查詢',
      component: MyHistorySubmit
    }
  ]
}
// HR 相關路由
var HRRouter = {
  path: 'HR',
  name: 'HR應用',
  // redirect: 'HR/Overtime',
  component: OA,
  meta: { requiresAuth: false }, // 子組件則全部允許
  children: [
    {
      path: 'Overtime',
      name: '加班單',
      component: Overtime
    },
    {
      // path: 'OvertimeView/:formNo',
      path: 'OvertimeView',
      name: '加班單查看',
      component: OvertimeView
      // props: true
    },
    {
      path: 'OvertimeApprove',
      name: '加班單審批',
      component: OvertimeApprove
      // props: true
    },
    {
      path: 'Leave',
      name: '請假單',
      component: Leave
    },
    {
      path: 'LeaveView',
      name: '請假單查看',
      component: LeaveView
    },
    {
      path: 'LeaveApprove',
      name: '請假單審核',
      component: LeaveApprove
    }
  ]
}
// Demo
var DemoRouter = {
  path: 'Demo',
  name: 'Demo測試應用',
  component: OA,
  redirect: 'Demo/table1',
  meta: { requiresAuth: false }, // 子組件則全部允許
  children: [
    {
      path: 'mytrees',
      name: 'myTrees',
      component: Trees
    },
    {
      path: 'table1',
      name: 'Table1',
      component: Table1
    },
    {
      path: 'table2',
      name: 'Table2',
      component: Table2
    },
    {
      path: 'scroll',
      name: 'Scroll',
      component: Scroll
    }
  ]
}
// Adm
var AdmRouter = {
  path: 'Adm',
  name: '後台管理應用',
  component: OA,
  children: [
    {
      path: 'dashboard',
      name: '我的儀表板',
      component: Dashboard
    },
    {
      path: 'OrgsView',
      name: '組織樹狀結構',
      component: OrgsView
    },
    {
      path: 'OrgsChartView',
      name: '組織結構圖',
      component: OrgsChartView
    },
    {
      path: 'OrgsEdit',
      name: '編輯組織管理',
      component: OrgsEdit
    },
    {
      path: 'EmpsList',
      name: '員工列表',
      component: EmpsList
    },
    {
      path: 'OrgsList',
      name: '組織列表',
      component: OrgsList
    },
    {
      path: 'WFList',
      name: '工作流列表',
      component: WFList
    }
  ]
}
// DCC
var DccRouter = {
  path: 'DCC',
  name: '文件管理中心',
  component: OA,
  children: [
    {
      path: 'dashboard',
      name: '我的儀表板',
      component: Dashboard
    },
    {
      path: 'DccApply',
      name: '文件新增/修改/廢除',
      component: DccApply
    },
    {
      path: 'DccCurrent',
      name: '當前文件',
      component: DccCurrent
    },
    {
      path: 'DccExpired',
      name: '過期文件',
      component: DccExpired
    }
  ]
}

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: '我的儀表板',
          component: Dashboard,
          meta: { requiresAuth: false }
        },
        {
          path: 'SystemApps',
          name: '其他系統應用',
          component: SystemApps,
          meta: { requiresAuth: false }
        },
        {
          path: 'PublishBoard',
          name: '系統公告',
          component: PublishBoard,
          meta: { requiresAuth: false }
        },
        {
          path: 'DEER_HR',
          name: '人事系統平台',
          redirect: 'HR'
        },
        OARouter,
        HRRouter,
        DemoRouter,
        AdmRouter,
        DccRouter
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index'), // Lazy Loading component
      meta: { requiresAuth: false }
    },
    {
      path: '/404', component: () => import('@/views/pages/404'), hidden: true, meta: { requiresAuth: false }
    },
    {
      path: '*', redirect: '/404', hidden: true, meta: { requiresAuth: false }
    }
  ]
})
