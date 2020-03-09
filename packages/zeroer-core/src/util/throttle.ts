import { TimeId } from '../types'

/**
 * 函数节流（一定时间内函数只能执行一次 多次执行会推迟到下个周期 常用于scroll事件以节省性能）
 * @example
 * window.addEventListener('scroll', throttle(function() {}, 300))
 */
const throttle = (fn: Function, time = 300) => {
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

export default throttle
