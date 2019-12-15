
import { isString, isFunction } from './Object'

interface Events {
  [key: string]: Function[];
}

class Event {
  private events: Events = {}
  on = (eventName: string, fn: Function) => {
    if (eventName in this.events) {
      this.events[eventName].push(fn)
    } else {
      this.events[eventName] = [fn]
    }
  }
  emit = (eventName: string, ...args: any[]) => {
    if (eventName in this.events && this.events[eventName].length > 0) {
      for (const fn of this.events[eventName]) {
        isFunction(fn) && fn.apply(this, args)
      }
    }
  }
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
