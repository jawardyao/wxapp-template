import { tokenGuard } from "./api/base/tokenGuard";
import { urls } from "./utils/urls";

//app.js
App({
  /**
   * 校验登录
   * @param {*} { page: 页面, success: 成功回调, fail: 未登录的回调，注意传入该参数时需要自行处理未登录后的业务逻辑}
   */
  checkLogin: function({ page, success, fail }) {
    const isLogin = tokenGuard.isLogin();
    if (isLogin) {
      success && success();
      return;
    }

    if (fail) {
      fail && fail();
      return;
    }

    tokenGuard.removeTokenInfo();
    wx.redirectTo({
      url: urls.login({ page })
    });
  },
  globalData: {
    userInfo: null
  }
});
