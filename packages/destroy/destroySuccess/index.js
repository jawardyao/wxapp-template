//index.js
import { urls } from "../../../utils/urls";

//获取应用实例
const app = getApp();

Page({
  data: {
    destoryCodeList: [],
    destroyCode: ""
  },

  onLoad: function() {},

  handleDestoryCancel: function() {
    wx.reLaunch({ url: urls.index() });
  }
});
