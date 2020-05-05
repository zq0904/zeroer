
import isUndefined from '../object/isUndefined'
import { Days } from '../types'

/**
 * 获取默认的属性
 */
export const getDefaultOtherAttributes = () => {
  if (isUndefined(location)) return {}
  const arr = location.hostname.split('.')
  let domain = ''
  if (arr.length === 4 && arr.every(v => !isNaN(Number(v)))) {
    // IP
    domain = location.hostname
  } else {
    // 根域
    domain = arr.splice(arr.length - 2).join('.')
  }
  return {
    domain,
    path: '/'
  }
}

/**
 * 参考 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
 */
export interface OtherAttributes {
  /**
   * 默认为当前会话期间（浏览器完全关闭）
   */
  expires?: Days;
  /**
   * 该库的默认值为 根域（如 zeroer.cc）
   * 原生 默认为当前文档位置的路径的域名部分（如 www.zeroer.cc/home/index.html -> www.zeroer.cc）
   */
  domain?: string;
  /**
   * 该库的默认值为 '/'
   * 原生 默认为当前文档位置的路径（如 www.zeroer.cc/home/index.html -> /home）
   */
  path?: string;
  /**
   * SameSite如果设置为None 同时也需要设置 Secure属性 否则会有警告
   * 参考 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite
   */
  SameSite?: 'None' | 'Lax' | 'Strict';
  /**
   * cookie只通过https协议传输 不安全站点（http:）无法使用Secure指令设置cookie
   */
  Secure?: boolean;
  /**
   * 一般通过请求的响应头Set-Cookie设置
   * 请求时会携带这个cookie 但是js脚本中却不能访问这个cookie（在一定程度上可以避免xss）
   */
  // HttpOnly?: boolean;
}
