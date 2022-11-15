export interface FileInfomation {
  key: React.Key
  filename: string
  createtime: string
  updatetime: string
  size: string
  extendname?: string
  isFolder: boolean
  directory: string//所在目录
}