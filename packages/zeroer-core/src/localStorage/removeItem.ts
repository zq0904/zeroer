import { PREFIX } from './lib'

/**
 * 删除localStorage（只会删除由“该套方法”所存储的值 不会删除“其他”localStorage 基于前缀）
 * @example
 * removeItem('a')
 */
const removeItem = (name: string) => {
  localStorage.removeItem(PREFIX + name)
}

export default removeItem
