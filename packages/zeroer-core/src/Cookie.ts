import { getTimeStamp, Days } from './lib'

const set = (name: string, val: string, days: Days | false = false, path?: string, domain?: string, secure: boolean = false) => {
  let expires: string | boolean
  if (days === false) {
    expires = false // 过期时间为 session 当前会话期间（浏览器完全关闭）
  } else {
    const date = new Date()
    date.setTime(getTimeStamp(days))
    expires = date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(val) +
    (expires ? (';expires=' + expires) : '') +
    (path ? (';path=' + path) : '') + // 例如 '/' '/home' 默认为当前文档位置的路径（如果是 www.zeroer.com/home/index.html -> 默认就是 /home）
    (domain ? (';domain=' + domain) : '') + // 例如 'zeroer.com' 'www.zeroer.com' 默认为当前文档位置的路径的域名部分（如果是 www.zeroer.com/home/index.html -> 默认就是 www.zeroer.com）
    (secure ? ';secure' : '') // cookie只通过https协议传输
}

const get = (name: string) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? decodeURIComponent(arr[2]) : null
}

// 删除 具有 path domain secure 的cookie需要指定
const del = (name: string, path?: string, domain?: string, secure: boolean = false) => {
  if (get(name) !== null) {
    set(name, '', -1, path, domain, secure)
  }
}

export {
  set,
  get,
  del,
}
