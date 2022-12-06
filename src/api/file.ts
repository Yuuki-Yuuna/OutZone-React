import request from '@/util/request'
import type { FileInformation } from '@/type/File'

export const getNowFileList = (params: GetNowFileListParams) => {
  return request.post<GetNowFileListData>('/file/getNowFileList', params)
}

export const getNowFileListByFileType = (params: GetNowFileListByFileTypeParams) => {
  return request.get<GetNowFileListData>('/file/groupByFileType', { params })
}

export const uploadPreCheck = (params: UploadFileParams) => {
  return request.get<UploadPreCheckData>('/file/preCheckFileExist', { params })
}

export const uploadFileMerge = (params: UploadFileMergeParams) => {
  const formData = new FormData()
  for (const key in params) {
    const value = params[key as keyof typeof params]
    if (typeof value == 'number') {
      formData.append(key, value.toString())
    } else if (typeof value == 'string' || typeof value != 'undefined') {
      formData.append(key, value)
    }
  }
  return request.post<ResponseData>('/file/merge', formData)
}

export const downloadFile = (params: DownloadFileParams) => {
  return request.post<DownloadFileData>('/file/download', params, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
}

export const deleteFiles = (params: ContorlFilesParams) => {
  return request.post<ResponseData>('/file/deleteFiles', params)
}

export const createDirectory = (params: CreateDirectoryParams) => {
  return request.post<ResponseData>('/file/createDir', params)
}

export const renameFile = (params: RenameFileParams) => {
  return request.post<ResponseData>('/file/renameFile', params)
}

export const renameDirectory = (params: RenameFileParams) => {
  return request.post<ResponseData>('/file/renameDir', params)
}

export const moveFiles = (params: ContorlFilesParams) => {
  return request.post<ResponseData>('/file/moveFiles', params)
}

export const copyFiles = (params: ContorlFilesParams) => {
  return request.post<ResponseData>('/file/copyFiles', params)
}

export const searchFiles = (params: SearchFilesParams) => {
  return request.get<GetNowFileListData>('/file/searchFiles', { params })
}

export interface GetNowFileListParams {
  groupId: number
  absolutePath: string
}

export interface GetNowFileListByFileTypeParams {
  fileType: string
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

export interface ContorlFilesParams {
  destination: string
  groupId: number
  files: FileInformation[]
}

export interface CreateDirectoryParams {
  destination: string
  groupId: number
  dirName: string
}

export interface RenameFileParams {
  groupId: number
  id: React.Key
  newName: string
}

export interface SearchFilesParams {
  groupId: number
  fileName: string
}

export interface UploadPreCheckData extends ResponseData {
  data: {
    isSkip: boolean,
    needMerge: boolean
  }
}

export interface GetNowFileListData extends ResponseData {
  data: FileInformation[]
}

export interface DownloadFileData extends ResponseData {
  data: string
}

interface ResponseData {
  code: number
  msg: string
}