import extend from '../object/extend'
import isString from '../object/isString'
import { Obj } from '../types'

/**
 * 将查询字符串 转化为对象
 * @example
 * parse('a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3') // { a: '1', b: {…}, c: '3' }
 */
const parse = (str: string): Obj => {
  if (str === '' || !isString(str)) return {}
  return str.split('&').reduce((before, v) => {
    const [key, val] = v.split('=') // ['a', '1'] ['b[c]', 'c']
    const o = {}
    const arr = decodeURIComponent(key).replace(/^(.+?)(\[.+)\]$/, '$1]$2').split('][') // ['a'] ['b', 'c']
    arr.reduce((b: Obj, a, i) => {
      return b[a] = i === arr.length - 1 ? decodeURIComponent(val) : {}
    }, o)
    return extend(true, before, o)
  }, {})
}

export default parse
