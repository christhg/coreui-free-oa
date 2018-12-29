// 執行表單催簽動作
/*
    {
            "uums_form_kind_id":102,
            "pub_company_id":"200",
            "form_no":"HROT2200-1806280002",
            "act_sign_uid":"1109397",
            "act_sign_user_ip":"192.168.220.80"  >> 改成後台處理
    }
*/
import request from '@/utils/request'

export function postUrge (obj) {
  return request({
    url: '/wflow/urge/',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}
