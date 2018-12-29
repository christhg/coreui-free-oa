// import qs from 'qs'
/// 表單簽核動作
/// --0:作廢;
/// --1:暫存草稿;
/// --2:送單([重新]申請/簽核/核准);\n
/// --3:撤單(說明:在後面主管已簽的情況下,撤單並不是一件嚴肅的事情, 可用[駁回] 替代[撤單]更合理);
/// --A-X:駁回(到前1…前24關),
/// --Y:駁回(到前一有編輯權者(推薦)),
/// --Z:駁回(到申請者))
import request from '@/utils/request'

export function postSign (obj) {
  return request({
    url: '/wflow/sign/',
    method: 'post',
    data: obj // JSON.stringify(obj)
  })
}

// // Send a POST request
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
