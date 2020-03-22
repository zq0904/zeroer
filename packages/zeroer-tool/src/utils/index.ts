export * from './clearConsole'
export * from './commandLineArgs'
export * from './config'
export * from './execA'
export * from './isPrd'
export * from './log'
// export * from './modifyProjectConfig'
export * from './paths'
export * from './resolve'
export * from './safeLoad'

// 主要解决 ts 对直接使用 for in 的类型校验问题
export const ForIn = <T extends { [s: string]: any; [s: number]: any }>(cb: (key: keyof T) => any, obj: T) => {
  for (const key in obj) cb(key)
}

export const debounce = (fn: Function, time = 300) => {
  let timeId: number | NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    clearTimeout(timeId as number | undefined)
    timeId = setTimeout(fn.bind(this, ...args), time)
  }
}
