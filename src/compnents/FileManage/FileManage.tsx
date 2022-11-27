import React, { useRef } from 'react'
import './FileManage.scss'
import { Button } from 'antd'
import { UploadOutlined, FolderAddOutlined, FileAddOutlined } from '@ant-design/icons'
import Uploader from 'simple-uploader.js'//这个没有ts包，采用AnyScript编写
import { getToken } from '@/util/secret'
import { computedMd5 } from '@/util/file'
import { uploadFileMerge } from '@/api/file'
import { baseURL } from '@/util/request'
import { useSearchParams } from 'react-router-dom'

const FileManage: React.FC = () => {
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useSearchParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const groupId = -1//不知道是啥
  const uploader = new Uploader({
    target: baseURL + '/file/upload',
    forceChunkSize: true,
    headers: { token: getToken() },
    //修改传输参数
    processParams: (params: any, file: any) => {
      params.uploadCloudPath = file.relativePath
      params.groupId = groupId
      // console.log(params)
      return params
    },
    checkChunkUploadedByResponse: (chunk: any, response: any) => {
      console.log(response)
      return false
    }
  })

  // 添加单个文件
  uploader.on('fileAdded', (uploadFile: any) => {
    // console.log(uploadFile)
    // console.log('开始计算md5')
    computedMd5(uploadFile.file).then(res => {
      uploadFile.uniqueIdentifier = res
      uploadFile.relativePath = path
      uploader.upload()
    }).catch(err => {
      console.log(err)
    })
  })
  //单文件上传成功
  uploader.on('fileSuccess', (rootFile: any, file: any) => {
    // console.log('成功', rootFile, file)
    uploadFileMerge({
      totalSize: file.size,
      identifier: file.uniqueIdentifier,
      filename: file.name,
      totalChunks: file.chunks.length,
      uploadCloudPath: file.relativePath,
      groupId: groupId
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  })

  const uploadFile = () => {
    fileUploadRef.current?.click()
  }

  const onFileChange = () => {
    const fileList = fileUploadRef.current?.files
    if(fileList) {
      for(let i = 0; i < fileList.length; i++) {
        uploader.addFile(fileList[i])
      }
      fileUploadRef.current!.value = ''//清空选中文件
    }
  }

  return (
    <div className='file-manage'>
      <div className='upload-wrapper'>
        <Button className='upload-button' icon={<UploadOutlined />} type='primary' shape='round' onClick={uploadFile}>上传</Button>
        <input type="file" ref={fileUploadRef} onChange={onFileChange} />
      </div>
      <div className='buttons'>
        <div className='button'>
          <button><FolderAddOutlined className='icon' />新建文件夹</button>
        </div>
        <div className='button'>
          <button><FileAddOutlined className='icon' />新建文本文档</button>
        </div>
      </div>
    </div>
  )
}

export default FileManage