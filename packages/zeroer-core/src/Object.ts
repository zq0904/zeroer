const noop: () => void = () => {}

// 声明类型保护
const isNull = (arg: any): arg is null => arg === null

const isUndefined = (arg: any): arg is undefined => typeof arg === 'undefined'

const isNumber = (arg: any): arg is number => typeof arg === 'number'

const isString = (arg: any): arg is string => typeof arg === 'string'

const isBoolean = (arg: any): arg is boolean => typeof arg === 'boolean'

const isArray = (arg: any): arg is any[] => Object.prototype.toString.call(arg) === '[object Array]'

// 这里不应该使用泛型 使用泛型会失去类型保护 (如下面的 如果arg是对象 ts就能确定其具体的对象类型 不会认为对象的类型是{ [key: string]: any })
const isObject = (arg: any): arg is { [key: string]: any } => Object.prototype.toString.call(arg) === '[object Object]'

const isFunction = (arg: any): arg is Function => typeof arg === 'function'

const isDomElement = (arg: any): arg is HTMLElement => arg && arg.nodeType === 1

const isRegExp = (arg: any): arg is RegExp => Object.prototype.toString.call(arg) === '[object RegExp]'

const isDate = (arg: any): arg is Date => Object.prototype.toString.call(arg) === '[object Date]'

const isBuffer = (arg: any): arg is Buffer => { // 只针对node环境
  if (isNull(arg) || isUndefined(arg)) return false
  return !!(arg.constructor && arg.constructor.isBuffer && arg.constructor.isBuffer(arg))
}

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

export {
  noop,
  isNull,
  isUndefined,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isDomElement,
  isRegExp,
  isDate,
  isBuffer,
  extend
}
