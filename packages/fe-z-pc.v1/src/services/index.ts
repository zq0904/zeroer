import { axios } from '@/common/ts'
import { SAVEPICTURE } from './api'

// 上传图片
export const savePicture = (reqData: FormData) => axios.post<{ id: string }>(SAVEPICTURE, reqData)

export * from './job'
