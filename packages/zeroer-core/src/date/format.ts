import { complement } from '../number'
import { toDate } from '../lib'
import { Nsd } from '../types'

/**
 * 时间格式化
 * @example
 * format(Date.now(), 'YYYY-MM-DD HH:mm:ss') // 接收时间戳
 * format('2019/09/04 13:00', 'YYYY-MM-DD HH:mm:ss') // 接收字符串
 * format('2019-09-04 13:00', 'YYYY-MM-DD HH:mm:ss') // 接收字符串
 * format(new Date()) // 接收Date实例
 * format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss') // hh 12小时制
 */
const format = (date: Nsd, f = 'YYYY-MM-DD HH:mm:ss') => {
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
    'MM': complement(gMo + 1, 2), // 月
    'M': gMo + 1, // 月
    'DD': complement(gD, 2), // 日
    'D': gD, // 日
    'HH': complement(gH, 2), // 24时
    'H': gH, // 24时
    'hh': complement(gH % 12, 2), // 12时
    'h': gH % 12, // 12时
    'mm': complement(gMi, 2), // 分
    'm': gMi, // 分
    'ss': complement(gS, 2), // 秒
    's': gS, // 秒
    'a': gH <= 12 ? 'AM' : 'PM' // 上下午
  }
  type Key = keyof typeof map
  for (const key in map) {
    f = f.replace(new RegExp(key, 'g'), map[key as Key] + '')
  }
  return f
}

export default format
