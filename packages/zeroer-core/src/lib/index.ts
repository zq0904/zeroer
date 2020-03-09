import isNumber from '../object/isNumber'
import isString from '../object/isString'
import isDate from '../object/isDate'
import { Days, Nsd } from '../types'

/**
 * 转化成时间戳
 */
const toTimeStamp = (days: Days) => {
  if (isNumber(days)) {
    const date = new Date()
    return date.getTime() + 1000 * 60 * 60 * 24 * days
  } else if (isString(days)) {
    return new Date(days.replace(/-/g, '/')).getTime() // 兼容safari
  } else { // date实例
    return days.getTime()
  }
}

/**
 * 转化成Date实例
 */
const toDate = (t: Nsd) => {
  if (isNumber(t)) return new Date(t)
  if (isString(t)) return new Date(t.replace(/-/g, '/')) // 兼容safari
  if (isDate(t)) return t
  return new Date()
}

export {
  toTimeStamp,
  toDate,
}
