// 檢視表單的路由路徑

export function approveRoute (that, formKindId, formNo) {
  switch (formKindId) {
    case 102: // 加班單
      that.push({path: '/HR/OvertimeApprove', query: { formNo: formNo }})
      break
    case 114: // 請假單
      that.push({path: '/HR/LeaveApprove', query: { formNo: formNo }})
      break
  }
}

export function viewRoute (that, formKindId, formNo) {
  switch (formKindId) {
    case 102: // 加班單
      that.push({path: '/HR/OvertimeView', query: { formNo: formNo }})
      break
    case 114: // 請假單
      that.push({path: '/HR/LeaveView', query: { formNo: formNo }})
      break
  }
}
