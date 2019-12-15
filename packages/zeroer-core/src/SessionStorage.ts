import { isString } from './Object'
import { set, get, del } from './Cookie'

// 兼容Safari无痕
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

const setItem = (name: string, val: any) => {
  const item = JSON.stringify({ v: val })
  if (isSupport) {
    sessionStorage.setItem(name, item)
  } else {
    set(PREFIX + name, item)
  }
}

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

const removeItem = (name: string) => {
  if (isSupport) {
    sessionStorage.removeItem(name)
  } else {
    del(PREFIX + name)
  }
}

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
