// 时间比较（yyyy-MM-dd）
export function compareDate (startDate, endDate) {
  var arrStart = startDate.split('-')
  var startTime = new Date(arrStart[0], arrStart[1], arrStart[2])
  var startTimes = startTime.getTime()
  var arrEnd = endDate.split('-')
  var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2])
  var endTimes = endTime.getTime()
  if (endTimes < startTimes) {
    // alert('加班时间不能小于今天')
    return false
  }
  return true
}
// 时间比较（yyyy-MM-dd HH:mm:ss）
export function compareTime (startTime, endTime) {
  var startTimes = startTime.substring(0, 10).split('-')
  var endTimes = endTime.substring(0, 10).split('-')
  startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19)
  endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19)
  var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000
  if (thisResult < 0) {
    alert('endTime小于tartTime！')
  } else if (thisResult > 0) {
    alert('endTime大于tartTime！')
  } else if (thisResult === 0) {
    alert('endTime等于tartTime！')
  } else {
    return '异常'
  }
}
