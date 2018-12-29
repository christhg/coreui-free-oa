// 認證後設定Token
import Cookies from 'js-cookie'

const Token = 'LtpaToken' // token name
export function getToken () {
  return Cookies.get(Token) // 自動判斷是否過期
}

export function setToken (value) {
  // var in30Minutes = 1 / 48 // 30分鐘過期
  var in60Minutes = 1 / 24 // 60分鐘過期
  return Cookies.set(Token, value, { expires: in60Minutes, path: '/' })
}

export function removeToken () {
  return Cookies.remove(Token)
}
