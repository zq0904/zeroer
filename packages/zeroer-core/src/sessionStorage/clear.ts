import del from '../cookie/del'
import { PREFIX, isTrace } from './lib'

/**
 * 清空sessionStorage（只会清空由“该套方法”所存储的值 不会清空“其他”sessionStorage 基于前缀）（为兼容Safari无痕）
 * @example
 * clear()
 */
const clear = () => {
  if (isTrace()) {
    for (const v of document.cookie.split(';')) {
      const name = v.split('=')[0].trim()
      name.startsWith(PREFIX) && del(name)
    }
  } else {
    for (const name of Object.keys(sessionStorage)) {
      name.startsWith(PREFIX) && sessionStorage.removeItem(name)
    }
  }
}

export default clear
