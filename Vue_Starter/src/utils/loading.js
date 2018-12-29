
import { Loading } from 'element-ui'

// let Instance = {}

let loadingInstance = {
  Instance: {},
  start () {
    this.Instance = Loading.service({
      fullscreen: true,
      lock: true,
      text: '資料載入中(Loading)...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  close () {
    this.Instance.close()
  }
}

export default loadingInstance
