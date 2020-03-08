import { isDate, isNumber, isString } from './Object'
import { complement as c } from './Number'

type NSD = number | string | Date

const toDate = (t: NSD) => {
  if (isNumber(t)) return new Date(t)
  if (isString(t)) return new Date(t.replace(/-/g, '/')) // 兼容safari
  if (isDate(t)) return t
  return new Date()
}

/**
 * 时间格式化
 * @example
 * format(Date.now(), 'YYYY-MM-DD HH:mm:ss') // 接收时间戳
 * format('2019/09/04 13:00', 'YYYY-MM-DD HH:mm:ss') // 接收字符串
 * format('2019-09-04 13:00', 'YYYY-MM-DD HH:mm:ss') // 接收字符串
 * format(new Date()) // 接收Date实例
 * format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss') // hh 12小时制
 */
const format = (date: NSD, f = 'YYYY-MM-DD HH:mm:ss') => {
  const d = toDate(date)
  const gF = d.getFullYear()
  const gMo = d.getMonth()
  const gD = d.getDate()
  const gH = d.getHours()
  const gMi = d.getMinutes()
  const gS = d.getSeconds()
  const map = {
    'YYYY': gF, // 年
    'YY': gF.toString().substr(2), // 年
    'MM': c(gMo + 1, 2), // 月
    'M': gMo + 1, // 月
    'DD': c(gD, 2), // 日
    'D': gD, // 日
    'HH': c(gH, 2), // 24时
    'H': gH, // 24时
    'hh': c(gH % 12, 2), // 12时
    'h': gH % 12, // 12时
    'mm': c(gMi, 2), // 分
    'm': gMi, // 分
    'ss': c(gS, 2), // 秒
    's': gS, // 秒
    'a': gH <= 12 ? 'AM' : 'PM' // 上下午
  }
  type Key = keyof typeof map
  for (const key in map) {
    f = f.replace(new RegExp(key, 'g'), map[key as Key] + '')
  }
  return f
}

/**
 * 计算时间相差
 * @example
 * diff(new Date('2018/01/01').getTime(), new Date('2018/01/02 13:00:00').getTime(), 'H') // 37
 * diff('2018-01-01', '2018/01/02 13:00:00', 'H')
 * diff(new Date('2018/01/01'), new Date('2018/01/02 13:00:00'), 'H')
 * diff('2018/01/01', new Date('2018/01/02 13:00:00'), 'H')
 */
const diff = (start: NSD, end: NSD, format = 'ms') => {
  let d: number
  switch (format) {
    case 'Y':
      d = 1000 * 3600 * 24 * 365
      break
    case 'M':
      d = 1000 * 3600 * 24 * 31
      break
    case 'D':
      d = 1000 * 3600 * 24
      break
    case 'H':
      d = 1000 * 3600
      break
    case 'm':
      d = 1000 * 60
      break
    case 's':
      d = 1000
      break
    case 'ms': default:
      d = 1
      break
  }
  return Math.floor(Math.abs(toDate(start).getTime() - toDate(end).getTime()) / d)
}

export {
  format,
  diff
}
