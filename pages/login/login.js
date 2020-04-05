import { login } from "../../api/login.js";
import { tokenGuard } from "../../api/base/tokenGuard.js";
import { urls } from "../../utils/urls.js";

Page({
  data: {
    username: "",
    password: "",
    page: ""
  },
  onLoad: function(options) {
    this.setData({
      page: options.page || ""
    });
  },
  handleInputChange: function(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },
  handleLogin: function() {
    const { username, password } = this.data;

    if (!username) {
      wx.showToast({ title: "请输入门店账号", icon: "none" });
      return;
    }

    if (!password) {
      wx.showToast({ title: "请输入密码", icon: "none" });
      return;
    }

    const reqParam = {
      username,
      password
    };

    login(reqParam)
      .then(res => {
        const { code, message, access_token, expires_in, userName } = res;

        if (code !== 20000) {
          wx.showToast({ title: message, icon: "none" });
          return;
        }

        tokenGuard.setTokenInfo({ access_token, expires_in, userName });

        wx.showToast({
          title: "登录成功",
          icon: "none",
          mask: true,
          duration: 1000
        });

        setTimeout(() => {
          wx.hideToast();
          this.handleRedirect();
        }, 1000);
      })
      .catch(err => {
        console.log({ err });
        wx.showToast({ title: err, icon: "none" });
      });
  },
  handleRedirect: function() {
    const page = this.data.page;
    if (page) {
      wx.redirectTo({
        url: page
      });
    } else {
      wx.reLaunch({ url: urls.index() });
    }
  }
});
