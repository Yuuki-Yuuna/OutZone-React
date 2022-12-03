export interface FileInformation {
  id: React.Key
  name: string
  uploadDate: string | null//文件上传时间
  size: number | null//文件大小
  type: string | null//文件扩展名
  icon: string//文件图标url
  directoryType: boolean//是否文件夹
  path: string//文件路径
  parentId: React.Key | null//父级id
}

export type TransformType = 'copy' | 'move' | null