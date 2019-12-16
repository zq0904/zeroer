import axios from 'axios'
import { EXAMPLEJOB } from './api'
import { Response } from '@/types'
import { ListItem } from '@/types/example'

// 获取职位信息
interface GetJobInfo {
  (req: { jobId: string }): Promise<
    Response<{
      recommendList: ListItem[];
    }>
  >
}
export const getJobInfo: GetJobInfo = req => axios.post(EXAMPLEJOB, req)
