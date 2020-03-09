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

export default compose
