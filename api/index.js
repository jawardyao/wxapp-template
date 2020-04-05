import http from "./base/http"

// import {objectToQueryString} from "../utils/util";
// import {__CLIENT_CONFIG__} from "../api.config";

export const getIndex = params => http.post("/boss/shop/list", params)

export const getUserByUsername = params => http.post("/boss/user/userAccountDetail", params)

export const getGoodsByDeliveryCode = params => http.post("/order/coupon/verification/record/list", params)

export const getGoodsCountBymerchantId = params => http.post("/order/coupon/verification/record/report/count", params)

export const getGoodsListBymerchantId = params => http.post("/order/coupon/verification/record/report", params)

export const delivery = params => http.post("/order/coupon/verification/record/delivery/batch", params,{ withToken: true, customResponse: true})

