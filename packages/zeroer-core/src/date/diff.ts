import { toDate } from '../lib'
import { Nsd } from '../types'

/**
 * 计算时间相差
 * @example
 * diff(new Date('2018/01/01').getTime(), new Date('2018/01/02 13:00:00').getTime(), 'H') // 37
 * diff('2018-01-01', '2018/01/02 13:00:00', 'H')
 * diff(new Date('2018/01/01'), new Date('2018/01/02 13:00:00'), 'H')
 * diff('2018/01/01', new Date('2018/01/02 13:00:00'), 'H')
 */
const diff = (start: Nsd, end: Nsd, format = 'ms') => {
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

export default diff
