import { __TOKEN_INFO__ } from "../../utils/storageKeys"
import { __BASE_URL__ } from "../../api.config"

/**
 * 移除token对象
 */
const removeTokenInfo = () => wx.removeStorageSync(__TOKEN_INFO__)

/**
 * 移除缓存
 */
const removeStorageInfo = (key,func) => {
  if (typeof key !== "string" || !Array.isArray(key)) return
  if (typeof key === "string"){
    wx.removeStorage({
      key: key,
      success: (res) => {
        func && func()
      }
    })
    return;
  }
  if (Array.isArray(key)){
    for(let i = 0 ; i<key.length ; i+=1){
      wx.removeStorageSync(key[i])
    }
  }
}

/**
 * 设置token对象
 * @param {*} token token对象
 */
const setTokenInfo = token => {
  if (!token) return
  token.base_url = __BASE_URL__
  token.login_time = Date.now()
  wx.setStorageSync(__TOKEN_INFO__, token)
}

/**
 * 获取token的对象
 */
const getTokenInfo = () => {
  let tokenInfo = wx.getStorageSync(__TOKEN_INFO__)
  if (tokenInfo) {
    tokenInfo = JSON.parse(JSON.stringify(tokenInfo))
    let { login_time, expires_in, base_url } = tokenInfo
    expires_in *= 1000
    const nowTime = Date.now()

    if (login_time + expires_in <= nowTime) {
      removeTokenInfo()
      return {}
    }

    if (base_url !== __BASE_URL__) {
      removeTokenInfo()
      return {}
    }
  }
  return tokenInfo
}

export const tokenGuard = {
  setTokenInfo: data => setTokenInfo(data),
  removeTokenInfo: () => removeTokenInfo(),
  removeStorageInfo: (key,func) => removeStorageInfo(key,func),
  getToken: () => getTokenInfo().access_token,
  getUserNo: () => getTokenInfo().userNo,
  isLogin: () => !!getTokenInfo().access_token
}
