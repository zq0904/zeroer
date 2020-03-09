import isString from '../object/isString'
import { calculate } from './lib'

interface SetParameter {
  url?: string;
  data?: object;
  [key: string]: any;
}

/**
 * 设置查询字符串的值 返回url
 * @example
 * 如当前地址栏url为 http://localhost:4321/test/api.html?a=1#hash
 * setQs() // http://localhost:4321/test/api.html?a=1#hash
 * setQs({ b: 1, s: 5 }) // http://localhost:4321/test/api.html?a=1&b=1&s=5#hash
 * setQs({ url: 'http://localhost:4321/test/api.html?a#hash', data: { s: 5 } }) // http://localhost:4321/test/api.html?s=5#hash
 * setQs({ url: 'http://localhost:4321/test/api.html?#hash', data: { s: 5 } }) // http://localhost:4321/test/api.html?s=5#hash
 */
const setQs = (obj: SetParameter) => {
  if (!obj) return window.location.href
  if (isString(obj.url)) {
    const { url, data } = obj
    return calculate(url, data)
  } else {
    return calculate(window.location.href, obj)
  }
}

export default setQs
