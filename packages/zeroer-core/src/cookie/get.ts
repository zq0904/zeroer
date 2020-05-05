import isUndefined from '../object/isUndefined'
import { Obj } from '../types'

/**
 * 获取cookie
 * @example
 * get() // 获取所有“可见”cookie
 * get('a')
 */
const get = (key?: string) => {
  if (isUndefined(document)) return null
  // 通过正则的方式 不是很稳定（new RegExp 入参依赖用户输入）
  // const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
  // const arr = document.cookie.match(reg)
  // return arr ? decodeURIComponent(arr[2]) : null
  const cookies = document.cookie.split('; ')
  const obj: Obj = {}
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (!value) continue
    try {
      obj[decodeURIComponent(key)] = decodeURIComponent(value)
    } catch (err) {
      console.error(err)
    }
  }
  return isUndefined(key) ? obj : (obj[key] || null)
}

export default get
