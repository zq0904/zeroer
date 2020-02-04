import BaseStore from '@/store/base'
import { observable, action } from 'mobx'
import { saveJobInfo } from '@/services'
import { JobCreateForm } from '@/types'

class JobCreateStore extends BaseStore<JobCreateStore> {
  @observable // 职位姓名
  jobName = ''

  @observable // 从业年龄
  employedAge = 1

  @observable // 要求语言
  language: string[] = []

  @observable // 委托证明材料
  commissionedId = ''

  get form (): JobCreateForm {
    return {
      jobName: this.jobName,
      employedAge: this.employedAge,
      language: this.language,
      commissionedId: this.commissionedId
    }
  }

  @action.bound
  saveJobInfo = async () => {
    try {
      await saveJobInfo(this.form)
      window.alert('保存成功')
    } catch (err) {
      console.error(err)
    }
  }
}

export default JobCreateStore
