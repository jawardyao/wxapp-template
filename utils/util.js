export const objectToQueryString = obj => {
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return ""
  }
  return Object.keys(obj)
    .map(key => [key, obj[key]].join("="))
    .join("&")
}

export const DESTROY_CODE = [
  {key:0, value:'未核销'},
  {key:1, value:'已核销'},
  {key:2, value:'核销失败'},
  {key:3, value:'退款中'},
  {key:4, value:'退款成功'},
]
