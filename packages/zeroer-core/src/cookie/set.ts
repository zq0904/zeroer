import { toTimeStamp } from '../lib'
import isUndefined from '../object/isUndefined'
import isString from '../object/isString'
import { getDefaultOtherAttributes, OtherAttributes } from './lib'

/**
 * 设置cookie 返回值表示是否设置成功
 * @example
 * set('c', 'cVal') // 当前会话期间
 * set('b', 'bVal', { expires: 1 }) // 存储1天
 * set('a', 'aVal', { expires: '2019/09/04 16:50' }) // 存储到'2019/09/04 16:50'
 */
const set = (key: string, value: string, otherAttributes: OtherAttributes = {}) => {
  if (isUndefined(document)) return false

  const attributes = Object.assign(
    {},
    getDefaultOtherAttributes(),
    otherAttributes
  )

  if (!isUndefined(attributes.expires)) {
    const date = new Date()
    date.setTime(toTimeStamp(attributes.expires))
    attributes.expires = date.toUTCString()
  }

  let attributesString = ''
  // 也可以使用 for in + Object.prototype.hasOwnProperty.call 代替
  const attributesKeys = Object.keys(attributes)
  for (const attributesName of attributesKeys) {
    // @ts-ignore
    const v = attributes[attributesName]
    if (!v) continue
    attributesString += '; ' + attributesName
    if (isString(v)) {
      attributesString += '=' + v.split(';')[0] // 健壮性兼容
    }
  }

  try {
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + attributesString
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default set
