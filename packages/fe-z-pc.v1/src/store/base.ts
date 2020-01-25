import { action } from 'mobx'
import { PickFunctionName } from '@/common/ts'
import RootStore from './index'

abstract class BaseStore<SuccessorInstance> {
  constructor(protected rootStore: RootStore) {} // 多个store通信
  @action.bound // 如果 setStore 使用变量 与 装饰器语法冲突 编译运行时报错
  setStore(payload: Partial<Omit<SuccessorInstance, PickFunctionName<SuccessorInstance>>>) {
    Object.assign(this, payload)
  }
}

export default BaseStore
