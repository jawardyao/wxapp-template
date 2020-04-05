//index.js
import { urls } from "../../../utils/urls";
import { getGoodsByDeliveryCode, delivery } from "../../../api/index";

Page({
  data: {
    destoryCodeList: []
  },

  onLoad: function(e) {
    const that = this;

    if (e) {
      getGoodsByDeliveryCode({ deliveryCodeList: [e.destroyCode] })
        .then(data => {
          const backSuccessList =
            data.couponVerificationRecordDTOList &&
            data.couponVerificationRecordDTOList.length > 0
              ? data.couponVerificationRecordDTOList.filter(
                  v => String(v.deliveryCode) === String(e.destroyCode)
                )
              : [];
          that.setData({
            destoryCodeList: backSuccessList
          });
        })
        .catch(err => {
          wx.reLaunch({ url: urls.index() });
          wx.showToast({ title: err, icon: "none" });
        });
    }
  },

  handleDestorySubmit: function() {
    const params = this.data.destoryCodeList.map(v => ({
      orderNo: v.orderNo,
      deliveryCode: v.deliveryCode
    }));
    delivery({ couponVerificationRecordDTOList: params }).then(res => {
      if (!res || res.code !== 20000) {
        wx.showToast({ title: res.message, icon: "none" });
        return;
      }
      wx.navigateTo({ url: urls.destroySuccess() });
    });
  },
  handleDestoryCancel: function() {
    wx.navigateBack({ delta: 1 });
  }
});
