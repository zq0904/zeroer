import { action } from 'mobx'
import RootStore from './index'

const setStore = 'setStore'

abstract class BaseStore<SuccessorInstance> {
  constructor(protected rootStore: RootStore) {} // 多个store通信
  // @action // setStore变量 与 装饰器语法冲突 编译运行时报错
  [setStore] = action((payload: Omit<Partial<SuccessorInstance>, typeof setStore>) => {
    Object.assign(this, payload)
  })
}

export default BaseStore
