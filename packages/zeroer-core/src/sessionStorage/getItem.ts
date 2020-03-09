import isString from '../object/isString'
import get from '../cookie/get'
import { PREFIX, isTrace } from './lib'

/**
 * 获取sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * getItem('a')
 */
const getItem = (name: string) => {
  let res
  if (isTrace()) {
    res = get(PREFIX + name)
  } else {
    res = sessionStorage.getItem(PREFIX + name)
  }
  if (isString(res)) return JSON.parse(res).v
  return null
}

export default getItem
