import isNull from './isNull'
import isUndefined from './isUndefined'

// 只针对node环境
const isBuffer = (arg: any): arg is Buffer => {
  if (isNull(arg) || isUndefined(arg)) return false
  return !!(arg.constructor && arg.constructor.isBuffer && arg.constructor.isBuffer(arg))
}

export default isBuffer
