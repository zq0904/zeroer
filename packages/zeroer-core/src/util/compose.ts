// 参考 https://github.com/reduxjs/redux/blob/master/src/compose.ts

// 描述函数
type Func<T extends any[], R> = (...a: T) => R
interface Compose {
  (): <R>(a: R) => R;
  // one functions
  <F extends Function>(f: F): F;
  // two functions
  <A, T extends any[], R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>;
  // three functions
  <A, B, T extends any[], R>(f1: (b: B) => R, f2: (a: A) => B, f3: Func<T, A>): Func<T, R>;
  // four functions
  <A, B, C, T extends any[], R>(f1: (c: C) => R, f2: (b: B) => C, f3: (a: A) => B, f4: Func<T, A>): Func<T, R>;
  // rest
  <R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R;
  <R>(...funcs: Function[]): (...args: any[]) => R;
}

/**
 * 函数合并（将多个函数合并 依次从右向左执行 后一个函数的返回值 作为前一个函数的入参 最右侧函数可以是多参）
 * @example
 * const c = compose(Math.abs, Math.pow)
 * c(-2, 3) // 8
 */
const compose: Compose = (...args: any[]) => {
  if (args.length === 0) return (initialVal: any) => initialVal
  return args.reduceRight((aFn, bFn) => (...parameters: any[]) => bFn(aFn(...parameters)))
}

export default compose
