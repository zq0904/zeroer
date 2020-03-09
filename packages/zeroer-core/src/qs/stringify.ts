import isObject from '../object/isObject'
import { Obj } from '../types'

/**
 * 将对象 转化为查询字符串
 * @example
 * stringify({a: 1, b: {c: 'c', d: {e: 'e',r: {a: 1}}}, c: 3}) // 'a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3'
 */
const stringify = (o: Obj, b = ''): string => {
  if (!isObject(o)) return ''
  return Object.keys(o).map(k => {
    const val = o[k]
    const key = b ? `${b}[${k}]` : k
    return isObject(val) ? (
      stringify(val, key)
    ) : (
      encodeURIComponent(key) + '=' + encodeURIComponent(val)
    )
  }).join('&')
}

export default stringify
