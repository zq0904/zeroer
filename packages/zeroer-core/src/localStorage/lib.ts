import set from '../cookie/set'
import get from '../cookie/get'

const PREFIX = '__lS__' // 由该方法所存储的 localStorage 前缀

const COOKIESSSION_TIME = '__COOKIESSSION_TIME__' // 用于记录本次浏览器进程时间

/**
 * 获取浏览器进程时间 是一个负数（保证 一定与用户设置的时间不同）如果上一个浏览器进程已经关闭 则产生一个新的进程时间
 * @example
 * getCookieSessionTime()
 */
const getCookieSessionTime = () => {
  const time = get(COOKIESSSION_TIME)
  if (time) {
    return +time
  } else {
    const now = '-' + Date.now()
    set(COOKIESSSION_TIME, now) // 随浏览器进程
    return +now
  }
}

/**
 * 删除过期的数据
 * @example
 * removeExpired()
 */
const removeExpired = () => {
  const now = Date.now()
  for (const name of Object.keys(localStorage)) {
    if (name.startsWith(PREFIX)) {
      try {
        const { e } = JSON.parse(localStorage.getItem(name) as string)
        // 不在 当前浏览器进程 || 过期
        if ((e < 0 && e !== getCookieSessionTime()) || (e > 0 && e <= now)) {
          localStorage.removeItem(name)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export {
  PREFIX,
  getCookieSessionTime,
  removeExpired,
}
