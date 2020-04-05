//index.js
import { DESTROY_CODE } from "../../../utils/util";
import {
  getGoodsCountBymerchantId,
  getGoodsListBymerchantId
} from "../../../api/index";
import { isEmpty, toThousands } from "../../../utils/lang";
import { __MERCHANT_ID__ } from "../../../utils/storageKeys";

//获取应用实例
const app = getApp();

Page({
  data: {
    currentDayAmount: "--",
    lastSevenDayAmount: "--",
    historyAmount: "--",
    datas: [],
    pagination: {
      currentPage: 0,
      totalPage: 0,
      loading: false,
      lastpage: false
    }
  },
  onLoad: function() {
    this.getStatistic();
    this.getGoodsListBymerchantId();
  },

  onReachBottom: function() {
    const { pagination } = this.data;

    if (!pagination.loading && !pagination.lastpage) {
      this.getGoodsListBymerchantId(that.pagination.currentPage + 1);
    }
  },

  getStatistic: function() {
    const that = this;
    const merchantId = wx.getStorageSync(__MERCHANT_ID__);
    getGoodsCountBymerchantId({ merchantId }).then(res => {
      that.setData({
        currentDayAmount: toThousands(res.currentDayAmount),
        lastSevenDayAmount: toThousands(res.lastSevenDayAmount),
        historyAmount: toThousands(res.historyAmount)
      });
    });
  },

  getGoodsListBymerchantId: function(pageIndex = 0) {
    const that = this;
    const merchantId = wx.getStorageSync(__MERCHANT_ID__);

    this.setData({
      pagination: {
        ...this.data.pagination,
        loading: true
      }
    });
    const params = {
      merchantId,
      currentPage: pageIndex,
      pageSize: 10
    };
    getGoodsListBymerchantId(params).then(res => {
      let { datas, ...pager } = res;

      if (pager.currentPage > 0) {
        datas = this.data.datas.concat(datas);
      }

      const pagination = {
        currentPage: pager.currentPage,
        totalPage: pager.totalPages,
        lastpage: pager.currentPage + 1 >= pager.totalPages,
        loading: false
      };

      that.setData({
        datas: [...datas],
        pagination: { ...pagination }
      });
    });
  }
});
