import { PREFIX, getCookieSessionTime } from './lib'

/**
 * 获取localStorage（加入了过期时间概念）
 * @example
 * getItem('a')
 */
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

export default getItem
