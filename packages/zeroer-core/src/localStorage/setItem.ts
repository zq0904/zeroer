import { PREFIX, getCookieSessionTime, removeExpired } from './lib'
import { toTimeStamp } from '../lib'
import { Days } from '../types'

/**
 * 设置localStorage（加入了过期时间概念）
 * @example
 * setItem('a', { a: 1 }) // 随浏览器进程
 * setItem('b', { b: 1 }, 1) // 存储1天失效
 * setItem('c', { c: 1 }, '2019/09/04') // 到 2019/09/04 00:00:00 失效
 */
const setItem = (name: string, val: any, days: Days | false = false) => {
  removeExpired()
  // 如果设置的过期时间 本身就已经过期 则return掉
  if (days !== false && toTimeStamp(days) <= Date.now()) return false
  try {
    const item = JSON.stringify({
      v: val, // 值
      e: days === false ? getCookieSessionTime() : toTimeStamp(days), // 负数表随浏览器进程 正数表过期时间
    })
    localStorage.setItem(PREFIX + name, item)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default setItem
