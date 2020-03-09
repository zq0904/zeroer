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

export default curry
