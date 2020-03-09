/**
 * Days
 * @example
 * 1 // 表示1天
 * '2019/09/04' | '2019-09-04' // 字符串 通常表示 2019/09/04 00:00:00 时刻
 * new Date('2019/09/04') // Date实例 通常表示 2019/09/04 00:00:00 时刻
 */
type Days = number | string | Date

/**
 * Nsd
 * @example
 * Date.now() // 1583676817295 时间戳
 * '2019/09/04' | '2019-09-04' // 字符串 通常表示 2019/09/04 00:00:00 时刻
 * new Date('2019/09/04') // Date实例 通常表示 2019/09/04 00:00:00 时刻
 */
type Nsd = number | string | Date

/**
 * 对象
 */
type Obj = { [k: string]: any }

/**
 * 定时器id
 */
type TimeId = number | NodeJS.Timeout

export {
  Days,
  Nsd,
  Obj,
  TimeId,
}
