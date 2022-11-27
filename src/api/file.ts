import request from '@/util/request'
import type { FileInformation } from '@/type/File'

export const getNowFileList = (params: GetNowFileListParams) => {
  return request.post<GetNowFileListData>('/file/getNowFileList', params)
}

export const uploadFileMerge = (params: UploadFileMergeParams) => {
  return request.post('/file/merge', params)
}

export interface GetNowFileListParams {
  groupId: number
  absolutePath: string
}

export interface UploadFileMergeParams  {
  totalSize: number,
  identifier: string,
  filename: string,
  totalChunks: number,
  uploadCloudPath: string,
  groupId: number
}



export interface GetNowFileListData extends ResponseData {
  data: FileInformation[]
}

interface ResponseData {
  code: number
  msg: string
}