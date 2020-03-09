import del from '../cookie/del'
import { PREFIX, isTrace } from './lib'

/**
 * 删除sessionStorage（只会删除由“该套方法”所存储的值 不会删除“其他”sessionStorage 基于前缀）（为兼容Safari无痕）
 * @example
 * removeItem('b')
 */
const removeItem = (name: string) => {
  if (isTrace()) {
    del(PREFIX + name)
  } else {
    sessionStorage.removeItem(PREFIX + name)
  }
}

export default removeItem
