import { axios } from '@/common/ts'
import { SAVEJOBINFO, GETJOBLIST } from './api'
import { JobCreateForm, JobListItem } from '@/types'

// 保存职位信息
export const saveJobInfo = (reqData: JobCreateForm) => axios.post<{}>(SAVEJOBINFO, reqData)

// 获取职位列表信息
export const getJobList = (reqData: { jobId: string }) => axios.post<{ recommendList: JobListItem[] }>(GETJOBLIST, reqData)
