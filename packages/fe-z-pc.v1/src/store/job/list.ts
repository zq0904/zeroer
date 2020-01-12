import BaseStore from '@/store/base'
import { observable, computed, action, runInAction, flow, autorun, when, reaction } from 'mobx'
import { JobListItem } from '@/types'
import { getJobList } from '@/services'

class JobListStore extends BaseStore<JobListStore> {
  @observable num = 0
  @observable price = 100
  @computed // 计算属性 依赖缓存
  get totalPrice() {
    return this.num * this.price
  }
  @observable jobId = ''
  @observable jobList: JobListItem[] = []
  // action中只能是 同步操作更改 可观测的数据
  @action.bound
  addNum () {
    setTimeout(() => {
      // 1.在声明一个action 去调用
      // this.setStore({ num: 1 })
      // 2.声明一个立即调用的action
      // action(() => this.num ++)()
      // 3.使用runInAction
      runInAction(() => this.num ++)
    }, 500)
  }
  // flow 只能作为函数使用 不能作为装饰器使用 由于使用Generator必须bind(this) 好处：异步部分不需要手动操作包装runInAction 只需要yield阻断即可
  @action.bound
  getJobList1 = flow(function * (this: JobListStore) {
    try {
      // ts 对 Generator函数支持不好很好 建议还是改成 async函数 这里的data类型ts识别为any 必须手动指定才能正确显示
      const data = yield getJobList({ jobId: this.jobId })
    } catch (err) {
      console.log(err)
    }
  })
  @action.bound
  async getJobList2 () {
    try {
      const resData = await getJobList({ jobId: this.jobId })
      this.setStore({ jobList: resData.data.recommendList })
    } catch (err) {
      console.error(err)
    }
  }
}

// autorun 初始会执行一次 有点类似计算属性 依赖的可被观测的数据变动 就会执行业务函数
// const store = new JobListStore()
// autorun(() => {
//   console.log('autorun')
// })
// // store.num = 1 // 直接修改 可观测的数据 是可以的 只不过不推选这么做 多次操作会多次执行 降低性能（对比vuex虽然也可以 但是不能被devTool检测到）
// // store.num = 2
// store.addNum()

// when 满足条件 执行一次操作 之后不再执行
// when(() => store.num >= 4, () => console.log('wehn'))

// reaction 初始不会执行 依赖的可被观测的数据变动 就会执行
// reaction(() => store.num, (data, reaction) => {
//   console.log('reaction')
//   // reaction.dispose() // 停止当前reaction的监听 实现和wen一样的效果
// })

export default JobListStore
