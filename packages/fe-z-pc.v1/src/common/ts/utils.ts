import { ComponentType, Component } from 'react'

// interface DComponent<C extends ComponentType<any>, P, S> extends Component<C['defaultProps] & P, S> {}
export class DComponent<C extends ComponentType<any>, P, S> extends Component<C['defaultProps'] & P, S> {}
export type InternalProps<DP, P> = DP & P // 对内 props
export type ExternalProps<DP, P> = Partial<DP> & P // 对外 props

// infer 参考 https://github.com/Microsoft/TypeScript/pull/21496
export type ReturnPromiseType<T> =
  T extends (...args: any[]) => Promise<infer U> ? U :
  T extends Promise<infer U> ? U :
  any;
// 解决 Promise.all 多参解析问题
// const [resData1, resData2] = await Promise.all<ReturnPromiseType<typeof saveJobInfo>, ReturnPromiseType<typeof getJobList>>([
//   saveJobInfo(),
//   getJobList()
// ])

// 获取一个对象的函数名的联合类型
export type PickFunctionName<T> = { [P in keyof T]: T[P] extends Function ? P : never; }[keyof T];

// 主要解决 ts 对直接使用 for in 的类型校验问题
export const ForIn = <T extends { [s: string]: any; [s: number]: any; }>(cb: (key: keyof T) => any, obj: T) => { 
  for (const key in obj) cb(key)
}
