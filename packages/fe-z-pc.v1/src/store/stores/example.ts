import { observable, action, autorun, computed, runInAction, flow, when, reaction } from 'mobx'
import RootStore from '../index'
import { getJobInfo } from '@/services'

class ExampleStore {
  constructor(private rootStore: RootStore) {} // 多个store通信
  @observable jobId = ''
  @observable num = 0
  @observable price = 100
  @computed // 计算属性 依赖缓存
  get totalPrice() {
    return this.num * this.price
  }
  @action.bound
  setStore(payload: Omit<Partial<ExampleStore>, 'setStore'>) {
    Object.assign(this, payload)
  }
  @action.bound
  asyncAdd() { // action中只能是 同步操作更改 可观测的数据
    setTimeout(() => {
      // 1.在声明一个action调用
      // this.setStore({ num: 99 })
      // 2.声明一个立即调用的action
      // action(() => {
      //   this.num ++
      // })()
      // 3.使用runInAction
      runInAction(() => { this.num ++ })
    }, 500)
  }
  // flow 只能作为函数使用 不能作为装饰器使用 由于使用Generator必须bind(this) 好处是异步部分不需要手动操作包装runInAction
  // ts 对Generator函数支持不好很好 建议还是改成 async函数
  @action.bound
  asyncAddFlow = flow(function *(this: ExampleStore) {
    try {
      const data = yield getJobInfo({ jobId: this.jobId })
      ++this.num
    } catch (err) {
      console.log(err)
    }
  })
}

// // autorun 初始会执行一次 有点类似计算属性 依赖的可被观测的数据变动 就会执行业务函数
// const ts = new TestStore()
// autorun(() => {
//   console.log('autorun：', ts.num)
// })
// // ts.num = 1 // 直接修改 可观测的数据 是可以的 只不过不推选这么做 多次操作会多次执行 降低性能（对比vuex虽然也可以 但是不能被devTool检测到）
// // ts.num = 2
// ts.add()

// // when 满足条件 执行一次操作 之后不再执行
// when(() => ts.num >= 4, () => console.log('wehn：'))

// // reaction 初始不会执行 依赖的可被观测的数据变动 就会执行
// reaction(() => ts.num, (data, reaction) => {
//   console.log('reaction：', data)
//   // reaction.dispose() // 停止当前reaction的监听 实现和wen一样的效果
// })

// // 不定义action 直接使用runInAction 实现修改 可观测的数据 是合法的
// runInAction(() => {
//   ts.num = 4
// })

export default ExampleStore
