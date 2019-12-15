import { configure } from 'mobx'
import TestStore from './stores/test'

configure({ enforceActions: 'observed' }) // 严格模式 优化

class RootStore {
  constructor() {
    this.testStore = new TestStore(this)
  }
}

export default new RootStore()
