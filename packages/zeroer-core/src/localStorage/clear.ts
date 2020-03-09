import { PREFIX } from './lib'

/**
 * 清空localStorage（只会清空由“该套方法”所存储的值 不会清空“其他”localStorage 基于前缀）
 * @example
 * clear()
 */
const clear = () => {
  for (const name of Object.keys(localStorage)) {
    name.startsWith(PREFIX) && localStorage.removeItem(name)
  }
}

export default clear
