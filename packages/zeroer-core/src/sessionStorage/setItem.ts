import set from '../cookie/set'
import { PREFIX, isTrace } from './lib'

/**
 * 设置sessionStorage（为兼容Safari无痕 在不能使用sessionStorage的时候使用Cookie代替）
 * @example
 * setItem('a', { a: 1 })
 * setItem('b', '1')
 * setItem('c', 1)
 */
const setItem = (name: string, val: any) => {
  const item = JSON.stringify({ v: val }) // 存储任何值 都转化成对象形式方便stringify
  if (isTrace()) {
    set(PREFIX + name, item)
  } else {
    sessionStorage.setItem(PREFIX + name, item)
  }
}

export default setItem
