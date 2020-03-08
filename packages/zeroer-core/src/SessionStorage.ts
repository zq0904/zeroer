import { isString } from './Object'
import { set, get, del } from './Cookie'

// 为兼容Safari无痕
const { sessionStorage } = window
const PREFIX = '_sS_'
let isSupport = true

try {
  const TEST = '_test_'
  sessionStorage.setItem(TEST, '1')
  sessionStorage.removeItem(TEST)
} catch (e) {
  isSupport = false
}

/**
 * 设置sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * setItem('a', { a: 1 })
 * setItem('b', '1')
 * setItem('c', 1)
 */
const setItem = (name: string, val: any) => {
  const item = JSON.stringify({ v: val })
  if (isSupport) {
    sessionStorage.setItem(name, item)
  } else {
    set(PREFIX + name, item)
  }
}

/**
 * 获取sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * getItem('a')
 */
const getItem = (name: string) => {
  let res
  if (isSupport) {
    res = sessionStorage.getItem(name)
  } else {
    res = get(PREFIX + name)
  }
  if (isString(res)) return JSON.parse(res).v
  return null
}

/**
 * 删除sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * removeItem('b')
 */
const removeItem = (name: string) => {
  if (isSupport) {
    sessionStorage.removeItem(name)
  } else {
    del(PREFIX + name)
  }
}

/**
 * 清空sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * clear()
 */
const clear = () => {
  if (isSupport) {
    sessionStorage.clear()
  } else {
    for (const v of document.cookie.split(';')) {
      const name = v.split('=')[0].trim()
      name.startsWith(PREFIX) && del(name)
    }
  }
}

export {
  getItem,
  setItem,
  removeItem,
  clear,
}
