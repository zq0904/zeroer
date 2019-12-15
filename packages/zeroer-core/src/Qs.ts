import { isObject, isString, extend } from './Object'

interface Obj {
  [k: string]: any;
}

// stringify({a: 1, b: {c: 'c', d: {e: 'e',r: {a: 1}}}, c: 3}) => 'a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3'
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

// parse('a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3') => {a: '1', b: {c: 'c', d: {e: 'e',r: {a: '1'}}}, c: '3'}
const parse = (str: string): Obj => {
  if (!isString(str)) return {}
  return decodeURIComponent(str).split('&').reduce((before, v) => {
    const [key, val] = v.split('=') // ['a', '1'] ['b[c]', 'c']
    const o = {}
    const arr = key.replace(/^(.+?)(\[.+)\]$/, '$1]$2').split('][') // ['a'] ['b', 'c']
    arr.reduce((b: Obj, a, i) => {
      return b[a] = i === arr.length - 1 ? val : {}
    }, o)
    return extend(true, before, o)
  }, {})
}

export {
  stringify,
  parse,
}
