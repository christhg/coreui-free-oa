// 獲取用戶擁有的菜單清單
import qs from 'qs'
import request from '@/utils/request'

export function userMenus (userid, appcode, pubcompanyid) {
  return request({
    url: '/sys/menus',
    method: 'post',
    data: qs.stringify({
      'user_id': userid,
      'app_code': appcode,
      'pub_company_id': pubcompanyid
    })
  })
}
