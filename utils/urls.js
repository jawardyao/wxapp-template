import { objectToQueryString } from "./util";

const getQueryString = query => {
  const queryStr = objectToQueryString(query);
  return queryStr ? `?${queryStr}` : "";
};

export const urls = {
  index: query => `/pages/index/index${getQueryString(query)}`,
  login: query => `/pages/login/login${getQueryString(query)}`,
  destroyRecord: query =>
    `/packages/destroy/destroyRecord/index${getQueryString(query)}`,
  destroySuccess: query =>
    `/packages/destroy/destroySuccess/index${getQueryString(query)}`,
  destroyGoodsAffirm: query =>
    `/packages/destroy/goodsAffirm/index${getQueryString(query)}`
};
