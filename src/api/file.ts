import request from '@/util/request'
import type { FileInformation } from '@/type/File'

export const getNowFileList = (params: GetNowFileListParams) => {
  return request.post<GetNowFileListData>('/file/getNowFileList', params)
}

export const uploadPreCheck = (params: UploadFileParams ) => {
  return request.get<UploadPreCheckData>('/file/preCheckFileExist', { params })
}

export const uploadFileMerge = (params: UploadFileParams) => {
  return request.post<UploadFileMergeData>('/file/merge', params)
}

export interface GetNowFileListParams {
  groupId: number
  absolutePath: string
}

export interface UploadFileParams  {
  totalSize: number,
  identifier: string,
  filename: string,
  totalChunks: number,
  uploadCloudPath: string,
  groupId: number
}

export interface UploadPreCheckData extends ResponseData {
  data: {
    isSkip: boolean,
    needMerge: boolean
  }
}

export interface UploadFileMergeData extends ResponseData {
  data: any
}

export interface GetNowFileListData extends ResponseData {
  data: FileInformation[]
}

interface ResponseData {
  code: number
  msg: string
}