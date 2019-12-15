type Fn = (...args: any[]) => void
type TimeId = number | NodeJS.Timeout

// 节流
const throttle = (fn: Fn, time = 300) => {
  let after = -Infinity
  let timeId: TimeId
  return () => {
    const nowTime = Date.now()
    const c = nowTime - after
    const _perform = () => {
      after = nowTime
      fn && fn()
    }
    if (c > time) { // 首次 或者 大于
      _perform()
    } else {
      clearTimeout(timeId as number | undefined)
      timeId = setTimeout(_perform, time - c)
    }
  }
}

// 防抖
const debounce = (fn: Fn, time = 300) => {
  let timeId: TimeId
  return function (this: any, ...agrs: any[]) {
    clearTimeout(timeId as number | undefined)
    timeId = setTimeout(() => {
      fn && fn.apply(this, agrs)
    }, time)
  }
}

// 柯里化 这个ts类型实在是难以写出
const curry = (fn: (...args: any[]) => any, ...args: any[]) => {
  if (fn.length > args.length) return (...parameters: any[]) => curry(fn, ...args, ...parameters)
  return fn(...args)
}

export {
  throttle,
  debounce,
  curry,
}
