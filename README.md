## 摩都优选商户小程序

### 该小程序使用原生框架开发

#### /api

###### /base 封装的 http 请求基本目录

- /base/http.js 封装的 http 请求方法，目前只对外公开了 post 方法，返回 Promise 对象

```
http.post(url, data = {}, options = {withToken: true, customResponse})
url: 接口路径
data：请求参数
options: {
    withToken: Boolean 请求方法是否需要携带token信息
    customResponse：Boolean 返回参数是否自定义处理，对返回数据的结构不是标准的结构将直接返回整个response
}
```

- statusCode 常见的错误码对象错误描述信息
- tokenGuard token 的导航守卫，对象暴露了取 token，设置 token 及判断是否登录的 isLogin 方法
- /api/login.js 接口定义文件，标准使用方法如下：

```
import http from "./base/http"
// 有参数
export const getIndex = params => http.post("/boss/shop/list", params)
// 无参数
export const getIndex = () => http.post("/boss/shop/list")
// 无需token
export const getIndex = params => http.post("/boss/shop/list", params, {withToken: false})
// 自定义处理返回数据
export const getIndex = params => http.post("/boss/shop/list", params, {customResponse: true})
```

#### /utils

- storageKeys.js 项目涉及需要写缓存的，统一将缓存 key 配置在该文件，方便维护
- urls.js 项目的页面路径统一配置在该文件，方便维护
- util.js 工具函数集合

#### /api.config.js

- **==配置项目环境变量，无需改动==**

#### /env.config.js

- 页面仅导出了环境变量 \_\_ENV\_\_，取值范围 _dev | pre | prod_，**==仅在项目发布测试及上线时修改==**

```
/**
 * 当前环境，取值范围：dev | pre | prod
 */
export const __ENV__ = "dev"
```

#### 判断是否登录 app.checkLogin({...})

- 按实际业务要求在页面的 onLoad 或 onShow 生命周期函数中调用 app.checkLogin，未登录的默认跳转登录页进行登录，若需在未登录时自行处理逻辑，传入 fail 参数

```
const app = getApp()
app.checkLogin({
  page: urls.index(),
  success: () => {},
  fail: () => {}
})
page 表示当前的页面
success 表示当前是登录状态的回调
fail 表示未登录时的自行处理
```
