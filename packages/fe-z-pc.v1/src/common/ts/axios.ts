import mobxPackage from 'mobx/package.json'
import { toJS } from 'mobx'
import sourceAxios, { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios'
import qs from 'qs'
import { Response, ResponseControl } from '@/types'

interface AxiosRequestConfigControl extends AxiosRequestConfig {
  headers: {
    control: true;
    [key: string]: any;
  };
}

// 重写AxiosInstance
interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<Response<T>>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response<T>>;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  // 重载
  request<T = any, R = ResponseControl<T>> (config: AxiosRequestConfigControl): Promise<R>;
  request<T = any, R = Response<T>> (config: AxiosRequestConfig): Promise<R>;
  get<T = any, U = {}, R = ResponseControl<T, U>>(url: string, config: AxiosRequestConfigControl): Promise<R>;
  get<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = ResponseControl<T>>(url: string, config: AxiosRequestConfigControl): Promise<R>;
  delete<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = ResponseControl<T>>(url: string, config: AxiosRequestConfigControl): Promise<R>;
  head<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, U = {}, R = ResponseControl<T, U>>(url: string, data: any, config: AxiosRequestConfigControl): Promise<R>;
  post<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = ResponseControl<T>>(url: string, data: any, config: AxiosRequestConfigControl): Promise<R>;
  put<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = ResponseControl<T>>(url: string, data: any, config: AxiosRequestConfigControl): Promise<R>;
  patch<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

// mobx@4数组传参问题
let isToJS = true
try {
  isToJS = Number(mobxPackage.version.substr(0, 1)) < 5
} catch (err) {
  console.error(err)
}

// @ts-ignore
const axios: AxiosInstance = sourceAxios.create({
  timeout: 30000,
  withCredentials: true, // 跨域携带cookie
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest' // 就是个自定义的头标 后端可以根据这个字段标识该请求是ajax
  }
  // 如果设置了transformRequest或interceptors.request Content-Type默认就是 application/x-www-form-urlencoded
  // transformRequest: [function (data, headers) {
  //   if (!data || data instanceof FormData) return data
  //   if (isToJS) data = toJS(data, { recurseEverything: true })
  //   return qs.stringify(data, {
  //     arrayFormat: 'indices', // { a: [1, 2] } indices a[1] brackets a[]=1&a[]=2
  //     allowDots: true, // { a: { b: 2 } } true a.b=2 false a[b]=2
  //     skipNulls: true, // { a: null } true 不包含这个字段 false a: ''
  //   })
  // }]
})

// 请求拦截
axios.interceptors.request.use(req => {
  if (!req.data || req.data instanceof FormData) return req
  if (isToJS) req.data = toJS(req.data, { recurseEverything: true })
  req.data = qs.stringify(req.data, {
    arrayFormat: 'indices', // { a: [1, 2] } indices a[1] brackets a[]=1&a[]=2
    allowDots: true, // { a: { b: 2 } } true a.b=2 false a[b]=2
    skipNulls: true // { a: null } true 不包含这个字段 false a: ''
  })
  return req
}, err => {
  return Promise.reject(err)
})

// 响应拦截
axios.interceptors.response.use(res => { // 状态码2xx
  if (!res.config.headers.control && res.data.flag !== 1) {
    window.alert(res.data.msg)
    return Promise.reject(res)
  }
  return Promise.resolve(res.data)
}, err => { // 状态码非2xx
  // xhr请求导致的重定向
  const RedirectAddress = err.response?.headers?.['redirect-address'] // headers字段接收只能是小写
  if (err.response?.status === 302 && RedirectAddress) return window.location.href = RedirectAddress
  return Promise.reject(err)
})

export { axios }

// test example
// ;(async () => {
//   const setStore = (obj: any) => {}

//   // 绝大多数情况下 flag为0 都需要抛出错误弹框
//   try {
//     const resData = await axios.post('http://127.0.0.1:3001/checklogin.json', {a:1})
//     setStore({ list: resData.data.list })
//   } catch (err) {
//     console.error(err)
//   } finally {
//     setStore({ loading: false })
//   }

//   // 完全控制 流程
//   try {
//     const resData = await axios({
//       url: 'http://127.0.0.1:3001/checklogin.json',
//       method: 'POST',
//       headers: { control: true }, // 设置 control: true
//     })
//     if (resData.flag !== 1) return window.alert(resData.msg)

//     setStore({ list: resData.data.list })
//   } catch (err) {
//     console.error(err)
//   } finally {
//     setStore({ loading: false })
//   }

// })()
