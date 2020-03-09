import isObject from './isObject'
import isArray from './isArray'
import isUndefined from './isUndefined'

/**
 * 将多个对象的内容合并到目标对象中
 * @example
 * const a = { obj: { a: 1 }, arr: [1, 2], v: 1 }
 * const b = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
 * extend(a, b) // { obj: {b: 2}, arr: (3) [3, 4, 5], v: 2 }
 * extend(true, a, b) // 深度合并对象 { obj: {a: 1, b: 2}, arr: (3) [3, 4, 5], v: 2 }
 */
const extend = (...args: any[]) => {
  isObject(args[0]) ? args.unshift(false) : args[0] = !!args[0] // 统一入参
  const [deep, target, ...other] = args
  let targetVal, otherVal
  for (const o of other) {
    for (const key in o) {
      targetVal = target[key]
      otherVal = o[key]
      // 深拷贝 且 配置项是对象或数组
      if (deep && (isObject(otherVal) || isArray(otherVal))) {
        // 目标对象不是对象或者数组 应直接替换  等效替代为深拷贝  {a: '123'} {a: {...}} => {a: {}} {a: {...}}
        targetVal = isArray(otherVal) ? (
          isArray(targetVal) ? targetVal : []
        ) : (
          isObject(targetVal) ? targetVal : {}
        )
        target[key] = extend(deep, targetVal, otherVal)
      } else if (!isUndefined(otherVal)) {
        target[key] = otherVal
      }
    }
  }
  targetVal = otherVal = null
  return target
}

export default extend
