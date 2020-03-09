import isObject from '../object/isObject'
import isString from '../object/isString'
import parse from '../qs/parse'
import { Obj } from '../types'

interface GetParameter {
  url: string;
  data?: string;
}

/**
 * 根据url 获取查询字符串的值
 * @example
 * 如当前地址栏url为 http://localhost:4321/test/api.html?a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3#hash
 * getQs() // { a: '1', b: {…}, c: '3' }
 * getQs('a') // '1'
 * getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash' }) // { a: '1', b: '2' }
 * getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash', data: 'a' }) // '1'
 */
const getQs = (key?: string | GetParameter): string | Obj | undefined => {
  if (isObject(key)) {
    const { url, data } = key
    let href = url
    // 去除hash
    const index = url.indexOf('#')
    if (index > -1) {
      href = url.replace(href.substr(index), '')
    }
    if (href.match(/^(.*?\?)(.*)$/) && RegExp.$2) {
      const obj = parse(RegExp.$2)
      return isString(data) ? obj[data] : obj
    }
    const obj = parse('')
    return isString(data) ? obj[data] : obj
  } else {
    const obj = parse(window.location.search.substr(1))
    return isString(key) ? obj[key] : obj
  }
}

export default getQs
