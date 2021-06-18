const { object: { isObject, isArray, isUndefined, isNull } } = require('zeroer-core')

// 说明 相比 jq的 $.extend
// 1. 我们认为直接字面量构建的为纯对象（mobx对象 通过） 也是用户最长使用的数据 对于class构建的需保留引用（如editorState）
// 2. mobx4 数组 递归迭代有问题 toJS
// 3. 定制了针对数组替换

/**
 * @1
 */
const isPureObject = (obj) => {
  if (isUndefined(obj) || isNull(obj)) return false
  return Object.getPrototypeOf(obj).constructor === Object
}

/**
 * 将多个对象的内容合并到目标对象中
 * @example
 * const a = { obj: { a: 1 }, arr: [1, 2], v: 1 }
 * const b = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
 * dataExtend(a, b) // { obj: {b: 2}, arr: [3, 4, 5], v: 2 }
 * dataExtend(true, a, b) // 深度合并对象 { obj: {a: 1, b: 2}, arr: [3, 4, 5], v: 2 }
 */
const dataExtend = (...args) => {
  isObject(args[0]) ? args.unshift(false) : args[0] = !!args[0] // 统一入参
  const [deep, target, ...other] = args
  let targetVal, otherVal
  for (const o of other) {
    for (const key in o) {
      targetVal = target[key]
      otherVal = o[key]
      // @2
      // isObservableArray(otherVal) && (otherVal = toJS(otherVal))
      // isObservableArray(targetVal) && (targetVal = toJS(targetVal))
      // 深拷贝 且 配置项是对象或数组
      if (deep && (isPureObject(otherVal) || isArray(otherVal))) {
        // 目标对象不是对象或者数组 应直接替换  等效替代为深拷贝  {a: '123'} {a: {...}} => {a: {}} {a: {...}}
        targetVal = isArray(otherVal) ? (
          // isArray(targetVal) ? targetVal : []
          [] // @3
        ) : (
          isPureObject(targetVal) ? targetVal : {}
        )
        target[key] = dataExtend(deep, targetVal, otherVal)
      } else if (!isUndefined(otherVal)) {
        target[key] = otherVal
      }
    }
  }
  targetVal = otherVal = null
  return target
}

module.exports = dataExtend
