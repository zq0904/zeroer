import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@/store'
import { savePicture } from '@/services'
import CheckboxGroup from './CheckboxGroup'
import './index.scss'

const JobCreate = () => {
  const { jobCreateStore } = useStore()
  const handleChangeCheckbox = (checkedValues: string[]) => jobCreateStore.setStore({ language: checkedValues })
  const hanldeChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const formData = new FormData()
    formData.append('tp', e.target.files[0])
    try {
      const resData = await savePicture(formData)
      jobCreateStore.setStore({ commissionedId: resData.data.id })
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    console.log('JobCreate componentDidMount')
  }, [])
  return useObserver(() => (
    <div className="job-create">
      <h4>JobCreate 组件</h4>
      <p>
        职位名称：
        <input type="text" name="jobName"
          value={jobCreateStore.jobName}
          onChange={e => jobCreateStore.setStore({ jobName: e.target.value })}
        />
      </p>
      <p>
        要求年龄：
        <input type="number" name="employedAge"
          value={jobCreateStore.employedAge}
          onChange={e => jobCreateStore.setStore({ employedAge: Number(e.target.value) })}
        />
      </p>
      <p>
        要求语言：
        <CheckboxGroup
          name="language"
          options={[{
            label: '日语', value: 'Japanese', checked: false
          }, {
            label: '英语', value: 'English', checked: false
          }, {
            label: '法语', value: 'French', checked: false
          }]}
          onChange={handleChangeCheckbox}
        />
      </p>
      <p>
        委托证明材料：
        <input type="file" name="commissioned"
          accept="image/*"
          onChange={hanldeChangeFile}
        />
        { jobCreateStore.commissionedId && <img src={jobCreateStore.commissionedId} alt=""/> }
      </p>
      <button type="button" onClick={jobCreateStore.saveJobInfo}>提交信息</button>
    </div>
  ))
}

export default JobCreate
