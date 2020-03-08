import { isObject, isString } from './Object'
import { stringify, parse, Obj } from './Qs'

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


interface SetParameter {
  url?: string;
  data?: object;
  [key: string]: any;
}

function calculate (href: string, obj = {}) {
  let hash = ''
  // 去除hash
  const index = href.indexOf('#')
  if (index > -1) {
    hash = href.substr(index)
    href = href.replace(hash, '')
  }
  if (href.match(/^(.*?\?)(.*)$/)) {
    const newQs = Object.assign(parse(RegExp.$2), obj)
    return RegExp.$1 + stringify(newQs) + hash
  }
  return href + '?' + stringify(obj) + hash
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

export {
  getQs,
  setQs,
}
