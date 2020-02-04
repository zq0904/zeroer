import { createContext, useContext } from 'react'
import { configure } from 'mobx'
import JobCreateStore from './job/create'
import JobListStore from './job/list'

configure({ enforceActions: 'observed' }) // 严格模式 性能优化

class RootStore {
  jobCreateStore: JobCreateStore
  jobListStore: JobListStore
  constructor () {
    this.jobCreateStore = new JobCreateStore(this)
    this.jobListStore = new JobListStore(this)
  }
}

export default RootStore

// 直接使用默认值 store
export const StoreContext = createContext(new RootStore())

export const useStore = () => useContext(StoreContext)
