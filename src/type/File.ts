export interface FileInformation {
  id: React.Key
  name: string
  uploadDate: string//文件上传时间
  size: number | null//文件大小
  type: string | null//文件扩展名
  icon: string//文件图标url
  directoryType: boolean//是否文件夹
  path: string//文件路径
  parentId: React.Key | null//父级id
}

// export interface FileUploadTestChunk {
//   chunkNumber: number//块号
//   chunkSize: number//标准分块大小
//   currentChunkSize: number//当前块实际大小 
//   totalSize: number//文件总大小
//   identifier: string//文件唯一标识(此处为md5)
//   filename: string//文件名
//   totalChunks: number//总块数
//   groupId: number//是否群文件(不知道啥意思)
//   uploadCloudPath: string//要上传的云盘路径
// }

// export interface FileUploadChunk extends FileUploadTestChunk {
//   file: Blob//这里标什么类型不太清除
// }
