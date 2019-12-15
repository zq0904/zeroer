import { isObject, isString } from './Object'
import { stringify, parse } from './Qs'

// getQs() => { key: '1' }
// getQs('key') => '1'
// getQs({ url: 'http://localhost:4321/test/api.html?s=1#hash', data: 's' }) => '1'
// getQs({ url: 'http://localhost:4321/test/api.html?s=1' }) => { s: '1' }
interface GetParameter {
  url: string;
  data?: string;
}

const getQs = (key?: string | GetParameter) => {
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

// setQs({ a: 1 }) => http://localhost:4321/test/api.html?s=1&a=1
// setQs({ url: '', data: {} })
interface SetParameter {
  url?: string;
  data?: object;
  [key: string]: any;
}

const setQs = (obj: SetParameter) => {
  if (!obj) return window.location.href
  function calculate (href: string, obj = {}) {
    let hash = ''
    // 去除hash
    const index = href.indexOf('#')
    if (index > -1) {
      hash = href.substr(index)
      href = href.replace(hash, '')
    }
    if (href.match(/^(.*?\?)(.*)$/)) {
      // if (RegExp.$2) {
      const newQs = Object.assign(parse(RegExp.$2), obj)
      return RegExp.$1 + stringify(newQs) + hash
      // }
    }
    return href + '?' + stringify(obj) + hash
  }
  if (isString(obj.url)) {
    const { url, data } = obj
    return calculate(url, data)
  } else {
    return calculate(window.location.href, obj)
  }
}

export { getQs, setQs }
