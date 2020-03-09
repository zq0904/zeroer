import get from './get'
import set from './set'

/**
 * 删除cookie（具有 path domain secure 的cookie需要指定）
 * @example
 * del('a')
 * del('b', '/')
 */
const del = (name: string, path?: string, domain?: string, secure = false) => {
  if (get(name) !== null) {
    set(name, '', -1, path, domain, secure)
  }
}

export default del
