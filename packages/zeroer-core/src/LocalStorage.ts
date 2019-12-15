import { set, get } from './Cookie'
import { getTimeStamp, Days } from './lib'

const { localStorage } = window
const COOKIESSSION_TIME = 'COOKIESSSION_TIME' // 用于记录本次浏览器进程时间
const PREFIX = '_lS_' // 由该方法所存储的 localStorage 前缀
// 获取浏览器进程时间 是一个负数（保证 一定与用户设置的时间不同）如果上一个浏览器进程已经关闭 则产生一个新的进程时间
const getCookieSessionTime = () => {
  const time = get(COOKIESSSION_TIME)
  if (time) {
    return +time
  } else {
    const now = '-' + Date.now()
    set(COOKIESSSION_TIME, now, false, '/') // 随浏览器进程
    return +now
  }
}

// 删除过期的数据
const removeExpired = () => {
  const now = Date.now()
  for (const name of Object.keys(localStorage.valueOf())) {
    if (name.startsWith(PREFIX)) {
      try {
        const { e } = JSON.parse(localStorage.getItem(name) as string)
        // 不在 当前浏览器进程 || 过期
        if ((e < 0 && e !== getCookieSessionTime()) || (e > 0 && e <= now)) {
          localStorage.removeItem(name)
        }
      } catch (err) {}
    }
  }
}

// setItem('a', { a: 1 }) 随浏览器进程
// setItem('a', { a: 1 }, 1) 存1天
// setItem('a', { a: 1 }, '2019/10/31') 到2019/10/31
const setItem = (name: string, val: any, days: Days | false = false) => {
  removeExpired()
  // 如果设置的过期时间 本身就已经过期 则return掉
  if (days !== false && getTimeStamp(days) <= Date.now()) return
  try {
    const item = JSON.stringify({
      v: val, // 值
      e: days === false ? getCookieSessionTime() : getTimeStamp(days), // 负数表随浏览器进程 正数表过期时间
    })
    localStorage.setItem(PREFIX + name, item)
  } catch (err) {}
}

const getItem = (name: string) => {
  const res = localStorage.getItem(PREFIX + name)
  if (res) {
    try {
      const { v, e } = JSON.parse(res)
      // 在当前浏览器进程中 || 未过期的
      if ((e < 0 && e === getCookieSessionTime()) || e > Date.now()) {
        return v
      }
      return null
    } catch (err) {
      return null
    }
  }
  return null
}

const removeItem = (name: string) => {
  localStorage.removeItem(PREFIX + name)
}

// 清空所有由该方法所存储的数据
const clear = () => {
  for (const name of Object.keys(localStorage.valueOf())) {
    name.startsWith(PREFIX) && localStorage.removeItem(name)
  }
}

export {
  getItem,
  setItem,
  removeItem,
  clear,
}
