//index.js
import { urls } from "../../utils/urls";
import { __SHOP_INFO__, __MERCHANT_ID__ } from "../../utils/storageKeys";
import { getUserByUsername, getGoodsByDeliveryCode } from "../../api/index";
import { tokenGuard } from "../../api/base/tokenGuard";
import { isEmpty } from "../../utils/lang";

//获取应用实例
const app = getApp();

Page({
  data: {
    shopInfo: {},
    destroyCode: ""
  },
  onLoad: function() {
    const that = this;
    app.checkLogin({
      page: urls.index(),
      success: () => {
        getUserByUsername({})
          .then(res => {
            if (res) {
              const { shopList, merchantDTO } = res;
              shopList &&
                shopList.length &&
                wx.setStorageSync(__SHOP_INFO__, shopList[0]);
              merchantDTO && wx.setStorageSync(__MERCHANT_ID__, merchantDTO.id);
              that.setData({
                shopInfo: shopList[0]
              });
            }
          })
          .catch(err => {
            wx.showToast({ title: err, icon: "none" });
            tokenGuard.removeStorageInfo(["shopInfo", "merchantId"]);
            wx.reLaunch({ url: urls.login() });
          });
      }
    });
  },

  handleDestroyCodeChange: function(e) {
    this.setData({
      destroyCode: e.detail.value
    });
  },

  handleDestory: function() {
    const destroyCode = this.data.destroyCode;
    if (isEmpty(destroyCode)) {
      wx.showToast({ title: `请输入核销码`, icon: "none" });
      return;
    }

    if (!isEmpty(destroyCode)) {
      getGoodsByDeliveryCode({ deliveryCodeList: [this.data.destroyCode] })
        .then(data => {
          if (isEmpty(data.couponVerificationRecordDTOList)) {
            wx.showToast({ title: "此核销码无商品信息", icon: "none" });
            return;
          }
          wx.navigateTo({
            url: urls.destroyGoodsAffirm({ destroyCode: destroyCode })
          });
        })
        .catch(err => {
          wx.showToast({ title: err, icon: "none" });
        });
    }
  },

  handleDestoryRecord: function() {
    wx.navigateTo({
      url: urls.destroyRecord()
    });
  },

  hanldeScancode: function() {
    var that = this;
    wx.scanCode({
      success: res => {
        var result = res.result;
        if (result) {
          wx.navigateTo({
            url: urls.destroyGoodsAffirm({ destroyCode: result })
          });
        }
      },
      fail: err => {
        wx.showToast({ title: err, icon: "none" });
      }
    });
  }
});
