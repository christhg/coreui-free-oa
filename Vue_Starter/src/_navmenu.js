// 依據用戶菜單權限,動態顯示左側菜單項目
import store from '@/store'
let menulists = store.getters.menulists

let items = [
  {
    name: 'demo',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Theme',
    class: '',
    wrapper: {
      element: '',
      attributes: {}
    }
  }
]

if (menulists.length > 0) {
  for (var i = 0; i < menulists.length; i++) {
    let item = null
    if (menulists[i].PARENT_MENU_NO === null) {
      item = {
        name: menulists[i].MENU_NAME,
        url: menulists[i].ACTION_URL,
        icon: 'icon-speedometer',
        children: []
      }
      for (var j = 0; j < menulists.length; j++) {
        if (menulists[j].PARENT_MENU_NO === menulists[i].MENU_NO) {
          var subitem = {
            name: menulists[j].MENU_NAME,
            url: menulists[j].ACTION_URL,
            icon: 'icon-speedometer'
          }
          item.children.push(subitem)
        }
      }
    }
    items.push(item)
  }
}

export default {
  items: items
}
