// import React from 'react' // 原型注入 不可用
import axios from 'axios'
import Qs from 'qs'

const $fetch = axios.create({
  withCredentials: true, // 跨域携带cookie
  timeout: 7000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest', // 就是个自定义的头标 后端可以根据这个字段标识该请求是ajax
  },
  // 如果有 transformRequest Content-Type 默认就是 application/x-www-form-urlencoded
  transformRequest(data, headers) {
    if (!(data instanceof FormData)) return Qs.stringify(data, {
      arrayFormat: 'brackets', // {a:[1,2]} 解析为：'a[]=1&a[]=2' // indices a[1]
      allowDots: true, // {a:{b:2}} 解析为：'a.b=2', 设为false  解析为 'a[b]=2'
      skipNulls: true, // {a:null}时 解析为：''，设为false 解析为：'a='
    })
    return data
  }
})

$fetch.interceptors.response.use(res => {
  // if (res.falg !== 1) return Promise.reject(res) // 自定义
  return Promise.resolve(res)
}, err => {
  return Promise.reject(err)
})

export default $fetch
