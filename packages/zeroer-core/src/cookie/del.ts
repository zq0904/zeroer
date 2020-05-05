import get from './get'
import set from './set'
import isNull from '../object/isNull'
import { getDefaultOtherAttributes, OtherAttributes } from './lib'

/**
 * 删除cookie（具有 path domain secure 的cookie需要指定）
 * @example
 * del('a')
 * del('b', { path: '', domain: 'zeroer.cc' })
 */
const del = (key: string, otherAttributes: OtherAttributes = {}) => {
  if (isNull(get(key))) return
  const attributes = Object.assign(
    {},
    getDefaultOtherAttributes(),
    otherAttributes,
    { expires: -1 }
  )
  set(key, '', attributes)
}

export default del
