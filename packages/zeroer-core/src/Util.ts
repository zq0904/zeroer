type Fn = (...args: any[]) => void
type TimeId = number | NodeJS.Timeout

/**
 * 函数节流（一定时间内函数只能执行一次 多次执行会推迟到下个周期 常用于scroll事件以节省性能）
 * @example
 * window.addEventListener('scroll', throttle(function() {}, 300))
 */
const throttle = (fn: Fn, time = 300) => {
  let before = -Infinity
  let timeId: TimeId
  return function (this: any, ...args: any[]) {
    const nowTime = Date.now()
    const c = nowTime - before
    const _perform = () => {
      before = nowTime
      fn.apply(this, args)
    }
    if (c > time) { // 首次 或者 大于
      _perform()
    } else {
      clearTimeout(timeId as number | undefined)
      timeId = setTimeout(_perform, time - c)
    }
  }
}

/**
 * 函数防抖（一定时间内函数多次执行会变成一次 常用于input框suggest检索）
 * @example
 * inputDom.addEventListener('input', debounce(function () { }, 300))
 */
const debounce = (fn: Fn, time = 300) => {
  let timeId: TimeId
  return function (this: any, ...args: any[]) {
    clearTimeout(timeId as number | undefined)
    timeId = setTimeout(fn.bind(this, ...args), time)
  }
}

/**
 * 柯里化（将多参函数转换为单参）这个ts类型实在是难以写出
 * @example
 * const add = (a: number, b: number, c：number) => a + b + c
 * const curryAdd = curry(add)
 * curryAdd(1)(2)(3) // 6
 * curryAdd(1, 2)(3) // 6
 * curryAdd(1)(2, 3) // 6
 */
const curry = (fn: (...args: any[]) => any, ...args: any[]) => {
  if (fn.length > args.length) return (...parameters: any[]) => curry(fn, ...args, ...parameters)
  return fn(...args)
}

/**
 * 函数合并（将多个函数合并 依次从右向左执行 后一个函数的返回值 作为前一个函数的入参 最右侧函数可以是多参）
 * @example
 * const c = compose(Math.abs, Math.pow)
 * c(-2, 3) // 8
 */
const compose = (...args: any[]) => {
  if (args.length === 0) return (initialVal: any) => initialVal
  return args.reduceRight((aFn, bFn) => (...parameters: any[]) => bFn(aFn(...parameters)))
}

/**
 * 函数合并（将多个函数合并 依次从左向右执行 前一个函数的返回值 作为后一个函数的入参 最左侧函数可以是多参）
 * @example
 * const p = pipe(Math.pow, Math.abs)
 * p(-2, 3) // 8
 */
const pipe = (...args: any[]) => {
  if (args.length === 0) return (initialVal: any) => initialVal
  return args.reduce((bFn, aFn) => (...parameters: any[]) => aFn(bFn(...parameters)))
}

export {
  throttle,
  debounce,
  curry,
  compose,
  pipe,
}
