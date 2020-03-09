import { TimeId } from '../types'

/**
 * 函数防抖（一定时间内函数多次执行会变成一次 常用于input框suggest检索）
 * @example
 * inputDom.addEventListener('input', debounce(function () { }, 300))
 */
const debounce = (fn: Function, time = 300) => {
  let timeId: TimeId
  return function (this: any, ...args: any[]) {
    clearTimeout(timeId as number | undefined)
    timeId = setTimeout(fn.bind(this, ...args), time)
  }
}

export default debounce
