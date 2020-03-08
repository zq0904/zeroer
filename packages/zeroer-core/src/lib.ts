import { isNumber, isString } from './Object'

export type Days = number | string | Date

const getTimeStamp = (days: Days) => {
  if (isNumber(days)) {
    const date = new Date()
    return date.getTime() + 1000 * 60 * 60 * 24 * days
  } else if (isString(days)) {
    return new Date(days.replace(/-/g, '/')).getTime() // 兼容safari
  } else { // date实例
    return days.getTime()
  }
}

export {
  getTimeStamp,
}
