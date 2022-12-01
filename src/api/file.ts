import request from '@/util/request'
import type { FileInformation } from '@/type/File'

export const getNowFileList = (params: GetNowFileListParams) => {
  return request.post<GetNowFileListData>('/file/getNowFileList', params)
}

export const uploadPreCheck = (params: UploadFileParams) => {
  return request.get<UploadPreCheckData>('/file/preCheckFileExist', { params })
}

export const uploadFileMerge = (params: UploadFileMergeParams) => {
  const formData = new FormData()
  for(const key in params) {
    const value = params[key as keyof typeof params]
    if(typeof value == 'number') {
      formData.append(key, value.toString())
    } else if(typeof value == 'string' || typeof value != 'undefined') {
      formData.append(key, value)
    }
  }
  return request.post<UploadFileMergeData>('/file/merge', formData)
}

export const downloadFile = (params: DownloadFileParams) => {
  return request.post('/file/download', params)
}

export const deleteFiles = (params: DeleteFilesParams) => {
  return request.post<ResponseData>('/file/deleteFiles', params)
}

export const createDirectory = (params: CreateDirectoryParams) => {
  return request.post('/file/createDir', params)
}

export interface GetNowFileListParams {
  groupId: number
  absolutePath: string
}

export interface UploadFileParams {
  totalSize: number,
  identifier: string,
  filename: string,
  totalChunks: number,
  uploadCloudPath: string,
  groupId: number
}

export interface UploadFileMergeParams extends UploadFileParams {
  icon?: File
}

export interface DownloadFileParams {
  groupId: number
  id: React.Key
  parentId: React.Key | null
  filename: string
}

export interface DeleteFilesParams {
  destination: string
  groupId: number
  files: FileInformation[]
}

export interface CreateDirectoryParams {
  destination: string
  groupId: number
  dirName: string
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