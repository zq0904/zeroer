import { toTimeStamp } from '../lib'
import { Days } from '../types'

/**
 * 设置cookie
 * @example
 * set('a', 'aVal', '2019/09/04 16:50') // 存储到'2019/09/04 16:50'
 * set('b', 'bVal', 1, '/') // 存储1天
 * set('c', 'cVal') // 当前会话期间
 */
const set = (name: string, val: string, days: Days | false = false, path?: string, domain?: string, secure = false) => {
  let expires: string | boolean
  if (days === false) {
    expires = false // 过期时间为 session 当前会话期间（浏览器完全关闭）
  } else {
    const date = new Date()
    date.setTime(toTimeStamp(days))
    expires = date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(val) +
    (expires ? (';expires=' + expires) : '') +
    (path ? (';path=' + path) : '') + // 例如 '/' '/home' 默认为当前文档位置的路径（如果是 www.zeroer.cc/home/index.html -> 默认就是 /home）
    (domain ? (';domain=' + domain) : '') + // 例如 'zeroer.cc' 'www.zeroer.cc' 默认为当前文档位置的路径的域名部分（如果是 www.zeroer.cc/home/index.html -> 默认就是 www.zeroer.cc）
    (secure ? ';secure' : '') // cookie只通过https协议传输
}

export default set
