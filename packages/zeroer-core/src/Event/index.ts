
import isString from '../object/isString'
import isFunction from '../object/isFunction'

interface Events {
  [key: string]: Function[];
}

/**
 * 发布订阅类
 * @example
 * const event = new Event()
 */
class Event {
  private events: Events = {}
  /**
   * 订阅事件
   * @example
   * const fn = (...args: any[]) =>  console.log(this, ...args) // 保持引用 用于解绑订阅
   * event.on('eventName', fn)
   */
  on = (eventName: string, fn: Function) => {
    if (eventName in this.events) {
      this.events[eventName].push(fn)
    } else {
      this.events[eventName] = [fn]
    }
  }

  /**
   * 发布事件
   * @example
   * event.emit('eventName', 'arg1', 'arg2') // 发布eventName所对应的所有事件 并传递参数
   */
  emit = (eventName: string, ...args: any[]) => {
    if (eventName in this.events && this.events[eventName].length > 0) {
      for (const fn of this.events[eventName]) {
        isFunction(fn) && fn.apply(this, args)
      }
    }
  }

  /**
   * 取消订阅
   * @example
   * event.off() // 取消所有
   * event.off('eventName') // 取消eventName 对应的所有事件
   * event.off('eventName', fn) // 取消eventName 的fn事件
   */
  off = (eventName?: string, fn?: Function) => {
    if (isString(eventName)) {
      if (isFunction(fn)) {
        // 清除 指定的fn
        if (eventName in this.events) {
          const index = this.events[eventName].findIndex(v => v === fn)
          if (index > -1) {
            this.events[eventName].splice(index, 1)
          }
        }
      } else {
        // 清除eventName对应的所有事件
        if (eventName in this.events) {
          delete this.events[eventName]
        }
      }
    } else {
      // clear 清空所有
      this.events = {}
    }
  }

  /**
   * 订阅一次事件
   * @example
   * event.once('eventName', () => {})
   */
  once = (eventName: string, fn: Function) => {
    const fnc = function (this: any, ...args: any[]) {
      fn.apply(this, args)
      this.off(eventName, fnc)
    }
    if (eventName in this.events) {
      this.events[eventName].push(fnc)
    } else {
      this.events[eventName] = [fnc]
    }
  }
}

export default Event
