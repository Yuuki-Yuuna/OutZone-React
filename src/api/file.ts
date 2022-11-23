import request from '@/util/request'
import type { FileInformation } from '@/type/File'

export const getNowFileList = (params: GetNowFileListParams) => {
  return request.post('/file/getNowFileList', params)
}

export interface GetNowFileListParams {
  groupId: number
  absolutePath: string
}

export interface GetNowFileListData {
  code: number
  data: FileInformation[]
  msg: string
}