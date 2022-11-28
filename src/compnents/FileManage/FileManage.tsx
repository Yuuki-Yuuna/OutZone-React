import React, { useRef } from 'react'
import './FileManage.scss'
import { Button } from 'antd'
import { UploadOutlined, FolderAddOutlined, FileAddOutlined } from '@ant-design/icons'

const FileManage: React.FC<PropsType> = (props) => {
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const { uploader } = props

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
        <input type="file" ref={fileUploadRef} onChange={onFileChange} multiple />
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

interface PropsType {
  uploader: any
}

export default FileManage