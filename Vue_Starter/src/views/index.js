// 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，
// 这样就更加高效了。
// const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
// 簡易寫法:
// const Foo = () => import('./Foo.vue')
// *****************************************************************

// import('./Foo.vue') // 返回 Promise
// Containers
// import Full from '@/containers/Full'
const Full = () => import('@/containers/Full')
// Demo
// import Table1 from '@/views/Demo/Table1'
// import Table2 from '@/views/Demo/Table2'
// import Trees from '@/views/demo/treelist'
const Table1 = () => import('@/views/demo/Table1')
const Table2 = () => import('@/views/demo/Table2')
const Trees = () => import('@/views/demo/treelist')
const Scroll = () => import('@/views/demo/Scroll')

// OA
// import OA from '@/views/OA/OA'
// import Dashboard from '@/views/OA/Dashboard'
// import Myapply from '@/views/OA/Myapply' // 我的應用表單
// import Mysubmit from '@/views/OA/Mysubmit' // 提交文件
// import Myclosed from '@/views/OA/Myclosed' // 待審文件
// import Mywaiting from '@/views/OA/Mywaiting' // 待審文件
// import Myapproved from '@/views/OA/Myapproved' // 已審文件
// import SystemApps from '@/views/OA/SystemApps'
const OA = () => import('@/views/oa/OA')
const Dashboard = () => import('@/views/oa/Dashboard')
const Myapply = () => import('@/views/oa/Myapply')
const Mysubmit = () => import('@/views/oa/Mysubmit')
const Myclosed = () => import('@/views/oa/Myclosed')
const Mywaiting = () => import('@/views/oa/Mywaiting')
const Myapproved = () => import('@/views/oa/Myapproved')
const MyHistoryApproved = () => import('@/views/oa/MyHistoryApproved')
const MyHistorySubmit = () => import('@/views/oa/MyHistorySubmit')
const SystemApps = () => import('@/views/oa/SystemApps')
const PublishBoard = () => import('@/views/oa/PublishBoard')
// --------------------------------------------------------------------
// HR
// import HR from '@/views/HR/HR'
// import Overtime from '@/views/HR/Overtime' // 加班單
// import OvertimeView from '@/views/HR/OvertimeView' // 加班單View
// import OvertimeApprove from '@/views/HR/OvertimeApprove' // 簽核加班單
const HR = () => import('@/views/hr/HR')
const Overtime = () => import('@/views/hr/Overtime')
const OvertimeView = () => import('@/views/hr/OvertimeView')
const OvertimeApprove = () => import('@/views/hr/OvertimeApprove')
const Leave = () => import('@/views/hr/Leave')
const LeaveView = () => import('@/views/hr/LeaveView')
const LeaveApprove = () => import('@/views/hr/LeaveApprove')
// -----------------------------------------------------------------
// Adm
const Adm = () => import('@/views/adm/Adm')
const OrgsView = () => import('@/views/adm/OrgsView')
const OrgsChartView = () => import('@/views/adm/OrgsChartView')
const OrgsEdit = () => import('@/views/adm/OrgsEdit')
const EmpsList = () => import('@/views/adm/EmpsList')
const OrgsList = () => import('@/views/adm/OrgsList')
const WFList = () => import('@/views/adm/WFList')
// -------------------------------------------------------------------
// DCC
const DCC = () => import('@/views/dcc/Dcc')
const DccApply = () => import('@/views/dcc/DccApply')
const DccCurrent = () => import('@/views/dcc/DccCurrent')
const DccExpired = () => import('@/views/dcc/DccExpired')

export {
  Full,
  Dashboard,
  Table1,
  Table2,
  Trees,
  Scroll,
  // ----
  OA,
  SystemApps,
  Myapply,
  Mysubmit,
  Myapproved,
  Myclosed,
  Mywaiting,
  PublishBoard,
  MyHistoryApproved,
  MyHistorySubmit,
  // -----
  HR,
  Overtime,
  OvertimeView,
  OvertimeApprove,
  Leave,
  LeaveView,
  LeaveApprove,
  // ------
  Adm,
  OrgsView,
  OrgsChartView,
  OrgsEdit,
  EmpsList,
  OrgsList,
  WFList,
  // -----
  DCC,
  DccApply,
  DccCurrent,
  DccExpired
}
