import React, { useRef, useState } from 'react'
import './FileManage.scss'
import { Button, Input, Modal, Image, message } from 'antd'
import { UploadOutlined, FolderAddOutlined, FileAddOutlined } from '@ant-design/icons'
import { useParams, useSearchParams } from 'react-router-dom'
import { createDirectory } from '@/api/file'
import { useStoreDispatch } from '@/store'
import { getFileList } from '@/store/features/fileSlice'

const FileManage: React.FC<PropsType> = (props) => {
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const { uploader } = props
  const [search] = useSearchParams()
  const { category } = useParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const uploadPath = path == '/' || category != 'all' ? '/' : path + '/'
  const groupId = -1
  let [isModalOpen, setIsModalOpen] = useState(false)//新建文件夹对话框
  let [newFolderName, setNewFolderName] = useState('')
  let [dialogLoading, setDialogLoading] = useState(false)
  const dispatch = useStoreDispatch()

  const uploadFile = () => {
    fileUploadRef.current?.click()
  }
  const onFileChange = () => {
    const fileList = fileUploadRef.current?.files
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        uploader.addFile(fileList[i])
      }
      fileUploadRef.current!.value = ''//清空选中文件
    }
  }
  const createDir = () => {
    setIsModalOpen(true)
  }
  const createDirCheck = () => {
    setDialogLoading(true)
    createDirectory({ destination: uploadPath, groupId, dirName: '/' + newFolderName + '/' }).then(res => {
      console.log(res.data)
      const result = res.data
      if (result.code == 200) {
        message.success('创建文件夹成功')
      } else {
        message.error(result.msg)
      }
      setNewFolderName('')
      setDialogLoading(false)
      setIsModalOpen(false)
      dispatch(getFileList({ groupId, absolutePath: uploadPath }))
    }).catch(err => {
      console.log(err)
      setDialogLoading(false)
    })
  }
  const createDirCancel = () => {
    if (!dialogLoading) {
      setIsModalOpen(false)
      setNewFolderName('')
    }
  }
  const onInputChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setNewFolderName(target.value)
  }

  return (
    <div className='file-manage'>
      <div className='upload-wrapper'>
        <Button className='upload-button' icon={<UploadOutlined />} type='primary' shape='round' onClick={uploadFile}>上传</Button>
        <input type="file" ref={fileUploadRef} onChange={onFileChange} multiple />
      </div>
      <div className='buttons' style={{display: category == 'all' ? 'flex' : 'none'}}>
        <div className='button'>
          <button onClick={createDir}><FolderAddOutlined className='icon' />新建文件夹</button>
        </div>
        <div className='button'>
          <button><FileAddOutlined className='icon' />新建文本文档</button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={createDirCancel}
        onOk={createDirCheck}
        title={<h4>文件夹名称</h4>}
        okText='确定'
        cancelText='取消'
        wrapClassName='dialog-model'
        width={360}
        confirmLoading={dialogLoading}
      >
        <div className='dialog-body'>
          <Image src={new URL('../../assets/icon/folder.png', import.meta.url).href} preview={false} width={58} />
          <div className='input-wrapper'>
            <Input value={newFolderName} onChange={onInputChange} maxLength={20} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

interface PropsType {
  uploader: any
}

export default FileManage