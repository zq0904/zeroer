import { configure } from 'mobx'
import ExampleStore from './stores/example'

configure({ enforceActions: 'observed' }) // 严格模式 性能优化

class RootStore {
  exampleStore: ExampleStore
  constructor() {
    this.exampleStore = new ExampleStore(this)
  }
}

export default RootStore
