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

export default pipe
